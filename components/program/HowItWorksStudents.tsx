<<<<<<< HEAD
import React from 'react';

const HowItWorksStudents = () => {
  const steps = [
    {
      img: "/assets/images/programs-img/icon/file.png",
      title: "Choose Your Program",

    },
    {
      img: "/assets/images/programs-img/icon/approve.png",
      title: "Enroll & Begin Your Journey",

    },
    {
      img: "/assets/images/programs-img/icon/online-learning.png",
      title: "Training & Skill Development",

    },
    {
      img: "/assets/images/programs-img/icon/award.png",
      title: "Certification & Professional Validation",

    },
    {
      img: "/assets/images/programs-img/icon/career.png",
      title: "Placement Support & Career Launch",

    },
  ];
  const total = steps.length; // 5
  const halfCol = `${100 / total / 2}%`;

  return (
    <section className=" py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#2F3E56] mb-3">
            How It Works For Students
          </h2>
          <p className="text-[#6b7847] text-lg">
            A simple and structured process designed to guide you from learning to successful placement.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row justify-between items-start">

          {/* ✅ Horizontal Line — starts & ends at circle centers */}
          <div
            className="hidden md:block absolute h-[4px] bg-[#736A2F] z-0"
            style={{
              top: '44px', 
              left: halfCol,
              right: halfCol,
            }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex-1 flex flex-col md:items-center bg-white md:bg-transparent text-left md:text-center
                         flex-row md:flex-col items-center rounded-xl gap-2 md:gap-0 mb-8 md:mb-0 px-2 w-full"
            >
              {/* Vertical line for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-8 md:left-[43px] top-0 md:top-[88px] w-[4px] bg-[#c8d6bd]  h-22 md:h-[calc(100%-56px)] z-0" />
              )}

              {/* Circle */}
              <div className="relative z-10 shrink-0 w-[54px] h-[54px]  md:w-[88px] md:h-[88px]  rounded-full bg-white
                border-[4px] border-[#736A2F] flex items-center justify-center
                shadow-xl transition-all duration-300">

                <img
                  src={step.img}
                  alt={step.title}
                  className="w-5 h-5 md:w-10 md:h-10 object-contain"
                />

              </div>

              {/* Text */}
              <div className="pl-4 md:pl-0">
                <h3 className="font-semibold text-dark text-[14px] md:text-[18px] mt-0 md:mt-6 mb-2 ">
                  {step.title}
                </h3>

=======
const steps = [
  { num: 1, title: 'Choose Your Program', desc: 'Browse our catalog and select the program that best aligns with your career goals and interests in hospitality.' },
  { num: 2, title: 'Proof of Eligibility & Experience', desc: 'Submit your application with the required documents confirming your eligibility to enroll in the program.' },
  { num: 3, title: 'Training, Up & Self-assessment', desc: 'Engage in intensive training sessions, self-assessments, and practical workshops to build your core skill set.' },
  { num: 4, title: 'On-the-ground Location & Guidance', desc: 'Participate in real-world placements guided by industry mentors at top hospitality brands and establishments.' },
  { num: 5, title: 'Student Support & Career Launch', desc: 'Receive dedicated career support, CV assistance, and employer introductions to launch your global hospitality career.' },
];

export default function HowItWorksStudents() {
  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">The Journey</p>
          <h2 className="text-3xl font-bold text-[#1e2d3d] mb-3">How It Works For Students</h2>
          <p className="text-[14px] text-[#666] max-w-xl mx-auto">A clear five-step pathway from enrollment to career launch in the global hospitality industry.</p>
        </div>

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-[#6b7847] flex flex-col items-center justify-center shadow-md">
                <span className="text-[10px] text-[#6b7847] font-bold leading-none">Step</span>
                <span className="text-[18px] font-bold text-[#6b7847] leading-none">{step.num}</span>
              </div>
              <div className="bg-white rounded-2xl p-5 flex-1 shadow-sm border border-[#e8e0d5] hover:shadow-md hover:border-[#6b7847]/30 transition-all">
                <h3 className="font-bold text-[15px] text-[#1e2d3d] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{step.desc}</p>
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
<<<<<<< HEAD
};

export default HowItWorksStudents;
=======
}
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
