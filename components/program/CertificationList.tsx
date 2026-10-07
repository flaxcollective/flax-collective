"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Award, Clock, FileText, CheckCircle2, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export interface ExamItem {
  examId: string;
  title: string;
  desc: string;
  fullDesc: string;
  price: string;
  discountedPrice: string;
  duration: number;
  passingMarks: number;
  totalQuestions: number;
  isActive?: boolean;
  isPurchased?: boolean;
  hasPassed?: boolean;
  lastSession?: {
    sessionId: string;
    status: string;
    score: number;
    passed: boolean;
    submittedAt?: string;
    certificateId?: string;
  } | null;
}

interface CertificationListProps {
  onApplyExam: (examTitle: string) => void;
}

export default function CertificationList({ onApplyExam }: CertificationListProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.exams)) {
          setExams(data.exams);
        }
      })
      .catch((err) => {
        console.error("Error loading exams from database:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const calculateDiscount = (original: string, discounted: string) => {
    const o = parseFloat(original);
    const d = parseFloat(discounted);
    if (isNaN(o) || isNaN(d) || o <= d) return 0;
    return Math.round(((o - d) / o) * 100);
  };

  return (
    <>
      <section id="e-certifications-section" className="pt-10 pb-10 md:pb-14 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Certifications Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#736A2F] rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-gray-500">Loading certifications from database...</p>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No certifications available at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exams.map((exam) => {
                const discountPct = calculateDiscount(exam.price, exam.discountedPrice);
            return (
              <div
                key={exam.examId}
                className="bg-[#6E7C3A26] rounded-2xl border border-[#BDBDBD] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Exam Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#2F3E56]/10 text-[#2F3E56]">
                      Online Exam
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#736A2F]/15 flex items-center justify-center text-[#736A2F]">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-semibold text-base text-[#111] leading-snug min-h-[48px] line-clamp-2">
                    {exam.title}
                  </h4>

                  {/* Short Description */}
                  <p className="text-xs text-[#555] line-clamp-3 mt-2 leading-relaxed min-h-[54px]">
                    {exam.desc}
                  </p>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-1 py-3 my-3 border-y border-[#BDBDBD]/60 text-center">
                    <div>
                      <span className="block text-[10px] text-gray-500 font-medium">Questions</span>
                      <span className="block text-xs font-bold text-[#736A2F]">{exam.totalQuestions} MCQs</span>
                    </div>
                    <div className="border-x border-[#BDBDBD]/60">
                      <span className="block text-[10px] text-gray-500 font-medium">Duration</span>
                      <span className="block text-xs font-bold text-[#736A2F]">{exam.duration} Mins</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 font-medium">Pass Score</span>
                      <span className="block text-xs font-bold text-[#736A2F]">{exam.passingMarks}%</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#2F3E56]">₹{exam.discountedPrice}</span>
                      {discountPct > 0 && (
                        <span className="text-xs text-gray-400 line-through">₹{exam.price}</span>
                      )}
                    </div>
                    {discountPct > 0 && (
                      <span className="bg-[#736A2F]/20 text-[#736A2F] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-col gap-2 pt-1 border-t border-[#BDBDBD]/40">
                  {user && exam.hasPassed ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/e-certification/result/${exam.lastSession?.sessionId}`)}
                        className="flex-1 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Passed
                      </button>
                      <button
                        onClick={() => setSelectedExam(exam)}
                        className="py-2 px-3 border border-[#2F3E56] text-[#2F3E56] hover:bg-[#2F3E56] hover:text-white text-xs font-medium rounded-lg cursor-pointer transition text-center"
                      >
                        Details
                      </button>
                    </div>
                  ) : user && exam.isPurchased ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/e-certification/exam/${exam.examId}`)}
                        className="flex-1 py-2 bg-[#736A2F] hover:bg-[#5a5223] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition"
                      >
                        Start Exam
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedExam(exam)}
                        className="py-2 px-3 border border-[#2F3E56] text-[#2F3E56] hover:bg-[#2F3E56] hover:text-white text-xs font-medium rounded-lg cursor-pointer transition text-center"
                      >
                        Details
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApplyExam(exam.title)}
                        className="flex-1 py-2 bg-[#2F3E56] hover:bg-[#1e293b] text-white text-xs font-semibold rounded-lg cursor-pointer shadow-sm transition text-center"
                      >
                        Register & Pay
                      </button>
                      <button
                        onClick={() => setSelectedExam(exam)}
                        className="py-2 px-3 border border-[#2F3E56] text-[#2F3E56] hover:bg-[#2F3E56] hover:text-white text-xs font-medium rounded-lg cursor-pointer transition text-center"
                      >
                        Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

        {/* View Details Modal */}
        {selectedExam && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 animate-fade-in backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl animate-scale-up">
              <button
                onClick={() => setSelectedExam(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#736A2F]/20 flex items-center justify-center text-[#736A2F] shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#736A2F] uppercase tracking-wider">
                    E-Certification Assessment
                  </span>
                  <h3 className="text-xl font-bold text-[#2F3E56] leading-snug">
                    {selectedExam.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {selectedExam.fullDesc || selectedExam.desc}
              </p>

              {/* Exam Parameters */}
              <div className="grid grid-cols-3 gap-3 bg-[#FAF8F5] border border-gray-200 rounded-xl p-4 mb-6 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[#736A2F] text-xs font-semibold mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    Questions
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{selectedExam.totalQuestions} MCQs</span>
                </div>
                <div className="border-x border-gray-200">
                  <div className="flex items-center justify-center gap-1 text-[#736A2F] text-xs font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    Duration
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{selectedExam.duration} Minutes</span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-[#736A2F] text-xs font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passing Score
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{selectedExam.passingMarks}%</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Registration Fee</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#2F3E56]">₹{selectedExam.discountedPrice}</span>
                    <span className="text-sm text-gray-400 line-through">₹{selectedExam.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedExam(null)}
                    className="px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-black cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedExam.title;
                      setSelectedExam(null);
                      onApplyExam(title);
                    }}
                    className="bg-[#2F3E56] hover:bg-[#1e293b] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    Register & Pay Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </section>
      <div className="global-page-divider mt-10 md:mt-14"></div>
    </>
  );
}
