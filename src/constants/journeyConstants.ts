
// Constants for the Citingale product journey

// --- Constants ---
export const MILLET_OPTIONS = [
  { value: 'Multi-Millet', label: 'Multi-Millet (Ragi, Jowar, Bajra)' },
  { value: 'Ragi', label: 'Ragi Focused' },
  { value: 'Foxtail', label: 'Foxtail' },
  { value: 'Kodo', label: 'Kodo' },
];

export const FLAVOUR_OPTIONS = [
  'Classic Desi Masala',
  'Spicy Schezwan',
  'Creamy Tomato (Kids)',
  'Zesty Herb Tadka',
  'Korean Gochujang',
];

export const CLAIM_OPTIONS = [
  'High Protein', 'High Fiber', 'Gluten-Free', 'Vegan',
  'Baked Not Fried', 'No Maida', 'Clean Label', 'Quick Cook'
];

export const STARTING_POINTS = [
  { id: 'sp_custom', value: 'custom', title: 'Custom Build', description: 'Define all parameters yourself.' },
  { id: 'sp_formulation_protein', value: 'formulation_protein', title: 'BettrLabs Premium (Protein)', description: 'Pre-set for high protein & clean label.' },
  { id: 'sp_benchmark_trendy', value: 'benchmark_trendy', title: 'Market Benchmark (Trendy)', description: 'Based on top 10% trends (e.g., Protein/Baked).' },
];

export const STACK_TARGET_CLAIMS = [
  { value: 'High Protein', label: 'High Protein (>15g / svg)' },
  { value: 'High Fiber', label: 'High Fiber (>8g / svg)' },
  { value: 'Gluten-Free', label: 'Gluten-Free Certified' },
  { value: 'Balanced', label: 'Balanced Nutrition' },
];

export const STACK_BASE_MILLETS = ['Multi-Millet', 'Ragi Focused', 'Foxtail & Kodo Mix'];

// --- Core Journey Stages ---
export const JOURNEY_STAGES = [
  { key: 'conceptualise', label: 'Conceptualise & Validate' },
  { key: 'formulation', label: 'Formulation & Benchmarking' },
  { key: 'testing', label: 'Digital Twin Testing' },
  { key: 'pilot', label: 'Pilot & Refinement' },
  { key: 'manufacturing', label: 'Manufacturing & Launch' }
];
export const JOURNEY_STAGE_KEYS = JOURNEY_STAGES.map(s => s.key);

// Views associated with each stage (can include sub-views)
export const STAGE_VIEWS = {
  conceptualise: ['initial-details', 'generate-concepts', 'view-competitors', 'analyze-trends', 'dive-deep-competitors'],
  formulation: ['build-stack', 'estimate-cost', 'pick-packaging'], 
  testing: ['run-simulations', 'analyze-risks', 'predict-shelf-life'],
  pilot: ['request-samples', 'record-feedback', 'optimize-formulation'],
  manufacturing: ['select-manufacturer', 'finalize-packaging', 'prepare-launch']
};

// Other possible views not tied to a specific stage progression
export const OTHER_VIEWS = ['past-projects', 'project-success'];

// Mock Data
export const MOCK_COMPETITORS = [
  { id: 1, name: 'Slurrp Farm', claims: 'Kids Nutrition, Ragi', priceTier: 'Premium', strength: 'Brand Trust', marketShare: '5%' },
  { id: 2, name: 'Wholsum Foods (Millet)', claims: 'Multi-Millet, No Maida', priceTier: 'Mid-Premium', strength: 'Taste Profile', marketShare: '8%' },
  { id: 3, name: 'Soulfull', claims: 'Ragi, Masala Oats', priceTier: 'Mid', strength: 'Distribution', marketShare: '12%' },
  { id: 4, name: 'Possible (Millet Idli)', claims: 'Gluten-Free, Ready Mix', priceTier: 'Premium', strength: 'Niche Focus', marketShare: '3%' },
];

export const MOCK_PACKAGING_OPTIONS = [
  { id: 'pouch_single', name: 'Single Serve Pouch (60g)', material: 'Multi-layer Plastic', costEst: 'Low', sustainability: 'Low' },
  { id: 'pouch_multi', name: 'Multi-Pack Pouch (4x60g)', material: 'Multi-layer Plastic', costEst: 'Medium', sustainability: 'Low' },
  { id: 'box_family', name: 'Family Pack Box (300g)', material: 'Cardboard + Inner Pouch', costEst: 'Medium-High', sustainability: 'Medium' },
  { id: 'cup_instant', name: 'Instant Cup Noodles (70g)', material: 'Paper Cup + Lid', costEst: 'High', sustainability: 'Medium' },
  { id: 'sustainable_pouch', name: 'Compostable Pouch (60g)', material: 'PLA Blend', costEst: 'High', sustainability: 'High' },
];
