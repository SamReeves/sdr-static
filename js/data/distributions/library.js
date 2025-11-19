/**
 * Extended distribution library
 * Demonstrates how to create infinite variations using parametric generators
 * 
 * Usage examples:
 * 1. Import variations you want in your app
 * 2. Dynamically generate distributions based on user input
 * 3. Create families of related distributions
 */

import {
  normalDistribution,
  exponentialDistribution,
  powerLawDistribution,
  bimodalDistribution,
  weibullDistribution,
  cauchyDistribution,
  offsetScale,
  mix,
  shift,
  scale
} from './parametric-generators.js';

/**
 * EXAMPLE 1: Normal Distribution Family
 * Create variations by changing parameters
 */
export const normalFamily = {
  'normal-narrow': offsetScale(normalDistribution(0.5, 0.08), 0.85, 0.3),
  'normal-standard': offsetScale(normalDistribution(0.5, 0.15), 0.85, 0.3),
  'normal-wide': offsetScale(normalDistribution(0.5, 0.25), 0.85, 0.3),
  'normal-left': offsetScale(normalDistribution(0.3, 0.15), 0.85, 0.3),
  'normal-right': offsetScale(normalDistribution(0.7, 0.15), 0.85, 0.3)
};

/**
 * EXAMPLE 2: Power Law Family
 * Different exponents create different curves
 */
export const powerLawFamily = {
  'power-law-steep': (t, offset) => powerLawDistribution(3.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  'power-law-standard': (t, offset) => powerLawDistribution(2.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  'power-law-gentle': (t, offset) => powerLawDistribution(1.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3)
};

/**
 * EXAMPLE 3: Multimodal Distributions
 * Mix multiple peaks for complex shapes
 */
export const multimodalFamily = {
  'trimodal': (t, offset) => {
    const peak1 = normalDistribution(0.2, 0.05)(t);
    const peak2 = normalDistribution(0.5, 0.05)(t);
    const peak3 = normalDistribution(0.8, 0.05)(t);
    return (peak1 + peak2 + peak3) / 3 * 0.8 * (1 + offset * 0.3);
  },
  
  'asymmetric-bimodal': mix(
    normalDistribution(0.3, 0.08),
    normalDistribution(0.75, 0.05),
    0.7  // 70% weight to first peak
  ),
  
  'wide-bimodal': offsetScale(bimodalDistribution(0.25, 0.75, 0.08, 0.08, 0.5), 0.6, 0.3)
};

/**
 * EXAMPLE 4: Hybrid Distributions
 * Combine different distribution types
 */
export const hybridDistributions = {
  'exponential-normal-mix': mix(
    exponentialDistribution(3),
    normalDistribution(0.6, 0.15),
    0.6
  ),
  
  'cauchy-normal-blend': mix(
    cauchyDistribution(0.5, 0.1, 0.15),
    normalDistribution(0.5, 0.2),
    0.4
  )
};

/**
 * EXAMPLE 5: Programmatically Generated Variations
 * Generate families of distributions algorithmically
 */

/**
 * Generates N variations of a distribution by varying a parameter
 * @param {Function} generator - Distribution generator function
 * @param {Array} parameterRange - Array of parameter values
 * @param {string} baseName - Base name for variations
 * @returns {Object} Map of distribution names to functions
 */
export function generateFamily(generator, parameterRange, baseName) {
  const family = {};
  parameterRange.forEach((param, i) => {
    family[`${baseName}-${i}`] = offsetScale(generator(param), 0.8, 0.3);
  });
  return family;
}

// Example: Generate 10 exponential distributions with different decay rates
export const exponentialSpectrum = generateFamily(
  exponentialDistribution,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'exponential'
);

// Example: Generate 20 normal distributions with different standard deviations
export const normalSpectrum = Array.from({ length: 20 }, (_, i) => {
  const std = 0.05 + i * 0.02;  // from 0.05 to 0.43
  return {
    name: `normal-std-${std.toFixed(2)}`,
    func: offsetScale(normalDistribution(0.5, std), 0.85, 0.3)
  };
});

/**
 * EXAMPLE 6: Configuration-Driven Generation
 * Define distributions through configuration objects
 */
export function createFromConfig(config) {
  const generators = {
    normal: normalDistribution,
    exponential: exponentialDistribution,
    powerlaw: powerLawDistribution,
    weibull: weibullDistribution,
    bimodal: bimodalDistribution
  };
  
  const baseFunc = generators[config.type](...config.params);
  
  // Apply transformations
  let result = baseFunc;
  if (config.scale) result = scale(result, config.scale);
  if (config.offsetScale) result = offsetScale(result, config.offsetScale.base, config.offsetScale.factor);
  
  return result;
}

// Configuration examples
export const configuredDistributions = {
  'custom-normal': createFromConfig({
    type: 'normal',
    params: [0.5, 0.2],
    offsetScale: { base: 0.9, factor: 0.25 }
  }),
  
  'custom-powerlaw': createFromConfig({
    type: 'powerlaw',
    params: [3.0, 0.1, 0.2],
    offsetScale: { base: 1.0, factor: 0.4 }
  })
};

/**
 * EXAMPLE 7: Interactive Distribution Builder
 * For use with UI controls
 */
export class DistributionBuilder {
  constructor() {
    this.type = 'normal';
    this.params = [0.5, 0.15];
    this.baseScale = 1.0;
    this.offsetFactor = 0.3;
  }
  
  setType(type, params) {
    this.type = type;
    this.params = params;
    return this;
  }
  
  setScaling(baseScale, offsetFactor) {
    this.baseScale = baseScale;
    this.offsetFactor = offsetFactor;
    return this;
  }
  
  build() {
    const generators = {
      normal: normalDistribution,
      exponential: exponentialDistribution,
      powerlaw: powerLawDistribution,
      weibull: weibullDistribution
    };
    
    const baseFunc = generators[this.type](...this.params);
    return offsetScale(baseFunc, this.baseScale, this.offsetFactor);
  }
}

/**
 * Usage example:
 * 
 * const builder = new DistributionBuilder();
 * const myDist = builder
 *   .setType('normal', [0.6, 0.2])
 *   .setScaling(0.9, 0.35)
 *   .build();
 */

/**
 * EXAMPLE 8: Extended Distribution Set
 * Ready-to-use variations you can add to your app
 */
export const extendedDistributions = {
  ...normalFamily,
  ...powerLawFamily,
  ...multimodalFamily,
  ...hybridDistributions,
  ...configuredDistributions,
  
  // Additional interesting distributions
  'skewed-left': offsetScale(
    mix(normalDistribution(0.3, 0.1), exponentialDistribution(5), 0.7),
    0.8,
    0.3
  ),
  
  'skewed-right': offsetScale(
    mix(normalDistribution(0.7, 0.1), (t) => exponentialDistribution(5)(1 - t), 0.7),
    0.8,
    0.3
  ),
  
  'plateau': offsetScale(
    mix(normalDistribution(0.5, 0.3), (t) => 0.5, 0.3),
    0.8,
    0.3
  )
};

/**
 * Total distributions available:
 * - Original: 26
 * - Normal family: 5
 * - Power law family: 3
 * - Multimodal family: 3
 * - Hybrid: 2
 * - Extended: 3
 * - Programmatic: unlimited!
 * 
 * You can now generate THOUSANDS of unique distributions
 * without adding any new magic numbers!
 */

