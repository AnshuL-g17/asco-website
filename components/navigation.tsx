"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Menu, ChevronDown } from 'lucide-react'
import { InquiryCartButton } from "./inquiry-cart-button"
import { usePathname } from 'next/navigation'

interface NavigationProps {
  selectedCategory?: "switchgear" | "lighting" | null
  activeSection?: string
}

export function Navigation({ selectedCategory, activeSection = "home" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showContactMenu, setShowContactMenu] = useState(false)
  const [showSwitchgearLogo, setShowSwitchgearLogo] = useState(false)
  const [showLightingLogo, setShowLightingLogo] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const contactTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current)
      if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current)
    }
  }, [])

  const navItems = [
    { href: "/", label: "Home", section: "home" },
    { href: "#about", label: "About Us", section: "about", scrollTo: true },
    { href: "/products", label: "Products", hasDropdown: true },
    { href: "/network", label: "Network" },
    { href: "/certifications", label: "Certifications" },
    { href: "/contact", label: "Contact", hasDropdown: true },
  ]

  const productCategories = {
    switchgear: {
      title: "Switchgear Products",
      items: [
        "MCB",
        "Isolator",
        "Distribution Board",
        "Fuse Kit-Kat",
        "Switch Fuse Unit",
        "Control Switches",
        "Change Over Switches",
        "RCCB/ELCB",
        "MCCB",
        "RCBO",
      ],
    },
    lighting: {
      title: "Lighting Products",
      items: [
        "Cabinet Light",
        "Concealed Light",
        "Panel Light",
        "Downlight",
        "COB Light",
        "Spot Light",
        "Surface Panel Light",
        "Bulb Light",
        "Tube Light",
        "Flood Light",
        "Street Light",
        "Highbay Light",
        "Track Light",
        "Commercial Panel Light",
        "Strip Light",
        "Garden Light",
        "Wall Light",
        "Solar Light",
      ],
    },
  }

  const contactOptions = [
    {
      href: "/contact/quotation",
      label: "Request Quotation",
      description: "Get a detailed quote for your project",
    },
    {
      href: "/contact/authorizations",
      label: "Platform Authorizations",
      description: "Authorization for procurement platforms",
    },
    {
      href: "/contact/careers",
      label: "Careers",
      description: "Join our growing team",
    },
  ]

  const filteredNavItems = navItems

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof navItems)[0]) => {
    if (item.scrollTo && isHomePage) {
      e.preventDefault()
      const element = document.getElementById(item.section || "")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    }
  }

  const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/products")
    setShowProductsMenu(false)
  }

  const isActiveLink = (item: (typeof navItems)[0]) => {
    if (item.scrollTo && isHomePage && item.section) {
      return activeSection === item.section
    }
    return pathname === item.href || (item.href === "/products" && selectedCategory)
  }

  const isHomePage = pathname === "/"

  const handleMouseEnterProducts = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
    }
    setShowProductsMenu(true)
  }

  const handleMouseLeaveProducts = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setShowProductsMenu(false)
    }, 300) // 300ms delay before closing
  }

  const handleMouseEnterContact = () => {
    if (contactTimeoutRef.current) {
      clearTimeout(contactTimeoutRef.current)
    }
    setShowContactMenu(true)
  }

  const handleMouseLeaveContact = () => {
    contactTimeoutRef.current = setTimeout(() => {
      setShowContactMenu(false)
    }, 300) // 300ms delay before closing
  }

  return (
    <>
      <nav className="border-b bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-sm sticky top-0 z-50 border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-18 items-center justify-between">
            <div className="flex items-center space-x-12">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/asco-switchgears-logo.png"
                    alt="ASCO Switchgears"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowSwitchgearLogo(true)
                    }}
                  />
                  <Image
                    src="/asco-lighting-logo.png"
                    alt="ASCO Lighting"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowLightingLogo(true)
                    }}
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {filteredNavItems.map((item) => (
                  <div key={item.href} className="relative">
                    {item.hasDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => {
                          if (item.label === "Products") {
                            handleMouseEnterProducts()
                          } else if (item.label === "Contact") {
                            handleMouseEnterContact()
                          }
                        }}
                        onMouseLeave={() => {
                          if (item.label === "Products") {
                            handleMouseLeaveProducts()
                          } else if (item.label === "Contact") {
                            handleMouseLeaveContact()
                          }
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={item.label === "Products" ? handleProductsClick : undefined}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform scale-100 hover:scale-110 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md active:scale-95"
                        >
                          {item.label}
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                        </Link>

                        {item.label === "Contact" && showContactMenu && (
                          <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                            <div className="space-y-3">
                              {contactOptions.map((option) => (
                                <Link
                                  key={option.href}
                                  href={option.href}
                                  className="block p-3 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <div className="font-medium text-sm text-gray-900">{option.label}</div>
                                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.label === "Products" && showProductsMenu && (
                          <div className="absolute top-full left-0 mt-1 w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg p-6 grid grid-cols-2 gap-8">
                            <div>
                              <h3 className="font-bold text-lg mb-4 text-blue-600 border-b border-gray-200 pb-2">
                                {productCategories.switchgear.title}
                              </h3>
                              <ul className="space-y-2">
                                {productCategories.switchgear.items.map((product) => (
                                  <li key={product}>
                                    <Link
                                      href={`/products?category=switchgear&product=${product.toLowerCase().replace(/\s+/g, "-")}`}
                                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1 px-2 rounded hover:bg-gray-50"
                                    >
                                      {product}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="font-bold text-lg mb-4 text-red-600 border-b border-gray-200 pb-2">
                                {productCategories.lighting.title}
                              </h3>
                              <ul className="space-y-2">
                                {productCategories.lighting.items.map((product) => (
                                  <li key={product}>
                                    <Link
                                      href={`/products?category=lighting&product=${product.toLowerCase().replace(/\s+/g, "-")}`}
                                      className="text-sm text-gray-600 hover:text-red-600 transition-colors block py-1 px-2 rounded hover:bg-gray-50"
                                    >
                                      {product}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`inline-block text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform scale-100 hover:scale-110 hover:shadow-md active:scale-95 ${
                          isActiveLink(item)
                            ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <InquiryCartButton />
              </div>

              {/* Mobile Navigation */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white overflow-y-auto">
                  <div className="flex flex-col items-center space-y-4 mt-8">
                    {filteredNavItems.map((item) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (item.label === "Products") {
                              e.preventDefault()
                              router.push("/products")
                              setIsOpen(false)
                            } else {
                              handleNavClick(e, item)
                              setIsOpen(false)
                            }
                          }}
                          className={`text-base font-medium transition-colors block text-center ${
                            isActiveLink(item) ? "text-blue-600" : "text-foreground/80 hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Dialog components for logo popups */}
      <Dialog open={showSwitchgearLogo} onOpenChange={setShowSwitchgearLogo}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">ASCO Switchgears</DialogTitle>
          <div className="flex items-center justify-center p-8 bg-white">
            <Image
              src="/asco-switchgears-logo.png"
              alt="ASCO Switchgears Logo"
              width={400}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLightingLogo} onOpenChange={setShowLightingLogo}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="text-center text-2xl font-bold text-red-600">ASCO Lighting</DialogTitle>
          <div className="flex items-center justify-center p-8 bg-white">
            <Image
              src="/asco-lighting-logo.png"
              alt="ASCO Lighting Logo"
              width={400}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
