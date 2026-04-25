import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function CareerCTA() {
  return (
    <section className="py-7 lg:py-12 bg-[#3c4a5d]">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* TOP PILL */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 border border-white/40 text-white text-[14px] px-5 py-1.5 font-semibold rounded-full tracking-wide">
            <RiCheckboxBlankCircleFill className="text-[8px]" />
            READY TO TAKE THE NEXT STEP?
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-[32px] md:text-[42px] font-semibold text-white mb-4 leading-tight">
          Start Your Global Career Today
        </h2>

        {/* DESCRIPTION */}
        <p className="text-white text-[16px] mb-8 max-w-xl mx-auto leading-relaxed">
          Take the first step towards a successful future in the hospitality industry.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="flex items-center gap-2 bg-[#e5e1d8] text-[#2F3E56] px-6 py-2.5 text-[16px] font-medium rounded-full hover:opacity-90 transition-all"
          >
            Apply Now
            <IoArrowForwardOutline className="text-[14px]" />
          </a>
        </div>

      </div>
    </section>
  );
}