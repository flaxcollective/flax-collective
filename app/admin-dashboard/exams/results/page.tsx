"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FileText, Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Award, CheckCircle, XCircle } from "lucide-react";

interface ExamResult {
  sessionId: string;
  examId: string;
  examTitle: string;
  email: string;
  studentName: string;
  score: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  submittedAt: string;
  timeTaken: string;
  certificateId: string;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const defaultExamId = searchParams.get("examId") || "All";

  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState(defaultExamId);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        search,
        examId: examFilter,
        status: statusFilter,
      });

      const res = await fetch(`/api/admin/exams/results?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.results || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error("Error loading exam results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [page, examFilter, statusFilter]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      fetchResults();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin-dashboard/exams"
            className="w-10 h-10 border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
              Exam Results & Audits
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Audit student certification exam attempts, scores, and track issued certificates.
            </p>
          </div>
        </div>
        
        <button
          onClick={fetchResults}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#2F3E56] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Audit Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        
        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate name, email..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] focus:bg-white transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="text-gray-400 w-4 h-4 shrink-0" />
              <select
                value={examFilter}
                onChange={(e) => {
                  setExamFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-44 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
              >
                <option value="All">All Exams</option>
                <option value="DLC">Digital Literacy</option>
                <option value="AEC">Advanced Excel</option>
                <option value="MWC">Microsoft Word</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-36 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pass">Pass Only</option>
              <option value="Fail">Fail Only</option>
            </select>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-[#2F3E56] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Exam / Test</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-center">Correct Ratio</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Certificate ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6E7C3A] rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-gray-400">Loading results...</span>
                    </div>
                  </td>
                </tr>
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 font-semibold">
                    No matching certification exam results found.
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.sessionId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {new Date(result.submittedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                      <span className="block text-[10px] text-gray-400 mt-0.5">
                        {new Date(result.submittedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{result.studentName}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{result.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
                        <span className="bg-gray-100 text-gray-600 font-mono text-[9px] font-bold px-1.5 py-0.25 rounded shrink-0">
                          {result.examId}
                        </span>
                        {result.examTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${result.passed ? "text-green-600" : "text-red-500"}`}>
                        {result.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-gray-700">
                      {result.correctCount} / {result.totalCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        result.passed 
                          ? "bg-green-50 text-green-700 border border-green-100" 
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                        {result.passed ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                            Pass
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-600 shrink-0" />
                            Fail
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.passed && result.certificateId ? (
                        <div className="flex items-center gap-1.5 text-xs text-[#6E7C3A] font-bold font-mono">
                          <Award className="w-4 h-4 text-[#6E7C3A] shrink-0" />
                          <span className="select-all">{result.certificateId}</span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs font-medium">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="text-xs text-gray-500 font-semibold">
              Showing page {page} of {totalPages} ({totalCount} total results)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default function AdminResultsPage() {
  return (
    <Suspense fallback={<div>Loading Results Audits...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
