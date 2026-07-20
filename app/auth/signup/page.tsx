"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";
import { Eye, EyeOff } from "lucide-react";
import "@/app/styles/dashboard/dashboard-home.css"
import { countries } from "@/data/countries";
import { indianStates } from "@/data/states";
import { useSearchParams } from "next/navigation";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import ReCaptcha from "@/components/shared/ReCaptcha";

const CustomGoogleButton = ({ onSuccess }: { onSuccess: (res: any) => void }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess({ credential: tokenResponse.access_token }),
    onError: () => alert('Google Login Failed'),
  });

  return (
    <a onClick={(e) => { e.preventDefault(); login(); }} className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition shadow-sm cursor-pointer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-5 h-5 pointer-events-none" alt="Google" />
    </a>
  );
};

const SignupPage = () => {
  const [role, setRole] = useState("student");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      setRole(roleParam);
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    country: "",
    state: "",
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleChange = (e: any) => {
    if (e.target.name === "country") {
      setForm({ ...form, country: e.target.value, state: "" });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!/[a-zA-Z]/.test(form.name)) {
      alert("Full Name must contain letters");
      return;
    }

    if (form.phone && !/^\d+$/.test(form.phone)) {
      alert("Phone number must contain only numbers");
      return;
    }

    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.country) {
      alert("Please select a country");
      return;
    }

    if (!form.state) {
      alert("Please select a state");
      return;
    }

    if (!/[a-zA-Z]/.test(form.city)) {
      alert("City name must contain letters");
      return;
    }

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          recaptchaToken,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(30);
        setOtpError("");
        setRecaptchaToken(null);
      } else {
        alert(data.message || "Failed to send verification code. Please check your data.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setOtpError("Please enter a valid 6-digit verification code");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          usertype: role,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/auth/successfullpage";
      } else {
        setOtpError(data.message || "Invalid verification code or expired");
      }
    } catch (error) {
      setOtpError("Something went wrong. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, isResend: true }),
      });

      const data = await res.json();

      if (res.ok) {
        setCountdown(30);
        setOtp("");
      } else {
        setOtpError(data.message || "Failed to resend verification code");
      }
    } catch (err) {
      setOtpError("Failed to resend verification code");
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch("/api/auth/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "google",
          token: credentialResponse.credential,
          usertype: role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/auth/successfullpage";
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="signstarted-bg w-full flex items-center justify-center">
      <div className="signupstarted-card">
        {/* Logo */}
        <Link href="/" className="block mb-2.5 text-center">
          <img
            src="/assets/images/logo/flax-square-logo.png"
            alt="Logo"
            className="getstarted-logo mx-auto"
          />
        </Link>

        {otpSent ? (
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center">
              <h2 className="onboarding-heading">Verify Your Email</h2>
              <p className="text-center text-sm text-gray-500 mb-6">
                We sent a 6-digit code to <strong className="text-gray-700">{form.email}</strong>.
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="text-sm font-semibold block text-[#202020] mb-2 text-center">Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 text-center text-sm tracking-[10px] font-bold border bg-[#F0F0F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#979797]"
                  required
                />
              </div>

              {otpError && (
                <p className="text-red-600 text-sm text-center font-medium">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={otpLoading}
                className="getstarted-btn w-full cursor-pointer mt-2"
              >
                {otpLoading ? "Verifying..." : "Verify & Sign Up"}
              </button>

              <div className="flex justify-between items-center text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-gray-500 hover:text-black underline cursor-pointer"
                >
                  Edit Details
                </button>

                {countdown > 0 ? (
                  <span className="text-gray-500">Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendLoading}
                    className="text-navy hover:text-black font-semibold underline cursor-pointer disabled:opacity-50"
                  >
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <>
            <h2 className="onboarding-heading">
              Let's Get You Started
            </h2>

            <p className="text-center onboarding-para">
              Sign in or create an account to begin your journey.
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-lg font-semibold">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold">Phone</label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      className="w-[100px] mt-1 px-2 py-2 border bg-[#F0F0F0] rounded-md focus:outline-none"
                    >
                      {countries?.length ? (
                        countries.map((c, index) => (
                          <option key={`${c.iso}-${c.code}-${index}`} value={c.code}>
                            {c.iso} ({c.code})
                          </option>
                        ))
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select>
                    <input
                      type="number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone"
                      className="flex-1 mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-lg font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md focus:outline-none"
                    required
                  >
                    <option value="" disabled>Select Country</option>
                    {countries?.map((c, index) => (
                      <option key={`${c.iso}-${index}`} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-lg font-semibold">State</label>
                  {form.country === "India" ? (
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md focus:outline-none"
                      required
                    >
                      <option value="" disabled>Select State</option>
                      {indianStates?.map((s, index) => (
                        <option key={`state-${index}`} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="text-lg font-semibold">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="flax-eye-icon">
                <label className="text-lg font-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md pr-10"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {form.password.length > 0 && (
                <div className="text-sm mt-1 mb-2">
                  <p className={form.password.length >= 6 ? "text-green-600" : "text-gray-500"}>
                    {form.password.length >= 6 ? "✓" : "○"} At least 6 characters
                  </p>
                  <p className={/[A-Z]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                    {/[A-Z]/.test(form.password) ? "✓" : "○"} Contains a capital letter
                  </p>
                  <p className={/[a-z]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                    {/[a-z]/.test(form.password) ? "✓" : "○"} Contains a small letter
                  </p>
                  <p className={/[0-9]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                    {/[0-9]/.test(form.password) ? "✓" : "○"} Contains a number
                  </p>
                </div>
              )}

              <div className="flax-eye-icon">
                <label className="text-lg font-semibold">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md pr-10"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <ReCaptcha onVerify={setRecaptchaToken} />

              <button
                type="submit"
                disabled={loading || !recaptchaToken}
                className="getstarted-btn w-full cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Submit"}
              </button>
            </form>

            <p className="text-center text-lg mt-3">
              Already have an account?
              <Link href="/auth/login" className="underline ml-1">
                Login
              </Link>
            </p>
          </>
        )}

        <div className="divider">
          <div className="line-dark"></div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <CustomGoogleButton onSuccess={handleGoogleSuccess} />
          </GoogleOAuthProvider>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100 font-medium">
          <Link href="/about" className="hover:underline">About Us</Link>
          <span>•</span>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
          <span>•</span>
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms-conditions" className="hover:underline">Terms &amp; Conditions</Link>
          <span>•</span>
          <Link href="/refund-policy" className="hover:underline">Refund &amp; Cancellation Policy</Link>
        </div>
      </div>
    </div>
  );
};


export default SignupPage;