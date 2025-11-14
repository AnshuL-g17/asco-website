"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { lightingProducts, lightingCategories, type LightingProduct } from "@/lib/lighting-products"
import { Search, Lightbulb, Zap, Sun, Home, Building } from "lucide-react"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { useInquiryCart } from "@/lib/inquiry-cart"

interface LightingCatalogProps {
  onProductSelect?: (product: LightingProduct) => void
  initialProductFilter?: string | null
}

export default function LightingCatalog({ onProductSelect, initialProductFilter }: LightingCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedWattage, setSelectedWattage] = useState<string>("all")
  const [selectedVoltage, setSelectedVoltage] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [sortBy, setSortBy] = useState("name-asc")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<LightingProduct | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const addToInquiry = useInquiryCart((state) => state.addItem)

  // Get unique wattage and voltage options
  const wattageOptions = useMemo(() => {
    const wattages = new Set<string>()
    lightingProducts.forEach((product) => {
      product.specifications.wattage.forEach((watt) => wattages.add(watt))
    })
    return Array.from(wattages).sort((a, b) => {
      const numA = Number.parseInt(a.replace(/[^\d]/g, ""))
      const numB = Number.parseInt(b.replace(/[^\d]/g, ""))
      return numA - numB
    })
  }, [])

  const voltageOptions = useMemo(() => {
    const voltages = new Set<string>()
    lightingProducts.forEach((product) => {
      if (product.specifications.voltage) {
        voltages.add(product.specifications.voltage)
      }
    })
    return Array.from(voltages).sort()
  }, [])

  const availableFeatures = useMemo(() => {
    const features = new Set<string>()
    lightingProducts.forEach((product) => {
      product.specifications.features?.forEach((feature) => features.add(feature))
    })
    return Array.from(features)
  }, [])

  useEffect(() => {
    if (initialProductFilter) {
      const formattedFilter = initialProductFilter.replace(/-/g, " ")

      const categoryMap: { [key: string]: string } = {
        "cabinet light": "Cabinet Light",
        "concealed light": "Concealed Light",
        "panel light": "Panel Light",
        downlight: "Downlight",
        "cob light": "COB Light",
        "spot light": "Spot Light",
        "surface panel light": "Surface Panel Light",
        "bulb light": "Bulb Light",
        "tube light": "Tube Light",
        "flood light": "Flood Light",
        "street light": "Street Light",
        "highbay light": "Highbay Light", // Changed from "highway light" to "highbay light"
        "track light": "Track Light",
        "commercial panel light": "Commercial Panel Light",
        "strip light": "Strip Light",
        "garden light": "Garden Light",
        "wall light": "Wall Light",
        "solar light": "Solar Light",
      }

      const matchedCategory = categoryMap[formattedFilter.toLowerCase()]
      if (matchedCategory && lightingCategories.includes(matchedCategory as any)) {
        setSelectedCategory(matchedCategory)
      } else {
        // Fallback to search if no exact category match
        setSearchTerm(formattedFilter)
      }
    }
  }, [initialProductFilter])

  const filteredProducts = useMemo(() => {
    const filtered = lightingProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      const matchesWattage =
        selectedWattage === "all" || product.specifications.wattage.some((watt) => watt.includes(selectedWattage))

      const matchesVoltage = selectedVoltage === "all" || product.specifications.voltage?.includes(selectedVoltage)

      const minPrice = Math.min(...Object.values(product.pricing))
      const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1]

      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every((feature) => product.specifications.features?.includes(feature))

      return matchesSearch && matchesCategory && matchesWattage && matchesVoltage && matchesPrice && matchesFeatures
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return Math.min(...Object.values(a.pricing)) - Math.min(...Object.values(b.pricing))
        case "price-desc":
          return Math.min(...Object.values(b.pricing)) - Math.min(...Object.values(a.pricing))
        case "category":
          return a.category.localeCompare(b.category)
        case "wattage":
          const aWatt = Number.parseInt(a.specifications.wattage[0].replace(/[^0-9]/g, ""))
          const bWatt = Number.parseInt(b.specifications.wattage[0].replace(/[^0-9]/g, ""))
          return aWatt - bWatt
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedWattage, selectedVoltage, priceRange, sortBy, selectedFeatures])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Bulb Light":
      case "Tube Light":
        return <Lightbulb className="h-5 w-5" />
      case "Street Light":
      case "Solar Light":
        return <Sun className="h-5 w-5" />
      case "Garden Light":
      case "Wall Light":
        return <Home className="h-5 w-5" />
      case "Commercial Panel Light":
      case "Highbay Light": // Changed from "Highway Light" to "Highbay Light"
        return <Building className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  const getLowestPrice = (pricing: { [key: string]: number }) => {
    return Math.min(...Object.values(pricing))
  }

  const getWattageRange = (wattages: string[]) => {
    if (wattages.length <= 3) return wattages.join(", ")
    return `${wattages[0]} - ${wattages[wattages.length - 1]}`
  }

  const handleProductSelection = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleProductSelect = (product: LightingProduct) => {
    setSelectedProduct(product)
    setIsDetailModalOpen(true)
    onProductSelect?.(product)
  }

  const handleClearFilters = () => {
    setPriceRange([0, 50000])
    setSelectedFeatures([])
    setSortBy("name-asc")
  }

  return (
    <div className="w-full space-y-6">
      {selectedProducts.length > 0 && (
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-300">
          <div className="flex items-center justify-between">
            <span className="text-stone-800 font-medium">
              {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-stone-400 text-stone-700 bg-transparent">
                Compare
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedProducts([])} className="text-stone-600">
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 h-4 w-4" />
            <Input
              placeholder="Search lighting products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-stone-300 text-slate-800 placeholder:text-red-500"
            />
          </div>
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white border-stone-300 text-slate-800">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-300">
                <SelectItem value="all">All Categories</SelectItem>
                {lightingCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedWattage} onValueChange={setSelectedWattage}>
              <SelectTrigger className="w-32 bg-white border-stone-300 text-slate-800">
                <SelectValue placeholder="Wattage" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-300">
                <SelectItem value="all">All Watts</SelectItem>
                {wattageOptions.map((watt) => (
                  <SelectItem key={watt} value={watt}>
                    {watt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVoltage} onValueChange={setSelectedVoltage}>
              <SelectTrigger className="w-32 bg-white border-stone-300 text-slate-800">
                <SelectValue placeholder="Voltage" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-300">
                <SelectItem value="all">All Voltages</SelectItem>
                {voltageOptions.map((voltage) => (
                  <SelectItem key={voltage} value={voltage}>
                    {voltage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white border-stone-300 text-slate-800">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-300">
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price Low-High</SelectItem>
                <SelectItem value="price-desc">Price High-Low</SelectItem>
                <SelectItem value="wattage">Wattage</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-red-700">Price Range:</span>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-32"
            />
            <span className="text-sm text-red-700">₹{priceRange[1]}</span>
          </div>

          {availableFeatures.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-700">Features:</span>
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && !selectedFeatures.includes(value)) {
                    setSelectedFeatures([...selectedFeatures, value])
                  }
                }}
              >
                <SelectTrigger className="w-40 bg-white border-stone-300 text-slate-800">
                  <SelectValue placeholder="Add feature" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-300">
                  {availableFeatures.map((feature) => (
                    <SelectItem key={feature} value={feature}>
                      {feature}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(selectedFeatures.length > 0 || priceRange[1] < 50000) && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearFilters}
              className="border-red-400 text-red-700 bg-transparent"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {selectedFeatures.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFeatures.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="bg-red-200 text-red-800 cursor-pointer"
                onClick={() => setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))}
              >
                {feature} ×
              </Badge>
            ))}
          </div>
        )}

        <div className="text-sm text-red-700">
          Showing {filteredProducts.length} of {lightingProducts.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-white border-stone-200 hover:border-red-400 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <CardHeader className="pb-3">
              {product.image && (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleProductSelection(product.id, checked as boolean)}
                    className="border-red-400"
                  />
                  {getCategoryIcon(product.category)}
                  <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">₹{getLowestPrice(product.pricing)}+</div>
                  <div className="text-xs text-slate-500">Starting from</div>
                </div>
              </div>
              <CardTitle className="text-slate-800 text-lg leading-tight group-hover:text-red-600 transition-colors">
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Voltage:</span>
                  <span className="text-slate-800 font-medium">{product.specifications.voltage || "Various"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Wattage:</span>
                  <span className="text-slate-800 font-medium">{getWattageRange(product.specifications.wattage)}</span>
                </div>

                {product.specifications.ledType && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">LED Type:</span>
                    <span className="text-slate-800 font-medium">{product.specifications.ledType}</span>
                  </div>
                )}

                {product.specifications.colorTemperature && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Color Temp:</span>
                    <span className="text-slate-800 font-medium text-xs">
                      {product.specifications.colorTemperature.length > 20
                        ? `${product.specifications.colorTemperature.substring(0, 20)}...`
                        : product.specifications.colorTemperature}
                    </span>
                  </div>
                )}

                {product.specifications.lifespan && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Lifespan:</span>
                    <span className="text-slate-800 font-medium">{product.specifications.lifespan}</span>
                  </div>
                )}
              </div>

              {product.specifications.features && (
                <div className="space-y-2">
                  <div className="text-slate-500 text-sm">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {product.specifications.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-red-300 text-red-700">
                        {feature}
                      </Badge>
                    ))}
                    {product.specifications.features.length > 3 && (
                      <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                        +{product.specifications.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleProductSelect(product)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-600 text-lg mb-2">No products found</div>
          <div className="text-slate-500 text-sm">Try adjusting your search criteria</div>
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        productType="lighting"
      />
    </div>
  )
}
