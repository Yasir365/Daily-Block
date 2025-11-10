import UserModel from "@/models/UserModel";
import VerificationCode from "@/models/VerificationCode";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// You can later integrate a mail service here (like Nodemailer, Resend, or SendGrid)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists in the system
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    // ✅ Generate a random 5-letter (alphanumeric) verification code
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Save or update verification record
    await VerificationCode.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );
    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🔐 Your Daily Block Verification Code",
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      
      <div style="background-color: #111827; padding: 20px; text-align: center;">
        <h1 style="color: #facc15; font-size: 24px; margin: 0;">Daily Block</h1>
      </div>

      <div style="padding: 30px 40px; color: #374151;">
        <h2 style="color: #111827; margin-bottom: 16px;">🔐 Verify Your Email</h2>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 12px;">
          Hello,
        </p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for signing in to <strong>Daily Block</strong>. Please use the verification code below to complete your process.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            font-size: 32px;
            letter-spacing: 6px;
            font-weight: bold;
            color: #111827;
            background: #facc15;
            padding: 15px 35px;
            border-radius: 8px;
            display: inline-block;
          ">${code}</span>
        </div>

        <p style="font-size: 15px; color: #6b7280;">
          This code will expire in <strong>10 minutes</strong>.
        </p>

        <p style="font-size: 15px; color: #6b7280; margin-top: 30px;">
          If you didn’t request this code, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color: #f9fafb; text-align: center; padding: 16px; font-size: 14px; color: #9ca3af;">
        © ${new Date().getFullYear()} Daily Block. All rights reserved.
      </div>
    </div>
  </div>
  `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    // For demo, just return the code
    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully!",
      code, // remove this in production
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
