"use client";

import { FaPlayCircle, FaPaperclip } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useEffect } from "react";
import "@/app/styles/dashboard/dashboard-home.css"
import { HiOutlinePlay } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const data = [
    {
      title: "June Week 1",
      course: "Real Estate Sales & Management (RESM)",
      name: "Rohit Sharma",
      date: "3 June | 12:00 PM",
      videos: "01",
      files: "0",
      image: "/assets/images/dashboard/rohit.png",
    },
    {
      title: "June Week 1",
      course: "Hospitality Professional Foundations (HPF)",
      name: "Shikhar Dhawan",
      date: "7 June | 12:00 PM",
      videos: "0",
      files: "1",
      image: "/assets/images/dashboard/shikhar.png",
    },
    {
      title: "June Week 2",
      course: "Business Management Basics",
      name: "MS Dhoni",
      date: "9 June | 12:00 PM",
      videos: "02",
      files: "1",
      image: "/assets/images/dashboard/dhoni.png",
    },
  ];

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
      {/* Pay Fees Section */}
      {/*
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Pay Fees
        </h2>

        <div className="bg-white border rounded-xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base md:text-lg font-semibold text-text-dark">
            Real Estate Sales & Management (RESM)
          </h4>

          <div className="trainer_status flex items-center justify-between">
            <div className="flex items-center gap-2 mt-3">
              <img
                src="/assets/images/dashboard/rohit.png"
                alt="trainer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="text-xs md:text-[14px] text-text-body">Conducted By</p>
                <p className="text-xs md:text-lg font-semibold text-text-dark">
                  Rohit Sharma
                </p>
              </div>
            </div>

            <span className="text-xs bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              Paid
            </span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 space-y-3 shadow-sm">
          <h4 className="text-base md:text-lg font-semibold text-text-dark">
            Hospitality Professional Foundations (HPF)
          </h4>

          <div className="flex items-center gap-2 mt-5">
            <img
              src="/assets/images/dashboard/shikhar.png"
              alt="trainer"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[14px] text-text-body">Conducted By</p>
              <p className="text-sm md:text-lg font-medium text-text-dark">
                Shikhar Dhawan
              </p>
            </div>
          </div>

          <button className="w-full border mt-3 border-[#AD2727] text-[#AD2727] py-2.5 rounded-lg text-lg font-semibold hover:bg-red-50 transition cursor-pointer">
            Pay Now
          </button>
        </div>
      </div>
      */}

      {/* No Enrolled Courses Yet Box (Same as My Learning section) */}
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

      {/*
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        <div className="xl:col-span-2 space-y-8">


            <div>
            <div className="flex items-center gap-3 pb-5">
              <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                Learning Overview
              </h4>
              <div className="flex-1 h-px bg-black"></div>
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-3  gap-4 w-full p-5 rounded-2xl bg-white">
              {[
                { img: "assets/images/dashboard/book.png", value: "3", label: "Courses Enrolled" },
                { img: "assets/images/dashboard/certificate.png", value: "2", label: "Courses Completed" },
                { img: "assets/images/dashboard/hour-glass.png", value: "15+", label: "Hours Learned" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="learning-card  bg-[#2f3b52] text-white p-4 rounded-lg"
                >
                  <img
                    src={card.img}
                    alt={card.label}
                    className=" object-contain"
                  />
                  <div className="text-center">
                    <h5 className="text-3xl lg:text-5xl font-medium">{card.value}</h5>
                    <p className="text-xs md:text-sm font-semibold mt-1">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div>
            <div className="flex items-center gap-3 pb-5">
              <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                Continue Learning
              </h4>
              <div className="flex-1 h-px bg-black"></div>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    img: "/assets/images/programs-img/hfg.png",
                    title: "Hospitality Professional Foundations (HPF)",
                    progress: 75,
                  },
                  {
                    img: "/assets/images/programs-img/resm.png",
                    title: "Real Estate Sales & Management (RESM)",
                    progress: 75,
                  },
                ].map((course, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img
                      src={course.img}
                      alt="course"
                      className=" w-full max-w-32 mx-auto"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className=" text-sm md:text-xl md:text-left font-medium text-text-text-dark  leading-snug py-1">
                        {course.title}
                      </h4>
                      <p className="text-xs md:text-left text-text-text-dark">{course.progress}% Complete</p>
                      <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
                        <div
                          className="h-2 bg-[#2f3b52] rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div>
            <div className="flex items-center gap-3 pb-5">
              <h4 className="text-sm md:text-2xl font-semibold whitespace-nowrap">
                Upcoming Classes
              </h4>
              <div className="flex-1 h-px bg-black"></div>
            </div>

            <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#979797] rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <h4 className="text-lg font-semibold text-text-dark">{item.title}</h4>
                  <p className="text-sm mt-1.5 md:mt-0 text-text-body md:text-nowrap">{item.course}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="text-[13px] text-text-body">Conducted By</p>
                      <p className="text-base font-semibold text-text-dark">{item.name}</p>
                    </div>
                  </div>

                  <p className="text-sm text-text-dark font-medium mt-4">{item.date}</p>

                  <button className="w-full mt-4 bg-[#2f3b52] hover:bg-[#253044] text-white py-2 rounded-md text-sm transition-colors">
                    Watch Now
                  </button>

                  <div className="border-t my-3"></div>

                  <div className="flex justify-between items-center text-gray-600">
                    <div className="flex items-center gap-2">
                      <HiOutlinePlay className="w-10 h-10 text-text-dark" />
                      <div className="leading-tight">
                        <p className="font-normal text-xl text-text-dark text-center">{item.videos}</p>
                        <p className="text-[12px] text-text-body">Videos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrAttachment className="w-10 h-10  text-text-dark" />
                      <div className="leading-tight">
                        <p className="font-medium text-xl text-text-dark text-center">{item.files}</p>
                        <p className="text-[12px] text-text-body">Attachments</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full ">
          <div className="bg-white p-4 rounded-xl w-full">
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
                selected: "bg-blue-600 text-text-dark rounded-full",
                today: "text-blue-600 font-bold",
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

          <div className="p-2 md:p-6 rounded-xl w-full space-y-4">


            <h2 className="text-lg mt-3 md:mt-0 font-semibold text-gray-800">
              Pay Fees
            </h2>


            <div className="bg-white border rounded-xl p-4 space-y-3">

              <h4 className="text-sm  md:text-lg font-semibold text-text-dark">
                Real Estate Sales & Management (RESM)
              </h4>


              <div className="trainer_status flex items-center justify-between">

                <div className="flex items-center gap-2 mt-3">
                  <img
                    src="/assets/images/dashboard/rohit.png"
                    alt="trainer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-xs md:text-[14px] text-text-body">Conducted By</p>
                    <p className="text-xs md:text-lg font-semibold text-text-dark">
                      Rohit Sharma
                    </p>
                  </div>
                </div>


                <span className="text-xs  px-2 md:px-7 py-2 rounded-full">
                  Paid
                </span>
              </div>
            </div>


            <div className="bg-white border rounded-xl p-4 space-y-3">

              <h4 className="text-sm md:text-lg font-semibold text-text-dark">
                Hospitality Professional Foundations (HPF)
              </h4>

              <div className="flex items-center gap-2 mt-5">
                <img
                  src="/assets/images/dashboard/shikhar.png"
                  alt="trainer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="leading-tight">
                  <p className="text-[14px] text-text-body">Conducted By</p>
                  <p className="text-sm md:text-lg font-medium text-text-dark ">
                    Shikhar Dhawan
                  </p>
                </div>
              </div>


              <button className="w-full border mt-3 border-[#AD2727] text-[#AD2727] py-2 rounded-lg text-xl font-medium hover:bg-red-50 transition">
                Pay Now
              </button>
            </div>

          </div>
        </div>




      </div>
      */}
    </div>
  );
}