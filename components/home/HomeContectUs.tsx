"use client";

import { useState } from "react";
import "@/app/styles/home/home-contact.css";

export default function HomeContectUs() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setForm({ name: "", mobile: "", email: "", message: "" });
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
          <p className="contact-subtext mt-3">
            We look forward to supporting professionals and organizations in building the future.
          </p>

          <div className="contact-points">
            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-1.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>24/7 Full Time Support</p>
            </div>

            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-2.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>Available Worldwide</p>
            </div>
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
            <form onSubmit={handleSubmit}>
              <input 
                name="name" 
                type="text" 
                placeholder="Name" 
                value={form.name} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="mobile" 
                type="text" 
                placeholder="Mobile No." 
                value={form.mobile} 
                onChange={handleChange} 
                required 
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
              <textarea 
                name="message" 
                placeholder="Message" 
                value={form.message} 
                onChange={handleChange} 
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
