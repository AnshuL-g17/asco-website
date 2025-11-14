import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const experience = formData.get("experience") as string;
    const currentCompany = formData.get("currentCompany") as string;
    const currentSalary = formData.get("currentSalary") as string;
    const expectedSalary = formData.get("expectedSalary") as string;
    const noticePeriod = formData.get("noticePeriod") as string;
    const location = formData.get("location") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File;

    // Check API key
    const apiKey = process.env.RESEND_API_KEY;
    let resend: Resend | null = null;

    if (apiKey) {
      resend = new Resend(apiKey);
    } else {
      console.warn("❗ RESEND_API_KEY missing. Emails will not be sent.");
    }

    // ---------------- SEND EMAILS ----------------
    if (resend) {
      try {
        // Send confirmation email to candidate
        await resend.emails.send({
          from: "ASCO Switchgears <no-reply@ascoswitchgears.com>",
          to: [email],
          subject: "Application Received - ASCO Switchgears Careers",
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #1e40af;">Application Received Successfully!</h2>
              <p>Dear ${name},</p>
              <p>Thank you for applying for the position of <strong>${position}</strong> at ASCO Switchgears.</p>
              <p>Our HR team will review your profile and contact you within 3-5 business days.</p>
              <p>For queries, email: <a href="mailto:ascoswitchgears.inquiry@gmail.com">ascoswitchgears.inquiry@gmail.com</a></p>
              <br/>
              <p>Best regards,<br/><strong>ASCO Switchgears HR Team</strong></p>
            </div>
          `,
        });

        // Send application details to company email
        await resend.emails.send({
          from: "ASCO Website <no-reply@ascoswitchgears.com>",
          to: ["ascoswitchgears.inquiry@gmail.com"],
          subject: `👨‍💼 Career Application - ${position} - ${name}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #dc2626;">👨‍💼 New Career Application</h2>

              <h3>Candidate Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Position:</strong> ${position}</li>
                <li><strong>Experience:</strong> ${experience}</li>
                <li><strong>Location:</strong> ${location}</li>
              </ul>

              <h3>Employment Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td><strong>Current Company</strong></td><td>${currentCompany || "N/A"}</td></tr>
                <tr><td><strong>Current Salary</strong></td><td>${currentSalary || "N/A"} LPA</td></tr>
                <tr><td><strong>Expected Salary</strong></td><td>${expectedSalary || "N/A"} LPA</td></tr>
                <tr><td><strong>Notice Period</strong></td><td>${noticePeriod || "N/A"}</td></tr>
              </table>

              <h3>Message:</h3>
              <p>${message || "No additional details provided."}</p>

              <h3>CV/Resume:</h3>
              <p><strong>${cvFile ? `Uploaded: ${cvFile.name}` : "❌ Not uploaded"}</strong></p>

              <p style="color: #dc2626; font-weight: bold;">⚡ Please review ASAP</p>
            </div>
          `,
        });

        console.log("✅ Career emails sent successfully");
      } catch (error) {
        console.error("❌ Error sending emails:", error);
      }
    }

    // ---------- Log CV File Details ----------
    if (cvFile) {
      console.log("📄 Uploaded CV:", {
        name: cvFile.name,
        sizeMB: (cvFile.size / 1024 / 1024).toFixed(2),
        type: cvFile.type,
      });
    }

    // ---------------- WHATSAPP MESSAGE ----------------
    const whatsappMessage = `
👨‍💼 *New ASCO Career Application*

👤 *Name:* ${name}
💼 *Position:* ${position}
⏱️ *Experience:* ${experience}
📧 *Email:* ${email}
📱 *Phone:* ${phone}

🏢 *Current:* ${currentCompany || "N/A"}
💰 *Salary:* ${currentSalary || "N/A"} LPA
💸 *Expected:* ${expectedSalary || "N/A"} LPA
⏰ *Notice:* ${noticePeriod || "N/A"}
📍 *Location:* ${location}

📄 *CV:* ${cvFile ? "Uploaded" : "Not Uploaded"}

💬 *Message:* ${message || "No message"}
    `.trim();

    const whatsappBusinessNumber = "919592259400";
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappBusinessNumber}&text=${encodeURIComponent(
      whatsappMessage
    )}`;

    await new Promise((resolve) => setTimeout(resolve, 1200));

    return NextResponse.json({
      success: true,
      message:
        "Career application submitted successfully! Our team will contact you within 3-5 working days.",
      whatsappUrl: whatsappApiUrl,
    });
  } catch (error) {
    console.error("❌ API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit career application. Please try again.",
      },
      { status: 500 }
    );
  }
}
