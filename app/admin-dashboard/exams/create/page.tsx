"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Plus, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function CreateExamPage() {
  const router = useRouter();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    examId: "",
    title: "",
    desc: "",
    fullDesc: "",
    price: "",
    discountedPrice: "",
    duration: "60",
    passingMarks: "80",
    totalQuestions: "20",
    isActive: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!form.examId || !form.title || !form.desc || !form.duration || !form.passingMarks || !form.totalQuestions) {
      setStatus("error");
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("Exam created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/admin-dashboard/exams");
        }, 1200);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to create exam.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Server connection error.");
    }
  };

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
        <button
          onClick={() => router.push("/admin-dashboard/exams")}
          className="w-10 h-10 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 transition-colors shrink-0"
          title="Back to listing"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
            Create Certification Exam
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Configure exam rules, question pools, and special registration pricing.
          </p>
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {status === "error" && (
            <div className="p-3.5 rounded-xl border bg-red-50 border-red-100 text-red-700 text-xs font-semibold flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3.5 rounded-xl border bg-green-50 border-green-100 text-green-700 text-xs font-semibold flex items-start gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">EXAM ID / CODE (Unique)</label>
              <input
                type="text"
                name="examId"
                value={form.examId}
                onChange={handleChange}
                placeholder="E.g. DLC"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white uppercase"
                maxLength={10}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">CERTIFICATION TITLE</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="E.g. Digital Literacy Certification"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">SHORT SUMMARY</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Provide a short description for cards..."
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">FULL SYLLABUS DETAIL</label>
            <textarea
              name="fullDesc"
              value={form.fullDesc}
              onChange={handleChange}
              placeholder="Describe the topics and certification benefits..."
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-28"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">ORIGINAL PRICE (INR)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="E.g. 399"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">SPECIAL OFFER PRICE (INR)</label>
              <input
                type="number"
                name="discountedPrice"
                value={form.discountedPrice}
                onChange={handleChange}
                placeholder="E.g. 199"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">DURATION (MIN)</label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">QUESTIONS SIZE</label>
              <input
                type="number"
                name="totalQuestions"
                value={form.totalQuestions}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">PASSING (%)</label>
              <input
                type="number"
                name="passingMarks"
                value={form.passingMarks}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">STATUS</label>
              <select
                name="isActive"
                value={form.isActive ? "true" : "false"}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] cursor-pointer"
              >
                <option value="true">Active (Show to Students)</option>
                <option value="false">Inactive (Draft)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-150 pt-5 mt-6">
            <button
              type="button"
              onClick={() => router.push("/admin-dashboard/exams")}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? "Creating..." : "Create Exam"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
