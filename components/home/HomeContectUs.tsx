"use client";

import React, { useState } from "react";
import "@/app/styles/home/home-contact.css";
import { countries } from "@/data/countries";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaPlus, FaMinus } from 'react-icons/fa'

import { GoCheckCircleFill } from "react-icons/go";

export default function HomeContectUs() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json() as { success: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setForm({ name: "", countryCode: "+91", mobile: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-left">
          <h2>Contact Us</h2>

          <p className="contact-subtext">
            For inquiries regarding <span>certification programs, recruitment opportunities, or employer partnerships,</span> please contact the Flax Collective team.
          </p>

          <div className="">
            <p className="text-md flex items-center gap-1 py-4">
              <HiOutlineMail className="text-lg" />
              info@flaxcollective.com</p>

          </div>
          <div className="flex gap-4 py-4">
            <a
              href="#"
              className=" flex items-center justify-center rounded-fulle transition group"
            >
              <FaInstagram className="text-gray-700 text-2xl" />
            </a>
            <a
              href="#"
              className=" flex items-center justify-center rounded-full  transition group"
            >
              <FaFacebook className="text-gray-700  text-2xl" />
            </a>

            <a
              href="#"
              className=" flex items-center justify-center rounded-full  transition group"
            >
              <FaLinkedin className="text-gray-700 text-2xl" />
            </a>

          </div>

          <div className="py-4">
            <h3 className="text-xl text-dark font-medium mb-6">
              Why Reach Out to Us?
            </h3>

            <ul className="space-y-3 text-base font-normal text-dark">
              <li className="flex items-center gap-4">
                <GoCheckCircleFill className="text-[#2F3E56] text-2xl" />
                Expert Consultation Tailored to Your Needs
              </li>
              <li className="flex items-center gap-4">
                <GoCheckCircleFill className="text-[#2F3E56] text-2xl" />
                Quick Response & Professional Guidance
              </li>
              <li className="flex items-center gap-4">
                <GoCheckCircleFill className="text-[#2F3E56] text-2xl" />
                Trusted by Clients Across Industries
              </li>
              <li className="flex items-center gap-4">
                <GoCheckCircleFill className="text-[#2F3E56] text-2xl" />
                End-to-End Support & Solutions
              </li>
            </ul>
          </div>
        </div>
        {/* RIGHT */}
        <div className="contact-right">
          {status === "success" ? (
            <div className="contact-success-box" style={{
              background: "#f8fdf4",
              border: "1px solid #6e7c3a",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", color: "#6e7c3a", marginBottom: "15px" }}>✓</div>
              <h3 style={{ color: "#2F3E56", marginBottom: "10px", fontFamily: "Source Serif 4" }}>Message Sent!</h3>
              <p style={{ color: "#666", fontFamily: "Montserrat", fontSize: "14px" }}>
                Thank you for reaching out. Our team will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: "20px",
                  background: "#2F3E56",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className=" bg-[#2F3E56] p-6 md:p-8 rounded-2xl shadow-xl text-white">

              <h2 className="text-base lg:text-xl font-semibold  text-white">
                Contact Form
              </h2>
              <label className="text-white">Your Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white text-white"
                required
              />

              {/* Email */}
              <label className="text-white">Email Id</label>
              <input
                name="email"
                type="email"
                placeholder="Email ID"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white text-white"
              />
              <label className="text-white">Phone Number</label>
              <div className="flex gap-2">

                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="w-[110px] p-3 rounded-lg bg-[#2F3E56] text-white border border-white/20 focus:outline-none"
                >
                  {countries?.length ? (
                    countries.map((c, index) => (
                      <option
                        key={`${c.iso}-${c.code}-${index}`}
                        value={c.code}
                        className="text-white"
                      >
                        {c.iso} ({c.code})
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </select>

                <input
                  name="mobile"
                  type="text"
                  placeholder="Mobile No."
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
                />

              </div>
              {/* <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              /> */}
              <label className="text-white">Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none text-white"
                required
              ></textarea>

              {status === "error" && (
                <p style={{ color: "red", fontSize: "14px", margin: "0" }}>{errorMsg}</p>
              )}

              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Submit Now"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
