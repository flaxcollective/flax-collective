"use client";

import React, { useEffect, useState } from 'react';
import "@/app/styles/modal.css";
import { countries } from '@/data/countries';
import { indianStates } from '@/data/states';
import { useAuth } from '@/context/AuthContext';
import ReCaptcha from './ReCaptcha';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
  type?: "course" | "exam";
  availableExams?: Array<{ examId?: string; title: string }>;
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

export default function StudentModal({ isOpen, onClose, initialCourse, type = "course", availableExams }: StudentModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [coursesList, setCoursesList] = useState<string[]>([]);
  const [examsList, setExamsList] = useState<string[]>([]);
  const { user } = useAuth();

  const isExam = type === "exam";

  const hasProfile = Boolean(user && user.name && user.phone && user.country && user.state && user.city);

  useEffect(() => {
    if (isOpen) {
      if (isExam) {
        fetch("/api/exams")
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.exams)) {
              setExamsList(data.exams.filter((e: any) => e.isActive !== false).map((e: any) => e.title));
            }
          })
          .catch((err) => console.error("Error loading exams from database:", err));
      } else {
        fetch("/api/courses")
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.courses)) {
              setCoursesList(data.courses.filter((c: any) => c.isActive !== false).map((c: any) => c.title));
            }
          })
          .catch((err) => console.error("Error loading courses from database:", err));
      }
    }
  }, [isOpen, isExam]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      let initialData: Partial<typeof defaultForm> = {};
      
      // Auto-populate user details if logged in
      if (user) {
        let fName = "";
        let lName = "";
        if (user.name) {
          const parts = user.name.trim().split(/\s+/);
          fName = parts[0] || "";
          lName = parts.slice(1).join(" ") || "";
        }

        let cCode = user.countryCode || "+91";
        let mob = user.phone || "";
        if (!user.countryCode && user.phone) {
          const cleanPhone = user.phone.trim();
          const matched = countries.find(c => cleanPhone.startsWith(c.code));
          if (matched) {
            cCode = matched.code;
            mob = cleanPhone.substring(matched.code.length);
          }
        }

        initialData = {
          firstName: fName,
          lastName: lName,
          email: user.email || "",
          countryCode: cCode,
          mobile: mob,
          country: user.country || "",
          state: user.state || "",
          city: user.city || "",
        };
      }

      if (initialCourse) {
        initialData.course = initialCourse;
      }

      setForm(prev => ({ ...prev, ...initialData }));
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setAlreadyPurchased(false);
        setForm(defaultForm);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialCourse, user]);

  if (!isOpen) return null;

  const checkDuplicatePurchase = async (emailToCheck: string, courseToCheck: string) => {
    if (!emailToCheck || !courseToCheck || !emailToCheck.includes("@")) return;
    try {
      const res = await fetch(`/api/enrollment/check?email=${encodeURIComponent(emailToCheck)}&course=${encodeURIComponent(courseToCheck)}&type=${isExam ? "exam" : "course"}`);
      const data = await res.json();
      if (data.success && data.alreadyPurchased) {
        setAlreadyPurchased(true);
        setStatus("error");
        setErrorMsg(data.message || "You have already purchased this certification with this email.");
      } else if (alreadyPurchased) {
        setAlreadyPurchased(false);
        if (status === "error") {
          setStatus("idle");
          setErrorMsg("");
        }
      }
    } catch (err) {
      console.warn("Failed to check duplicate enrollment:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "email" && alreadyPurchased) {
        setAlreadyPurchased(false);
        setErrorMsg("");
        setStatus("idle");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasProfile) {
      if (!/[a-zA-Z]/.test(form.firstName)) {
        setStatus("error");
        setErrorMsg("First Name must contain letters");
        return;
      }
      if (!/[a-zA-Z]/.test(form.lastName)) {
        setStatus("error");
        setErrorMsg("Last Name must contain letters");
        return;
      }
      if (form.mobile && !/^\d+$/.test(form.mobile)) {
        setStatus("error");
        setErrorMsg("Mobile number must contain only numbers");
        return;
      }
      if (!/[a-zA-Z]/.test(form.state)) {
        setStatus("error");
        setErrorMsg("State must contain letters");
        return;
      }
      if (!/[a-zA-Z]/.test(form.city)) {
        setStatus("error");
        setErrorMsg("City name must contain letters");
        return;
      }
    }
    if (!recaptchaToken && process.env.NODE_ENV !== "development") {
      setStatus("error");
      setErrorMsg("Please complete the reCAPTCHA verification.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: isExam ? "exam" : "course", recaptchaToken }),
      });

      const data = await res.json() as { success: boolean; message?: string; redirectUrl?: string; alreadyPurchased?: boolean };

      if (data.success) {
        setRecaptchaToken(null);
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          setStatus("success");
          setTimeout(() => {
            window.location.href = isExam ? "/dashboard/e-certification" : "/dashboard";
          }, 1500);
        }
      } else {
        setStatus("error");
        if (data.alreadyPurchased) {
          setAlreadyPurchased(true);
        }
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
        <button className="modal-close-btn cursor-pointer" onClick={onClose} type="button">&times;</button>

        {status === "success" ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h2 className="modal-success-title">{isExam ? "Certification Registration Submitted!" : "Enrollment Submitted!"}</h2>
            <p className="modal-success-text">
              {isExam
                ? "Thank you for registering for the certification. Our team will reach out to you shortly."
                : "Thank you for your interest. Our team will reach out to you shortly."}
            </p>
            <button className="modal-submit-btn" onClick={onClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">{isExam ? "Register for Certification" : "Start Your Enrollment Process"}</h2>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid-2">
                {!hasProfile && (
                  <>
                    <div className="modal-input-group">
                      <label>Your First Name</label>
                      <input name="firstName" type="text" placeholder="Enter Your First Name" value={form.firstName} onChange={handleChange} required={!hasProfile} disabled={!!user} style={user ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} />
                    </div>
                    <div className="modal-input-group">
                      <label>Your Last Name</label>
                      <input name="lastName" type="text" placeholder="Enter Your Last Name" value={form.lastName} onChange={handleChange} required={!hasProfile} disabled={!!user} style={user ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} />
                    </div>
                  </>
                )}
                <div className="modal-input-group">
                  <label>Your Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => checkDuplicatePurchase(form.email, form.course)}
                    required
                    disabled={!!user}
                    style={user ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined}
                  />
                </div>                 
                {!hasProfile && (
                  <>
                    <div className="modal-input-group">
                      <label>Your Mobile Number</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select 
                          name="countryCode" 
                          value={form.countryCode} 
                          onChange={handleChange} 
                          style={{ width: '100px', flexShrink: 0, ...((user && user.countryCode) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : {}) }}
                          disabled={!!(user && user.countryCode)}
                        >
                          {countries.map(c => (
                            <option key={c.iso + c.code} value={c.code}>{c.iso} ({c.code})</option>
                          ))}
                        </select>
                        <input 
                          name="mobile" 
                          type="tel" 
                          placeholder="Mobile Number" 
                          value={form.mobile} 
                          onChange={handleChange} 
                          required={!hasProfile} 
                          disabled={!!(user && user.phone)} 
                          style={(user && user.phone) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} 
                        />
                      </div>
                    </div>
                    <div className="modal-input-group">
                      <label>Country</label>
                      <select 
                        name="country" 
                        value={form.country} 
                        onChange={handleChange} 
                        required={!hasProfile} 
                        disabled={!!(user && user.country)} 
                        style={(user && user.country) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined}
                      >
                        <option value="" disabled hidden>Choose Your Country</option>
                        {countries.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="modal-input-group">
                      <label>State</label>
                      {form.country === "India" ? (
                        <select 
                          name="state" 
                          value={form.state} 
                          onChange={handleChange} 
                          required={!hasProfile} 
                          disabled={!!(user && user.state)} 
                          style={(user && user.state) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} 
                        >
                          <option value="" disabled hidden>Select State</option>
                          {indianStates.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          name="state" 
                          type="text" 
                          placeholder="Enter Your State" 
                          value={form.state} 
                          onChange={handleChange} 
                          required={!hasProfile} 
                          disabled={!!(user && user.state)} 
                          style={(user && user.state) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} 
                        />
                      )}
                    </div>
                    <div className="modal-input-group">
                      <label>City</label>
                      <input 
                        name="city" 
                        type="text" 
                        placeholder="Enter Your City" 
                        value={form.city} 
                        onChange={handleChange} 
                        required={!hasProfile} 
                        disabled={!!(user && user.city)} 
                        style={(user && user.city) ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' } : undefined} 
                      />
                    </div>
                  </>
                )}
                <div className="modal-input-group">
                  <label>{isExam ? "Certification Exam" : "Course"}</label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={(e) => {
                      handleChange(e);
                      checkDuplicatePurchase(form.email, e.target.value);
                    }}
                    required
                  >
                    <option value="" disabled hidden>
                      {isExam ? "Certification You Are Interested In:" : "Course You Are Interested In:"}
                    </option>
                    {isExam ? (
                      (availableExams && availableExams.length > 0
                        ? availableExams.map(e => e.title)
                        : (examsList.length > 0 ? examsList : (form.course ? [form.course] : []))
                      ).map((examTitle) => (
                        <option key={examTitle} value={examTitle}>{examTitle}</option>
                      ))
                    ) : (
                      (coursesList.length > 0 ? coursesList : (form.course ? [form.course] : [])).map((cTitle) => (
                        <option key={cTitle} value={cTitle}>{cTitle}</option>
                      ))
                    )}
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
                  This Consent Overrides My Communication Preferences .
                </label>
              </div>

              <ReCaptcha onVerify={setRecaptchaToken} />

              {alreadyPurchased ? (
                <div style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '16px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', fontWeight: 700, fontSize: '13px' }}>
                    <span>⚠️ Already Purchased</span>
                  </div>
                  <p style={{ margin: '6px 0 10px 0', fontSize: '12px', color: '#78350f', lineHeight: '1.4' }}>
                    {errorMsg || `You have already purchased this ${isExam ? "certification" : "course"} with this email (${form.email}).`}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href={`/auth/login?email=${encodeURIComponent(form.email)}&callbackUrl=${encodeURIComponent(isExam ? "/dashboard/e-certification" : "/dashboard")}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: '#2F3E56',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      Log In to Access {isExam ? "Exam" : "Course"} →
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setAlreadyPurchased(false);
                        setForm(prev => ({ ...prev, email: "" }));
                        setErrorMsg("");
                        setStatus("idle");
                      }}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        color: '#374151',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      Use Different Email
                    </button>
                  </div>
                </div>
              ) : status === "error" && (
                <p className="modal-error-msg">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="modal-submit-btn"
                disabled={status === "loading" || alreadyPurchased || (!recaptchaToken && process.env.NODE_ENV !== "development")}
              >
                {status === "loading" ? (
                  <span className="modal-loading-text">
                    <span className="modal-spinner" />
                    Submitting...
                  </span>
                ) : (isExam ? "Register & Pay" : "Submit Now")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}