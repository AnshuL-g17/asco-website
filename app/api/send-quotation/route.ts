import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, projectType, budget, timeline } = body;

    // Initialize Resend only if API key exists
    const apiKey = process.env.RESEND_API_KEY;
    let resend: Resend | null = null;

    if (apiKey) {
      resend = new Resend(apiKey);
    } else {
      console.warn("❗ RESEND_API_KEY is missing. Emails will NOT be sent.");
    }

    // ------------------- SEND EMAILS -------------------
    if (resend) {
      try {
        // 1. Confirmation email to customer
        await resend.emails.send({
          from: "ASCO Switchgears <no-reply@ascoswitchgears.com>",
          to: [email],
          subject: "Quotation Request Received - ASCO Switchgears",
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #1e40af;">Quotation Request Received!</h2>
              <p>Dear ${name},</p>
              <p>Thank you for requesting a quotation from ASCO Switchgears.</p>
              <p><strong>Project:</strong> ${subject}</p>
              <p>Our team will prepare a detailed quotation within 24–48 hours.</p>
              <p>For urgent questions: <a href="mailto:ascoswitchgears.inquiry@gmail.com">ascoswitchgears.inquiry@gmail.com</a></p>
              <br/>
              <p>Best regards,<br/><strong>ASCO Switchgears Team</strong></p>
            </div>
          `,
        });

        // 2. Send details to business inbox
        await resend.emails.send({
          from: "ASCO Website <no-reply@ascoswitchgears.com>",
          to: ["ascoswitchgears.inquiry@gmail.com"],
          subject: `🔧 Quotation Request - ${subject} - ${company}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #dc2626;">🔧 New Quotation Request</h2>

              <h3>Customer Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Company:</strong> ${company}</li>
              </ul>

              <h3>Project Details:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f3f4f6;">
                  <td style="border:1px solid #d1d5db; padding:8px;"><strong>Subject</strong></td>
                  <td style="border:1px solid #d1d5db; padding:8px;">${subject}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #d1d5db; padding:8px;"><strong>Project Type</strong></td>
                  <td style="border:1px solid #d1d5db; padding:8px;">${projectType || "Not specified"}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="border:1px solid #d1d5db; padding:8px;"><strong>Budget Range</strong></td>
                  <td style="border:1px solid #d1d5db; padding:8px;">${budget || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #d1d5db; padding:8px;"><strong>Timeline</strong></td>
                  <td style="border:1px solid #d1d5db; padding:8px;">${timeline || "Not specified"}</td>
                </tr>
              </table>

              <h3>Project Requirements:</h3>
              <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">
                ${message}
              </p>

              <p style="color:#dc2626; font-weight:bold;">⚡ Please prepare quotation within 24–48 hours!</p>
            </div>
          `,
        });

        console.log("✅ Quotation request emails sent successfully");
      } catch (emailError) {
        console.error("❌ Error sending quotation email:", emailError);
      }
    } else {
      console.log("📧 Email prepared but not sent (no API key):", {
        name,
        email,
        phone,
        subject,
        company,
        message,
      });
    }

    // ------------------- WHATSAPP MESSAGE -------------------
    const whatsappMessage = `
🔧 *New ASCO Quotation Request*

👤 *Customer:* ${name}
🏢 *Company:* ${company}
📧 *Email:* ${email}
📱 *Phone:* ${phone}

📋 *Project Details:*
🔹 Type: ${projectType || "Not specified"}
💰 Budget: ${budget || "Not specified"}
⏰ Timeline: ${timeline || "Not specified"}

📝 *Subject:* ${subject}

💬 *Requirements:*
${message}

⚡ Please prepare the quotation within 24–48 hours!
    `.trim();

    const whatsappBusinessNumber = "919592259400";
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappBusinessNumber}&text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Delay to simulate sending time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Quotation request sent successfully!",
      whatsappUrl: whatsappApiUrl,
    });
  } catch (error) {
    console.error("❌ Error in Quotation Request API:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send quotation request. Please try again." },
      { status: 500 }
    );
  }
}
