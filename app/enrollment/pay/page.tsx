"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Award, 
  Phone, 
  MapPin, 
  Mail, 
  User, 
  ChevronDown 
} from "lucide-react";

interface EnrollmentData {
  id: string;
  firstName: string;
  lastName: string;
  studentName: string;
  email: string;
  countryCode: string;
  mobile: string;
  country: string;
  state: string;
  city: string;
  course: string;
  courseId: string;
  amount: number;
  type: "course" | "exam";
  status: string;
  merchantTxnNo?: string;
}

interface ItemOption {
  id: string;
  title: string;
  price: number;
  type: "course" | "exam";
}

function PayLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2F3E56] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium text-sm font-montserrat">Loading your enrollment details...</p>
      </div>
    </div>
  );
}

function PayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const enrollmentId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);
  const [courses, setCourses] = useState<ItemOption[]>([]);
  const [exams, setExams] = useState<ItemOption[]>([]);

  // Form states for editable parts
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState<"course" | "exam">("course");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [isChangingCourse, setIsChangingCourse] = useState(false);

  useEffect(() => {
    if (!enrollmentId) {
      setErrorMsg("No enrollment ID specified in the payment link. Please check your email link.");
      setLoading(false);
      return;
    }

    fetch(`/api/enrollment/pay?id=${encodeURIComponent(enrollmentId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.enrollment) {
          setEnrollment(data.enrollment);
          setSelectedCourse(data.enrollment.course);
          setSelectedType(data.enrollment.type || "course");
          setSelectedAmount(data.enrollment.amount);
          setMobile(data.enrollment.mobile);
          setCity(data.enrollment.city);
          setCourses(data.availableCourses || []);
          setExams(data.availableExams || []);
        } else {
          setErrorMsg(data.message || "Failed to load enrollment record.");
        }
      })
      .catch((err) => {
        console.error("Fetch enrollment error:", err);
        setErrorMsg("Network error loading enrollment details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [enrollmentId]);

  const handleSelectCourse = (title: string, type: "course" | "exam", price: number) => {
    setSelectedCourse(title);
    setSelectedType(type);
    setSelectedAmount(price);
    setIsChangingCourse(false);
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId) return;

    if (!mobile || mobile.trim().length < 6) {
      setErrorMsg("Please enter a valid mobile number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enrollment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId,
          course: selectedCourse,
          type: selectedType,
          mobile: mobile.trim(),
          city: city.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          router.push("/dashboard");
        }
      } else {
        setErrorMsg(data.message || "Payment initiation failed. Please try again.");
        setSubmitting(false);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setErrorMsg("Network error connecting to payment gateway. Please check your connection.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PayLoading />;
  }

  if (errorMsg && !enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-[#2F3E56] mb-2">Enrollment Link Error</h1>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{errorMsg}</p>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2F3E56] text-white text-sm font-semibold rounded-xl hover:bg-[#1E2A3C] transition-all"
          >
            Browse Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // If already paid
  if (enrollment && enrollment.status === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-bold text-[#2F3E56] mb-2 font-montserrat">Payment Already Completed!</h1>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Your enrollment for <strong>{enrollment.course}</strong> has already been confirmed and paid. You have full access to your learning materials.
          </p>
          <Link
            href={enrollment.type === "exam" ? "/dashboard/e-certification" : "/dashboard"}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#2F3E56] text-white text-sm font-bold rounded-xl hover:bg-[#1E2A3C] transition-all shadow-md"
          >
            Access Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C88A58] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2F3E56] font-montserrat tracking-tight">
              Complete Your Enrollment
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Secure</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePayNow} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details & Program */}
          <div className="lg:col-span-7 space-y-6">
            {/* Student Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-200/80">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-[#2F3E56] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C88A58]" />
                  <span>Student Details</span>
                </h2>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Verified Registration
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-xs text-gray-400 block font-medium">Full Name</span>
                  <span className="text-gray-800 font-semibold">{enrollment?.studentName}</span>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-xs text-gray-400 block font-medium">Email Address</span>
                  <span className="text-gray-800 font-semibold truncate block" title={enrollment?.email}>
                    {enrollment?.email}
                  </span>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                  <label className="text-xs text-gray-500 block font-medium mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>Mobile Number</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-xs font-semibold">{enrollment?.countryCode || "+91"}</span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter mobile"
                      required
                      className="w-full bg-white px-2 py-1 text-sm font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3E56]/20 focus:border-[#2F3E56]"
                    />
                  </div>
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                  <label className="text-xs text-gray-500 block font-medium mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>City & State</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full bg-white px-2 py-1 text-sm font-semibold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3E56]/20 focus:border-[#2F3E56]"
                  />
                </div>
              </div>
            </div>

            {/* Selected Course Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-200/80">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#2F3E56] flex items-center gap-2">
                  {selectedType === "exam" ? (
                    <Award className="w-4 h-4 text-[#C88A58]" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-[#C88A58]" />
                  )}
                  <span>Selected Program</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setIsChangingCourse(!isChangingCourse)}
                  className="text-xs font-bold text-[#C88A58] hover:text-[#b57a4a] transition-colors flex items-center gap-1"
                >
                  {isChangingCourse ? "Keep Current" : "Change Course"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isChangingCourse ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Current Active Selection Box */}
              <div className="p-4 bg-gradient-to-r from-[#2F3E56]/5 to-[#C88A58]/10 rounded-2xl border border-[#2F3E56]/15 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#2F3E56] text-white">
                      {selectedType === "exam" ? "E-Certification" : "Main Course"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2F3E56]">{selectedCourse}</h3>
                  <span className="text-xs text-gray-500">Instant Access on Confirmation</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">Program Fee</span>
                  <span className="text-xl font-extrabold text-[#2F3E56]">
                    ₹{selectedAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Collapsible Course Selector Dropdown */}
              {isChangingCourse && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Soft Skills E-Certifications
                    </span>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {exams.map((exam) => (
                        <button
                          key={exam.id}
                          type="button"
                          onClick={() => handleSelectCourse(exam.title, "exam", exam.price)}
                          className={`text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                            selectedCourse === exam.title && selectedType === "exam"
                              ? "border-[#2F3E56] bg-[#2F3E56]/5 font-bold text-[#2F3E56]"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="truncate pr-2">{exam.title}</span>
                          <span className="font-bold text-[#C88A58] flex-shrink-0">₹{exam.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Platform Training Courses
                    </span>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {courses.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => handleSelectCourse(course.title, "course", course.price)}
                          className={`text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                            selectedCourse === course.title && selectedType === "course"
                              ? "border-[#2F3E56] bg-[#2F3E56]/5 font-bold text-[#2F3E56]"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="truncate pr-2">{course.title}</span>
                          <span className="font-bold text-[#C88A58] flex-shrink-0">₹{course.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Checkout Summary & Pay Action */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-gray-200/80 sticky top-6">
              <h2 className="text-base font-bold text-[#2F3E56] mb-5 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#C88A58]" />
                <span>Order Summary</span>
              </h2>

              <div className="space-y-3 pb-5 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Program Fee</span>
                  <span className="font-semibold text-gray-800">₹{selectedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Assessment & Certificate</span>
                  <span className="text-emerald-600 font-semibold">Included Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Gateway Charges</span>
                  <span className="text-emerald-600 font-semibold">₹0 (Waived)</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center text-lg font-bold text-[#2F3E56]">
                <span>Total Amount</span>
                <span className="text-2xl font-extrabold text-[#2F3E56] font-montserrat">
                  ₹{selectedAmount.toLocaleString()}
                </span>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#2F3E56] to-[#1E2A3C] hover:from-[#1E2A3C] hover:to-[#151D2A] text-white font-bold rounded-2xl shadow-xl shadow-[#2F3E56]/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Secure Pay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Trust & Guarantee */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Official ICICI Bank Payment Gateway</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-bit Bank Grade Data Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Award className="w-4 h-4 text-[#C88A58] flex-shrink-0" />
                  <span>Verified Digital Certificate Upon Completion</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EnrollmentPayPage() {
  return (
    <Suspense fallback={<PayLoading />}>
      <PayContent />
    </Suspense>
  );
}
