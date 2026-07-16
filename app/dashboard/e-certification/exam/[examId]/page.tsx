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

  // Anti-cheat state
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

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

  // Anti-cheat mechanisms
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarningMessage("Warning: You are not allowed to switch tabs or minimize the window during the exam.");
        setShowWarning(true);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setWarningMessage("Warning: Copying content is disabled during the exam.");
      setShowWarning(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // Fullscreen enforcement
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.warn("Could not enter fullscreen mode:", err);
      }
    };

    const handleInteraction = () => {
      enterFullscreen();
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] text-gray-800 font-sans select-none">
      
      {/* Exam Header */}
      <header className="bg-[#2F3E56] text-white px-8 py-4 flex items-center justify-between shadow-sm select-none">
        <h1 className="font-medium text-lg md:text-xl font-serif">
          {examId === "DLC" ? "Digital Literacy Certification Exam" : (examId === "AEC" ? "Advanced Excel Certification Exam" : "Microsoft Word Certification Exam")}
        </h1>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-6 py-2.5 bg-[#F6F4ED] hover:bg-white text-[#7B7A41] font-bold rounded-md transition-all shadow-sm cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Runner Body */}
      <main className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Pane (70%) - Quiz Runner */}
        <div className="lg:col-span-2 bg-[#E6E2D6] rounded-[20px] p-8 md:p-10 flex flex-col shadow-sm border border-[#D9D3C1]">
          
          <div className="space-y-8">
            {/* Progress Indicator */}
            <div className="flex items-center gap-4 text-sm font-bold text-[#2F3E56]">
              <span className="whitespace-nowrap">Question {currentIdx + 1} Of {totalQuestions}</span>
              <div className="flex-1 relative flex items-center">
                <div className="w-full bg-[#C5C0B3] h-1.5 rounded-full overflow-visible flex items-center">
                  <div 
                    className="bg-[#2F3E56] h-1.5 rounded-full relative transition-all duration-300" 
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#7B7A41] rounded-full translate-x-1/2"></div>
                  </div>
                </div>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap font-medium">{completionPercentage}% Completed</span>
            </div>

            {/* Question Box */}
            <h2 className="font-bold text-gray-900 text-xl md:text-[22px] font-serif leading-snug">
              {currentQuestion?.questionText}
            </h2>

            {/* Options vertical stack */}
            <div className="space-y-4 pt-2">
              {["A", "B", "C", "D"].map((optLetter, optIdx) => {
                const optText = currentQuestion?.options[optIdx] || "";
                const isSelected = selectedAnswer === optLetter;
                return (
                  <button
                    key={optLetter}
                    onClick={() => handleSelectOption(optLetter)}
                    className={`w-full text-left px-5 py-4 rounded-[14px] flex items-center justify-between transition-all duration-200 cursor-pointer text-base font-medium ${
                      isSelected
                        ? "bg-[#A7DFB5] border border-[#22C55E] text-gray-900 shadow-sm"
                        : "bg-white border border-transparent text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        isSelected
                          ? "bg-[#22C55E] text-white"
                          : "bg-[#2F3E56] text-white"
                      }`}>
                        {optLetter}
                      </span>
                      <span>{optText}</span>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full border-[1.5px] border-[#22C55E] flex items-center justify-center text-[#22C55E] shrink-0 text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Hint */}
            <div className="bg-[#D1CCB7] border border-[#BDB8A2] rounded-lg p-4 flex items-center gap-3 text-sm text-[#5D5745] font-medium">
              <svg className="w-5 h-5 shrink-0 text-[#6B654C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>You can review and change your answers before submitting the exam.</span>
            </div>
          </div>

          {/* Navigation Actions Footer */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-6 py-2.5 border border-[#AFA999] text-[#494436] rounded-lg hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-transparent font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              ← Previous
            </button>

            <button
              onClick={handleToggleMark}
              className={`px-6 py-2.5 border rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
                markedForReview.includes(currentIdx)
                  ? "bg-[#2F3E56]/10 border-[#2F3E56] text-[#2F3E56]"
                  : "border-[#AFA999] text-[#494436] hover:bg-black/5"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Mark for Review
            </button>

            <button
              onClick={handleNext}
              disabled={currentIdx === totalQuestions - 1}
              className="px-6 py-2.5 bg-[#7B7A41] hover:bg-[#656333] disabled:opacity-40 disabled:hover:bg-[#7B7A41] text-white font-medium text-sm rounded-lg transition-all shadow flex items-center gap-2 cursor-pointer"
            >
              Save & Next →
            </button>
          </div>

        </div>

        {/* Right Pane (30%) - Navigator Sidebar */}
        <div className="space-y-6">
          
          {/* Navigator Grid */}
          <div className="bg-[#FAF9F6] rounded-[20px] border border-[#E5E0D5] p-8 shadow-sm space-y-8">
            <h3 className="font-bold text-gray-900 text-xl font-serif">
              Questions Navigator
            </h3>
            
            <div className="grid grid-cols-5 gap-3">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = answers[idx.toString()] !== undefined;
                const isMarked = markedForReview.includes(idx);
                
                let btnStyle = "bg-white border-gray-200 text-gray-700 hover:bg-gray-50";
                if (isCurrent) {
                  btnStyle = "bg-[#FAF9F6] border-[#7B7A41] text-[#7B7A41] font-bold";
                } else if (isMarked) {
                  btnStyle = "bg-[#2F3E56] text-white border-[#2F3E56]";
                } else if (isAnswered) {
                  btnStyle = "bg-[#22C55E] text-white border-[#22C55E]";
                }

                return (
                  <div key={idx} className="relative">
                    <button
                      onClick={() => {
                        setCurrentIdx(idx);
                        saveProgress();
                      }}
                      className={`w-full aspect-square rounded-lg border text-sm font-semibold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                    {isCurrent && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#7B7A41] rounded-full border-2 border-[#FAF9F6]" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="border-t border-[#E5E0D5] pt-6 space-y-4 text-[13px] font-medium text-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm bg-[#22C55E]" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm border-[1.5px] border-[#7B7A41] bg-transparent" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm bg-[#2F3E56]" />
                <span>Marked for Review ({markedForReview.length})</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white" />
                <span>Not Answered ({unansweredCount})</span>
              </div>
            </div>

            {/* Warnings Box */}
            <div className="bg-[#EAE5D7] rounded-[14px] p-5 space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#E8A51D] fill-[#E8A51D]" />
                <h5 className="font-bold text-gray-900 text-sm">Important</h5>
              </div>
              <p className="text-gray-800 text-[13px] leading-relaxed">
                Do not refresh or close the browser window until you submit the exam.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Submit Confirmation Modal (Screenshot 4) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#FAF9F6] rounded-[20px] shadow-xl w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center text-center transform scale-98 transition-all space-y-5 animate-scale-up">
            
            {/* Header Check Icon */}
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-inner text-2xl font-serif">
              ✓
            </div>

            <div>
              <h3 className="font-bold text-[#2F3E56] text-lg font-serif">
                Submit Exam?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                You are about to submit the exam.
              </p>
            </div>

            {/* Questions Answered Stats */}
            <div className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs font-bold text-gray-700 space-y-2.5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Answered
                </span>
                <span className="text-green-600">{answeredCount.toString().padStart(2, "0")} of {totalQuestions} Questions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Unanswered
                </span>
                <span className="text-red-500">{unansweredCount.toString().padStart(2, "0")} of {totalQuestions} Questions</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 font-medium">
              Once submitted, you won't be able to modify your answers.
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full border-t border-gray-200 pt-4">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitExam}
                disabled={submitting}
                className="py-2.5 bg-[#7B7A41] hover:bg-[#656333] text-white text-sm font-medium rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Anti-Cheat Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-sm border border-red-100 p-6 flex flex-col items-center text-center animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shadow-inner mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Warning!</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {warningMessage}
            </p>
            <button
              onClick={() => {
                setShowWarning(false);
                if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                }
              }}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
