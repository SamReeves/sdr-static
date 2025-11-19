/**
 * Statistical distribution metadata
 * Labels, descriptions, and animation configurations
 */

export const distributionConfigs = {
  normal: {
    label: 'Normal Distribution',
    description: 'Symmetrical distribution defined by its mean and standard deviation.',
    animation: { duration: 1.5, easing: [0.5, 0, 0.5, 1], allSimultaneous: true, delay: 0.3 }
  },
  exponential: {
    label: 'Exponential Distribution',
    description: 'Models the time until an event occurs, often used for waiting times.',
    animation: { duration: 2, easing: [0.95, 0.05, 0.8, 0.1] }
  },
  uniform: {
    label: 'Uniform Distribution',
    description: 'All outcomes are equally likely within a specified range.',
    animation: { duration: 1.2, easing: 'linear' }
  },
  beta: {
    label: 'Beta Distribution',
    description: 'Defined on the interval [0, 1], useful for modeling proportions.',
    animation: { duration: 1.2, easing: [0.68, -0.6, 0.32, 1.6] }
  },
  gamma: {
    label: 'Gamma Distribution',
    description: 'Generalizes the exponential distribution, often used in queuing models.',
    animation: { duration: 1.3, easing: [0.4, 0, 0.2, 1], fromBothEnds: true }
  },
  'chi-squared': {
    label: 'Chi-Squared Distribution',
    description: 'Sum of the squares of k independent standard normal variables, used in hypothesis testing.',
    animation: { duration: 1, easing: [0.25, 0.1, 0.25, 1], reverse: true }
  },
  'log-normal': {
    label: 'Log-Normal Distribution',
    description: 'A variable whose logarithm is normally distributed, often used in finance.',
    animation: { duration: 1.4, easing: [0.68, -0.55, 0.265, 2] }
  },
  weibull: {
    label: 'Weibull Distribution',
    description: 'Used for reliability analysis and life data analysis.',
    animation: { duration: 0.8, easing: [0.6, 0, 0.4, 1], exponentialDelay: true }
  },
  cauchy: {
    label: 'Cauchy Distribution',
    description: 'Heavy-tailed distribution, known for its undefined mean and variance.',
    animation: { duration: 1, easing: [0.85, -0.8, 0.15, 1.8] }
  },
  't-distribution': {
    label: "Student's t-Distribution",
    description: 'Similar to the normal distribution but with heavier tails, used in small sample statistics.',
    animation: { duration: 1.1, easing: [0.45, 0.05, 0.55, 0.95], alternating: true }
  },
  laplace: {
    label: 'Laplace Distribution',
    description: 'Double exponential distribution with sharp central peak, used in robust statistics.',
    animation: { duration: 1, easing: [0.5, -0.2, 0.5, 1.2] }
  },
  pareto: {
    label: 'Pareto Distribution',
    description: 'Power law distribution modeling the 80-20 rule, wealth inequality, and rare events.',
    animation: { duration: 1.6, easing: [0.9, 0.03, 0.69, 0.22] }
  },
  rayleigh: {
    label: 'Rayleigh Distribution',
    description: 'Models wind speeds, wave heights, and magnitudes of vectors with random components.',
    animation: { duration: 1.2, easing: [0.33, 0.66, 0.66, 1] }
  },
  gumbel: {
    label: 'Gumbel Distribution',
    description: 'Extreme value distribution used to model maximum values in datasets.',
    animation: { duration: 1.3, easing: [0.36, 0.07, 0.19, 0.97] }
  },
  logistic: {
    label: 'Logistic Distribution',
    description: 'S-shaped cumulative distribution used in logistic regression and growth models.',
    animation: { duration: 1.1, easing: [0.42, 0, 0.58, 1] }
  },
  triangular: {
    label: 'Triangular Distribution',
    description: 'Simple distribution with linear ramps, often used when data is limited.',
    animation: { duration: 1, easing: 'linear', splitPattern: true }
  },
  bimodal: {
    label: 'Bimodal Distribution',
    description: 'Distribution with two distinct peaks, indicating two different populations.',
    animation: { duration: 1.2, easing: [0.68, -0.3, 0.32, 1.3], peakGroups: [3, 4, 11, 12] }
  },
  'f-distribution': {
    label: 'F-Distribution',
    description: 'Ratio of two chi-squared variables, used in ANOVA and variance comparisons.',
    animation: { duration: 1.4, easing: [0.22, 0.61, 0.36, 1] }
  },
  'power-law': {
    label: 'Power Law Distribution',
    description: 'Scale-free distribution appearing in networks, city sizes, and natural phenomena.',
    animation: { duration: 1.5, easing: [0.95, 0.05, 0.795, 0.035], customDelays: [0, 0.03, 0.07, 0.12, 0.18] }
  },
  erlang: {
    label: 'Erlang Distribution',
    description: 'Sum of independent exponential variables, used in telecommunications and queuing theory.',
    animation: { duration: 1.3, easing: [0.25, 0.46, 0.45, 0.94] }
  },
  'maxwell-boltzmann': {
    label: 'Maxwell-Boltzmann Distribution',
    description: 'Models molecular speeds in ideal gases, fundamental in statistical mechanics.',
    animation: { duration: 1.4, easing: [0.34, 0.32, 0.66, 1] }
  },
  levy: {
    label: 'Lévy Distribution',
    description: 'Heavy-tailed stable distribution with infinite variance, models extreme jumps.',
    animation: { duration: 1.6, easing: [0.87, -0.41, 0.19, 1.44] }
  },
  semicircle: {
    label: 'Wigner Semicircle Distribution',
    description: 'Eigenvalue distribution from random matrix theory, used in quantum physics.',
    animation: { duration: 1.2, easing: [0.5, 0, 0.5, 1], allSimultaneous: true, delay: 0.2 }
  },
  zipf: {
    label: 'Zipf Distribution',
    description: 'Discrete power law for word frequencies, website visits, and ranking phenomena.',
    animation: { duration: 1.3, easing: [0.88, 0.14, 0.82, 0.32] }
  },
  rice: {
    label: 'Rice/Rician Distribution',
    description: 'Models signal with Gaussian noise, used in radar and MRI signal processing.',
    animation: { duration: 1.2, easing: [0.39, 0.575, 0.565, 1] }
  },
  
  // NEW PARAMETRIC VARIATIONS - Generated using pure functions!
  'normal-narrow': {
    label: 'Normal (Narrow)',
    description: 'Sharp peaked normal distribution - created parametrically with std=0.08.',
    animation: { duration: 1.5, easing: [0.5, 0, 0.5, 1], allSimultaneous: true, delay: 0.3 }
  },
  'normal-wide': {
    label: 'Normal (Wide)',
    description: 'Wide spread normal distribution - created parametrically with std=0.25.',
    animation: { duration: 1.5, easing: [0.5, 0, 0.5, 1], allSimultaneous: true, delay: 0.25 }
  },
  'normal-left': {
    label: 'Normal (Left Skew)',
    description: 'Normal distribution shifted left - created parametrically with mean=0.3.',
    animation: { duration: 1.5, easing: [0.5, 0, 0.5, 1] }
  },
  'normal-right': {
    label: 'Normal (Right Skew)',
    description: 'Normal distribution shifted right - created parametrically with mean=0.7.',
    animation: { duration: 1.5, easing: [0.5, 0, 0.5, 1], reverse: true }
  },
  'power-law-gentle': {
    label: 'Power Law (Gentle)',
    description: 'Gentle power law decay - created parametrically with alpha=1.8.',
    animation: { duration: 1.6, easing: [0.9, 0.03, 0.69, 0.22] }
  },
  'power-law-steep': {
    label: 'Power Law (Steep)',
    description: 'Steep power law decay - created parametrically with alpha=3.5.',
    animation: { duration: 1.4, easing: [0.95, 0.05, 0.795, 0.035] }
  },
  'bimodal-wide': {
    label: 'Bimodal (Wide)',
    description: 'Two widely separated peaks - created by mixing two normals.',
    animation: { duration: 1.2, easing: [0.68, -0.3, 0.32, 1.3], peakGroups: [3, 4, 11, 12] }
  },
  'bimodal-asymmetric': {
    label: 'Bimodal (Asymmetric)',
    description: 'Two peaks with different heights - 70/30 mix of normal distributions.',
    animation: { duration: 1.3, easing: [0.68, -0.3, 0.32, 1.3], fromBothEnds: true }
  },
  'trimodal': {
    label: 'Trimodal Distribution',
    description: 'Three distinct peaks - demonstrates functional composition!',
    animation: { duration: 1.4, easing: [0.5, 0, 0.5, 1], allSimultaneous: true, delay: 0.2 }
  },
  'exponormal': {
    label: 'Exponential-Normal Hybrid',
    description: 'Mix of exponential decay and normal peak - 60/40 blend.',
    animation: { duration: 1.5, easing: [0.68, -0.55, 0.265, 2] }
  },
  'powernormal': {
    label: 'Power Law-Normal Hybrid',
    description: 'Power law base with normal peak overlay - 50/50 blend.',
    animation: { duration: 1.4, easing: [0.9, 0.03, 0.69, 0.22], alternating: true }
  },
  'wave': {
    label: 'Wave Pattern',
    description: 'Eight small peaks creating a wave - generated in a loop!',
    animation: { duration: 1.3, easing: [0.42, 0, 0.58, 1], splitPattern: true }
  },
  'plateau': {
    label: 'Plateau Distribution',
    description: 'Flat-topped distribution - blend of normal and uniform.',
    animation: { duration: 1.2, easing: 'linear', allSimultaneous: true, delay: 0.1 }
  }
};

