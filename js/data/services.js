/**
 * ============================================================================
 * SERVICE DATA
 * ============================================================================
 * 
 * Defines all service offerings displayed in the 3D sphere graph.
 * 
 * Each service has:
 * - icon: Key referencing an emoji from icons.js
 * - title: Main service category name
 * - description: Brief overview
 * - subServices: Array of specific offerings under this category
 * 
 * Array index corresponds to data-service attribute in HTML (0-6)
 */

export const services = [
  // Index 0
  {
    icon: 'brain',
    title: 'AI Model Services',
    description: 'Specialized LLM training and autonomous AI agents for your workflows.',
    subServices: [
      { title: 'Full Model Finetuning', description: 'End-to-end training on your data' },
      { title: 'Low-Rank Adaptation (LoRA)', description: 'Efficient parameter-efficient finetuning' },
      { title: 'Custom Agents', description: 'Autonomous AI agents tailored to your workflows' }
    ]
  },
  
  // Index 1
  {
    icon: 'lock',
    title: 'Security & Compliance',
    description: 'Comprehensive security auditing and hardened infrastructure.',
    subServices: [
      { title: 'Static Analysis', description: 'Code analysis and vulnerability scanning' },
      { title: 'Software & Hardware Audits', description: 'Infrastructure evaluation' },
      { title: 'Air-Gapped Solutions', description: 'Isolated systems for maximum security' }
    ]
  },
  
  // Index 2
  {
    icon: 'disk',
    title: 'Data Lifecycle',
    description: 'Complete data management from recovery to secure destruction.',
    subServices: [
      { title: 'Data Recovery', description: 'Recover from damaged or corrupted storage' },
      { title: 'Encrypted Archiving', description: 'Secure long-term storage with strong encryption' },
      { title: 'Data Destruction', description: 'Secure sanitization using industry best practices' }
    ]
  },
  
  // Index 3
  {
    icon: 'chain',
    title: 'Blockchain',
    description: 'Distributed ledger solutions and transaction analysis.',
    subServices: [
      { title: 'Network Analysis', description: 'Forensics, traffic analysis, and transaction tracing' },
      { title: 'Smart Contract Engineering', description: 'Development and security auditing' }
    ]
  },
  
  // Index 4
  {
    icon: 'ruler',
    title: 'Analytics & ML Engineering',
    description: 'End-to-end data pipelines from collection to production deployment.',
    subServices: [
      { title: 'Data Collection & Cleaning', description: 'ETL pipelines and data quality assurance' },
      { title: 'Exploratory Analysis', description: 'Statistical analysis and visualization' },
      { title: 'Feature Engineering', description: 'Transform raw data into model-ready features' },
      { title: 'Model Development', description: 'Training, validation, and hyperparameter tuning' },
      { title: 'Deployment & Monitoring', description: 'Production pipelines and performance tracking' }
    ]
  },
  
  // Index 5
  {
    icon: 'zap',
    title: 'Rapid Development',
    description: 'Fast prototyping, infrastructure design, and automated data collection.',
    subServices: [
      { title: 'Software Prototyping', description: 'Proof-of-concept and prototype applications' },
      { title: 'Database & Network Design', description: 'Custom architecture design' },
      { title: 'Web Scraping', description: 'Automated extraction and large-scale crawling' }
    ]
  },
  
  // Index 6
  {
    icon: 'wrench',
    title: 'Code Plumbing',
    description: 'Maintenance, debugging, and technical debt management for existing codebases.',
    subServices: [
      { title: 'Debugging & Troubleshooting', description: 'Root cause analysis and bug fixes' },
      { title: 'Code Refactoring', description: 'Improve code quality and maintainability' },
      { title: 'Tech Debt Management', description: 'Systematic reduction of technical debt' },
      { title: 'Performance Optimization', description: 'Profiling and optimization of bottlenecks' },
      { title: 'Dependency Updates', description: 'Security patches and version upgrades' },
      { title: 'Build Pipeline Maintenance', description: 'CI/CD optimization and troubleshooting' }
    ]
  }
];
