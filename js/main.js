/**
 * ============================================================================
 * MAIN APPLICATION
 * ============================================================================
 * 
 * Entry point for the Secure Data Research website
 * Initializes the 3D sphere graph and click-to-view detail panel
 */

import { initSphereGraph } from './modules/sphere-graph.js';
import { services } from './data/services.js';
import { icons } from './data/icons.js';

// ============================================================================
// STATE
// ============================================================================

let detailPanel = null;  // Reference to the detail panel DOM element

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 * 
 * Sets up:
 * 1. Detail panel for showing service information
 * 2. Click handlers on service nodes
 * 3. 3D sphere graph animation
 */
function init() {
  const graphContainer = document.querySelector('.services__graph');
  if (!graphContainer) return;

  createDetailPanel(graphContainer);
  attachNodeClickHandlers(graphContainer);
  initSphereGraph(graphContainer);
}

/**
 * Attach click event handlers to all service nodes
 * 
 * @param {HTMLElement} container - Graph container element
 */
function attachNodeClickHandlers(container) {
  const categoryNodes = container.querySelectorAll('.service-graph__node--category');
  
  categoryNodes.forEach(node => {
    node.style.cursor = 'pointer';
    node.addEventListener('click', () => {
      const serviceIndex = parseInt(node.getAttribute('data-service'));
      const service = services[serviceIndex];
      showDetailPanel(service);
    });
  });
}

// ============================================================================
// DETAIL PANEL
// ============================================================================

/**
 * Create the detail panel element
 * 
 * Panel is initially hidden and will be shown when user clicks a node
 * 
 * @param {HTMLElement} container - Container to append panel to
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
 * 
 * Builds HTML content from service data and displays it with fade-in animation
 * 
 * @param {object} service - Service data object from services.js
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
 * Hide detail panel with fade-out animation
 */
function hideDetailPanel() {
  detailPanel.style.opacity = '0';
  setTimeout(() => {
    detailPanel.style.display = 'none';
  }, 300);
}

// ============================================================================
// STARTUP
// ============================================================================
// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
