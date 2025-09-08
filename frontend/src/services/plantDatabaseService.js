/**
 * Plant Database Service
 * Provides centralized access to plant information from backend database
 * Industry Best Practice: Frontend service layer for API interaction
 */

const API_BASE_URL = "http://localhost:5001/api";

class PlantDatabaseService {
  /**
   * Get detailed information about a specific plant
   * @param {string} plantName - Name of the plant
   * @returns {Promise<Object>} Plant information
   */
  async getPlantInfo(plantName) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/plant-database/info/${encodeURIComponent(plantName)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch plant information");
      }

      return data;
    } catch (error) {
      console.error("Error fetching plant info:", error);
      throw error;
    }
  }

  /**
   * Get list of all plants in database
   * @returns {Promise<Array>} List of plant names
   */
  async getAllPlants() {
    try {
      const response = await fetch(`${API_BASE_URL}/plant-database/list`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch plant list");
      }

      return data.data.plants;
    } catch (error) {
      console.error("Error fetching plant list:", error);
      throw error;
    }
  }

  /**
   * Get plants by family classification
   * @param {string} family - Plant family name
   * @returns {Promise<Array>} Plants in the family
   */
  async getPlantsByFamily(family) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/plant-database/family/${encodeURIComponent(family)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch plants by family");
      }

      return data.data.plants;
    } catch (error) {
      console.error("Error fetching plants by family:", error);
      throw error;
    }
  }

  /**
   * Search plants by medicinal use
   * @param {string} use - Medicinal use to search for
   * @returns {Promise<Array>} Plants with the specified use
   */
  async getPlantsByUse(use) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/plant-database/use/${encodeURIComponent(use)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch plants by use");
      }

      return data.data.plants;
    } catch (error) {
      console.error("Error fetching plants by use:", error);
      throw error;
    }
  }

  /**
   * Get database statistics
   * @returns {Promise<Object>} Database statistics
   */
  async getDatabaseStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/plant-database/stats`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch database stats");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching database stats:", error);
      throw error;
    }
  }

  /**
   * Advanced search functionality
   * @param {Object} params - Search parameters
   * @param {string} params.query - Search query
   * @param {string} params.family - Family filter
   * @param {string} params.use - Medicinal use filter
   * @param {number} params.limit - Result limit
   * @returns {Promise<Array>} Search results
   */
  async searchPlants(params = {}) {
    try {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value);
        }
      });

      const response = await fetch(
        `${API_BASE_URL}/plant-database/search?${searchParams}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to search plants");
      }

      return data.data.results;
    } catch (error) {
      console.error("Error searching plants:", error);
      throw error;
    }
  }

  /**
   * Format plant information for display
   * @param {Object} plantInfo - Raw plant information
   * @returns {Object} Formatted plant information
   */
  formatPlantInfo(plantInfo) {
    return {
      ...plantInfo,
      medicinalUsesFormatted:
        plantInfo.medicinalUses?.join(", ") || "Not available",
      contraIndicationsFormatted:
        plantInfo.contraindications?.join(", ") || "None specified",
      activeCompoundsFormatted:
        plantInfo.activeCompounds?.join(", ") || "Not analyzed",
    };
  }

  /**
   * Get confidence level styling
   * @param {number} confidence - Confidence score (0-1)
   * @returns {Object} Styling information
   */
  getConfidenceLevel(confidence) {
    if (confidence >= 0.9) {
      return {
        level: "Very High",
        color: "emerald",
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-800",
        borderColor: "border-emerald-300",
      };
    }
    if (confidence >= 0.7) {
      return {
        level: "High",
        color: "green",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-300",
      };
    }
    if (confidence >= 0.5) {
      return {
        level: "Moderate",
        color: "yellow",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-300",
      };
    }
    if (confidence >= 0.3) {
      return {
        level: "Low",
        color: "orange",
        bgColor: "bg-orange-100",
        textColor: "text-orange-800",
        borderColor: "border-orange-300",
      };
    }
    return {
      level: "Very Low",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-300",
    };
  }

  /**
   * Check if plant database is available
   * @returns {Promise<boolean>} Database availability status
   */
  async isDatabaseAvailable() {
    try {
      await this.getDatabaseStats();
      return true;
    } catch (error) {
      console.warn("Plant database not available:", error);
      return false;
    }
  }
}

// Create singleton instance
const plantDatabaseService = new PlantDatabaseService();

export default plantDatabaseService;
