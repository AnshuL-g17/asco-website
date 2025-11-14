import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerInfo, inquiryItems } = body;

    const apiKey = process.env.RESEND_API_KEY;
    let resend: Resend | null = null;

    if (apiKey) {
      resend = new Resend(apiKey);
    } else {
      console.warn("❗ RESEND_API_KEY is missing. Emails will NOT be sent.");
    }

    const emailContent = `
      New Product Inquiry from ASCO Website
      
      Customer Information:
      - Customer Type: ${
        customerInfo.customerType === "company" ? "Company/Business" : "Individual"
      }
      - Name: ${customerInfo.name}
      - Email: ${customerInfo.email}
      - Phone: ${customerInfo.phone}
      - Company: ${customerInfo.company || "N/A"}
      ${customerInfo.gstNumber ? `- GST Number: ${customerInfo.gstNumber}` : ""}
      - Message: ${customerInfo.message || "No additional message"}

      Inquiry Items:
      ${inquiryItems
        .map(
          (item: any, index: number) => `
        ${index + 1}. ${item.name}
           Category: ${item.category}
           Quantity: ${item.quantity}
           Variant: ${item.variant || "Standard"}
           Specifications: ${item.specifications || "Standard"}
      `
        )
        .join("")}

      Total Items: ${inquiryItems.length}

      Please respond to this inquiry promptly.
    `;

    // ---------------- Send Emails ----------------
    if (resend) {
      try {
        // Confirmation email to customer
        await resend.emails.send({
          from: "ASCO Switchgears <no-reply@ascoswitchgears.com>",
          to: [customerInfo.email],
          subject: "Thank you for your inquiry - ASCO Switchgears",
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #1e40af;">Thank you for your inquiry!</h2>
              <p>Dear ${customerInfo.name},</p>
              <p>We have received your inquiry for the following products:</p>
              <ul>
                ${inquiryItems
                  .map(
                    (item: any) =>
                      `<li><strong>${item.name}</strong> - Quantity: ${item.quantity}</li>`
                  )
                  .join("")}
              </ul>
              <p>Our team will get back to you within 24 hours with a detailed quotation.</p>
              <p>For urgent questions: <a href="mailto:ascoswitchgear@gmail.com">ascoswitchgear@gmail.com</a></p>
              <br/>
              <p>Best regards,<br/><strong>ASCO Switchgears Team</strong></p>
            </div>
          `,
        });

        // Inquiry details to business email
        await resend.emails.send({
          from: "ASCO Website <no-reply@ascoswitchgears.com>",
          to: ["ascoswitchgears.inquiry@gmail.com"],
          subject: `New Product Inquiry from ${customerInfo.name}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2 style="color: #dc2626;">🔧 New Product Inquiry</h2>

              <h3>Customer Information:</h3>
              <ul>
                <li><strong>Customer Type:</strong> ${
                  customerInfo.customerType === "company"
                    ? "Company/Business"
                    : "Individual"
                }</li>
                <li><strong>Name:</strong> ${customerInfo.name}</li>
                <li><strong>Email:</strong> ${customerInfo.email}</li>
                <li><strong>Phone:</strong> ${customerInfo.phone}</li>
                <li><strong>Company:</strong> ${customerInfo.company || "N/A"}</li>
                ${customerInfo.gstNumber ? `<li><strong>GST:</strong> ${customerInfo.gstNumber}</li>` : ""}
              </ul>

              <h3>Inquiry Items:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="border: 1px solid #d1d5db; padding: 8px;">Product</th>
                    <th style="border: 1px solid #d1d5db; padding: 8px;">Category</th>
                    <th style="border: 1px solid #d1d5db; padding: 8px;">Variant</th>
                    <th style="border: 1px solid #d1d5db; padding: 8px;">Quantity</th>
                    <th style="border: 1px solid #d1d5db; padding: 8px;">Specifications</th>
                  </tr>
                </thead>
                <tbody>
                  ${inquiryItems
                    .map(
                      (item: any) => `
                    <tr>
                      <td style="border: 1px solid #d1d5db; padding: 8px;">${item.name}</td>
                      <td style="border: 1px solid #d1d5db; padding: 8px;">${item.category}</td>
                      <td style="border: 1px solid #d1d5db; padding: 8px;">${item.variant || "Standard"}</td>
                      <td style="border: 1px solid #d1d5db; padding: 8px;">${item.quantity}</td>
                      <td style="border: 1px solid #d1d5db; padding: 8px;">${item.specifications || "Standard"}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>

              <h3>Additional Message:</h3>
              <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6;">
                ${customerInfo.message || "No additional message"}
              </p>

              <p><strong>Total Items:</strong> ${inquiryItems.length}</p>
              <p style="color: #dc2626; font-weight: bold;">⚡ Respond within 24 hours</p>
            </div>
          `,
        });

        console.log("✅ Product inquiry emails sent");
      } catch (error) {
        console.error("❌ Error sending inquiry emails:", error);
      }
    } else {
      console.log("📧 Inquiry email prepared (RESEND_API_KEY missing):", emailContent);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully! We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("❌ Product Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}
