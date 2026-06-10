"use client";

import { FiSearch, FiFilter } from "react-icons/fi";
import "@/app/styles/dashboard/dashboard-home.css";
import { TiMediaPlayOutline } from "react-icons/ti";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useState } from "react";


const coursesData = [
  {
    img: "/assets/images/programs-img/hfg.png",
    title: "Hospitality Professional Foundations (HPF)",
    desc: "Learn core principles of hospitality management and service excellence.",
    progress: 75,
    status: "In Progress",
    lessons: 12,
    modules: 4,
    hours: 18,
  },
  {
    img: "/assets/images/programs-img/resm.png",
    title: "Real Estate Sales & Management (RESM)",
    desc: "Understand real estate sales, client handling, and property management.",
    progress: 50,
    status: "In Progress",
    lessons: 10,
    modules: 3,
    hours: 15,
  },
  {
    img: "/assets/images/programs-img/hcps.png",
    title: "Hospitality Communication & Professional Skills",
    desc: "Improve your communication and interpersonal skills for professional growth.",
    progress: 0,
    status: "Not Started",
    lessons: 8,
    modules: 2,
    hours: 6,
  },
];

export default function DashboardMylearning() {
  const [open, setOpen] = useState(false);
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


      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        <div className="xl:col-span-2 space-y-8">


          <div className="flex flex-wrap gap-4 md:items-center">

            <h2 className="text-xl text-nowrap md:text-xl all_courseDas pb-0 md:pb-2 text-navy font-semibold">
              All Courses
            </h2>

            <div className="right-tools">


              <div className="search-box">
                <input type="text" placeholder="Search Courses..." />
                <FiSearch />
              </div>


              <div className="relative inline-block">
                {/* Button */}
                <button
                  className="filter-btn flex items-center gap-2"
                  onClick={() => setOpen(!open)}
                >
                  <FiFilter />
                  Filter
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="py-2 text-nowrap text-sm">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        InProgress
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Completed
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Starting Now
                      </li>

                    </ul>
                  </div>
                )}
              </div>

            </div>
          </div>


          <div className=" space-y-4">

            {coursesData.map((course, i) => (

              <div
                key={i}
                className="mylearning_item flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:shadow-sm transition bg-white"
              >


                <img
                  src={course.img}
                  alt="course"
                  className="w-full md:w-56 h-36 object-fill rounded-lg shrink-0"
                />


                <div className="flex-1">


                  <div className="flex flex-wrap gap-2 justify-between items-start">
                    <h4 className="text-sm md:text-xl font-semibold text-text-dark leading-7">
                      {course.title}
                    </h4>
                    <span
                      className={`text-xs md:text-sm font-medium px-3 py-1 rounded-full mylearning_status ${course.status === "Not Started" ? "not-started" : ""
                        }`}
                    >
                      {course.status}
                    </span>
                  </div>


                  <p className="text-xs md:text-base text-text-body mt-1">
                    {course.desc}
                  </p>


                  <div className="mt-3">
                    <p className="text-xs md:text-base text-text-dark mb-1">
                      {course.progress}% Complete
                    </p>

                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[#2F3E56] rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>


                  <div className="flex flex-wrap justify-between items-center mt-4 gap-3">


                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex gap-1 items-center text-sm md:text-base">
                        <TiMediaPlayOutline className="border-2 rounded-full" /> {course.lessons} Lessons
                      </span>
                      <span className="flex gap-1 items-center text-sm md:text-base">
                        <TbLayoutSidebarRight /> {course.modules} Modules
                      </span>
                      <span className="flex gap-1 items-center text-sm md:text-base">
                        <MdOutlineWatchLater /> {course.hours} Hours
                      </span>
                    </div>


                    <button className="w-full md:w-auto px-4 py-2 bg-[#2F3E56] text-white text-sm font-semibold rounded-md hover:bg-[#253044] transition">
                     {course.status === "Not Started" ? "Join Now" : "Continue Learning"}
                    </button>

                  </div>

                </div>
              </div>

            ))}

          </div>
        </div>


        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gray-100 border rounded-2xl p-6 text-center shadow-sm">


            <h3 className="text-lg font-semibold text-gray-800 mb-6">
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
                    strokeWidth="10"
                  />


                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#2F3E56"
                    strokeWidth="10"
                    strokeDasharray="326.73"
                    strokeDashoffset="163.36"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />

                </svg>


                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">50%</span>
                  <span className="text-sm text-gray-500">Overall Progress</span>
                </div>

              </div>
            </div>

          </div>
          <div className="p-1 md:p-5 space-y-4">


            <h3 className="text-lg font-semibold text-gray-800">
              Upcoming Class
            </h3>


            <div className="bg-white border rounded-xl p-4 space-y-4">


              <div className="flex flex-wrap justify-between items-start">
                <h4 className="text-xs md:text-base font-semibold text-gray-800 leading-snug">
                  Real Estate Sales & Management
                </h4>

                <span className="text-xs bg-[#2F3E56] text-white px-3 py-1 mt-2 rounded-full">
                  June Week 2
                </span>
              </div>


              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/dashboard/dhoni.png"
                  alt="Instructor"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs text-gray-500">Conducted By</p>
                  <p className="text-sm font-medium text-gray-800">
                    M.S. Dhoni
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-2 mb-1">
                <FiCalendar /> <span>9 June, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock /> <span>12:00 PM</span>
              </div>


              <button className="w-full bg-[#2F3E56] text-white cursor-pointer py-2.5 rounded-lg hover:bg-[#253044] transition font-medium">
                Join Class
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}