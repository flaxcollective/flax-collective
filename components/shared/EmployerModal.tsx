"use client";

import React, { useEffect, useState } from 'react';
import "@/app/styles/modal.css";
import { countries } from '@/data/countries';

interface EmployerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const defaultForm = {
  fullName: "",
  companyName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  jobRole: "",
  candidatesRequired: "",
  location: "",
  employmentType: "",
  consent: false,
};

export default function EmployerModal({ isOpen, onClose }: EmployerModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setForm(defaultForm);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
      const res = await fetch("/api/employer", {
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
      console.error("Employer submit error:", err);
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
            <h2 className="modal-success-title">Request Submitted!</h2>
            <p className="modal-success-text">
              Thank you for reaching out. Our recruitment team will contact you within 24 hours.
            </p>
            <button className="modal-submit-btn" onClick={onClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Start Your Hiring Process</h2>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid-2">
                <div className="modal-input-group">
                  <label>Your Full Name</label>
                  <input name="fullName" type="text" placeholder="Enter Your Full Name" value={form.fullName} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Company Name</label>
                  <input name="companyName" type="text" placeholder="Enter Your Company Name" value={form.companyName} onChange={handleChange} required />
                </div>
                 <div className="modal-input-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="Enter Your Email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Phone Number</label>
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
                    <input name="phone" type="tel" placeholder="Enter Phone Number" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-input-group">
                  <label>Job Role</label>
                  <select name="jobRole" value={form.jobRole} onChange={handleChange} required>
                    <option value="" disabled hidden>Select</option>
                    <option value="chef">Chef</option>
                    <option value="manager">Manager</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="butler">Butler</option>
                    <option value="bartender">Bartender</option>
                    <option value="staff">General Staff</option>
                  </select>
                </div>
                <div className="modal-input-group">
                  <label>Number Of Candidates Required</label>
                  <input name="candidatesRequired" type="number" min="1" placeholder="Enter Number" value={form.candidatesRequired} onChange={handleChange} required />
                </div>
                <div className="modal-input-group">
                  <label>Location For Job</label>
                  <select name="location" value={form.location} onChange={handleChange} required>
                    <option value="" disabled hidden>Choose The Country</option>
                    {countries.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-input-group">
                  <label>Employment Type</label>
                  <select name="employmentType" value={form.employmentType} onChange={handleChange} required>
                    <option value="" disabled hidden>Select</option>
                    <option value="fulltime">Full Time</option>
                    <option value="parttime">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="modal-checkbox-group">
                <input
                  type="checkbox"
                  id="emp-consent"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="emp-consent">
                  I Agree To Receive Updates And Notifications Via Email, SMS, WhatsApp, Or Call.
                  This Consent Overrides My Communication Preferences.
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