/**
 * Form validation configuration
 */

export const VALIDATION_CONFIG = {
  MIN_NAME_LENGTH: 2,
  MIN_MESSAGE_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_SHORT: (min) => `Name must be at least ${min} characters`,
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  MESSAGE_REQUIRED: 'Message is required',
  MESSAGE_TOO_SHORT: (min) => `Message must be at least ${min} characters`,
  FIELD_REQUIRED: 'This field is required'
};

/**
 * Validation rules for form fields
 */
export const validationRules = {
  name: {
    validate: (value) => value && value.length >= VALIDATION_CONFIG.MIN_NAME_LENGTH,
    getMessage: () => VALIDATION_MESSAGES.NAME_TOO_SHORT(VALIDATION_CONFIG.MIN_NAME_LENGTH)
  },
  email: {
    validate: (value) => value && VALIDATION_CONFIG.EMAIL_REGEX.test(value),
    getMessage: () => VALIDATION_MESSAGES.EMAIL_INVALID
  },
  message: {
    validate: (value) => value && value.length >= VALIDATION_CONFIG.MIN_MESSAGE_LENGTH,
    getMessage: () => VALIDATION_MESSAGES.MESSAGE_TOO_SHORT(VALIDATION_CONFIG.MIN_MESSAGE_LENGTH)
  }
};

