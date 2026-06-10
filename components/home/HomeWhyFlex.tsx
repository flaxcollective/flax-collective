'use client';

import { useState } from 'react';
import { FiArrowUpRight, FiX } from 'react-icons/fi';
import { Users, Award, MapPin, ShieldCheck } from 'lucide-react';
import { LiaUserCheckSolid } from "react-icons/lia";
import HomeSlider from './HomeSlider';
import "@/app/styles/home/home-why-flex.css"

const whyFlexData = [
  {
    icon: <LiaUserCheckSolid className="text-[18px] md:text-[30px]" strokeWidth={1} />,
    title: "Prepared Talent",
    shortDesc: "Candidates undergo training, professional development...",
    fullDesc: "Candidates undergo training, professional development, and hands-on learning to ensure they are fully prepared for real-world industry roles."
  },
  {
    icon: <Award className="text-[18px] md:text-[30px]" strokeWidth={2.2} />,
    title: "Industry-Focused Development",
    shortDesc: "Certification programs and workshops are designed ar...",
    fullDesc: "Certification programs and workshops are designed around current industry needs, helping candidates gain practical skills and job-ready expertise."
  },
  {
    icon: <MapPin className="text-[18px] md:text-[30px]" strokeWidth={2.2} />,
    title: "Regional Talent Network",
    shortDesc: "We work with graduates and aspiring professionals from...",
    fullDesc: "We work with graduates and aspiring professionals from diverse regions, creating a strong talent pool that meets varying employer requirements."
  },
  {
    icon: <ShieldCheck className="text-[18px] md:text-[30px]" strokeWidth={2.2} />,
    title: "Transparent Recruitment",
    shortDesc: "Employers benefit from our pay-after-joining placem...",
    fullDesc: "Employers benefit from our pay-after-joining placement model, ensuring a risk-free and transparent hiring process."
  }
];

export default function HomeWhyFlex() {
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const openModal = (item: any) => setSelectedCard(item);
  const closeModal = () => setSelectedCard(null);

  return (
    <section className=" whyflax-main py-12 md:py-16 bg-[#F4F1EA]">

        <HomeSlider/>

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className=" mb-12">
          <h2 className="text-3xl md:text-5xl font-medium text-[#2F3E56]  tracking-tight">
            Why Flax Collective
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {whyFlexData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col h-full"
            >
              <div className="flex gap-2 md:gap-3">

                <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-[#2F3E56] rounded-full flex items-center justify-center">
                  <div className="text-white md:text-sm">{item.icon}</div>
                </div>

                <div className="flex-1">
                  <h3 className="text-[14px] md:text-[18px] leading-tight font-medium text-dark pb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#666] text-[13px] md:text-[14px] line-clamp-2">
                    {item.shortDesc}
                  </p>
                </div>

              </div>

              <div className="mt-auto flex justify-center items-center md:pt-2  ">
                <button
                  onClick={() => openModal(item)}
                  className="inline-flex items-center justify-center gap-1 underline text-[#2F3E56] text-sm md:text-base "
                >
                  Read More
                  <FiArrowUpRight className="arrow-icon text-lg md:text-xl" />
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="global-page-divider mt-16 "></div>

      </div>



      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 ">
          <div className="bg-white px-5 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl relative">

            {/* Close Icon - Top Right Corner */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-10 text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <FiX size={28} />
            </button>

            {/* Modal Header */}
            <div className="text-center">
              <div className="w-15 h-15 bg-[#2F3E56] rounded-full flex items-center justify-center mx-auto mb-2">
                <div className='text-white'>
                  {selectedCard.icon}
                </div>

              </div>

              <h3 className="text-xl pb-2 font-semibold text-dark ">
                {selectedCard.title}
              </h3>
            </div>


            <div className=" text-dark text-center">
              <p className="text-dark text-[17px] ">
                {selectedCard.fullDesc}
              </p>
            </div>



          </div>
        </div>
      )}


    </section>
  );
}