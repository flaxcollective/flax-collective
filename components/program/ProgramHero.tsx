'use client'
import Image from 'next/image'
import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight } from "react-icons/fa"
import "@/app/styles/Programs.css"

export default function ProgramHero() {
  return (
    <section className=" desktop_herobg pt-32 pb-16 md:mt-28 w-full ">

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

          <h3 className="text-xl sm:text-2xl md:text-5xl lg:text-7xl font-light leading-[1.2]">
            Structured Programs That Fit Your Career
          </h3>

          <p className="mt-4 text-sm sm:text-base max-w-2xl">
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