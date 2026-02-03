# Secure Data Research Website

A clean, modern website featuring a 3D animated sphere graph visualization of service offerings.

## 🎯 Features

- **3D Sphere Graph**: Services displayed as nodes on a rotating sphere using perspective projection
- **Fibonacci Distribution**: Nodes evenly spaced using the golden ratio for perfect visual balance
- **Depth-Based Rendering**: Proper z-ordering with opacity based on distance from viewer
- **Click-to-View Details**: Interactive panels showing detailed service information
- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **Performance Optimized**: GPU-accelerated transforms, efficient animation loop

## 📁 Project Structure

```
/home/s/sdr/
├── index.html              # Main page
├── contact.html            # Contact page (mailto link)
├── logo-image.JPG          # Company logo
├── README.md               # This file
│
├── css/                    # Stylesheets
│   ├── base.css           # Global styles, variables, typography
│   ├── hero.css           # Hero section styles
│   ├── service-graph.css  # 3D graph visualization styles
│   └── contact.css        # Contact page styles
│
└── js/                     # JavaScript modules
    ├── main.js            # Application entry point
    │
    ├── modules/
    │   └── sphere-graph.js # 3D sphere graph engine
    │
    └── data/
        ├── services.js    # Service data (titles, descriptions)
        └── icons.js       # Icon/emoji mappings
```

## 🔧 How It Works

### 3D Sphere Graph (`js/modules/sphere-graph.js`)

The sphere graph uses a multi-step rendering pipeline:

1. **Node Distribution**: Fibonacci sphere algorithm distributes 7 service nodes evenly
2. **Coordinate Conversion**: Spherical coordinates (θ, φ, r) → Cartesian (x, y, z)
3. **Rotation**: Apply Y-axis spin and X-axis tilt transformations
4. **Perspective Projection**: 3D points → 2D screen coordinates with depth scaling
5. **Z-Sorting**: Painter's algorithm ensures proper rendering order
6. **Animation Loop**: 30-second rotation cycle with smooth oscillating tilt

### Animation Parameters

- **Rotation Period**: 30 seconds for full 360° spin
- **Tilt Range**: 0° to 45° smooth oscillation
- **Sphere Radius**: 200 SVG units
- **Camera Distance**: 600 units
- **Node Count**: 7 services

### Detail Panel

Click any service node to view:
- Service title and description
- List of sub-services with details
- Responsive positioning (sidebar on desktop, below graph on mobile)

## 🎨 Customization

### Change Animation Speed

Edit `ANIMATION_PERIOD` in `js/modules/sphere-graph.js`:

```javascript
const ANIMATION_PERIOD = 30000; // milliseconds (30 seconds)
```

### Modify Service Data

Edit `js/data/services.js` to change service information:

```javascript
export const services = [
  {
    icon: 'brain',
    title: 'AI Model Services',
    description: 'Your description here',
    subServices: [
      { title: 'Service Name', description: 'Details' }
    ]
  }
];
```

### Adjust Sphere Size

Edit constants in `js/modules/sphere-graph.js`:

```javascript
const SPHERE_RADIUS = 200;    // Larger = more spread out
const CAMERA_DISTANCE = 600;  // Larger = less perspective distortion
```

## 🚀 Performance

The graph is highly optimized:

- **GPU Acceleration**: `will-change` hints for transform/opacity
- **Efficient Math**: Pre-computed Fibonacci coordinates
- **Minimal DOM Updates**: Batch transform updates in single animation frame
- **No Heavy Libraries**: Pure JavaScript, no frameworks needed

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Copyright © 2024 Secure Data Research, LLC

## 📧 Contact

Email: [sam@securedataresearch.net](mailto:sam@securedataresearch.net)
