/**
 * SVG path generator using statistical distributions
 */
import { pdfFunctions } from './distributions/index.js';
import { LOGO_CONFIG } from '../config/constants.js';

const {
  TOTAL_CURVES,
  CURVE_SPACING,
  START_OFFSET,
  BASE_WIDTH,
  WIDTH_INCREMENT,
  HEIGHT,
  MARGIN_BOTTOM,
  NUM_POINTS
} = LOGO_CONFIG;

/**
 * Generates SVG paths based on a distribution function
 * @param {Function} distFunc - Distribution PDF function
 * @param {number} curveIndex - Index of the curve being generated
 * @returns {string} SVG path string
 */
function generatePath(distFunc, curveIndex) {
  const startX = curveIndex * CURVE_SPACING + START_OFFSET;
  const endX = startX + BASE_WIDTH + curveIndex * WIDTH_INCREMENT;
  const points = [];
  
  for (let i = 0; i <= NUM_POINTS; i++) {
    const t = i / NUM_POINTS;
    const x = startX + (endX - startX) * t;
    const distributionValue = distFunc(t, curveIndex / TOTAL_CURVES);
    const y = HEIGHT - (distributionValue * (HEIGHT - MARGIN_BOTTOM));
    points.push(`${i === 0 ? 'M' : 'L'} ${Math.round(x)},${Math.round(y)}`);
  }
  
  return points.join(' ');
}

/**
 * Generate paths for all distributions
 * Creates a map of distribution names to their path arrays
 */
export const pathsByDistribution = Object.keys(pdfFunctions).reduce((acc, key) => {
  acc[key] = Array.from({ length: TOTAL_CURVES }, (_, i) => generatePath(pdfFunctions[key], i));
  return acc;
}, {});
