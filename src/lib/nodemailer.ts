import { VerifyEmail } from "@/emails/verify";
import { render } from "@react-email/render";
import nodemailer, { Transporter } from "nodemailer";
import { generateVerificationToken } from "@/lib/tokens";

// Create a nodemailer transporter
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  service: process.env.SMTP_SERVICE,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_MAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string): Promise<void> {
  try {
    const verificationData = await generateVerificationToken(email);
    const url = `http://localhost:3000/auth/verify?token=${verificationData.token}`;
    const emailHtml = render(VerifyEmail({ url }));
    await transporter.sendMail({
      from: `no.reply@casestore.com<${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "Verify Your Email",
      html: emailHtml,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}
