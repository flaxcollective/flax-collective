"use client";


import React, { useState , useEffect } from "react";
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";
import { Eye, EyeOff } from "lucide-react";
import "@/app/styles/dashboard/dashboard-home.css"
import { useSearchParams } from "next/navigation";

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
        alert("wrong data" + data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
              />
            </div>



            <div>
              <label className="text-lg font-semibold">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
              />
            </div>



            <div>
              <label className="text-lg font-semibold">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md"
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
            />


            <span
              onClick={() => setShowPassword(!showPassword)}
              className=" cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>



          <div className=" flax-eye-icon">
            <label className="text-lg font-semibold">Confirm Password</label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full mt-1 px-3 py-2 border bg-[#F0F0F0] rounded-md pr-10"
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
            className="getstarted-btn w-full"
          >
            {loading ? "Creating..." : "Continue"}
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
        <div className="flex justify-center gap-4"> {["https://www.svgrepo.com/show/475656/google-color.svg", "https://www.svgrepo.com/show/475647/facebook-color.svg", "https://www.svgrepo.com/show/448234/linkedin.svg",].map((icon, i) => (<a key={i} href="#" className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition shadow-sm" > <img src={icon} className="w-5 h-5" /> </a>))} </div>


      </div>
    </div>
  );
};


export default SignupPage;