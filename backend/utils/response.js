/**
 * Send success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 */
const sendSuccess = (res, statusCode = 200, message = "Success", data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Send error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {array} errors - Array of error details
 */
const sendError = (res, statusCode = 400, message = "Error", errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Send validation error response
 * @param {object} res - Express response object
 * @param {array} errors - Array of validation errors
 */
const sendValidationError = (res, errors = []) => {
  return sendError(res, 400, "Validation failed", errors);
};

/**
 * Send unauthorized response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendUnauthorized = (res, message = "Unauthorized") => {
  return sendError(res, 401, message);
};

/**
 * Send not found response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendNotFound = (res, message = "Resource not found") => {
  return sendError(res, 404, message);
};

/**
 * Send server error response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 */
const sendServerError = (res, message = "Internal server error") => {
  return sendError(res, 500, message);
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendUnauthorized,
  sendNotFound,
  sendServerError,
};
