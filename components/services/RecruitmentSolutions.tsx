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
      image: '/assets/icons/service-icon/feedback.png',
      title: "Pre-screened Candidates",
      desc: "Candidates evaluated through structured screening and assessment processes."
    },
    {
      image: '/assets/icons/service-icon/human-resources.png',
      title: "Recruitment & Placement",
      desc: "End-to-end hiring support from candidate selection to onboarding."
    },
    
    // {
    //   image: '/assets/icons/service-icon/bill.png',
    //   title: "Quality Assurance",
    //   desc: "Deliver only the best, verified, and job-ready professionals."
    // }
  ]
  return (


    <section className="py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-left">
          {/* Part 1 - Heading */}
          <h2 className="text-xl md:text-4xl font-medium text-navy leading-8 md:leading-tight">
            Explore Our Range of Professional Services
          </h2>

          {/* Part 2 - Paragraph */}
          <p className="mt-4 text-gray-600 text-xs md:text-base leading-5">
            Access a curated pool of highly trained, pre-screened professionals —
            expertly prepared to deliver excellence at global standards.
          </p>
        </div>

        {/* Part 3 - Cards */}
        <div className="mt-6 md:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white recruirment-card p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-medium">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}