const express = require("express");
const multer = require("multer");
const MLService = require("../services/mlService");
const { authenticate } = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/response");
const router = express.Router();

// Initialize ML service
const mlService = new MLService();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/bmp",
      "image/tiff",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, BMP, and TIFF images are allowed."
        ),
        false
      );
    }
  },
});

/**
 * @route POST /api/plants/identify
 * @desc Upload image and identify plant
 * @access Private
 */
router.post(
  "/identify",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      // Validate file upload
      if (!req.file) {
        return sendError(res, 400, "No image file provided");
      }

      // Log upload info
      console.log(
        `Processing image: ${req.file.originalname}, Size: ${req.file.size} bytes`
      );

      // Run plant identification
      const result = await mlService.identifyPlant(
        req.file.buffer,
        req.file.originalname
      );

      if (result.success) {
        // Log successful identification
        const topPrediction = result.prediction.predictions[0];
        console.log(
          `Identification successful: ${topPrediction.plant_name} (${topPrediction.confidence_percentage}%)`
        );

        sendSuccess(res, 200, "Plant identified successfully", result);
      } else {
        console.error("Identification failed:", result.error);
        sendError(res, 500, result.error);
      }
    } catch (error) {
      console.error("Plant identification error:", error);

      // Handle specific multer errors
      if (error.code === "LIMIT_FILE_SIZE") {
        return sendError(res, 400, "File too large. Maximum size is 10MB");
      }

      if (error.message.includes("Invalid file type")) {
        return sendError(res, 400, error.message);
      }

      sendError(res, 500, "Plant identification failed");
    }
  }
);

/**
 * @route GET /api/plants/health
 * @desc Check ML service health and environment
 * @access Private
 */
router.get("/health", authenticate, async (req, res) => {
  try {
    const validation = await mlService.validateEnvironment();

    if (validation.valid) {
      sendSuccess(res, 200, "ML service is healthy", validation);
    } else {
      sendError(res, 500, validation.error, [validation.details]);
    }
  } catch (error) {
    console.error("Health check error:", error);
    sendError(res, 500, "Health check failed");
  }
});

/**
 * @route GET /api/plants/supported-formats
 * @desc Get list of supported image formats
 * @access Public
 */
router.get("/supported-formats", (req, res) => {
  const supportedFormats = {
    formats: [
      {
        extension: ".jpg",
        mimeType: "image/jpeg",
        description: "JPEG image format",
      },
      {
        extension: ".jpeg",
        mimeType: "image/jpeg",
        description: "JPEG image format",
      },
      {
        extension: ".png",
        mimeType: "image/png",
        description: "PNG image format",
      },
      {
        extension: ".bmp",
        mimeType: "image/bmp",
        description: "Bitmap image format",
      },
      {
        extension: ".tiff",
        mimeType: "image/tiff",
        description: "TIFF image format",
      },
    ],
    maxFileSize: "10MB",
    recommendations: [
      "Use high-quality images for better results",
      "Ensure good lighting and clear focus",
      "Center the plant in the image",
      "Avoid blurry or low-resolution images",
    ],
  };

  sendSuccess(
    res,
    200,
    "Supported formats retrieved successfully",
    supportedFormats
  );
});

/**
 * @route POST /api/plants/batch-identify
 * @desc Upload multiple images for batch identification
 * @access Private
 */
router.post(
  "/batch-identify",
  authenticate,
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return sendError(res, 400, "No image files provided");
      }

      console.log(
        `Processing ${req.files.length} images for batch identification`
      );

      const results = [];

      // Process each image
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        console.log(
          `Processing image ${i + 1}/${req.files.length}: ${file.originalname}`
        );

        try {
          const result = await mlService.identifyPlant(
            file.buffer,
            file.originalname
          );
          results.push({
            index: i + 1,
            filename: file.originalname,
            ...result,
          });
        } catch (error) {
          results.push({
            index: i + 1,
            filename: file.originalname,
            success: false,
            error: error.message,
          });
        }
      }

      const successCount = results.filter((r) => r.success).length;
      const message = `Batch processing completed: ${successCount}/${results.length} successful`;

      sendSuccess(res, 200, message, {
        totalProcessed: results.length,
        successfulIdentifications: successCount,
        results: results,
      });
    } catch (error) {
      console.error("Batch identification error:", error);
      sendError(res, 500, "Batch identification failed");
    }
  }
);

/**
 * @route GET /api/plants/model-info
 * @desc Get information about the ML model
 * @access Private
 */
router.get("/model-info", authenticate, (req, res) => {
  const modelInfo = {
    modelType: "Keras CNN",
    modelFile: "model_kag_.keras",
    inputSize: "299x299 pixels",
    totalClasses: 80,
    supportedClasses: [
      "Aloevera",
      "Amla",
      "Amruthaballi",
      "Arali",
      "Astma_weed",
      "Badipala",
      "Balloon_Vine",
      "Bamboo",
      "Beans",
      "Betel",
      "Bhrami",
      "Bringaraja",
      "Caricature",
      "Castor",
      "Catharanthus",
      "Chakte",
      "Chilly",
      "Citron lime (herelikai)",
      "Coffee",
      "Common rue(naagdalli)",
      "Coriender",
      "Curry",
      "Doddpathre",
      "Drumstick",
      "Ekka",
      "Eucalyptus",
      "Ganigale",
      "Ganike",
      "Gasagase",
      "Ginger",
      "Globe Amarnath",
      "Guava",
      "Henna",
      "Hibiscus",
      "Honge",
      "Insulin",
      "Jackfruit",
      "Jasmine",
      "Kambajala",
      "Kasambruga",
      "Kohlrabi",
      "Lantana",
      "Lemon",
      "Lemongrass",
      "Malabar_Nut",
      "Malabar_Spinach",
      "Mango",
      "Marigold",
      "Mint",
      "Neem",
      "Nelavembu",
      "Nerale",
      "Nooni",
      "Onion",
      "Padri",
      "Palak(Spinach)",
      "Papaya",
      "Parijatha",
      "Pea",
      "Pepper",
      "Pomoegranate",
      "Pumpkin",
      "Raddish",
      "Rose",
      "Sampige",
      "Sapota",
      "Seethaashoka",
      "Seethapala",
      "Spinach1",
      "Tamarind",
      "Taro",
      "Tecoma",
      "Thumbe",
      "Tomato",
      "Tulsi",
      "Turmeric",
      "ashoka",
      "camphor",
      "kamakasturi",
      "kepala",
    ],
    preprocessing: [
      "Resize to 299x299 pixels",
      "Normalize pixel values (0-1)",
      "Convert to RGB format",
    ],
    outputFormat: "Confidence scores for each class",
    version: "1.0",
    lastUpdated: new Date().toISOString(),
  };

  sendSuccess(res, 200, "Model information retrieved successfully", modelInfo);
});

module.exports = router;
