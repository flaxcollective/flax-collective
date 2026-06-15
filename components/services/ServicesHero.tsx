'use client'

import Image from 'next/image'
import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight } from "react-icons/fa"

export default function ServicesHero() {
  return (
    <section className="">

      {/* ===== Desktop Background ===== */}
      <div className="service-deskbg pt-32 pb-4 md:pb-16 md:mt-25 w-full ">

        {/* Background Image */}
        {/* <Image
          src="/assets/images/services/hero/hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top"
        /> */}

    
   
        <div className="relative z-10 flex items-center justify-center px-4">
          <div className="service-desktop text-center max-w-7xl">

            <h3 className="pb-3.5 text-xl md:text-5xl lg:text-7xl font-normal max-w-4xl leading-24">
              Solutions Designed for Modern Professionals
            </h3>

            <p className="mt-4 text-xs leading-6 md:leading-8 text-left md:text-center text-text-dark sm:text-base max-w-2xl mx-auto">
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