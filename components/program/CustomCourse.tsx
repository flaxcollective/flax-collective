"use client";
import React, { useState, useEffect } from "react";
import "@/app/styles/Programs.css";
import { VscSparkle } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomCourse = ({ user }: any) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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


    useEffect(() => {
        const fetchCourses = async () => {
            if (!user || !open) return;

            try {
                setLoading(true);
                setSelected([]);


                const res = await fetch("/api/custom-course", {
                    credentials: "include",
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("API Error:", res.status, errorText);
                    return;
                }

                const data = await res.json();

                if (data.courses) {
                    setSelected(data.courses);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [open, user]);

    const handleCheck = (course: string) => {
        setSelected((prev) =>
            prev.includes(course)
                ? prev.filter((c) => c !== course)
                : [...prev, course]
        );
    };


    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/custom-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    courses: selected,
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Courses saved successfully");
                setOpen(false);

            } else {
                alert(data.message || "Error saving courses");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleStart = () => {
        if (!user) {
            router.push("/auth/login?from=custom&callbackUrl=/programs#custom-course");
            return;
        }
        setOpen(true);
    };

    return (
        <>
            <section id="custom-course" className="custom-course mb-10 md:mb-20">
                <div className="max-w-7xl mx-auto px-4 pb-10">
                    <div className="flex flex-col items-center text-center gap-4">

                        <div className="custom-course-heading">
                            <h2 className="text-xl md:text-5xl font-normal flex items-center text-navy justify-center gap-2 leading-24 pb-2.5">
                                <span><VscSparkle /></span>
                                Customize Your Course, Your Way
                            </h2>

                            <p className=" text-xs md:text-lg leading-4.5 md:leading-7 font-medium text-text-body max-w-2xl mx-auto pb-3 md:pb-5">
                                Explore our wide range of courses, mix and match the topics you love, and shape a learning path that's built just for you.
                            </p>

                            {/* <button
                                onClick={handleStart}
                                className="bg-white px-5 py-3 rounded-lg font-bold text-base mt-4 cursor-pointer"
                            >
                                Start Customizing
                            </button> */}
                            <Link href="/contact">
                                <button className="bg-navy px-3.5 md:px-5 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base mt-4 cursor-pointer">
                                    Start Customizing
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* MODAL */}
                    {open && (
                        <div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className="bg-white w-full max-w-xl rounded-2xl shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* HEADER */}
                                <div className="flex customcoursemodel items-center px-6 py-6 relative">

                                    <h3 className="mx-auto text-2xl font-semibold text-gray-800">
                                        Customize Your Course
                                    </h3>

                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-3xl cursor-pointer"
                                    >
                                        &times;
                                    </button>

                                </div>

                                {/* LOADING */}
                                {loading ? (
                                    <div className="p-6 text-center">Loading...</div>
                                ) : (
                                    <>
                                        {/* COURSE LIST */}
                                        <div className="course-list">
                                            {courses.map((course, i) => {
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

                                        {/* FOOTER */}
                                        <div className="p-8 customcorse flex flex-col gap-3">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={selected.length === 0}
                                                className="w-full cursor-pointer disabled:opacity-50"
                                            >
                                                Submit Now
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CustomCourse;