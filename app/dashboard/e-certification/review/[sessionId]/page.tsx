"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HelpCircle, ChevronLeft, CheckCircle2, XCircle, Award, Clock, Calendar, Check, AlertTriangle } from "lucide-react";

interface QuestionReview {
  questionText: string;
  options: string[];
  correctOption: "A" | "B" | "C" | "D";
  studentAnswer: string | null;
  explanation: string;
}

interface ExamReview {
  sessionId: string;
  examId: string;
  examTitle: string;
  score: number;
  correctCount: number;
  totalCount: number;
  timeTaken: string;
  submittedAt: string;
  passed: boolean;
  certificateId: string;
  questions: QuestionReview[];
}

export default function ExamReviewPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();

  const [review, setReview] = useState<ExamReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/student/exams/review?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.review) {
          setReview(data.review);
        } else {
          router.push("/dashboard/e-certification");
        }
      } catch (err) {
        console.error("Error loading review details:", err);
        router.push("/dashboard/e-certification");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchReview();
    }
  }, [sessionId]);

  if (loading || !review) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-400">Loading exam review data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/e-certification/result/${sessionId}`}
            className="w-10 h-10 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E7C3A]">
              Exam Submission Review
            </span>
            <h2 className="text-lg md:text-xl font-bold text-[#2F3E56] mt-0.5 leading-none pr-6">
              {review.examTitle}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
            review.passed 
              ? "bg-green-50 text-green-700 border border-green-100" 
              : "bg-red-50 text-red-600 border border-red-100"
          }`}>
            {review.passed ? "Passed" : "Failed"}
          </span>
          <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-black px-3.5 py-1.5 rounded-full">
            Score: {review.score}%
          </span>
        </div>
      </div>

      {/* Attempt Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-xs font-bold text-gray-600">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <Clock className="w-5 h-5 text-[#6E7C3A]" />
          <div>
            <span className="block text-gray-400 font-medium text-[10px] uppercase">Time Taken</span>
            <span className="text-gray-800 text-sm mt-0.5 block">{review.timeTaken}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start border-y md:border-y-0 md:border-x border-gray-100 py-3 md:py-0 md:px-6">
          <Calendar className="w-5 h-5 text-[#6E7C3A]" />
          <div>
            <span className="block text-gray-400 font-medium text-[10px] uppercase">Date Completed</span>
            <span className="text-gray-800 text-sm mt-0.5 block">
              {new Date(review.submittedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start md:pl-6">
          <Award className="w-5 h-5 text-[#6E7C3A]" />
          <div>
            <span className="block text-gray-400 font-medium text-[10px] uppercase">Certificate ID</span>
            <span className="text-[#6E7C3A] font-mono text-sm mt-0.5 block select-all">
              {review.passed && review.certificateId ? review.certificateId : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {review.questions.map((q, idx) => {
          const isCorrect = q.studentAnswer === q.correctOption;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              
              {/* Question Text */}
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                  isCorrect 
                    ? "bg-green-100 text-green-700" 
                    : (q.studentAnswer === null ? "bg-gray-100 text-gray-400" : "bg-red-100 text-red-600")
                }`}>
                  {idx + 1}
                </span>
                <h3 className="font-bold text-[#2F3E56] text-sm md:text-base leading-snug">
                  {q.questionText}
                </h3>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                {["A", "B", "C", "D"].map((optLetter, optIdx) => {
                  const optText = q.options[optIdx] || "";
                  const isStudentSelection = q.studentAnswer === optLetter;
                  const isCorrectAnswer = q.correctOption === optLetter;

                  let style = "bg-white border-gray-150 text-gray-700";
                  let badge = null;

                  if (isStudentSelection) {
                    if (isCorrect) {
                      style = "bg-green-50/50 border-green-300 text-green-800 font-semibold";
                      badge = (
                        <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-[9px] shrink-0">
                          ✓
                        </div>
                      );
                    } else {
                      style = "bg-red-50/50 border-red-200 text-red-800 font-semibold";
                      badge = (
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[9px] shrink-0">
                          ✕
                        </div>
                      );
                    }
                  } else if (isCorrectAnswer) {
                    // Highlight correct key if student answered wrong
                    style = "border-2 border-green-400 text-green-800 bg-green-50/10";
                    badge = (
                      <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">
                        Correct
                      </span>
                    );
                  }

                  return (
                    <div
                      key={optLetter}
                      className={`px-4 py-3 border rounded-xl flex items-center justify-between text-xs font-medium transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          isStudentSelection 
                            ? (isCorrect ? "bg-green-600 text-white" : "bg-red-500 text-white") 
                            : (isCorrectAnswer ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")
                        }`}>
                          {optLetter}
                        </span>
                        <span>{optText}</span>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Explanation panel */}
              <div className="pl-9">
                <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-4 text-xs">
                  <span className="font-bold text-[#6E7C3A] block mb-1">Explanation:</span>
                  <p className="text-gray-500 leading-normal">
                    {q.explanation || "No explanation provided for this question."}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer back button */}
      <div className="text-center py-6 select-none">
        <Link
          href={`/dashboard/e-certification/result/${sessionId}`}
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#2F3E56] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl shadow-md transition-all"
        >
          Back to Exam Results
        </Link>
      </div>

    </div>
  );
}
