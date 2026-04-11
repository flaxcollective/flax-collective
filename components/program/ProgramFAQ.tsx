"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How Do I Apply For A New Program?', a: 'Simply browse our program catalog, choose your preferred course, and click "Apply Now". Our team will review your application and contact you within 48 hours with next steps.' },
  { q: 'What Are The Joining Qualifications?', a: 'Entry requirements vary by program. Most certificate-level programs require a high school diploma, while advanced diplomas may require relevant industry experience. Full details are on each program page.' },
  { q: 'Are The Programs Online?', a: 'We offer a blend of online and in-person delivery formats depending on the program. Some require on-site practical components at partner institutions or hospitality venues.' },
  { q: 'Is There An Internship Component?', a: 'Yes! Many of our programs include a structured internship or industry placement component, giving students hands-on experience with leading hospitality brands around the world.' },
  { q: 'How Is Certification Offered?', a: 'Upon successful completion, students receive a globally recognized certificate or diploma from Flex Collective, co-verified by our institutional partners.' },
  { q: 'Is Acuity Scheduling Required?', a: 'For certain advisory or counselling sessions, you may need to schedule an appointment. Our team will guide you through this process during onboarding.' },
];

export default function ProgramFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">Support</p>
          <h2 className="text-3xl font-bold text-[#1e2d3d]">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-xl border transition-all overflow-hidden ${open === i ? 'border-[#6b7847] shadow-sm' : 'border-[#e8e0d5] hover:border-[#6b7847]/30'}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-[#f5f0e8] transition-colors">
                <span className="text-[14px] font-semibold text-[#1e2d3d] pr-5">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#6b7847] flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`px-5 overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-[13px] text-[#666] leading-relaxed pt-2 border-t border-[#e8e0d5]">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
