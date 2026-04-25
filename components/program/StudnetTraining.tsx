'use client';
import { useState } from "react";
import Image from "next/image";
import "@/app/styles/Programs.css";
const data = [
  {
    img: "/assets/images/programs-img/carrer-counsling.png",
    title: "Career Counselling",
    desc: "Personalised assessment of career goals with expert guidance for international opportunities.",
  },
  {
    img: "/assets/images/programs-img/certification.png",
    title: "Certification",
    desc: "Industry-recognised certifications to boost your skills and career growth.",
  },
  {
    img: "/assets/images/programs-img/workshop.png",
    title: "Workshops",
    desc: "Hands-on workshops designed to give practical experience and real-world exposure.",
  },
];

export default function TrainingSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedData = [
    data[activeIndex === -1 ? 0 : activeIndex],
    ...data.filter((_, i) => i !== (activeIndex === -1 ? 0 : activeIndex))
  ];

  return (
    <section className="w-full bg-[#e9e5dc] py-14 px-5 md:py-16">
      <div className="max-w-6xl mx-auto">

        {/* ═══ DESKTOP LAYOUT (md aur upar) ═══ */}
        <div className="hidden md:grid grid-cols-12 items-center gap-10 programs-wrapper">

          {/* LEFT - CARDS */}
          <div className="col-span-7">
            <div className="proprograms-cards">
              {data.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`proprogram-card ${activeIndex === index ? "active" : ""}`}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="30vw"
                    className="program-img"
                  />

                  <div className="program-overlay">
                    <h3 className="program-title">{item.title}</h3>

                    <p className="program-desc">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-5 programs-content">
            <h2 className="programs-heading">
              Student Training & <br /> Career Services
            </h2>

            <p className="programs-text">
              Empowering students with the skills, guidance, and global opportunities
              needed to build successful hospitality careers.
            </p>
          </div>

        </div>


        <div className="flex flex-col gap-4 md:hidden">

          {/* Header */}
          <div className="text-center mb-1">
            <h2 className="programs-heading text-[28px] leading-[38px] text-center">
              Student Training &<br />Career Services
            </h2>
            <p className="programs-text text-[13px] leading-[22px] max-w-[300px] mx-auto">
              Empowering professionals with the skills, guidance, and global
              opportunities needed to build successful careers.
            </p>
          </div>


          <div
            onClick={() => setActiveIndex(0)}
            className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
            style={{ height: "260px" }}
          >
            <Image
              src={orderedData[0].img}
              alt={orderedData[0].title}
              fill
              sizes="100vw"
               priority
              className="object-cover"
            />

            <div className="mobile-overlay bg-gradient-to-t from-[#2F3E56]/90 to-transparent">
              <h3 className="text-[#F4F1EA] font-semibold text-[18px]">
                {orderedData[0].title}
              </h3>

              <p className="text-[12px] leading-[20px] mt-1 text-[#F4F1EA]/90">
                {orderedData[0].desc}
              </p>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-3">
            {orderedData.slice(1, 3).map((item, index) => {
              const realIndex = data.findIndex(d => d === item);

              return (
                <div
                  key={realIndex}
                  onClick={() => setActiveIndex(realIndex)}
                  className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
                  style={{ height: "160px" }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                  <div className="mobile-overlay bg-gradient-to-t from-[#2F3E56]/90 to-transparent">
                    <h3 className="text-[#F4F1EA] font-semibold text-[16px]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}