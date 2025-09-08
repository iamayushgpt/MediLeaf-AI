const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const { body, validationResult } = require("express-validator");
const { authenticate: auth } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Create uploads directory if it doesn't exist
const createUploadsDir = async () => {
  const uploadsDir = path.join(__dirname, "..", "uploads", "profiles");
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error("Error creating uploads directory:", error);
  }
};

createUploadsDir();

/**
 * @route GET /api/profile
 * @desc Get current user profile
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth || "",
          address: user.address || "",
          city: user.city || "",
          country: user.country || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route PUT /api/profile
 * @desc Update user profile
 * @access Private
 */
router.put(
  "/",
  auth,
  upload.single("profileImage"),
  [
    body("fullName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Full name must be between 2 and 50 characters"),
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("phone")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 20 })
      .withMessage("Phone number must be less than 20 characters"),
    body("gender")
      .optional()
      .isIn(["male", "female", "other", "prefer-not-to-say"])
      .withMessage("Invalid gender selection"),
    body("dateOfBirth")
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage("Please provide a valid date"),
    body("address")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 200 })
      .withMessage("Address must not exceed 200 characters"),
    body("city")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 50 })
      .withMessage("City name must not exceed 50 characters"),
    body("country")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 50 })
      .withMessage("Country name must not exceed 50 characters"),
    body("bio")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage("Bio must not exceed 500 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const userId = req.user.id;

      // Build update data dynamically - only include fields that are provided
      const updateData = { updatedAt: new Date() };

      if (req.body.fullName !== undefined)
        updateData.fullName = req.body.fullName;
      if (req.body.email !== undefined) updateData.email = req.body.email;
      if (req.body.phone !== undefined) updateData.phone = req.body.phone || "";
      if (req.body.gender !== undefined)
        updateData.gender = req.body.gender || "";
      if (req.body.dateOfBirth !== undefined)
        updateData.dateOfBirth = req.body.dateOfBirth || null;
      if (req.body.address !== undefined)
        updateData.address = req.body.address || "";
      if (req.body.city !== undefined) updateData.city = req.body.city || "";
      if (req.body.country !== undefined)
        updateData.country = req.body.country || "";
      if (req.body.bio !== undefined) updateData.bio = req.body.bio || "";

      // Check if email is already taken by another user
      if (req.body.email) {
        const existingUser = await User.findOne({
          email: req.body.email,
          _id: { $ne: userId },
        });

        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email is already registered with another account",
          });
        }
      }

      // Handle profile image upload
      if (req.file) {
        try {
          const fileName = `profile_${userId}_${Date.now()}.jpg`;
          const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            "profiles",
            fileName
          );

          // Process and save image
          await sharp(req.file.buffer)
            .resize(300, 300, {
              fit: "cover",
              position: "center",
            })
            .jpeg({ quality: 90 })
            .toFile(filePath);

          // Delete old profile image if it exists
          const currentUser = await User.findById(userId);
          if (currentUser.profileImage) {
            const oldImagePath = path.join(
              __dirname,
              "..",
              "uploads",
              "profiles",
              path.basename(currentUser.profileImage)
            );
            try {
              await fs.unlink(oldImagePath);
            } catch (error) {
              console.log("Old image deletion failed:", error.message);
            }
          }

          updateData.profileImage = `/uploads/profiles/${fileName}`;
        } catch (imageError) {
          console.error("Image processing error:", imageError);
          return res.status(400).json({
            success: false,
            message: "Failed to process profile image",
          });
        }
      }

      // Update user profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user: {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            dateOfBirth: updatedUser.dateOfBirth,
            address: updatedUser.address,
            city: updatedUser.city,
            country: updatedUser.country,
            bio: updatedUser.bio,
            profileImage: updatedUser.profileImage,
            updatedAt: updatedUser.updatedAt,
          },
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating profile",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
);

/**
 * @route PUT /api/profile/password
 * @desc Change user password
 * @access Private
 */
router.put(
  "/password",
  auth,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password confirmation does not match new password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Get user with password
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await User.findByIdAndUpdate(userId, {
        password: hashedNewPassword,
        updatedAt: new Date(),
      });

      res.json({
        success: true,
        message: "Password updated successfully",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating password",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
);

/**
 * @route DELETE /api/profile/image
 * @desc Delete user profile image
 * @access Private
 */
router.delete("/image", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.profileImage) {
      // Delete image file
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "profiles",
        path.basename(user.profileImage)
      );
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.log("Image file deletion failed:", error.message);
      }

      // Remove image reference from database
      await User.findByIdAndUpdate(userId, {
        $unset: { profileImage: 1 },
        updatedAt: new Date(),
      });
    }

    res.json({
      success: true,
      message: "Profile image deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Delete profile image error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting profile image",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route GET /api/profile/stats
 * @desc Get user activity statistics
 * @access Private
 */
router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // In a real application, you would query your analytics/activity collections
    // For now, returning mock data
    const stats = {
      plantsIdentified: 0,
      scansCompleted: 0,
      accountAge: Math.floor(
        (Date.now() - new Date(req.user.createdAt)) / (1000 * 60 * 60 * 24)
      ), // days
      lastActivity: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get profile stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Error handler for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size allowed is 5MB.",
      });
    }
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({
      success: false,
      message: "Only image files are allowed for profile pictures.",
    });
  }

  next(error);
});

module.exports = router;
