import apiClient from "../utils/api";

export const plantService = {
  /**
   * Upload image and identify plant
   * @param {File} imageFile - Image file to upload
   * @param {Function} onUploadProgress - Progress callback
   * @returns {Promise} API response
   */
  async identifyPlant(imageFile, onUploadProgress = null) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 150000, // 150 second timeout (2.5 minutes) - increased for ML processing
    };

    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }

    try {
      const response = await apiClient.post(
        "/plants/identify",
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Batch identify multiple plants
   * @param {FileList} imageFiles - Multiple image files
   * @param {Function} onUploadProgress - Progress callback
   * @returns {Promise} API response
   */
  async batchIdentifyPlants(imageFiles, onUploadProgress = null) {
    const formData = new FormData();

    // Add all files to form data
    Array.from(imageFiles).forEach((file, index) => {
      formData.append("images", file);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000, // 5 minute timeout for batch processing
    };

    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }

    try {
      const response = await apiClient.post(
        "/plants/batch-identify",
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get supported image formats
   * @returns {Promise} Supported formats info
   */
  async getSupportedFormats() {
    try {
      const response = await apiClient.get("/plants/supported-formats");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Check ML service health
   * @returns {Promise} Health status
   */
  async checkHealth() {
    try {
      const response = await apiClient.get("/plants/health");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get model information
   * @returns {Promise} Model info
   */
  async getModelInfo() {
    try {
      const response = await apiClient.get("/plants/model-info");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Validate image file before upload
   * @param {File} file - Image file to validate
   * @returns {Object} Validation result
   */
  validateImageFile(file) {
    const result = {
      valid: true,
      errors: [],
    };

    // Check if file exists
    if (!file) {
      result.valid = false;
      result.errors.push("No file selected");
      return result;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/bmp",
      "image/tiff",
    ];
    if (!allowedTypes.includes(file.type)) {
      result.valid = false;
      result.errors.push(
        "Invalid file type. Only JPEG, PNG, BMP, and TIFF images are allowed."
      );
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      result.valid = false;
      result.errors.push("File too large. Maximum size is 10MB.");
    }

    // Check minimum file size (1KB)
    const minSize = 1024; // 1KB
    if (file.size < minSize) {
      result.valid = false;
      result.errors.push("File too small. Minimum size is 1KB.");
    }

    return result;
  },

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message =
        error.response.data?.message || "Plant identification failed";
      const status = error.response.status;
      return new Error(`${message} (Status: ${status})`);
    } else if (error.request) {
      // Request was made but no response received
      return new Error("Network error. Please check your connection.");
    } else {
      // Something else happened
      return new Error(error.message || "An unexpected error occurred");
    }
  },

  /**
   * Get confidence level color for UI
   * @param {number} confidence - Confidence score (0-1)
   * @returns {string} CSS color class
   */
  getConfidenceColor(confidence) {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    if (confidence >= 0.4) return "text-orange-600";
    return "text-red-600";
  },

  /**
   * Get confidence level badge style
   * @param {number} confidence - Confidence score (0-1)
   * @returns {string} CSS badge class
   */
  getConfidenceBadge(confidence) {
    if (confidence >= 0.8)
      return "bg-green-100 text-green-800 border-green-200";
    if (confidence >= 0.6)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (confidence >= 0.4)
      return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  },
};
