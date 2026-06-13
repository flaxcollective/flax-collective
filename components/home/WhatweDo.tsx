import React from "react";
import Image from "next/image";
import "@/app/styles/home/what-we-do.css";

const services = [
    {
        icon: "/assets/icons/service-icon/workshop-1.svg",
        title: "Workshops / Learning Experiences",
        desc: "Thoughtfully curated, interactive learning experiences designed to build confidence, creativity, communication, and emotional intelligence while fostering meaningful growth.",
        steps: [
            { title: "Assess Needs", desc: "Understand learning goals and development priorities." },
            { title: "Design Experience", desc: "Create tailored experiences aligned with desired outcomes." },
            { title: "Deliver Learning", desc: "Facilitate engaging and practical learning sessions." },
            { title: "Measure Impact", desc: "Evaluate outcomes and identify growth opportunities." },
        ],
    },
    {
        icon: "/assets/icons/service-icon/university-1.svg",
        title: "Educational Consulting",
        desc: "Helping schools, universities and organisations design impactful learning journeys.",
        steps: [
            { title: "Understand Goals", desc: "Identify institutional objectives and challenges." },
            { title: "Analyze Challenges", desc: "Assess gaps, opportunities, and improvement areas." },
            { title: "Develop Strategy", desc: "Build a customized roadmap for success." },
            { title: "Implement Solutions", desc: "Execute recommendations to drive meaningful outcomes." },
        ],
    },
    {
        icon: "/assets/icons/service-icon/book-1.svg",
        title: "Certification Courses",
        desc: "Professionally curated certification courses that equip learners with industry-relevant skills, practical knowledge, and credentials for career growth.",
        steps: [
            { title: "Enroll & Assess", desc: "Evaluate learner needs and starting points." },
            { title: "Learn & Practice", desc: "Develop skills through guided learning experiences." },
            { title: "Complete Evaluation", desc: "Demonstrate knowledge through assessments and projects." },
            { title: "Earn Certification", desc: "Receive credentials that support professional growth." },
        ],
    },
    {
        icon: "/assets/icons/service-icon/hiring.svg",
        title: "Recruitment & Placements",
        desc: "Strategic recruitment and placement services that connect skilled professionals with rewarding career opportunities and industry-leading employers.",
        steps: [
            { title: "Identify Talent Needs", desc: "Define role requirements and hiring objectives." },
            { title: "Source Candidates", desc: "Connect with qualified and suitable professionals." },
            { title: "Assess & Match", desc: "Evaluate candidates for the best fit." },
            { title: "Place & Support", desc: "Facilitate successful placements and ongoing support." },
        ],
    },
];

export default function WhatWeDo() {
    return (
        <section className="py-10 md:py-20">
            <div className="max-w-7xl mx-auto ">

                {/* Heading */}
                <div className="text-left md:text-center mb-0 md:mb-8">
                    <h2 className="whatweheading font-serif text-navy px-4 md:px-8">
                        What We Do
                    </h2>
                </div>

                <div className="whatwedo-grid">
                    {services.map((item, index) => (
                        <div key={index} className="whatwedo-card">

                            {/* Icon + Title */}
                            <div className="flex gap-2.5 md:gap-5 mb-4">
                                {/* Icon */}
                                <div className="whatwedo-icon-wrap shrink-0 rounded-full bg-[#6E7C3A1A] flex items-center justify-center">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={60}
                                        height={60}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col">
                                    <h3 className="whatwedo-title font-semibold text-navy mb-2">
                                        {item.title}
                                    </h3>

                                    <p className="whatwedo-desc">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>



                            {/* Steps timeline */}
                            <div className="whatwedo-steps">
                                {item.steps.map((step, i) => (
                                    <div key={i} className="whatwedo-step">
                                        <div className="step-indicator">
                                            <div className="step-dot" />
                                            {i < item.steps.length - 1 && (
                                                <div className="step-connector" />
                                            )}
                                        </div>
                                        <div className="step-content">
                                            <span className="step-label">{step.title}</span>
                                            <span className="step-sub">{step.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
