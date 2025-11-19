/**
 * DOM utility functions
 */

/**
 * Creates an HTML element with class and content
 * @param {string} tag - HTML tag name
 * @param {Object} options - Element options
 * @returns {HTMLElement} The created element
 */
export function createElement(tag, { className, textContent, innerHTML, attrs = {} } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  if (innerHTML) element.innerHTML = innerHTML;
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

/**
 * Adds event listener to an element (with optional delegation)
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {string} [selector] - Optional selector for event delegation
 */
export function on(element, event, handler, selector) {
  if (selector) {
    element.addEventListener(event, (e) => {
      if (e.target.matches(selector)) {
        handler.call(e.target, e);
      }
    });
  } else {
    element.addEventListener(event, handler);
  }
}

/**
 * Queries a single element
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [context=document] - Context to search within
 * @returns {HTMLElement|null} Found element or null
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Queries multiple elements
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [context=document] - Context to search within
 * @returns {NodeList} Found elements
 */
export function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}

