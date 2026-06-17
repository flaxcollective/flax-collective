"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/styles/auth/GetStarted.css";
import { useAuth } from "@/context/AuthContext";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

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


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const callbackUrl = searchParams.get("callbackUrl");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();


      if (!res.ok) {
        alert(data.message);
        return;
      }
      setUser(data.user);
      // if (from === "custom" && callbackUrl) {
      //   router.push("/programs#custom-course");
      // } else if (data.user?.usertype === "admin") {
      //   router.push("/admin-dashboard");
      // } else {
      //   router.push("/");
      // }
      alert("Login successful!");

    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "google",
          token: credentialResponse.credential,
          action: "login"
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Social login failed");
        return;
      }
      setUser(data.user);
      alert("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Google Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signstarted-bg min-h-screen flex items-center justify-center px-4">

      <div className="loginstarted-card w-full">

        <Link href="/" className="text-center block">
          <img
            src="/assets/images/logo/flax-square-logo.png"
            alt="logo"
            className="getstarted-logo mx-auto"
          />
        </Link>

        <h2 className="onboarding-heading text-center text-2xl font-semibold">
          Log in to your account
        </h2>
        <p className="text-text-body text-center font-medium pb-5">Welcome back! Please enter your details.</p>

        <form onSubmit={handleLogin} className="grid gap-4">

          <div>
            <Label className="text-lg font-semibold">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Or Username"
              className="w-full text-base mt-1 px-3 py-5 border bg-[#F0F0F0] rounded-md"
            />
          </div>

          <div className="flax-eye-icon">
            <Label className="text-lg font-semibold">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-1 px-3 text-base py-5 border bg-[#F0F0F0] rounded-md"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Link href="/auth/forgotpassword">Forgot Password</Link>
          </div>

          <button className="getstarted-btn my-3">
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>
        <p className="text-center mt-4 font-semibold text-base text-text-body">
          Don’t have an account?
          <Link href="/auth/signup" className="text-navy  hover:underline">
            Sign up
          </Link>
        </p>
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

export default LoginForm;