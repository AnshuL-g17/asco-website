"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"
import { InquiryCartContent } from "./inquiry-cart-content"

export function InquiryCartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = useInquiryCart((state) => state.getTotalItems())

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleCartUpdate = (event: CustomEvent) => {
        // Simple notification - could be enhanced with toast notifications
        console.log(event.detail.message)
      }

      window.addEventListener("cart-updated", handleCartUpdate as EventListener)
      return () => window.removeEventListener("cart-updated", handleCartUpdate as EventListener)
    }
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative bg-transparent shadow-[4px_0_8px_rgba(6,182,212,0.4),-4px_0_8px_rgba(239,68,68,0.4)]"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Inquiry Cart
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Inquiry Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        <InquiryCartContent onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
