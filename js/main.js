// Main application entry point
import { initScrollAnimations } from './modules/animations.js';
import { renderServices } from './modules/services.js';
import { initServiceGraph } from './modules/service-graph.js';

/**
 * Initialize the application
 */
function init() {
  // Render services based on viewport
  initServices();
  
  // Initialize interactive features
  initScrollAnimations();
}

/**
 * Initialize services section (graph for desktop, cards for mobile)
 */
function initServices() {
  const graphContainer = document.querySelector('.services__graph');
  const gridContainer = document.querySelector('.services__grid');
  
  // Check if D3 is loaded and viewport is desktop
  if (window.innerWidth > 1024 && typeof d3 !== 'undefined' && graphContainer) {
    // Desktop: render interactive graph
    initServiceGraph(graphContainer);
    if (gridContainer) {
      gridContainer.classList.add('services__grid--hidden');
    }
  } else if (gridContainer) {
    // Mobile/fallback: render card grid
    renderServices(gridContainer);
    if (graphContainer) {
      graphContainer.classList.add('services__graph--hidden');
    }
  }
}

/**
 * Handle window resize to switch between layouts
 */
function handleResize() {
  const currentWidth = window.innerWidth;
  const graphContainer = document.querySelector('.services__graph');
  const gridContainer = document.querySelector('.services__grid');
  
  // Only reinitialize if crossing the 1024px threshold
  if (currentWidth > 1024 && gridContainer?.classList.contains('services__grid--hidden') === false) {
    // Switch to graph view
    location.reload(); // Simple approach: reload to reinitialize
  } else if (currentWidth <= 1024 && graphContainer?.classList.contains('services__graph--hidden') === false) {
    // Switch to card view
    location.reload();
  }
}

// Debounce resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 250);
});

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

