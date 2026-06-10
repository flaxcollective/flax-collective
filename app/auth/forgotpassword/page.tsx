"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "@/app/styles/auth/GetStarted.css";
import { Eye, EyeOff } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  // Send OTP
  const handleSendOTP = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setSuccess("OTP sent to your email");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("OTP has been resent successfully!");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otpSent) {
      setError("Please send OTP to your email first.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    setSubmitLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsResetSuccess(true);
        setSuccess(" Your password has been reset successfully!");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 3000);
      } else {
        setError(data.message || "Invalid OTP or expired");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="signstarted-bg w-full min-h-screen flex items-center justify-center px-4">
      <div className="signupstarted-card forgot-logo w-full max-w-md mx-auto">

        {/* Logo */}
        <Link href="/" className="block text-center mb-3 group">
          <img
            src="/assets/images/logo/flax-square-logo.png"
            alt="Flax"
            className="mx-auto w-40 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-[#202020]">Trouble Logging In?</h2>
          <p className="text-base text-text-body mt-2">
            Forgot your password? No worries. We'll help you get back in.
          </p>
        </div>

        {isResetSuccess ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-green-600">Password Reset Successful!</h3>
            <p className="text-gray-600">
              Your password has been updated successfully.<br />
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="grid gap-2 w-full max-w-sm">

            {/* Email + Send OTP inline */}
            <div className="forget_btn space-y-1">
              <Label className="text-[16px] text-[#202020]">Email Address</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full mt-1 px-3 py-5 border bg-[#F0F0F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#979797]"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading || !email}
                  className=""
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
              {otpSent && (
                <p className="otp-send text-sm">OTP sent to your email</p>
              )}
            </div>

            {/* OTP */}
            <div className="space-y-1">
              <Label className="text-[16px] text-[#202020]">OTP</Label>
              <Input
                type="text"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full mt-1 px-3 py-5 border bg-[#F0F0F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#979797]"
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-1 relative">
              <Label className="text-[16px] text-[#202020]">New Password</Label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-3 py-5 pr-10 border bg-[#F0F0F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#979797]"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <p className="text-xs mt-1 text-gray-500">
              Password must include uppercase, lowercase, number & symbol
            </p>
            {/* Confirm Password */}
            <div className="space-y-1 relative">
              <Label className="text-[16px] text-[#202020]">Confirm New Password</Label>

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-3 py-5 pr-10 border bg-[#F0F0F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#979797]"
                required
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && !isResetSuccess && <p className="text-green-600 text-sm text-center">{success}</p>}

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={submitLoading}
              className="w-full py-6 bg-[#2f3b52] hover:bg-[#253044] text-white text-base font-medium"
            >
              {submitLoading ? "Resetting Password..." : "Continue"}
            </Button>

            {/* Resend OTP */}
            <div className="text-center">
              <span className="text-sm text-gray-500">Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || !otpSent}
                className="text-sm font-medium underline hover:text-black disabled:opacity-40"
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            <div className="text-center">
              <Link href="/auth/login" className="text-sm hover:underline">
                Back to Login
              </Link>
            </div>

          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPasswordPage;