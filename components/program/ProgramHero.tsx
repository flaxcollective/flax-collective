<<<<<<< HEAD
'use client'
import Image from 'next/image'
import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight } from "react-icons/fa"
import "@/app/styles/Programs.css"

export default function ProgramHero() {
  return (
    <section className=" desktop_herobg pt-32 pb-4 md:pb-16 md:mt-28 w-full ">

      <div className="relative w-full  flex items-center">

        {/* Background Image */}
        {/* 
        <Image
          src="/assets/images/programs-img/program-hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top -z-10"
        /> 
        */}

        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col items-center text-center program-desktophero ">

          <h3 className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-normal  leading-[1.2]">
            Structured Programs That Fit Your Career
          </h3>

          <p className="mt-4 text-xs leading-6 md:leading-8 text-left md:text-center sm:text-base max-w-2xl">
            Flexible, structured programs designed to fit your schedule while building skills for real, long-term career growth and professional advancement.
          </p>
{/* 
          <div className="mt-6 md:mt-10 flex gap-4 md:gap-5 flex-wrap justify-center">
            <ButtonComponents 
              text="Explore Programs" 
              icon={<FaArrowRight />} 
            />
            <ButtonComponents 
              text="Apply Now" 
              icon={<FaArrowRight />} 
            />
          </div> */}

        </div>
      </div>

    </section>
  )
}
=======
export default function ProgramHero() {
  return (
    <section className="mt-[72px] min-h-[70vh] bg-[#f5f0e8] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">
        {/* Left: Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
          <img src="/assets/icons/hero-programs.png" alt="Programs Hero" className="w-full h-full object-cover" />
        </div>

        {/* Right: Text */}
        <div>
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Our Programs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e2d3d] mb-6 leading-snug">
            Future-Ready<br />Training Programs
          </h1>
          <p className="text-[14px] text-[#555] leading-relaxed mb-8 max-w-[400px]">
            Flax Collective&apos;s industry-accredited programs equip students with the skills, knowledge, and global experience needed to thrive in the competitive hospitality industry.
          </p>
          <div className="flex gap-4">
            <a href="/contact-us" className="px-7 py-3 bg-[#6b7847] text-white text-[13px] font-semibold rounded-full hover:bg-[#4f5c34] transition-colors">
              Apply Now
            </a>
            <a href="#programs" className="px-7 py-3 border-2 border-[#6b7847] text-[#6b7847] text-[13px] font-semibold rounded-full hover:bg-[#6b7847] hover:text-white transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
