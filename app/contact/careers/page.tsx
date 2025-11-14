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
import { Users, Send, CheckCircle, Upload, FileText } from "lucide-react"

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    currentCompany: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    location: "",
    message: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only PDF or Word documents")
        return
      }
      setCvFile(file)
    }
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
      const formDataToSend = new FormData()

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "phone") {
          formDataToSend.append(key, formattedPhone) // Use formatted phone
        } else {
          formDataToSend.append(key, value)
        }
      })

      // Append CV file if selected
      if (cvFile) {
        formDataToSend.append("cv", cvFile)
      }

      formDataToSend.append("type", "career")

      const response = await fetch("/api/send-career", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || "Failed to send career application")
      }
    } catch (error) {
      console.error("Error sending career application:", error)
      alert("Failed to send career application. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      currentCompany: "",
      currentSalary: "",
      expectedSalary: "",
      noticePeriod: "",
      location: "",
      message: "",
    })
    setCvFile(null)
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
              <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Join Our <span className="text-primary">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Be part of India's leading electrical solutions company. We're always looking for talented individuals
                to join our growing team.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Work With ASCO?</h2>
              <p className="text-lg text-slate-600">Join a company that values innovation, growth, and excellence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Growth Opportunities</h3>
                <p className="text-slate-600">
                  Continuous learning and career advancement opportunities in a rapidly growing company
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Innovative Projects</h3>
                <p className="text-slate-600">
                  Work on cutting-edge electrical solutions for prestigious government and private clients
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Competitive Benefits</h3>
                <p className="text-slate-600">
                  Attractive compensation packages, health benefits, and performance-based incentives
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Application Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Apply Now</h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Submit your application and join our team of electrical experts
                </p>
              </div>

              {isSubmitted ? (
                <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
                    <h3 className="text-2xl font-semibold mb-4">Application Submitted!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your interest in joining ASCO. Our HR team will review your application and contact
                      you within 3-5 business days if your profile matches our requirements.
                    </p>
                    <Button onClick={handleReset}>Submit Another Application</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
                          <Label htmlFor="position" className="text-sm font-semibold text-gray-700">
                            Position Applied For *
                          </Label>
                          <Select
                            value={formData.position}
                            onValueChange={(value) => setFormData({ ...formData, position: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electrical-engineer">Electrical Engineer</SelectItem>
                              <SelectItem value="sales-executive">Sales Executive</SelectItem>
                              <SelectItem value="project-manager">Project Manager</SelectItem>
                              <SelectItem value="quality-control">Quality Control Engineer</SelectItem>
                              <SelectItem value="production-supervisor">Production Supervisor</SelectItem>
                              <SelectItem value="business-development">Business Development Manager</SelectItem>
                              <SelectItem value="technical-support">Technical Support Engineer</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="experience" className="text-sm font-semibold text-gray-700">
                            Total Experience *
                          </Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => setFormData({ ...formData, experience: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fresher">Fresher</SelectItem>
                              <SelectItem value="1-2">1-2 Years</SelectItem>
                              <SelectItem value="3-5">3-5 Years</SelectItem>
                              <SelectItem value="6-10">6-10 Years</SelectItem>
                              <SelectItem value="10+">10+ Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                            Preferred Location *
                          </Label>
                          <Select
                            value={formData.location}
                            onValueChange={(value) => setFormData({ ...formData, location: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kapurthala">Kapurthala, Punjab</SelectItem>
                              <SelectItem value="jalandhar">Jalandhar, Punjab</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="ghaziabad">Ghaziabad, UP</SelectItem>
                              <SelectItem value="any">Any Location</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentCompany" className="text-sm font-semibold text-gray-700">
                            Current Company
                          </Label>
                          <Input
                            id="currentCompany"
                            value={formData.currentCompany}
                            onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                            placeholder="Current company name"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="noticePeriod" className="text-sm font-semibold text-gray-700">
                            Notice Period
                          </Label>
                          <Select
                            value={formData.noticePeriod}
                            onValueChange={(value) => setFormData({ ...formData, noticePeriod: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue placeholder="Select notice period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="15-days">15 Days</SelectItem>
                              <SelectItem value="1-month">1 Month</SelectItem>
                              <SelectItem value="2-months">2 Months</SelectItem>
                              <SelectItem value="3-months">3 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentSalary" className="text-sm font-semibold text-gray-700">
                            Current Salary (LPA)
                          </Label>
                          <Input
                            id="currentSalary"
                            value={formData.currentSalary}
                            onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                            placeholder="Current salary in LPA"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expectedSalary" className="text-sm font-semibold text-gray-700">
                            Expected Salary (LPA)
                          </Label>
                          <Input
                            id="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                            placeholder="Expected salary in LPA"
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* CV Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="cv" className="text-sm font-semibold text-gray-700">
                          Upload CV/Resume *
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            id="cv"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                          />
                          <label htmlFor="cv" className="cursor-pointer">
                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">
                              {cvFile ? cvFile.name : "Click to upload your CV/Resume"}
                            </p>
                            <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                          Cover Letter / Additional Information
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about yourself, your achievements, and why you want to join ASCO..."
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
                          "Submitting Application..."
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Submit Application
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
