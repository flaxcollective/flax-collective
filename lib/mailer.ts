import nodemailer from "nodemailer";

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Support Team" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Your OTP for resetting your password is:</p>
          <h1 style="color: #0070f3;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}