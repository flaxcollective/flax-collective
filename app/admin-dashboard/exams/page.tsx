"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Plus, Edit, Trash2, Check, X, Clock, HelpCircle, FileText, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface Exam {
  examId: string;
  title: string;
  desc: string;
  fullDesc?: string;
  price: string;
  discountedPrice: string;
  duration: number;
  passingMarks: number;
  totalQuestions: number;
  isActive: boolean;
}

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExamId, setCurrentExamId] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
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

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/exams");
      const data = await res.json();
      if (data.success) {
        setExams(data.exams || []);
      }
    } catch (err) {
      console.error("Error loading exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleOpenAdd = () => {
    setForm({
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
    setIsEditing(false);
    setStatus("idle");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exam: Exam) => {
    setForm({
      examId: exam.examId,
      title: exam.title,
      desc: exam.desc,
      fullDesc: exam.fullDesc || exam.desc,
      price: exam.price,
      discountedPrice: exam.discountedPrice,
      duration: exam.duration.toString(),
      passingMarks: exam.passingMarks.toString(),
      totalQuestions: exam.totalQuestions.toString(),
      isActive: exam.isActive
    });
    setCurrentExamId(exam.examId);
    setIsEditing(true);
    setStatus("idle");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleDelete = async (examId: string) => {
    if (!confirm(`Are you sure you want to delete exam "${examId}"? This will delete all its questions as well!`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/exams?examId=${examId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        alert("Exam deleted successfully.");
        fetchExams();
      } else {
        alert(data.message || "Failed to delete exam.");
      }
    } catch (err) {
      console.error("Error deleting exam:", err);
      alert("Error deleting exam.");
    }
  };

  const handleToggleStatus = async (exam: Exam) => {
    try {
      const updatedExam = { ...exam, isActive: !exam.isActive };
      const res = await fetch("/api/admin/exams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExam)
      });
      const data = await res.json();
      if (data.success) {
        fetchExams();
      } else {
        alert(data.message || "Failed to update exam status.");
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!form.examId || !form.title || !form.desc || !form.duration || !form.passingMarks || !form.totalQuestions) {
      setStatus("error");
      setMessage("All fields are required.");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/admin/exams", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage(isEditing ? "Exam updated successfully!" : "Exam created successfully!");
        fetchExams();
        setTimeout(() => setIsModalOpen(false), 1200);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Server connection error.");
    }
  };

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
              Certification Exams
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Create and manage certification exams, question pools, and audit passing candidate results.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Exam
        </button>
      </div>

      {/* Main Listing Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-[#2F3E56]">Existing Exams ({exams.length})</h3>
          <button
            onClick={fetchExams}
            className="text-[#6E7C3A] hover:text-[#5a6630] transition-colors p-1"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
              <span className="text-sm font-semibold text-gray-400">Loading exams database...</span>
            </div>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-400 text-sm">No Exams Configured</h4>
            <p className="text-xs text-gray-400 mt-1 mb-4">Create your first certification exam to seed the student portal.</p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#6E7C3A] text-white rounded-lg text-xs font-semibold hover:bg-[#5a6630]"
            >
              Add Exam
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-150 rounded-xl">
            <table className="w-full border-collapse text-left text-xs text-gray-600">
              <thead className="bg-[#FAF8F5] border-b border-gray-100 text-[10px] font-bold text-[#2F3E56] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-28">Exam Code</th>
                  <th className="px-6 py-4">Title & Description</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Parameters</th>
                  <th className="px-6 py-4 text-center">Passing</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {exams.map((exam) => (
                  <tr key={exam.examId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-[#2F3E56]/10 text-[#2F3E56] font-mono text-[10px] font-bold px-2 py-1 rounded">
                        {exam.examId}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-bold text-gray-900 text-sm leading-snug">{exam.title}</div>
                      <div className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed" title={exam.desc}>
                        {exam.desc}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#6E7C3A] font-bold text-xs">₹{exam.discountedPrice}</span>
                        <span className="text-[10px] text-gray-400 line-through">₹{exam.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#6E7C3A] shrink-0" />
                          {exam.duration} Minutes
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 font-semibold">
                          <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {exam.totalQuestions} Questions
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center font-extrabold text-[#6E7C3A] text-xs">
                      {exam.passingMarks}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleToggleStatus(exam)}
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer border ${
                          exam.isActive
                            ? "bg-green-50 text-green-700 border-green-150 hover:bg-green-100"
                            : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {exam.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/admin-dashboard/exams/questions?examId=${exam.examId}`}
                          className="px-3 py-1.5 text-[10px] font-bold text-white bg-[#2F3E56] hover:bg-[#1e293b] rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                          title="Manage questions pool"
                        >
                          <HelpCircle className="w-3 h-3" />
                          Questions
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(exam)}
                          className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:text-[#6E7C3A] hover:bg-gray-50 transition-all cursor-pointer"
                          title="Edit exam settings"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(exam.examId)}
                          className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Delete exam"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Audit Link Box */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-[#2F3E56] text-sm flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#6E7C3A]" />
            Audit Student Certification Attempts
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Check logs of all student exam registrations, marks, and digital certificates generated.
          </p>
        </div>
        <Link
          href="/admin-dashboard/exams/results"
          className="px-4 py-2 border border-[#2F3E56] text-[#2F3E56] hover:bg-[#2F3E56] hover:text-white rounded-xl text-xs font-semibold transition-all text-center self-start md:self-auto"
        >
          View Results Audit Logs
        </Link>
      </div>

      {/* Create / Edit Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-100 overflow-hidden transform scale-98 transition-all">
            
            {/* Modal Header */}
            <div className="bg-[#2F3E56] px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#6E7C3A]" />
                {isEditing ? "Edit Exam Details" : "Create Certification Exam"}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">EXAM CODE / ID</label>
                  <input
                    type="text"
                    name="examId"
                    value={form.examId}
                    onChange={handleChange}
                    disabled={isEditing}
                    placeholder="E.g. DLC"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white uppercase"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
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
                  placeholder="Short, attractive description for cards..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-16"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">FULL SYLLABUS DESCRIPTION</label>
                <textarea
                  name="fullDesc"
                  value={form.fullDesc}
                  onChange={handleChange}
                  placeholder="Detailed context showing what is certified..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white resize-none h-24"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">QUESTIONS POOL</label>
                  <input
                    type="number"
                    name="totalQuestions"
                    value={form.totalQuestions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">VISIBILITY STATUS</label>
                  <select
                    name="isActive"
                    value={form.isActive ? "true" : "false"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#6E7C3A] cursor-pointer"
                  >
                    <option value="true">Active (Show to Students)</option>
                    <option value="false">Inactive (Draft/Hidden)</option>
                  </select>
                </div>
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
                  {isEditing ? "Save Changes" : "Create Exam"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
