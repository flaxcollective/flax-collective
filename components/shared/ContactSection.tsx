"use client";
import { useState } from 'react';

export default function ContactSection() {
  const [service, setService] = useState('');

  return (
    <section className="py-20" id="contact" style={{ background: '#F4F1EA' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-14">
          {/* Left: Contact Info */}
          <div className="lg:w-1/2">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#6E7C3A' }}>
              Get In Touch
            </p>
            <h2
              className="text-[32px] font-bold mb-4"
              style={{ color: '#6E7C3A', fontFamily: 'Georgia, serif' }}
            >
              Contact Us
            </h2>
            <div className="w-10 h-[3px] mb-6" style={{ background: '#6E7C3A' }} />

            <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#444444' }}>
              For Inquiries Regarding{' '}
              <strong>Certification Programs, Recruitment Opportunities, Or Employer Partnerships,</strong>{' '}
              Please Contact The Flex Collective Team.
            </p>
            <p className="text-[14px] mb-8" style={{ color: '#555555' }}>
              We Look Forward To Supporting Professionals And Organizations In Building The Future Of Hospitality.
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-7">
              <div className="flex items-center gap-3">
                <img src="/assets/footer-mail-icon-1.png" alt="Email" className="w-5 h-5 object-contain flex-shrink-0" />
                <span className="text-[13px]" style={{ color: '#444444' }}>info@flexcollective.com</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="/assets/footer-mail-icon-2.png" alt="Email" className="w-5 h-5 object-contain flex-shrink-0" />
                <span className="text-[13px]" style={{ color: '#444444' }}>studentsupport@flex.com</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mb-10">
              {[
                { icon: '/assets/instagram-footer-icon.png', label: 'Instagram' },
                { icon: '/assets/facebook-footer-icon.png', label: 'Facebook' },
                { icon: '/assets/linkedin-footer-icon.png', label: 'LinkedIn' },
                { icon: '/assets/snapchat-footer-icon.png', label: 'Snapchat' },
                { icon: '/assets/youtube-footer-icon.png', label: 'YouTube' },
                { icon: '/assets/prime_twitter.png', label: 'Twitter' },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  title={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-md"
                  style={{ background: '#FFFFFF', border: '1px solid #e0d9ce' }}
                >
                  <img src={s.icon} alt={s.label} className="w-4 h-4 object-contain" />
                </a>
              ))}
            </div>

            {/* Why Reach Out */}
            <h3 className="text-[16px] font-bold mb-4" style={{ color: '#2F3E56' }}>Why Reach Out To Us?</h3>
            <div className="space-y-3">
              {[
                'Expert Consultation Tailored To Your Needs',
                'Quick Response & Professional Guidance',
                'Trusted By Clients Across Industries',
                'End-To-End Support & Solutions',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#6E7C3A' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-[13px]" style={{ color: '#444444' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2">
            <div className="rounded-lg p-8 shadow-2xl" style={{ background: '#2F3E56' }}>
              <h3 className="text-[18px] font-bold text-white mb-7">Contact Form</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(244,241,234,0.7)' }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full rounded px-4 py-3 text-[13px] text-white outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(244,241,234,0.7)' }}>
                    Email Id
                  </label>
                  <input
                    type="email"
                    placeholder="you@example123"
                    className="w-full rounded px-4 py-3 text-[13px] outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(244,241,234,0.7)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    className="w-full rounded px-4 py-3 text-[13px] outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(244,241,234,0.7)' }}>
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded px-4 py-3 text-[13px] outline-none transition-colors appearance-none"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  >
                    <option value="" style={{ background: '#2F3E56' }}>Choose The Service</option>
                    <option value="consulting" style={{ background: '#2F3E56' }}>Consulting</option>
                    <option value="staffing" style={{ background: '#2F3E56' }}>Global Staffing</option>
                    <option value="training" style={{ background: '#2F3E56' }}>Training Programs</option>
                    <option value="education" style={{ background: '#2F3E56' }}>Education Management</option>
                    <option value="software" style={{ background: '#2F3E56' }}>Software Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(244,241,234,0.7)' }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Write Your Message Here..."
                    rows={4}
                    className="w-full rounded px-4 py-3 text-[13px] outline-none transition-colors resize-none"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 text-[13px] font-bold rounded transition-colors duration-200"
                  style={{ background: '#6E7C3A', color: '#FFFFFF' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#5a6630')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#6E7C3A')}
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
