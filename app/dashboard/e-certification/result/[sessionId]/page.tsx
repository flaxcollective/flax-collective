"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Award, Clock, Calendar, CheckCircle2, ChevronRight, FileText, ArrowRight, Home, LayoutDashboard, Share2, HelpCircle } from "lucide-react";

interface ExamResult {
  sessionId: string;
  examId: string;
  examTitle: string;
  score: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  timeTaken: string;
  submittedAt: string;
  certificateId: string;
}

export default function ExamResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();

  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/student/exams/review?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.review) {
          setResult(data.review);
        } else {
          router.push("/dashboard/e-certification");
        }
      } catch (err) {
        console.error("Error fetching results details:", err);
        router.push("/dashboard/e-certification");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchResult();
    }
  }, [sessionId]);

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-400">Retrieving results details...</span>
        </div>
      </div>
    );
  }

  // SVG parameters for the score circle gauge
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="bg-[#FAF8F5] min-h-screen p-1 md:p-6 lg:p-10 flex items-center justify-center font-sans">
      
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 md:p-10 text-center relative animate-scale-up space-y-8">
        
        {/* Golden Trophy Card Header with floating stars */}
        <div className="relative inline-block select-none">
          {/* Trophy graphic */}
          <div className="w-32 h-32 mx-auto bg-[#FAF8F5] rounded-full flex items-center justify-center border border-gray-50 shadow-inner relative z-10 text-6xl transform hover:rotate-6 transition-transform">
            🏆
          </div>
          {/* Floating Stars */}
          <span className="absolute top-0 left-2 text-2xl animate-bounce-slow text-yellow-400 select-none">★</span>
          <span className="absolute top-12 right-0 text-xl animate-bounce-slow text-amber-500 delay-300 select-none">✦</span>
          <span className="absolute bottom-2 left-0 text-xl animate-bounce-slow text-yellow-300 delay-700 select-none">✦</span>
          <span className="absolute bottom-4 right-2 text-2xl animate-bounce-slow text-amber-400 delay-500 select-none">★</span>
        </div>

        {/* Status Messages */}
        <div className="space-y-3">
          {result.passed ? (
            <>
              <div className="inline-flex items-center justify-center px-6 py-1.5 bg-[#10B981] text-white text-xs font-black tracking-widest uppercase rounded-full shadow-sm animate-bounce">
                Congratulations!
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F3E56] font-serif leading-tight max-w-md mx-auto">
                You have successfully completed the exam!
              </h2>
              <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto">
                Great job! You have demonstrated excellent understanding of {result.examId === "DLC" ? "Digital Literacy" : (result.examId === "AEC" ? "Advanced Excel" : "Microsoft Word")} concepts.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center px-6 py-1.5 bg-red-600 text-white text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
                Exam Not Passed
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F3E56] font-serif leading-tight max-w-md mx-auto">
                You did not meet the passing criteria
              </h2>
              <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto">
                Don't worry! Review your incorrect answers and try again once you feel ready.
              </p>
            </>
          )}
        </div>

        {/* Results Metrics Box */}
        <div className="bg-[#FAF8F5]/80 border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-center gap-8 max-w-lg mx-auto">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center select-none">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-gray-100 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className={`fill-none transition-all duration-1000 ease-out ${
                  result.passed ? "stroke-[#10B981]" : "stroke-red-500"
                }`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="block text-2xl font-black text-[#2F3E56] leading-none">{result.score}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Your Score</span>
            </div>
          </div>

          {/* Right Text details inside summary card */}
          <div className="text-center sm:text-left space-y-2 font-sans">
            <div className="text-base font-black text-gray-700 leading-none">
              {result.correctCount} / {result.totalCount}
            </div>
            <div className="text-xs text-gray-400 font-semibold leading-none">Correct Answers</div>
            
            <div className="pt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                result.passed 
                  ? "bg-green-50 text-green-700 border border-green-100" 
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                {result.passed ? "Passed" : "Failed"}
              </span>
            </div>
            
            <div className="text-[10px] text-gray-400 font-medium pt-1">
              Passing Score: 80%
            </div>
          </div>

        </div>

        {/* Attempt Details Row */}
        <div className="grid grid-cols-3 gap-2 bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 text-[11px] font-bold text-gray-600 max-w-lg mx-auto">
          <div className="text-center border-r border-gray-100 space-y-1">
            <span className="block text-gray-400 text-[10px] font-medium uppercase">Time Taken</span>
            <div className="flex items-center justify-center gap-1 text-gray-700 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#6E7C3A] shrink-0" />
              <span>{result.timeTaken}</span>
            </div>
          </div>
          <div className="text-center border-r border-gray-100 space-y-1">
            <span className="block text-gray-400 text-[10px] font-medium uppercase">Date Completed</span>
            <div className="flex items-center justify-center gap-1 text-gray-700 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#6E7C3A] shrink-0" />
              <span>
                {new Date(result.submittedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
          <div className="text-center space-y-1">
            <span className="block text-gray-400 text-[10px] font-medium uppercase">Certificate ID</span>
            <div className="flex items-center justify-center gap-1 text-[#6E7C3A] mt-0.5 font-mono select-all">
              <Award className="w-3.5 h-3.5 text-[#6E7C3A] shrink-0" />
              <span>{result.passed && result.certificateId ? result.certificateId : "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-gray-100 pt-6 max-w-lg mx-auto w-full">
          <button
            onClick={() => router.push(`/dashboard/e-certification/review/${result.sessionId}`)}
            className="w-full sm:w-auto px-5 py-3 border border-gray-200 hover:border-[#6E7C3A] rounded-xl text-xs font-bold text-[#6E7C3A] hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            Review Answers
          </button>
          
          {result.passed && (
            <button
              onClick={() => window.open(`/dashboard/e-certification/certificate/${result.sessionId}`, "_blank")}
              className="w-full sm:w-auto px-6 py-3 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Download Certificate
            </button>
          )}

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto px-5 py-3 border border-gray-200 hover:border-[#2F3E56] rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </button>
        </div>

        {result.passed && (
          <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 text-[10px] leading-relaxed text-gray-400 max-w-lg mx-auto select-none flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#6E7C3A] shrink-0 mt-0.5" />
            <span>Your certificate has been generated successfully. You can download or print it now, or retrieve it later from your dashboard achievements area.</span>
          </div>
        )}

      </div>

    </div>
  );
}
