'use client'

import Image from 'next/image'
import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight, FaUserTie, FaSearch, FaGlobe, FaCheckCircle } from "react-icons/fa"
import '@/app/styles/services.css'

export default function RecruitmentSolutions() {

        const cards = [
        {
            image: '/assets/icons/service-icon/talent-search.png',
            title: "Talent Sourcing",
            desc: "Identify experienced skilled professionals from a global talent pool."
        },
        {
            image: '/assets/icons/service-icon/human-resources.png',
            title: "Screening Process",
            desc: "Rigorous evaluation to ensure candidates meet industry standards."
        },
        {
            image: '/assets/icons/service-icon/feedback.png',
            title: "Global Reach",
            desc: "Connect with talent across multiple countries and industries."
        },
        {
            image: '/assets/icons/service-icon/bill.png',
            title: "Quality Assurance",
            desc: "Deliver only the best, verified, and job-ready professionals."
        }
     ]
  return (
    <section className="py-8 md:py-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2">

            <h2 className="text-xl md:text-4xl font-semibold text-[#2F3E56] leading-tight">
             Explore Our Range of Professional Services
            </h2>

            <p className="mt-4 text-gray-600 text-base">
              Access a curated pool of highly trained, pre-screened professionals — 
              expertly prepared to deliver excellence at global standards.
            </p>

            {/* <div className="mt-6">
              <ButtonComponents 
                text="Hire Pre-Screened Talent" 
                icon={<FaArrowRight />} 
              />
            </div> */}


          </div>

          {/* RIGHT SIDE */}
       <div className="w-full lg:w-1/2">

            <div className="grid grid-cols-2 gap-6">
              {cards.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white recruirment-card p-2 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 text-center"
                >

                  {/* IMAGE */}
                  <div className="recruiment-card flex justify-center mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-contain border"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-medium ">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                </div>
              ))}
            </div>

            </div>

        </div>

      </div>

    </section>
  )
}