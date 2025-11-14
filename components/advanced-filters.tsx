"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, X, SlidersHorizontal, ArrowUpDown } from "lucide-react"

interface AdvancedFiltersProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  sortBy: string
  onSortChange: (sort: string) => void
  selectedFeatures: string[]
  onFeaturesChange: (features: string[]) => void
  availableFeatures: string[]
  onClearFilters: () => void
  productType: "switchgear" | "lighting"
}

export function AdvancedFilters({
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  selectedFeatures,
  onFeaturesChange,
  availableFeatures,
  onClearFilters,
  productType,
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
    { value: "category", label: "Category" },
    ...(productType === "switchgear"
      ? [{ value: "amperage", label: "Amperage" }]
      : [{ value: "wattage", label: "Wattage" }]),
  ]

  const handleFeatureToggle = (feature: string) => {
    const updated = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature]
    onFeaturesChange(updated)
  }

  const maxPrice = productType === "switchgear" ? 100000 : 50000

  return (
    <Card className={`${productType === "switchgear" ? "bg-slate-800 border-slate-700" : "bg-red-50 border-red-200"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className={`text-lg flex items-center gap-2 ${productType === "switchgear" ? "text-white" : "text-slate-800"}`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={
                productType === "switchgear" ? "text-blue-600 hover:text-blue-500" : "text-red-600 hover:text-red-700"
              }
            >
              <Filter className="h-4 w-4" />
              {isExpanded ? "Less" : "More"}
            </Button>
            {(selectedFeatures.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className={
                  productType === "switchgear"
                    ? "text-slate-400 hover:text-slate-300"
                    : "text-slate-600 hover:text-slate-700"
                }
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <ArrowUpDown className={`h-4 w-4 ${productType === "switchgear" ? "text-slate-400" : "text-slate-600"}`} />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger
              className={`w-48 ${productType === "switchgear" ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-red-300 text-slate-800"}`}
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent
              className={productType === "switchgear" ? "bg-slate-700 border-slate-600" : "bg-white border-red-300"}
            >
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className={`text-sm font-medium ${productType === "switchgear" ? "text-slate-300" : "text-slate-700"}`}>
            Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </div>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={maxPrice}
            min={0}
            step={100}
            className="w-full"
          />
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-slate-600">
            {/* Feature Filters */}
            {availableFeatures.length > 0 && (
              <div className="space-y-3">
                <div
                  className={`text-sm font-medium ${productType === "switchgear" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Features & Specifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {availableFeatures.slice(0, 12).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                        className={productType === "switchgear" ? "border-slate-500" : "border-red-300"}
                      />
                      <label
                        htmlFor={feature}
                        className={`text-xs cursor-pointer ${productType === "switchgear" ? "text-slate-300" : "text-slate-600"}`}
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters */}
            {selectedFeatures.length > 0 && (
              <div className="space-y-2">
                <div
                  className={`text-sm font-medium ${productType === "switchgear" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Active Filters
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedFeatures.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className={`text-xs cursor-pointer ${
                        productType === "switchgear"
                          ? "bg-blue-900 text-blue-300 hover:bg-blue-800"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      {feature}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
