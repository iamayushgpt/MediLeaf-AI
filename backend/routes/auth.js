const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../services/authService");
const { authenticate } = require("../middleware/auth");
const {
  sendSuccess,
  sendError,
  sendServerError,
} = require("../utils/response");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, 201, "User registered successfully", result);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    return sendError(res, 401, error.message);
  }
});

// Get current user
router.get("/me", authenticate, async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.user._id);
    return sendSuccess(res, 200, "User profile retrieved", {
      user: userProfile,
    });
  } catch (error) {
    return sendServerError(res, error.message);
  }
});

module.exports = router;
