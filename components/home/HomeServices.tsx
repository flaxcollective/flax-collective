"use client";
import "@/app/styles/home/home-services.css";
import { useState } from 'react';
import EmployerModal from '../shared/EmployerModal';

export default function HomeServices() {
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  return (
    <section id="services" className="home-services-section">
      <div className="services-container service-for-emp">
        {/* ── FOR STUDENTS ────────────────────────────────── */}
        <div className="cp-section">
          <h2 className="cp-heading">For Students</h2>
          <p className="cp-text">
            Flax Collective Provides A Structured Pathway For Students And Hospitality Graduates Who Aspire To Build Careers In International Hospitality Markets. Our Program Is Designed To Guide Candidates Through Professional Preparation Before Introducing Them To Employment Opportunities.
          </p>

          <div className="fs-steps-grid">

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/iapr.png" alt="Application" width={36} height={36} />
              </span>
              <p className="fs-step-label">Initial Application And Profile Review</p>
            </div>

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/ccpg.png" alt="Counselling" width={36} height={36} />
              </span>
              <p className="fs-step-label">Career Counselling And Professional Guidance</p>
            </div>

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/ectpwr.png" alt="Certification" width={36} height={36} />
              </span>
              <p className="fs-step-label">Enrollment In Certification Or Training Programs Where Required</p>
            </div>

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/psdw.png" alt="Workshops" width={36} height={36} />
              </span>
              <p className="fs-step-label">Participation In Skill Development Workshops</p>
            </div>

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/csip.png" alt="Screening" width={36} height={36} />
              </span>
              <p className="fs-step-label">Candidate Screening And Interview Preparation</p>
            </div>

            <div className="fs-step-card">
              <span className="fs-step-icon">
                <img src="/assets/icons/iphe.png" alt="Employers" width={36} height={36} />
              </span>
              <p className="fs-step-label">Introduction To Potential Hospitality Employers</p>
            </div>

          </div>

          <p className="cp-text cp-text--small">
            Our Goal Is To Help Aspiring Professionals Develop The <strong>Skills, Confidence, And Industry Awareness Required To Succeed In Global Hospitality Environments.</strong>
          </p>
        </div>

        {/* ── FOR EMPLOYERS ───────────────────────────────── */}
        <div className="cp-section">
          <h2 className="cp-heading">For Employers</h2>
          <p className="cp-text">
            Flax Collective Supports Hospitality Organizations By Providing Access To <strong>Trained And Pre-Screened Professionals Prepared For International Service Environments.</strong>
          </p>
          <p className="cp-text">
            Through Our Structured Preparation And Evaluation Process, Employers Receive Candidates Who Are Ready To Integrate Into Hospitality Operations And Contribute To Guest Experience Excellence.
          </p>
        </div>

        <p className="sfe-subtitle">
          Access trained, pre-screened hospitality professionals prepared to meet international standards.
        </p>
        <div className="sfe-grid mt-10">
          {/* Card 1 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <div className="sfe-img-title">Talent Sourcing</div>
            </div>
            <div className="sfe-text-container">
              <p>
                Identify skilled hospitality professionals from a global talent pool.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <div className="sfe-img-title">Pre-Screened Candidates</div>
            </div>
            <div className="sfe-text-container">
              <p>
                Candidates evaluated through structured screening and assessment processes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <div className="sfe-img-title">Recruitment & Placement</div>
            </div>
            <div className="sfe-text-container">
              <p>
                End-to-end hiring support from candidate selection to onboarding.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <div className="sfe-img-title">Pay-After-Joining Model</div>
            </div>
            <div className="sfe-text-container">
              <p>
                Transparent recruitment model ensuring payment only after successful placement.
              </p>
            </div>
          </div>
        </div>

        <div className="sfe-button-container">
          <button onClick={() => setIsEmployerModalOpen(true)} className="sfe-btn cursor-pointer">
            Hire Pre-Screened Talent
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="sfe-recruitment mt-14">
          <h3 className="sfe-recruitment-heading">Recruitment Approach</h3>
          <p className="sfe-rec-text">
            Candidates Are Introduced Only After Undergoing <strong>Professional Development, Screening, And Evaluation,</strong> Ensuring Alignment With Employer Expectations.
          </p>
          <p className="sfe-rec-text">
            Our <strong>Pay-After-Joining Recruitment Model</strong> Allows Organizations To Engage With Confidence, Knowing That Placement Fees Are Applied Only After A Candidate Successfully Joins The Team.
          </p>
        </div>
      </div>

      <EmployerModal isOpen={isEmployerModalOpen} onClose={() => setIsEmployerModalOpen(false)} />
    </section>
  );
}