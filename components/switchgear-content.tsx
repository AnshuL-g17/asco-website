"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { SwitchgearCatalog } from "@/components/switchgear-catalog"
import { ArrowLeft, Zap } from 'lucide-react'

interface SwitchgearContentProps {
  onReset: () => void
}

export default function SwitchgearContent({ onReset }: SwitchgearContentProps) {
  const searchParams = useSearchParams()
  const productFilter = searchParams.get("product")
  const router = useRouter()

  const handleBackToProducts = () => {
    onReset()
    router.push("/products")
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <Navigation selectedCategory="switchgear" />

      {/* Header */}
      <div className="bg-slate-700 border-b border-slate-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToProducts} className="text-white hover:text-white hover:bg-slate-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
              <div className="h-6 w-px bg-slate-500" />
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Switchgear Products</h1>
                  <p className="text-slate-300 text-sm">Professional electrical protection solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <SwitchgearCatalog initialProductFilter={productFilter} />
      </div>
    </div>
  )
}
