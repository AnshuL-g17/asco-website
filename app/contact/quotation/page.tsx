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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Send, CheckCircle } from "lucide-react"

export default function QuotationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
    projectType: "",
    budget: "",
    timeline: "",
  })

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
      const response = await fetch("/api/send-quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone, // Use formatted phone
          type: "quotation",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || "Failed to send quotation request")
      }
    } catch (error) {
      console.error("Error sending quotation request:", error)
      alert("Failed to send quotation request. Please try again or contact us directly.")
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
      subject: "",
      message: "",
      inquiryType: "",
      projectType: "",
      budget: "",
      timeline: "",
    })
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
              <FileText className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Request <span className="text-primary">Quotation</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Get a detailed quotation for your electrical project. Our experts will provide you with competitive
                pricing and comprehensive solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Quotation Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Project Details</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Please provide detailed information about your project requirements
                </p>
              </div>

              {isSubmitted ? (
                <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
                    <h3 className="text-2xl font-semibold mb-4">Quotation Request Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your quotation request. Our team will review your requirements and send you a
                      detailed quotation within 24-48 hours.
                    </p>
                    <Button onClick={handleReset}>Submit Another Request</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                          <Label htmlFor="projectType" className="text-sm font-semibold text-gray-700">
                            Project Type *
                          </Label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="switchgear">Switchgear Installation</SelectItem>
                              <SelectItem value="lighting">Lighting Solutions</SelectItem>
                              <SelectItem value="both">Switchgear & Lighting</SelectItem>
                              <SelectItem value="maintenance">Maintenance & Support</SelectItem>
                              <SelectItem value="upgrade">System Upgrade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">
                            Estimated Budget
                          </Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) => setFormData({ ...formData, budget: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1l">Under ₹1 Lakh</SelectItem>
                              <SelectItem value="1l-5l">₹1-5 Lakhs</SelectItem>
                              <SelectItem value="5l-10l">₹5-10 Lakhs</SelectItem>
                              <SelectItem value="10l-25l">₹10-25 Lakhs</SelectItem>
                              <SelectItem value="25l-50l">₹25-50 Lakhs</SelectItem>
                              <SelectItem value="above-50l">Above ₹50 Lakhs</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700">
                            Project Timeline
                          </Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (Within 1 month)</SelectItem>
                              <SelectItem value="1-3months">1-3 Months</SelectItem>
                              <SelectItem value="3-6months">3-6 Months</SelectItem>
                              <SelectItem value="6months+">6+ Months</SelectItem>
                              <SelectItem value="planning">Planning Phase</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                            Subject *
                          </Label>
                          <Input
                            id="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Brief subject of your project"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                          Project Requirements *
                        </Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please provide detailed information about your project requirements, specifications, location, and any special considerations..."
                          rows={6}
                          className="border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending Request..."
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Request Quotation
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
