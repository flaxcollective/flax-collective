
export default function HomeAbout() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* ABOUT US */}
        <div className="about-top">
          <h2>About Us</h2>

          <p className="about-intro">
            Flax Collective Is A Hospitality Talent Development And Workforce Solutions Consultancy <strong>Connecting Skilled Professionals Worldwide</strong> With <strong>International Hospitality Employers Through Structured Training, Certification, And Responsible Recruitment Practices.</strong>
          </p>

          <div className="about-grid">
            {/* IMAGE */}
            <div className="about-image">
              <img src="/assets/images/about-us-image.png" alt="About" />
            </div>

            {/* TEXT */}
            <div className="about-text">
              <p>
                Recognizing The Growing Demand For Skilled Service Professionals In Global Hospitality Markets, Flax Collective Was Established To Bridge The Gap Between <strong>Education And Industry Readiness.</strong>
              </p>

              <p>
                Many Hospitality Graduates Possess The Ambition And Foundational Knowledge Required To Succeed Internationally, Yet Often Lack Structured Preparation For Global Workplace Environments. Flax Collective Addresses This Challenge By Combining <strong>Career Guidance, Certification Programs, Professional Workshops, And Recruitment Support.</strong>
              </p>

              <p>
                By Preparing Candidates Before Introducing Them To Employers, We Help Ensure That Organizations Receive Professionals Who Are <strong>Confident, Capable, And Aligned With International Hospitality Standards.</strong>
              </p>

              <p>
                Our Work Is Built On The Principles Of <strong>Professional Development, Ethical Recruitment, And Long-Term Partnership,</strong> Enabling Both Candidates And Employers To Benefit From A Reliable And Transparent Process
              </p>
            </div>
          </div>
        </div>     
      </div>
    </section>
  );
}