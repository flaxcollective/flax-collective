export async function verifyRecaptcha(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.warn("RECAPTCHA_SECRET_KEY is not configured in environment variables. Skipping validation.");
      return true; // Fail-open if not configured to prevent blocking deployment
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json() as { success: boolean };
    return !!data.success;
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return false;
  }
}
