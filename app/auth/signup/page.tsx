"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";
import { Eye, EyeOff } from "lucide-react";
import "@/app/styles/dashboard/dashboard-home.css"
import { countries } from "@/data/countries";
import { useSearchParams } from "next/navigation";
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
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);




  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();



    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    setLoading(true);


    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          usertype: role,
        }),
      });


      const data = await res.json();


      if (data.success) {
        alert(" Signup successful");
        window.location.href = "/auth/successfullpage";
      } else {
        alert("wrong data " + data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
        alert("Signup successful");
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


        <h2 className="onboarding-heading">
          Let's Get You Started
        </h2>

        {/* <h2 className="onboarding-heading">
          {role === "student" ? "Student Signup" : "Employer Signup"}
        </h2> */}

        <p className='text-center onboarding-para'>
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
              className=" cursor-pointer"
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



          <div className=" flax-eye-icon">
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
              className=" cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="getstarted-btn w-full cursor-pointer"
          >
            {loading ? "Creating..." : "Submit"}
          </button>


        </form>

        <p className="text-center text-lg mt-3">
          Already have an account?
          <Link href="/auth/login" className="underline ml-1">
            Login
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
      </div>
    </div>
  );
};


export default SignupPage;