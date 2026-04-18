"use client";

import React, { useEffect, useState } from 'react';
import "@/app/styles/modal.css";
import { countries } from '@/data/countries';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  mobile: "",
  country: "",
  state: "",
  city: "",
  course: "",
  consent: false,
};

export default function StudentModal({ isOpen, onClose, initialCourse }: StudentModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialCourse) {
        setForm(prev => ({ ...prev, course: initialCourse }));
      }
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setForm(defaultForm);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialCourse]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json() as { success: boolean; message?: string };

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment submit error:", err);
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">&times;</button>

        {status === "success" ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h2 className="modal-success-title">Enrollment Submitted!</h2>
            <p className="modal-success-text">
              Thank you for your interest. Our team will reach out to you shortly.
            </p>
            <button className="modal-submit-btn" onClick={onClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Start Your Enrollment Process</h2>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid-2">
                <div className="modal-input-group">
                  <label>Your First Name</label>
                  <input name="firstName" type="text" placeholder="Enter Your First Name" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Your Last Name</label>
                  <input name="lastName" type="text" placeholder="Enter Your Last Name" value={form.lastName} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Your Email</label>
                  <input name="email" type="email" placeholder="Enter Your Email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Your Mobile Number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select 
                      name="countryCode" 
                      value={form.countryCode} 
                      onChange={handleChange} 
                      style={{ width: '100px', flexShrink: 0 }}
                    >
                      {countries.map(c => (
                        <option key={c.iso + c.code} value={c.code}>{c.iso} ({c.code})</option>
                      ))}
                    </select>
                    <input name="mobile" type="tel" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-input-group">
                  <label>Country</label>
                  <select name="country" value={form.country} onChange={handleChange} required>
                    <option value="" disabled hidden>Choose Your Country</option>
                    {countries.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-input-group">
                  <label>State</label>
                  <input name="state" type="text" placeholder="Enter Your State" value={form.state} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>City</label>
                  <input name="city" type="text" placeholder="Enter Your City" value={form.city} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Course</label>
                  <select name="course" value={form.course} onChange={handleChange} required>
                    <option value="" disabled hidden>Course You Are Interested In:</option>
                    <option value="Hospitality Professional Foundations (HPF)">Hospitality Professional Foundations (HPF)</option>
                    <option value="Hotel Operations & Systems Certification (HOSC)">Hotel Operations & Systems Certification (HOSC)</option>
                    <option value="Hospitality Communication & Professional Skills (HCPS)">Hospitality Communication & Professional Skills (HCPS)</option>
                    <option value="International Guest Experience Certification (IGEC)">International Guest Experience Certification (IGEC)</option>
                    <option value="Career Success & International Placement Bootcamp (CSIPB)">Career Success & International Placement Bootcamp (CSIPB)</option>
                    <option value="Professional Skills & Soft Skills Foundation (PSSF)">Professional Skills & Soft Skills Foundation (PSSF)</option>
                    <option value="Real Estate Sales & Management (RESM)">Real Estate Sales & Management (RESM)</option>
                    <option value="Butler Service & Luxury Hospitality Certification (BSLHC)">Butler Service & Luxury Hospitality Certification (BSLHC)</option>
                    <option value="Professional Bartending & Guest Engagement (PBGEC)">Professional Bartending & Guest Engagement (PBGEC)</option>
                    <option value="Childcare & Family Guest Services Certification (CFHC)">Childcare & Family Guest Services Certification (CFHC)</option>
                  </select>
                </div>
              </div>

              <div className="modal-checkbox-group">
                <input
                  type="checkbox"
                  id="student-consent"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="student-consent">
                  I Agree To Receive Updates And Notifications Via Email, SMS, WhatsApp, Or Call.
                  This Consent Overrides My Communication Preferences, Including DND / NDNC.
                </label>
              </div>

              {status === "error" && (
                <p className="modal-error-msg">{errorMsg}</p>
              )}

              <button type="submit" className="modal-submit-btn" disabled={status === "loading"}>
                {status === "loading" ? (
                  <span className="modal-loading-text">
                    <span className="modal-spinner" />
                    Submitting...
                  </span>
                ) : "Submit Now"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}