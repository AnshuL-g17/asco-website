"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Lightbulb, ArrowRight } from "lucide-react"
import SwitchgearContent from "@/components/switchgear-content"
import LightingContent from "@/components/lighting-content"

type CategorySelection = "switchgear" | "lighting" | null

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get("category") as CategorySelection
    if (category === "switchgear" || category === "lighting") {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const handleReset = () => {
    setSelectedCategory(null)
  }

  if (selectedCategory === "switchgear") {
    return <SwitchgearContent onReset={handleReset} />
  }

  if (selectedCategory === "lighting") {
    return <LightingContent onReset={handleReset} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Our <span className="text-primary">Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Choose your product category to explore our comprehensive range of electrical solutions
              </p>
            </div>
          </div>
        </section>

        {/* Category Selection */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors shadow-lg">
                      <Zap className="h-10 w-10 text-blue-700" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Switchgear Solutions</h3>
                  <p className="text-blue-600 mb-6">
                    Professional electrical protection and control systems for industrial applications
                  </p>
                  <Button
                    onClick={() => setSelectedCategory("switchgear")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Explore Switchgear
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-red-300 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-red-200 rounded-full flex items-center justify-center group-hover:bg-red-300 transition-colors shadow-lg">
                      <Lightbulb className="h-10 w-10 text-red-700" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-red-800">Lighting Solutions</h3>
                  <p className="text-red-600 mb-6">
                    Energy-efficient LED lighting systems for commercial and industrial use
                  </p>
                  <Button
                    onClick={() => setSelectedCategory("lighting")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Explore Lighting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
