import React from "react";
import "@/app/styles/Programs.css"


export default function WhatSetsApart() {
  return (
    <section className="py-10 lg:pb-34 sets_program">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center setpartsheading">

        {/* Heading */}
        <h2 className="mb-4">
          What Sets Our Programs Apart
        </h2>

        {/* Description */}
        <p className=" text-base max-w-2xl mx-auto mb-12">
          A powerful blend of industry-focused learning, practical training, and expert guidance
          designed to prepare you for real-world success.
        </p>

       

        {/* ================= DESKTOP VIEW ================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* LEFT SIDE (2 cards) */}
          <div className="flex gap-6 lg:w-1/3">

            <div className="sets-partcard w-full md:w-1/2">
              <h4> Industry-Aligned Curriculum</h4>
              <p>
               Carefully designed programs aligned with evolving global hospitality standards and industry expectations.
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

        </div>
      </div>
    </section>
  );
}
