export const services = [
  {
    title: 'Project Management',
    description: 'Structured leadership across design, certification, and execution for onshore and offshore assets.',
    bullets: [
      'Portfolio and milestone planning',
      'Interface management with OEMs and certifiers',
      'Design risk mitigation and governance'
    ]
  },
  {
    title: 'Wind Resource Assessment',
    description: 'Bankable wind and metocean assessments for greenfield and repowering initiatives.',
    bullets: [
      'Metocean data QA/QC',
      'Energy yield modelling',
      'Uncertainty analysis and reporting'
    ]
  },
  {
    title: 'Loads & Structural Analysis',
    description: 'High-fidelity aeroelastic modelling for towers, blades, and floating substructures.',
    bullets: [
      'OpenFAST and OrcaFlex workflows',
      'Ultimate / fatigue loads envelopes',
      'Design driving DLC identification'
    ]
  },
  {
    title: 'Certification & Compliance',
    description: 'Full-spectrum support for IEC and DNV compliance, audits, and technical due diligence.',
    bullets: [
      'Design Basis & Type Certification',
      'Independent verification packages',
      'Standards alignment and documentation'
    ]
  },
  {
    title: 'Supply Chain & Strategy',
    description: 'Execution strategies that balance LCOE targets with robust supply chain readiness.',
    bullets: [
      'Industrialization roadmaps',
      'Vendor qualification',
      'Cost-out and risk workshops'
    ]
  }
];

export const projects = [
  {
    slug: 'ht1-aberdeen-bay',
    title: 'HT1 Aberdeen Bay',
    location: 'UK North Sea',
    category: ['Offshore', 'Hydrogen Integration'],
    summary: 'Hybrid offshore wind + hydrogen demonstrator with phased build-out.',
    outcomes: 'Load envelopes validated, certification-ready package delivered.',
    body: `# HT1 Aberdeen Bay\n\nWe supported hybrid power-to-hydrogen integration across planning, aeroelastic modelling, and certification liaison.`,
  },
  {
    slug: 'normandy-large-scale',
    title: 'Normandy I & II',
    location: 'France',
    category: ['Offshore'],
    summary: 'Large scale offshore development with accelerated design loops.',
    outcomes: 'Reduced design iteration cycle by 25% with automated load post-processing.',
    body: `# Normandy Offshore\n\nOwner's engineer role with focus on loads harmonization and certifier dialogue.`,
  },
  {
    slug: 'brittany-floating',
    title: 'Brittany Floating Wind',
    location: 'France',
    category: ['Floating'],
    summary: 'Pre-FEED floating demonstrator with multi-body dynamics.',
    outcomes: 'Stability validated and control strategy de-risked.',
    body: `# Brittany Floating\n\nFloating-specific DLC coverage with coupled simulations and mooring assessments.`,
  }
];

export const testimonials = [
  {
    client: 'Mingyang',
    role: 'Chief Engineer',
    company: 'Mingyang Smart Energy',
    quote: 'Aldott brought rigor to our loads program and accelerated certification readiness.'
  },
  {
    client: 'WindGuard',
    role: 'Technical Director',
    company: 'WindGuard',
    quote: 'Their design house mindset makes them a natural extension of our engineering team.'
  },
  {
    client: 'Para Enterprises',
    role: 'Founder',
    company: 'Para Enterprises',
    quote: 'Actionable guidance, rapid delivery, and a deep grasp of offshore realities.'
  }
];

export const blogPosts = [
  {
    slug: 'linked-loads-readiness',
    title: 'Linked Loads Readiness for Offshore Programs',
    excerpt: 'How to keep certification partners aligned while iterating turbine and foundation designs.',
    author: 'vikram',
    date: '2024-06-01',
    tags: ['Offshore', 'Certification'],
    content: '<p>Coordinating loads, controls, and certification packages benefits from shared context...</p>'
  },
  {
    slug: 'floating-tmd-strategy',
    title: 'Floating TMD Strategy',
    excerpt: 'Guidance for tuned mass dampers in floating offshore assets.',
    author: 'vikram',
    date: '2024-05-15',
    tags: ['Floating', 'Loads'],
    content: '<p>Floating systems demand careful integration of TMD approaches...</p>'
  }
];
