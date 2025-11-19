/**
 * Scroll-based animations module
 */

import { ANIMATION_CONFIG } from '../config/constants.js';

const { SCROLL, CARD } = ANIMATION_CONFIG;

/**
 * Initializes intersection observer for scroll animations
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: SCROLL.THRESHOLD,
    rootMargin: SCROLL.ROOT_MARGIN
  });
  
  // Observe service cards
  document.querySelectorAll('.service-card').forEach(card => {
    prepareForAnimation(card);
    observer.observe(card);
  });
}

/**
 * Prepares an element for animation
 * @param {HTMLElement} element - The element to prepare
 */
function prepareForAnimation(element) {
  element.style.opacity = '0';
  element.style.transform = `translateY(${CARD.TRANSLATE_Y}px)`;
  element.style.transition = `opacity ${CARD.FADE_DURATION}s ease, transform ${CARD.FADE_DURATION}s ease`;
}

/**
 * Handles intersection observer entries
 * @param {Array<IntersectionObserverEntry>} entries - Observer entries
 */
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}

