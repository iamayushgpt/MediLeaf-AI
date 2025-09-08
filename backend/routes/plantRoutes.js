const express = require("express");
const {
  getPlantInfo,
  getAllPlantNames,
  getPlantsByFamily,
  getPlantsByMedicinalUse,
  getDatabaseStats,
} = require("../data/plantDatabase");

const router = express.Router();

/**
 * @route GET /api/plants/info/:plantName
 * @desc Get detailed information about a specific plant
 * @access Public
 */

router.get("/info/:plantName", async (req, res) => {
  try {
    const { plantName } = req.params;
    const plantInfo = getPlantInfo(plantName);

    if (!plantInfo) {
      return res.status(404).json({
        success: false,
        message: `Plant '${plantName}' not found in database`,
        suggestion:
          "Please check the plant name spelling or browse available plants",
      });
    }

    res.json({
      success: true,
      data: {
        name: plantName,
        ...plantInfo,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving plant information",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/plants/list
 * @desc Get list of all plants in database
 * @access Public
 */
router.get("/list", async (req, res) => {
  try {
    const plantNames = getAllPlantNames();

    res.json({
      success: true,
      data: {
        plants: plantNames,
        count: plantNames.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving plant list",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/plants/family/:familyName
 * @desc Get plants by family classification
 * @access Public
 */
router.get("/family/:familyName", async (req, res) => {
  try {
    const { familyName } = req.params;
    const plants = getPlantsByFamily(familyName);

    res.json({
      success: true,
      data: {
        family: familyName,
        plants: plants,
        count: plants.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving plants by family",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/plants/use/:medicinalUse
 * @desc Search plants by medicinal use
 * @access Public
 */
router.get("/use/:medicinalUse", async (req, res) => {
  try {
    const { medicinalUse } = req.params;
    const plants = getPlantsByMedicinalUse(medicinalUse);

    res.json({
      success: true,
      data: {
        medicinalUse: medicinalUse,
        plants: plants,
        count: plants.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching plants by medicinal use",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/plants/stats
 * @desc Get database statistics
 * @access Public
 */
router.get("/stats", async (req, res) => {
  try {
    const stats = getDatabaseStats();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving database statistics",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/plants/search
 * @desc Advanced search functionality
 * @access Public
 */
router.get("/search", async (req, res) => {
  try {
    const { query, family, use, limit = 20 } = req.query;
    let results = [];

    if (query) {
      // Search by plant name (case-insensitive)
      const plantNames = getAllPlantNames();
      const matchingNames = plantNames.filter((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      );

      results = matchingNames.map((name) => ({
        name,
        ...getPlantInfo(name),
      }));
    }

    if (family) {
      const familyResults = getPlantsByFamily(family);
      results =
        results.length > 0
          ? results.filter(
              (plant) => plant.family.toLowerCase() === family.toLowerCase()
            )
          : familyResults;
    }

    if (use) {
      const useResults = getPlantsByMedicinalUse(use);
      results =
        results.length > 0
          ? results.filter((plant) =>
              plant.medicinalUses.some((medUse) =>
                medUse.toLowerCase().includes(use.toLowerCase())
              )
            )
          : useResults;
    }

    // Apply limit
    results = results.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: {
        searchQuery: { query, family, use },
        results: results,
        count: results.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error performing search",
      error: error.message,
    });
  }
});

module.exports = router;
