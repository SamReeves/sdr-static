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
function createServiceCard({ icon, title, description, featured, subServices }) {
  const card = createElement('div', { 
    className: `service-card${featured ? ' service-card--featured' : ''}` 
  });
  
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
  
  // Add "New" badge for featured services
  if (featured) {
    const badge = createElement('span', { 
      className: 'service-card__badge',
      textContent: 'New'
    });
    card.appendChild(badge);
  }
  
  card.appendChild(titleElement);
  card.appendChild(descriptionElement);
  
  // Add expandable sub-services if present
  if (subServices?.length) {
    const subServicesContainer = createSubServicesSection(subServices);
    card.appendChild(subServicesContainer);
  }
  
  return card;
}

/**
 * Creates the expandable sub-services section
 */
function createSubServicesSection(subServices) {
  const container = createElement('div', { className: 'service-card__expandable' });
  
  const toggle = createElement('button', {
    className: 'service-card__toggle',
    attrs: { 
      'aria-expanded': 'false',
      'type': 'button'
    }
  });
  
  const toggleText = createElement('span', {
    className: 'service-card__toggle-text',
    textContent: 'Show details'
  });
  
  const toggleIcon = createElement('span', {
    className: 'service-card__toggle-icon',
    textContent: '▼',
    attrs: { 'aria-hidden': 'true' }
  });
  
  toggle.appendChild(toggleText);
  toggle.appendChild(toggleIcon);
  
  const subList = createElement('ul', { 
    className: 'service-card__sub-services',
    attrs: { 'aria-hidden': 'true' }
  });
  
  subServices.forEach(sub => {
    const li = createElement('li', { className: 'service-card__sub-item' });
    
    const subTitle = createElement('strong', { 
      className: 'service-card__sub-title',
      textContent: sub.title
    });
    
    const subDesc = createElement('span', { 
      className: 'service-card__sub-desc',
      textContent: ` — ${sub.description}`
    });
    
    li.appendChild(subTitle);
    li.appendChild(subDesc);
    subList.appendChild(li);
  });
  
  // Toggle click handler
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    subList.setAttribute('aria-hidden', isExpanded);
    subList.classList.toggle('service-card__sub-services--expanded', !isExpanded);
    toggle.classList.toggle('service-card__toggle--expanded', !isExpanded);
    toggleText.textContent = isExpanded ? 'Show details' : 'Hide details';
  });
  
  container.appendChild(toggle);
  container.appendChild(subList);
  
  return container;
}
