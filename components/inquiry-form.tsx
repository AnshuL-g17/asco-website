"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Send, CheckCircle, Building, User } from "lucide-react"
import { useInquiryCart } from "@/lib/inquiry-cart"

interface InquiryFormProps {
  onBack: () => void
  onClose: () => void
}

export function InquiryForm({ onBack, onClose }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { items, clearCart } = useInquiryCart()

  const [formData, setFormData] = useState({
    customerType: "company", // Added customer type selection
    name: "",
    email: "",
    phone: "",
    company: "",
    gstNumber: "", // Added GST number for companies
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
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: {
            ...formData,
            phone: formattedPhone, // Use formatted phone
          },
          inquiryItems: items.map((item) => ({
            name: item.product.selectedVariant
              ? `${item.product.name} (${item.product.selectedVariant})`
              : item.product.name,
            category: item.product.category,
            quantity: item.quantity,
            specifications: item.notes || "Standard",
            variant: item.product.selectedVariant || "Standard",
          })),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || "Failed to send inquiry")
      }
    } catch (error) {
      console.error("Error sending inquiry:", error)
      alert("Failed to send inquiry. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleComplete = () => {
    clearCart()
    setIsSubmitted(false)
    onClose()
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="text-xl font-semibold">Inquiry Sent Successfully!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for your inquiry. Our team will review your requirements and get back to you within 24 hours.
        </p>
        <Button onClick={handleComplete}>Continue Browsing</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
      <div className="flex items-center gap-2 flex-shrink-0 pb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">Send Inquiry</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 min-h-0">
        <Card className="shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]">
          <CardHeader>
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.product.selectedVariant || "default"}-${index}`}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {item.product.selectedVariant
                      ? `${item.product.name} (${item.product.selectedVariant})`
                      : item.product.name}
                  </div>
                  <div className="text-muted-foreground">Qty: {item.quantity}</div>
                  {item.notes && <div className="text-xs text-muted-foreground mt-1">Notes: {item.notes}</div>}
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total Items:</span>
              <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
          </CardContent>
        </Card>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-lg border shadow-[8px_0_16px_rgba(6,182,212,0.3),-8px_0_16px_rgba(239,68,68,0.3)]"
        >
          <div className="space-y-3">
            <Label>I am inquiring as *</Label>
            <RadioGroup
              value={formData.customerType}
              onValueChange={(value) => setFormData({ ...formData, customerType: value })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Individual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="flex items-center gap-2 cursor-pointer">
                  <Building className="h-4 w-4" />
                  Company/Business
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                pattern="[^\s@]+@[^\s@]+\.(com|in|co|org|net|edu|gov|co\.in|co\.uk)"
                title="Please enter a valid email address (e.g., user@example.com, user@example.in)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX or XXXXXXXXXX"
                pattern="(\+?\d{1,3}[\s-]?)?\d{10,}"
                title="Enter 10-digit number (India +91 assumed) or with country code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                {formData.customerType === "company" ? "Company Name *" : "Company (Optional)"}
              </Label>
              <Input
                id="company"
                required={formData.customerType === "company"}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company name"
              />
            </div>
          </div>

          {formData.customerType === "company" && (
            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number (Optional)</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                placeholder="Enter GST number if applicable"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Additional Requirements</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe your specific requirements, timeline, or any other details..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Sending Inquiry..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
