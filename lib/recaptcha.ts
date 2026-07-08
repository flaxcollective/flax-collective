export async function verifyRecaptcha(token: string | null | undefined): Promise<boolean> {
  if (process.env.NODE_ENV === "development") {
    console.log("[reCAPTCHA] Development mode: bypassing verification.");
    return true;
  }
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

    const data = await response.json() as { success: boolean; "error-codes"?: string[] };
    console.log("[reCAPTCHA validation response]:", JSON.stringify(data));
    return !!data.success;
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return false;
  }
}
