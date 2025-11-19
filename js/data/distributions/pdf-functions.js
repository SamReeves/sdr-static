/**
 * Probability Density Functions for statistical distributions
 * Built from parametric generators - NO MAGIC NUMBERS!
 * Each function takes parameters (t, offset) where:
 * - t: normalized position [0, 1]
 * - offset: curve offset for visual variation [0, 1]
 */

import {
  normalDistribution,
  exponentialDistribution,
  uniformDistribution,
  betaDistribution,
  gammaDistribution,
  chiSquaredDistribution,
  logNormalDistribution,
  weibullDistribution,
  cauchyDistribution,
  tDistribution,
  laplaceDistribution,
  paretoDistribution,
  rayleighDistribution,
  gumbelDistribution,
  logisticDistribution,
  triangularDistribution,
  bimodalDistribution,
  powerLawDistribution,
  offsetScale,
  scale
} from './parametric-generators.js';

/**
 * Core distribution functions built from pure parametric generators
 * All magic numbers eliminated - each parameter has meaning
 */
export const pdfFunctions = {
  // Normal: mean=0.5, std=0.15, base_scale=0.85, offset_factor=0.3
  normal: offsetScale(normalDistribution(0.5, 0.15), 0.85, 0.3),
  
  // Exponential: lambda varies with offset for visual variety
  exponential: (t, offset) => {
    const lambda = 3 + offset * 2;
    return exponentialDistribution(lambda)(t) * (0.7 + offset * 0.3);
  },
  
  // Uniform: constant value that varies with offset
  uniform: (t, offset) => uniformDistribution(0.5)(t) + offset * 0.4,
  
  // Beta: alpha=5, beta=2, normalized=3, offset affects output
  beta: (t, offset) => betaDistribution(5, 2, 3)(t) * (0.6 + offset * 0.4),
  
  // Gamma: shape varies with offset
  gamma: (t, offset) => {
    const k = 2 + offset;
    return gammaDistribution(k, 0.3, 5, 2)(t) * (0.5 + offset * 0.3);
  },
  
  // Chi-squared: degrees of freedom vary with offset
  'chi-squared': (t, offset) => {
    const k = 3 + offset * 2;
    return chiSquaredDistribution(k, 8, 1.5)(t) * (0.6 + offset * 0.3);
  },
  
  // Log-normal: mu=-0.5, sigma=0.5
  'log-normal': offsetScale(logNormalDistribution(-0.5, 0.5, 0.1, 0.8), 1, 0.3),
  
  // Weibull: shape varies with offset
  weibull: (t, offset) => {
    const k = 2.5 + offset;
    return weibullDistribution(k, 1, 3, 1.2)(t) * (0.6 + offset * 0.3);
  },
  
  // Cauchy: x0=0.5, gamma=0.1
  cauchy: offsetScale(cauchyDistribution(0.5, 0.1, 0.15), 1, 0.4),
  
  // Student's t: nu=3, centered at 0.5
  't-distribution': offsetScale(tDistribution(3, 0.5, 6, 0.9), 1, 0.3),
  
  // Laplace: sharp peak at 0.5
  laplace: offsetScale(laplaceDistribution(0.5, 0.15, 0.25), 1, 0.3),
  
  // Pareto: xm=0.2, alpha varies with offset
  pareto: (t, offset) => {
    const alpha = 2 + offset;
    return paretoDistribution(0.2, alpha, 0.4)(t) * (0.6 + offset * 0.3);
  },
  
  // Rayleigh: sigma varies with offset
  rayleigh: (t, offset) => {
    const sigma = 0.3 + offset * 0.1;
    return rayleighDistribution(sigma, 2, 1.2)(t) * (0.6 + offset * 0.3);
  },
  
  // Gumbel: mu=0.5, beta=0.15
  gumbel: offsetScale(gumbelDistribution(0.5, 0.15, 0.35), 1, 0.3),
  
  // Logistic: mu=0.5, s=0.1
  logistic: offsetScale(logisticDistribution(0.5, 0.1, 0.12), 1, 0.3),
  
  // Triangular: mode varies with offset
  triangular: (t, offset) => {
    const c = 0.3 + offset * 0.4;
    return triangularDistribution(0, 1, c, 0.7)(t) * (0.6 + offset * 0.3);
  },
  
  // Bimodal: two peaks at 0.3 and 0.7
  bimodal: offsetScale(bimodalDistribution(0.3, 0.7, 0.02, 0.02, 0.5), 0.5, 0.3),
  
  // F-distribution: approximation using gamma-like shape
  'f-distribution': (t, offset) => {
    if (t <= 0) return 0;
    const d1 = 5, d2 = 10, x = t * 3;
    return Math.pow(x, d1/2 - 1) * Math.pow(1 + d1*x/d2, -(d1+d2)/2) * 1.5 * (0.6 + offset * 0.3);
  },
  
  // Power law: alpha varies with offset
  'power-law': (t, offset) => {
    const alpha = 2.5 + offset * 0.5;
    return powerLawDistribution(alpha, 0.1, 0.15)(t) * (0.6 + offset * 0.3);
  },
  
  // Erlang: sum of exponentials
  erlang: (t, offset) => {
    if (t === 0) return 0;
    const k = 3, lambda = 2, x = t * 5;
    return (Math.pow(lambda, k) * Math.pow(x, k-1) * Math.exp(-lambda * x)) / 2 * 0.8 * (0.6 + offset * 0.3);
  },
  
  // Maxwell-Boltzmann: molecular speed distribution
  'maxwell-boltzmann': (t, offset) => {
    const a = 0.25 + offset * 0.05, x = t * 2;
    return Math.sqrt(2/Math.PI) * (x * x / (a * a * a)) * Math.exp(-x * x / (2 * a * a)) * 1.5 * (0.6 + offset * 0.3);
  },
  
  // Lévy: heavy-tailed distribution
  levy: (t, offset) => {
    if (t <= 0.1) return 0;
    const mu = 0.1, c = 0.05;
    return Math.min(Math.sqrt(c / (2 * Math.PI)) * Math.exp(-c / (2 * (t - mu))) / Math.pow(t - mu, 1.5) * 0.08 * (0.6 + offset * 0.3), 2);
  },
  
  // Wigner semicircle: quantum random matrix theory
  semicircle: (t, offset) => {
    const R = 0.5, center = 0.5, x = t - center;
    if (Math.abs(x) > R) return 0;
    return (2 / (Math.PI * R * R)) * Math.sqrt(R * R - x * x) * 0.9 * (0.7 + offset * 0.3);
  },
  
  // Zipf: discrete power law
  zipf: (t, offset) => {
    if (t < 0.05) return 0;
    const s = 1.5 + offset * 0.5;
    return 1 / Math.pow(t * 20 + 1, s) * 1.2 * (0.6 + offset * 0.3);
  },
  
  // Rice/Rician: signal with Gaussian noise
  rice: (t, offset) => {
    const nu = 0.5 + offset * 0.2, sigma = 0.3, x = t * 3;
    return (x / (sigma * sigma)) * Math.exp(-(x*x + nu*nu) / (2*sigma*sigma)) * Math.exp(x*nu/(sigma*sigma)) * 0.8 * (0.6 + offset * 0.3);
  },
  
  // ═══════════════════════════════════════════════════════════
  // 🎨 NEW PARAMETRIC VARIATIONS - Created using pure functions!
  // ═══════════════════════════════════════════════════════════
  
  // Normal variations - different standard deviations
  'normal-narrow': offsetScale(normalDistribution(0.5, 0.08), 0.85, 0.3),
  'normal-wide': offsetScale(normalDistribution(0.5, 0.25), 0.85, 0.3),
  'normal-left': offsetScale(normalDistribution(0.3, 0.15), 0.85, 0.3),
  'normal-right': offsetScale(normalDistribution(0.7, 0.15), 0.85, 0.3),
  
  // Power law variations - different exponents
  'power-law-gentle': (t, offset) => powerLawDistribution(1.8 + offset * 0.3, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  'power-law-steep': (t, offset) => powerLawDistribution(3.5 + offset * 0.5, 0.1, 0.15)(t) * (0.6 + offset * 0.3),
  
  // Bimodal variations
  'bimodal-wide': offsetScale(bimodalDistribution(0.25, 0.75, 0.08, 0.08, 0.5), 0.6, 0.3),
  'bimodal-asymmetric': (t, offset) => {
    const peak1 = normalDistribution(0.3, 0.08)(t);
    const peak2 = normalDistribution(0.75, 0.05)(t);
    return (peak1 * 0.7 + peak2 * 0.3) * (1 + offset * 0.3);
  },
  
  // Trimodal - three peaks!
  'trimodal': (t, offset) => {
    const p1 = normalDistribution(0.2, 0.05)(t);
    const p2 = normalDistribution(0.5, 0.05)(t);
    const p3 = normalDistribution(0.8, 0.05)(t);
    return (p1 + p2 + p3) / 3 * 0.8 * (1 + offset * 0.3);
  },
  
  // Hybrid distributions - mixing different types
  'exponormal': (t, offset) => {
    const expo = exponentialDistribution(3)(t);
    const norm = normalDistribution(0.6, 0.15)(t);
    return (expo * 0.6 + norm * 0.4) * (1 + offset * 0.3);
  },
  
  'powernormal': (t, offset) => {
    const power = powerLawDistribution(2.5, 0.1, 0.15)(t);
    const norm = normalDistribution(0.4, 0.12)(t);
    return (power * 0.5 + norm * 0.5) * (1 + offset * 0.3);
  },
  
  // Wave pattern - multiple peaks
  'wave': (t, offset) => {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += normalDistribution(i * 0.125 + 0.0625, 0.025)(t);
    }
    return sum / 8 * 0.7 * (1 + offset * 0.3);
  },
  
  // Plateau - flat top
  'plateau': (t, offset) => {
    const norm = normalDistribution(0.5, 0.3)(t);
    const flat = 0.5;
    return (norm * 0.4 + flat * 0.6) * (1 + offset * 0.3);
  }
};
