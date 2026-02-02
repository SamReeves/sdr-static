/**
 * D3.js Force-Directed Graph for Services
 * Creates an interactive network visualization with expandable nodes
 */

import { getGraphData } from '../data/graph-data.js';
import { icons } from '../data/icons.js';

// Graph configuration
const CONFIG = {
  width: 1000,
  height: 700,
  centerForce: 0.4,
  chargeStrength: -800,
  linkDistance: 140,
  transitionDuration: 300,
  radiusMultiplier: 2.2,
  padding: 50
};

// Module state
let svg, simulation, nodeElements, edgeElements, labelElements, tooltip, detailPanel;
let graphData = { nodes: [], edges: [] };
let currentSelectedNode = null;

/**
 * Initialize the service graph visualization
 */
export function initServiceGraph(container) {
  if (!container) {
    console.error('Service graph container not found');
    return;
  }
  
  // Get graph data
  graphData = getGraphData();
  
  // Create SVG that fills container
  svg = d3.select(container)
    .append('svg')
    .attr('class', 'service-graph')
    .attr('viewBox', `0 0 ${CONFIG.width} ${CONFIG.height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  
  // Create groups for layering (edges behind nodes)
  const edgeGroup = svg.append('g').attr('class', 'service-graph__edges');
  const nodeGroup = svg.append('g').attr('class', 'service-graph__nodes');
  const labelGroup = svg.append('g').attr('class', 'service-graph__labels');
  
  // Create tooltip
  createTooltip(container);
  
  // Create detail panel
  createDetailPanel(container);
  
  // Initialize force simulation
  simulation = createSimulation();
  
  // Render graph elements
  edgeElements = renderEdges(edgeGroup);
  nodeElements = renderNodes(nodeGroup);
  labelElements = renderLabels(labelGroup);
  
  // Start simulation
  simulation.on('tick', onTick);
}

/**
 * Create D3 force simulation
 */
function createSimulation() {
  return d3.forceSimulation(graphData.nodes)
    .force('charge', d3.forceManyBody().strength(CONFIG.chargeStrength))
    .force('center', d3.forceCenter(CONFIG.width / 2, CONFIG.height / 2).strength(CONFIG.centerForce))
    .force('link', d3.forceLink(graphData.edges)
      .id(d => d.id)
      .distance(d => {
        if (d.type === 'primary') return CONFIG.linkDistance;
        if (d.type === 'secondary') return CONFIG.linkDistance * 0.6;
        return CONFIG.linkDistance * 1.2;
      })
      .strength(d => d.strength)
    )
    .force('collision', d3.forceCollide().radius(d => d.radius * CONFIG.radiusMultiplier));
}

/**
 * Render edge elements (lines connecting nodes)
 */
function renderEdges(group) {
  return group.selectAll('.service-graph__edge')
    .data(graphData.edges)
    .enter()
    .append('line')
    .attr('class', d => `service-graph__edge service-graph__edge--${d.type}`)
    .attr('stroke-opacity', d => {
      // Relationship edges are very subtle
      if (d.type === 'relationship') return 0.15;
      // Secondary edges start hidden
      if (d.type === 'secondary') return 0;
      return 0.4;
    });
}

/**
 * Render node elements (icons and images)
 */
function renderNodes(group) {
  const nodes = group.selectAll('.service-graph__node')
    .data(graphData.nodes)
    .enter()
    .append('g')
    .attr('class', d => `service-graph__node service-graph__node--${d.type}`)
    .style('cursor', d => d.type === 'category' ? 'pointer' : 'default')
    .style('pointer-events', 'all');
  
  // Add logo image for center node
  nodes.filter(d => d.type === 'center')
    .append('image')
    .attr('class', 'service-graph__node-logo')
    .attr('href', 'logo-image.JPG')
    .attr('width', 80)
    .attr('height', 80)
    .attr('x', -40)
    .attr('y', -40)
    .style('pointer-events', 'none');
  
  // Add invisible circle hit target for better click detection
  nodes.filter(d => d.type === 'category')
    .append('circle')
    .attr('class', 'service-graph__node-hitarea')
    .attr('r', 40)
    .attr('fill', 'transparent')
    .style('pointer-events', 'all');
  
  // Add emoji icons for category nodes
  nodes.filter(d => d.type === 'category')
    .append('text')
    .attr('class', 'service-graph__node-icon service-graph__node-icon--category')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-size', '2.5rem')
    .style('pointer-events', 'none')
    .text(d => icons[d.icon] || '●');
  
  // Add featured badge
  nodes.filter(d => d.featured)
    .append('circle')
    .attr('class', 'service-graph__node-badge')
    .attr('r', 8)
    .attr('cx', 25)
    .attr('cy', -25)
    .style('pointer-events', 'none');
  
  // Event handlers for category nodes (clickable)
  const categoryNodes = nodes.filter(d => d.type === 'category');
  categoryNodes
    .on('click', handleCategoryClick)
    .on('mouseenter', handleNodeMouseEnter)
    .on('mouseleave', handleNodeMouseLeave);
  
  // Event handlers for non-category nodes (hover only)
  nodes.filter(d => d.type !== 'category')
    .on('mouseenter', handleNodeMouseEnter)
    .on('mouseleave', handleNodeMouseLeave);
  
  return nodes;
}

/**
 * Render label elements (text)
 */
function renderLabels(group) {
  return group.selectAll('.service-graph__label')
    .data(graphData.nodes)
    .enter()
    .append('text')
    .attr('class', d => `service-graph__label service-graph__label--${d.type}`)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .text(d => d.label);
}

/**
 * Update positions on simulation tick
 */
function onTick() {
  // Update edge positions
  edgeElements
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
  
  // Update node positions
  nodeElements
    .attr('transform', d => `translate(${d.x},${d.y})`);
  
  // Update label positions
  labelElements
    .attr('x', d => d.x)
    .attr('y', d => d.y + d.radius + 8);
}

/**
 * Handle category node click (show detail panel)
 */
function handleCategoryClick(event, clickedNode) {
  event.stopPropagation();
  showDetailPanel(clickedNode);
}

/**
 * Handle node mouse enter (show tooltip)
 */
function handleNodeMouseEnter(event, node) {
  // Highlight node by scaling icon
  d3.select(event.currentTarget)
    .select('.service-graph__node-icon')
    .transition()
    .duration(150)
    .attr('font-size', d => {
      if (d.type === 'category') return '3rem';
      if (d.type === 'subservice') return '1.8rem';
      return '2.5rem';
    });
  
  // Show tooltip if node has description
  if (node.description) {
    showTooltip(event, node);
  }
}

/**
 * Handle node mouse leave (hide tooltip)
 */
function handleNodeMouseLeave(event, node) {
  // Remove highlight by restoring icon size
  d3.select(event.currentTarget)
    .select('.service-graph__node-icon')
    .transition()
    .duration(150)
    .attr('font-size', d => {
      if (d.type === 'category') return '2.5rem';
      if (d.type === 'subservice') return '1.5rem';
      return '2rem';
    });
  
  // Hide tooltip
  hideTooltip();
}

/**
 * Create tooltip element
 */
function createTooltip(container) {
  tooltip = d3.select(container)
    .append('div')
    .attr('class', 'service-graph__tooltip')
    .style('opacity', 0);
}

/**
 * Show tooltip with node information
 */
function showTooltip(event, node) {
  let html = `<strong>${node.label}</strong>`;
  
  if (node.description) {
    html += `<p>${node.description}</p>`;
  }
  
  // For category nodes, add click hint and sub-service preview
  if (node.type === 'category' && node.subServices && node.subServices.length > 0) {
    html += `<div class="service-graph__tooltip-hint">Click to see details:</div>`;
    html += `<ul class="service-graph__tooltip-preview">`;
    node.subServices.forEach(sub => {
      html += `<li>${sub.title}</li>`;
    });
    html += `</ul>`;
  }
  
  tooltip
    .html(html)
    .style('left', `${event.pageX + 10}px`)
    .style('top', `${event.pageY - 10}px`)
    .transition()
    .duration(200)
    .style('opacity', 1);
}

/**
 * Hide tooltip
 */
function hideTooltip() {
  tooltip
    .transition()
    .duration(200)
    .style('opacity', 0);
}

/**
 * Create detail panel element
 */
function createDetailPanel(container) {
  detailPanel = d3.select(container)
    .append('div')
    .attr('class', 'service-graph__panel')
    .style('opacity', 0)
    .style('display', 'none');
}

/**
 * Show detail panel with category information
 */
function showDetailPanel(node) {
  if (!node || !node.subServices || node.subServices.length === 0) return;
  
  // Update current selection
  currentSelectedNode = node;
  
  // Build panel HTML
  const html = `
    <div class="service-graph__panel-header">
      <div class="service-graph__panel-title">
        <span class="service-graph__panel-icon">${icons[node.icon] || ''}</span>
        <h3>${node.label}</h3>
      </div>
      <button class="service-graph__panel-close" aria-label="Close panel">×</button>
    </div>
    <p class="service-graph__panel-description">${node.description}</p>
    <ul class="service-graph__panel-list">
      ${node.subServices.map(sub => `
        <li class="service-graph__panel-item">
          <strong class="service-graph__panel-item-title">${sub.title}</strong>
          <p class="service-graph__panel-item-desc">${sub.description}</p>
        </li>
      `).join('')}
    </ul>
  `;
  
  // Update panel content
  detailPanel.html(html);
  
  // Add close handler
  detailPanel.select('.service-graph__panel-close')
    .on('click', hideDetailPanel);
  
  // Show panel with animation
  detailPanel
    .style('display', 'block')
    .transition()
    .duration(CONFIG.transitionDuration)
    .style('opacity', 1);
}

/**
 * Hide detail panel
 */
function hideDetailPanel() {
  currentSelectedNode = null;
  
  detailPanel
    .transition()
    .duration(CONFIG.transitionDuration)
    .style('opacity', 0)
    .on('end', function() {
      detailPanel.style('display', 'none');
    });
}

