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
          <p className="text-[#6b7847] text-lg max-w-2xl mx-auto">
            A simple and structured process designed to guide you from learning to successful placement.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row justify-between items-start">

          {/* ✅ Horizontal Line — starts & ends at circle centers */}
          <div
            className="hidden md:block absolute h-[4px] bg-[#736A2F] z-0"
            style={{
              top: '44px', // half of 88px circle height
              left: halfCol,
              right: halfCol,
            }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex-1 flex flex-col md:items-center text-left md:text-center
                         flex-row md:flex-col items-start gap-4 md:gap-0 mb-8 md:mb-0 px-2"
            >
              {/* Vertical line for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-[43px] top-[88px] w-[4px] bg-[#c8d6bd] h-[calc(100%-56px)] z-0" />
              )}

              {/* Circle */}
              <div className="relative z-10 shrink-0 w-[88px] h-[88px] rounded-full bg-white
                border-[5px] border-[#736A2F] flex items-center justify-center
                shadow-xl transition-all duration-300">

                <img
                  src={step.img}
                  alt={step.title}
                  className="w-10 h-10 object-contain"
                />

              </div>

              {/* Text */}
              <div className="pl-4 md:pl-0">
                <h3 className="font-semibold text-dark text-[18px] mt-0 md:mt-6 mb-2 ">
                  {step.title}
                </h3>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksStudents;