import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Smart Al-Habsi <onboarding@resend.dev>", // ملاحظة: يجب تغيير هذا لبريد موثق في الإنتاج
      to: "amer140106@gmail.com",
      subject: `استفسار جديد: ${type} - من ${name}`,
      react: (
        <ContactEmailTemplate
          name={name}
          email={email}
          phone={phone}
          type={type}
          message={message}
        />
      ),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
