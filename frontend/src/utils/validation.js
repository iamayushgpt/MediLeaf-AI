/**
 * Frontend validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: "Password must be less than 128 characters",
    };
  }

  return { isValid: true, message: "" };
};

/**
 * Validate full name
 * @param {string} fullName - Full name to validate
 * @returns {object} Validation result with isValid and message
 */
export const validateFullName = (fullName) => {
  if (!fullName || fullName.trim().length < 2) {
    return {
      isValid: false,
      message: "Full name must be at least 2 characters long",
    };
  }

  if (fullName.trim().length > 100) {
    return {
      isValid: false,
      message: "Full name must be less than 100 characters",
    };
  }

  return { isValid: true, message: "" };
};

/**
 * Validate form data
 * @param {object} data - Form data to validate
 * @param {array} rules - Validation rules
 * @returns {object} Validation result with isValid and errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  for (const [field, validators] of Object.entries(rules)) {
    const value = data[field];

    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  }

  return { isValid, errors };
};

/**
 * Required field validator
 * @param {string} fieldName - Name of the field
 * @returns {function} Validator function
 */
export const required = (fieldName) => (value) => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  return { isValid: true, message: "" };
};

/**
 * Email validator
 * @param {string} value - Email value
 * @returns {object} Validation result
 */
export const email = (value) => {
  if (value && !isValidEmail(value)) {
    return {
      isValid: false,
      message: "Please provide a valid email address",
    };
  }
  return { isValid: true, message: "" };
};

/**
 * Password validator
 * @param {string} value - Password value
 * @returns {object} Validation result
 */
export const password = (value) => {
  return validatePassword(value);
};

/**
 * Full name validator
 * @param {string} value - Full name value
 * @returns {object} Validation result
 */
export const fullName = (value) => {
  return validateFullName(value);
};
