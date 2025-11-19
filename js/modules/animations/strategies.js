/**
 * Animation delay calculation strategies
 * Implements the Strategy pattern for different animation timing patterns
 */

import { LOGO_CONFIG } from '../../config/constants.js';

const { BASE_DELAY, MIDDLE_INDEX, ALTERNATING_DELAY, SPLIT_DELAY } = LOGO_CONFIG.ANIMATION;
const { TOTAL_CURVES } = LOGO_CONFIG;

/**
 * Animation delay strategies
 * Each strategy takes (index, config) and returns a delay in seconds
 */
export const delayStrategies = {
  /**
   * All curves animate simultaneously
   */
  allSimultaneous: (index, config) => config.delay || 0,
  
  /**
   * Curves animate in reverse order
   */
  reverse: (index) => (TOTAL_CURVES - 1 - index) * BASE_DELAY,
  
  /**
   * Curves animate from both ends toward the center
   */
  fromBothEnds: (index) => 
    index < MIDDLE_INDEX 
      ? (MIDDLE_INDEX - index) * BASE_DELAY 
      : (index - MIDDLE_INDEX) * BASE_DELAY,
  
  /**
   * Exponentially increasing delays
   */
  exponentialDelay: (index) => {
    const baseTime = 0.02;
    const exponentialFactor = 1.15;
    return Math.pow(exponentialFactor, index) * baseTime - baseTime;
  },
  
  /**
   * Alternating pattern (even/odd)
   */
  alternating: (index) => 
    index % 2 === 0 ? 0 : ALTERNATING_DELAY,
  
  /**
   * Split into two groups
   */
  splitPattern: (index) => 
    index < MIDDLE_INDEX ? 0 : SPLIT_DELAY,
  
  /**
   * Specific indices (peaks) have no delay
   */
  peakGroups: (index, config) => 
    config.peakGroups?.includes(index + 1) ? 0 : index * BASE_DELAY,
  
  /**
   * Custom delay array
   */
  customDelays: (index, config) => 
    config.customDelays?.[index] ?? index * BASE_DELAY,
  
  /**
   * Default sequential pattern
   */
  default: (index) => index * BASE_DELAY
};

/**
 * Calculates animation delay based on configuration patterns
 * @param {number} index - Curve index
 * @param {Object} patterns - Pattern configuration object
 * @returns {number} Delay in seconds
 */
export function calculateDelay(index, patterns) {
  // Find the first matching pattern and use its strategy
  for (const [key, strategy] of Object.entries(delayStrategies)) {
    if (patterns[key] && key !== 'default') {
      return strategy(index, patterns);
    }
  }
  
  // Fall back to default sequential pattern
  return delayStrategies.default(index, patterns);
}

