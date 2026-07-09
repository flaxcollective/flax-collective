"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "@/app/styles/dashboard/dashboard-home.css";
import { TiMediaPlayOutline } from "react-icons/ti";
import Link from "next/link";
import { BookOpen, Award } from "lucide-react";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiCalendar, FiClock } from "react-icons/fi";

export default function DashboardMylearning() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch("/api/student/enrollments");
        const data = await res.json();
        if (data.success) {
          setEnrollments(data.enrollments || []);
        }

        const certRes = await fetch("/api/student/exams/certificates");
        const certData = await certRes.json();
        if (certData.success) {
          setCertificates(certData.certificates || []);
        }
      } catch (err) {
        console.error("Error fetching my learning enrollments/certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter((course) => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const overallProgress = 0;

  // Circular progress SVG constants
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.73
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800 pb-2">
          My Courses
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Track your progress, continue courses, and manage your learning journey seamlessly.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
          <p className="text-sm font-semibold">Loading your courses...</p>
        </div>
      ) : enrollments.length === 0 ? (
        /* No Enrolled Courses Yet Box */
        <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-10 md:p-16 text-center shadow-sm max-w-2xl mx-auto mt-8">
          <div className="bg-[#2F3E56]/10 p-4 rounded-full mb-6 text-[#2F3E56] flex items-center justify-center">
            <BookOpen className="w-12 h-12" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            No Enrolled Courses Yet
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md">
            Explore our certification programs, counselling sessions, and workshops to start your learning journey.
          </p>
          <Link
            href="/dashboard/course"
            className="bg-[#2F3E56] hover:bg-[#1E293B] text-white px-8 py-3 rounded-xl font-medium transition cursor-pointer text-center inline-block"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        /* Dynamic Learning Content */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Left Side List */}
          <div className="xl:col-span-2 space-y-8">
            <div className="flex flex-wrap gap-4 md:items-center justify-between">
              <h2 className="text-xl text-nowrap pb-0 text-navy font-semibold">
                All Enrolled Courses ({filteredEnrollments.length})
              </h2>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Courses..."
                    className="w-full pl-4 pr-10 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2F3E56] text-sm text-gray-700"
                  />
                  <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Courses Feed */}
            <div className="space-y-4">
              {filteredEnrollments.length > 0 ? (
                filteredEnrollments.map((course, i) => {
                  const progress = 0;
                  const status: string = "Not Started";
                  const lessons = 12 - (i % 3) * 2;
                  const modules = 4 - (i % 2);
                  const hours = 18 - (i % 3) * 3;

                  return (
                    <div
                      key={course.id}
                      className="mylearning_item flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:shadow-sm transition bg-white border border-gray-100"
                    >
                      <img
                        src={course.courseImage || "/assets/images/programs-img/certification.png"}
                        alt={course.courseName}
                        className="w-full md:w-56 h-36 object-cover rounded-lg shrink-0 border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/images/programs-img/certification.png";
                        }}
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 justify-between items-start">
                            <h4 className="text-sm md:text-lg font-bold text-gray-900 leading-snug line-clamp-1">
                              {course.courseName}
                            </h4>
                            <span
                              className={`text-xs md:text-sm font-semibold px-3 py-0.5 rounded-full ${
                                status === "Completed" 
                                  ? "bg-green-50 text-green-700 border border-green-200" 
                                  : "bg-[#6e7c3a]/15 text-[#5e6b30]"
                              }`}
                            >
                              {status}
                            </span>
                          </div>

                          <p className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-2">
                            {course.courseDesc || "Start your professional certification module today. Gain access to expert mentoring."}
                          </p>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div>
                            <p className="text-xs text-gray-700 mb-1 font-semibold">
                              {progress}% Complete
                            </p>
                            <div className="w-full h-1.5 bg-gray-150 rounded-full">
                              <div
                                className="h-1.5 bg-[#2F3E56] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
                            <div className="flex gap-4 text-xs font-medium text-gray-400">
                              <span className="flex gap-1 items-center">
                                <TiMediaPlayOutline className="border rounded-full" /> {lessons} Lessons
                              </span>
                              <span className="flex gap-1 items-center">
                                <TbLayoutSidebarRight /> {modules} Modules
                              </span>
                              <span className="flex gap-1 items-center">
                                <MdOutlineWatchLater /> {hours} Hours
                              </span>
                            </div>

                            <button className="w-full md:w-auto px-5 py-2 bg-[#2F3E56] hover:bg-[#1E293B] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
                              {status === "Completed" ? "Review Course" : "Continue Learning"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white border rounded-xl p-12 text-center text-gray-450 font-semibold">
                  No courses match your search.
                </div>
              )}
            </div>

            {/* Certificates Achievements Section */}
            {certificates.length > 0 && (
              <div className="space-y-4 pt-6">
                <h2 className="text-xl text-navy font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#6E7C3A]" />
                  Earned Certificates ({certificates.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div 
                      key={cert.sessionId} 
                      className="p-5 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200"
                    >
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                          Certificate ID: {cert.certificateId}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
                          {cert.examTitle}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                          {cert.examDesc || "Industry-recognized skill credential."}
                        </p>
                        
                        <div className="mt-3 flex items-center gap-4 text-[10px] font-semibold text-gray-500">
                          <span>Score: <strong className="text-[#6E7C3A]">{cert.score}%</strong></span>
                          <span>Time: {cert.timeTaken}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <Link
                          href={`/dashboard/e-certification/review/${cert.sessionId}`}
                          className="text-[10px] text-gray-500 hover:text-gray-900 transition-colors font-semibold"
                        >
                          Review Answers
                        </Link>
                        <a
                          href={`/dashboard/e-certification/certificate/${cert.sessionId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-[#6E7C3A] hover:bg-[#5a6630] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5" />
                          View Certificate
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Learning Progress
              </h3>

              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#2F3E56"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                      className="transition-all duration-700 ease-out-quint"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-gray-800">{overallProgress}%</span>
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase mt-0.5">Average</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Class (Commented out)
            {enrollments.length > 0 && (
              <div className="p-1 md:p-5 space-y-4">
                <h3 className="text-lg font-bold text-gray-850">
                  Upcoming Class
                </h3>

                <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4 shadow-sm">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h4 className="text-xs md:text-sm font-bold text-gray-850 leading-snug line-clamp-2 flex-1">
                      {enrollments[0].courseName}
                    </h4>
                    <span className="text-[10px] bg-[#2F3E56] text-white px-2.5 py-0.5 rounded-full font-bold">
                      June Week 2
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/images/dashboard/dhoni.png"
                      alt="Instructor"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/dashboard/rohit.png";
                      }}
                    />
                    <div>
                      <p className="text-[11px] text-gray-400">Conducted By</p>
                      <p className="text-xs font-bold text-gray-800">
                        M.S. Dhoni
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-gray-500 font-medium pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" />
                      <span>9 June, 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="text-gray-400" />
                      <span>12:00 PM</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#2F3E56] hover:bg-[#1E293B] text-white cursor-pointer py-2.5 rounded-lg transition-colors font-bold text-xs">
                    Join Class
                  </button>
                </div>
              </div>
            )}
            */}
          </div>
        </div>
      )}
    </div>
  );
}