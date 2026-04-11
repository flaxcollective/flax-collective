export default function ProgramHero() {
  return (
    <section className="mt-[72px] min-h-[70vh] bg-[#f5f0e8] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">
        {/* Left: Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
          <img src="/assets/hero-programs.png" alt="Programs Hero" className="w-full h-full object-cover" />
        </div>

        {/* Right: Text */}
        <div>
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Our Programs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e2d3d] mb-6 leading-snug">
            Future-Ready<br />Training Programs
          </h1>
          <p className="text-[14px] text-[#555] leading-relaxed mb-8 max-w-[400px]">
            Flex Collective&apos;s industry-accredited programs equip students with the skills, knowledge, and global experience needed to thrive in the competitive hospitality industry.
          </p>
          <div className="flex gap-4">
            <a href="/contact-us" className="px-7 py-3 bg-[#6b7847] text-white text-[13px] font-semibold rounded-full hover:bg-[#4f5c34] transition-colors">
              Apply Now
            </a>
            <a href="#programs" className="px-7 py-3 border-2 border-[#6b7847] text-[#6b7847] text-[13px] font-semibold rounded-full hover:bg-[#6b7847] hover:text-white transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
