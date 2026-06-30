"use client";
import "@/app/styles/home/home-programs.css";
import React, { useState, useEffect } from 'react';
import { FiClock } from "react-icons/fi";

const formatPrice = (price: any) => {
  if (!price) return "N/A";
  if (typeof price === "string" && (price.includes("₹") || price.includes("INR"))) {
    return price.replace("₹", "INR ");
  }
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `INR ${num.toLocaleString('en-IN')}`;
};


const initialCourses = [
  {
    title: "Hospitality Professional Foundations (HPF)",
    desc: "A Refined Gateway To Hospitality—Building Poise, Discipline, And Service Mindset.",
    fullDesc: "This program builds a strong base in core hospitality practices, service standards, and professional conduct. It focuses on grooming, communication, guest interaction, and operational awareness—ensuring individuals are prepared to perform with confidence in real-world environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet international hospitality expectations.",
    duration: "6 Months",
    price: "INR 10,000+",
    icon: "/assets/icons/HPF.png",
    image: "assets/images/programs-img/hfg.png"
  },
  {
    title: "Hotel Operations & Systems Certification (HOSC)",
    desc: "Immersive Hotel Operations Training—Building Precision, Efficiency, And Excellence.",
    fullDesc: "This program builds a strong foundation in essential hotel operations, service standards, and professional conduct. It focuses on developing skills in grooming, communication, guest interaction, and operational awareness—preparing individuals to perform confidently in real-world hospitality environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet global hospitality standards.",
    price: "INR 15,000+",
    duration: "6 Months",
    icon: "/assets/icons/HOSC.png",
    image: "assets/images/programs-img/hosc.png"
  },
  {
    title: "Hospitality Communication & Professional Skills (HCPS)",
    desc: "Master Communication, Presence, And Interpersonal Finesse.",
    fullDesc: "This program focuses on developing effective communication and interpersonal skills essential for the hospitality industry. It equips individuals with the confidence to engage with guests, handle real-world interactions, and maintain professional conduct across diverse environments. Through structured learning and practical exposure, participants develop clarity in communication, service mindset, and the adaptability required to meet global hospitality standards.",
    price: "INR 17,000+",
    duration: "6 Months",
    icon: "/assets/icons/HCPS.png",
    image: "assets/images/programs-img/hcps.png",
  },
  {
    title: "International Guest Experience Certification (IGEC)",
    fullDesc: "This program focuses on delivering exceptional guest experiences aligned with international hospitality standards. It develops skills in guest engagement, service personalization, cultural awareness, and problem resolution—ensuring individuals can create memorable and consistent service interactions. Through structured learning and practical exposure, participants build the confidence, professionalism, and adaptability required to exceed global guest expectations.",
    desc: "Build A Global Outlook On Guest Relations With Cultural Sensitivity And Personalized Service.",
    price: "INR 20,000+",
    duration: "6 Months",
    icon: "/assets/icons/IGEC.png",
    image: "assets/images/programs-img/igcs.png",
  },
  {
    title: "Career Success & International Placement Bootcamp (CSIPB)",
    desc: "A Focused Path To Success—Building Confidence, Polish, And Global Readiness.",
    fullDesc: "This program prepares individuals for career transitions and international placement opportunities in hospitality. It focuses on resume building, interview preparation, professional branding, and workplace readiness—ensuring candidates present themselves confidently to global employers. Through structured guidance and practical training, participants develop the skills and adaptability required to secure and succeed in international roles.",
    price: "INR 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/CSIPB.png",
    image: "assets/images/programs-img/csipb.png",
  },
  {
    title: "Professional Skills & Soft Skills Foundation (PSSF)",
    desc: "Refined Personal And Professional Growth—Enhancing Communication, And Etiquette.",
    fullDesc: "This program builds a strong foundation in essential professional and soft skills required across the hospitality industry. It focuses on communication, teamwork, time management, and workplace etiquette—preparing individuals to perform effectively in professional environments. Through structured learning and practical exposure, participants develop confidence, adaptability, and a service-oriented mindset needed for long-term career success.",
    price: "INR 12,000+",
    duration: "6 Months",
    icon: "/assets/icons/PSSF.png",
    image: "assets/images/programs-img/pssf.png",
  },
  {
    title: "Real Estate Sales & Management (RESM)",
    desc: "An Elevated Program To Refine Client Engagement, Negotiation, And Real Estate Acumen.",
    fullDesc: "This program builds a strong foundation in real estate sales, property management, and client handling. It focuses on market understanding, sales techniques, negotiation skills, and regulatory awareness—preparing individuals to perform confidently in real estate environments. Through structured learning, participants develop the professionalism, communication skills, and adaptability required to succeed in dynamic property markets.",
    price: "INR 12,000+",
    duration: "6 Months",
    icon: "/assets/icons/RESM.png",
    image: "assets/images/programs-img/resm.png",
  },
  {
    title: "Butler Service & Luxury Hospitality Certification (BSLHC)",
    desc: "Luxury Service Training—Master Bespoke Guest Care And Refined Butler Standards.",
    fullDesc: "This program builds a strong foundation in butler service and luxury hospitality standards. It focuses on personalized service, etiquette, discretion, and attention to detail—preparing individuals to deliver refined guest experiences in high-end environments. Through structured learning and practical exposure, participants develop professionalism, confidence, and the adaptability required to meet global luxury hospitality expectations.",
    price: "INR 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/BSLHC.png",
    image: "assets/images/programs-img/bslhc.png",
  },
  {
    title: "Professional Bartending & Guest Engagement Certification (PBGEC)",
    desc: "Master Bartending With Technical Skill, Charm, And Guest Engagement.",
    fullDesc: "This program builds a strong foundation in professional bartending and guest engagement. It focuses on mixology techniques, beverage knowledge, service etiquette, and customer interaction—preparing individuals to create engaging and high-quality guest experiences. Through structured learning and practical exposure, participants develop confidence, creativity, and the adaptability required to perform in dynamic hospitality environments.",
    price: "INR 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/PBGEC.png",
    image: "assets/images/programs-img/pbgec.png",
  },
  {
    title: "Childcare & Family Guest Services Certification (CFHC)",
    desc: "Thoughtful Family Care—Blending Warmth, Responsibility, And Hospitality Excellence.",
    fullDesc: "This program builds a strong foundation in childcare and family guest services within hospitality environments. It focuses on child safety, care routines, communication with families, and service sensitivity—preparing individuals to support family-friendly guest experiences. Through structured learning and practical exposure, participants develop patience, responsibility, and the professionalism required to deliver safe and engaging care services.",
    price: "INR 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/CFHC.png",
    image: "assets/images/programs-img/cfhc.png",

  }
];

interface HomeProgramsProps {
  onApplyNow: (courseTitle: string) => void;
}

export default function HomePrograms({ onApplyNow }: HomeProgramsProps) {
  const [courses, setCourses] = useState<any[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        }
      })
      .catch(err => console.error("Error loading courses:", err));
  }, []);
  return (
    <>
      <section id="programs" className="programs-section md:py-20">
        <div className="programs-container">


          <div className="programs-header-section">
            <h2>Industry Specific Courses</h2>
            <p className="programs-subtitle">Industry-Led. Relevant. Career Ready.</p>

          </div>


          <div className="programs-grid">
            {courses.map((course, idx) => (
              <div key={idx} className="program-card">
                <div className="program-icon-wrap">
                  <img src={course.icon} alt={course.title} />
                </div>
                <div className="program-card-content">
                  <h4>{course.title}</h4>
                </div>
                <div className="program-card-footer">

                  <button
                    onClick={() => onApplyNow(course.title)}
                    className="program-apply-btn text-nowrap"
                  >
                    Enquire Now
                  </button>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-nowrap program-view-btn"> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>





          {selectedCourse && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

              <div className="bg-white rounded-2xl max-w-2xl w-full px-10 py-6 relative">


                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 text-xl cursor-pointer"
                >
                  ✕
                </button>

                <div className="max-w-full flex justify-center">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="h-auto max-w-full mb-2"
                  />
                </div>



                <h3 className="text-xl font-semibold text-center mb-2">
                  {selectedCourse.title}
                </h3>


                <p className="text-gray-600 text-center mb-4">
                  {selectedCourse.fullDesc}
                </p>

                <div className="text-center mb-4">
                  <span className="text-[#2F3E56] font-bold text-lg">
                    Program Fee: {formatPrice(selectedCourse.price)}
                  </span>
                </div>



                <div className="flex justify-center">
                  <button
                    onClick={() => onApplyNow(selectedCourse.title)}
                    className="bg-[#2F3E56] text-white px-6 py-2 rounded-lg cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* <div className="global-page-divider mt-14"></div> */}

        </div>
      </section>


    </>

  );
}