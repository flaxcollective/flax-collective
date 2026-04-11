"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const tabs = ['Mixology & Beverages', 'Hospitality Management', 'Chef Training', 'Language Programs', 'Concierge Training'];

const programs: Record<string, { name: string; duration: string; highlight?: boolean }[]> = {
  'Mixology & Beverages': [
    { name: 'Certificate In Hospitality Management', duration: '3 Mo' },
    { name: 'Diploma In Hotel Operations', duration: '6 Mo', highlight: true },
    { name: 'Train-the-Trainer Program', duration: '1 Mo' },
    { name: 'Restaurant Management Certification', duration: '6 Mo' },
    { name: 'Professional Event Management Program', duration: '6 Mo' },
  ],
  'Hospitality Management': [
    { name: 'Hospitality Leadership Essentials', duration: '4 Mo' },
    { name: 'Revenue & Yield Management', duration: '2 Mo' },
    { name: 'Front Office Operations', duration: '3 Mo' },
    { name: 'Housekeeping Excellence Certification', duration: '2 Mo' },
  ],
  'Chef Training': [
    { name: 'Professional Culinary Arts', duration: '6 Mo' },
    { name: 'Pastry & Baking Fundamentals', duration: '3 Mo' },
    { name: 'International Cuisines Masterclass', duration: '4 Mo' },
  ],
  'Language Programs': [
    { name: 'Business English For Hospitality', duration: '2 Mo' },
    { name: 'French For Hotel Industry', duration: '3 Mo' },
    { name: 'Mandarin Hospitality Communication', duration: '3 Mo' },
  ],
  'Concierge Training': [
    { name: 'Elite Concierge Certification', duration: '2 Mo' },
    { name: 'Guest Experience Management', duration: '1 Mo' },
    { name: 'VIP Service Excellence', duration: '1 Mo' },
  ],
};

export default function ProgramList() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const list = programs[activeTab] || [];

  return (
    <section className="py-24 bg-white" id="programs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">Our Catalog</p>
          <h2 className="text-3xl font-bold text-[#1e2d3d] mb-3">Programs That Inspire Growth</h2>
          <p className="text-[14px] text-[#666] max-w-xl mx-auto">
            Master the art of hospitality through our expertly designed certification and diploma programs tailored for students and industry professionals.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[12px] font-semibold transition-all ${
                activeTab === tab ? 'bg-[#6b7847] text-white shadow-md' : 'bg-[#f5f0e8] text-[#555] hover:bg-[#e8ede0]'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Program Accordion List */}
          <div className="space-y-2">
            {list.map((prog, i) => (
              <div key={i} className={`rounded-xl border transition-all overflow-hidden ${prog.highlight ? 'border-[#6b7847] shadow-md' : 'border-[#e8e0d5] hover:border-[#6b7847]/40'}`}>
                <button onClick={() => setExpanded(expanded === prog.name ? null : prog.name)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${prog.highlight ? 'bg-[#6b7847] text-white' : 'bg-white hover:bg-[#f5f0e8]'}`}>
                  <span className={`text-[14px] font-semibold ${prog.highlight ? 'text-white' : 'text-[#1e2d3d]'}`}>{prog.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-[12px] font-bold ${prog.highlight ? 'text-white/70' : 'text-[#6b7847]'}`}>{prog.duration}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expanded === prog.name ? 'rotate-180' : ''} ${prog.highlight ? 'text-white' : 'text-[#6b7847]'}`} />
                  </div>
                </button>
                {expanded === prog.name && (
                  <div className="px-5 py-4 bg-[#f5f0e8] border-t border-[#e8e0d5]">
                    <p className="text-[13px] text-[#555] leading-relaxed mb-4">
                      This comprehensive program builds foundational to advanced hospitality skills through hands-on training, industry mentorship, and real-world experience opportunities.
                    </p>
                    <div className="flex gap-3">
                      <a href="/contact-us" className="px-5 py-2 bg-[#6b7847] text-white text-[12px] font-bold rounded-full hover:bg-[#4f5c34] transition-colors">Apply Now</a>
                      <a href="#" className="px-5 py-2 border border-[#6b7847] text-[#6b7847] text-[12px] font-bold rounded-full hover:bg-[#6b7847] hover:text-white transition-colors">Read More</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 text-center">
              <a href="#" className="inline-block px-7 py-3 bg-[#6b7847] text-white text-[13px] font-semibold rounded-full hover:bg-[#4f5c34] transition-colors">All Programs</a>
            </div>
          </div>

          {/* Right: Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl self-start sticky top-24">
            <img src="/assets/programs-feature.png" alt="Program Highlight" className="w-full h-auto object-cover" />
            <div className="p-5 bg-white border-t border-[#e8e0d5]">
              <h4 className="font-bold text-[15px] text-[#1e2d3d] mb-2">Certificate In Food &amp; Beverage Service</h4>
              <p className="text-[12px] text-[#666] leading-relaxed mb-4">Gain internationally recognised certification in food and beverage management with placement support included.</p>
              <div className="flex gap-3">
                <a href="/contact-us" className="px-4 py-2 bg-[#6b7847] text-white text-[12px] font-bold rounded-lg hover:bg-[#4f5c34] transition-colors">Apply Now</a>
                <a href="#" className="px-4 py-2 border border-[#6b7847] text-[#6b7847] text-[12px] font-bold rounded-lg hover:bg-[#6b7847] hover:text-white transition-colors">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
