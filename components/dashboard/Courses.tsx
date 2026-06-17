"use client";
import React, { useState } from "react";
import { BiBook } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FaRegPlayCircle } from "react-icons/fa";
import StudentModal from "@/components/shared/StudentModal";



export default function Courses() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

    const handleBuyNow = (courseTitle: string) => {
        setSelectedCourseTitle(courseTitle);
        setIsEnquiryModalOpen(true);
    };
    const courses = [
        {
            id: 1,
            title: "Hospitality Professional Foundations (HPF)",
            desc: "Learn core principles of hospitality management and service excellence.",
            category: "Hospitality",
            lessons: 15,
            hours: 20,
            enrolled: true,
            image: "/assets/images/programs-img/hfg.png"

        },
        {
            id: 2,
            title: "Hotel Operations & Systems Certification (HOSC)",
            desc: "Learn hotel operations, service standards, and professional skills.",
            category: "Hospitality",
            lessons: 15,
            hours: 20,
            enrolled: true,
            image: "/assets/images/programs-img/hosc.png"
        },
        {
            id: 3,
            title: "Hospitality Communication & Professional Skills (HCPS)",
            desc: "Develop real estate skills in sales, negotiation, and management.",
            category: "Hospitality",
            lessons: 12,
            hours: 18,
            enrolled: false,
            image: "/assets/images/programs-img/hcps.png"
        },
        {
            id: 4,
            title: "International Guest Experience Certification (IGEC)",
            desc: "Build skills for outstanding guest experience and service excellence.",
            category: "Communication",
            lessons: 10,
            hours: 12,
            enrolled: false,
            image: "/assets/images/programs-img/igcs.png"
        },
        {
            id: 5,
            title: "Career Success & International Placement Bootcamp (CSIPB)",
            desc: "Get ready for global placements and hospitality careers.",
            category: "Management",
            lessons: 20,
            hours: 25,
            enrolled: false,
            image: "/assets/images/programs-img/csipb.png"
        },
        {
            id: 6,
            title: "Professional Skills & Soft Skills Foundation (PSSF)",
            desc: "Enhance communication, teamwork, and workplace professionalism skills.",
            category: "Communication",
            lessons: 14,
            hours: 16,
            enrolled: false,
            image: "/assets/images/programs-img/pssf.png"
        },
        {
            id: 7,
            title: "Real Estate Sales & Management (RESM)",
            desc: "Develop real estate skills in sales, negotiation, and management.",
            category: "Real Estate",
            lessons: 14,
            hours: 16,
            enrolled: false,
            image: "/assets/images/programs-img/resm.png"
        },
        {
            id: 8,
            title: "Butler Service & Luxury Hospitality Certification (BSLHC)",
            desc: "Master personalized service and luxury hospitality etiquette.",
            category: "Professional Skills",
            lessons: 14,
            hours: 16,
            enrolled: false,
            image: "/assets/images/programs-img/bslhc.png"
        },

        {
            id: 9,
            title: "Professional Bartending & Guest Engagement Certification (PBGEC)",
            desc: "Build bartending skills for professional guest experiences.",
            category: "Professional Skills",
            lessons: 14,
            hours: 16,
            enrolled: false,
            image: "/assets/images/programs-img/pbgec.png"
        },
        {
            id: 10,
            title: "Childcare & Family Guest Services Certification (CFHC)",
            desc: "Develop childcare and guest service skills for hospitality.",
            category: "Professional Skills",
            lessons: 14,
            hours: 16,
            enrolled: false,
            image: "/assets/images/programs-img/cfhc.png"
        }
    ];

    // ✅ FILTER LOGIC
    const filteredCourses =
        activeCategory === "All"
            ? courses
            : courses.filter(course => course.category === activeCategory);

    // ✅ CATEGORY LIST
    const categories = [
        "All",
        "Hospitality",
        "Real Estate",
        "Communication",
        "Management",
        "Professional Skills"
    ];

    return (
        <>
            {/* Explore the course start */}
            <section className="">
                <div className="max-w-full mx-auto ">

                    <div className="grid grid-cols-1 lg:grid-cols-12  gap-1 md:gap-8 items-center">

                        {/* LEFT */}
                        <div className="lg:col-span-7">

                            <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-2">
                                Explore Our Courses
                            </h2>

                            <p className="text-text-body mb-4 text-xs md:text-base">
                                Discover a wide range of professional courses designed to help you grow your skills and advance your career.
                            </p>

                            <div className="hidden md:block relative w-full sm:max-w-md  lg:mx-0">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                <input
                                    type="text"
                                    placeholder="Search Courses..."
                                    className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-5">

                            {/* MOBILE */}
                            <div className="grid grid-cols-2 gap-3 sm:hidden">

                                {/* ITEM */}
                                <div className="bg-white rounded-xl border p-3 flex items-center gap-3">

                                    <div className="w-10 h-10 flex items-center justify-center bg-[#0f172a] rounded-lg shrink-0">
                                        <BiBook className="text-white text-xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold leading-none">12+</h3>
                                        <p className="text-sm text-navy leading-tight">Courses</p>
                                        <span className="text-xs text-text-body">Available</span>
                                    </div>

                                </div>

                                {/* ITEM */}
                                <div className="bg-white rounded-xl border p-3 flex items-center gap-3">

                                    <div className="w-10 h-10 flex items-center justify-center bg-navy rounded-lg shrink-0">
                                        <CiFilter className="text-white text-xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold leading-none">6</h3>
                                        <p className="text-xs md:text-sm text-navy leading-tight">Categories</p>
                                        <span className="text-xs text-text-body text-nowrap">To choose from</span>
                                    </div>

                                </div>

                                {/* ITEM */}
                                <div className="bg-white rounded-xl border p-3 flex items-center gap-3 col-span-1">

                                    <div className="w-10 h-10 flex items-center justify-center bg-navy rounded-lg shrink-0">
                                        <FiUsers className="text-white text-xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold leading-none">500+</h3>
                                        <p className="text-sm text-navy leading-tight">Learners</p>
                                        <span className="text-xs text-text-body">Enrolled</span>
                                    </div>

                                </div>

                            </div>

                            {/* DESKTOP */}
                            <div className="hidden sm:grid bg-white rounded-2xl shadow-sm grid-cols-3 divide-x overflow-hidden">

                                {/* ITEM */}
                                <div className="p-6 flex items-center gap-4">

                                    <div className="w-12 h-12 flex items-center justify-center bg-navy rounded-lg">
                                        <BiBook className="text-white text-2xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-semibold">12+</h3>
                                        <p className="text-base text-navy">Courses</p>
                                        <span className="text-xs text-text-body">Available</span>
                                    </div>

                                </div>

                                {/* ITEM */}
                                <div className="p-6 flex items-center gap-4">

                                    <div className="w-12 h-12 flex items-center justify-center bg-navy rounded-lg">
                                        <CiFilter className="text-white text-2xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-semibold">6</h3>
                                        <p className="text-base text-navy">Categories</p>
                                        <span className="text-xs text-text-body">To choose from</span>
                                    </div>

                                </div>

                                {/* ITEM */}
                                <div className="p-6 flex items-center gap-4">

                                    <div className="w-12 h-12 flex items-center justify-center bg-navy rounded-lg">
                                        <FiUsers className="text-white text-2xl" />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-semibold">500+</h3>
                                        <p className="text-base text-navy">Learners</p>
                                        <span className="text-xs text-text-body">Enrolled</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="max-w-full mx-auto">


                    <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-6 border-b-2 border-[#2F3E56] pb-2 sm:border-b-0 sm:pb-0 inline-block">
                        Search by category
                    </h2>


                    {/* MOBILE SEARCH + FILTER */}
                    <div className="md:hidden relative md:hidden mb-6">

                        {/* TOP BAR */}
                        <div className="flex gap-3 mb-3 md:hidden">

                            {/* SEARCH */}
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                <input
                                    type="text"
                                    placeholder="Search Courses..."
                                    className="w-full pl-10 pr-4 py-3 text-sm border rounded-xl bg-white focus:outline-none"
                                />
                            </div>

                            {/* FILTER BUTTON */}
                            <button
                                onClick={() => setShowMobileFilter(true)}
                                className="px-4 rounded-xl flex items-center gap-2 text-gray-700 bg-white border"
                            >
                                <FiFilter />
                                Filter
                            </button>

                        </div>

                       
                       
                        <div
                            className={`absolute right-0 w-56 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden transition-all duration-300 md:hidden
                         ${showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        >
                               {/* CATEGORY LIST */}
                            <div className="p-2 space-y-2">

                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setShowMobileFilter(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded-xl text-sm transition
                                                    ${activeCategory === cat
                                                ? "bg-[#2F3E56] text-white"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}

                            </div>

                        </div>
                    </div>



                    <div className="hidden md:flex flex-wrap gap-3 mt-4 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm border transition
                                            ${activeCategory === cat
                                        ? "bg-navy text-white"
                                        : "bg-white text-text-body"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* CARD GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

                        {filteredCourses.map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl p-4 shadow-sm border">


                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full object-contain rounded-lg mb-4"
                                />


                                <h3 className=" text-sm md:text-base font-medium text-text-dark mb-2 leading-5">
                                    {course.title}
                                </h3>


                                <p className="text-xs md:text-sm text-text-body mb-3">
                                    {course.desc}
                                </p>


                                <div className="flex items-center gap-4 text-xs md:text-sm text-text-body mb-4">
                                    <span className="flex items-center gap-1">
                                        <FaRegPlayCircle /> {course.lessons} Lessons
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiClock /> {course.hours} Hours
                                    </span>
                                </div>


                                <button
                                    onClick={() => handleBuyNow(course.title)}
                                    className="w-full py-2 rounded-lg bg-navy text-white text-sm cursor-pointer animate-none"
                                >
                                    Buy Now
                                </button>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* Browse by Category finish */}
            <StudentModal
                isOpen={isEnquiryModalOpen}
                onClose={() => {
                    setIsEnquiryModalOpen(false);
                    setSelectedCourseTitle("");
                }}
                initialCourse={selectedCourseTitle}
            />
        </>
    )
}