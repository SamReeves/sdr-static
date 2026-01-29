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

