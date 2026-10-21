"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Phone,
  MapPin,
  Mail,
  Award,
  BookOpen,
  Eye,
  Trash2,
  Send,
  X,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

interface EnrollmentItem {
  id: string;
  submittedAt: string;
  rawSubmittedAt: string;
  studentName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  countryCode: string;
  country: string;
  state: string;
  city: string;
  course: string;
  courseId: string;
  amount: number;
  status: "completed" | "pending_payment" | "failed_payment" | string;
  merchantTxnNo: string;
  pgTxnId: string;
  type: "course" | "exam" | string;
}

interface Stats {
  total: number;
  completed: number;
  pending: number;
  revenue: number;
}

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Reminder & Delete States
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);
  const [deleteTargetEnrollment, setDeleteTargetEnrollment] = useState<EnrollmentItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Detail Modal State
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentItem | null>(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
        status: statusFilter,
        type: typeFilter,
      });

      const res = await fetch(`/api/admin/enrollments?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.enrollments || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Error loading enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [page, statusFilter, typeFilter]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchEnrollments();
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  // Send Payment Reminder Email
  const sendPaymentReminder = async (enr: EnrollmentItem) => {
    setSendingReminderId(enr.id);
    setNotification(null);
    try {
      const res = await fetch("/api/admin/enrollments/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId: enr.id }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({
          type: "success",
          message: data.message || `Payment link email sent to ${enr.email}`,
        });
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to send payment reminder email.",
        });
      }
    } catch (err: any) {
      console.error("Error sending payment reminder:", err);
      setNotification({
        type: "error",
        message: err.message || "Server connection error sending reminder.",
      });
    } finally {
      setSendingReminderId(null);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // Delete Enrollment Handler
  const handleDeleteEnrollment = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/enrollments?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        if (selectedEnrollment?.id === id) {
          setSelectedEnrollment(null);
        }
        setDeleteTargetEnrollment(null);
        setNotification({
          type: "success",
          message: "Enrollment record deleted successfully.",
        });
        fetchEnrollments();
      } else {
        alert(data.message || "Failed to delete enrollment.");
      }
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    } finally {
      setDeleting(false);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          Completed
        </span>
      );
    }
    if (status === "failed_payment") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
          <XCircle className="w-3 h-3 text-red-600" />
          Failed Payment
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" />
        Pending Payment
      </span>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2F3E56] leading-none">Student Enrollments</h2>
            <p className="text-gray-400 text-xs mt-1">
              Audit, search, send fee payment reminders, and monitor student registrations.
            </p>
          </div>
        </div>

        <button
          onClick={fetchEnrollments}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#2F3E56] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Floating Action Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm animate-fade-in ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Total Registrations</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.completed.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Completed / Paid</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.pending.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Pending Payment</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              ₹ {stats.revenue.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, email, phone, course, txn ID..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="completed">Completed Only</option>
                <option value="pending_payment">Pending Payment</option>
                <option value="failed_payment">Failed Payment</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="course">Courses Only</option>
                <option value="exam">Certifications Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-[#2F3E56] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Date / Time</th>
                <th className="px-5 py-3.5">Student Details</th>
                <th className="px-5 py-3.5">Course / Certification</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-gray-400">Loading student enrollments...</span>
                    </div>
                  </td>
                </tr>
              ) : enrollments.length > 0 ? (
                enrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-750 whitespace-nowrap text-xs">
                      {enr.submittedAt}
                    </td>

                    {/* Student Info */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-gray-900">{enr.studentName}</span>
                        <span className="text-xs text-gray-500 select-all">{enr.email}</span>
                        {enr.mobile && (
                          <span className="text-xs text-gray-700 font-mono flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                            {enr.countryCode ? `${enr.countryCode} ` : ""}{enr.mobile}
                          </span>
                        )}
                        {(enr.city || enr.country) && (
                          <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gray-300 shrink-0" />
                            {[enr.city, enr.state, enr.country].filter(Boolean).join(", ")}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Course/Exam Info */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 max-w-xs">
                        <span className="font-semibold text-gray-800 line-clamp-2" title={enr.course}>
                          {enr.course}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider w-fit ${
                            enr.type === "exam"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {enr.type === "exam" ? (
                            <>
                              <Award className="w-3 h-3" /> Certification Exam
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-3 h-3" /> Course
                            </>
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap">
                      ₹ {enr.amount.toLocaleString()}
                    </td>

                    {/* Transaction / Merchant ID */}
                    <td className="px-5 py-4 font-mono text-xs select-all text-gray-500 whitespace-nowrap">
                      <div>{enr.merchantTxnNo}</div>
                      {enr.pgTxnId && enr.pgTxnId !== "—" && (
                        <div className="text-[10px] text-gray-400">PG: {enr.pgTxnId}</div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      {getStatusBadge(enr.status)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Send Payment Reminder Mail button */}
                        {enr.status === "pending_payment" && (
                          <button
                            onClick={() => sendPaymentReminder(enr)}
                            disabled={sendingReminderId === enr.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-600 hover:text-white transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                            title="Send payment reminder email to student"
                          >
                            <Send className={`w-3 h-3 ${sendingReminderId === enr.id ? "animate-spin" : ""}`} />
                            <span className="hidden sm:inline">
                              {sendingReminderId === enr.id ? "Sending..." : "Send Fee Mail"}
                            </span>
                          </button>
                        )}

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedEnrollment(enr)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white text-xs font-semibold text-gray-700 hover:bg-[#2F3E56] hover:text-white hover:border-[#2F3E56] transition-all cursor-pointer shadow-2xs"
                          title="View complete enrollment details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">View</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteTargetEnrollment(enr)}
                          className="inline-flex items-center p-1.5 border border-red-200 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                          title="Delete enrollment record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-gray-400 font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-300" />
                      <span>No enrollments found matching the criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card */}
        {enrollments.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-6 gap-4">
            <span className="text-xs text-gray-500">
              Showing page <strong className="text-gray-700">{page}</strong> of{" "}
              <strong className="text-gray-700">{totalPages}</strong> ({totalCount} total entries)
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

      {/* Comprehensive Student Enrollment Details Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnrollment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2F3E56] text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2F3E56]">Enrollment Information</h3>
                <p className="text-xs text-gray-400">Complete student registration and payment profile</p>
              </div>
            </div>

            {/* Student Basic Card */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-gray-900">{selectedEnrollment.studentName}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{selectedEnrollment.email}</p>
              </div>
              {getStatusBadge(selectedEnrollment.status)}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">First Name</span>
                <span className="text-gray-800 font-medium text-sm">{selectedEnrollment.firstName || "—"}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold">Last Name</span>
                <span className="text-gray-800 font-medium text-sm">{selectedEnrollment.lastName || "—"}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Email Address</span>
                <a
                  href={`mailto:${selectedEnrollment.email}`}
                  className="text-blue-600 hover:underline font-medium break-all"
                >
                  {selectedEnrollment.email}
                </a>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Mobile Number</span>
                <a
                  href={`tel:${selectedEnrollment.countryCode}${selectedEnrollment.mobile}`}
                  className="text-blue-600 hover:underline font-medium font-mono"
                >
                  {selectedEnrollment.countryCode ? `${selectedEnrollment.countryCode} ` : ""}
                  {selectedEnrollment.mobile || "Not Provided"}
                </a>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">City</span>
                <span className="text-gray-800 font-medium">{selectedEnrollment.city || "Not Provided"}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">State</span>
                <span className="text-gray-800 font-medium">{selectedEnrollment.state || "Not Provided"}</span>
              </div>

              <div className="col-span-2">
                <span className="text-gray-400 block font-semibold">Country</span>
                <span className="text-gray-800 font-medium">{selectedEnrollment.country || "Not Provided"}</span>
              </div>

              <div className="col-span-2 border-t border-gray-100 pt-3">
                <span className="text-gray-400 block font-semibold">Enrolled Item</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-900 font-bold text-sm">{selectedEnrollment.course}</span>
                  <span className="text-gray-800 font-extrabold text-sm">
                    ₹ {selectedEnrollment.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Merchant TXN No</span>
                <span className="text-gray-800 font-mono select-all">{selectedEnrollment.merchantTxnNo}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Bank / Gateway PG TXN ID</span>
                <span className="text-gray-800 font-mono select-all">
                  {selectedEnrollment.pgTxnId && selectedEnrollment.pgTxnId !== "—"
                    ? selectedEnrollment.pgTxnId
                    : "Not Completed"}
                </span>
              </div>

              <div className="col-span-2">
                <span className="text-gray-400 block font-semibold">Submitted On</span>
                <span className="text-gray-800 font-medium">{selectedEnrollment.submittedAt}</span>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {selectedEnrollment.status === "pending_payment" && (
                  <button
                    onClick={() => sendPaymentReminder(selectedEnrollment)}
                    disabled={sendingReminderId === selectedEnrollment.id}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${sendingReminderId === selectedEnrollment.id ? "animate-spin" : ""}`} />
                    {sendingReminderId === selectedEnrollment.id ? "Sending Email..." : "Send Fee Reminder Email"}
                  </button>
                )}

                {selectedEnrollment.mobile && (
                  <a
                    href={`https://wa.me/${selectedEnrollment.countryCode.replace(/\+/g, "")}${selectedEnrollment.mobile.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${selectedEnrollment.email}`}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>

                <button
                  onClick={() => {
                    setDeleteTargetEnrollment(selectedEnrollment);
                  }}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              <button
                onClick={() => setSelectedEnrollment(null)}
                className="px-5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetEnrollment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete Enrollment</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete the enrollment record for{" "}
                <strong className="text-gray-800">{deleteTargetEnrollment.studentName}</strong> (
                {deleteTargetEnrollment.course})?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetEnrollment(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeleteEnrollment(deleteTargetEnrollment.id)}
                disabled={deleting}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
