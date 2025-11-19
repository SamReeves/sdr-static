# Parametric Distribution System

## 🎯 Overview

This system eliminates **magic numbers** and provides **infinite distribution variations** through **pure functional composition**.

## 📁 File Structure

```
distributions/
├── index.js                    # Main exports
├── metadata.js                 # Labels, descriptions, animations
├── pdf-functions.js            # Current 26 distributions (refactored)
├── parametric-generators.js    # Pure function generators
└── library.js                  # Examples & extensions
```

## 🚀 Quick Start

### Using Existing Distributions

```javascript
import { pdfFunctions } from './distributions/index.js';

// Use as before - backward compatible
const value = pdfFunctions.normal(0.5, 0.3);
```

### Creating New Distributions

```javascript
import { 
  normalDistribution, 
  offsetScale 
} from './distributions/parametric-generators.js';

// Create a custom normal distribution
const myNormal = offsetScale(
  normalDistribution(0.6, 0.2),  // mean=0.6, std=0.2
  0.9,                            // base scale
  0.35                            // offset factor
);

// Use it
const value = myNormal(0.5, 0.3);
```

## 🎨 Examples

### 1. Normal Distribution Family

```javascript
import { normalDistribution, offsetScale } from './parametric-generators.js';

const normalFamily = {
  narrow: offsetScale(normalDistribution(0.5, 0.08), 0.85, 0.3),
  wide: offsetScale(normalDistribution(0.5, 0.25), 0.85, 0.3),
  left: offsetScale(normalDistribution(0.3, 0.15), 0.85, 0.3),
  right: offsetScale(normalDistribution(0.7, 0.15), 0.85, 0.3)
};
```

### 2. Bimodal Distribution

```javascript
import { normalDistribution, mix } from './parametric-generators.js';

const bimodal = mix(
  normalDistribution(0.3, 0.05),  // First peak
  normalDistribution(0.7, 0.05),  // Second peak
  0.5                              // Equal weight
);
```

### 3. Trimodal Distribution

```javascript
import { normalDistribution, mix } from './parametric-generators.js';

const trimodal = (t, offset) => {
  const p1 = normalDistribution(0.2, 0.05)(t);
  const p2 = normalDistribution(0.5, 0.05)(t);
  const p3 = normalDistribution(0.8, 0.05)(t);
  return (p1 + p2 + p3) / 3 * (1 + offset * 0.3);
};
```

### 4. Hybrid Distributions

```javascript
import { exponentialDistribution, normalDistribution, mix } from './parametric-generators.js';

// Mix exponential decay with normal peak
const hybrid = mix(
  exponentialDistribution(3),
  normalDistribution(0.6, 0.15),
  0.6  // 60% exponential, 40% normal
);
```

### 5. Programmatic Generation

```javascript
import { normalDistribution, offsetScale } from './parametric-generators.js';

// Generate 100 variations with different standard deviations
const variations = Array.from({ length: 100 }, (_, i) => {
  const std = 0.05 + i * 0.005;
  return {
    name: `normal-${i}`,
    func: offsetScale(normalDistribution(0.5, std), 0.85, 0.3)
  };
});
```

### 6. Configuration-Driven

```javascript
function createDistribution(config) {
  const generators = {
    normal: normalDistribution,
    exponential: exponentialDistribution,
    powerlaw: powerLawDistribution
  };
  
  const base = generators[config.type](...config.params);
  return offsetScale(base, config.scale, config.offsetFactor);
}

// Use it
const myDist = createDistribution({
  type: 'normal',
  params: [0.5, 0.2],
  scale: 0.9,
  offsetFactor: 0.35
});
```

## 🔧 Available Generators

### Basic Distributions

- `normalDistribution(mean, std)` - Gaussian/bell curve
- `exponentialDistribution(lambda)` - Exponential decay
- `uniformDistribution(value)` - Constant value
- `betaDistribution(alpha, beta, norm)` - Beta distribution
- `gammaDistribution(k, theta, inScale, outScale)` - Gamma distribution
- `cauchyDistribution(x0, gamma, scale)` - Heavy-tailed
- `powerLawDistribution(alpha, xMin, scale)` - Power law
- `weibullDistribution(k, lambda, inScale, outScale)` - Weibull
- `tDistribution(nu, center, spread, scale)` - Student's t
- `laplaceDistribution(mu, b, scale)` - Double exponential
- `bimodalDistribution(m1, m2, s1, s2, weight)` - Two peaks

### Combinators

- `scale(dist, factor)` - Multiply output
- `offsetScale(dist, base, factor)` - Offset-dependent scaling
- `shift(dist, amount)` - Horizontal shift
- `mix(dist1, dist2, weight)` - Blend two distributions
- `clamp(dist, min, max)` - Limit output range
- `transform(dist, func)` - Transform input domain

## 📊 Comparison

### Before (Magic Numbers)

```javascript
normal: (t, offset) => {
  const mean = 0.5, std = 0.15;  // ❌ Magic numbers
  const peak = Math.exp(-Math.pow(t - mean, 2) / (2 * std * std));
  return peak * 0.85 * (1 + offset * 0.3);  // ❌ More magic
}
```

### After (Pure Functions)

```javascript
normal: offsetScale(
  normalDistribution(0.5, 0.15),  // ✅ Clear parameters
  0.85,                            // ✅ Named scale
  0.3                              // ✅ Named offset factor
)
```

## 🎓 Advanced Usage

### Builder Pattern

```javascript
import { DistributionBuilder } from './library.js';

const myDist = new DistributionBuilder()
  .setType('normal', [0.6, 0.2])
  .setScaling(0.9, 0.35)
  .build();
```

### Dynamic Family Generation

```javascript
import { generateFamily, normalDistribution } from './library.js';

const family = generateFamily(
  normalDistribution,
  [0.05, 0.10, 0.15, 0.20, 0.25],  // std values
  'normal'
);

// Result: normal-0, normal-1, normal-2, normal-3, normal-4
```

## 📈 Benefits

1. **No Magic Numbers** - Every value has meaning
2. **Infinite Variations** - Generate unlimited distributions
3. **Composable** - Combine simple functions into complex ones
4. **Type-Safe** - Clear function signatures
5. **Testable** - Pure functions are easy to test
6. **Maintainable** - Change parameters in one place
7. **Discoverable** - Parameters are self-documenting

## 🔄 Migration Guide

### To add the new system to your app:

1. **Keep existing distributions** (backward compatible):
   ```javascript
   import { pdfFunctions } from './distributions/index.js';
   ```

2. **Add new variations** using library:
   ```javascript
   import { extendedDistributions } from './distributions/library.js';
   
   // Merge with existing
   const allDistributions = {
     ...pdfFunctions,
     ...extendedDistributions
   };
   ```

3. **Create custom distributions** on demand:
   ```javascript
   import { normalDistribution, offsetScale } from './distributions/parametric-generators.js';
   
   const custom = offsetScale(normalDistribution(0.6, 0.18), 0.88, 0.32);
   ```

## 🎯 Next Steps

You can now:
- Add 100s of distribution variations without new code
- Create distributions from user input
- Generate distribution families programmatically
- Build complex shapes from simple primitives
- Experiment with new combinations instantly

**The possibilities are truly infinite!** 🚀

