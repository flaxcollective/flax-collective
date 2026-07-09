"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HelpCircle, ChevronLeft, Plus, Edit, Trash2, CheckCircle, AlertCircle, X, AlignLeft } from "lucide-react";

interface Question {
  _id: string;
  examId: string;
  questionText: string;
  options: string[];
  correctOption: "A" | "B" | "C" | "D";
  explanation?: string;
}

interface Exam {
  examId: string;
  title: string;
  totalQuestions: number;
}

function QuestionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = searchParams.get("examId") || "";

  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "A",
    explanation: ""
  });

  const fetchData = async () => {
    if (!examId) return;
    setLoading(true);
    try {
      // Fetch Exam details
      const examRes = await fetch("/api/admin/exams");
      const examData = await examRes.json();
      if (examData.success) {
        const found = examData.exams.find((e: Exam) => e.examId === examId);
        setExam(found || null);
      }

      // Fetch questions
      const qRes = await fetch(`/api/admin/exams/questions?examId=${examId}`);
      const qData = await qRes.json();
      if (qData.success) {
        setQuestions(qData.questions || []);
      }
    } catch (err) {
      console.error("Error fetching question data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchData();
    }
  }, [examId]);

  const handleOpenAdd = () => {
    setForm({
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "A",
      explanation: ""
    });
    setIsEditing(false);
    setStatus("idle");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: Question) => {
    setForm({
      questionText: q.questionText,
      optionA: q.options[0] || "",
      optionB: q.options[1] || "",
      optionC: q.options[2] || "",
      optionD: q.options[3] || "",
      correctOption: q.correctOption,
      explanation: q.explanation || ""
    });
    setCurrentQuestionId(q._id);
    setIsEditing(true);
    setStatus("idle");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(`/api/admin/exams/questions?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        alert("Question deleted successfully.");
        fetchData();
      } else {
        alert(data.message || "Failed to delete question.");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Error deleting question.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!form.questionText || !form.optionA || !form.optionB || !form.optionC || !form.optionD || !form.correctOption) {
      setStatus("error");
      setMessage("Please fill in the question text and all four options.");
      return;
    }

    const payload = {
      id: currentQuestionId,
      examId,
      questionText: form.questionText,
      options: [form.optionA, form.optionB, form.optionC, form.optionD],
      correctOption: form.correctOption,
      explanation: form.explanation
    };

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/admin/exams/questions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(isEditing ? "Question updated successfully!" : "Question added successfully!");
        fetchData();
        setTimeout(() => setIsModalOpen(false), 1200);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to submit question.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Server connection error.");
    }
  };

  if (!examId) {
    return (
      <div className="p-6 text-center text-red-500 font-bold">
        Error: Exam ID is missing. Please go back to the Exams Panel.
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      
      {/* Navigation & Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin-dashboard/exams"
            className="w-10 h-10 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E7C3A] font-sans">
              Exam Questions Editor ({examId})
            </span>
            <h2 className="text-lg md:text-xl font-bold text-[#2F3E56] mt-0.5 leading-none pr-6">
              {exam ? exam.title : "Loading Exam..."}
            </h2>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* Stats Summary */}
      {exam && (
        <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-6">
            <span className="text-gray-500">
              Required Test Size: <strong className="text-gray-800">{exam.totalQuestions} MCQs</strong>
            </span>
            <span className="text-gray-500">
              Total In Pool: <strong className="text-[#6E7C3A]">{questions.length} Questions</strong>
            </span>
          </div>
          {questions.length < exam.totalQuestions && (
            <span className="text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg text-[10px]">
              ⚠️ Warning: You need at least {exam.totalQuestions} questions in the pool to run this exam.
            </span>
          )}
        </div>
      )}

      {/* Questions Listing */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
              <span className="text-sm font-semibold text-gray-400">Loading questions database...</span>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-400 text-sm">No Questions Configured</h4>
            <p className="text-xs text-gray-400 mt-1 mb-4">Add multiple-choice questions to build the testing pool.</p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#6E7C3A] text-white rounded-lg text-xs font-semibold hover:bg-[#5a6630]"
            >
              Add First Question
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q._id} className="border border-gray-100 rounded-xl bg-white p-5 hover:border-gray-200 transition-all flex flex-col md:flex-row justify-between gap-4">
                
                {/* Question Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#2F3E56]/10 text-[#2F3E56] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-[#2F3E56] text-sm md:text-base leading-snug">
                      {q.questionText}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8 text-xs">
                    {["A", "B", "C", "D"].map((optLabel, optIdx) => {
                      const optText = q.options[optIdx] || "";
                      const isCorrect = q.correctOption === optLabel;
                      return (
                        <div
                          key={optLabel}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all ${
                            isCorrect 
                              ? "bg-green-50 border-green-200 text-green-700 font-semibold" 
                              : "bg-gray-50 border-gray-100 text-gray-600"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            isCorrect 
                              ? "bg-green-600 text-white" 
                              : "bg-gray-200 text-gray-500"
                          }`}>
                            {optLabel}
                          </span>
                          <span>{optText}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  {q.explanation && (
                    <div className="pl-8 pt-1 text-xs">
                      <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-3 text-gray-500">
                        <span className="font-bold text-[#6E7C3A] block mb-1">Explanation:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Question Actions */}
                <div className="flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 border-gray-50 pt-3 md:pt-0 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(q)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:border-[#6E7C3A] hover:text-[#6E7C3A] rounded-lg text-xs font-medium text-gray-600 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:border-red-600 hover:text-red-600 rounded-lg text-xs font-medium text-gray-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 overflow-hidden transform scale-98 transition-all">
            
            {/* Modal Header */}
            <div className="bg-[#2F3E56] px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-bold text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#6E7C3A]" />
                {isEditing ? "Edit MCQ Question" : "Add MCQ Question"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {status !== "idle" && (
                <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-medium animate-shake ${
                  status === "success" 
                    ? "bg-green-50 border-green-100 text-green-700" 
                    : "bg-red-50 border-red-100 text-red-700"
                }`}>
                  {status === "success" ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">QUESTION TEXT</label>
                <textarea
                  name="questionText"
                  value={form.questionText}
                  onChange={handleChange}
                  placeholder="Enter the question query..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-20"
                  required
                />
              </div>

              {/* Option A & B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">OPTION A</label>
                  <input
                    type="text"
                    name="optionA"
                    value={form.optionA}
                    onChange={handleChange}
                    placeholder="Option A text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">OPTION B</label>
                  <input
                    type="text"
                    name="optionB"
                    value={form.optionB}
                    onChange={handleChange}
                    placeholder="Option B text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Option C & D */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">OPTION C</label>
                  <input
                    type="text"
                    name="optionC"
                    value={form.optionC}
                    onChange={handleChange}
                    placeholder="Option C text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">OPTION D</label>
                  <input
                    type="text"
                    name="optionD"
                    value={form.optionD}
                    onChange={handleChange}
                    placeholder="Option D text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">CORRECT ANSWER KEY</label>
                  <select
                    name="correctOption"
                    value={form.correctOption}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] cursor-pointer"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">EXPLANATION (OPTIONAL)</label>
                <textarea
                  name="explanation"
                  value={form.explanation}
                  onChange={handleChange}
                  placeholder="Explain why the selected option is correct..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-20"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {isEditing ? "Save Changes" : "Add Question"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminQuestionsPage() {
  return (
    <Suspense fallback={<div>Loading Questions Editor...</div>}>
      <QuestionsContent />
    </Suspense>
  );
}
