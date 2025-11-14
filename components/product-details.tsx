"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShoppingCart, Share2 } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"
import type { Product } from "@/lib/products"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("")
  const categoryColor = product.category === "switchgear" ? "bg-primary" : "bg-secondary"
  const addItem = useInquiryCart((state) => state.addItem)

  useEffect(() => {
    setQuantity(1)
    setSelectedVariant("")
  }, [product.id])

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleRequestQuote = () => {
    if (!selectedVariant) {
      alert("Please select an amperage/wattage option first")
      return
    }

    const productWithVariant = {
      ...product,
      name: `${product.name} (${selectedVariant})`,
      selectedVariant: selectedVariant,
    }

    addItem(productWithVariant, quantity, `Selected: ${selectedVariant}`)

    if (typeof window !== "undefined") {
      const event = new CustomEvent("cart-updated", {
        detail: { message: `${product.name} with ${selectedVariant} added to inquiry cart` },
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
            <Badge className={`absolute top-4 left-4 ${categoryColor} text-white capitalize`}>{product.category}</Badge>
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.subcategory}
            </Badge>
            <h1 className="text-3xl font-bold mb-4 text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="w-24"
            />
          </div>

          {(product.category === "switchgear" || product.category === "lighting") && (
            <div className="space-y-2">
              <Label htmlFor="variant">{product.category === "switchgear" ? "Amperage" : "Wattage"}</Label>
              <select
                id="variant"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select {product.category === "switchgear" ? "amperage" : "wattage"}</option>
                {product.category === "switchgear" &&
                  product.specifications.amperage &&
                  product.specifications.amperage.map((amp: string) => (
                    <option key={amp} value={amp}>
                      {amp}
                    </option>
                  ))}
                {product.category === "lighting" &&
                  product.specifications.wattage &&
                  product.specifications.wattage.map((watt: string) => (
                    <option key={watt} value={watt}>
                      {watt}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" disabled={!product.inStock} onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Inquiry Cart
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleRequestQuote}
                disabled={!product.inStock}
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features & Benefits</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Features & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{feature}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Advanced {feature.toLowerCase()} technology for optimal performance and reliability.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.category === "switchgear" ? (
                    <>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Industrial Applications</h4>
                        <p className="text-sm text-muted-foreground">
                          Manufacturing plants, steel mills, chemical processing facilities
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Commercial Buildings</h4>
                        <p className="text-sm text-muted-foreground">
                          Office complexes, shopping malls, hospitals, educational institutions
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Infrastructure</h4>
                        <p className="text-sm text-muted-foreground">
                          Power substations, data centers, telecommunications facilities
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Utilities</h4>
                        <p className="text-sm text-muted-foreground">
                          Power generation plants, distribution networks, renewable energy
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Industrial Facilities</h4>
                        <p className="text-sm text-muted-foreground">
                          Warehouses, manufacturing plants, logistics centers
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Commercial Spaces</h4>
                        <p className="text-sm text-muted-foreground">Offices, retail stores, restaurants, hotels</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Outdoor Applications</h4>
                        <p className="text-sm text-muted-foreground">
                          Street lighting, parking lots, building facades, landscapes
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Specialized Areas</h4>
                        <p className="text-sm text-muted-foreground">
                          Clean rooms, sports facilities, emergency lighting systems
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
