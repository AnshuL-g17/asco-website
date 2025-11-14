"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ImageOff } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryColor = product.category === "switchgear" ? "bg-primary" : "bg-secondary"

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        {product.image ? (
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                    <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-sm">Image Not Available</span>
                  </div>
                `
              }
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-sm">Image Not Available</span>
          </div>
        )}
        <Badge className={`absolute top-3 left-3 ${categoryColor} text-white capitalize`}>{product.category}</Badge>
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.subcategory}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-balance">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {product.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{product.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
