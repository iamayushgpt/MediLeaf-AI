/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and errors
 */
const validatePassword = (password) => {
  const errors = [];

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (password && password.length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate full name
 * @param {string} fullName - Full name to validate
 * @returns {object} Validation result with isValid and errors
 */
const validateFullName = (fullName) => {
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (fullName && fullName.trim().length > 100) {
    errors.push("Full name must be less than 100 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate registration data
 * @param {object} data - Registration data {fullName, email, password}
 * @returns {object} Validation result with isValid and errors
 */
const validateRegistration = (data) => {
  const { fullName, email, password } = data;
  const errors = [];

  // Check required fields
  if (!fullName) errors.push("Full name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  // Validate individual fields
  if (fullName) {
    const nameValidation = validateFullName(fullName);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
  }

  if (email && !isValidEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (password) {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate login data
 * @param {object} data - Login data {email, password}
 * @returns {object} Validation result with isValid and errors
 */
const validateLogin = (data) => {
  const { email, password } = data;
  const errors = [];

  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (email && !isValidEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  isValidEmail,
  validatePassword,
  validateFullName,
  validateRegistration,
  validateLogin,
};
