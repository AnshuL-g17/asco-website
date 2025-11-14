"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AdvancedFilters } from "@/components/advanced-filters"
import { BulkSelection } from "@/components/bulk-selection"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { switchgearProducts, switchgearCategories, type SwitchgearProduct } from "@/lib/switchgear-products"
import { Search, Zap, Shield, Settings, Power } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"
import Image from "next/image"

interface SwitchgearCatalogProps {
  onProductSelect?: (product: SwitchgearProduct) => void
  initialProductFilter?: string | null
}

export function SwitchgearCatalog({ onProductSelect, initialProductFilter }: SwitchgearCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedAmperage, setSelectedAmperage] = useState<string>("all")
  const [selectedVoltage, setSelectedVoltage] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [sortBy, setSortBy] = useState("name-asc")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<SwitchgearProduct | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const addToInquiry = useInquiryCart((state) => state.addItem)

  // Get unique amperage and voltage options
  const amperageOptions = useMemo(() => {
    const amperages = new Set<string>()
    switchgearProducts.forEach((product) => {
      product.specifications.amperage.forEach((amp) => amperages.add(amp))
    })
    return Array.from(amperages).sort((a, b) => {
      const numA = Number.parseInt(a.replace(/[^\d]/g, ""))
      const numB = Number.parseInt(b.replace(/[^\d]/g, ""))
      return numA - numB
    })
  }, [])

  const voltageOptions = useMemo(() => {
    const voltages = new Set<string>()
    switchgearProducts.forEach((product) => {
      if (product.specifications.voltage) {
        voltages.add(product.specifications.voltage)
      }
    })
    return Array.from(voltages).sort()
  }, [])

  // Get available features
  const availableFeatures = useMemo(() => {
    const features = new Set<string>()
    switchgearProducts.forEach((product) => {
      product.specifications.features?.forEach((feature) => features.add(feature))
    })
    return Array.from(features)
  }, [])

  useEffect(() => {
    if (initialProductFilter) {
      const formattedFilter = initialProductFilter.replace(/-/g, " ")

      // Convert common URL formats to proper category names
      const categoryMap: { [key: string]: string } = {
        mcb: "MCB",
        isolator: "Isolator",
        "distribution board": "Distribution Board",
        "fuse kit kat": "Fuse Kit-Kat",
        "switch fuse unit": "Switch Fuse Unit",
        "control switches": "Control Switches",
        "change over switches": "Change Over Switches",
        "rccb elcb": "RCCB/ELCB",
        mccb: "MCCB",
        rcbo: "RCBO",
      }

      const matchedCategory = categoryMap[formattedFilter.toLowerCase()]
      if (matchedCategory && switchgearCategories.includes(matchedCategory as any)) {
        setSelectedCategory(matchedCategory)
      } else {
        // Fallback to search if no exact category match
        setSearchTerm(formattedFilter)
      }
    }
  }, [initialProductFilter])

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    const filtered = switchgearProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      const matchesAmperage =
        selectedAmperage === "all" || product.specifications.amperage.some((amp) => amp.includes(selectedAmperage))

      const matchesVoltage = selectedVoltage === "all" || product.specifications.voltage?.includes(selectedVoltage)

      const minPrice = Math.min(...Object.values(product.pricing))
      const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1]

      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every((feature) => product.specifications.features?.includes(feature))

      return matchesSearch && matchesCategory && matchesAmperage && matchesVoltage && matchesPrice && matchesFeatures
    })

    // Sort products
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
        case "amperage":
          const aAmp = Number.parseInt(a.specifications.amperage[0].replace(/[^0-9]/g, ""))
          const bAmp = Number.parseInt(b.specifications.amperage[0].replace(/[^0-9]/g, ""))
          return aAmp - bAmp
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedAmperage, selectedVoltage, priceRange, sortBy, selectedFeatures])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "MCB":
        return <Zap className="h-5 w-5" />
      case "Isolator":
        return <Power className="h-5 w-5" />
      case "MCCB":
        return <Shield className="h-5 w-5" />
      case "RCCB/ELCB":
        return <Shield className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getLowestPrice = (pricing: { [key: string]: number }) => {
    return Math.min(...Object.values(pricing))
  }

  const getAmperageRange = (amperages: string[]) => {
    if (amperages.length <= 3) return amperages.join(", ")
    return `${amperages[0]} - ${amperages[amperages.length - 1]}`
  }

  const handleClearFilters = () => {
    setPriceRange([0, 100000])
    setSelectedFeatures([])
    setSortBy("name-asc")
  }

  const handleProductSelection = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleProductSelect = (product: SwitchgearProduct) => {
    setSelectedProduct(product)
    setIsDetailModalOpen(true)
    onProductSelect?.(product)
  }

  return (
    <div className="w-full space-y-6">
      {/* Bulk Selection */}
      <BulkSelection
        selectedProducts={selectedProducts}
        onSelectionChange={setSelectedProducts}
        products={filteredProducts}
        productType="switchgear"
      />

      {/* Advanced Filters */}
      <AdvancedFilters
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedFeatures={selectedFeatures}
        onFeaturesChange={setSelectedFeatures}
        availableFeatures={availableFeatures}
        onClearFilters={handleClearFilters}
        productType="switchgear"
      />

      {/* Search and Filters */}
      <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <Input
              placeholder="Search switchgear products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-600 border-slate-500 text-white placeholder:text-blue-400"
            />
          </div>
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500">
                <SelectItem value="all">All Categories</SelectItem>
                {switchgearCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAmperage} onValueChange={setSelectedAmperage}>
              <SelectTrigger className="w-32 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Amperage" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500">
                <SelectItem value="all">All Amps</SelectItem>
                {amperageOptions.map((amp) => (
                  <SelectItem key={amp} value={amp}>
                    {amp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVoltage} onValueChange={setSelectedVoltage}>
              <SelectTrigger className="w-32 bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Voltage" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600 border-slate-500">
                <SelectItem value="all">All Voltages</SelectItem>
                {voltageOptions.map((voltage) => (
                  <SelectItem key={voltage} value={voltage}>
                    {voltage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-white">
          Showing {filteredProducts.length} of {switchgearProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-slate-700 border-slate-600 hover:border-blue-400 transition-all duration-300 group"
          >
            {product.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-white">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleProductSelection(product.id, checked as boolean)}
                    className="border-slate-500"
                  />
                  {getCategoryIcon(product.category)}
                  <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">₹{getLowestPrice(product.pricing)}+</div>
                  <div className="text-xs text-slate-400">Starting from</div>
                </div>
              </div>
              <CardTitle className="text-white text-lg leading-tight group-hover:text-blue-300 transition-colors">
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Voltage:</span>
                  <span className="text-white font-medium">{product.specifications.voltage || "Various"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Amperage:</span>
                  <span className="text-white font-medium">{getAmperageRange(product.specifications.amperage)}</span>
                </div>

                {product.specifications.poles && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Poles:</span>
                    <span className="text-white font-medium">{product.specifications.poles}</span>
                  </div>
                )}

                {product.specifications.breakingCapacity && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Breaking Capacity:</span>
                    <span className="text-white font-medium">{product.specifications.breakingCapacity}</span>
                  </div>
                )}
              </div>

              {product.specifications.features && (
                <div className="space-y-2">
                  <div className="text-slate-400 text-sm">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {product.specifications.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {feature}
                      </Badge>
                    ))}
                    {product.specifications.features.length > 3 && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                        +{product.specifications.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
          <div className="text-slate-400 text-lg mb-2">No products found</div>
          <div className="text-slate-500 text-sm">Try adjusting your search criteria</div>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        productType="switchgear"
      />
    </div>
  )
}
