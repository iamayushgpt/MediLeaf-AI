/**
 * Profile Service
 * Handles all profile-related API calls
 */

const API_BASE_URL = "http://localhost:5001/api";

class ProfileService {
  /**
   * Get authentication token from localStorage
   * @returns {string|null} Auth token
   */
  getAuthToken() {
    return localStorage.getItem("token");
  }

  /**
   * Get authorization headers
   * @returns {Object} Headers with authorization
   */
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Get authorization headers for FormData
   * @returns {Object} Headers with authorization (no content-type for FormData)
   */
  getAuthHeadersFormData() {
    const token = this.getAuthToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data.data.user;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @param {File|null} profileImage - Profile image file (optional)
   * @returns {Promise<Object>} Updated user data
   */
  async updateProfile(profileData, profileImage = null) {
    try {
      const formData = new FormData();

      // Add profile data to FormData
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== undefined && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });

      // Add profile image if provided
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: this.getAuthHeadersFormData(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data.data.user;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @param {string} passwordData.confirmPassword - Confirm new password
   * @returns {Promise<Object>} Success response
   */
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/password`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      return data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }

  /**
   * Delete profile image
   * @returns {Promise<Object>} Success response
   */
  async deleteProfileImage() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/image`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete profile image");
      }

      return data;
    } catch (error) {
      console.error("Error deleting profile image:", error);
      throw error;
    }
  }

  /**
   * Get user activity statistics
   * @returns {Promise<Object>} User stats
   */
  async getProfileStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/stats`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile stats");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching profile stats:", error);
      throw error;
    }
  }

  /**
   * Validate image file
   * @param {File} file - Image file to validate
   * @returns {Object} Validation result
   */
  validateImageFile(file) {
    const errors = [];

    if (!file) {
      return { valid: false, errors: ["No file selected"] };
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      errors.push("Only image files are allowed");
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errors.push("Image size must be less than 5MB");
    }

    // Check specific image formats
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      errors.push("Only JPEG, PNG, and WebP images are supported");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Format profile image URL
   * @param {string} imagePath - Relative image path from backend
   * @returns {string} Full image URL
   */
  formatImageUrl(imagePath) {
    if (!imagePath) return null;

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Convert relative path to full URL
    return `http://localhost:5001${imagePath}`;
  }

  /**
   * Get user initials from full name
   * @param {string} fullName - User's full name
   * @returns {string} User initials
   */
  getUserInitials(fullName) {
    if (!fullName) return "U";

    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

  /**
   * Format phone number for display
   * @param {string} phone - Phone number
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber(phone) {
    if (!phone) return "";

    // Basic formatting - you can enhance this based on your needs
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
        3,
        6
      )}-${cleaned.substring(6)}`;
    }

    return phone; // Return original if not standard format
  }

  /**
   * Calculate age from date of birth
   * @param {string|Date} dateOfBirth - Date of birth
   * @returns {number|null} Age in years
   */
  calculateAge(dateOfBirth) {
    if (!dateOfBirth) return null;

    const birth = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} Validation result with strength score
   */
  validatePassword(password) {
    const result = {
      valid: false,
      score: 0,
      feedback: [],
    };

    if (!password) {
      result.feedback.push("Password is required");
      return result;
    }

    if (password.length < 6) {
      result.feedback.push("Password must be at least 6 characters long");
    } else {
      result.score += 1;
    }

    if (password.length >= 8) {
      result.score += 1;
    }

    if (/[A-Z]/.test(password)) {
      result.score += 1;
    } else {
      result.feedback.push("Include at least one uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      result.score += 1;
    } else {
      result.feedback.push("Include at least one lowercase letter");
    }

    if (/\d/.test(password)) {
      result.score += 1;
    } else {
      result.feedback.push("Include at least one number");
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      result.score += 1;
    } else {
      result.feedback.push("Include at least one special character");
    }

    result.valid = result.score >= 3 && password.length >= 6;

    return result;
  }
}

// Create and export singleton instance
const profileService = new ProfileService();
export default profileService;
