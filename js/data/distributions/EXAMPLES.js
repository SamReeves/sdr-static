/**
 * 🎨 LIVE EXAMPLES - Copy & Paste These!
 * 
 * Demonstrates the power of the parametric distribution system
 * All examples are ready to use - just import and go!
 */

import {
  normalDistribution,
  exponentialDistribution,
  powerLawDistribution,
  bimodalDistribution,
  cauchyDistribution,
  weibullDistribution,
  offsetScale,
  mix,
  shift,
  scale
} from './parametric-generators.js';

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 1: Normal Distribution Variations
 * Change parameters to create different shapes
 * ═══════════════════════════════════════════════════════════
 */

export const example1_normalVariations = {
  // Narrow peak (std = 0.08)
  'sharp-peak': offsetScale(normalDistribution(0.5, 0.08), 0.85, 0.3),
  
  // Standard (std = 0.15)
  'standard': offsetScale(normalDistribution(0.5, 0.15), 0.85, 0.3),
  
  // Wide spread (std = 0.25)
  'wide-spread': offsetScale(normalDistribution(0.5, 0.25), 0.85, 0.3),
  
  // Shifted left
  'left-skew': offsetScale(normalDistribution(0.3, 0.15), 0.85, 0.3),
  
  // Shifted right
  'right-skew': offsetScale(normalDistribution(0.7, 0.15), 0.85, 0.3)
};

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 2: Create 50 Variations Programmatically
 * Generate entire families with one loop
 * ═══════════════════════════════════════════════════════════
 */

export const example2_fiftyNormals = Array.from({ length: 50 }, (_, i) => {
  const std = 0.05 + i * 0.01;  // std from 0.05 to 0.54
  return {
    name: `normal-std-${std.toFixed(2)}`,
    func: offsetScale(normalDistribution(0.5, std), 0.85, 0.3),
    description: `Normal distribution with std=${std.toFixed(2)}`
  };
});

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 3: Bimodal and Multimodal Distributions
 * Multiple peaks in one distribution
 * ═══════════════════════════════════════════════════════════
 */

export const example3_multimodal = {
  // Two equal peaks
  'bimodal-symmetric': offsetScale(
    bimodalDistribution(0.3, 0.7, 0.05, 0.05, 0.5),
    0.8,
    0.3
  ),
  
  // Two peaks, left one larger
  'bimodal-left-heavy': mix(
    normalDistribution(0.3, 0.08),
    normalDistribution(0.7, 0.08),
    0.7  // 70% left, 30% right
  ),
  
  // Three peaks!
  'trimodal': (t, offset) => {
    const p1 = normalDistribution(0.2, 0.05)(t);
    const p2 = normalDistribution(0.5, 0.05)(t);
    const p3 = normalDistribution(0.8, 0.05)(t);
    return (p1 + p2 + p3) / 3 * 0.8 * (1 + offset * 0.3);
  },
  
  // Four peaks!!
  'quadmodal': (t, offset) => {
    const p1 = normalDistribution(0.15, 0.04)(t);
    const p2 = normalDistribution(0.35, 0.04)(t);
    const p3 = normalDistribution(0.65, 0.04)(t);
    const p4 = normalDistribution(0.85, 0.04)(t);
    return (p1 + p2 + p3 + p4) / 4 * 0.8 * (1 + offset * 0.3);
  }
};

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 4: Hybrid Distributions
 * Mix different distribution types
 * ═══════════════════════════════════════════════════════════
 */

export const example4_hybrids = {
  // 60% exponential decay + 40% normal peak
  'expo-normal': mix(
    exponentialDistribution(3),
    normalDistribution(0.6, 0.15),
    0.6
  ),
  
  // Power law base with normal peak
  'power-normal': mix(
    powerLawDistribution(2.5, 0.1, 0.15),
    normalDistribution(0.4, 0.12),
    0.5
  ),
  
  // Heavy tail (Cauchy) + normal
  'cauchy-normal': mix(
    cauchyDistribution(0.5, 0.1, 0.15),
    normalDistribution(0.5, 0.2),
    0.4
  )
};

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 5: Power Law Family
 * Different exponents create different curves
 * ═══════════════════════════════════════════════════════════
 */

export const example5_powerLaws = {
  'power-gentle': (t, offset) => 
    powerLawDistribution(1.5 + offset * 0.3, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  
  'power-standard': (t, offset) => 
    powerLawDistribution(2.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  
  'power-steep': (t, offset) => 
    powerLawDistribution(3.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  
  'power-extreme': (t, offset) => 
    powerLawDistribution(5.0 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3)
};

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 6: Create From Configuration Object
 * Define distributions in JSON/config files
 * ═══════════════════════════════════════════════════════════
 */

const distributionConfigs = [
  { type: 'normal', params: [0.5, 0.12], scale: 0.9, offsetFactor: 0.35 },
  { type: 'normal', params: [0.3, 0.18], scale: 0.85, offsetFactor: 0.3 },
  { type: 'exponential', params: [4], scale: 0.8, offsetFactor: 0.4 },
  { type: 'powerlaw', params: [3.0, 0.1, 0.2], scale: 1.0, offsetFactor: 0.3 }
];

export const example6_fromConfig = distributionConfigs.map((config, i) => {
  const generators = {
    normal: normalDistribution,
    exponential: exponentialDistribution,
    powerlaw: powerLawDistribution
  };
  
  const base = generators[config.type](...config.params);
  return {
    name: `config-${i}`,
    func: offsetScale(base, config.scale, config.offsetFactor),
    config
  };
});

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 7: Crazy Combinations
 * Push the boundaries!
 * ═══════════════════════════════════════════════════════════
 */

export const example7_creative = {
  // Wave pattern: multiple small peaks
  'wave': (t, offset) => {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += normalDistribution(i * 0.1 + 0.05, 0.02)(t);
    }
    return sum / 10 * 0.6 * (1 + offset * 0.3);
  },
  
  // Asymmetric bimodal with different heights
  'asymmetric-peaks': (t, offset) => {
    const leftPeak = normalDistribution(0.25, 0.08)(t) * 0.8;
    const rightPeak = normalDistribution(0.75, 0.06)(t) * 0.4;
    return (leftPeak + rightPeak) * (1 + offset * 0.3);
  },
  
  // Plateau: flat top
  'plateau': mix(
    normalDistribution(0.5, 0.3),
    (t) => 0.5,
    0.4
  ),
  
  // Step function approximation
  'step': (t, offset) => {
    if (t < 0.3) return 0.3 * (1 + offset * 0.3);
    if (t < 0.7) return 0.8 * (1 + offset * 0.3);
    return 0.4 * (1 + offset * 0.3);
  }
};

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 8: Real-Time Generation
 * Create distributions on the fly from user input
 * ═══════════════════════════════════════════════════════════
 */

export class InteractiveDistributionCreator {
  /**
   * Creates a distribution from user parameters
   * @param {string} type - 'normal', 'exponential', 'powerlaw', etc.
   * @param {Object} params - User-defined parameters
   */
  static create(type, params) {
    const generators = {
      normal: (p) => normalDistribution(p.mean || 0.5, p.std || 0.15),
      exponential: (p) => exponentialDistribution(p.lambda || 3),
      powerlaw: (p) => powerLawDistribution(p.alpha || 2.5, p.xMin || 0.1, p.scale || 0.15),
      bimodal: (p) => bimodalDistribution(
        p.mean1 || 0.3, 
        p.mean2 || 0.7, 
        p.std1 || 0.05, 
        p.std2 || 0.05, 
        p.weight || 0.5
      )
    };
    
    if (!generators[type]) {
      throw new Error(`Unknown distribution type: ${type}`);
    }
    
    const baseFunc = generators[type](params);
    return offsetScale(
      baseFunc, 
      params.baseScale || 1.0, 
      params.offsetFactor || 0.3
    );
  }
  
  /**
   * Example usage:
   * 
   * const myDist = InteractiveDistributionCreator.create('normal', {
   *   mean: 0.6,
   *   std: 0.2,
   *   baseScale: 0.9,
   *   offsetFactor: 0.35
   * });
   * 
   * // Use it
   * const value = myDist(0.5, 0.3);
   */
}

/**
 * ═══════════════════════════════════════════════════════════
 * EXAMPLE 9: Mass Generation
 * Generate 1000 unique distributions instantly
 * ═══════════════════════════════════════════════════════════
 */

export function generateMassiveLibrary() {
  const library = {};
  
  // 100 normal variations (different means)
  for (let i = 0; i < 100; i++) {
    const mean = 0.1 + i * 0.008;
    library[`normal-mean-${mean.toFixed(3)}`] = 
      offsetScale(normalDistribution(mean, 0.15), 0.85, 0.3);
  }
  
  // 100 normal variations (different stds)
  for (let i = 0; i < 100; i++) {
    const std = 0.05 + i * 0.003;
    library[`normal-std-${std.toFixed(3)}`] = 
      offsetScale(normalDistribution(0.5, std), 0.85, 0.3);
  }
  
  // 100 exponential variations
  for (let i = 0; i < 100; i++) {
    const lambda = 0.5 + i * 0.1;
    library[`exponential-${lambda.toFixed(1)}`] = 
      offsetScale(exponentialDistribution(lambda), 0.8, 0.3);
  }
  
  // 100 power law variations
  for (let i = 0; i < 100; i++) {
    const alpha = 1.5 + i * 0.03;
    library[`powerlaw-${alpha.toFixed(2)}`] = 
      offsetScale(powerLawDistribution(alpha, 0.1, 0.15), 1, 0.3);
  }
  
  console.log(`📊 Generated ${Object.keys(library).length} unique distributions!`);
  return library;
}

/**
 * ═══════════════════════════════════════════════════════════
 * HOW TO USE THESE EXAMPLES
 * ═══════════════════════════════════════════════════════════
 * 
 * // In your logo module or wherever distributions are used:
 * 
 * import { example1_normalVariations } from './distributions/EXAMPLES.js';
 * 
 * // Add to your existing distributions
 * const allDistributions = {
 *   ...pdfFunctions,              // Original 26
 *   ...example1_normalVariations  // +5 variations
 * };
 * 
 * // Or generate 1000 at once:
 * import { generateMassiveLibrary } from './distributions/EXAMPLES.js';
 * const megaLibrary = generateMassiveLibrary();
 * 
 * ═══════════════════════════════════════════════════════════
 * THE POSSIBILITIES ARE TRULY INFINITE! 🚀
 * ═══════════════════════════════════════════════════════════
 */

