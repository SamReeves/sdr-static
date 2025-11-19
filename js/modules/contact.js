/**
 * Contact form handling module
 */

import { validationRules, VALIDATION_CONFIG, VALIDATION_MESSAGES } from '../config/validation.js';
import { showSuccess, showError } from './notifications.js';

/**
 * Initializes the contact form with validation and submission handling
 */
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', handleSubmit);
  addFieldValidation(form);
}

/**
 * Handles form submission
 * @param {Event} e - The submit event
 */
function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };
  
  if (!validateFormData(formData)) {
    return;
  }
  
  // Log form data (replace with actual backend call)
  console.log('Form submitted:', formData);
  
  showSuccessMessage();
  form.reset();
}

/**
 * Validates form data using configured validation rules
 * @param {Object} data - Form data object
 * @returns {boolean} True if valid
 */
function validateFormData(data) {
  for (const [field, rule] of Object.entries(validationRules)) {
    if (!rule.validate(data[field])) {
      showError(rule.getMessage());
    return false;
  }
  }
  return true;
}

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
  return VALIDATION_CONFIG.EMAIL_REGEX.test(email);
}

/**
 * Adds real-time field validation
 * @param {HTMLFormElement} form - The form element
 */
function addFieldValidation(form) {
  const fields = form.querySelectorAll('input, textarea');
  
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });
}

/**
 * Validates a single field
 * @param {HTMLElement} field - The field to validate
 */
function validateField(field) {
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    markFieldInvalid(field);
    return false;
  }
  
  if (field.type === 'email' && value && !isValidEmail(value)) {
    markFieldInvalid(field);
    return false;
  }
  
  markFieldValid(field);
  return true;
}

/**
 * Marks a field as invalid
 * @param {HTMLElement} field - The field element
 */
function markFieldInvalid(field) {
  field.classList.add('contact__form-field--error');
  field.setAttribute('aria-invalid', 'true');
}

/**
 * Marks a field as valid
 * @param {HTMLElement} field - The field element
 */
function markFieldValid(field) {
  field.classList.remove('contact__form-field--error');
  field.removeAttribute('aria-invalid');
}

/**
 * Clears field error state
 * @param {HTMLElement} field - The field element
 */
function clearFieldError(field) {
  field.classList.remove('contact__form-field--error');
  field.removeAttribute('aria-invalid');
}

/**
 * Shows a success message after form submission
 */
function showSuccessMessage() {
  showSuccess('Thank you for your message! We\'ll get back to you soon.');
}

