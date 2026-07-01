"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Users,
  UserCheck,
  Award,
  Eye,
  Trash2,
  X
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedOn: string;
  picture: string;
}

interface Stats {
  totalCourses: number;
  totalUsers: number;
  activeMembers: number;
  completions: number;
}

interface Activity {
  prefix: string;
  boldText: string;
  suffix: string;
  text: string;
  timeAgo: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCourses: 24,
    totalUsers: 1248,
    activeMembers: 842,
    completions: 125
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // View Details Modal States
  const [selectedUserDetail, setSelectedUserDetail] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [fetchingDetail, setFetchingDetail] = useState(false);

  // Delete User Modal States
  const [deleteTargetUser, setDeleteTargetUser] = useState<UserItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1); // 1 = Enter Password, 2 = Enter OTP
  const [adminPassword, setAdminPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  // Fetch users and metrics function
  const fetchUsersData = async () => {
    setUsersLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "6",
        search,
        role: roleFilter
      });
      const res = await fetch(`/api/admin/users?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsersList(data.users);
        setStats(data.stats);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      }
    } catch (err) {
      console.error("Error fetching users data:", err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsersData();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, search, roleFilter]);

  const handleOpenViewModal = async (userId: string) => {
    setFetchingDetail(true);
    setSelectedUserDetail(null);
    setIsViewModalOpen(true);
    try {
      const res = await fetch(`/api/admin/users/detail?userId=${userId}`);
      const data = await res.json();
      if (data.success) {
        setSelectedUserDetail({
          ...data.user,
          enrollments: data.enrollments || []
        });
      } else {
        alert(data.message || "Failed to load user details.");
        setIsViewModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error loading user details.");
      setIsViewModalOpen(false);
    } finally {
      setFetchingDetail(false);
    }
  };

  const handleOpenDeleteModal = (userItem: UserItem) => {
    setDeleteTargetUser(userItem);
    setDeleteStep(1);
    setAdminPassword("");
    setOtpCode("");
    setDeleteError("");
    setDeleteSuccess("");
    setIsDeleteModalOpen(true);
  };

  const handleInitiateDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) return;
    setVerifying(true);
    setDeleteError("");
    try {
      const res = await fetch("/api/admin/users/delete/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: deleteTargetUser?.id,
          password: adminPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setDeleteStep(2);
      } else {
        setDeleteError(data.message || "Verification failed.");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setVerifying(true);
    setDeleteError("");
    try {
      const res = await fetch("/api/admin/users/delete/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: deleteTargetUser?.id,
          otp: otpCode
        })
      });
      const data = await res.json();
      if (data.success) {
        setDeleteSuccess("User deleted successfully!");
        setTimeout(() => {
          setIsDeleteModalOpen(false);
          setDeleteTargetUser(null);
          fetchUsersData();
        }, 1500);
      } else {
        setDeleteError(data.message || "Invalid OTP code.");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/admin/activity");
        const data = await res.json();
        if (data.success) {
          setActivities(data.activities);
        }
      } catch (err) {
        console.error("Error fetching activity logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-8 bg-[#FAF8F5] min-h-screen p-1 md:p-4 lg:p-6 text-gray-800">
      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#2F3E56]">
          Good Morning, {user?.name?.split(" ")[0] || "Anshuman"}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening with FLAX Collective.
        </p>
      </div>

      {/* Metric Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Total Courses */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-[#2F3E56] leading-none">
              {stats.totalCourses}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">Total Courses</p>
            <p className="text-xs text-gray-400">All Courses</p>
          </div>
        </div>

        {/* Stat 2: Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-[#2F3E56] leading-none">
              {stats.totalUsers.toLocaleString()}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">Total Users</p>
            <p className="text-xs text-gray-400">Overall users</p>
          </div>
        </div>

        {/* Stat 3: Active Members */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-[#2F3E56] leading-none">
              {stats.activeMembers.toLocaleString()}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">Active Members</p>
            <p className="text-xs text-gray-400">Currently active</p>
          </div>
        </div>

        {/* Stat 4: Completions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2F3E56] flex items-center justify-center text-white shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-[#2F3E56] leading-none">
              {stats.completions}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">Completions</p>
            <p className="text-xs text-gray-400">Completed course</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Users & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Users Table Card */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Recent Users Header Tools */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#2F3E56]">
                Recent Users
              </h2>
              
              <div className="flex items-center gap-3 w-full sm:w-auto relative">
                {/* Search Input Box */}
                <div className="relative flex-1 sm:w-64">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2F3E56] focus:bg-white transition-all"
                  />
                </div>

                {/* Filter Dropdown Toggle Button */}
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm font-medium hover:bg-gray-150 flex items-center gap-2 cursor-pointer transition-colors shrink-0"
                >
                  <FiFilter className="text-gray-500" />
                  Filter
                </button>

                {/* Role Filter Dropdown Drawer */}
                {showRoleDropdown && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-48 z-10 animate-fade-in">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Filter by Role
                    </div>
                    {["All", "Member", "Employee", "Admin"].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setRoleFilter(role);
                          setPage(1);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          roleFilter === role
                            ? "bg-[#2F3E56] text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 pt-2">Name</th>
                    <th className="pb-3 pt-2">Role</th>
                    <th className="pb-3 pt-2">Status</th>
                    <th className="pb-3 pt-2">Joined On</th>
                    <th className="pb-3 pt-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {usersLoading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                        <div className="flex flex-col items-center justify-center gap-2 py-4">
                          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                          <span>Loading users...</span>
                        </div>
                      </td>
                    </tr>
                  ) : usersList.length > 0 ? (
                    usersList.map((userItem) => (
                      <tr key={userItem.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0 flex items-center justify-center bg-gray-100 text-gray-500">
                            {userItem.picture ? (
                              <img
                                src={userItem.picture}
                                alt={userItem.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-bold text-xs">
                                {userItem.name.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 leading-none">
                              {userItem.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {userItem.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 font-medium text-gray-600">
                          {userItem.role}
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-gray-500 font-medium">
                          {userItem.joinedOn}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenViewModal(userItem.id)}
                              title="View Details"
                              className="p-1.5 text-[#2F3E56] hover:text-[#1E293B] rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(userItem)}
                              title="Delete User"
                              className="p-1.5 text-red-500 hover:text-red-700 rounded-lg cursor-pointer hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                        No users found matching search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-4 mt-4">
            <p className="text-sm text-gray-400 font-medium">
              Showing {usersList.length > 0 ? (page - 1) * 6 + 1 : 0} to{" "}
              {Math.min(page * 6, totalCount)} of {totalCount} members
            </p>
            
            <div className="flex items-center gap-1.5">
              {/* Page 1 Button */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${
                  page === 1
                    ? "bg-[#2F3E56] text-white border-[#2F3E56]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                1
              </button>

              {/* Page 2 Button */}
              {totalPages >= 2 && (
                <button
                  onClick={() => handlePageChange(2)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${
                    page === 2
                      ? "bg-[#2F3E56] text-white border-[#2F3E56]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  2
                </button>
              )}

              {/* Page 3 Button */}
              {totalPages >= 3 && (
                <button
                  onClick={() => handlePageChange(3)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${
                    page === 3
                      ? "bg-[#2F3E56] text-white border-[#2F3E56]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  3
                </button>
              )}

              {/* Ellipsis if needed */}
              {totalPages > 3 && (
                <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-xs font-bold">
                  ...
                </span>
              )}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="px-4 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-[#2F3E56] text-white text-sm font-semibold cursor-pointer hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Recent Activity Timeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 flex flex-col">
          <h2 className="text-xl font-bold text-[#2F3E56]">
            Recent Activity
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-6 min-h-[400px] max-h-[500px] pr-2 scrollbar-thin">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Loading logs...</p>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex gap-4 items-start relative group">
                  {/* Timeline connector circle */}
                  <div className="w-3 h-3 rounded-full bg-[#2F3E56] ring-4 ring-blue-50 shrink-0 mt-1"></div>
                  
                  <div className="flex-1 leading-snug">
                    <p className="text-sm text-gray-600">
                      {activity.prefix}{" "}
                      <span className="font-bold text-gray-900">
                        "{activity.boldText}"
                      </span>{" "}
                      {activity.suffix}
                    </p>
                    <span className="text-[11px] font-semibold text-gray-400 block mt-1">
                      {activity.timeAgo}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">
                No recent activity logs available.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* User Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-4">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#2F3E56]">User Profile Details</h3>

            {fetchingDetail ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500 font-medium">Fetching details...</span>
              </div>
            ) : selectedUserDetail ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                    {selectedUserDetail.picture ? (
                      <img
                        src={selectedUserDetail.picture}
                        alt={selectedUserDetail.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-extrabold text-2xl text-[#2F3E56]">
                        {selectedUserDetail.name.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 leading-none">{selectedUserDetail.name}</h4>
                    <p className="text-xs text-gray-400 mt-1.5 capitalize">{selectedUserDetail.usertype || "Member"}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 mt-2">
                      Active Account
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="col-span-2">
                    <span className="text-gray-400 block font-semibold">User ID</span>
                    <span className="text-gray-800 font-medium break-all">{selectedUserDetail.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Email Address</span>
                    <span className="text-gray-800 font-medium break-all">{selectedUserDetail.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Phone Number</span>
                    <span className="text-gray-800 font-medium">{selectedUserDetail.phone || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Alternative Phone</span>
                    <span className="text-gray-800 font-medium">{selectedUserDetail.alternativePhone || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Date of Birth</span>
                    <span className="text-gray-800 font-medium">{selectedUserDetail.dob || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Gender</span>
                    <span className="text-gray-800 font-medium capitalize">{selectedUserDetail.gender || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">City</span>
                    <span className="text-gray-800 font-medium">{selectedUserDetail.city || "Not Provided"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400 block font-semibold">Full Address</span>
                    <span className="text-gray-800 font-medium leading-relaxed">{selectedUserDetail.address || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-semibold">Joined Platform On</span>
                    <span className="text-gray-800 font-medium">
                      {selectedUserDetail.createdAt ? new Date(selectedUserDetail.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }) : "Recently"}
                    </span>
                  </div>
                  <div className="col-span-2 border-t border-gray-100 pt-3">
                    <span className="text-gray-400 block font-semibold mb-1">Enrolled Courses</span>
                    {selectedUserDetail.enrollments && selectedUserDetail.enrollments.length > 0 ? (
                      <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                        {selectedUserDetail.enrollments.map((enr: any) => (
                          <div key={enr.id} className="flex justify-between items-center bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md text-[11px]">
                            <span className="font-semibold text-gray-700 truncate max-w-[200px]" title={enr.course}>{enr.course}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold capitalize ${
                              enr.status === "completed" 
                                ? "bg-green-50 text-green-700 border border-green-150" 
                                : enr.status === "pending_payment" 
                                ? "bg-amber-50 text-amber-700 border border-amber-150" 
                                : "bg-blue-50 text-blue-700 border border-blue-150"
                            }`}>
                              {enr.status.replace("_", " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500 font-medium italic">Not enrolled in any courses</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-gray-400 py-6">Could not load details.</div>
            )}
          </div>
        </div>
      )}

      {/* Delete Verification Modal */}
      {isDeleteModalOpen && deleteTargetUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete User Account
            </h3>

            {deleteSuccess ? (
              <div className="py-8 text-center text-green-600 font-semibold flex flex-col items-center gap-3">
                <span className="text-4xl">✓</span>
                <p className="text-sm">{deleteSuccess}</p>
              </div>
            ) : deleteStep === 1 ? (
              <form onSubmit={handleInitiateDelete} className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  You are initiating a permanent deletion request for user <span className="text-gray-800 font-bold">"{deleteTargetUser.name}"</span> ({deleteTargetUser.email}).
                  Please enter your password to proceed.
                </p>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Admin Password</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter your login password"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {deleteError && (
                  <p className="text-xs font-semibold text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-150">
                    {deleteError}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs cursor-pointer disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  >
                    {verifying ? "Verifying..." : "Verify Password"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmDelete} className="space-y-4">
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-800 leading-relaxed font-medium">
                  <strong>Verification Code Sent!</strong><br />
                  A verification code has been dispatched to <strong>flaxcollective@gmail.com</strong>. Enter it below to authorize this deletion.
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Enter OTP Code</label>
                  <input
                    type="text"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="6-digit verification code"
                    maxLength={6}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 tracking-widest text-center font-bold text-lg"
                  />
                </div>

                {deleteError && (
                  <p className="text-xs font-semibold text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-150">
                    {deleteError}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setDeleteStep(1)}
                    className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs cursor-pointer disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  >
                    {verifying ? "Confirming..." : "Confirm Deletion"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}