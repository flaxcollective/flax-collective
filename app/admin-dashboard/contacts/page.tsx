"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Phone,
  Mail,
  Eye,
  Trash2,
  X,
  Calendar,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

interface ContactItem {
  id: string;
  name: string;
  email: string;
  mobile: string;
  countryCode: string;
  message: string;
  submittedAt: string;
  rawSubmittedAt: string;
}

interface Stats {
  total: number;
  today: number;
  week: number;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, week: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modal states
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
      });

      const res = await fetch(`/api/admin/contacts?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchContacts();
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        setDeleteTargetId(null);
        fetchContacts();
      } else {
        alert(data.message || "Failed to delete contact inquiry.");
      }
    } catch (err) {
      console.error("Error deleting contact inquiry:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2F3E56] leading-none">Contact Us Inquiries</h2>
            <p className="text-gray-400 text-xs mt-1">
              Read, review, and follow up with inquiries received from the website contact form.
            </p>
          </div>
        </div>

        <button
          onClick={fetchContacts}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#2F3E56] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Total Inquiries</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.today.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Received Today</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2F3E56] leading-none">
              {stats.week.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-gray-700 mt-1">Past 7 Days</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sender, email, mobile, or message..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-[#2F3E56] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Date / Time</th>
                <th className="px-5 py-3.5">Sender</th>
                <th className="px-5 py-3.5">Contact Number</th>
                <th className="px-5 py-3.5">Message Snippet</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-gray-400">Loading contact submissions...</span>
                    </div>
                  </td>
                </tr>
              ) : contacts.length > 0 ? (
                contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-750 whitespace-nowrap text-xs">
                      {c.submittedAt}
                    </td>

                    {/* Sender */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{c.name}</span>
                        <a
                          href={`mailto:${c.email}`}
                          className="text-xs text-blue-600 hover:underline select-all mt-0.5"
                        >
                          {c.email}
                        </a>
                      </div>
                    </td>

                    {/* Contact Number */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <a
                        href={`tel:${c.countryCode}${c.mobile}`}
                        className="text-xs text-gray-700 font-mono flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {c.countryCode ? `${c.countryCode} ` : ""}
                        {c.mobile}
                      </a>
                    </td>

                    {/* Message Preview */}
                    <td className="px-5 py-4 max-w-xs md:max-w-md">
                      <p className="text-xs text-gray-600 truncate italic" title={c.message}>
                        "{c.message}"
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-xs font-semibold text-gray-700 hover:bg-[#2F3E56] hover:text-white hover:border-[#2F3E56] transition-all cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Read
                        </button>

                        <button
                          onClick={() => setDeleteTargetId(c.id)}
                          className="inline-flex items-center p-1.5 border border-red-200 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-gray-400 font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-300" />
                      <span>No contact inquiries found matching criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card */}
        {contacts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-6 gap-4">
            <span className="text-xs text-gray-500">
              Showing page <strong className="text-gray-700">{page}</strong> of{" "}
              <strong className="text-gray-700">{totalPages}</strong> ({totalCount} total inquiries)
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

      {/* Read Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-5">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2F3E56] text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2F3E56]">Inquiry Message</h3>
                <p className="text-xs text-gray-400">Received on {selectedContact.submittedAt}</p>
              </div>
            </div>

            {/* Sender Information Card */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Sender Name:</span>
                <span className="text-gray-900 font-bold text-sm">{selectedContact.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Email:</span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {selectedContact.email}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Phone:</span>
                <a
                  href={`tel:${selectedContact.countryCode}${selectedContact.mobile}`}
                  className="text-blue-600 hover:underline font-mono font-medium"
                >
                  {selectedContact.countryCode ? `${selectedContact.countryCode} ` : ""}
                  {selectedContact.mobile}
                </a>
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Message Content
              </span>
              <div className="p-4 rounded-xl bg-gray-50/75 border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {selectedContact.message}
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedContact.mobile && (
                  <a
                    href={`https://wa.me/${selectedContact.countryCode.replace(/\+/g, "")}${selectedContact.mobile.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${selectedContact.email}?subject=Regarding your inquiry on Flax Collective`}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Reply Email
                </a>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="px-5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete Inquiry</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete this contact inquiry? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteTargetId)}
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
