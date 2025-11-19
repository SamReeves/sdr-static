/**
 * Parametric distribution generators using pure functions
 * Higher-order functions that create PDF functions from parameters
 * This eliminates magic numbers and enables infinite distribution variations
 */

/**
 * BASIC DISTRIBUTION GENERATORS (Pure Functions)
 * Each returns a function (t, offset?) => value
 */

/**
 * Creates a normal/Gaussian distribution PDF
 * @param {number} mean - Center of the distribution [0, 1]
 * @param {number} std - Standard deviation
 * @returns {Function} PDF function
 */
export const normalDistribution = (mean = 0.5, std = 0.15) => 
  (t) => Math.exp(-Math.pow(t - mean, 2) / (2 * std * std));

/**
 * Creates an exponential distribution PDF
 * @param {number} lambda - Rate parameter
 * @returns {Function} PDF function
 */
export const exponentialDistribution = (lambda = 3) =>
  (t) => Math.exp(-lambda * t);

/**
 * Creates a uniform distribution PDF
 * @param {number} value - Constant value
 * @returns {Function} PDF function
 */
export const uniformDistribution = (value = 0.5) =>
  () => value;

/**
 * Creates a beta distribution PDF
 * @param {number} alpha - Shape parameter α
 * @param {number} beta - Shape parameter β
 * @param {number} normalization - Scaling factor
 * @returns {Function} PDF function
 */
export const betaDistribution = (alpha = 5, beta = 2, normalization = 3) =>
  (t) => Math.pow(t, alpha - 1) * Math.pow(1 - t, beta - 1) * normalization;

/**
 * Creates a gamma distribution PDF
 * @param {number} k - Shape parameter
 * @param {number} theta - Scale parameter
 * @param {number} inputScale - Input scaling factor
 * @param {number} outputScale - Output scaling factor
 * @returns {Function} PDF function
 */
export const gammaDistribution = (k = 2, theta = 0.3, inputScale = 5, outputScale = 2) =>
  (t) => {
    if (t === 0) return 0;
    const x = t * inputScale;
    return Math.pow(x, k - 1) * Math.exp(-x / theta) * outputScale;
  };

/**
 * Creates a chi-squared distribution PDF
 * @param {number} k - Degrees of freedom
 * @param {number} inputScale - Input scaling
 * @param {number} outputScale - Output scaling
 * @returns {Function} PDF function
 */
export const chiSquaredDistribution = (k = 3, inputScale = 8, outputScale = 1.5) =>
  (t) => {
    if (t === 0) return 0;
    const x = t * inputScale;
    return Math.pow(x, k/2 - 1) * Math.exp(-x / 2) * outputScale;
  };

/**
 * Creates a log-normal distribution PDF
 * @param {number} mu - Mean of log
 * @param {number} sigma - Std of log
 * @param {number} xShift - Shift to avoid zero
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const logNormalDistribution = (mu = -0.5, sigma = 0.5, xShift = 0.1, scale = 0.8) =>
  (t) => {
    if (t <= 0) return 0;
    const x = t + xShift;
    return Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma)) / x * scale;
  };

/**
 * Creates a Weibull distribution PDF
 * @param {number} k - Shape parameter
 * @param {number} lambda - Scale parameter
 * @param {number} inputScale - Input scaling
 * @param {number} outputScale - Output scaling
 * @returns {Function} PDF function
 */
export const weibullDistribution = (k = 2.5, lambda = 1, inputScale = 3, outputScale = 1.2) =>
  (t) => {
    const x = t * inputScale;
    if (x === 0) return 0;
    return (k / lambda) * Math.pow(x / lambda, k - 1) * Math.exp(-Math.pow(x / lambda, k)) * outputScale;
  };

/**
 * Creates a Cauchy distribution PDF
 * @param {number} x0 - Location parameter
 * @param {number} gamma - Scale parameter
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const cauchyDistribution = (x0 = 0.5, gamma = 0.1, scale = 0.15) =>
  (t) => 1 / (Math.PI * gamma * (1 + Math.pow((t - x0) / gamma, 2))) * scale;

/**
 * Creates a Student's t-distribution PDF
 * @param {number} nu - Degrees of freedom
 * @param {number} center - Center point
 * @param {number} spread - Spread factor
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const tDistribution = (nu = 3, center = 0.5, spread = 6, scale = 0.9) =>
  (t) => {
    const x = (t - center) * spread;
    return Math.pow(1 + x * x / nu, -(nu + 1) / 2) * scale;
  };

/**
 * Creates a Laplace distribution PDF
 * @param {number} mu - Location parameter
 * @param {number} b - Scale parameter
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const laplaceDistribution = (mu = 0.5, b = 0.15, scale = 0.25) =>
  (t) => Math.exp(-Math.abs(t - mu) / b) / (2 * b) * scale;

/**
 * Creates a Pareto distribution PDF
 * @param {number} xm - Minimum value
 * @param {number} alpha - Shape parameter
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const paretoDistribution = (xm = 0.2, alpha = 2, scale = 0.4) =>
  (t) => {
    if (t < xm) return 0;
    return alpha * Math.pow(xm, alpha) / Math.pow(t, alpha + 1) * scale;
  };

/**
 * Creates a Rayleigh distribution PDF
 * @param {number} sigma - Scale parameter
 * @param {number} inputScale - Input scaling
 * @param {number} outputScale - Output scaling
 * @returns {Function} PDF function
 */
export const rayleighDistribution = (sigma = 0.3, inputScale = 2, outputScale = 1.2) =>
  (t) => {
    const x = t * inputScale;
    return (x / (sigma * sigma)) * Math.exp(-x * x / (2 * sigma * sigma)) * outputScale;
  };

/**
 * Creates a Gumbel distribution PDF
 * @param {number} mu - Location parameter
 * @param {number} beta - Scale parameter
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const gumbelDistribution = (mu = 0.5, beta = 0.15, scale = 0.35) =>
  (t) => {
    const z = (t - mu) / beta;
    return (1 / beta) * Math.exp(-(z + Math.exp(-z))) * scale;
  };

/**
 * Creates a logistic distribution PDF
 * @param {number} mu - Location parameter
 * @param {number} s - Scale parameter
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const logisticDistribution = (mu = 0.5, s = 0.1, scale = 0.12) =>
  (t) => {
    const exp_val = Math.exp(-(t - mu) / s);
    return exp_val / (s * Math.pow(1 + exp_val, 2)) * scale;
  };

/**
 * Creates a triangular distribution PDF
 * @param {number} a - Minimum
 * @param {number} b - Maximum
 * @param {number} c - Mode
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const triangularDistribution = (a = 0, b = 1, c = 0.3, scale = 0.7) =>
  (t) => {
    return t < c 
      ? (2 * (t - a)) / ((b - a) * (c - a)) * scale
      : (2 * (b - t)) / ((b - a) * (b - c)) * scale;
  };

/**
 * Creates a power law distribution PDF
 * @param {number} alpha - Exponent
 * @param {number} xMin - Minimum x value
 * @param {number} scale - Output scaling
 * @returns {Function} PDF function
 */
export const powerLawDistribution = (alpha = 2.5, xMin = 0.1, scale = 0.15) =>
  (t) => {
    if (t < xMin) return 0;
    return Math.pow(t, -alpha) * scale;
  };

/**
 * HIGHER-ORDER FUNCTION COMBINATORS
 * Transform and combine distribution functions
 */

/**
 * Scales the output of a distribution
 * @param {Function} distFunc - Distribution function
 * @param {number} factor - Scaling factor
 * @returns {Function} Scaled distribution
 */
export const scale = (distFunc, factor) =>
  (t, offset) => distFunc(t) * factor;

/**
 * Applies offset-dependent scaling
 * @param {Function} distFunc - Distribution function
 * @param {number} baseScale - Base scaling factor
 * @param {number} offsetFactor - Offset influence factor
 * @returns {Function} Offset-scaled distribution
 */
export const offsetScale = (distFunc, baseScale = 1, offsetFactor = 0.3) =>
  (t, offset) => distFunc(t) * baseScale * (1 + offset * offsetFactor);

/**
 * Makes parameters offset-dependent
 * @param {Function} generator - Distribution generator
 * @param {Function} paramMapper - Maps offset to parameters
 * @returns {Function} Offset-dependent distribution
 */
export const withOffsetParams = (generator, paramMapper) =>
  (t, offset) => generator(...paramMapper(offset))(t);

/**
 * Shifts a distribution horizontally
 * @param {Function} distFunc - Distribution function
 * @param {number} amount - Shift amount
 * @returns {Function} Shifted distribution
 */
export const shift = (distFunc, amount) =>
  (t, offset) => distFunc(t - amount);

/**
 * Mixes two distributions with a weight
 * @param {Function} dist1 - First distribution
 * @param {Function} dist2 - Second distribution
 * @param {number} weight - Weight for first distribution [0, 1]
 * @returns {Function} Mixed distribution
 */
export const mix = (dist1, dist2, weight = 0.5) =>
  (t, offset) => dist1(t, offset) * weight + dist2(t, offset) * (1 - weight);

/**
 * Creates a bimodal distribution from two peaks
 * @param {number} mean1 - First peak location
 * @param {number} mean2 - Second peak location
 * @param {number} std1 - First peak std
 * @param {number} std2 - Second peak std
 * @param {number} weight - Mixing weight
 * @returns {Function} Bimodal distribution
 */
export const bimodalDistribution = (mean1 = 0.3, mean2 = 0.7, std1 = 0.02, std2 = 0.02, weight = 0.5) =>
  mix(normalDistribution(mean1, std1), normalDistribution(mean2, std2), weight);

/**
 * Clamps distribution output
 * @param {Function} distFunc - Distribution function
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Function} Clamped distribution
 */
export const clamp = (distFunc, min = 0, max = Infinity) =>
  (t, offset) => Math.max(min, Math.min(max, distFunc(t, offset)));

/**
 * Transforms the input domain
 * @param {Function} distFunc - Distribution function
 * @param {Function} transformFunc - Transform function
 * @returns {Function} Transformed distribution
 */
export const transform = (distFunc, transformFunc) =>
  (t, offset) => distFunc(transformFunc(t), offset);

/**
 * Function composition helper
 * @param  {...Function} fns - Functions to pipe
 * @returns {Function} Piped function
 */
export const pipe = (...fns) =>
  (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);

