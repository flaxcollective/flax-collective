"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Clock, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, XCircle, Star, AlertCircle, RefreshCw } from "lucide-react";

interface Question {
  questionText: string;
  options: string[];
}

interface ActiveSession {
  sessionId: string;
  examId: string;
  questions: Question[];
  answers: Record<string, string>;
  markedForReview: number[];
  remainingSeconds: number;
}

export default function ExamRunnerPage({ params }: { params: Promise<{ examId: string }> }) {
  const resolvedParams = use(params);
  const examId = resolvedParams.examId;
  const router = useRouter();

  const [session, setSession] = useState<ActiveSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Fetch session on load
  const fetchSession = async () => {
    try {
      const res = await fetch(`/api/student/exams/session?examId=${examId}`);
      const data = await res.json();
      if (data.success && data.activeSession) {
        const s = data.activeSession;
        setSession(s);
        setAnswers(s.answers || {});
        setMarkedForReview(s.markedForReview || []);
        setTimeLeft(s.remainingSeconds);
      } else {
        // Redirect to portal if no active session
        router.push("/dashboard/e-certification");
      }
    } catch (err) {
      console.error("Error loading exam session:", err);
      router.push("/dashboard/e-certification");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [examId]);

  // Save progress dynamically
  const saveProgress = async (updatedAnswers = answers, updatedMarked = markedForReview) => {
    if (!session) return;
    try {
      await fetch("/api/student/exams/session", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.sessionId,
          answers: updatedAnswers,
          markedForReview: updatedMarked
        })
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
  };

  const handleSelectOption = (optionLetter: string) => {
    const newAnswers = { ...answers, [currentIdx.toString()]: optionLetter };
    setAnswers(newAnswers);
    saveProgress(newAnswers, markedForReview);
  };

  const handleToggleMark = () => {
    let newMarked = [...markedForReview];
    if (markedForReview.includes(currentIdx)) {
      newMarked = newMarked.filter((i) => i !== currentIdx);
    } else {
      newMarked.push(currentIdx);
    }
    setMarkedForReview(newMarked);
    saveProgress(answers, newMarked);
  };

  const handleNext = () => {
    if (!session) return;
    if (currentIdx < session.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleAutoSubmit = () => {
    alert("Time has run out! Submitting your exam automatically.");
    submitExam();
  };

  const submitExam = async () => {
    if (!session || submitting) return;
    setSubmitting(true);
    setIsSubmitModalOpen(false);
    
    try {
      const res = await fetch("/api/student/exams/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.sessionId })
      });
      const data = await res.json();
      if (data.success && data.results) {
        router.push(`/dashboard/e-certification/result/${data.results.sessionId}`);
      } else {
        alert(data.message || "Failed to submit exam.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Error submitting exam:", err);
      alert("Error submitting exam.");
      setSubmitting(false);
    }
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-400">Loading Exam Engine...</span>
        </div>
      </div>
    );
  }

  const questions = session.questions;
  const currentQuestion = questions[currentIdx];
  const selectedAnswer = answers[currentIdx.toString()];
  
  // Progress calculations
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-gray-800 font-sans">
      
      {/* Exam Header */}
      <header className="bg-[#2F3E56] text-white px-6 py-4 flex items-center justify-between shadow-md select-none">
        <h1 className="font-bold text-sm md:text-base font-serif flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[#6E7C3A]" />
          {examId === "DLC" ? "Digital Literacy Certification Exam" : (examId === "AEC" ? "Advanced Excel Certification Exam" : "Microsoft Word Certification Exam")}
        </h1>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/25 rounded-xl border border-white/10 text-xs font-mono font-bold">
            <Clock className="w-4 h-4 text-[#6E7C3A] animate-pulse" />
            {formatTime(timeLeft)}
          </div>
          
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-white hover:bg-gray-100 text-[#2F3E56] text-xs font-bold rounded-xl transition-all shadow cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Runner Body */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Pane (70%) - Quiz Runner */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2 select-none">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#2F3E56]">Question {currentIdx + 1} Of {totalQuestions}</span>
              <span className="text-gray-400">{completionPercentage}% Completed</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#2F3E56] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-[#2F3E56] text-base md:text-lg leading-snug">
              {currentQuestion?.questionText}
            </h2>

            {/* Options vertical stack */}
            <div className="space-y-3.5">
              {["A", "B", "C", "D"].map((optLetter, optIdx) => {
                const optText = currentQuestion?.options[optIdx] || "";
                const isSelected = selectedAnswer === optLetter;
                return (
                  <button
                    key={optLetter}
                    onClick={() => handleSelectOption(optLetter)}
                    className={`w-full text-left px-5 py-4 border rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer text-sm font-medium ${
                      isSelected
                        ? "bg-[#6e7c3a]/5 border-[#6E7C3A] text-[#6E7C3A] shadow-sm"
                        : "bg-white border-gray-150 text-gray-700 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                        isSelected
                          ? "bg-[#6E7C3A] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {optLetter}
                      </span>
                      <span>{optText}</span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#6E7C3A] flex items-center justify-center text-white shrink-0 text-[10px]">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Hint */}
            <div className="bg-[#F4F1EA]/50 border border-gray-100 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-gray-500 font-medium select-none">
              <AlertCircle className="w-4 h-4 text-[#6E7C3A] shrink-0 mt-0.5" />
              <span>You can review and change your answers before submitting the exam.</span>
            </div>

            {/* Navigation Actions Footer */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent font-bold text-xs text-gray-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleToggleMark}
                className={`px-4 py-2.5 border rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  markedForReview.includes(currentIdx)
                    ? "bg-[#2F3E56]/10 border-[#2F3E56] text-[#2F3E56]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {markedForReview.includes(currentIdx) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#2F3E56]" />
                    Marked for Review
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-gray-400" />
                    Mark for Review
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIdx === totalQuestions - 1}
                className="px-5 py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] disabled:opacity-40 disabled:hover:bg-[#6E7C3A] text-white font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5 cursor-pointer"
              >
                Save & Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Pane (30%) - Navigator Sidebar */}
        <div className="space-y-6">
          
          {/* Navigator Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5 select-none">
            <h3 className="font-bold text-[#2F3E56] text-sm md:text-base font-serif">
              Questions Navigator
            </h3>
            
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = answers[idx.toString()] !== undefined;
                const isMarked = markedForReview.includes(idx);
                
                let btnStyle = "bg-white border-gray-200 text-gray-600 hover:bg-gray-50";
                if (isCurrent) {
                  btnStyle = "border-2 border-[#6E7C3A] text-gray-800 font-bold bg-[#FAF8F5]";
                } else if (isMarked) {
                  btnStyle = "bg-[#2F3E56] text-white border-[#2F3E56]";
                } else if (isAnswered) {
                  btnStyle = "bg-[#10B981] text-white border-[#10B981]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIdx(idx);
                      saveProgress();
                    }}
                    className={`w-10 h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-[11px] font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#10B981]" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded border border-[#6E7C3A] bg-[#FAF8F5]" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#2F3E56]" />
                <span>Marked for Review ({markedForReview.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded border border-gray-200 bg-white" />
                <span>Not Answered ({unansweredCount})</span>
              </div>
            </div>
          </div>

          {/* Warnings Box */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center text-xs font-medium space-y-2.5 select-none">
            <Star className="w-6 h-6 text-amber-500 mx-auto fill-amber-500 animate-spin-slow" />
            <h5 className="font-bold text-amber-800">Important</h5>
            <p className="text-amber-700 leading-normal">
              Do not refresh or close the browser window until you submit the exam.
            </p>
          </div>

        </div>

      </main>

      {/* Submit Confirmation Modal (Screenshot 4) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center text-center transform scale-98 transition-all space-y-5 animate-scale-up">
            
            {/* Header Check Icon */}
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-inner text-2xl font-serif">
              ✓
            </div>

            <div>
              <h3 className="font-bold text-[#2F3E56] text-lg font-serif">
                Submit Exam?
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                You are about to submit the exam.
              </p>
            </div>

            {/* Questions Answered Stats */}
            <div className="w-full bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 text-xs font-bold text-gray-700 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Answered
                </span>
                <span className="text-green-600">{answeredCount.toString().padStart(2, "0")} of {totalQuestions} Questions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-gray-500">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Unanswered
                </span>
                <span className="text-red-500">{unansweredCount.toString().padStart(2, "0")} of {totalQuestions} Questions</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400">
              Once submitted, you won't be able to modify your answers.
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full border-t border-gray-50 pt-4">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-[#6E7C3A] hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitExam}
                disabled={submitting}
                className="py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
