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
