export default function HomeServices() {

  return (
    <section id="services" className="home-services-section">
      <div className="services-container service-for-emp">
        <h2 className="sfe-title">Services For Employers</h2>
        <p className="sfe-subtitle">
          Access Trained, Pre-Screened Hospitality Professionals Prepared To Meet International Standards.
        </p>
        <div className="sfe-grid">
          {/* Card 1 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <img src="/assets/images/for-employers-img-1.png" alt="Talent Sourcing" />
              <div className="sfe-img-title">Talent Sourcing</div>
            </div>
            <div className="sfe-text-container">
              <p>Identify Skilled Hospitality Professionals From A Global Talent Pool.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <img src="/assets/images/for-employers-img-2.png" alt="Pre-Screened Candidates" />
              <div className="sfe-img-title">Pre-Screened Candidates</div>
            </div>
            <div className="sfe-text-container">
              <p>Candidates Evaluated Through Structured Screening And Assessment Processes.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <img src="/assets/images/for-employers-img-3.png" alt="Recruitment & Placement" />
              <div className="sfe-img-title">Recruitment & Placement</div>
            </div>
            <div className="sfe-text-container">
              <p>End-To-End Hiring Support From Candidate Selection To Onboarding.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="sfe-card">
            <div className="sfe-img-container">
              <img src="/assets/images/for-employers-img-4.png" alt="Pay-After-Joining Model" />
              <div className="sfe-img-title">Pay-After-Joining Model</div>
            </div>
            <div className="sfe-text-container">
              <p>Transparent Recruitment Model Ensuring Payment Only After Successful Placement.</p>
            </div>
          </div>
        </div>

        <div className="sfe-button-container">
          <a href="/contact-us" className="sfe-btn">
            Hire Pre-Screened Talent
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
