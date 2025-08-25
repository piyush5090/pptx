# 📥 Pexels Photos & Videos Fetcher (Node.js)

This project is a robust Node.js script that **continuously downloads photos, videos, and their metadata from Pexels** into a dated folder structure. It includes **API key rotation with cooldown**, **resume-from-last-page**, **safe streaming downloads with retries**, and **per-item metadata persistence**.

---

## 🚀 What It Does (At a Glance)

- Reads config from `.env` (multiple Pexels API keys supported).
- Creates a dated directory structure like:
downloads/
photos/YYYY/MM/DD/.jpg
videos/YYYY/MM/DD/.mp4
metadata/YYYY/MM/DD_photos.json
metadata/YYYY/MM/DD_videos.json
metadata/state.json


- Fetches:
- **Photos**: from **Search** (if `QUERY` is set) else **Curated**.
- **Videos**: from **Popular** endpoint.
- **Streams** each file to disk with a `.part` temp file → renames on success.
- Saves **metadata immediately after each item** is written.
- Tracks **progress** in `downloads/metadata/state.json` (page index) to **resume** on next run.
- **Rotates API keys** every time a 429 happens and cools the key for `COOLDOWN_HOURS`.
- If a page returns no new items, **sleeps** for `FETCH_INTERVAL_MINUTES` and tries again.

---

## 📦 Requirements

- **Node.js 18+** (for native `fetch`/modern ECMAScript; the script uses `axios` and `stream/promises`).
- A **Pexels API key** (you can provide **multiple keys** to reduce downtime on rate limits).

---

## 🛠️ Install & Configure

1. **Install dependencies**
 ```bash
 npm install


# One or more Pexels API keys, comma-separated
PEXELS_API_KEYS=YOUR_KEY_1,YOUR_KEY_2

# If provided, photos come from search; if empty, uses curated photos
QUERY=ALL

# Pagination & scheduling
PER_PAGE=80                 # items per page requested
START_PAGE=1                # starting page if no saved state
FETCH_INTERVAL_MINUTES=60   # wait time before next attempt if nothing new
COOLDOWN_HOURS=1            # key cooldown after a 429

downloads/
├─ photos/
│  └─ YYYY/
│     └─ MM/
│        └─ DD/
│           ├─ 123456789.jpg
│           └─ ...
├─ videos/
│  └─ YYYY/
│     └─ MM/
│        └─ DD/
│           ├─ 987654321.mp4
│           └─ ...
└─ metadata/
   ├─ YYYY/
   │  └─ MM/
   │     ├─ DD_photos.json
   │     └─ DD_videos.json
   └─ state.json
