"use client";

import { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import "@/app/styles/dashboard/dashboard-home.css";
import { HiOutlinePlay } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good Morning");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState(new Date(2026, 5));
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  const assignmentDays = [
    new Date(2026, 5, 1),
    new Date(2026, 5, 11),
    new Date(2026, 5, 16),
    new Date(2026, 5, 27),
  ];

  const quizDays = [
    new Date(2026, 5, 3),
    new Date(2026, 5, 14),
    new Date(2026, 5, 25),
    new Date(2026, 5, 30),
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch("/api/student/enrollments");
        const data = await res.json();
        if (data.success) {
          setEnrollments(data.enrollments || []);
        }
      } catch (err) {
        console.error("Error loading enrollments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-base md:text-3xl pb-2.5 font-semibold text-text-dark">
          {greeting}, {user?.name || "User"} 👋
        </h1>
        <p className="text-text-body text-xs md:text-base font-medium">
          Continue your learning journey with Flax Collective.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F3E56] rounded-full animate-spin"></div>
          <p className="text-sm font-semibold">Loading student dashboard...</p>
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
        /* Dynamic Dashboard Content */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-8">
            {/* Learning Overview */}
            <div>
              <div className="flex items-center gap-3 pb-5">
                <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                  Learning Overview
                </h4>
                <div className="flex-1 h-px bg-black"></div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full p-5 rounded-2xl bg-white">
                {[
                  { img: "/assets/images/dashboard/book.png", value: enrollments.length.toString(), label: "Courses Enrolled" },
                  { img: "/assets/images/dashboard/certificate.png", value: "0", label: "Courses Completed" },
                  { img: "/assets/images/dashboard/hour-glass.png", value: "0", label: "Hours Learned" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="learning-card bg-[#2f3b52] text-white p-4 rounded-lg flex flex-col items-center justify-center"
                  >
                    <img
                      src={card.img}
                      alt={card.label}
                      className="object-contain w-12 h-12 mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="text-center">
                      <h5 className="text-3xl lg:text-4xl font-medium">{card.value}</h5>
                      <p className="text-xs md:text-sm font-semibold mt-1">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning */}
            <div>
              <div className="flex items-center gap-3 pb-5">
                <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                  Continue Learning
                </h4>
                <div className="flex-1 h-px bg-black"></div>
              </div>

              <div className="bg-white p-4 rounded-xl border space-y-6">
                {enrollments.map((course, i) => {
                  const progress = 0;
                  return (
                    <div key={course.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <img
                        src={course.courseImage || "/assets/images/programs-img/certification.png"}
                        alt={course.courseName}
                        className="w-full max-w-32 rounded-lg object-contain shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/images/programs-img/certification.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-xl font-semibold text-text-dark leading-snug">
                          {course.courseName}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{progress}% Complete</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                          <div
                            className="h-2 bg-[#2f3b52] rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Classes (Commented out)
            <div>
              <div className="flex items-center gap-3 pb-5">
                <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                  Upcoming Classes
                </h4>
                <div className="flex-1 h-px bg-black"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {enrollments.map((item, i) => {
                  const instructors = [
                    { name: "Rohit Sharma", img: "/assets/images/dashboard/rohit.png" },
                    { name: "Shikhar Dhawan", img: "/assets/images/dashboard/shikhar.png" },
                    { name: "MS Dhoni", img: "/assets/images/dashboard/dhoni.png" }
                  ];
                  const instructor = instructors[i % instructors.length];
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-[#979797] rounded-xl p-4 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-semibold text-text-dark">Week {i + 1} Foundations</h4>
                        <p className="text-sm mt-1.5 text-text-body line-clamp-1">{item.courseName}</p>

                        <div className="flex items-center gap-3 mt-4">
                          <img
                            src={instructor.img}
                            alt={instructor.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/assets/images/dashboard/rohit.png";
                            }}
                          />
                          <div>
                            <p className="text-[13px] text-text-body">Conducted By</p>
                            <p className="text-base font-semibold text-[#2F3E56]">{instructor.name}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-text-dark font-medium mt-4 font-bold">June {5 + i * 4} | 12:00 PM</p>
                        <button className="w-full mt-4 bg-[#2f3b52] hover:bg-[#253044] text-white py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer">
                          Watch Now
                        </button>

                        <div className="border-t my-3"></div>

                        <div className="flex justify-between items-center text-gray-600">
                          <div className="flex items-center gap-2">
                            <HiOutlinePlay className="w-8 h-8 text-text-dark" />
                            <div className="leading-tight">
                              <p className="font-normal text-lg text-text-dark text-center">02</p>
                              <p className="text-[10px] text-text-body">Videos</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <GrAttachment className="w-8 h-8 text-text-dark" />
                            <div className="leading-tight">
                              <p className="font-medium text-lg text-text-dark text-center">1</p>
                              <p className="text-[10px] text-text-body">Attachments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            */}
          </div>

          {/* Calendar Sidebar */}
          <div className="w-full">
            <div className="bg-white p-4 rounded-xl w-full border border-gray-100 shadow-sm">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                month={month}
                onMonthChange={setMonth}
                modifiers={{
                  assignment: assignmentDays,
                  quiz: quizDays,
                }}
                classNames={{
                  root: "w-full max-w-md mx-auto",
                  months: "w-full max-w-md mx-auto",
                  month: "w-full max-w-md mx-auto",
                  month_grid: "w-full border-collapse",
                  weekdays: "flex w-full justify-between mb-1",
                  weekday: "flex-1 text-center text-xs text-gray-500 font-medium py-1",
                  weeks: "w-full",
                  week: "flex w-full justify-between",
                  day: "flex-1 flex justify-center items-center py-1",
                  day_button:
                    "w-9 h-9 rounded-full text-sm font-medium hover:bg-[#736a2f3b] transition-colors focus:outline-none",
                  selected: "bg-blue-600 text-white rounded-full",
                  today: "text-blue-650 font-bold",
                  outside: "text-gray-300",
                  nav: "flex items-center justify-between mb-4",
                  button_previous:
                    "p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer",
                  button_next:
                    "p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer",
                  month_caption: "text-base font-semibold text-center flex-1",
                }}
                modifiersClassNames={{
                  assignment: "!bg-[#2f3b52] !text-white rounded-full",
                  quiz: "!bg-[#736A2F] !text-white rounded-full",
                }}
              />

              <div className="flex gap-4 mt-3 text-xs px-1 border-t pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#2f3b52] rounded-full inline-block"></span>
                  Assignment
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#736A2F] rounded-full inline-block"></span>
                  Quiz
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}