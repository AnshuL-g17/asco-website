"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Download, X } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"

interface BulkSelectionProps {
  selectedProducts: string[]
  onSelectionChange: (productIds: string[]) => void
  products: Array<{ id: string; name: string; pricing: { [key: string]: number } }>
  productType: "switchgear" | "lighting"
}

export function BulkSelection({ selectedProducts, onSelectionChange, products, productType }: BulkSelectionProps) {
  const [showQuote, setShowQuote] = useState(false)

  const addToInquiry = useInquiryCart((state) => state.addItem)

  const selectedProductDetails = products.filter((p) => selectedProducts.includes(p.id))
  const totalEstimate = selectedProductDetails.reduce((sum, product) => {
    return sum + Math.min(...Object.values(product.pricing))
  }, 0)

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(products.map((p) => p.id))
    }
  }

  const handleClearSelection = () => {
    onSelectionChange([])
  }

  const handleRemoveProduct = (productId: string) => {
    onSelectionChange(selectedProducts.filter((id) => id !== productId))
  }

  if (selectedProducts.length === 0) return null

  return (
    <Card
      className={`sticky top-4 z-10 ${productType === "switchgear" ? "bg-slate-800 border-slate-700" : "bg-red-50 border-red-200"}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className={`text-lg flex items-center gap-2 ${productType === "switchgear" ? "text-white" : "text-slate-800"}`}
          >
            <ShoppingCart className="h-5 w-5" />
            Selected Products ({selectedProducts.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              className={
                productType === "switchgear" ? "text-blue-600 hover:text-blue-500" : "text-red-600 hover:text-red-700"
              }
            >
              {selectedProducts.length === products.length ? "Deselect All" : "Select All"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSelection}
              className={
                productType === "switchgear"
                  ? "text-slate-400 hover:text-slate-300"
                  : "text-slate-600 hover:text-slate-700"
              }
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Selected Products List */}
        <div className="max-h-32 overflow-y-auto space-y-1">
          {selectedProductDetails.map((product) => (
            <div key={product.id} className="flex items-center justify-between text-sm">
              <span className={productType === "switchgear" ? "text-slate-300" : "text-slate-700"}>{product.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${productType === "switchgear" ? "text-blue-600" : "text-red-600"}`}>
                  ₹{Math.min(...Object.values(product.pricing)).toLocaleString()}+
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveProduct(product.id)}
                  className={`h-6 w-6 p-0 ${productType === "switchgear" ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-700"}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Estimate */}
        <div
          className={`flex justify-between items-center pt-3 border-t ${productType === "switchgear" ? "border-slate-600" : "border-red-200"}`}
        >
          <span className={`font-medium ${productType === "switchgear" ? "text-slate-300" : "text-slate-700"}`}>
            Estimated Total:
          </span>
          <span className={`text-lg font-bold ${productType === "switchgear" ? "text-blue-600" : "text-red-600"}`}>
            ₹{totalEstimate.toLocaleString()}+
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={`flex-1 ${productType === "switchgear" ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"} bg-transparent`}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
