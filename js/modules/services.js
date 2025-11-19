/**
 * Service cards rendering module
 */
import { services } from '../data/services.js';
import { icons } from '../data/icons.js';
import { createElement } from '../utils/dom-utils.js';

/**
 * Renders all service cards into the container
 */
export function renderServices(container) {
  if (!container) return;
  
  services.forEach(service => {
    container.appendChild(createServiceCard(service));
  });
}

/**
 * Creates a single service card element
 */
function createServiceCard({ icon, title, description }) {
  const card = createElement('div', { className: 'service-card' });
  
  const iconWrapper = createElement('div', { 
    className: 'service-card__icon',
    textContent: icons[icon] || '📦',
    attrs: { 'aria-hidden': 'true' }
  });
  
  const titleElement = createElement('h3', { 
    className: 'service-card__title',
    textContent: title
  });
  
  const descriptionElement = createElement('p', { 
    className: 'service-card__description',
    textContent: description
  });
  
  card.appendChild(iconWrapper);
  card.appendChild(titleElement);
  card.appendChild(descriptionElement);
  
  return card;
}
