import React from "react";
import Image from "next/image";
import "@/app/styles/home/what-we-do.css";

const services = [
    {
        icon: "/assets/icons/service-icon/workshop-1.svg",
        title: "Workshops",
        desc: "Interactive experiences designed to build confidence, creativity, communication and emotional intelligence.",
    },
    {
        icon: "/assets/icons/service-icon/book-1.svg",
        title: "Learning Experiences",
        desc: "Thoughtfully curated programmes that transform learning into meaningful growth.",
    },
    {
        icon: "/assets/icons/service-icon/university-1.svg",
        title: "Educational Consulting",
        desc: "Helping schools, universities and organisations design impactful learning journeys.",
    },
];

export default function WhatWeDo() {
    return (
        <section className="py-7 md:py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-left md:text-center mb-5 md:mb-10">
                    <h2 className="whatweheading text-xl md:text-3xl lg:text-5xl font-medium font-serif text-navy">
                        What We Do
                    </h2>
                </div>

                {/* Services */}
                <div className="grid md:grid-cols-3">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className={`flex gap-1.5 md:gap-3.5 px-1 py-4 md:px-6 md:py-4 ${index !== services.length - 1
                                ? "md:border-r md:border-text-body"
                                : ""
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-15 h-15 whatdoimg min-w-[60px] md:w-20 md:h-20 md:min-w-[80px] lg:w-[120px] lg:h-[120px] lg:min-w-[120px] rounded-full bg-[#6E7C3A26] flex items-center justify-center">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={60}
                                    height={60}
                                    className="object-contain "
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-base md:text-xl lg:text-2xl font-serif font-medium text-navy mb-1 md:mb-3">
                                    {item.title}
                                </h3>

                                <p className="lh text-text-body font-medium leading-4.5 md:leading-6 text-[10px] md:text-xs lg:text-sm">
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