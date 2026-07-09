import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

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