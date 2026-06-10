<<<<<<< HEAD
import React from "react";
import "@/app/styles/Programs.css"


export default function WhatSetsApart() {
  return (
    <section className="py-5 md:py-10  lg:pb-34 sets_program">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center setpartsheading">

        <h2 className="mb-2 md:mb-4">
          What Sets Us Apart
        </h2>

        <p className="text-base max-w-2xl mx-auto mb-4 md:mb-12">
          A powerful blend of industry-focused learning, practical training, and expert guidance
          designed to prepare you for real-world success.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* LEFT SIDE (2 cards) */}
          <div className="flex gap-6 lg:w-1/3">

            <div className="sets-partcard w-full md:w-1/2">
              <h4> Industry-Aligned Curriculum</h4>
              <p>
               Carefully designed programs aligned with evolving global standards and industry expectations.
              </p>
            </div>

            <div className="sets-partcard w-full md:w-1/2 lg:translate-y-[3.5rem]">
              <h4> Practical Learning Approach</h4>
              <p>
                Hands-on training combined with real-world scenarios to develop strong, job-ready skills.
              </p>
            </div>

          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center lg:w-1/3 lg:translate-y-28">
            <div className="rounded-[20px] overflow-hidden shadow-md w-full max-w-[416px]">
              <img
                src="/assets/images/programs-img/icon/center-item.png"
                alt="Student learning"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE (2 cards) */}
          <div className="flex gap-6 lg:w-1/3">

            <div className="sets-partcard w-full md:w-1/2 lg:translate-y-[3.5rem]">
              <h4>Expert Guidance</h4>
              <p>
               Learn under the mentorship of experienced professionals with deep industry expertise and insights.
              </p>
            </div>

            <div className="sets-partcard w-full md:w-1/2">
              <h4>Global Career Opportunities</h4>
              <p>
               Unlock international career pathways with structured support and global placement opportunities.
              </p>
            </div>

          </div>

=======
export default function WhatSetsApart() {
  return (
    <section className="py-20 bg-[#e8ede0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#1e2d3d] mb-3">What Sets Our Programs Apart</h2>
          <p className="text-[14px] text-[#666] max-w-2xl mx-auto">
            Discover how our curated programs go beyond textbooks to deliver real-world hospitality excellence and global career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch">
          {/* Left column: 2 text cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Industry-Led Curriculum</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Developed with leading hospitality brands to ensure every program is aligned with current industry demands.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Practical Industry Impact</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Immersive field experiences and internships that build real-world competencies from day one of enrollment.</p>
            </div>
          </div>

          {/* Center: Featured image */}
          <div className="px-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img src="/assets/icons/programs-center.png" alt="Programs Featured" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right column: 2 text cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Global Career Network</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Access to a worldwide network of employers and placement opportunities across 20+ countries and top hotel brands.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Globally Accredited</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Our certifications are recognized globally, giving you the credentials needed to work at the world&apos;s finest establishments.</p>
            </div>
          </div>
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
        </div>
      </div>
    </section>
  );
}
