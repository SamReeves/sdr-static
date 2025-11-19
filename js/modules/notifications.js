/**
 * Toast notification system
 * Modern replacement for alert() dialogs
 */

import { NOTIFICATION_CONFIG } from '../config/constants.js';

const { DURATION, ANIMATION_DELAY } = NOTIFICATION_CONFIG;

/**
 * Shows a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Notification type: 'success', 'error', 'info', 'warning'
 */
export function showNotification(message, type = 'info') {
  const notification = createNotificationElement(message, type);
  document.body.appendChild(notification);
  
  // Trigger animation on next frame
  requestAnimationFrame(() => {
    notification.classList.add('notification--visible');
  });
  
  // Auto-remove after duration
  setTimeout(() => {
    hideNotification(notification);
  }, DURATION);
}

/**
 * Creates a notification DOM element
 * @param {string} message - Message text
 * @param {string} type - Notification type
 * @returns {HTMLElement} Notification element
 */
function createNotificationElement(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  
  // Add icon based on type
  const icon = getIconForType(type);
  
  notification.innerHTML = `
    <span class="notification__icon" aria-hidden="true">${icon}</span>
    <span class="notification__message">${escapeHtml(message)}</span>
    <button class="notification__close" aria-label="Close notification">×</button>
  `;
  
  // Add close button handler
  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.addEventListener('click', () => hideNotification(notification));
  
  return notification;
}

/**
 * Hides and removes a notification
 * @param {HTMLElement} notification - Notification element
 */
function hideNotification(notification) {
  notification.classList.remove('notification--visible');
  setTimeout(() => notification.remove(), ANIMATION_DELAY);
}

/**
 * Gets icon emoji for notification type
 * @param {string} type - Notification type
 * @returns {string} Icon emoji
 */
function getIconForType(type) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || icons.info;
}

/**
 * Escapes HTML in strings to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Convenience methods for different notification types
 */
export const showSuccess = (message) => showNotification(message, 'success');
export const showError = (message) => showNotification(message, 'error');
export const showWarning = (message) => showNotification(message, 'warning');
export const showInfo = (message) => showNotification(message, 'info');

