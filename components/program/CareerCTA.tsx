<<<<<<< HEAD
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function CareerCTA() {
  return (
    <>
    
            <section className="py-7 lg:py-12 bg-[#3c4a5d]">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* TOP PILL */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 border-2 border-white text-white text-[14px] px-5 py-1.5 font-semibold rounded-full tracking-wide shadow-[0px_2px_0px_0px_#FFFFFF]">
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
         Take the first step towards a successful future in global opportunities.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="flex items-center gap-2 bg-[#e5e1d8] text-[#2F3E56] px-6 py-2.5 text-[16px] font-medium rounded-full hover:bg-[#736A2F] hover:text-white transition-all"
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
=======
export default function CareerCTA() {
  return (
    <section className="py-20 bg-[#3d4a2e]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#a8b87a] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">Your Future Awaits</p>
        <h2 className="text-4xl font-bold text-white mb-5">Start Your Global Career Today</h2>
        <p className="text-white/70 text-[14px] mb-10 max-w-lg mx-auto leading-relaxed">
          Take the first step toward an extraordinary hospitality career. Apply now or schedule a call with our admissions team to find the perfect program for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact-us" className="px-8 py-3.5 bg-[#6b7847] text-white text-[13px] font-bold rounded-full hover:bg-[#4f5c34] transition-colors">
            Apply Now
          </a>
          <a href="/contact-us" className="px-8 py-3.5 border border-white/50 text-white text-[13px] font-bold rounded-full hover:bg-white/10 transition-colors">
            Schedule A Call
          </a>
        </div>
      </div>
    </section>
  );
}
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
