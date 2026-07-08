"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Search, Filter, AlertCircle, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  merchantTxnNo: string;
  pgTxnId: string;
  amount: number;
  status: string;
  createdAt: string;
  email: string;
  course: string;
  studentName: string;
}

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "8",
        search,
        status: statusFilter,
      });

      const res = await fetch(`/api/admin/payments?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, statusFilter]);

  // Debounced/delayed search trigger
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchTransactions();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2F3E56] leading-none">
              Payment Transactions
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Monitor, filter, and track all incoming course payments and verification states.
            </p>
          </div>
        </div>
        
        <button
          onClick={fetchTransactions}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#2F3E56] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, student name, email..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] focus:bg-white transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="text-gray-400 w-4 h-4 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-44 px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
            >
              <option value="All">All Transactions</option>
              <option value="Success">Success Only</option>
              <option value="Failed">Failed Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-[#2F3E56] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date / Time</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Merchant TXN ID</th>
                <th className="px-6 py-4">Bank TXN ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-gray-400">Loading transactions data...</span>
                    </div>
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                      {txn.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{txn.studentName}</span>
                        <span className="text-xs text-gray-450 select-all">{txn.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {txn.course}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs select-all">
                      {txn.merchantTxnNo}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs select-all text-gray-500">
                      {txn.pgTxnId}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ₹ {txn.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        txn.status === "success" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : txn.status === "failed"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          txn.status === "success" 
                            ? "bg-green-600" 
                            : txn.status === "failed" 
                              ? "bg-red-500" 
                              : "bg-amber-500"
                        }`} />
                        {txn.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-gray-400 font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-300" />
                      <span>No transactions found matching criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card */}
        {transactions.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-500">
              Showing page <strong className="text-gray-700">{page}</strong> of <strong className="text-gray-700">{totalPages}</strong> ({totalCount} total entries)
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
