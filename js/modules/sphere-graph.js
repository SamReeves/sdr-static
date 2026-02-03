/**
 * ============================================================================
 * 3D Sphere Graph Module
 * ============================================================================
 * 
 * Creates an animated 3D visualization of service nodes distributed on a
 * sphere. Nodes rotate smoothly using perspective projection and z-depth
 * sorting for proper rendering order.
 * 
 * Animation: 30 seconds per full rotation with smooth tilt oscillation
 * Distribution: Fibonacci sphere algorithm for uniform node spacing
 * Rendering: Perspective projection with depth-based opacity
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const SPHERE_RADIUS = 220;        // Radius of the sphere in SVG units
const CAMERA_DISTANCE = 600;      // Distance of virtual camera from origin
const CENTER_X = 350;             // SVG viewport center X
const CENTER_Y = 350;             // SVG viewport center Y
const ANIMATION_PERIOD = 30000;   // Full rotation time in milliseconds

// ============================================================================
// NODE DISTRIBUTION
// ============================================================================
// Uses Fibonacci sphere algorithm to evenly distribute nodes on sphere surface
// This prevents clustering and ensures visually balanced spacing

const NUM_NODES = 7;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const SPHERE_NODES = [];

for (let i = 0; i < NUM_NODES; i++) {
  // Fibonacci spiral distribution
  const y = 1 - (2 * (i + 0.5)) / NUM_NODES;  // Height from -1 to 1
  const theta = (2 * Math.PI * i) / GOLDEN_RATIO;  // Azimuth angle
  const phi = Math.asin(y);  // Elevation angle
  
  SPHERE_NODES.push({
    theta,
    phi,
    r: SPHERE_RADIUS,
    index: i,
  });
}

// ============================================================================
// EDGE CONNECTIONS
// ============================================================================
// Defines which service nodes are connected by relationship lines
// Format: [fromIndex, toIndex]

const RELATIONSHIP_EDGES = [
  [0, 4], // AI Model Services → Analytics & ML
  [1, 3], // Security → Blockchain
  [1, 2], // Security → Data Lifecycle
  [2, 4], // Data Lifecycle → Analytics
  [3, 4], // Blockchain → Analytics
  [5, 0], // Rapid Development → AI
  [6, 5], // Code Plumbing → Rapid Development
  [6, 2], // Code Plumbing → Data Lifecycle
];

// ============================================================================
// MODULE STATE
// ============================================================================
// Cached DOM elements and animation state

let animationFrameId = null;       // RequestAnimationFrame ID for cleanup
let nodeElements = [];              // SVG node groups
let labelElements = [];             // SVG text labels
let relationshipEdges = [];         // SVG line elements
let nodesGroup = null;              // Parent group for z-ordering
let relationshipEdgesGroup = null;  // Edge container group

// ============================================================================
// 3D MATH FUNCTIONS
// ============================================================================

/**
 * Convert spherical coordinates to Cartesian (3D space)
 * 
 * @param {number} theta - Azimuth angle (horizontal rotation)
 * @param {number} phi - Elevation angle (vertical position)
 * @param {number} r - Radius (distance from origin)
 * @returns {object} 3D point {x, y, z}
 */
function sphericalToCartesian(theta, phi, r) {
  const x = r * Math.cos(phi) * Math.sin(theta);
  const y = r * Math.sin(phi);
  const z = r * Math.cos(phi) * Math.cos(theta);
  return { x, y, z };
}

/**
 * Apply 3D rotation transformations to a point
 * 
 * First rotates around Y-axis (spin), then around X-axis (tilt)
 * 
 * @param {object} point - 3D point {x, y, z}
 * @param {number} spinAngle - Y-axis rotation in radians
 * @param {number} tiltAngle - X-axis rotation in radians
 * @returns {object} Rotated 3D point {x, y, z}
 */
function rotatePoint(point, spinAngle, tiltAngle) {
  let { x, y, z } = point;

  // Y-axis rotation (spin)
  const cosY = Math.cos(spinAngle);
  const sinY = Math.sin(spinAngle);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;

  // X-axis rotation (tilt)
  const cosX = Math.cos(tiltAngle);
  const sinX = Math.sin(tiltAngle);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

/**
 * Project 3D point to 2D screen coordinates with perspective
 * 
 * Uses camera distance to create depth effect - objects farther from
 * camera appear smaller. Returns both screen position and scale factor.
 * 
 * @param {object} point - 3D point {x, y, z}
 * @returns {object} Projected point {screenX, screenY, scale, z}
 */
function projectPerspective(point) {
  const depth = CAMERA_DISTANCE + point.z;
  const scale = CAMERA_DISTANCE / depth;
  
  const screenX = CENTER_X + point.x * scale;
  const screenY = CENTER_Y - point.y * scale; // Flip Y for screen coordinates
  
  return {
    screenX: Math.round(screenX),
    screenY: Math.round(screenY),
    scale,
    z: point.z,
  };
}

// ============================================================================
// ANIMATION
// ============================================================================

/**
 * Animation loop - updates node positions and edges each frame
 * 
 * Process:
 * 1. Calculate current rotation angles based on time
 * 2. Project all nodes from 3D to 2D
 * 3. Sort by depth (painter's algorithm)
 * 4. Update DOM transforms, opacity, and edge positions
 * 
 * @param {number} timestamp - Current time from requestAnimationFrame
 */
function updateNodePositions(timestamp) {
  // Calculate animation progress (0 to 1 over animation period)
  const t = (timestamp % ANIMATION_PERIOD) / ANIMATION_PERIOD;
  
  // Spin: full 360° rotation around Y-axis
  const spinAngle = t * 2 * Math.PI;
  
  // Tilt: smooth oscillation (0° → 180° → 0°) around X-axis
  const tiltAngle = Math.sin(t * Math.PI) * Math.PI;

  // Project all nodes
  const projectedNodes = SPHERE_NODES.map((node) => {
    // Convert spherical to Cartesian
    const cartesian = sphericalToCartesian(node.theta, node.phi, node.r);
    
    // Apply rotations
    const rotated = rotatePoint(cartesian, spinAngle, tiltAngle);
    
    // Project to 2D with perspective
    const projected = projectPerspective(rotated);
    
    return {
      ...projected,
      index: node.index,
    };
  });

  // Sort by depth (Painter's Algorithm)
  // Render far-to-near so closer nodes appear on top
  // Z-axis: positive = farther, negative = closer to viewer
  projectedNodes.sort((a, b) => b.z - a.z);

  // Update node transforms and z-order
  projectedNodes.forEach((proj, renderOrder) => {
    const nodeElement = nodeElements[proj.index];
    const labelElement = labelElements[proj.index];
    
    if (nodeElement) {
      // Update transform
      nodeElement.setAttribute(
        'transform',
        `translate(${proj.screenX}, ${proj.screenY}) scale(${proj.scale.toFixed(3)})`
      );
      
      // Update z-order by moving in DOM
      if (nodesGroup) {
        nodesGroup.appendChild(nodeElement);
      }
      
      // Adjust opacity based on depth (far = dimmer)
      const opacity = 0.4 + (proj.scale * 0.6);
      nodeElement.style.opacity = opacity.toFixed(2);
    }
    
    if (labelElement) {
      // Labels don't scale, just move
      const labelY = proj.screenY + 48 * proj.scale;
      labelElement.setAttribute('x', proj.screenX);
      labelElement.setAttribute('y', Math.round(labelY));
      
      // Fade labels based on depth
      const labelOpacity = 0.3 + (proj.scale * 0.7);
      labelElement.style.opacity = labelOpacity.toFixed(2);
    }
  });

  // Update relationship edges
  relationshipEdges.forEach((edge, idx) => {
    const [fromIdx, toIdx] = RELATIONSHIP_EDGES[idx];
    const fromProj = projectedNodes.find(p => p.index === fromIdx);
    const toProj = projectedNodes.find(p => p.index === toIdx);
    
    if (fromProj && toProj) {
      edge.setAttribute('x1', fromProj.screenX);
      edge.setAttribute('y1', fromProj.screenY);
      edge.setAttribute('x2', toProj.screenX);
      edge.setAttribute('y2', toProj.screenY);
      
      // Relationship edges are dimmer
      const avgScale = (fromProj.scale + toProj.scale) / 2;
      const edgeOpacity = 0.05 + (avgScale * 0.15);
      edge.style.strokeOpacity = edgeOpacity.toFixed(2);
    }
  });

  // Continue animation
  animationFrameId = requestAnimationFrame(updateNodePositions);
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Initialize and start the 3D sphere graph animation
 * 
 * Caches all necessary DOM elements and starts the animation loop
 * 
 * @param {HTMLElement} container - Graph container element
 */
export function initSphereGraph(container) {
  if (!container) return;

  // Get SVG element
  const svg = container.querySelector('.service-graph');
  if (!svg) return;

  // Get node elements
  nodeElements = Array.from(
    svg.querySelectorAll('.service-graph__node--category')
  );
  
  // Get label elements
  labelElements = SPHERE_NODES.map((node) => {
    return svg.querySelector(
      `.service-graph__label--category:nth-of-type(${node.index + 1})`
    );
  });

  // Get nodes group for z-ordering
  nodesGroup = svg.querySelector('.service-graph__nodes');

  // Get edge group
  relationshipEdgesGroup = svg.querySelector('.service-graph__edges');
  if (relationshipEdgesGroup) {
    relationshipEdges = Array.from(relationshipEdgesGroup.querySelectorAll('line'));
  }

  // Start animation
  animationFrameId = requestAnimationFrame(updateNodePositions);
}

/**
 * Stop the animation and clean up
 * 
 * Call this before removing the graph from the DOM to prevent
 * memory leaks from the animation loop
 */
export function stopSphereGraph() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
