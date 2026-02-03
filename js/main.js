// Main application entry point
import { initScrollAnimations } from './modules/animations.js';
import { renderServices } from './modules/services.js';
import { services } from './data/services.js';
import { icons } from './data/icons.js';

let detailPanel = null;

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
 * Initialize services section (static SVG graph for desktop, cards for mobile)
 */
function initServices() {
  const graphContainer = document.querySelector('.services__graph');
  const gridContainer = document.querySelector('.services__grid');
  
  if (window.innerWidth > 1024 && graphContainer) {
    // Desktop: setup static SVG click handlers
    initStaticGraph(graphContainer);
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
 * Initialize static SVG graph interactions
 */
function initStaticGraph(container) {
  // Create detail panel element
  createDetailPanel(container);
  
  // Add click handlers to category nodes
  const categoryNodes = container.querySelectorAll('.service-graph__node--category');
  categoryNodes.forEach(node => {
    node.style.cursor = 'pointer';
    node.addEventListener('click', (e) => {
      const serviceIndex = parseInt(node.getAttribute('data-service'));
      const service = services[serviceIndex];
      showDetailPanel(service);
    });
  });
}

/**
 * Create detail panel element
 */
function createDetailPanel(container) {
  detailPanel = document.createElement('div');
  detailPanel.className = 'service-graph__panel';
  detailPanel.style.opacity = '0';
  detailPanel.style.display = 'none';
  container.appendChild(detailPanel);
}

/**
 * Show detail panel with service information
 */
function showDetailPanel(service) {
  if (!service || !service.subServices || service.subServices.length === 0) return;
  
  // Build panel HTML
  const html = `
    <div class="service-graph__panel-header">
      <div class="service-graph__panel-title">
        <span class="service-graph__panel-icon">${icons[service.icon] || ''}</span>
        <h3>${service.title}</h3>
      </div>
      <button class="service-graph__panel-close" aria-label="Close panel">×</button>
    </div>
    <p class="service-graph__panel-description">${service.description}</p>
    <ul class="service-graph__panel-list">
      ${service.subServices.map(sub => `
        <li class="service-graph__panel-item">
          <strong class="service-graph__panel-item-title">${sub.title}</strong>
          <p class="service-graph__panel-item-desc">${sub.description}</p>
        </li>
      `).join('')}
    </ul>
  `;
  
  // Update panel content
  detailPanel.innerHTML = html;
  
  // Add close handler
  detailPanel.querySelector('.service-graph__panel-close').addEventListener('click', hideDetailPanel);
  
  // Show panel with animation
  detailPanel.style.display = 'block';
  setTimeout(() => {
    detailPanel.style.opacity = '1';
  }, 10);
}

/**
 * Hide detail panel
 */
function hideDetailPanel() {
  detailPanel.style.opacity = '0';
  setTimeout(() => {
    detailPanel.style.display = 'none';
  }, 300);
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
    location.reload();
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
