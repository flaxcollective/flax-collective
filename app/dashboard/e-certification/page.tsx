"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Award, FileText, CheckCircle2, Zap, ArrowRight, ShieldCheck, HelpCircle, GraduationCap, X, CheckCircle, AlertCircle, Sparkles, Clock, UserPlus, Download, Wifi, Lock, Check, ClipboardCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { countries } from "@/data/countries";
import ReCaptcha from "@/components/shared/ReCaptcha";

interface Exam {
  examId: string;
  title: string;
  desc: string;
  fullDesc: string;
  price: string;
  discountedPrice: string;
  duration: number;
  passingMarks: number;
  totalQuestions: number;
  isPurchased: boolean;
  hasPassed: boolean;
  lastSession: {
    sessionId: string;
    status: string;
    score: number;
    passed: boolean;
    submittedAt: string;
    certificateId: string;
  } | null;
}

export default function StudentCertificationPortal() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout Form State
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [checkoutError, setCheckoutError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    country: "",
    state: "",
    city: "",
    consent: false
  });

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/student/exams");
      const data = await res.json();
      if (data.success) {
        setExams(data.exams || []);
      }
    } catch (err) {
      console.error("Error fetching student exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Populate checkout form when modal opens
  useEffect(() => {
    if (user && isCheckoutOpen) {
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

      setCheckoutForm({
        firstName: fName,
        lastName: lName,
        email: user.email || "",
        countryCode: cCode,
        mobile: mob,
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
        consent: false
      });
    }
  }, [user, isCheckoutOpen]);

  const handleStartExamClick = (exam: Exam) => {
    setSelectedExam(exam);
    if (exam.isPurchased) {
      setIsStartModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const handleStartConfirm = async () => {
    if (!selectedExam) return;
    setIsStartModalOpen(false);
    
    setLoading(true);
    try {
      const res = await fetch("/api/student/exams/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId: selectedExam.examId })
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/e-certification/exam/${selectedExam.examId}`);
      } else {
        alert(data.message || "Failed to start exam session.");
      }
    } catch (err) {
      console.error("Error starting exam session:", err);
      alert("Error starting exam session.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) return;
    setCheckoutStatus("idle");
    setCheckoutError("");

    if (!checkoutForm.firstName || !checkoutForm.lastName || !checkoutForm.email || !checkoutForm.mobile || !checkoutForm.city) {
      setCheckoutStatus("error");
      setCheckoutError("Please fill in all required fields.");
      return;
    }

    if (!checkoutForm.consent) {
      setCheckoutStatus("error");
      setCheckoutError("You must agree to the terms and privacy statement.");
      return;
    }

    if (!recaptchaToken) {
      setCheckoutStatus("error");
      setCheckoutError("Please complete the reCAPTCHA verification.");
      return;
    }

    setCheckoutStatus("loading");

    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutForm,
          course: selectedExam.title,
          type: "exam",
          recaptchaToken
        })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutStatus("success");
        setTimeout(() => {
          setIsCheckoutOpen(false);
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            fetchExams();
          }
        }, 1000);
      } else {
        setCheckoutStatus("error");
        setCheckoutError(data.message || "Checkout registration failed.");
      }
    } catch (err: any) {
      setCheckoutStatus("error");
      setCheckoutError(err.message || "Server connection error.");
    }
  };

  const handleCheckoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 bg-[#F4F1EA] min-h-screen text-gray-800 animate-fade-in p-1 md:p-4">
      
      {/* Banner */}
      <div className="flex items-center gap-4 py-4 px-2 bg-transparent">
        <div className="w-14 h-14 rounded-2xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0 shadow-sm">
          <UserPlus className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black font-serif leading-none">
            E-Certification
          </h2>
          <p className="text-[#666666] text-sm mt-1.5 font-medium">
            Take industry-recognized certification exams and showcase your skills with verified credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Exams list */}
        <div className="xl:col-span-2 space-y-6">
          {loading ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/50 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
                <span className="text-sm font-semibold text-gray-400">Loading certifications list...</span>
              </div>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/50 shadow-sm">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-bold text-gray-400 text-sm">No Certifications Available</h4>
              <p className="text-xs text-gray-400 mt-1">Check back later for newly published certification programs.</p>
            </div>
          ) : (
            exams.map((exam) => (
              <div key={exam.examId} className="bg-[#736A2F]/10 rounded-[30px] border border-[#B3B3B3] shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row transition-all duration-300">
                
                {/* Exam Details Card */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 bg-[#736A2F]/10 text-[#736A2F] font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured Certification
                    </span>
                    <h3 className="text-2xl font-semibold text-[#2F3E56] font-serif leading-tight">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-[#666666] mt-3 leading-relaxed">
                      {exam.desc}
                    </p>
                  </div>

                  {/* Metadata Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 mt-6 pb-6 md:pb-0 border-b border-[#B3B3B3]/50 md:border md:border-black md:divide-x md:divide-black">
                    <div className="flex items-center gap-4 md:p-4">
                      <div className="w-12 h-12 rounded-full bg-[#736A2F]/20 flex items-center justify-center text-[#736A2F] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium text-[11px] tracking-wider">Total Questions</span>
                        <span className="font-bold text-[#736A2F] text-base block">{exam.totalQuestions} MCQs</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:p-4">
                      <div className="w-12 h-12 rounded-full bg-[#736A2F]/20 flex items-center justify-center text-[#736A2F] shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium text-[11px] tracking-wider">Duration</span>
                        <span className="font-bold text-[#736A2F] text-base block">{exam.duration} Minutes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:p-4">
                      <div className="w-12 h-12 rounded-full bg-[#736A2F]/20 flex items-center justify-center text-[#736A2F] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium text-[11px] tracking-wider">Passing Marks</span>
                        <span className="font-bold text-[#736A2F] text-base block">{exam.passingMarks}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[1px] bg-[#B3B3B3]/50" />

                {/* Exam Pricing & Trigger Button */}
                <div className="md:w-68 p-6 pt-1 md:p-8 flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-[12px] text-[#736A2F] font-bold tracking-wider mb-2">Special Price</span>
                  <div className="text-4xl font-bold text-black tracking-tight">₹{exam.discountedPrice}</div>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-sm text-gray-400 line-through">₹{exam.price}</span>
                    <span className="bg-[#736A2F]/10 text-[#736A2F] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {Math.round(((parseFloat(exam.price) - parseFloat(exam.discountedPrice)) / parseFloat(exam.price)) * 100)}% OFF
                    </span>
                  </div>

                  <div className="w-full mt-6 space-y-2">
                    {exam.hasPassed ? (
                      <>
                        <button
                          onClick={() => router.push(`/dashboard/e-certification/result/${exam.lastSession?.sessionId}`)}
                          className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Passed Exam
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/e-certification/review/${exam.lastSession?.sessionId}`)}
                          className="w-full py-2 text-[11px] font-semibold text-[#736A2F] hover:text-[#5a5223] transition-colors"
                        >
                          Review Answers
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartExamClick(exam)}
                        className="w-full py-3.5 text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 text-white bg-[#2F3E56] hover:bg-[#1f2a3a]"
                      >
                        {exam.isPurchased ? "Start Exam Now" : "Register & Pay"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[#736A2F] text-[12px] mt-5 font-bold">
                    <Lock className="w-3.5 h-3.5 text-[#736A2F]" />
                    Secure & Trusted
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Right Side: Informative Panels */}
        <div className="space-y-6">
          
          {/* Panel: Certification Includes */}
          <div className="bg-white rounded-[24px] border-l-[6px] border-[#736A2F] border-y border-r border-gray-200/50 shadow-sm p-8 space-y-6">
            <h4 className="font-bold text-shadow-black text-base md:text-lg font-serif">
              Certification Includes
            </h4>
            
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#736A2F] shrink-0 border border-gray-200/10">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#736A2F] text-sm">Expert-Curated Questions</h5>
                  <p className="text-[12px] text-[#666666] leading-relaxed mt-0.5">
                    Questions designed to assess practical knowledge and core concepts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#736A2F] shrink-0 border border-gray-200/10">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#736A2F] text-sm">Instant Score</h5>
                  <p className="text-[12px] text-[#666666] leading-relaxed mt-0.5">
                    View your final score immediately after exam submission.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#736A2F] shrink-0 border border-gray-200/10">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#736A2F] text-sm">Downloadable Certificate</h5>
                  <p className="text-[12px] text-[#666666] leading-relaxed mt-0.5">
                    Download your certificate instantly after successfully passing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#736A2F] shrink-0 border border-gray-200/10">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-[#736A2F] text-sm">100% Online</h5>
                  <p className="text-[12px] text-[#666666] leading-relaxed mt-0.5">
                    Complete the entire certification process from any device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel: Who Can Take This */}
          <div className="bg-white rounded-[24px] border border-gray-200/50 shadow-sm p-8 space-y-4">
            <h4 className="font-bold text-[#2F3E56] text-base md:text-lg font-serif">
              Who Can Take This?
            </h4>
            <p className="text-[#666666] text-[12px] leading-relaxed">
              Designed for anyone looking to validate their skills and strengthen their professional profile.
            </p>
            <ul className="space-y-3 pt-2">
              {["Students", "Job Seekers", "Working Professionals", "Freelancers", "Entrepreneurs", "Business Owners", "Career Changers"].map((audience) => (
                <li key={audience} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3px]" />
                  </div>
                  <span className="text-xs font-bold text-black">{audience}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Start Confirmation Modal (Screenshot 2) */}
      {isStartModalOpen && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center text-center transform scale-98 transition-all space-y-5 animate-scale-up">
            
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-full bg-[#736A2F]/20 border border-gray-100 flex items-center justify-center text-[#736A2F] shadow-inner text-2xl font-serif">
              <img src="/assets/images/writing.png" alt="" />
            </div>

            <div>
              <h3 className="font-bold text-[#2F3E56] text-lg font-serif">
                Start Certification Exam?
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Once you start the exam, the timer will begin and must be completed in one session.
              </p>
            </div>

            {/* Test Stats Details */}
            <div className="w-full bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 text-left text-xs font-bold text-gray-700 space-y-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4.5 h-4.5 text-[#736A2F]" />
                <span>{selectedExam.totalQuestions} Multiple Choice Questions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-[#736A2F]" />
                <span>{selectedExam.duration} Minutes Duration</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#736A2F]" />
                <span>Passing Score {selectedExam.passingMarks}%</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full border-t border-gray-50 pt-4">
              <button
                onClick={() => setIsStartModalOpen(false)}
                className="py-2.5 border border-[#736A2F] rounded-xl text-xs font-bold text-[#736A2F] hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleStartConfirm}
                className="py-2.5 bg-[#736A2F] hover:bg-[#5a5223] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Start Exam
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Checkout / Registration Modal */}
      {isCheckoutOpen && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 overflow-hidden transform scale-98 transition-all">
            
            {/* Modal Header */}
            <div className="bg-[#2F3E56] px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#736A2F]" />
                Register for Certification
              </h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
              
              <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">{selectedExam.title}</h4>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mt-1 block">Exam Registration Fee</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through block">₹{selectedExam.price}</span>
                  <span className="text-base font-black text-[#736A2F]">₹{selectedExam.discountedPrice}</span>
                </div>
              </div>

              {checkoutStatus === "error" && (
                <div className="p-3.5 rounded-xl border bg-red-50 border-red-100 text-red-700 text-xs font-medium flex items-start gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{checkoutError}</span>
                </div>
              )}

              {checkoutStatus === "success" && (
                <div className="p-3.5 rounded-xl border bg-green-50 border-green-100 text-green-700 text-xs font-medium flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Registration success! Redirecting to transaction checkout...</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">FIRST NAME</label>
                  <input
                    type="text"
                    name="firstName"
                    value={checkoutForm.firstName}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">LAST NAME</label>
                  <input
                    type="text"
                    name="lastName"
                    value={checkoutForm.lastName}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={checkoutForm.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">COUNTRY CODE</label>
                  <select
                    name="countryCode"
                    value={checkoutForm.countryCode}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] cursor-pointer"
                  >
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">MOBILE NUMBER</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={checkoutForm.mobile}
                    onChange={handleCheckoutChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">COUNTRY</label>
                  <input
                    type="text"
                    name="country"
                    value={checkoutForm.country}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">STATE</label>
                  <input
                    type="text"
                    name="state"
                    value={checkoutForm.state}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1">CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={checkoutForm.city}
                    onChange={handleCheckoutChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#736A2F] focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={checkoutForm.consent}
                  onChange={handleCheckoutChange}
                  className="mt-0.5 rounded border-gray-300 text-[#736A2F] focus:ring-[#736A2F] cursor-pointer"
                />
                <label htmlFor="consent" className="text-[10px] leading-relaxed text-gray-500 cursor-pointer">
                  I agree that the details supplied are accurate. I authorize FLAX Collective to proceed with this registration order.
                </label>
              </div>

              <div className="pt-2">
                <ReCaptcha onVerify={setRecaptchaToken} />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={checkoutStatus === "loading"}
                  className="px-5 py-2 bg-[#736A2F] hover:bg-[#5a5223] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {checkoutStatus === "loading" ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
