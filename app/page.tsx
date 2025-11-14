"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import SwitchgearContent from "@/components/switchgear-content"
import LightingContent from "@/components/lighting-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Zap, Shield, Users, Factory, Wrench, TrendingUp, Award, UserCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<"switchgear" | "lighting" | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [battleIntensity, setBattleIntensity] = useState(0)
  const [hoveredSide, setHoveredSide] = useState<"switchgear" | "lighting" | null>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showSwitchgearLogo, setShowSwitchgearLogo] = useState(false)
  const [showLightingLogo, setShowLightingLogo] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })

      // Calculate battle intensity based on distance from center
      const centerDistance = Math.abs(x - 50)
      setBattleIntensity(Math.max(0, 50 - centerDistance))
    }

    const handleScroll = () => {
      const sections = ["home", "about"]
      const scrollPosition = window.scrollY + 100 // Small offset from top

      let foundActiveSection = "home"

      // Check sections in reverse order (from bottom to top) so lower sections take precedence
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          // If we've scrolled past the start of this section, it's the active one
          if (scrollPosition >= offsetTop) {
            foundActiveSection = section
            break
          }
        }
      }

      setActiveSection(foundActiveSection)

      const observerSections = ["logo-cards", "why-choose", "about", "stats", "story", "values", "cta"]
      observerSections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
          if (isVisible) {
            setVisibleSections((prev) => new Set([...prev, sectionId]))
          }
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleCategorySelect = (category: "switchgear" | "lighting") => {
    setSelectedCategory(category)
  }

  const handleReset = () => {
    setSelectedCategory(null)
  }

  if (selectedCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          {selectedCategory === "switchgear" ? (
            <SwitchgearContent onReset={handleReset} />
          ) : (
            <LightingContent onReset={handleReset} />
          )}
        </main>
        <Footer selectedCategory={selectedCategory} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeSection={activeSection} />

      <main className="flex-1">
        <section id="home" className="relative h-screen overflow-hidden">
          {/* Background Layer */}
          <div className="absolute inset-0">
            {/* Switchgear Background */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)",
                width: hoveredSide === "switchgear" ? "85%" : hoveredSide === "lighting" ? "25%" : "50%",
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/industrial-switchgear-background.jpg')`,
                  filter: "blur(0.5px) brightness(0.8) contrast(1.2)",
                  backgroundColor: "#1a1a1a",
                }}
              />
              <div className="absolute inset-0 bg-black/77" />
            </div>

            {/* Lighting Background */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                left: hoveredSide === "lighting" ? "15%" : hoveredSide === "switchgear" ? "75%" : "50%",
                width: hoveredSide === "lighting" ? "85%" : hoveredSide === "switchgear" ? "25%" : "50%",
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/modern-pendant-lighting.jpg')`,
                  backgroundColor: "#ffffff",
                }}
              />
              <div className="absolute inset-0 bg-white/75" />
            </div>
          </div>

          {/* Center Logo */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-700 ease-out"
            style={{
              transform:
                hoveredSide === "switchgear"
                  ? "translateX(15%)" // Fixed direction: move right when hovering switchgear
                  : hoveredSide === "lighting"
                    ? "translateX(-15%)" // Fixed direction: move left when hovering lighting
                    : "translateX(0%)",
            }}
          >
            <div className="relative">
              {/* Left side - Switchgear vertical line */}
              <div className="absolute -left-24 top-0 bottom-0 hidden lg:block">
                <div className="w-1 h-full bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600"></div>
              </div>

              {/* Right side - Lighting vertical line */}
              <div className="absolute -right-24 top-0 bottom-0 hidden lg:block">
                <div className="w-1 h-full bg-gradient-to-b from-red-600 via-red-400 to-red-600"></div>
              </div>

              {/* Logo container - kept plain white */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-full px-6 py-4 md:px-8 md:py-6 shadow-2xl border-4 border-white/50">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">ASCO</div>
                  <div className="text-xs md:text-sm font-medium text-gray-600 tracking-wider">SWITCHGEARS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 h-full flex">
            {/* Switchgear Content */}
            <div
              className="h-full cursor-pointer flex items-center justify-start px-4 md:px-8 lg:px-16 transition-all duration-700 ease-out"
              style={{
                width: hoveredSide === "switchgear" ? "85%" : hoveredSide === "lighting" ? "25%" : "50%",
              }}
              onClick={() => handleCategorySelect("switchgear")}
              onMouseEnter={() => setHoveredSide("switchgear")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <div
                className="text-left max-w-lg transform transition-all duration-300"
                style={{
                  transform: `translateY(${Math.sin(mousePosition.x * 0.02) * 10}px)`,
                  filter: `drop-shadow(0 0 ${10 + battleIntensity * 0.5}px rgba(37, 99, 235, 0.5))`,
                }}
              >
                <div className="mb-4 md:mb-6">
                  <Shield
                    className="h-12 w-12 md:h-16 md:w-16 mb-4 text-blue-600 animate-pulse"
                    style={{
                      animationDuration: `${2 - battleIntensity * 0.02}s`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                    }}
                  />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance text-white">
                  <span
                    className="text-blue-600 animate-pulse"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(37, 99, 235, 0.5))",
                    }}
                  >
                    Switchgear
                  </span>
                </h1>
                <p className="text-sm md:text-xl mb-6 md:mb-8 text-pretty text-slate-200">
                  Efficient and reliable switchgear systems for power distribution, protection, and industrial
                  applications.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all shadow-lg border-2 border-blue-500 text-sm md:text-base"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3), 0 2px 4px rgba(0,0,0,0.2)",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    position: "relative",
                    zIndex: 1000,
                  }}
                >
                  Explore Switchgear
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>

            {/* Lighting Content */}
            <div
              className="h-full cursor-pointer flex items-center justify-end px-4 md:px-8 lg:px-16 transition-all duration-700 ease-out"
              style={{
                width: hoveredSide === "lighting" ? "85%" : hoveredSide === "switchgear" ? "25%" : "50%",
              }}
              onClick={() => handleCategorySelect("lighting")}
              onMouseEnter={() => setHoveredSide("lighting")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <div
                className="text-right max-w-lg transform transition-all duration-300"
                style={{
                  transform: `translateY(${Math.cos(mousePosition.x * 0.02) * 10}px)`,
                  filter: `drop-shadow(0 0 ${10 + battleIntensity * 0.5}px rgba(220, 38, 38, 0.5))`,
                }}
              >
                <div className="mb-4 md:mb-6 flex justify-end">
                  <Zap
                    className="h-12 w-12 md:h-16 md:w-16 mb-4 text-red-600 animate-pulse"
                    style={{
                      animationDuration: `${2 - battleIntensity * 0.02}s`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                  />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance text-white">
                  <span className="text-red-600 animate-pulse">Lighting</span>
                </h1>
                <p className="text-sm md:text-xl mb-6 md:mb-8 text-pretty text-slate-800">
                  Durable LED and solar lighting solutions for streets, commercial spaces, and government projects.
                </p>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white transform hover:scale-105 transition-all shadow-lg border-2 border-red-500 text-sm md:text-base"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3), 0 2px 4px rgba(0,0,0,0.2)",
                    backgroundColor: "#dc2626",
                    color: "#ffffff",
                    position: "relative",
                    zIndex: 1000,
                  }}
                >
                  Explore Lighting
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="logo-cards" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
                visibleSections.has("logo-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card
                className="text-center p-6 md:p-8 bg-blue-100 border-2 border-blue-200 hover:border-blue-300 transition-all duration-500 hover:scale-125 hover:shadow-2xl cursor-pointer hover:bg-blue-200 hover:-translate-y-4 hover:rotate-1 group"
                onClick={() => setShowSwitchgearLogo(true)}
              >
                <CardContent className="pt-6">
                  <div className="w-32 h-24 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/asco-switchgears-logo.png"
                      alt="ASCO Switchgears Logo"
                      width={128}
                      height={96}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:brightness-110"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-900 transition-all duration-300 group-hover:scale-105">
                    Switchgear
                  </h3>
                  <p className="text-blue-800 text-pretty text-sm md:text-base transition-all duration-300 group-hover:text-blue-900">
                    Advanced electrical control systems engineered for maximum safety, reliability, and performance in
                    critical power infrastructure applications.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="text-center p-6 md:p-8 bg-red-100 border-2 border-red-200 hover:border-red-300 transition-all duration-500 hover:scale-125 hover:shadow-2xl cursor-pointer hover:bg-red-200 hover:-translate-y-4 hover:-rotate-1 group"
                onClick={() => setShowLightingLogo(true)}
              >
                <CardContent className="pt-6">
                  <div className="w-32 h-24 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/asco-lighting-logo.png"
                      alt="ASCO Lighting Logo"
                      width={128}
                      height={96}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:brightness-110"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-900 transition-all duration-300 group-hover:scale-105">
                    Lighting
                  </h3>
                  <p className="text-red-800 text-pretty text-sm md:text-base transition-all duration-300 group-hover:text-red-900">
                    Innovative LED lighting technologies delivering superior illumination, energy efficiency, and
                    sustainable solutions for modern infrastructure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="why-choose" className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div
              className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
                visibleSections.has("why-choose") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-balance">Why Choose ASCO</h2>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Leading the industry with innovative electrical solutions and unmatched reliability
              </p>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
                visibleSections.has("why-choose") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Reliable Protection */}
              <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-cyan-50/50 border-2 border-transparent hover:border-cyan-300 group hover:-translate-y-2">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-cyan-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Shield className="h-8 w-8 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 group-hover:text-cyan-700 transition-colors duration-300">
                    Reliable Protection
                  </h3>
                  <p className="text-muted-foreground text-pretty text-sm md:text-base group-hover:text-cyan-600 transition-colors duration-300">
                    Advanced circuit protection and robust construction ensure maximum protection for your electrical
                    systems
                  </p>
                </CardContent>
              </Card>

              {/* Energy Efficient */}
              <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-yellow-50/50 border-2 border-transparent hover:border-yellow-300 group hover:-translate-y-2">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-yellow-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Zap className="h-8 w-8 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 group-hover:text-yellow-700 transition-colors duration-300">
                    Energy Efficient
                  </h3>
                  <p className="text-muted-foreground text-pretty text-sm md:text-base group-hover:text-yellow-600 transition-colors duration-300">
                    Cutting-edge LED technology and smart controls deliver superior performance with minimal energy
                    consumption
                  </p>
                </CardContent>
              </Card>

              {/* Future Ready */}
              <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-green-50/50 border-2 border-transparent hover:border-green-300 group hover:-translate-y-2">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <ArrowRight className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 group-hover:text-green-700 transition-colors duration-300">
                    Future Ready
                  </h3>
                  <p className="text-muted-foreground text-pretty text-sm md:text-base group-hover:text-green-600 transition-colors duration-300">
                    Scalable solutions designed to adapt and grow with your evolving electrical infrastructure needs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us content from about page (excluding Board of Directors) */}
        <section id="about" className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                About <span className="text-primary">ASCO Switchgears</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Leading the electrical industry with innovative switchgear and lighting solutions for over 25 years. Our
                commitment to quality, reliability, and customer satisfaction has made us a trusted partner for
                industries across the region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="hover:scale-105 transition-all duration-300 hover:shadow-lg">
                    View Our Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="py-16">
          <div className="container mx-auto px-4">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${
                visibleSections.has("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="group hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-primary/5 p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  25+
                </div>
                <div className="text-muted-foreground group-hover:text-primary/70 transition-colors">
                  Years Experience
                </div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-secondary/5 p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                  500+
                </div>
                <div className="text-muted-foreground flex items-center justify-center gap-2 group-hover:text-secondary/70 transition-colors">
                  <Award className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" />
                  Projects Completed
                </div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-primary/5 p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  100+
                </div>
                <div className="text-muted-foreground group-hover:text-primary/70 transition-colors">Happy Clients</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-secondary/5 p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                  50+
                </div>
                <div className="text-muted-foreground flex items-center justify-center gap-2 group-hover:text-secondary/70 transition-colors">
                  <UserCheck className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" />
                  Expert Engineers
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div
                className={`text-center mb-16 transition-all duration-1000 ${
                  visibleSections.has("story") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Story</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  From humble beginnings to industry leadership
                </p>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-300 ${
                  visibleSections.has("story") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="space-y-6">
                  <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 cursor-pointer">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      Founded on Excellence
                    </h3>
                    <p className="text-muted-foreground text-pretty group-hover:text-primary/80 transition-colors">
                      Established in 1999, ASCO Switchgears Pvt. Ltd. began with a vision to provide reliable and
                      innovative electrical solutions to the growing industrial sector. What started as a small
                      manufacturing unit has evolved into a comprehensive electrical solutions provider.
                    </p>
                  </div>
                  <div className="group hover:bg-secondary/5 p-4 rounded-lg transition-all duration-300 cursor-pointer">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-secondary transition-colors">
                      Continuous Innovation
                    </h3>
                    <p className="text-muted-foreground text-pretty group-hover:text-secondary/80 transition-colors">
                      Over the years, we have continuously invested in research and development, adopting the latest
                      technologies and manufacturing processes to stay ahead of industry demands and deliver
                      cutting-edge solutions.
                    </p>
                  </div>
                  <div className="group hover:bg-primary/5 p-4 rounded-lg transition-all duration-300 cursor-pointer">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      Growing Strong
                    </h3>
                    <p className="text-muted-foreground text-pretty group-hover:text-primary/80 transition-colors">
                      Today, we serve clients across multiple industries with our comprehensive range of switchgear and
                      lighting solutions, backed by a team of experienced professionals and state-of-the-art
                      manufacturing facilities.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-2xl transition-all duration-500">
                    <h4 className="text-xl font-semibold mb-6 text-center">Our Journey</h4>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer hover:scale-105">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                          <Factory className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary group-hover:scale-105 transition-transform">
                            1999
                          </div>
                          <div className="text-sm text-muted-foreground">Company Founded</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all cursor-pointer hover:scale-105">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors group-hover:scale-110">
                          <Wrench className="h-6 w-6 text-orange-600 group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <div className="font-semibold text-secondary group-hover:scale-105 transition-transform">
                            2005
                          </div>
                          <div className="text-sm text-muted-foreground">First Major Contract</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer hover:scale-105">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                          <Shield className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary group-hover:scale-105 transition-transform">
                            2010
                          </div>
                          <div className="text-sm text-muted-foreground">Quality Certification</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all cursor-pointer hover:scale-105">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors group-hover:scale-110">
                          <TrendingUp className="h-6 w-6 text-green-600 group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <div className="font-semibold text-secondary group-hover:scale-105 transition-transform">
                            2015
                          </div>
                          <div className="text-sm text-muted-foreground">Expansion & Growth</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer hover:scale-105">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                          <Users className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary group-hover:scale-105 transition-transform">
                            2024
                          </div>
                          <div className="text-sm text-muted-foreground">Industry Leader</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="py-20">
          <div className="container mx-auto px-4">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                The principles that guide everything we do
              </p>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
                visibleSections.has("values") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-blue-50/50 border-2 border-transparent hover:border-blue-300 group hover:-translate-y-4">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    Quality First
                  </h3>
                  <p className="text-muted-foreground text-pretty group-hover:text-blue-600 transition-colors duration-300">
                    We never compromise on quality. Every product undergoes rigorous testing to ensure it meets the
                    highest industry standards and exceeds customer expectations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-orange-50/50 border-2 border-transparent hover:border-orange-300 group hover:-translate-y-4">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    Innovation
                  </h3>
                  <p className="text-muted-foreground text-pretty group-hover:text-orange-600 transition-colors duration-300">
                    We embrace new technologies and innovative approaches to solve complex electrical challenges and
                    provide future-ready solutions to our clients.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer hover:bg-green-50/50 border-2 border-transparent hover:border-green-300 group hover:-translate-y-4">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-green-700 transition-colors duration-300">
                    Customer Focus
                  </h3>
                  <p className="text-muted-foreground text-pretty group-hover:text-green-600 transition-colors duration-300">
                    Our customers are at the heart of everything we do. We build long-term relationships based on trust,
                    reliability, and exceptional service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Work With Us?</h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Let's discuss how our electrical solutions can power your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    View Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
    </div>
  )
}
