// Smooth scroll navigation module

/**
 * Initializes smooth scrolling for anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });
}

/**
 * Handles anchor link clicks with smooth scrolling
 * @param {Event} e - The click event
 */
function handleAnchorClick(e) {
  e.preventDefault();
  const href = this.getAttribute('href');
  const target = document.querySelector(href);
  
  if (target) {
    target.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

