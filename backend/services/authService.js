const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { validateRegistration, validateLogin } = require("../utils/validation");

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {object} Registration result
 */
const registerUser = async (userData) => {
  const { fullName, email, password } = userData;

  // Validate input data
  const validation = validateRegistration({ fullName, email, password });
  if (!validation.isValid) {
    throw new Error(validation.errors.join(", "));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create new user
  const user = new User({
    fullName: fullName.trim(),
    email: email.toLowerCase(),
    password,
  });

  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

/**
 * Login user
 * @param {object} loginData - User login data
 * @returns {object} Login result
 */
const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Validate input data
  const validation = validateLogin({ email, password });
  if (!validation.isValid) {
    throw new Error(validation.errors.join(", "));
  }

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {object} User profile
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || null,
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    bio: user.bio || "",
    profileImage: user.profileImage || "",
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
