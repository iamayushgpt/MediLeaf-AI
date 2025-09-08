const { PythonShell } = require("python-shell");
const { spawn } = require("child_process");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { getPlantInfo } = require("../data/plantDatabase");

class MLService {
  constructor() {
    this.modelPath = path.join(__dirname, "..", "model_kag_.keras");
    this.pythonScript = path.join(__dirname, "..", "ml", "predict.py");
    this.uploadDir = path.join(__dirname, "..", "uploads");
    this.tempDir = path.join(__dirname, "..", "temp");
    this.initDirectories();
  }

  async initDirectories() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      console.error("Error creating directories:", error);
    }
  }

  /**
   * Process and prepare image for ML prediction
   * @param {Buffer} imageBuffer - Raw image buffer
   * @param {string} originalName - Original filename
   * @returns {Object} Processing result
   */
  async processImage(imageBuffer, originalName) {
    try {
      const fileId = uuidv4();
      const fileExtension = path.extname(originalName).toLowerCase();
      const processedFileName = `${fileId}_processed.jpg`;
      const processedPath = path.join(this.tempDir, processedFileName);

      // Validate image format
      const validFormats = [".jpg", ".jpeg", ".png", ".bmp", ".tiff"];
      if (!validFormats.includes(fileExtension)) {
        throw new Error(`Unsupported image format: ${fileExtension}`);
      }

      // Process image with Sharp
      await sharp(imageBuffer)
        .resize(299, 299, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 90 })
        .toFile(processedPath);

      // Get image metadata
      const metadata = await sharp(imageBuffer).metadata();

      return {
        success: true,
        processedPath,
        fileId,
        originalName,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          size: metadata.size,
        },
      };
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  /**
   * Run ML prediction using Python script (alternative method with child_process)
   * @param {string} imagePath - Path to processed image
   * @returns {Object} Prediction results
   */
  async predictWithChildProcess(imagePath) {
    return new Promise((resolve, reject) => {
      const pythonArgs = [this.pythonScript, this.modelPath, imagePath];

      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        pythonProcess.kill();
        reject(new Error("ML prediction timeout - please try again"));
      }, 120000);

      const pythonProcess = spawn("python", pythonArgs, {
        cwd: path.dirname(this.pythonScript),
        stdio: ["pipe", "pipe", "pipe"],
      });

      let outputData = "";
      let errorData = "";

      pythonProcess.stdout.on("data", (data) => {
        outputData += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        errorData += data.toString();
      });

      pythonProcess.on("close", (code) => {
        clearTimeout(timeout);

        if (code !== 0) {
          reject(
            new Error(`ML prediction failed: ${errorData || "Unknown error"}`)
          );
          return;
        }

        try {
          const result = JSON.parse(outputData.trim());
          resolve(result);
        } catch (parseError) {
          reject(
            new Error(`Failed to parse ML results: ${parseError.message}`)
          );
        }
      });

      pythonProcess.on("error", (error) => {
        clearTimeout(timeout);
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  }

  /**
   * Run ML prediction using Python script
   * @param {string} imagePath - Path to processed image
   * @returns {Object} Prediction results
   */
  async predict(imagePath) {
    return new Promise((resolve, reject) => {
      const options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"],
        scriptPath: path.dirname(this.pythonScript),
        args: [this.modelPath, imagePath],
      };

      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        reject(new Error("ML prediction timeout - please try again"));
      }, 120000);

      PythonShell.run("predict.py", options, (err, results) => {
        clearTimeout(timeout);

        if (err) {
          reject(new Error(`ML prediction failed: ${err.message}`));
          return;
        }

        if (!results || results.length === 0) {
          reject(new Error("No results from ML model"));
          return;
        }

        try {
          const result = results[0];
          resolve(result);
        } catch (parseError) {
          reject(
            new Error(`Failed to parse ML results: ${parseError.message}`)
          );
        }
      });
    });
  }

  /**
   * Clean up temporary files
   * @param {string} filePath - Path to file to delete
   */
  async cleanup(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Cleanup error:", error);
    }
  }

  /**
   * Complete plant identification workflow
   * @param {Buffer} imageBuffer - Raw image buffer
   * @param {string} originalName - Original filename
   * @returns {Object} Complete identification result
   */
  async identifyPlant(imageBuffer, originalName) {
    let processedPath = null;

    try {
      // Step 1: Process image
      const processResult = await this.processImage(imageBuffer, originalName);
      processedPath = processResult.processedPath;

      // Step 2: Run ML prediction
      let prediction;
      try {
        prediction = await this.predictWithChildProcess(processedPath);
      } catch (childProcessError) {
        // Fallback to PythonShell if child_process fails
        prediction = await this.predict(processedPath);
      }

      // Step 3: Enhance results with additional info
      const enhancedResult = await this.enhancePredictionResults(prediction);

      return {
        success: true,
        imageInfo: {
          originalName: processResult.originalName,
          fileId: processResult.fileId,
          metadata: processResult.metadata,
        },
        prediction: enhancedResult,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    } finally {
      // Always cleanup temp files
      if (processedPath) {
        await this.cleanup(processedPath);
      }
    }
  }

  /**
   * Enhance prediction results with additional plant information
   * @param {Object} prediction - Raw prediction from ML model
   * @returns {Object} Enhanced prediction with plant details
   */
  async enhancePredictionResults(prediction) {
    if (!prediction.success || !prediction.predictions) {
      return prediction;
    }

    // Enhance each prediction with detailed information from centralized database
    const enhancedPredictions = prediction.predictions.map((pred) => {
      const plantInfo = getPlantInfo(pred.plant_name);

      // Fallback data if plant not found in database
      const defaultInfo = {
        scientificName: "Scientific name not available",
        family: "Family classification pending",
        medicinalUses: ["Medicinal information not available in database"],
        preparation: "Consult qualified herbalist or healthcare provider",
        precautions: "Always consult healthcare provider before medicinal use",
        activeCompounds: ["Compound analysis pending"],
        dosage: "Professional guidance required",
        contraindications: ["Consult healthcare provider"],
      };

      const finalInfo = plantInfo || defaultInfo;

      return {
        ...pred,
        scientificName: finalInfo.scientificName,
        family: finalInfo.family,
        medicinalUses: finalInfo.medicinalUses,
        preparation: finalInfo.preparation,
        precautions: finalInfo.precautions,
        activeCompounds: finalInfo.activeCompounds,
        dosage: finalInfo.dosage,
        contraindications: finalInfo.contraindications,
        confidenceLevel: this.getConfidenceLevel(pred.confidence),
        dataSource: plantInfo ? "database" : "fallback",
      };
    });

    return {
      ...prediction,
      predictions: enhancedPredictions,
      recommendedActions: this.getRecommendedActions(enhancedPredictions[0]),
      databaseInfo: {
        totalPlantsInDatabase: Object.keys(
          require("../data/plantDatabase").PLANT_DATABASE
        ).length,
        lastUpdated: new Date().toISOString(),
      },
    };
  }

  /**
   * Get confidence level description
   * @param {number} confidence - Confidence score (0-1)
   * @returns {string} Confidence level description
   */
  getConfidenceLevel(confidence) {
    if (confidence >= 0.9) return "Very High";
    if (confidence >= 0.7) return "High";
    if (confidence >= 0.5) return "Moderate";
    if (confidence >= 0.3) return "Low";
    return "Very Low";
  }

  /**
   * Get recommended actions based on prediction
   * @param {Object} topPrediction - Top prediction result
   * @returns {Array} Recommended actions
   */
  getRecommendedActions(topPrediction) {
    const actions = [];

    if (topPrediction.confidence >= 0.8) {
      actions.push("High confidence identification - proceed with caution");
      actions.push("Verify with botanical expert if using medicinally");
    } else if (topPrediction.confidence >= 0.6) {
      actions.push("Moderate confidence - consider additional verification");
      actions.push("Compare with reference images");
    } else {
      actions.push("Low confidence - manual verification strongly recommended");
      actions.push("Consult botanical expert before use");
    }

    actions.push("Always consult healthcare provider before medicinal use");
    return actions;
  }

  /**
   * Validate model and Python environment
   * @returns {Object} Validation results
   */
  async validateEnvironment() {
    try {
      // Check if model file exists
      await fs.access(this.modelPath);

      // Check if Python script exists
      await fs.access(this.pythonScript);

      // Test Python environment (simplified check)
      return new Promise((resolve) => {
        const options = {
          mode: "text",
          pythonPath: "python",
          pythonOptions: ["-c"],
          args: ['import tensorflow, numpy, PIL; print("OK")'],
        };

        PythonShell.run("", options, (err, results) => {
          if (err) {
            resolve({
              valid: false,
              error: "Python environment validation failed",
              details: err.message,
            });
          } else {
            resolve({
              valid: true,
              message: "Environment validation successful",
            });
          }
        });
      });
    } catch (error) {
      return {
        valid: false,
        error: "File validation failed",
        details: error.message,
      };
    }
  }
}

module.exports = MLService;
