"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation" // Added useRouter import for navigation
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, Send } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"
import { InquiryForm } from "./inquiry-form"
import { ShoppingCart } from "lucide-react"

interface InquiryCartContentProps {
  onClose: () => void
}

export function InquiryCartContent({ onClose }: InquiryCartContentProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const router = useRouter() // Added router for navigation
  const { items, removeItem, updateQuantity, updateVariant, clearCart, updateNotes } = useInquiryCart()

  const calculateItemPrice = (item: any) => {
    // Use the actual price stored in the cart item
    if (item.product.actualPrice) {
      return item.product.actualPrice * item.quantity
    }

    // Fallback to original pricing logic if actualPrice is not available
    const productPrice = item.product.price || item.product.basePrice || item.product.pricing?.basePrice * 83
    if (productPrice) {
      return productPrice * item.quantity
    }

    // Final fallback to category-based pricing
    const basePrices: Record<string, number> = {
      "LT Panels": 125000,
      "HT Panels": 250000,
      "Control Panels": 165000,
      "Motor Control": 375000,
      "Industrial Lighting": 10000,
      "Street Lighting": 7500,
      "Office Lighting": 5000,
      "Outdoor Lighting": 6500,
    }
    return (basePrices[item.product.subcategory] || 10000) * item.quantity
  }

  const getUnitPrice = (item: any) => {
    // Use the actual price stored in the cart item
    if (item.product.actualPrice) {
      return item.product.actualPrice
    }

    // Fallback to original pricing logic if actualPrice is not available
    const productPrice = item.product.price || item.product.basePrice || item.product.pricing?.basePrice * 83
    if (productPrice) {
      return productPrice
    }

    // Final fallback to category-based pricing
    const basePrices: Record<string, number> = {
      "LT Panels": 125000,
      "HT Panels": 250000,
      "Control Panels": 165000,
      "Motor Control": 375000,
      "Industrial Lighting": 10000,
      "Street Lighting": 7500,
      "Office Lighting": 5000,
      "Outdoor Lighting": 6500,
    }
    return basePrices[item.product.subcategory] || 10000
  }

  const getProductVariants = (product: any) => {
    if (product.category === "Switchgear") {
      return ["16A", "20A", "25A", "32A", "40A", "50A", "63A", "80A", "100A", "125A"]
    } else if (product.category === "Lighting") {
      return ["20W", "30W", "40W", "50W", "60W", "80W", "100W", "120W", "150W", "200W"]
    }
    return []
  }

  const totalEstimatedPrice = items.reduce((total, item) => total + calculateItemPrice(item), 0)
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

  if (showInquiryForm) {
    return <InquiryForm onBack={() => setShowInquiryForm(false)} onClose={onClose} />
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your inquiry cart is empty</h3>
        <p className="text-muted-foreground mb-6">Add products to request quotations</p>
        <Button
          onClick={() => {
            onClose()
            router.push("/products")
          }}
        >
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
        {items.map((item) => (
          <Card key={`${item.product.id}-${item.product.selectedVariant || "default"}`}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  width={120}
                  height={120}
                  className="rounded-md object-contain bg-white border"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.product.subcategory}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        Unit Price: ₹{getUnitPrice(item).toLocaleString()} (Est.)
                      </div>
                      <div className="text-sm font-medium text-primary">
                        Total: ₹{calculateItemPrice(item).toLocaleString()} (Est.)
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id, item.product.selectedVariant)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.product.selectedVariant, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.product.id,
                          item.product.selectedVariant,
                          Number.parseInt(e.target.value) || 1,
                        )
                      }
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.product.selectedVariant, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {item.product.category === "Switchgear" ? "Amperage:" : "Wattage:"}
                    </label>
                    <div className="text-sm font-medium">
                      Selected: {item.product.selectedVariant || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-4" />

      <Card className="flex-shrink-0 mb-4 border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-base">Total Items:</span>
            <span className="font-bold text-lg">{totalQuantity}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-base">Estimated Total:</span>
            <span className="font-bold text-lg text-primary">₹{totalEstimatedPrice.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            *Prices are estimates. Final quote will be provided after inquiry.
          </p>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={clearCart} className="flex-1 bg-transparent">
              Clear Cart
            </Button>
            <Button onClick={() => setShowInquiryForm(true)} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Request Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
