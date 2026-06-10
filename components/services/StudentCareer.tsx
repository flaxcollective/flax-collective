"use client";
import { useState } from 'react';

const profiles = [
  {
    src: '/assets/images/founder-image.png',
    badge: 'Career Counselling',
    title: 'Career Counsellor',
    desc: 'Personalized guidance navigating global hospitality careers.',
  },
  {
    src: '/assets/images/for-employers-img-1.png',
    badge: 'Interview Prep',
    title: 'Interview Prep',
    desc: 'Intensive coaching for high-stakes hospitality interviews.',
  },
  {
    src: '/assets/images/for-employers-img-2.png',
    badge: 'Resume Review',
    title: 'Resume Review',
    desc: 'Expert-crafted CVs that stand out to top employers worldwide.',
  },
];

export default function StudentCareer() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20" style={{ background: '#F4F1EA' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-14 items-center">
        {/* Left: Text */}
        <div className="lg:w-[40%]">
          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6E7C3A' }}
          >
            For Students
          </p>
          <h2
            className="text-[30px] font-bold mb-2 leading-tight"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif' }}
          >
            Student Training &amp;<br />Career Services
          </h2>
          <div className="w-10 h-[3px] mb-6" style={{ background: '#6E7C3A' }} />
          <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#666666' }}>
            From career counselling to interview preparation and resume crafting, our dedicated services prepare students and early-career professionals for a thriving future in hospitality.
          </p>
          <p className="text-[14px] leading-relaxed mb-8" style={{ color: '#666666' }}>
            We work closely with educational institutions and students globally to ensure a smooth transition from academic life to meaningful industry careers.
          </p>
          <a
            href="/program"
            className="inline-block px-8 py-3 text-white text-[13px] font-bold tracking-wide transition-all duration-200"
            style={{ background: '#6E7C3A', borderRadius: '4px' }}
          >
            View Programs
          </a>

          {/* Pagination dots */}
          <div className="flex gap-2 mt-8">
            {profiles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                style={{ background: active === i ? '#6E7C3A' : '#c8c0b4' }}
              />
            ))}
          </div>
        </div>

        {/* Right: Carousel Cards */}
        <div className="lg:w-[60%]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {profiles.map((p, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  boxShadow: active === i ? '0 8px 30px rgba(110,124,58,0.25)' : '0 2px 10px rgba(0,0,0,0.06)',
                  transform: active === i ? 'scale(1.02)' : 'scale(1)',
                  border: active === i ? '2px solid #6E7C3A' : '2px solid transparent',
                }}
                onClick={() => setActive(i)}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '240px' }}>
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Badge overlay */}
                  <div
                    className="absolute bottom-3 left-3 right-3 text-center py-1.5 rounded"
                    style={{ background: '#6E7C3A' }}
                  >
                    <span className="text-white text-[11px] font-bold tracking-wider uppercase">
                      {p.badge}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <h4 className="font-bold text-[14px] mb-1" style={{ color: '#2F3E56' }}>
                    {p.title}
                  </h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#666666' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
