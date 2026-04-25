"use client";
import React, { useState } from 'react'
import "@/app/styles/Programs.css"
import { VscSparkle } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";


const CustomCourse = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

   const courses: string[] = [
    "Public Speaking & Presentation Skills",
    "Confidence Building",
    "Business English",
    "Personal Branding",
    "Restaurant & Café Management",
    "Bartending & Beverage Studies",
    "Catering Management",
    "Cruise & Airline Hospitality",
];
const handleCheck = (course: string) => {
    setSelected((prev: string[]) =>
        prev.includes(course)
            ? prev.filter((c: string) => c !== course)
            : [...prev, course]
    );
};

    const handleSubmit = () => {
        console.log("Selected Courses:", selected);
        setOpen(false);
    };

    return (
        <>
            <section className="custom-course">
                <div className="max-w-7xl mx-auto px-4 py-10">

                    <div className="flex flex-col items-center text-center gap-4">

                        <div className="custom-course-heading">
                            <h2 className="text-3xl md:text-5xl font-normal flex items-center text-white justify-center gap-2 leading-24 pb-2.5">
                                <span><VscSparkle /></span>
                                Customize Your Course, Your Way
                            </h2>

                            <p className="text-lg leading-7 font-normal text-white max-w-2xl mx-auto pb-10">
                                Explore our wide range of courses, mix and match the topics you love, and shape a learning path that's built just for you.
                            </p>

                            <button
                                onClick={() => setOpen(true)}
                                className="bg-white px-5 py-3 rounded-lg font-bold text-base mt-4 cursor-pointer">
                                Start Customizing
                            </button>
                        </div>

                    </div>

                    {/* Modal */}
                    {open && (
                        <div
                            className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className="bg-white w-full max-w-xl rounded-2xl shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex customcoursemodel items-center px-6 py-6 relative ">

                                    <h3 className="mx-auto text-2xl  font-semibold text-gray-800">
                                        Customize Your Course
                                    </h3>

                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-3xl"
                                    >
                                        &times;
                                    </button>

                                </div>

                                {/* Course List */}
                                <div className="course-list">
                                    {courses.map((course: string, i: number) => {
                                        const isActive = selected.includes(course);

                                        return (
                                            <div
                                                key={i}
                                                className={`course-item ${isActive ? "active" : ""}`}
                                                onClick={() => handleCheck(course)}
                                            >
                                                <span className="course-text">{course}</span>

                                                <span className={`custom-checkbox ${isActive ? "checked" : ""}`}>
                                                   <FaCheck />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="p-8 customcorse  flex flex-col gap-3">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full"
                                    >
                                        Submit Now
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                </div>



            </section>
        </>
    )
}

export default CustomCourse