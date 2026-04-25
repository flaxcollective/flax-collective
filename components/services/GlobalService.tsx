'use client'

import ButtonComponents from "@/components/shared/ButtonComponents"
import { FaArrowRight, FaUserGraduate, FaBuilding } from "react-icons/fa"
import { TbPointFilled } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa"
import '@/app/styles/services.css'


type GlobalServiceProps = {
  onApplyNow: (course: string) => void
  onHireTalent: () => void
}


export default function GlobalService({ onApplyNow, onHireTalent }: GlobalServiceProps) {
  return (
    <section className="global-service py-5 md:py-9">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:justify-center lg:flex-row items-center gap-5 md:gap-12">


       <div className="start_journey-card w-full lg:w-1/2 flex flex-col">

            <h2 className="mt-4 font-normal text-white leading-tight order-1">
              Build Your Future with Global Opportunities
            </h2>

            <p className="mt-4 text-white text-base md:text-lg order-2">
              Take the next step toward your goals with expert training, global placements, 
              and end-to-end support for students and employers.
            </p>

          <a
              href="#"
              className="start_journey inline-flex items-center gap-1 border border-white text-white px-4 py-2 rounded-full text-sm font-medium mb-2 md:mb-5 order-3 lg:order-0 w-fit self-start"
            >
              <TbPointFilled /> START YOUR JOURNEY TODAY
            </a>

          </div>

       
          <div className="w-full lg:w-1/2">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* ===== Card 1 ===== */}
              <div className="bg-white recruit_card p-4 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">

                {/* Icon */}
                <div className="w-20 h-20 ico flex text-white items-center justify-center rounded-lg mb-4 text-xl mx-auto">
                  <FaUserGraduate className="text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-lg text-center font-semibold ">
                  For Students
                </h3>

                <p className="text-gray-600 mt-2 text-center  text-sm leading-relaxed">
                Launch your hospitality career with the right training, preparation, and global opportunities.
                </p>

                {/* Button */}
                <div className="mt-4 flex justify-center">
                  <ButtonComponents 
                    text="Start Journey" 
                    icon={<FaArrowRight />} 
                     onClick={() => onApplyNow("Hospitality Program")}
                  />
                </div>

              </div>

              {/* ===== Card 2 ===== */}
              <div className="bg-white recruit_card p-4 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">

                {/* Icon */}
                <div className="w-20 h-20 ico flex items-center text-white justify-center rounded-lg mb-4 text-xl mx-auto">
                         <FaUserTie className="text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  For Employers
                </h3>

                <p className="text-gray-600 mt-2 text-sm leading-relaxed text-center">
                 Hire skilled, pre-screened hospitality professionals tailored to your business needs.
                </p>

                {/* Button */}
                <div className="mt-4 flex justify-center">
               

                  <ButtonComponents 
                    text="Hire Talent" 
                    icon={<FaArrowRight />}
                    onClick={onHireTalent}
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}