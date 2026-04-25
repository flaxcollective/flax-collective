"use client";
import "@/app/styles/home/home-programs.css";
import React, { useState } from 'react';
import { FiClock } from "react-icons/fi";

const courses = [
  {
    title: "Hospitality Professional Foundations (HPF)",
    desc: "A Refined Gateway To Hospitality—Building Poise, Discipline, And Service Mindset.",
    fullDesc: "This program builds a strong base in core hospitality practices, service standards, and professional conduct. It focuses on grooming, communication, guest interaction, and operational awareness—ensuring individuals are prepared to perform with confidence in real-world environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet international hospitality expectations.",
    duration: "6 Months",
    price: "₹ 10,000+",
    icon: "/assets/icons/HPF.png",
    image: "assets/images/programs-img/hfg.png"
  },
  {
    title: "Hotel Operations & Systems Certification (HOSC)",
    desc: "Immersive Hotel Operations Training—Building Precision, Efficiency, And Excellence.",
    fullDesc:"This program builds a strong foundation in essential hotel operations, service standards, and professional conduct. It focuses on developing skills in grooming, communication, guest interaction, and operational awareness—preparing individuals to perform confidently in real-world hospitality environments. Through structured learning and practical exposure, participants develop the mindset, discipline, and adaptability required to meet global hospitality standards.",
    price: "₹ 15,000+",
    duration: "6 Months",
    icon: "/assets/icons/HOSC.png",
     image: "assets/images/programs-img/hosc.png"
  },
  {
    title: "Hospitality Communication & Professional Skills (HCPS)",
    desc: "Master Communication, Presence, And Interpersonal Finesse.",
    fullDesc:"This program focuses on developing effective communication and interpersonal skills essential for the hospitality industry. It equips individuals with the confidence to engage with guests, handle real-world interactions, and maintain professional conduct across diverse environments. Through structured learning and practical exposure, participants build clarity in communication, service mindset, and the adaptability required to meet global hospitality standards.",
    price: "₹ 17,000+",
    duration: "6 Months",
    icon: "/assets/icons/HCPS.png",
    image: "assets/images/programs-img/hcps.png",
  },
  {
    title: "International Guest Experience Certification (IGEC)",
    fullDesc:"This program focuses on delivering exceptional guest experiences aligned with international hospitality standards. It develops skills in guest engagement, service personalization, cultural awareness, and problem resolution—ensuring individuals can create memorable and consistent service interactions. Through structured learning and practical exposure, participants build the confidence, professionalism, and adaptability required to exceed global guest expectations.",
    desc: "Build A Global Outlook On Guest Relations With Cultural Sensitivity And Personalized Service.",
    price: "₹ 20,000+",
     duration: "6 Months",
    icon: "/assets/icons/IGEC.png",
     image: "assets/images/programs-img/igcs.png",
  },
  {
    title: "Career Success & International Placement Bootcamp (CSIPB)",
    desc: "A Focused Path To Success—Building Confidence, Polish, And Global Readiness.",
    fullDesc:"This program prepares individuals for career transitions and international placement opportunities in hospitality. It focuses on resume building, interview preparation, professional branding, and workplace readiness—ensuring candidates present themselves confidently to global employers. Through structured guidance and practical training, participants develop the skills and adaptability required to secure and succeed in international roles.",
    price: "₹ 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/CSIPB.png",
    image: "assets/images/programs-img/csipb.png",
  },
  {
    title: "Professional Skills & Soft Skills Foundation (PSSF)",
    desc: "Refined Personal And Professional Growth—Enhancing Communication, And Etiquette.",
    fullDesc:"This program builds a strong foundation in essential professional and soft skills required across the hospitality industry. It focuses on communication, teamwork, time management, and workplace etiquette—preparing individuals to perform effectively in professional environments. Through structured learning and practical exposure, participants develop confidence, adaptability, and a service-oriented mindset needed for long-term career success.",
    price: "₹ 12,000+",
     duration: "6 Months",
    icon: "/assets/icons/PSSF.png",
     image: "assets/images/programs-img/pssf.png",
  },
  {
    title: "Real Estate Sales & Management (RESM)",
    desc: "An Elevated Program To Refine Client Engagement, Negotiation, And Real Estate Acumen.",
    fullDesc:"This program builds a strong foundation in real estate sales, property management, and client handling. It focuses on market understanding, sales techniques, negotiation skills, and regulatory awareness—preparing individuals to perform confidently in real estate environments. Through structured learning, participants develop the professionalism, communication skills, and adaptability required to succeed in dynamic property markets.",
    price: "₹ 12,000+",
     duration: "6 Months",
    icon: "/assets/icons/RESM.png" ,
    image: "assets/images/programs-img/resm.png",
  },
  {
    title: "Butler Service & Luxury Hospitality Certification (BSLHC)",
    desc: "Luxury Service Training—Master Bespoke Guest Care And Refined Butler Standards.",
    fullDesc:"This program builds a strong foundation in butler service and luxury hospitality standards. It focuses on personalized service, etiquette, discretion, and attention to detail—preparing individuals to deliver refined guest experiences in high-end environments. Through structured learning and practical exposure, participants develop professionalism, confidence, and the adaptability required to meet global luxury hospitality expectations.",
    price: "₹ 25,000+",
     duration: "6 Months",
    icon: "/assets/icons/BSLHC.png",
     image: "assets/images/programs-img/bslhc.png",
  },
  {
    title: "Professional Bartending & Guest Engagement Certification (PBGEC)",
    desc: "Master Bartending With Technical Skill, Charm, And Guest Engagement.",
    fullDesc:"This program builds a strong foundation in professional bartending and guest engagement. It focuses on mixology techniques, beverage knowledge, service etiquette, and customer interaction—preparing individuals to create engaging and high-quality guest experiences. Through structured learning and practical exposure, participants develop confidence, creativity, and the adaptability required to perform in dynamic hospitality environments.",
    price: "₹ 25,000+",
    duration: "6 Months",
    icon: "/assets/icons/PBGEC.png",
     image: "assets/images/programs-img/pbgec.png",
  },
  {
    title: "Childcare & Family Guest Services Certification (CFHC)",
    desc: "Thoughtful Family Care—Blending Warmth, Responsibility, And Hospitality Excellence.",
    fullDesc:"This program builds a strong foundation in childcare and family guest services within hospitality environments. It focuses on child safety, care routines, communication with families, and service sensitivity—preparing individuals to support family-friendly guest experiences. Through structured learning and practical exposure, participants develop patience, responsibility, and the professionalism required to deliver safe and engaging care services.",
    price: "₹ 25,000+",
     duration: "6 Months",
    icon: "/assets/icons/CFHC.png",
    image: "assets/images/programs-img/cfhc.png",

  }
];

interface HomeProgramsProps {
  onApplyNow: (courseTitle: string) => void;
}

export default function HomePrograms({ onApplyNow }: HomeProgramsProps) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  return (
    <section id="programs" className="programs-section max-w-6xl mx-auto px-4 sm:px-6 text-center md:py-20">
      <div className="programs-container">

     
        <div className="programs-header-section">
          <h2>Our Courses</h2>
          <p className="programs-subtitle">industry-led. relevant. career ready.</p>

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
                 Enquiry Now
                </button>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-nowrap border border-[#2F3E56] text-[#2F3E56] px-4 py-2 rounded-xl font-medium hover:bg-[#2F3E56] hover:text-white hover:-translate-y-0.5 transition-all duration-300"> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-section">

          <p className="cp-areas-label">Key Areas Of Learning</p>

          <div className="cp-areas-grid">
            {/* Guest Service Excellence */}
            <div className="cp-area-card">
              <span className="cp-area-icon">
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4167 24.7083L16.6667 21.5417L21.9167 24.75L20.5417 18.75L25.1667 14.75L19.0833 14.2083L16.6667 8.54167L14.25 14.1667L8.16667 14.7083L12.7917 18.75L11.4167 24.7083ZM6.375 31.6667L9.08333 19.9583L0 12.0833L12 11.0417L16.6667 0L21.3333 11.0417L33.3333 12.0833L24.25 19.9583L26.9583 31.6667L16.6667 25.4583L6.375 31.6667Z" fill="#6E7C3A" />
                </svg>
              </span>
              <p className="cp-area-label">Guest Service Excellence</p>
            </div>

            {/* Hospitality Operations Fundamentals */}
            <div className="cp-area-card">
              <span className="cp-area-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.99935 31.667V9.50035C4.99925 9.15823 5.10443 8.82436 5.30063 8.54408C5.49682 8.2638 5.77452 8.05069 6.09602 7.93369L22.2144 2.07369C22.3403 2.02786 22.4754 2.01308 22.6082 2.03058C22.741 2.04808 22.8677 2.09735 22.9774 2.17422C23.0872 2.25109 23.1768 2.35329 23.2386 2.47215C23.3005 2.59101 23.3327 2.72303 23.3327 2.85702V11.112L33.8594 14.6204C34.1914 14.7309 34.4801 14.9432 34.6848 15.2271C34.8894 15.511 34.9994 15.8521 34.9994 16.202V31.667H38.3327V35.0004H1.66602V31.667H4.99935ZM8.33268 31.667H19.9993V6.42535L8.33268 10.6687V31.667ZM31.666 31.667V17.4037L23.3327 14.6254V31.667H31.666Z" fill="#6E7C3A" />
                </svg>
              </span>
              <p className="cp-area-label">Operation Fundamentals</p>
            </div>

            {/* Professional Communication In Hospitality */}
            <div className="cp-area-card">
              <span className="cp-area-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 15.0013H26.6667M13.3333 21.668H23.3333M30 6.66797C31.3261 6.66797 32.5979 7.19475 33.5355 8.13244C34.4732 9.07012 35 10.3419 35 11.668V25.0013C35 26.3274 34.4732 27.5992 33.5355 28.5368C32.5979 29.4745 31.3261 30.0013 30 30.0013H21.6667L13.3333 35.0013V30.0013H10C8.67392 30.0013 7.40215 29.4745 6.46447 28.5368C5.52678 27.5992 5 26.3274 5 25.0013V11.668C5 10.3419 5.52678 9.07012 6.46447 8.13244C7.40215 7.19475 8.67392 6.66797 10 6.66797H30Z" stroke="#6E7C3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="cp-area-label">Professional Communication</p>
            </div>

            {/* Workplace Professionalism And Etiquette */}
            <div className="cp-area-card">
              <span className="cp-area-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 13.3346V10.0013C25 9.11725 24.6488 8.2694 24.0237 7.64428C23.3986 7.01916 22.5507 6.66797 21.6667 6.66797H18.3333C17.4493 6.66797 16.6014 7.01916 15.9763 7.64428C15.3512 8.2694 15 9.11725 15 10.0013V13.3346M25 13.3346H31.6667C32.5507 13.3346 33.3986 13.6858 34.0237 14.3109C34.6488 14.9361 35 15.7839 35 16.668V21.668M25 13.3346H15M15 13.3346H8.33333C7.44928 13.3346 6.60143 13.6858 5.97631 14.3109C5.35119 14.9361 5 15.7839 5 16.668V21.668M35 21.668V30.0013C35 30.8854 34.6488 31.7332 34.0237 32.3583C33.3986 32.9834 32.5507 33.3346 31.6667 33.3346H8.33333C7.44928 33.3346 6.60143 32.9834 5.97631 32.3583C5.35119 31.7332 5 30.8854 5 30.0013V21.668M35 21.668H23.3333M5 21.668H16.6667M16.6667 21.668V18.3346H23.3333V21.668M16.6667 21.668V25.0013H23.3333V21.668" stroke="#6E7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="cp-area-label">Workplace Professionalism and Etiquette</p>
            </div>

            {/* Cultural Readiness For International Work Environments */}
            <div className="cp-area-card">
              <span className="cp-area-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.75C11.0258 3.75 3.75 11.0258 3.75 20C3.75 28.9742 11.0258 36.25 20 36.25C28.9742 36.25 36.25 28.9742 36.25 20C36.25 11.0258 28.9742 3.75 20 3.75Z" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10" />
                  <path d="M19.9996 3.75C15.4629 3.75 11.1973 11.0258 11.1973 20C11.1973 28.9742 15.4629 36.25 19.9996 36.25C24.5363 36.25 28.802 28.9742 28.802 20C28.802 11.0258 24.5363 3.75 19.9996 3.75Z" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10" />
                  <path d="M9.16602 9.16602C12.1535 11.2871 15.9145 12.552 19.9996 12.552C24.0848 12.552 27.8457 11.2871 30.8332 9.16602M30.8332 30.8332C27.8457 28.7121 24.0848 27.4473 19.9996 27.4473C15.9145 27.4473 12.1535 28.7121 9.16602 30.8332" stroke="#6E7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 3.75V36.25M36.25 20H3.75" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
              </span>
              <p className="cp-area-label">Cultural Readiness for International Work Environments</p>
            </div>
          </div>

          <p className="cp-text cp-text--small py-7">
            Courses Are delivered through <strong>online learning modules, interactive sessions and in person.</strong>
          </p>
        </div>

        {selectedCourse && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-2xl max-w-2xl w-full px-10 py-6 relative">


              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-xl"
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

              <div className="flex justify-center mb-4 items-center gap-10">
                {/* <div className="flex items-center gap-2.5">
                  <FiClock className="text-lg text-[#2F3E56]" />
                  <span className="font-medium">
                    {selectedCourse.duration}
                  </span>
                </div> */}


                <div>
                  {/* <span className="text-[#2F3E56] font-semibold">
                    {selectedCourse.price}
                  </span> */}
                </div>
              </div>


             
              <div className="flex justify-center">
                <button
                  onClick={() => onApplyNow(selectedCourse.title)}
                  className="bg-[#2F3E56] text-white px-6 py-2 rounded-lg"
                >
                  Enquiry Now
                </button>
              </div>

            </div>
          </div>
        )}

        {/* <div className="global-page-divider mt-14"></div> */}

      </div>
    </section>
  );
}