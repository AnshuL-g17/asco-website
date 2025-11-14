import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const apiKey = process.env.RESEND_API_KEY;
    let resend: Resend | null = null;

    if (apiKey) {
      resend = new Resend(apiKey);
    } else {
      console.warn("❗ RESEND_API_KEY missing. Emails will NOT be sent.");
    }

    const emailContent = `
      New Contact Form Submission from ASCO Website
      
      Contact Information:
      - Name: ${name}
      - Email: ${email}
      - Phone: ${phone || "Not provided"}
      - Subject: ${subject}
      
      Message:
      ${message}
      
      Please respond to this inquiry promptly.
    `;

    // ---------------- Send Emails ----------------
    if (resend) {
      try {
        // Send confirmation email to customer
        await resend.emails.send({
          from: "ASCO Switchgears <no-reply@ascoswitchgears.com>",
          to: [email],
          subject: "Thank you for contacting us - ASCO Switchgears",
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #1e40af;">Thank you for contacting us!</h2>
              <p>Dear ${name},</p>
              <p>Your message regarding <strong>${subject}</strong> has been received.</p>
              <p>Our team will get back to you within 24 hours.</p>
              <p>For urgent issues, email: <a href="mailto:ascoswitchgear@gmail.com">ascoswitchgear@gmail.com</a></p>
              <br/>
              <p>Best regards,<br/><strong>ASCO Switchgears Team</strong></p>
            </div>
          `,
        });

        // Send message details to business email
        await resend.emails.send({
          from: "ASCO Website <no-reply@ascoswitchgears.com>",
          to: ["ascoswitchgears.inquiry@gmail.com"],
          subject: `📞 Contact Form: ${subject} - ${name}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #dc2626;">📞 New Contact Form Submission</h2>
              
              <h3>Contact Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
                <li><strong>Subject:</strong> ${subject}</li>
              </ul>

              <h3>Message:</h3>
              <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">
                ${message}
              </p>

              <p style="color: #dc2626; font-weight: bold;">⚡ Respond within 24 hours</p>
            </div>
          `,
        });

        console.log("✅ Contact emails sent successfully");
      } catch (error) {
        console.error("❌ Email sending failed:", error);
      }
    } else {
      console.log("📧 Email prepared (but not sent):", emailContent);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
