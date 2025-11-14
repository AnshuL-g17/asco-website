"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Send, CheckCircle, Globe } from "lucide-react"

export default function AuthorizationsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    companyAddress: "",
    gstNumber: "",
    panNumber: "",
    message: "",
  })

  const platforms = [
    { id: "gem", name: "GEM (Government e-Marketplace)", category: "procurement" },
    { id: "ireps", name: "IREPS (Indian Railway e-Procurement System)", category: "procurement" },
    { id: "eprocurement", name: "E-Procurement", category: "procurement" },
    { id: "nprocurement", name: "N-Procurement", category: "procurement" },
    { id: "mstc", name: "MSTC", category: "procurement" },
  ]

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId))
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|co|org|net|edu|gov|co\.in|co\.uk)$/i
    return emailRegex.test(email)
  }

  const validateAndFormatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 10) {
      return `+91${cleaned}`
    }
    if (cleaned.length === 12 && cleaned.startsWith("91")) {
      return `+${cleaned}`
    }
    if (phone.startsWith("+") && cleaned.length >= 10) {
      return phone
    }
    return phone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address with a proper domain (e.g., .com, .in, .co)")
      return
    }

    const formattedPhone = validateAndFormatPhone(formData.phone)
    if (formattedPhone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid phone number with at least 10 digits")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-authorization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone,
          selectedPlatforms,
          type: "authorization",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || "Failed to send authorization request")
      }
    } catch (error) {
      console.error("Error sending authorization request:", error)
      alert("Failed to send authorization request. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      companyAddress: "",
      gstNumber: "",
      panNumber: "",
      message: "",
    })
    setSelectedPlatforms([])
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Platform <span className="text-primary">Authorizations</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Get authorized on major procurement platforms. We'll help you navigate the authorization process for
                government and private procurement systems.
              </p>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Procurement Platforms We Work With</h2>
              <p className="text-lg text-slate-600">
                We are authorized and actively participate in these major procurement platforms
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto mb-16">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-900 text-sm">{platform.name.split(" ")[0]}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authorization Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Authorization Request</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Fill out the form below to request authorization assistance for procurement platforms
                </p>
              </div>

              {isSubmitted ? (
                <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
                    <h3 className="text-2xl font-semibold mb-4">Authorization Request Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your authorization request. Our team will review your information and guide you
                      through the authorization process within 24-48 hours.
                    </p>
                    <Button onClick={handleReset}>Submit Another Request</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Platform Selection */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">
                          Select Platforms for Authorization *
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {platforms.map((platform) => (
                            <div key={platform.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <Checkbox
                                id={platform.id}
                                checked={selectedPlatforms.includes(platform.id)}
                                onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                              />
                              <Label htmlFor={platform.id} className="text-sm font-medium cursor-pointer">
                                {platform.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            pattern="[^\s@]+@[^\s@]+\.(com|in|co|org|net|edu|gov|co\.in|co\.uk)"
                            title="Please enter a valid email address (e.g., user@example.com, user@example.in)"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 XXXXX XXXXX or XXXXXXXXXX"
                            pattern="(\+?\d{1,3}[\s-]?)?\d{10,}"
                            title="Enter 10-digit number (India +91 assumed) or with country code"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                            Company Name *
                          </Label>
                          <Input
                            id="company"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your company name"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="designation" className="text-sm font-semibold text-gray-700">
                            Designation *
                          </Label>
                          <Input
                            id="designation"
                            required
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            placeholder="Your designation"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gstNumber" className="text-sm font-semibold text-gray-700">
                            GST Number
                          </Label>
                          <Input
                            id="gstNumber"
                            value={formData.gstNumber}
                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                            placeholder="GST Number (if applicable)"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="panNumber" className="text-sm font-semibold text-gray-700">
                            PAN Number
                          </Label>
                          <Input
                            id="panNumber"
                            value={formData.panNumber}
                            onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                            placeholder="PAN Number"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyAddress" className="text-sm font-semibold text-gray-700">
                          Company Address *
                        </Label>
                        <Textarea
                          id="companyAddress"
                          required
                          value={formData.companyAddress}
                          onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                          placeholder="Complete company address with pincode"
                          rows={3}
                          className="border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                          Additional Information
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Any additional information or specific requirements for the authorization process..."
                          rows={4}
                          className="border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                        disabled={isSubmitting || selectedPlatforms.length === 0}
                      >
                        {isSubmitting ? (
                          "Sending Request..."
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Request Authorization
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
