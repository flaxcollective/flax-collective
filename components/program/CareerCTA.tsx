import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function CareerCTA() {
  return (
    <>
    
            <section className="py-7 lg:py-12 bg-[#3c4a5d]">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* TOP PILL */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 border-2 border-white text-white text-[14px] px-5 py-1.5 font-medium rounded-full tracking-wide shadow-[0px_2px_0px_0px_#FFFFFF]">
            <RiCheckboxBlankCircleFill className="text-[8px]" />
            READY TO TAKE THE NEXT STEP?
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-lg md:text-[42px] font-semibold text-white mb-2.5 md:mb-4 leading-tight">
          Start Your Global Career Today
        </h2>

        {/* DESCRIPTION */}
        <p className="text-white text-xs md:text-base mb-4 md:mb-8 max-w-xl mx-auto leading-relaxed">
         Take the first step towards a successful future in global opportunities.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="flex items-center gap-2 bg-[#e5e1d8] text-[#2F3E56] px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-[16px] font-medium rounded-full hover:bg-[#736A2F] hover:text-white transition-all"
          >
            Apply Now
            <IoArrowForwardOutline className="text-[14px]" />
          </a>
        </div>

      </div>
    </section>
    
    </>

  );
}