/**
 * Animated logo module with statistical distributions
 */
import { pathsByDistribution } from '../data/logo-paths.js';
import { distributionConfigs } from '../data/distributions/index.js';
import { calculateDelay } from './animations/strategies.js';
import { on } from '../utils/dom-utils.js';

const distributionNames = Object.keys(distributionConfigs);
let currentIndex = 0;

/**
 * Initializes the animated logo
 */
export function initLogo() {
  const logo = document.getElementById('animatedLogo');
  if (!logo) return;
  
  const currentDist = distributionNames[currentIndex];
  renderPaths(logo, currentDist);
  applyAnimation(logo, currentDist);
  
  on(logo, 'click', () => cycleDistribution(logo));
  on(logo, 'keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleDistribution(logo);
    }
  });
  
  logDistribution(currentDist);
}

/**
 * Renders SVG paths for a distribution
 */
function renderPaths(svg, distName, clearExisting = false) {
  if (clearExisting) {
    svg.querySelectorAll('.logo__curve').forEach(path => path.remove());
  }
  
  const paths = pathsByDistribution[distName];
  const pathsMarkup = paths.map(d => `<path d="${d}" class="logo__curve"></path>`).join('');
  svg.insertAdjacentHTML('beforeend', pathsMarkup);
}

/**
 * Applies animation styling dynamically
 */
function applyAnimation(svg, distName) {
  const config = distributionConfigs[distName];
  const paths = svg.querySelectorAll('.logo__curve');
  const { duration, easing } = config.animation;
  
  const easingStr = Array.isArray(easing) ? `cubic-bezier(${easing.join(',')})` : easing;
  
  paths.forEach((path, i) => {
    path.style.animation = `drawCurve ${duration}s ${easingStr} forwards`;
    path.style.animationDelay = `${calculateDelay(i, config.animation)}s`;
  });
}

/**
 * Cycles to next distribution
 */
function cycleDistribution(logo) {
  currentIndex = (currentIndex + 1) % distributionNames.length;
  const currentDist = distributionNames[currentIndex];
  
  renderPaths(logo, currentDist, true);
  applyAnimation(logo, currentDist);
  logDistribution(currentDist);
}

/**
 * Logs distribution info to console
 */
function logDistribution(distName) {
  const config = distributionConfigs[distName];
  console.log(`🎨 ${config.label}: ${config.description}`);
}
