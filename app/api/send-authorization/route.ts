import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      designation,
      companyAddress,
      gstNumber,
      panNumber,
      message,
      selectedPlatforms,
    } = body

    // Map platform IDs to full names
    const platformNames = {
      gem: "GEM (Government e-Marketplace)",
      ireps: "IREPS (Indian Railway e-Procurement System)",
      eprocurement: "E-Procurement",
      nprocurement: "N-Procurement",
      mstc: "MSTC",
    }

    const selectedPlatformNames = selectedPlatforms.map(
      (id: string) => platformNames[id as keyof typeof platformNames] || id,
    )

    if (process.env.RESEND_API_KEY) {
      try {
        // Send confirmation email to customer
        await resend.emails.send({
          from: "ASCO Switchgears <no-reply@ascoswitchgears.com>",
          to: [email],
          subject: "Authorization Request Received - ASCO Switchgears",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">Authorization Request Received!</h2>
              <p>Dear ${name},</p>
              <p>We have received your authorization request for the following platforms:</p>
              <ul>
                ${selectedPlatformNames.map((platform: string) => `<li>${platform}</li>`).join("")}
              </ul>
              <p>Our team will guide you through the authorization process and contact you within 24-48 hours.</p>
              <p>If you have any urgent questions, please contact us at <a href="mailto:ascoswitchgears.inquiry@gmail.com">ascoswitchgears.inquiry@gmail.com</a>.</p>
              <br>
              <p>Best regards,<br><strong>ASCO Switchgears Team</strong></p>
            </div>
          `,
        })

        // Send authorization request details to business email
        await resend.emails.send({
          from: "ASCO Website <no-reply@ascoswitchgears.com>",
          to: ["ascoswitchgears.inquiry@gmail.com"],
          subject: `🔐 Authorization Request - ${company} (${name})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">🔐 New Platform Authorization Request</h2>
              
              <h3>Contact Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                <li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>
                <li><strong>Company:</strong> ${company}</li>
                <li><strong>Designation:</strong> ${designation}</li>
              </ul>
              
              <h3>Company Details:</h3>
              <ul>
                <li><strong>Address:</strong> ${companyAddress}</li>
                ${gstNumber ? `<li><strong>GST Number:</strong> ${gstNumber}</li>` : ""}
                ${panNumber ? `<li><strong>PAN Number:</strong> ${panNumber}</li>` : ""}
              </ul>
              
              <h3>Requested Platforms (${selectedPlatforms.length}):</h3>
              <ol>
                ${selectedPlatformNames.map((platform: string) => `<li style="margin: 5px 0;">${platform}</li>`).join("")}
              </ol>
              
              <h3>Additional Information:</h3>
              <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">
                ${message || "No additional information provided"}
              </p>
              
              <p style="color: #dc2626; font-weight: bold;">⚡ Please assist with authorization process within 24-48 hours.</p>
            </div>
          `,
        })

        console.log("✅ Authorization request emails sent successfully")
      } catch (emailError) {
        console.error("❌ Error sending authorization emails:", emailError)
      }
    }

    // WhatsApp message for authorization request
    const whatsappMessage = `
🔐 *New ASCO Authorization Request*

👤 *Contact:* ${name}
🏢 *Company:* ${company}
💼 *Designation:* ${designation}
📧 *Email:* ${email}
📱 *Phone:* ${phone}

🏭 *Company Details:*
📍 *Address:* ${companyAddress}
${gstNumber ? `🧾 *GST:* ${gstNumber}` : ""}
${panNumber ? `🆔 *PAN:* ${panNumber}` : ""}

🌐 *Platforms (${selectedPlatforms.length}):*
${selectedPlatformNames.map((platform: string, index: number) => `${index + 1}. ${platform}`).join("\n")}

${message ? `💬 *Additional Info:* ${message}` : ""}

⚡ Please assist with authorization process!
    `.trim()

    // WhatsApp Business API integration
    const whatsappBusinessNumber = "919592259400"
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappBusinessNumber}&text=${encodeURIComponent(whatsappMessage)}`

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message:
        "Authorization request sent successfully! Our team will guide you through the process within 24-48 hours.",
      whatsappUrl: whatsappApiUrl,
    })
  } catch (error) {
    console.error("Error sending authorization request:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send authorization request. Please try again." },
      { status: 500 },
    )
  }
}
