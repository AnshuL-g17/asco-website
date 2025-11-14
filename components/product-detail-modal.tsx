"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Mail, Star, Shield, Zap, Award, CheckCircle, Phone, MapPin, Clock } from "lucide-react"
import type { SwitchgearProduct } from "@/lib/switchgear-products"
import type { LightingProduct } from "@/lib/lighting-products"
import { useInquiryCart } from "@/lib/inquiry-cart"

interface ProductDetailModalProps {
  product: SwitchgearProduct | LightingProduct | null
  isOpen: boolean
  onClose: () => void
  productType: "switchgear" | "lighting"
}

export function ProductDetailModal({ product, isOpen, onClose, productType }: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const addItem = useInquiryCart((state) => state.addItem)

  useEffect(() => {
    if (product && isOpen) {
      setSelectedVariant("")
      setQuantity(1)
      setShowQuoteForm(false)
    }
  }, [product, isOpen])

  if (!product) return null

  const isSwitchgear = productType === "switchgear"
  const variants = isSwitchgear
    ? (product as SwitchgearProduct).specifications.amperage
    : (product as LightingProduct).specifications.wattage

  const getPriceForVariant = (variant: string) => {
    if (!variant) return Math.min(...Object.values(product.pricing))

    // First try direct match
    if (product.pricing[variant]) {
      return product.pricing[variant]
    }

    // For switchgear products, handle range-based pricing
    if (isSwitchgear) {
      const numericValue = Number.parseFloat(variant.replace("A", ""))

      // Check each pricing key to see if the variant falls within its range
      for (const [priceKey, price] of Object.entries(product.pricing)) {
        if (priceKey.includes("-")) {
          // Handle range keys like "0.5-5A", "6-32A"
          const rangeMatch = priceKey.match(/^([\d.]+)-([\d.]+)A?$/)
          if (rangeMatch) {
            const min = Number.parseFloat(rangeMatch[1])
            const max = Number.parseFloat(rangeMatch[2])
            if (numericValue >= min && numericValue <= max) {
              return price
            }
          }
        } else if (priceKey.includes(variant)) {
          // Handle complex keys like "16A-240V", "25A-30mA"
          return price
        } else if (priceKey === variant.replace("A", "") + "A") {
          // Handle direct amperage match
          return price
        }
      }
    }

    // For lighting products or fallback
    return Math.min(...Object.values(product.pricing))
  }

  const selectedPrice = getPriceForVariant(selectedVariant)
  const totalPrice = selectedPrice * quantity

  const getVariantOptions = () => {
    return variants.map((variant) => {
      const price = getPriceForVariant(variant)
      return {
        value: variant,
        label: `${variant} - ₹${price.toLocaleString()}`,
        price: price,
      }
    })
  }

  const themeClasses = isSwitchgear
    ? {
        bg: "bg-slate-900",
        cardBg: "bg-slate-800",
        border: "border-slate-700",
        text: "text-white",
        textMuted: "text-slate-300",
        textAccent: "text-cyan-400",
        button: "bg-cyan-600 hover:bg-cyan-700",
        buttonOutline: "border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white",
        badge: "bg-cyan-900 text-cyan-300",
      }
    : {
        bg: "bg-orange-50",
        cardBg: "bg-white",
        border: "border-orange-200",
        text: "text-slate-800",
        textMuted: "text-slate-600",
        textAccent: "text-orange-600",
        button: "bg-orange-600 hover:bg-orange-700",
        buttonOutline: "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white",
        badge: "bg-orange-100 text-orange-700",
      }

  const handleRequestQuote = () => {
    if (!selectedVariant) {
      alert("Please select an amperage/wattage option first")
      return
    }

    // Create a modified product with selected variant info
    const productWithVariant = {
      ...product,
      name: `${product.name} (${selectedVariant})`,
      selectedVariant: selectedVariant,
      id: `${product.id}-${selectedVariant}`, // Unique ID for cart
      category: productType,
      description: product.description,
      specifications: product.specifications,
      pricing: product.pricing,
      inStock: true,
    }

    addItem(productWithVariant, quantity, `Selected: ${selectedVariant}`, selectedPrice)

    // Show success feedback and close modal
    if (typeof window !== "undefined") {
      const event = new CustomEvent("cart-updated", {
        detail: { message: `${product.name} with ${selectedVariant} added to inquiry cart` },
      })
      window.dispatchEvent(event)
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-[98vw] sm:w-[95vw] max-w-[1400px] h-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-3 sm:p-6 ${themeClasses.bg} ${themeClasses.border}`}
      >
        <DialogHeader className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
            <div className="flex-1 min-w-0 w-full">
              <DialogTitle className={`text-lg sm:text-2xl ${themeClasses.text} break-words`}>
                {product.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge className={`${themeClasses.badge} text-xs`}>{product.category}</Badge>
                <Badge variant="outline" className={`${themeClasses.border} ${themeClasses.textMuted} text-xs`}>
                  Model: {product.id}
                </Badge>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
              <div className={`text-2xl sm:text-3xl font-bold ${themeClasses.textAccent}`}>
                ₹{selectedPrice.toLocaleString()}
              </div>
              <div className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>{selectedVariant || "Base price"}</div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 mt-3 sm:mt-6">
          {/* Product Image Section */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <Card className={`${themeClasses.cardBg} ${themeClasses.border} overflow-hidden`}>
              <div className="relative w-full">
                {product.image ? (
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-auto object-contain p-2 sm:p-4"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 sm:h-64">
                    <div className={`text-center ${themeClasses.textMuted}`}>
                      <div className="text-3xl sm:text-4xl mb-2">{getCategoryIcon(product.category)}</div>
                      <div className="text-xs sm:text-sm">Product Image</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
              <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className={themeClasses.textMuted}>Category</span>
                  <span className={`${themeClasses.text} font-medium`}>{product.category}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className={themeClasses.textMuted}>Model</span>
                  <span className={`${themeClasses.text} font-medium break-all`}>{product.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className={themeClasses.textMuted}>Availability</span>
                  <Badge className="bg-green-600 text-white text-xs">In Stock</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Updated column span */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                <TabsList
                  className={`grid w-full min-w-max sm:min-w-0 grid-cols-4 ${themeClasses.cardBg} ${themeClasses.border}`}
                >
                  <TabsTrigger
                    value="overview"
                    className={`text-xs sm:text-sm ${themeClasses.text} data-[state=active]:${themeClasses.textAccent} data-[state=active]:bg-opacity-20 px-2 sm:px-4`}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className={`text-xs sm:text-sm ${themeClasses.text} data-[state=active]:${themeClasses.textAccent} data-[state=active]:bg-opacity-20 px-2 sm:px-4`}
                  >
                    Specs
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className={`text-xs sm:text-sm ${themeClasses.text} data-[state=active]:${themeClasses.textAccent} data-[state=active]:bg-opacity-20 px-2 sm:px-4`}
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className={`text-xs sm:text-sm ${themeClasses.text} data-[state=active]:${themeClasses.textAccent} data-[state=active]:bg-opacity-20 px-2 sm:px-4`}
                  >
                    Support
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className={`flex items-center gap-2 ${themeClasses.text} text-base sm:text-lg`}>
                      <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                      Product Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
                    <p className={`${themeClasses.textMuted} leading-relaxed text-sm sm:text-base`}>
                      {product.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Voltage</div>
                        <div className={`${themeClasses.textMuted} text-sm sm:text-base`}>
                          {product.specifications.voltage || "Various"}
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                          {isSwitchgear ? "Amperage Range" : "Wattage Range"}
                        </div>
                        <div className={`${themeClasses.textMuted} text-sm sm:text-base break-words`}>
                          {variants.join(", ")}
                        </div>
                      </div>
                    </div>

                    {isSwitchgear && (product as SwitchgearProduct).specifications.breakingCapacity && (
                      <div className="space-y-1 sm:space-y-2">
                        <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Breaking Capacity</div>
                        <div className={`${themeClasses.textMuted} text-sm sm:text-base`}>
                          {(product as SwitchgearProduct).specifications.breakingCapacity}
                        </div>
                      </div>
                    )}

                    {!isSwitchgear && (product as LightingProduct).specifications.ledType && (
                      <div className="space-y-1 sm:space-y-2">
                        <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>LED Type</div>
                        <div className={`${themeClasses.textMuted} text-sm sm:text-base`}>
                          {(product as LightingProduct).specifications.ledType}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className={`flex items-center gap-2 ${themeClasses.text} text-base sm:text-lg`}>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                      Technical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => {
                        if (Array.isArray(value)) {
                          return (
                            <div key={key} className="space-y-1">
                              <div className={`text-xs sm:text-sm font-medium ${themeClasses.text} capitalize`}>
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                              <div className={`text-xs sm:text-sm ${themeClasses.textMuted} break-words`}>
                                {value.join(", ")}
                              </div>
                            </div>
                          )
                        } else if (value) {
                          return (
                            <div key={key} className="space-y-1">
                              <div className={`text-xs sm:text-sm font-medium ${themeClasses.text} capitalize`}>
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                              <div className={`text-xs sm:text-sm ${themeClasses.textMuted} break-words`}>
                                {value.toString()}
                              </div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className={`flex items-center gap-2 ${themeClasses.text} text-base sm:text-lg`}>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Key Features & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                    {product.specifications.features ? (
                      <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {product.specifications.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 sm:gap-3">
                            <CheckCircle
                              className={`h-3 w-3 sm:h-4 sm:w-4 mt-0.5 ${themeClasses.textAccent} flex-shrink-0`}
                            />
                            <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>
                        No specific features listed for this product.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className={`flex items-center gap-2 ${themeClasses.text} text-base sm:text-lg`}>
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                      Support & Warranty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Customer Care</span>
                        </div>
                        <div className={`text-xs sm:text-sm ${themeClasses.textMuted} ml-5 sm:ml-6 break-all`}>
                          +91-1822-232965
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Email Support</span>
                        </div>
                        <div className={`text-xs sm:text-sm ${themeClasses.textMuted} ml-5 sm:ml-6 break-all`}>
                          ascoswitchgears.inquiry@gmail.com
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Head Office</span>
                        </div>
                        <div className={`text-xs sm:text-sm ${themeClasses.textMuted} ml-5 sm:ml-6`}>
                          Patel Nagar, Kapurthala - 144601
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>Warranty</span>
                        </div>
                        <div className={`text-xs sm:text-sm ${themeClasses.textMuted} ml-5 sm:ml-6`}>
                          {isSwitchgear ? "2 Years Manufacturing Defects" : "5 Years LED Performance"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Updated column span */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Purchase Options */}
            <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className={`${themeClasses.text} text-base sm:text-lg`}>Purchase Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0 sm:pt-0">
                <div className="space-y-2 sm:space-y-3">
                  <Label className={`${themeClasses.text} text-sm sm:text-base font-medium`}>
                    {isSwitchgear ? "Amperage" : "Wattage"}
                  </Label>
                  <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                    <SelectTrigger
                      className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} h-10 sm:h-12 text-sm sm:text-base`}
                    >
                      <SelectValue placeholder={`Select ${isSwitchgear ? "amperage" : "wattage"}`} />
                    </SelectTrigger>
                    <SelectContent className={`${themeClasses.cardBg} ${themeClasses.border}`}>
                      {getVariantOptions().map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className={`${themeClasses.text} hover:${themeClasses.cardBg} focus:${themeClasses.textAccent} text-sm sm:text-base py-2 sm:py-3`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Label className={`${themeClasses.text} text-sm sm:text-base font-medium`}>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className={`${themeClasses.cardBg} ${themeClasses.border} ${themeClasses.text} h-10 sm:h-12 text-sm sm:text-base`}
                  />
                </div>

                <Separator className={themeClasses.border} />

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`${themeClasses.textMuted} text-sm sm:text-base`}>Unit Price:</span>
                    <span className={`${themeClasses.text} font-semibold text-base sm:text-lg`}>
                      ₹{selectedPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${themeClasses.textMuted} text-sm sm:text-base`}>Quantity:</span>
                    <span className={`${themeClasses.text} font-semibold text-base sm:text-lg`}>{quantity}</span>
                  </div>
                  <div
                    className={`flex justify-between items-center text-lg sm:text-xl font-bold pt-2 border-t ${themeClasses.border}`}
                  >
                    <span className={`${themeClasses.text}`}>Total:</span>
                    <span className={`${themeClasses.textAccent}`}>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 pt-2">
                  <Button
                    className={`w-full ${themeClasses.button} text-white h-10 sm:h-12 text-sm sm:text-base font-semibold`}
                    onClick={handleRequestQuote}
                    disabled={!selectedVariant}
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className={`${themeClasses.cardBg} ${themeClasses.border}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className={`${themeClasses.text} text-base sm:text-lg`}>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                    <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>ISO 9001:2015 Certified</span>
                  </div>
                  {(product.description.includes("ISI Mark") ||
                    product.category === "MCB" ||
                    product.category === "Switch Fuse Unit" ||
                    (isSwitchgear && product.name.includes("Fuse Switch Unit"))) && (
                    <div className="flex items-center gap-2">
                      <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                      <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>ISI Mark Approved</span>
                    </div>
                  )}
                  {!(
                    product.description.includes("ISI Mark") ||
                    product.category === "MCB" ||
                    product.category === "Switch Fuse Unit" ||
                    (isSwitchgear && product.name.includes("Fuse Switch Unit"))
                  ) && (
                    <div className="flex items-center gap-2">
                      <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                      <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>As per IS Standards</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                    <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>CE Certified</span>
                  </div>
                  {!isSwitchgear && (
                    <>
                      {(product.category === "Flood Light" ||
                        product.category === "Street Light" ||
                        product.category === "Bulb Light") && (
                        <div className="flex items-center gap-2">
                          <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>ISI Mark Approved</span>
                        </div>
                      )}
                      {!(
                        product.category === "Flood Light" ||
                        product.category === "Street Light" ||
                        product.category === "Bulb Light"
                      ) && (
                        <div className="flex items-center gap-2">
                          <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                          <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>As per IS Standards</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Star className={`h-3 w-3 sm:h-4 sm:w-4 ${themeClasses.textAccent}`} />
                        <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>BIS Approved (IS: 15885)</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "MCB":
    case "MCCB":
      return "⚡"
    case "Isolator":
    case "Switch Fuse Unit":
      return "🔌"
    case "RCCB/ELCB":
    case "RCBO":
      return "🛡️"
    case "Bulb Light":
    case "Tube Light":
      return "💡"
    case "Street Light":
    case "Solar Light":
      return "🌞"
    case "Flood Light":
    case "Spot Light":
      return "🔦"
    default:
      return "📦"
  }
}
