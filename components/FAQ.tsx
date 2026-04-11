"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What regions do you operate in?",
      a: "We have a global footprint, with primary operations across North America, Europe, and Asia. Our network allows us to seamlessly bridge gaps between international markets."
    },
    {
      q: "How do you source your talent?",
      a: "Our talent pool is sourced through institutional alliances with top-tier hospitality schools worldwide, as well as a rigorous vetting process of seasoned professionals looking for their next major opportunity."
    },
    {
      q: "Do you offer tailored software solutions?",
      a: "Yes, we analyze your current technical infrastructure and recommend or build customized digital solutions to optimize operations, from booking engines to HR management."
    },
    {
      q: "What is your typical consulting timeline?",
      a: "Timelines vary based on the scope of the project. A standard discovery and strategy phase takes 3-4 weeks, followed by implementation which can range from a few months to ongoing partnership."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${openIdx === idx ? 'shadow-md border-[var(--color-primary)]' : 'hover:border-gray-300'}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none"
              >
                <span className="font-bold text-gray-900 pr-8 text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[var(--color-primary)] flex-shrink-0 transition-transform duration-300 ${openIdx === idx ? 'transform rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
