import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, company, email } = await req.json();

    if (!name || !company || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_API_KEY) {
      console.error("Missing EMAIL_API_KEY in environment variables");
      return NextResponse.json(
        { message: "Server email configuration is missing" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SPL Leads <onboarding@resend.dev>",
        to: [process.env.MAIL_TO || "viviana.gallo@ceramicas-lourdes.com.ar"],
        cc: [process.env.MAIL_CC || "nbrandoni.exe@gmail.com"],
        subject: "Landing Lead",
        text: `New Lead Received\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}`,
        html: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return NextResponse.json(
        { message: "Failed to send email", error: data },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}