import React from "react";
import Image from "next/image";
import "@/app/styles/home/what-we-do.css";

const services = [
    {
        icon: "/assets/icons/service-icon/workshop-1.svg",
        title: "Workshops / Learning Experiences",
        desc: "Thoughtfully curated, interactive learning experiences designed to build confidence, creativity, communication, and emotional intelligence while fostering meaningful growth.",
    },
    {
        icon: "/assets/icons/service-icon/university-1.svg",
        title: "Educational consulting",
        desc: "Helping schools, universities and organisations design impactful learning journeys.",
    },
    {
        icon: "/assets/icons/service-icon/book-1.svg",
        title: "Certification courses",
        desc: "Professionally curated certification courses that equip learners with industry-relevant skills, practical knowledge, and credentials for career growth.",
    },
    {
        icon: "/assets/icons/service-icon/hiring.svg",
        title: "Recruitment & placements",
        desc: "Strategic recruitment and placement services that connect skilled professionals with rewarding career opportunities and industry-leading employers.",
    },
];

export default function WhatWeDo() {
    return (
        <section className="py-10 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-left md:text-center mb-4 md:mb-14">
                    <h2 className="whatweheading font-serif text-navy">
                        What We Do
                    </h2>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className={` relative flex items-start gap-2.5 md:gap-6 px-4 py-3 md:py-6 md:px-10 lg:py-8`}
                        >
                            {index % 2 === 0 && (
                                <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-text-body" />
                            )}  
                            {/* Icon circle */}
                            <div className="whatdoimg shrink-0 w-16 h-16 md:w-22.5 md:h-22.5 rounded-full bg-[#6E7C3A1A] flex items-center justify-center">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={44}
                                    height={44}
                                    className="object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-nowrap md:text-wrap text-sm md:text-lg lg:text-xl font-semibold font-serif text-navy mb-2 md:mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-text-body font-medium text-xs md:text-sm text-justify md:text-left leading-6">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}