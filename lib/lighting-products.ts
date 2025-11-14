export interface LightingProduct {
  id: string
  name: string
  category: string
  description: string
  specifications: {
    voltage: string
    wattage: string[]
    ledType?: string
    powerFactor?: string
    cri?: string
    luminousFlux?: string
    beamAngle?: string
    material?: string
    colorTemperature?: string
    lifespan?: string
    ipRating?: string
    features?: string[]
  }
  pricing: {
    [wattage: string]: number
  }
  image?: string
}

export const lightingCategories = [
  "Cabinet Light",
  "Concealed Light",
  "Panel Light",
  "Downlight",
  "COB Light",
  "Spot Light",
  "Surface Panel Light",
  "Bulb Light",
  "Tube Light",
  "Flood Light",
  "Street Light",
  "Highbay Light",
  "Track Light",
  "Commercial Panel Light",
  "Strip Light",
  "Garden Light",
  "Wall Light",
  "Solar Light",
] as const

export const lightingProducts: LightingProduct[] = [
  // Cabinet Lights
  {
    id: "cabinet-light-1w-3w",
    name: "LED Cabinet Light with Sharp Focus",
    category: "Cabinet Light",
    description: "ASCO Cabinet Light with Sharp Focus available in Square/Round design",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20cabinet%20light-UPpKLJJEI0YKoYRItA5cEkyGs4uITi.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["1W", "3W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "190LM",
      beamAngle: "45°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K/6500K/RED/GREEN/BLUE",
      lifespan: "60000H",
      features: ["Sharp Focus", "Square/Round Design", "Multiple Colors", "Compact Size"],
    },
    pricing: {
      "1W": 375,
      "3W": 450,
    },
  },

  // Concealed Lights
  {
    id: "concealed-light-7w",
    name: "LED Concealed Light (Round)",
    category: "Concealed Light",
    description: "ASCO Concealed Light in Round design for recessed installation",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20concealed%20light-f0pkGnyz1548UzQxthD55Cw7IUtZse.jpg",
    specifications: {
      voltage: "90-265V 50/60Hz",
      wattage: ["7W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "590LM",
      beamAngle: "120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "60000H",
      features: ["Wide Voltage Range", "High Efficiency", "Recessed Installation"],
    },
    pricing: {
      "7W": 480,
    },
  },
  {
    id: "concealed-light-premium-9w",
    name: "LED Concealed Light (Premium Series)",
    category: "Concealed Light",
    description: "ASCO LED Concealed Light Premium Series with enhanced performance",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20concealed%20light%20premium%20series-yU4BYTTfuymTpEWMu95jDKwQMuujJn.png",
    specifications: {
      voltage: "90-265V 50/60Hz",
      wattage: ["9W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "≥105LM per LED/SMD",
      beamAngle: "120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "50000H",
      features: ["Premium Series", "High CRI", "Enhanced Performance"],
    },
    pricing: {
      "9W": 600,
    },
  },
  {
    id: "concealed-light-with-rings",
    name: "LED Concealed Light (with Interchangeable Rings)", // Updated name from "LED Concealed with Rings"
    category: "Concealed Light",
    description: "ASCO LED Concealed Light with decorative metallic rings",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20concealed%20with%20rings-92SMv8UdQidnFMsjd82XplcSx9JzgD.png",
    specifications: {
      voltage: "90-265V 50/60Hz",
      wattage: ["7W", "9W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "590LM-765LM",
      beamAngle: "120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "60000H",
      features: ["Decorative Rings", "Multiple Finishes", "Premium Design", "Recessed Installation"],
    },
    pricing: {
      "7W": 680,
      "9W": 800,
    },
  },

  // Panel Lights
  {
    id: "slim-panel-light",
    name: "LED Slim Panel Light (Square/Round)",
    category: "Panel Light",
    description: "ASCO Slim Panel Light available in Square and Round designs",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slim%20panel%20light-puacNqkpi8g0OR5Px0JB6IMBjeVsNN.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["4W", "8W", "8W-3in1", "15W", "15W-3in1", "22W", "22W-3in1"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "315LM-1890LM",
      beamAngle: "120°",
      material: "Aluminium Casting",
      colorTemperature: "4000K-6000K/3 IN 1",
      lifespan: "50000H",
      features: ["Slim Design", "Square/Round Options", "3-in-1 Color Temperature"],
    },
    pricing: {
      "4W": 550,
      "8W": 750,
      "8W-3in1": 1210,
      "15W": 1300,
      "15W-3in1": 1700,
      "22W": 1650,
      "22W-3in1": 2550,
    },
  },

  // Downlights
  {
    id: "downlight-gold-series",
    name: "LED Downlight (Gold Series)",
    category: "Downlight",
    description: "ASCO Downlight Gold Series with slim bezel and inbuilt driver",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20downlight%20gold%20series-ArrL9B41Oo2MlnlschDg59DB8DXvyu.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["4W", "8W", "15W", "22W", "24W", "30W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "540LM-1800LM",
      beamAngle: "120°",
      material: "Plastic Die-Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "60000H",
      features: ["Gold Series", "Slim Bezel", "Inbuilt Driver", "Round/Square Options"],
    },
    pricing: {
      "4W": 550,
      "8W": 850,
      "15W": 1350,
      "22W": 1800,
      "24W": 2100,
      "30W": 2550,
    },
  },

  // COB Lights
  {
    id: "cob-light-flexiangle",
    name: "LED COB Light with FlexiAngle Technology",
    category: "COB Light",
    description: "ASCO COB Light with FlexiAngle Technology in Round/Square design",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20cob%20light-TrNjkmbLQgdcoXIEejwvDTivuGruNF.png",
    specifications: {
      voltage: "90-265V 50/60Hz",
      wattage: ["3W", "6W", "12W", "18W", "24W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "≥150LM",
      beamAngle: "45°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "60000H",
      features: ["FlexiAngle Technology", "COB LED", "Adjustable Beam", "Premium Quality"],
    },
    pricing: {
      "3W": 825,
      "6W": 1275,
      "12W": 1950,
      "18W": 2700,
      "24W": 3900,
    },
  },

  // Spot Lights
  {
    id: "cob-spot-light-zoom",
    name: "LED COB Spot Light (ZOOM) Multi Angle",
    category: "Spot Light",
    description: "ASCO COB Spot Light with ZOOM feature and multi-angle adjustment",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20cob%20spot%20light-3SmpMndDQNNjb4W7cLf3IiBS3LKSGc.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["40W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "3500LM",
      beamAngle: "120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3500K/4000K/6000K (All in One)",
      lifespan: "50000H",
      features: ["ZOOM Function", "Multi Angle", "3 Colors in 1", "High Power"],
    },
    pricing: {
      "40W": 6200,
    },
  },

  // Surface Panel Lights
  {
    id: "surface-panel-light",
    name: "LED Surface Panel Light (Square/Round)",
    category: "Surface Panel Light",
    description: "ASCO Surface Panel Light for surface mounting applications",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20surface%20panel%20light-mGYpqoDrrreESMJZPDL5WWmvNUGRWG.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["8W", "15W", "22W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "630LM-1890LM",
      beamAngle: "120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "4000K-6000K",
      lifespan: "50000H",
      features: ["Surface Mounting", "Square/Round Options", "High Efficiency"],
    },
    pricing: {
      "8W": 900,
      "15W": 1425,
      "22W": 2025,
    },
  },

  // Bulb Lights
  {
    id: "led-bulb-light",
    name: "LED Bulb Light (B-12 & E-27)",
    category: "Bulb Light",
    description: "ASCO LED Bulb Light with striplight in various wattages",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20bulb%20light-TKAUSVxZMJKqT8VgguyjsrKS1tBH1Q.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["5W", "7W", "9W", "12W", "15W", "26W", "35W", "45W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM",
      beamAngle: "120°",
      material: "Plastic Die-Casting",
      colorTemperature: "3500K/6500K",
      lifespan: "50000H",
      features: ["B-12 & E-27 Base", "With Striplight", "Energy Efficient"],
    },
    pricing: {
      "5W": 160,
      "7W": 200,
      "9W": 320,
      "12W": 430,
      "15W": 850,
      "26W": 1050,
      "35W": 1250,
      "45W": 1500,
    },
  },

  // Tube Lights
  {
    id: "led-tube-light",
    name: "LED Tube Light with Striplight",
    category: "Tube Light",
    description: "ASCO LED Tube Light with integrated striplight",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20tube%20light-UmBvhY38SmqrK2og97VFWVfITMzq06.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["9W", "20W", "24W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1260LM",
      beamAngle: "120°",
      material: "Die-Casting Plastic",
      colorTemperature: "3500K/6500K",
      lifespan: "50000H",
      features: ["With Striplight", "Linear Design", "Easy Installation"],
    },
    pricing: {
      "9W": 600,
      "20W": 900,
      "24W": 1000,
    },
  },
  {
    id: "led-inverter-tube-light",
    name: "LED Inverter Tube Light with Striplight",
    category: "Tube Light",
    description: "ASCO LED Inverter Tube Light with battery backup",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20inverter%20tube%20light-XrfiuKTl7pBt7CUKEJzTEsQQMA4DJC.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["9W", "24W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1260LM",
      beamAngle: "120°",
      material: "Die-Casting Plastic",
      colorTemperature: "3500K/6500K",
      lifespan: "50000H",
      features: ["Battery Backup", "1500-3500 mAH Battery", "Emergency Function"],
    },
    pricing: {
      "9W": 1600,
      "24W": 2400,
    },
  },

  // Flood Lights
  {
    id: "led-flood-light",
    name: "LED Flood Light with Broad Beam",
    category: "Flood Light",
    description: "ASCO LED Flood Light with broad beam for outdoor applications",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20flood%20light-NgHXc81dBN1TL0RUA9ibfizeVkPjXr.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["60W", "120W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "100-110LM per watt",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K/6500K/R/G/B",
      lifespan: "70000H",
      ipRating: "IP55/65",
      features: ["Broad Beam", "Pole Mounting", "Weather Resistant", "RGB Options"],
    },
    pricing: {
      "60W": 4200,
      "120W": 8100,
    },
  },
  {
    id: "led-flood-light-premium",
    name: "LED Flood Light (Premium Series)",
    category: "Flood Light",
    description: "ASCO LED Flood Light Premium Series with remote control provision",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20flood%20light%20premium%20series-LJJ9p0WokXWOwn4iY1yp0FQc4KVwCo.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["20W", "35W", "60W", "120W", "150W", "200W", "300W", "400W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "130-140LM per watt",
      material: "Aluminium Die-Casting",
      colorTemperature: "3000K/6500K/RGB",
      lifespan: "70000H",
      ipRating: "IP55/65",
      features: ["Premium Series", "Remote Control (RGB)", "High Efficiency", "Multiple Wattages"],
    },
    pricing: {
      "20W": 2850,
      "35W": 3270,
      "60W": 4800,
      "120W": 9000,
      "150W": 13200,
      "200W": 17400,
      "300W": 30000,
      "400W": 42000,
    },
  },

  // Street Lights
  {
    id: "led-street-light",
    name: "LED Street Light with SMD & Power Lens",
    category: "Street Light",
    description: "ASCO Street Light with SMD technology and power lens",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20street%20light-LnMoYOSgbiFGbU315cC6eHMg31dLDQ.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["18W", "24W", "36W", "50W", "60W", "70W", "80W", "90W", "100W", "120W", "200W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "90-110LM per watt",
      beamAngle: "45°-120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3500K-6500K",
      lifespan: "60000H",
      ipRating: "IP55/65",
      features: ["SMD Technology", "Power Lens", "Pole Mounting", "Weather Resistant"],
    },
    pricing: {
      "18W": 3000,
      "24W": 3300,
      "36W": 4200,
      "50W": 4900,
      "60W": 5400,
      "70W": 6000,
      "80W": 7000,
      "90W": 8200,
      "100W": 9100,
      "120W": 11700,
      "200W": 18000,
    },
  },
  {
    id: "led-inverter-street-light",
    name: "LED Inverter Street Light",
    category: "Street Light",
    description: "ASCO LED Inverter Street Light with battery backup",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20inverter%20street%20light-bCx3yZBhMQ19ne3Rp3NDmynmCDNBuV.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["24W", "45W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "90-110LM per watt",
      beamAngle: "45°-120°",
      material: "Aluminium Die-Casting",
      colorTemperature: "3500K-6500K",
      lifespan: "60000H",
      ipRating: "IP55/65",
      features: ["Battery Backup", "4-6 Hrs Charge", "10-12 Hrs Discharge", "Emergency Function"],
    },
    pricing: {
      "24W": 4500,
      "45W": 7000,
    },
  },

  // Solar Street Lights
  {
    id: "led-solar-street-light",
    name: "LED Solar Street Light with SMD & Power Lens",
    category: "Solar Light",
    description: "ASCO Solar Street Light with all-in-one integrated solar system",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20solar%20street%20light-hqu1FSbyVswmWjZkpIxy7p9Z2Fz3Oj.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["30W", "60W", "100W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1500LM",
      beamAngle: "120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "6500K",
      lifespan: "50000H",
      ipRating: "IP65",
      features: ["All-in-One Integrated", "Daylight Sensor", "Sunset Auto Start", "Li-ion Battery"],
    },
    pricing: {
      "30W": 8400,
      "60W": 12500,
      "100W": 16600,
    },
  },
  {
    id: "led-solar-street-light-semi",
    name: "LED Solar Street Light (Semi Integrated)",
    category: "Solar Light",
    description: "ASCO Solar Street Light semi-integrated system with high capacity battery",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20solar%20street%20light%20semi%20integrated-w1zTzVZJG9i9ktiKVCWtzL3D0l2FVP.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["120W", "150W", "200W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1500LM",
      beamAngle: "120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "6500K",
      lifespan: "50000H",
      ipRating: "IP65",
      features: ["Semi Integrated", "High Capacity Battery", "25-60 AH Battery", "Professional Grade"],
    },
    pricing: {
      "120W": 27200,
      "150W": 34000,
      "200W": 39200,
    },
  },

  // Highbay Lights
  {
    id: "led-highbay-light",
    name: "LED Highbay Light with Ultra Wide Beam",
    category: "Highbay Light",
    description: "ASCO Highbay Light with ultra wide beam for industrial applications",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20highbay%20light-cYwhz7pXmiRNnGyXemMPkWIYsC5bdh.png",
    specifications: {
      voltage: "90-305V AC",
      wattage: ["60W", "120W", "165W", "240W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "≥110LM per watt",
      beamAngle: "120°",
      material: "Aluminium Die Casting",
      colorTemperature: "3000K-6500K",
      lifespan: "60000H",
      features: ["Ultra Wide Beam", "Hanging Mount", "Industrial Grade", "High Bay Application"],
    },
    pricing: {
      "60W": 5400,
      "120W": 10800,
      "165W": 14850,
      "240W": 19650,
    },
  },

  // Track Lights
  {
    id: "cob-track-light",
    name: "LED COB Track Light with Starlight",
    category: "Track Light",
    description: "ASCO COB Track Light with starlight feature",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20cob%20track%20light-EpAaqqAGlE21RoDeDxf9H3aG61O1Yg.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["20W", "30W", "40W", "40W-3in1", "60W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "2100LM-3150LM",
      beamAngle: "85°",
      material: "Die-Casting Aluminium",
      colorTemperature: "4000K-6500K/3 IN 1",
      lifespan: "50000H",
      features: ["COB Technology", "Starlight Feature", "Track Mounting", "3-in-1 Color"],
    },
    pricing: {
      "20W": 2850,
      "30W": 3750,
      "40W": 4650,
      "40W-3in1": 6000,
      "60W": 5550,
    },
  },

  // Commercial Panel Lights
  {
    id: "commercial-panel-light",
    name: "LED Commercial Panel Light",
    category: "Commercial Panel Light",
    description: "ASCO Commercial Panel Light for office and commercial applications",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20commercial%20panel%20light-ohukYKOtDghYQXkYaEHXxWwxPmIYXy.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["24W", "36W", "48W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1260LM",
      beamAngle: "120°",
      material: "Die-Casting Plastic",
      colorTemperature: "3500K/6500K",
      lifespan: "50000H",
      features: ["Commercial Grade", "1x1, 1x2, 2x2 Sizes", "Office Applications"],
    },
    pricing: {
      "24W": 4000,
      "36W": 5000,
      "48W": 6300,
    },
  },

  // Strip Lights
  {
    id: "led-strip-light",
    name: "LED Strip Light with Starlight",
    category: "Strip Light",
    description: "ASCO LED Strip Light with starlight feature",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20strip%20light-CbBEsWXqU19jbhsuvyxcxR0BgjEAuM.png",
    specifications: {
      voltage: "DC 12V",
      wattage: ["60W-Single", "60W-Triple", "60W-Double"],
      powerFactor: "0.98",
      cri: ">80",
      luminousFlux: "≥80LM per LED",
      material: "Single/Double PCB",
      colorTemperature: "3000K/6500K/R/G/B",
      lifespan: "50000H",
      features: ["5M Roll", "Flexible", "RGB Options", "Single/Double PCB"],
    },
    pricing: {
      "60W-Single": 135,
      "60W-Triple": 210,
      "60W-Double": 660,
    },
  },

  // Garden Lights
  {
    id: "garden-spike-light",
    name: "LED Garden Spike Light with Starlight",
    category: "Garden Light",
    description: "ASCO Garden Spike Light with starlight feature",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20garden%20spike%20light-LrlyW9rOKD3hGNfQZXkpXSgPAXWCMS.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["8W", "12W"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-1260LM",
      beamAngle: "120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "3500K & RGB",
      lifespan: "50000H",
      ipRating: "IP66",
      features: ["Waterproof", "Spike Installation", "Garden Applications", "RGB Options"],
    },
    pricing: {
      "8W": 1050,
      "12W": 2250,
    },
  },
  {
    id: "underground-light",
    name: "LED Under Ground Light with Striplight",
    category: "Garden Light",
    description: "ASCO Under Ground Light with striplight feature",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20garden%20light-74gOCbb5yo0yv24jiaXdPeMGew7H9w.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["6W", "6W-RGB"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM",
      beamAngle: "120°",
      material: "Die-Casting Plastic",
      colorTemperature: "3500K/6500K/RGB",
      lifespan: "50000H",
      ipRating: "IP65",
      features: ["Underground Installation", "Waterproof", "Striplight", "RGB Options"],
    },
    pricing: {
      "6W": 3000,
      "6W-RGB": 3250,
    },
  },
  {
    id: "garden-pole-light",
    name: "LED Garden Pole Light",
    category: "Garden Light",
    description: "ASCO Garden Pole Light for outdoor lighting",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20garden%20pole%20light-f1GfVJYpXKOP2AgZKdj75f0hdyoEhy.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["6W", "6W-RGB", "6W-Round", "7W-Round", "7W-Square"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "525LM-600LM",
      beamAngle: "120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "3500K/RGB",
      lifespan: "50000H",
      features: ["Pole Mounting", "Various Designs", "Weather Resistant", "RGB Options"],
    },
    pricing: {
      "6W": 5980,
      "6W-RGB": 6750,
      "6W-Round": 13350,
      "7W-Round": 9750,
      "7W-Square": 9750,
    },
  },

  // Wall Lights
  {
    id: "led-wall-light",
    name: "LED Wall Light with Starlight",
    category: "Wall Light",
    description: "ASCO Wall Light with starlight in various configurations",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/led%20wall%20light-BsYrE6ADDDAg9aHPdEOP448auyEglW.png",
    specifications: {
      voltage: "220-240V 50/60Hz",
      wattage: ["4W-1Way", "6W-1Way", "10W-2Way", "9W-3Way", "12W-2Way", "16W-2Way"],
      powerFactor: "0.98",
      cri: ">90",
      luminousFlux: "190LM-1260LM",
      beamAngle: "45°-120°",
      material: "Die-Casting Aluminium",
      colorTemperature: "4000K/R+B+G+P",
      lifespan: "50000H",
      features: ["1-Way/2-Way/4-Way Options", "Movable Design", "Starlight Feature", "RGB Options"],
    },
    pricing: {
      "4W-1Way": 1500,
      "6W-1Way": 3070,
      "10W-2Way": 3070,
      "9W-3Way": 3900,
      "12W-2Way": 5850,
      "16W-2Way": 3600,
    },
  },
]
