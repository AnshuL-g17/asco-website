"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import LightingCatalog from "@/components/lighting-catalog"
import { ArrowLeft, Lightbulb } from 'lucide-react'

interface LightingContentProps {
  onReset: () => void
}

export default function LightingContent({ onReset }: LightingContentProps) {
  const searchParams = useSearchParams()
  const productFilter = searchParams.get("product")
  const router = useRouter()

  const handleBackToProducts = () => {
    router.push("/products")
    onReset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-red-50">
      <Navigation selectedCategory="lighting" />

      {/* Header */}
      <div className="bg-white border-b border-stone-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBackToProducts}
                className="text-slate-600 hover:text-slate-800 hover:bg-stone-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
              <div className="h-6 w-px bg-stone-200" />
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Lighting Products</h1>
                  <p className="text-slate-600 text-sm">Energy-efficient LED lighting solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <LightingCatalog initialProductFilter={productFilter} />
      </div>
    </div>
  )
}
