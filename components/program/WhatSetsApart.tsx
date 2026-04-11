export default function WhatSetsApart() {
  return (
    <section className="py-20 bg-[#e8ede0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#1e2d3d] mb-3">What Sets Our Programs Apart</h2>
          <p className="text-[14px] text-[#666] max-w-2xl mx-auto">
            Discover how our curated programs go beyond textbooks to deliver real-world hospitality excellence and global career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch">
          {/* Left column: 2 text cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Industry-Led Curriculum</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Developed with leading hospitality brands to ensure every program is aligned with current industry demands.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Practical Industry Impact</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Immersive field experiences and internships that build real-world competencies from day one of enrollment.</p>
            </div>
          </div>

          {/* Center: Featured image */}
          <div className="px-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img src="/assets/icons/programs-center.png" alt="Programs Featured" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right column: 2 text cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Global Career Network</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Access to a worldwide network of employers and placement opportunities across 20+ countries and top hotel brands.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 flex-1 shadow-sm border border-[#e8e0d5]">
              <h3 className="font-bold text-[16px] text-[#1e2d3d] mb-3">Globally Accredited</h3>
              <p className="text-[13px] text-[#666] leading-relaxed">Our certifications are recognized globally, giving you the credentials needed to work at the world&apos;s finest establishments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
