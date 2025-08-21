import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for file generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      url: error.config?.url
    });
    
    // Handle specific error cases
    if (error.response?.status === 413) {
      throw new Error('File too large. Please reduce the size of your presentation data.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment before trying again.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Presentation API methods
 */
export const presentationAPI = {
  /**
   * Validates presentation data structure
   * @param {Array} presentationData - Array of slide objects
   * @returns {Promise<Object>} Validation result
   */
  validateData: async (presentationData) => {
    try {
      const response = await api.post('/presentations/validate', {
        presentationData
      });
      return response.data;
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  },

  /**
   * Generates PowerPoint presentation
   * @param {Array} presentationData - Array of slide objects
   * @returns {Promise<Blob>} PowerPoint file as blob
   */
  generatePPTX: async (presentationData) => {
    try {
      const response = await api.post('/presentations/generate-pptx', {
        presentationData
      }, {
        responseType: 'blob', // Important for file downloads
        timeout: 120000, // 2 minutes for large presentations
      });
      return response.data;
    } catch (error) {
      throw new Error(`PowerPoint generation failed: ${error.message}`);
    }
  },

  /**
   * Generates PDF presentation
   * @param {Array} presentationData - Array of slide objects
   * @returns {Promise<Blob>} PDF file as blob
   */
  generatePDF: async (presentationData) => {
    try {
      const response = await api.post('/presentations/generate-pdf', {
        presentationData
      }, {
        responseType: 'blob',
        timeout: 120000, // 2 minutes for large presentations
      });
      return response.data;
    } catch (error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    }
  },

  /**
   * Gets presentation information and validation
   * @param {Array} presentationData - Array of slide objects
   * @returns {Promise<Object>} Presentation info
   */
  getPresentationInfo: async (presentationData) => {
    try {
      const response = await api.post('/presentations/info', {
        presentationData
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get presentation info: ${error.message}`);
    }
  },

  /**
   * Health check endpoint
   * @returns {Promise<Object>} Server health status
   */
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
};

/**
 * Helper function to download blob as file
 * @param {Blob} blob - File blob
 * @param {string} filename - Desired filename
 * @param {string} contentType - MIME type (optional)
 */
export const downloadFile = (blob, filename, contentType = null) => {
  try {
    // Create blob URL
    const url = window.URL.createObjectURL(
      contentType ? new Blob([blob], { type: contentType }) : blob
    );
    
    // Create temporary download link
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    console.log(`📥 Downloaded: ${filename}`);
  } catch (error) {
    console.error('❌ Download failed:', error);
    throw new Error(`Failed to download file: ${error.message}`);
  }
};

/**
 * Utility to format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Utility to check if server is reachable
 * @returns {Promise<boolean>} True if server is reachable
 */
export const checkServerConnection = async () => {
  try {
    await presentationAPI.healthCheck();
    return true;
  } catch (error) {
    console.warn('⚠️ Server connection check failed:', error.message);
    return false;
  }
};

export default api;