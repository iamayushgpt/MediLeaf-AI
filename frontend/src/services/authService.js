import api from "../utils/api.js";
import { setToken, removeToken } from "../utils/token.js";

/**
 * Authentication service
 */
class AuthService {
  /**
   * Register a new user
   * @param {object} userData - Registration data
   * @returns {Promise<object>} Registration result
   */
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Login user
   * @param {object} credentials - Login credentials
   * @returns {Promise<object>} Login result
   */
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);

      if (response.data.success && response.data.token) {
        setToken(response.data.token);
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<object>} User profile result
   */
  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  /**
   * Logout user
   */
  logout() {
    removeToken();
  }

  /**
   * Handle API errors
   * @param {object} error - Axios error object
   * @returns {string} Error message
   */
  handleError(error) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    } else if (error.code === "ERR_NETWORK") {
      return "Cannot connect to server. Please check your internet connection.";
    }
    return "An unexpected error occurred";
  }
}

// Export singleton instance
export default new AuthService();
