"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { ArrowRight, Users, Zap, Shield, Factory, Wrench, TrendingUp, Award, UserCheck } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()
  const [showSwitchgearLogo, setShowSwitchgearLogo] = useState(false)
  const [showLightingLogo, setShowLightingLogo] = useState(false)

  useEffect(() => {
    router.replace("/#about")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                About <span className="text-primary">ASCO Switchgears</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Leading the electrical industry with innovative switchgear and lighting solutions for over 25 years. Our
                commitment to quality, reliability, and customer satisfaction has made us a trusted partner for
                industries across the region.
              </p>
              <div className="flex items-center justify-center gap-8 mb-8">
                <div
                  className="cursor-pointer hover:scale-110 transition-all duration-300 hover:drop-shadow-xl"
                  onClick={() => setShowSwitchgearLogo(true)}
                >
                  <Image
                    src="/asco-switchgears-logo.png"
                    alt="ASCO Switchgears"
                    width={150}
                    height={60}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div
                  className="cursor-pointer hover:scale-110 transition-all duration-300 hover:drop-shadow-xl"
                  onClick={() => setShowLightingLogo(true)}
                >
                  <Image
                    src="/asco-lighting-logo.png"
                    alt="ASCO Lighting"
                    width={150}
                    height={60}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg">
                    View Our Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">1000+</div>
                <div className="text-muted-foreground flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Projects Completed
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50000+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">250+</div>
                <div className="text-muted-foreground flex items-center justify-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Expert Engineers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Story</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  From humble beginnings to industry leadership
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Founded on Excellence</h3>
                    <p className="text-muted-foreground text-pretty">
                      Established in 1999, ASCO Switchgears Pvt. Ltd. began with a vision to provide reliable and
                      innovative electrical solutions to the growing industrial sector. What started as a small
                      manufacturing unit has evolved into a comprehensive electrical solutions provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Continuous Innovation</h3>
                    <p className="text-muted-foreground text-pretty">
                      Over the years, we have continuously invested in research and development, adopting the latest
                      technologies and manufacturing processes to stay ahead of industry demands and deliver
                      cutting-edge solutions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Growing Strong</h3>
                    <p className="text-muted-foreground text-pretty">
                      Today, we serve clients across multiple industries with our comprehensive range of switchgear and
                      lighting solutions, backed by a team of experienced professionals and state-of-the-art
                      manufacturing facilities.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border">
                    <h4 className="text-xl font-semibold mb-6 text-center">Our Journey</h4>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Factory className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary">1999</div>
                          <div className="text-sm text-muted-foreground">Company Founded</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-secondary">2005</div>
                          <div className="text-sm text-muted-foreground">First Major Contract</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary">2010</div>
                          <div className="text-sm text-muted-foreground">Quality Certification</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-secondary/5 p-3 rounded-lg transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-secondary">2015</div>
                          <div className="text-sm text-muted-foreground">Expansion & Growth</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 group hover:bg-primary/5 p-3 rounded-lg transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary">2024</div>
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

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Quality First</h3>
                  <p className="text-slate-700 text-pretty">
                    We never compromise on quality. Every product undergoes rigorous testing to ensure it meets the
                    highest industry standards and exceeds customer expectations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Innovation</h3>
                  <p className="text-gray-700 text-pretty">
                    We embrace new technologies and innovative approaches to solve complex electrical challenges and
                    provide future-ready solutions to our clients.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 bg-gradient-to-br from-zinc-50 to-zinc-100 border-zinc-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-zinc-900">Customer Focus</h3>
                  <p className="text-zinc-700 text-pretty">
                    Our customers are at the heart of everything we do. We build long-term relationships based on trust,
                    reliability, and exceptional service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Work With Us?</h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Let's discuss how our electrical solutions can power your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-transparent">
                    View Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
    </div>
  )
}
