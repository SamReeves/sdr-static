// Main application entry point
import { initLogo } from './modules/logo.js';
import { initSmoothScroll } from './modules/navigation.js';
import { initScrollAnimations } from './modules/animations.js';
import { renderServices } from './modules/services.js';

/**
 * Initialize the application
 */
function init() {
  // Render dynamic content
  const servicesContainer = document.querySelector('.services__grid');
  if (servicesContainer) {
    renderServices(servicesContainer);
  }
  
  // Initialize interactive features
  initLogo();
  initSmoothScroll();
  initScrollAnimations();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

