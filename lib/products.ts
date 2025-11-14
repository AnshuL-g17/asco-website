export interface Product {
  id: string
  name: string
  category: "switchgear" | "lighting"
  subcategory: string
  description: string
  features: string[]
  specifications: Record<string, string>
  image: string
  price?: string
  pricing?: {
    basePrice: number
    currency: string
  }
  inStock: boolean
}

export const products: Product[] = [
  // Switchgear Products
  {
    id: "lt-panel-001",
    name: "LT Distribution Panel - 415V",
    category: "switchgear",
    subcategory: "LT Panels",
    description:
      "Heavy-duty low tension distribution panel designed for industrial applications with modular design and IP65 protection.",
    features: ["Modular Design", "IP65 Protection", "MCB/MCCB Compatible", "Bus Bar System", "Easy Maintenance"],
    specifications: {
      "Voltage Rating": "415V AC",
      "Current Rating": "630A - 4000A",
      Protection: "IP65",
      Material: "CRCA Steel",
      Certification: "IS/IEC Standards",
    },
    image: "/images/products/lt-distribution-panel.jpg",
    pricing: {
      basePrice: 1500,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "ht-panel-001",
    name: "HT Switchgear Panel - 11kV",
    category: "switchgear",
    subcategory: "HT Panels",
    description: "High tension switchgear panel with advanced protection systems and remote monitoring capabilities.",
    features: ["Arc Fault Protection", "Remote Monitoring", "SF6 Insulation", "Digital Relays", "SCADA Compatible"],
    specifications: {
      "Voltage Rating": "11kV - 33kV",
      "Current Rating": "630A - 2500A",
      Protection: "IP54",
      Insulation: "SF6 Gas",
      Standards: "IEC 62271",
    },
    image: "/images/products/ht-switchgear-panel.jpg",
    pricing: {
      basePrice: 3000,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "control-panel-001",
    name: "PLC Control Panel",
    category: "switchgear",
    subcategory: "Control Panels",
    description: "Automated control panel with PLC integration for industrial process control and monitoring.",
    features: ["PLC Integration", "HMI Interface", "Custom Programming", "Data Logging", "Alarm System"],
    specifications: {
      "PLC Type": "Siemens/Allen Bradley",
      "I/O Points": "16-128 Points",
      Communication: "Ethernet/RS485",
      Display: "7-15 inch HMI",
      "Power Supply": "24V DC",
    },
    image: "/images/products/plc-control-panel.jpg",
    pricing: {
      basePrice: 2000,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "mcc-001",
    name: "Motor Control Center",
    category: "switchgear",
    subcategory: "Motor Control",
    description: "Centralized motor control center with variable frequency drives and protection systems.",
    features: ["VFD Integration", "Soft Starters", "Protection Relays", "Energy Monitoring", "Modular Design"],
    specifications: {
      "Motor Rating": "0.5HP - 500HP",
      Control: "DOL/Star-Delta/VFD",
      Protection: "Overload/Short Circuit",
      Communication: "Modbus/Profibus",
      Enclosure: "IP54",
    },
    image: "/images/products/motor-control-center.jpg",
    pricing: {
      basePrice: 4500,
      currency: "USD",
    },
    inStock: true,
  },

  // Lighting Products
  {
    id: "led-highbay-001",
    name: "LED High Bay Light - 200W",
    category: "lighting",
    subcategory: "Industrial Lighting",
    description: "High-efficiency LED high bay light designed for warehouses and industrial facilities.",
    features: ["120lm/W Efficiency", "IP65 Rated", "Heat Dissipation", "Long Lifespan", "Instant On"],
    specifications: {
      Power: "200W",
      "Luminous Flux": "24000 lm",
      "Color Temperature": "5000K",
      "Beam Angle": "120°",
      Lifespan: "50,000 hours",
    },
    image: "/images/products/led-high-bay-light.jpg",
    pricing: {
      basePrice: 120,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "street-light-001",
    name: "Smart LED Street Light - 150W",
    category: "lighting",
    subcategory: "Street Lighting",
    description: "Smart LED street light with motion sensors and remote monitoring capabilities.",
    features: ["Motion Sensors", "Smart Controls", "Weather Resistant", "Remote Monitoring", "Energy Efficient"],
    specifications: {
      Power: "150W",
      "Luminous Flux": "18000 lm",
      "Color Temperature": "4000K",
      Protection: "IP66",
      Control: "Smart Dimming",
    },
    image: "/images/products/smart-led-street-light.jpg",
    pricing: {
      basePrice: 90,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "panel-light-001",
    name: "LED Panel Light - 40W",
    category: "lighting",
    subcategory: "Office Lighting",
    description: "Slim LED panel light perfect for office and commercial environments with flicker-free operation.",
    features: ["Edge Lit Design", "Flicker Free", "Dimmable", "Uniform Light", "Easy Installation"],
    specifications: {
      Power: "40W",
      "Luminous Flux": "4000 lm",
      "Color Temperature": "4000K/6500K",
      Dimensions: "600x600mm",
      Dimming: "0-10V/DALI",
    },
    image: "/images/products/led-panel-light.jpg",
    pricing: {
      basePrice: 60,
      currency: "USD",
    },
    inStock: true,
  },
  {
    id: "flood-light-001",
    name: "LED Flood Light - 100W",
    category: "lighting",
    subcategory: "Outdoor Lighting",
    description: "High-power LED flood light for outdoor applications with excellent heat dissipation.",
    features: ["Wide Beam Angle", "Heat Dissipation", "Weather Proof", "Long Range", "Energy Saving"],
    specifications: {
      Power: "100W",
      "Luminous Flux": "12000 lm",
      "Color Temperature": "5000K",
      "Beam Angle": "120°",
      Protection: "IP66",
    },
    image: "/images/products/led-flood-light.jpg",
    pricing: {
      basePrice: 80,
      currency: "USD",
    },
    inStock: true,
  },
]

export function getProductsByCategory(category: "switchgear" | "lighting"): Product[] {
  return products.filter((product) => product.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getSubcategories(category: "switchgear" | "lighting"): string[] {
  const categoryProducts = getProductsByCategory(category)
  return [...new Set(categoryProducts.map((product) => product.subcategory))]
}

export function searchProducts(query: string, category?: "switchgear" | "lighting"): Product[] {
  const searchProducts = category ? getProductsByCategory(category) : products

  if (!query) return searchProducts

  const lowercaseQuery = query.toLowerCase()
  return searchProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.features.some((feature) => feature.toLowerCase().includes(lowercaseQuery)) ||
      product.subcategory.toLowerCase().includes(lowercaseQuery),
  )
}
