// --- Import required modules ---
import fs from "fs"; // file system operations
import path from "path"; // path joining/normalizing
import axios from "axios"; // HTTP requests
import dotenv from "dotenv"; // load environment variables from .env
import { pipeline } from "stream/promises"; // stream piping with promises
import { setTimeout as sleep } from "timers/promises"; // async sleep

dotenv.config(); // load .env file

// --- Timestamped logger for consistent logging ---
function log(message) {
  const now = new Date().toLocaleString("en-GB", { hour12: false }).replace(",", "");
  console.log(`[${now}] ${message}`);
}

// --- Configuration values loaded from .env (with defaults) ---
const apiKeys = process.env.PEXELS_API_KEYS?.split(",").map((k) => k.trim()).filter(Boolean) || [];
if (apiKeys.length === 0) {
  log("❌ No API keys found in .env (PEXELS_API_KEYS).");
  process.exit(1); // cannot run without API keys
}

const query = process.env.QUERY || ""; // search query, empty = curated feed
const perPage = Number.parseInt(process.env.PER_PAGE || "80", 10); // number of results per page
const startPageEnv = Number.parseInt(process.env.START_PAGE || "1", 10); // starting page
const fetchIntervalMinutes = Number.parseInt(process.env.FETCH_INTERVAL_MINUTES || "60", 10); // pause interval
const cooldownHours = Number.parseInt(process.env.COOLDOWN_HOURS || "1", 10); // key cooldown period

// computed values
const FETCH_INTERVAL_MS = fetchIntervalMinutes * 60 * 1000;
const COOLDOWN_MS = cooldownHours * 60 * 60 * 1000;

// --- Root download directories ---
const BASE_DIR = path.resolve("downloads"); // everything goes inside /downloads
const folders = {
  photos: path.join(BASE_DIR, "photos"),     // images
  videos: path.join(BASE_DIR, "videos"),     // videos
  metadata: path.join(BASE_DIR, "metadata"), // metadata JSONs
};

// ensure all required folders exist
for (const dir of Object.values(folders)) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// --- Persistent state for resuming progress ---
const stateFile = path.join(folders.metadata, "state.json");

// Load last page index (resume point)
function loadState() {
  try {
    if (fs.existsSync(stateFile)) {
      return JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    }
  } catch (err) {
    log("⚠️ Failed to load state.json, starting fresh.");
  }
  return { lastPage: 0 }; // default
}

// Save current progress (so we can resume later)
function saveState(state) {
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

// --- API Key Manager (rotate keys, apply cooldown) ---
class ApiKeyManager {
  constructor(keys, cooldownMs) {
    this.keys = keys;
    this.cooldownUntil = new Array(keys.length).fill(0); // when each key is available
    this.apiIndex = 0; // pointer for round-robin
    this.cooldownMs = cooldownMs;
  }

  get now() {
    return Date.now();
  }

  // find earliest available key time
  getEarliestReadyTimeMs() {
    return Math.min(...this.cooldownUntil);
  }

  // Select next key or wait if all cooling down
  selectKeyIndexOrWait = async () => {
    for (let i = 0; i < this.keys.length; i++) {
      const idx = (this.apiIndex + i) % this.keys.length;
      if (this.now >= this.cooldownUntil[idx]) {
        this.apiIndex = idx; // rotate pointer
        return idx;
      }
    }
    // all keys cooling → wait until earliest one ready
    const earliest = this.getEarliestReadyTimeMs();
    const toWait = Math.max(earliest - this.now, 1000);
    log(`⏳ All API keys cooling down. Waiting ~${Math.ceil(toWait / 60000)} minute(s)...`);
    await sleep(toWait);
    return this.selectKeyIndexOrWait();
  };

  // put key on cooldown when rate-limited
  markRateLimited(index) {
    this.cooldownUntil[index] = this.now + this.cooldownMs;
    log(`🚫 API key #${index + 1} hit rate limit. Cooling until ${new Date(this.cooldownUntil[index]).toLocaleString()}`);
    this.apiIndex = (index + 1) % this.keys.length; // move to next key
  }
}
const keyManager = new ApiKeyManager(apiKeys, COOLDOWN_MS);

// --- Axios wrapper with retry & rotation ---
async function axiosWithKeyRotation(url, config = {}) {
  while (true) {
    const idx = await keyManager.selectKeyIndexOrWait();
    const key = apiKeys[idx];
    const headers = { ...(config.headers || {}), Authorization: key };

    try {
      const res = await axios({ url, method: "GET", ...config, headers });
      return { res, idx };
    } catch (err) {
      if (err.response && err.response.status === 429) {
        log("⚠️ Rate limit 429 encountered. Rotating key...");
        keyManager.markRateLimited(idx);
        continue; // retry with another key
      }
      throw err; // other error → throw
    }
  }
}

// --- Helpers ---
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// Return {year, month, day} for today's date
function getDatePath() {
  const now = new Date();
  return {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
  };
}

// --- Download helper with retries ---
async function downloadFileStream(url, filepath, maxRetries = 3) {
  if (fs.existsSync(filepath)) return; // skip if already exists
  const tmpPath = `${filepath}.part`; // temp file for partial download

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { responseType: "stream", timeout: 60_000 });
      await pipeline(response.data, fs.createWriteStream(tmpPath)); // write stream
      fs.renameSync(tmpPath, filepath); // rename after complete
      return;
    } catch (err) {
      if (fs.existsSync(tmpPath)) try { fs.unlinkSync(tmpPath); } catch {}
      const waitMs = Math.min(30_000, 1000 * 2 ** attempt); // exponential backoff
      if (attempt === maxRetries) throw err; // fail after retries
      log(`⚠️ Download failed (${attempt + 1}/${maxRetries + 1}): ${err.message}. Retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
    }
  }
}

// --- Metadata writer (save/update per file immediately) ---
function saveMetadataEntry(type, item, page) {
  const { year, month, day } = getDatePath();
  const metaDir = path.join(folders.metadata, year, month);
  ensureDir(metaDir);
  const metaFile = path.join(metaDir, `${day}_${type}.json`);

  let existing = { items: [], lastPage: 0 };
  try {
    if (fs.existsSync(metaFile)) {
      existing = JSON.parse(fs.readFileSync(metaFile, "utf-8"));
    }
  } catch {
    log(`⚠️ Failed to read ${type} metadata. Recreating file.`);
  }

  // add this single item
  existing.items.push(item);
  existing.lastPage = page; // track latest page
  fs.writeFileSync(metaFile, JSON.stringify(existing, null, 2));
}

// --- API fetchers (Photos + Videos) ---
async function fetchPhotos(page) {
  const url = query
    ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`
    : `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`;
  try {
    const { res } = await axiosWithKeyRotation(url, { responseType: "json", timeout: 30_000 });
    return res.data;
  } catch (err) {
    log(`❌ Photo API error: ${err.response ? `${err.response.status} ${err.response.statusText}` : err.message}`);
    return null;
  }
}

async function fetchVideos(page) {
  const url = `https://api.pexels.com/videos/popular?per_page=${perPage}&page=${page}`;
  try {
    const { res } = await axiosWithKeyRotation(url, { responseType: "json", timeout: 30_000 });
    return res.data;
  } catch (err) {
    log(`❌ Video API error: ${err.response ? `${err.response.status} ${err.response.statusText}` : err.message}`);
    return null;
  }
}

// --- Main continuous loop ---
async function runContinuously() {
  log("🚀 Starting continuous fetcher (photos + videos)...");

  // load resume state
  const state = loadState();
  let currentPage = state.lastPage > 0 ? state.lastPage + 1 : startPageEnv;
  log(`🔄 Resuming from page ${currentPage} (last saved page = ${state.lastPage})`);

  while (true) {
    log(`📄 Processing page ${currentPage}...`);
    let anyData = false; // track if anything was downloaded this page
    const { year, month, day } = getDatePath();

    // --- Photos ---
    log(`🖼️ Fetching PHOTOS page ${currentPage}...`);
    const photoData = await fetchPhotos(currentPage);
    if (photoData?.photos?.length) {
      for (const photo of photoData.photos) {
        try {
          const dir = path.join(folders.photos, year, month, day);
          ensureDir(dir);
          const filePath = path.join(dir, `${photo.id}.jpg`);
          if (!fs.existsSync(filePath)) {
            await downloadFileStream(photo.src.original, filePath);
            log(`⬇️ Photo ${photo.id} saved.`);
            // save metadata immediately after saving
            saveMetadataEntry("photos", photo, currentPage);
            log(`📝 Metadata updated for photo ${photo.id}`);
          }
        } catch (err) {
          log(`❌ Failed to save photo ${photo?.id}: ${err.message}`);
        }
      }
      anyData = true;
    } else log("ℹ️ No photos on this page.");

    // --- Videos ---
    log(`🎬 Fetching VIDEOS page ${currentPage}...`);
    const videoData = await fetchVideos(currentPage);
    if (videoData?.videos?.length) {
      for (const video of videoData.videos) {
        try {
          const best = [...video.video_files].sort((a, b) => (b.width || 0) - (a.width || 0))[0]; // best quality
          if (!best) continue;
          const dir = path.join(folders.videos, year, month, day);
          ensureDir(dir);
          const filePath = path.join(dir, `${video.id}.mp4`);
          if (!fs.existsSync(filePath)) {
            await downloadFileStream(best.link, filePath);
            log(`⬇️ Video ${video.id} saved.`);
            // save metadata immediately after saving
            saveMetadataEntry("videos", video, currentPage);
            log(`📝 Metadata updated for video ${video.id}`);
          }
        } catch (err) {
          log(`❌ Failed to save video ${video?.id}: ${err.message}`);
        }
      }
      anyData = true;
    } else log("ℹ️ No videos on this page.");

    // save resume state
    saveState({ lastPage: currentPage });
    log(`✅ Progress saved at page ${currentPage}`);

    currentPage++; // move to next page

    // pause if nothing new found
    if (!anyData) {
      log(`🛌 No new data at page ${currentPage - 1}. Sleeping for ${fetchIntervalMinutes} minute(s)...`);
      await sleep(FETCH_INTERVAL_MS);
    }
  }
}

// --- Run entry point ---
(async () => {
  try {
    await runContinuously();
  } catch (err) {
    log(`💥 Fatal error: ${err}`);
    process.exit(1);
  }
})();
