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
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-xl md:text-[42px] font-medium text-navy mb-3">
            How It Works For Students
          </h2>
          <p className="text-text-body leading-4.5 md:leading-7.5   text-xs md:text-lg">
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

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksStudents;