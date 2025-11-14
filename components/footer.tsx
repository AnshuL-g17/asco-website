"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  selectedCategory?: "switchgear" | "lighting" | null
}

export function Footer({ selectedCategory }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="font-bold text-xl">
              <span className="text-primary">ASCO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading manufacturer of industrial switchgear and lighting solutions for over two decades.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3
              className="font-semibold text-shadow-[2px_0_4px_rgba(6,182,212,0.5),-2px_0_4px_rgba(239,68,68,0.5)]"
              style={{ textShadow: "2px 0 4px rgba(6,182,212,0.5), -2px 0 4px rgba(239,68,68,0.5)" }}
            >
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                href="/certifications"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Certifications
              </Link>
            </div>
          </div>

          {/* Products */}
          {!selectedCategory && (
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ textShadow: "2px 0 4px rgba(6,182,212,0.5), -2px 0 4px rgba(239,68,68,0.5)" }}
              >
                Products
              </h3>
              <div className="space-y-2">
                <Link
                  href="/products?category=lighting"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Commercial & Residential Lighting
                </Link>
                <Link
                  href="/products?category=lighting&product=solar-street-light"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Solar Lighting
                </Link>
                <Link
                  href="/products?category=switchgear"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Commercial & Residential Switchgear
                </Link>
              </div>
            </div>
          )}

          {selectedCategory === "switchgear" && (
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ textShadow: "2px 0 4px rgba(6,182,212,0.5), -2px 0 4px rgba(239,68,68,0.5)" }}
              >
                Switchgear Products
              </h3>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">LT Panels</div>
                <div className="text-sm text-muted-foreground">HT Panels</div>
                <div className="text-sm text-muted-foreground">Control Panels</div>
                <div className="text-sm text-muted-foreground">Distribution Boards</div>
              </div>
            </div>
          )}

          {selectedCategory === "lighting" && (
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ textShadow: "2px 0 4px rgba(6,182,212,0.5), -2px 0 4px rgba(239,68,68,0.5)" }}
              >
                Lighting Products
              </h3>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">LED Fixtures</div>
                <div className="text-sm text-muted-foreground">Industrial Lighting</div>
                <div className="text-sm text-muted-foreground">Street Lights</div>
                <div className="text-sm text-muted-foreground">Emergency Lighting</div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3
              className="font-semibold"
              style={{ textShadow: "2px 0 4px rgba(6,182,212,0.5), -2px 0 4px rgba(239,68,68,0.5)" }}
            >
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+919592259400</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">ascoswitchgears.inquiry@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Patel Nagar, Kapurthala, Punjab 144601</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ASCO Switchgears Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
