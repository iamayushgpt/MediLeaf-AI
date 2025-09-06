const User = require("../models/User");
const { verifyToken, extractToken } = require("../utils/jwt");
const { sendUnauthorized } = require("../utils/response");

/**
 * Authentication middleware
 * Verifies JWT token and adds user to request object
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = extractToken(authHeader);

    if (!token) {
      return sendUnauthorized(res, "No token provided");
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendUnauthorized(res, "Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    return sendUnauthorized(res, "Invalid token");
  }
};

/**
 * Optional authentication middleware
 * Adds user to request if token is valid, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = extractToken(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};

/**
 * Role-based authorization middleware
 * @param {array} allowedRoles - Array of allowed roles
 */
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendUnauthorized(res, "Authentication required");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return sendUnauthorized(res, "Insufficient permissions");
    }

    next();
  };
};

module.exports = {
  authenticate,
  optionalAuth,
  authorize,
};
