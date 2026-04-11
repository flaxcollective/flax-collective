"use client";
import { useState } from 'react';
import EmployerModal from '../shared/EmployerModal';
import StudentModal from '../shared/StudentModal';

export default function HomeContectUs() {
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-left">
          <h2>Contact Us</h2>

          <p className="contact-subtext">
            For Inquiries Regarding <strong>Certification Programs, Recruitment Opportunities, Or Employer Partnerships,</strong> Please Contact The Flax Collective Team.
          </p>
          <p className="contact-subtext">
            We Look Forward To Supporting Professionals And Organizations In Building The Future Of Hospitality.
          </p>

          <div className="contact-points">
            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-1.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>24/7 Full Time Support</p>
            </div>

            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-2.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>Available Worldwide</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <div className="contact-cta-container">
            <button onClick={() => setIsEmployerModalOpen(true)} className="contact-cta-card employer-cta">
              <div className="cta-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cta-text">
                <h3>Hire Pre-Screened Talent</h3>
                <p>Find the best professionals for your organization.</p>
              </div>
              <div className="cta-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            <button onClick={() => setIsStudentModalOpen(true)} className="contact-cta-card student-cta">
              <div className="cta-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14L19 10L12 6L5 10L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 10V16C5 16 8 18 12 18C16 18 19 16 19 16V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cta-text">
                <h3>Apply Now</h3>
                <p>Start your journey in global hospitality.</p>
              </div>
              <div className="cta-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

      </div>

      <EmployerModal isOpen={isEmployerModalOpen} onClose={() => setIsEmployerModalOpen(false)} />
      <StudentModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} />
    </section>
  );
}