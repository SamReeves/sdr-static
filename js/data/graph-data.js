/**
 * Graph data structure for D3.js force-directed network visualization
 * Transforms service data into nodes and edges for the service graph
 */

import { services } from './services.js';

/**
 * Generate unique ID from title (e.g., "AI Model Services" -> "ai-model-services")
 */
function generateId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Build nodes array with center and category nodes (sub-services embedded)
 */
export function buildGraphNodes() {
  const nodes = [];
  
  // Center node (company)
  nodes.push({
    id: 'center',
    type: 'center',
    label: 'SDR',
    fullLabel: 'Secure Data Research',
    radius: 40
  });
  
  // Category nodes with embedded sub-services data
  services.forEach(service => {
    const categoryId = generateId(service.title);
    
    // Category node with sub-services embedded for detail panel
    nodes.push({
      id: categoryId,
      type: 'category',
      label: service.title,
      description: service.description,
      icon: service.icon,
      featured: service.featured || false,
      radius: 30,
      subServices: service.subServices || []
    });
  });
  
  return nodes;
}

/**
 * Build edges array for node connections
 */
export function buildGraphEdges(nodes) {
  const edges = [];
  
  // Primary edges: center to each category
  nodes
    .filter(node => node.type === 'category')
    .forEach(category => {
      edges.push({
        source: 'center',
        target: category.id,
        type: 'primary',
        strength: 0.5
      });
    });
  
  // Relationship edges: cross-category connections
  const relationships = getCategoryRelationships();
  relationships.forEach(rel => {
    edges.push({
      source: rel.source,
      target: rel.target,
      type: 'relationship',
      strength: 0.1
    });
  });
  
  return edges;
}

/**
 * Define cross-category relationships based on thematic connections
 */
function getCategoryRelationships() {
  return [
    // AI and Analytics/ML Engineering (ML/modeling overlap)
    {
      source: 'ai-model-services',
      target: 'analytics-ml-engineering',
      theme: 'Machine Learning'
    },
    // Security and Blockchain (auditing theme)
    {
      source: 'security-compliance',
      target: 'blockchain',
      theme: 'Security Auditing'
    },
    // Security and Data Lifecycle (secure storage/destruction)
    {
      source: 'security-compliance',
      target: 'data-lifecycle',
      theme: 'Secure Data Management'
    },
    // Data Lifecycle and Analytics/ML Engineering (data flows into analysis)
    {
      source: 'data-lifecycle',
      target: 'analytics-ml-engineering',
      theme: 'Data Pipeline'
    },
    // Blockchain and Analytics/ML Engineering (network analysis)
    {
      source: 'blockchain',
      target: 'analytics-ml-engineering',
      theme: 'Network Analysis'
    },
    // Rapid Development and AI (prototyping)
    {
      source: 'rapid-development',
      target: 'ai-model-services',
      theme: 'Rapid Prototyping'
    }
  ];
}

/**
 * Initialize and return complete graph data structure
 */
export function getGraphData() {
  const nodes = buildGraphNodes();
  const edges = buildGraphEdges(nodes);
  
  return { nodes, edges };
}
