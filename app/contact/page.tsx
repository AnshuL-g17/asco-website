"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, FileText, Shield, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Mail className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Get In <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Choose how you'd like to connect with us. We're here to help with your electrical project needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">How Can We Help You?</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Select the option that best matches your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Link href="/contact/quotation">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 group shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Request Quotation</h3>
                      <p className="text-muted-foreground mb-6">
                        Get a detailed quote for your electrical project with competitive pricing and comprehensive
                        solutions.
                      </p>
                      <Button className="w-full group-hover:bg-blue-600">
                        Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/contact/authorizations">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500 group shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Platform Authorizations</h3>
                      <p className="text-muted-foreground mb-6">
                        Get assistance with authorization on procurement platforms like GEM, IREPS, and more.
                      </p>
                      <Button className="w-full group-hover:bg-green-600">
                        Get Authorized <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/contact/careers">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500 group shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Join Our Team</h3>
                      <p className="text-muted-foreground mb-6">
                        Explore career opportunities and become part of India's leading electrical solutions company.
                      </p>
                      <Button className="w-full group-hover:bg-purple-600">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Contact Information */}
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                    <p className="text-lg text-muted-foreground">
                      Reach out to us directly through any of these channels
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 contact-grid">
                    <Card className="text-center p-6 mobile-card-padding shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                      <CardContent className="pt-6">
                        <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
                          <MapPin className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                        <p className="text-muted-foreground mobile-text-sm">
                          <a
                            href="https://maps.google.com/?q=Patel+Nagar,+Jalandhar+Road,+Kapurthala,+PB+144601"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors cursor-pointer"
                          >
                            Patel Nagar, Jalandhar Road
                            <br />
                            Kapurthala, PB 144601
                            <br />
                            India
                          </a>
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="text-center p-6 mobile-card-padding shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                      <CardContent className="pt-6">
                        <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
                          <Phone className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                        <p className="text-muted-foreground mobile-text-sm">
                          <a href="tel:+919592259400" className="hover:text-primary transition-colors">
                            +91 9592259400
                          </a>
                          <br />
                          <a href="tel:+919592260100" className="hover:text-primary transition-colors">
                            +91 9592260100
                          </a>
                          <br />
                          <a href="tel:+916280745232" className="hover:text-primary transition-colors">
                            +91 6280745232
                          </a>
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="text-center p-6 mobile-card-padding shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                      <CardContent className="pt-6">
                        <div className="bg-orange-100 rounded-full p-3 w-fit mx-auto mb-4">
                          <Mail className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                        <p className="text-muted-foreground mobile-text-sm">
                          <a
                            href="mailto:ascoswitchgears@gmail.com"
                            className="hover:text-primary transition-colors email-text block mb-1"
                          >
                            ascoswitchgears@gmail.com
                          </a>
                          <a
                            href="mailto:ascoswitchgears.inquiry@gmail.com"
                            className="hover:text-primary transition-colors email-text block"
                          >
                            ascoswitchgears.inquiry@gmail.com
                          </a>
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Business Hours */}
                  <Card className="max-w-2xl mx-auto shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <div className="bg-purple-100 rounded-full p-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        Business Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium">Monday - Friday:</span>
                          <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium">Saturday:</span>
                          <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium">Sunday:</span>
                          <span className="text-muted-foreground">Closed</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium">Response Time:</span>
                          <span className="text-muted-foreground">Within 24 hours</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
