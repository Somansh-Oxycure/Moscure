// ── Diseases data ──────────────────────────────────────────
export const DISEASES_DATA = [
  {
    id: 'dengue',
    name: 'Dengue Fever',
    stat: '40M+',
    statLabel: 'Global cases annually',
    description:
      'Dengue virus is transmitted by Aedes aegypti mosquitoes. Causes severe flu-like illness, high fever, muscle pain, and can lead to potentially fatal haemorrhagic fever.',
    color: '#FF4D6D',
    gradientFrom: '#FF4D6D',
    gradientTo: '#FFD60A',
  },
  {
    id: 'malaria',
    name: 'Malaria',
    stat: '5M+',
    statLabel: 'Cases in India annually',
    description:
      'Plasmodium parasites transmitted by female Anopheles mosquitoes cause cyclic fever, chills, and sweats. Without timely treatment, it can be life-threatening.',
    color: '#FFD60A',
    gradientFrom: '#FFD60A',
    gradientTo: '#00F5D4',
  },
  {
    id: 'chikungunya',
    name: 'Chikungunya',
    stat: '1.3M+',
    statLabel: 'Reported cases in India',
    description:
      'Viral disease transmitted by infected Aedes mosquitoes. Causes debilitating fever and severe joint pain that can persist for months or even years after infection.',
    color: '#00F5D4',
    gradientFrom: '#00F5D4',
    gradientTo: '#FF4D6D',
  },
]

// ── Comparison data ────────────────────────────────────────
export const COMPARISON_DATA = [
  {
    id: 'chemicals',
    criteria: 'Chemical Usage',
    others: 'Toxic sprays & fumes',
    moscure: '100% Chemical Free',
  },
  {
    id: 'coverage',
    criteria: 'Coverage Area',
    others: 'Limited to ~150 sq ft',
    moscure: 'Up to 300 sq mt',
  },
  {
    id: 'children',
    criteria: 'Safe for Children',
    others: 'Harmful if inhaled',
    moscure: 'Completely Safe',
  },
  {
    id: 'noise',
    criteria: 'Noise Level',
    others: 'Buzzing & hissing',
    moscure: 'Silent Operation',
  },
  {
    id: 'maintenance',
    criteria: 'Maintenance',
    others: 'Daily refills required',
    moscure: 'Easy 60-sec tray clean',
  },
  {
    id: 'technology',
    criteria: 'Technology',
    others: 'Outdated coil & heat',
    moscure: 'Patented UV LED Science',
  },
  {
    id: 'pets',
    criteria: 'Safe for Pets',
    others: 'Dangerous to animals',
    moscure: 'Completely Pet Safe',
  },
]

// ── Features data ──────────────────────────────────────────
export const FEATURES_DATA = [
  {
    id: 'uv-led',
    icon: 'Zap',
    title: 'UV LED Technology',
    description:
      'Patented UV-A spectrum light irresistible to mosquitoes — mimics human body heat and CO₂ signals to lure every last one into the trap.',
    gradient: 'gradient-pink-yellow',
    gradientFrom: '#FF4D6D',
    gradientTo: '#FFD60A',
  },
  {
    id: 'suction',
    icon: 'Wind',
    title: '360° Silent Suction',
    description:
      'Powerful yet whisper-quiet fan creates an inescapable vortex. Mosquitoes dehydrate naturally in the removable collection tray — no mess.',
    gradient: 'gradient-yellow-cyan',
    gradientFrom: '#FFD60A',
    gradientTo: '#00F5D4',
  },
  {
    id: 'chemical-free',
    icon: 'Shield',
    title: 'Zero Chemicals',
    description:
      'No sprays, no coils, no toxic fumes. Safe to run all night near sleeping babies, pregnant women, elderly and pets. Peace of mind included.',
    gradient: 'gradient-cyan-pink',
    gradientFrom: '#00F5D4',
    gradientTo: '#FF4D6D',
  },
  {
    id: 'easy-clean',
    icon: 'Droplets',
    title: 'Effortless Cleaning',
    description:
      'Removable catch tray empties in seconds. A full month of protection with just one 60-second clean. Designed for real Indian households.',
    gradient: 'gradient-pink-yellow',
    gradientFrom: '#FF4D6D',
    gradientTo: '#FFD60A',
  },
]

// ── Brand values ticker ────────────────────────────────────
export const BRAND_VALUES = [
  'Chemical Free',
  'Safe for Kids',
  'Scientifically Proven',
  'Eco Friendly',
  'Silent Operation',
  '360° Coverage',
  'Sleep In Peace',
  'No More Buzzing',
  'UV LED Technology',
  'Family Safe',
  'Dengue Defense',
  'Malaria Free Zone',
  'Pet Friendly',
  'No Refills Needed',
]

// ── Products data ──────────────────────────────────────────
export const PRODUCTS_DATA = [
  {
    id: 'indoor',
    badge: 'INDOOR',
    accentColor: '#00F5D4',
    accentClass: 'text-gradientcyan',
    accentBorder: 'border-gradientcyan/40',
    accentBg: 'bg-gradientcyan/10',
    name: 'MOSCURE IPI 1',
    model: 'MC-IPI 1',
    description:
      'Scientifically engineered UV LED trap for indoor spaces. Silent, chemical-free, and proven effective against all major disease-carrying mosquito species.',
    price: '₹3,299',
    priceLabel: 'INR',
    imageFile: 'product-indoor',
    imageLabel: '[ MC-IPI 1 Image ]',
    specs: [
      { label: 'Coverage', value: '375 sq ft' },
      { label: 'UV Wavelength', value: '365 nm (UV-A)' },
      { label: 'Power', value: 'DC 5V / 0.3A — 1.5W' },
      { label: 'Dimensions', value: '11.9 × 11.9 × 17.8 cm' },
      { label: 'Weight', value: '280 g' },
      { label: 'Child & Pet Safe', value: 'Yes — Certified' },
    ],
    fullDescription:
      "The MOSCURE IPI 1 (MC-IPI 1) is India's most advanced indoor mosquito trap. Using patented 365 nm UV-A LED technology, it silently lures and captures all major disease-carrying mosquito species. Odour-free and 100% chemical-free — safe for kids, pets, and the whole family.",
  },
  {
    id: 'outdoor',
    badge: 'OUTDOOR',
    accentColor: '#FFD60A',
    accentClass: 'text-gradientyellow',
    accentBorder: 'border-gradientyellow/40',
    accentBg: 'bg-gradientyellow/10',
    name: 'Moscure IPO',
    model: 'MC-IPO Unit',
    description:
      'Heavy-duty UV LED mosquito trap built for outdoor environments. Weatherproof design protects your garden, patio, and open spaces around the clock.',
    price: '₹21,599',
    priceLabel: 'INR',
    imageFile: 'product-outdoor',
    imageLabel: '[ IPO Unit Image ]',
    specs: [
      { label: 'Coverage', value: '3230 sq ft' },
      { label: 'UV Wavelength', value: '365 nm (UV-A)' },
      { label: 'Power', value: '9W (Energy-Efficient)' },
      { label: 'Dimensions', value: '11.9 × 11.9 × 17.8 cm' },
      { label: 'Weight', value: '280 g' },
      { label: 'Water Resistant', value: 'Yes' },
    ],
    fullDescription:
      'The Moscure IPO Unit is purpose-built for outdoor protection. 365 nm UV-A LED technology lures all major mosquito species into the trap — no chemicals, no odour. Water-resistant construction with included hanging mount lets you deploy it in gardens, balconies, and patios for up to 300 m² of coverage. Energy-efficient at just 9W.',
  },
]

// ── Product-page stats ─────────────────────────────────────
export const STATS_DATA = [
  { id: 's1', stat: 100, suffix: '%', label: 'Lab Tested',           accent: 'gradientcyan'   },
  { id: 's2', stat: 95,  suffix: '%', label: 'Catch Rate',           accent: 'gradientyellow' },
  { id: 's3', stat: 300, suffix: '+', label: 'sq. m Coverage',       accent: 'gradientpink'   },
  { id: 's4', stat: 24,  suffix: '/7', label: 'Non-Stop Protection', accent: 'gradientcyan'   },
]

// ── Product features ───────────────────────────────────────
export const PRODUCT_FEATURES = [
  {
    id: 'lure',
    icon: 'Target',
    title: 'Targeted Mosquito Lure System',
    description:
      'Patented UV-A LED spectrum mimics human CO₂ and body heat — the exact signals that attract disease-carrying mosquitoes into the trap.',
    gradient: 'gradient-pink-yellow',
    gradientFrom: '#FF4D6D',
    gradientTo: '#FFD60A',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'Attracts every species',
  },
  {
    id: 'suction',
    icon: 'Wind',
    title: '360° Vortex Suction',
    description:
      'High-efficiency fan creates a powerful inescapable updraft. Once inside, mosquitoes dehydrate naturally in the sealed collection chamber.',
    gradient: 'gradient-yellow-cyan',
    gradientFrom: '#FFD60A',
    gradientTo: '#00F5D4',
    tags: ['Indoor', 'Outdoor'],
    tagline: 'No escape mechanism',
  },
  {
    id: 'chemical-free',
    icon: 'Shield',
    title: 'Zero Chemical Formula',
    description:
      'No sprays, no coils, no toxic fumes. Safe to operate continuously near infants, pregnant women, the elderly, and pets.',
    gradient: 'gradient-cyan-pink',
    gradientFrom: '#00F5D4',
    gradientTo: '#FF4D6D',
    tags: ['Indoor'],
    tagline: 'Hospital-grade safety',
  },
  {
    id: 'silent',
    icon: 'Volume2',
    title: 'Ultra-Silent Operation',
    description:
      'Below 30 dB — quieter than a whisper. Run it all night in bedrooms and nurseries without any disturbance to sleep.',
    gradient: 'gradient-pink-yellow',
    gradientFrom: '#FF4D6D',
    gradientTo: '#FFD60A',
    tags: ['Indoor'],
    tagline: 'Sleep undisturbed',
  },
  {
    id: 'weatherproof',
    icon: 'CloudRain',
    title: 'IPX4 Weatherproof Build',
    description:
      'Splash-resistant, dust-proof outdoor housing. Engineered to withstand Indian monsoon conditions — rain, humidity, and temperature extremes.',
    gradient: 'gradient-yellow-cyan',
    gradientFrom: '#FFD60A',
    gradientTo: '#00F5D4',
    tags: ['Outdoor'],
    tagline: 'Monsoon-ready',
  },
  {
    id: 'easy-clean',
    icon: 'Droplets',
    title: 'Effortless Maintenance',
    description:
      'Tool-free removable tray empties in 60 seconds. A full month of protection with minimal upkeep — designed for real Indian households.',
    gradient: 'gradient-cyan-pink',
    gradientFrom: '#00F5D4',
    gradientTo: '#FF4D6D',
    tags: ['Indoor', 'Outdoor'],
    tagline: '60-sec clean cycle',
  },
]

// ── How it works ───────────────────────────────────────────
export const HOW_IT_WORKS = [
  {
    id: 'attract',
    step: '01',
    title: 'ATTRACT',
    icon: 'Target',
    accentColor: '#FF4D6D',
    description:
      "The UV-A LED emits light at 365 nm — precisely tuned to the mosquito's visual receptors. Combined with subtle thermal emission, every nearby mosquito is drawn irresistibly toward the device.",
  },
  {
    id: 'capture',
    step: '02',
    title: 'CAPTURE',
    icon: 'Wind',
    accentColor: '#FFD60A',
    description:
      "As mosquitoes approach the light source, the 360° vortex fan creates a powerful suction field. The airflow is engineered to be undetectable by the mosquito until it's too late to escape.",
  },
  {
    id: 'eliminate',
    step: '03',
    title: 'ELIMINATE',
    icon: 'CheckCircle2',
    accentColor: '#00F5D4',
    description:
      'Trapped mosquitoes are held in the sealed collection chamber where they dehydrate naturally — no zapping, no chemicals, no mess. Empty the tray once a month and repeat.',
  },
]
