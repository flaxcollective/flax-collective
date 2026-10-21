import nodemailer from "nodemailer";

// Singleton transporter to enable connection pooling and reduce latency
let transporterInstance: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporterInstance) return transporterInstance;

  const mailUser = process.env.MAIL_USER?.trim();
  const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

  if (!mailUser || !mailPass) return null;

  transporterInstance = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass,
    },
    // Crucial for performance: Keep the connection open to avoid TLS handshake on every email
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  return transporterInstance;
}

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendOTPEmail invoked for: ${email}`);
    console.log(`[MAILER] MAIL_USER: ${mailUser ? mailUser : "NOT CONFIGURED"}`);
    console.log(`[MAILER] MAIL_PASS: ${mailPass ? "CONFIGURED (length: " + mailPass.length + ")" : "NOT CONFIGURED"}`);
    console.log(`[MAILER] [BACKUP OTP] The generated OTP is: ${otp}`);

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking email sending.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Password Reset OTP | OTP: ${otp}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"Flax Collective" <${mailUser}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is: ${otp}. This OTP is valid for 5 minutes. If you did not request this, please ignore this email.`,
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

    console.log(`[MAILER] Sending real password reset email to: ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending email:", error);
    return false;
  }
}

export async function sendSignupOTPEmail(email: string, otp: string) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendSignupOTPEmail invoked for: ${email}`);
    console.log(`[MAILER] MAIL_USER: ${mailUser ? mailUser : "NOT CONFIGURED"}`);
    console.log(`[MAILER] MAIL_PASS: ${mailPass ? "CONFIGURED (length: " + mailPass.length + ")" : "NOT CONFIGURED"}`);
    console.log(`[MAILER] [BACKUP OTP] The generated OTP is: ${otp}`);

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking email sending.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Email Verification OTP | OTP: ${otp}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"Flax Collective" <${mailUser}>`,
      to: email,
      subject: "Email Verification OTP",
      text: `Thank you for registering! To complete your signup process, please use the following OTP: ${otp}. This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
          <h2 style="color: #2F3E56; text-align: center;">Verify Your Email Address</h2>
          <p style="font-size: 16px; color: #555;">Thank you for registering! To complete your signup process, please use the following OTP:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2F3E56; background-color: #f7f7f7; padding: 10px 20px; border-radius: 5px; border: 1px dashed #2F3E56;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for 5 minutes.</p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">If you did not request this verification, please ignore this email.</p>
        </div>
      `,
    };

    console.log(`[MAILER] Sending real signup OTP email to: ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Signup Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending signup email:", error);
    return false;
  }
}

export async function sendEnrollmentSuccessEmail(email: string, studentName: string, courseName: string) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendEnrollmentSuccessEmail invoked for: ${email}`);
    console.log(`[MAILER] MAIL_USER: ${mailUser ? mailUser : "NOT CONFIGURED"}`);

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking email sending.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Enrollment Confirmed | Course: ${courseName}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"FLAX Collective" <${mailUser}>`,
      to: email,
      subject: `Enrollment Confirmed: ${courseName}`,
      text: `Hello ${studentName},\n\nCongratulations! Your enrollment in the course "${courseName}" has been successfully confirmed. We are excited to have you join us.\n\nBest regards,\nFLAX Collective Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
          <h2 style="color: #2F3E56; text-align: center;">Enrollment Confirmed!</h2>
          <p style="font-size: 16px; color: #555;">Hello <strong>${studentName}</strong>,</p>
          <p style="font-size: 16px; color: #555;">Congratulations! Your enrollment in the course <strong>${courseName}</strong> has been successfully confirmed.</p>
          <p style="font-size: 16px; color: #555;">We are excited to guide you on this learning journey. Our coordinators will contact you shortly with the onboarding details and course schedule.</p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">Best regards,<br/><strong>FLAX Collective Team</strong></p>
        </div>
      `,
    };

    console.log(`[MAILER] Sending real enrollment confirmation email to: ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Enrollment confirmation email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending enrollment confirmation email:", error);
    return false;
  }
}

export async function sendDeleteUserOTPEmail(email: string, otp: string, userName: string, adminEmail: string) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendDeleteUserOTPEmail invoked for: ${email}`);
    console.log(`[MAILER] MAIL_USER: ${mailUser ? mailUser : "NOT CONFIGURED"}`);
    console.log(`[MAILER] [BACKUP OTP] The generated OTP is: ${otp}`);

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking email sending.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Admin Action - Delete User Verification | OTP: ${otp}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"Security Team" <${mailUser}>`,
      to: email,
      subject: "Security Alert: Admin Action Required - Delete User Verification",
      text: `An administrator (${adminEmail}) has requested to delete the user "${userName}". To confirm this action, please enter the following OTP: ${otp}. This OTP is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
          <h2 style="color: #DC2626; text-align: center;">Security Alert: User Deletion Request</h2>
          <p style="font-size: 16px; color: #333;">An administrator (<strong>${adminEmail}</strong>) has initiated a request to delete the user: <strong>${userName}</strong>.</p>
          <p style="font-size: 16px; color: #555;">To authorize and confirm this permanent deletion, please use the following OTP:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #DC2626; background-color: #fef2f2; padding: 10px 20px; border-radius: 5px; border: 1px dashed #DC2626;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">This OTP is valid for 5 minutes.</p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">If you did not authorize this action, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Delete User OTP Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending delete user OTP email:", error);
    return false;
  }
}

export async function sendExamEnrollmentSuccessEmail(email: string, studentName: string, examName: string) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendExamEnrollmentSuccessEmail invoked for: ${email}`);

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking email sending.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Exam Registration Confirmed | Exam: ${examName}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"FLAX Collective" <${mailUser}>`,
      to: email,
      subject: `Exam Registration Confirmed: ${examName}`,
      text: `Hello ${studentName},\n\nCongratulations! Your registration for the certification exam "${examName}" has been successfully confirmed. You can now start the exam from your dashboard under E-Certification.\n\nBest regards,\nFLAX Collective Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
          <h2 style="color: #6E7C3A; text-align: center;">Exam Registration Confirmed!</h2>
          <p style="font-size: 16px; color: #555;">Hello <strong>${studentName}</strong>,</p>
          <p style="font-size: 16px; color: #555;">Congratulations! Your registration for the certification exam <strong>${examName}</strong> has been successfully confirmed.</p>
          <p style="font-size: 16px; color: #555;">You can now start your exam from the student portal. Navigate to <strong>Courses -> E-Certification</strong> in your dashboard to begin the session at your convenience.</p>
          <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">Best regards,<br/><strong>FLAX Collective Team</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Exam confirmation email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending exam confirmation email:", error);
    return false;
  }
}

export async function sendPaymentReminderEmail({
  email,
  studentName,
  itemName,
  itemType = "Course",
  amount,
  paymentUrl,
}: {
  email: string;
  studentName: string;
  itemName: string;
  itemType?: string;
  amount: number;
  paymentUrl?: string;
}) {
  try {
    const mailUser = process.env.MAIL_USER?.trim();
    const mailPass = process.env.MAIL_PASS?.replace(/"/g, "").trim();

    console.log(`[MAILER] sendPaymentReminderEmail invoked for: ${email}`);

    const isExam = itemType.toLowerCase() === "exam";
    const itemNoun = isExam ? "Certification Exam" : "Course";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flaxcollective.com";
    const actionUrl = paymentUrl || `${baseUrl}/programs`;

    if (!mailUser || !mailPass) {
      console.warn("⚠️ MAIL_USER or MAIL_PASS is not configured. Mocking payment reminder email.");
      console.log(`✉️ [MOCK EMAIL] To: ${email} | Subject: Complete Your Payment for ${itemName} | Amount: ₹${amount}`);
      return true;
    }

    const transporter = getTransporter();
    if (!transporter) throw new Error("Transporter not initialized");

    const mailOptions = {
      from: `"FLAX Collective" <${mailUser}>`,
      to: email,
      subject: `Action Required: Complete Your Payment for ${itemName}`,
      text: `Hello ${studentName},\n\nWe noticed you recently started registration for "${itemName}" (${itemNoun}), but your payment of ₹${amount.toLocaleString()} is currently pending.\n\nTo secure your enrollment and unlock your learning materials, please complete your payment using this link: ${actionUrl}\n\nIf you have any questions or already completed payment, please feel free to reach out to us.\n\nBest regards,\nFLAX Collective Team`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #2F3E56; padding: 28px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">FLAX Collective</h1>
            <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 13px;">Enrollment & Payment Reminder</p>
          </div>

          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; color: #1e293b; margin-top: 0;">Hello <strong>${studentName}</strong>,</p>
            
            <p style="font-size: 15px; color: #475569; line-height: 1.6;">
              Thank you for choosing <strong>FLAX Collective</strong>! We noticed that your registration for the following ${itemNoun.toLowerCase()} was initiated, but the payment is still marked as <strong>pending</strong>:
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <div style="font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Registered Program</div>
              <div style="font-size: 17px; color: #0f172a; font-weight: 700; margin: 4px 0 12px 0;">${itemName}</div>
              
              <div style="display: flex; justify-content: space-between; border-top: 1px dashed #cbd5e1; padding-top: 12px; margin-top: 12px;">
                <span style="font-size: 14px; color: #475569; font-weight: 600;">Total Fee Payable:</span>
                <span style="font-size: 18px; color: #2F3E56; font-weight: 800;">₹ ${amount.toLocaleString()}</span>
              </div>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${actionUrl}" style="display: inline-block; background-color: #2F3E56; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 36px; border-radius: 10px; box-shadow: 0 4px 12px rgba(47, 62, 86, 0.25);">
                Complete Payment Now →
              </a>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 10px;">Click the button above to safely complete your checkout</p>
            </div>

            <p style="font-size: 13px; color: #64748b; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 20px;">
              Need help? If you have already paid or have questions regarding your enrollment, simply reply to this email or contact our support team.
            </p>

            <div style="margin-top: 24px; font-size: 13px; color: #334155;">
              Warm regards,<br/>
              <strong>FLAX Collective Team</strong>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
            © ${new Date().getFullYear()} FLAX Collective. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[MAILER] Payment reminder email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("[MAILER] Error sending payment reminder email:", error);
    return false;
  }
}