'use client'

import Image from 'next/image'
import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight } from "react-icons/fa"

export default function ServicesHero() {
  return (
    <section className="">

      {/* ===== Desktop Background ===== */}
      <div className="service-deskbg pt-32 pb-16 md:mt-28 w-full ">

        {/* Background Image */}
        {/* <Image
          src="/assets/images/services/hero/hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top"
        /> */}

    
   
        <div className="relative z-10 flex items-center justify-center   px-4">
          <div className="service-desktop text-center max-w-7xl">

            <h3 className="pb-3.5 text-xl md:text-5xl lg:text-7xl font-light leading-24">
              Solutions Designed for Modern <br /> Professionals
            </h3>

            <p className="  text-dark text-base md:text-md max-w-4xl mx-auto leading-8">
              We bridge the gap between talent and opportunity through structured training,
              professional preparation, and transparent recruitment services.
            </p>

            {/* <div className="mt-8 flex gap-5 justify-center flex-wrap">
              <ButtonComponents text="Explore Services" icon={<FaArrowRight />} />
              <ButtonComponents text="Get Started" icon={<FaArrowRight />} />
            </div> */}

            

          </div>
        </div>
      </div>

   

    </section>
  )
}