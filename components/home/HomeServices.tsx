"use client";
import "@/app/styles/home/home-services.css";

interface HomeServicesProps {
  onHireTalent: () => void;
}

export default function HomeServices({ onHireTalent }: HomeServicesProps) {
  return (
    <section id="services" className="home-services-section">
      <div className="services-container service-for-emp">
        {/* ── FOR STUDENTS ────────────────────────────────── */}
        <div className="cp-section">
          <h2 className="cp-heading">For Students</h2>
          <p className="cp-text">
           Flax Collective provides a structured pathway for graduate students and working professionals who aspire to upgrade their careers in global markets. Our program is designed to guide candidates through professional preparation before introducing them to employment opportunities.
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
              <p className="fs-step-label">Introduction To Potential Employers</p>
            </div>

          </div>

          <p className="cp-text cp-text--small">
            Our Goal Is To Help Aspiring Professionals Develop The <strong>Skills, Confidence, And Industry Awareness Required To Succeed In Global Environments.</strong>
          </p>
        </div>

        {/* ── FOR EMPLOYERS ───────────────────────────────── */}
        <div className="cp-section">
          <h2 className="cp-heading">For Employers</h2>
          <p className="cp-text">
           Flax Collective supports organizations by providing access to <strong>trained and pre-screened professionals prepared for excellence.</strong>
          </p>
          <p className="cp-text">
           Through our structured preparation and evaluation process, employers receive candidates who are ready to integrate into operations and contribute organization goals.
          </p>
        </div>

        <p className="sfe-subtitle">
          Access trained, pre-screened professionals prepared to meet international standards.
        </p>
        <div className="sfe-grid mt-10">
          {/* Card 1 */}
          <div className="sfe-card">
            <div className="sfe-text-container-top">             
            </div>
            <div className="sfe-img-container">
              <div className="sfe-img-title">Talent Sourcing</div>
            </div>
            <div className="sfe-text-container-bottom">             
            </div>
          </div>

          {/* Card 2 */}
          <div className="sfe-card">
            <div className="sfe-text-container-top">             
            </div>
            <div className="sfe-img-container">
              <div className="sfe-img-title">Pre-Screened Candidates</div>
            </div>
            <div className="sfe-text-container-bottom">
            </div>
          </div>

          {/* Card 3 */}
          <div className="sfe-card">
            <div className="sfe-text-container-top">             
            </div>
            <div className="sfe-img-container">
              <div className="sfe-img-title">Recruitment & Placement</div>
            </div>
            <div className="sfe-text-container-bottom">
            </div>
          </div>

          {/* Card 4 */}
          <div className="sfe-card">
            <div className="sfe-text-container-top">             
            </div>
            <div className="sfe-img-container">
              <div className="sfe-img-title">Pay-After-Joining Model</div>
            </div>
            <div className="sfe-text-container-bottom">
            </div>
          </div>
        </div>

        <div className="sfe-button-container">
          <button onClick={onHireTalent} className="sfe-btn cursor-pointer">
            Hire Pre-Screened Talent
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}