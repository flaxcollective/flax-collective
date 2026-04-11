
export default function HomeAbout() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* ABOUT US */}
        <div className="about-top">
          <h2>About Us</h2>

          <p className="about-intro">
            Flax Collective Is A Hospitality Talent Development And Workforce Solutions Consultancy 
            Connecting Skilled Professionals Worldwide With International Hospitality Employers 
            Through Structured Training, Certification, And Responsible Recruitment Practices.
          </p>

          <div className="about-grid">
            {/* IMAGE */}
            <div className="about-image">
              <img src="/assets/about-us-image.png" alt="About" />
            </div>

            {/* TEXT */}
            <div className="about-text">
              <p>
                Recognizing The Growing Demand For Skilled Service Professionals In Global Hospitality Markets, 
                Flax Collective Was Established To Bridge The Gap Between Education And Industry Readiness.
              </p>

              <p>
                Many Hospitality Graduates Possess The Ambition And Foundational Knowledge Required To Succeed 
                Internationally, Yet Often Lack Structured Preparation For Global Workplace Environments.
              </p>

              <p>
                By Preparing Candidates Before Introducing Them To Employers, We Help Ensure That Organizations 
                Receive Professionals Who Are Confident, Capable, And Aligned With International Hospitality Standards.
              </p>

              <p>
                Our Work Is Built On The Principles Of Professional Development, Ethical Recruitment, And Long-Term Partnership.
              </p>
            </div>
          </div>
        </div>

        {/* FOUNDER MESSAGE */}
        <div className="founder-section">
          <h2>Founder’s Message</h2>

          <div className="founder-grid">
            {/* TEXT */}
            <div className="founder-text">
              <p>
                At Flax Collective, We Believe That Exceptional Hospitality Begins With Exceptional People.
              </p>

              <p>
                Across Global Markets, Many Talented Hospitality Professionals Possess The Passion And Potential 
                To Succeed On The International Stage.
              </p>

              <p>
                Our Focus Is On Preparation, Professionalism, And Partnership Through Structured Counselling 
                And Certification Programs.
              </p>

              <p>
                Flax Collective Exists To Create Meaningful Connections Helping Aspiring Professionals Build 
                Global Careers While Enabling Hospitality Organizations To Strengthen Their Teams.
              </p>
            </div>

            {/* IMAGE */}
            <div className="founder-image">
              <img src="/assets/founder.png" alt="Founder" />
              <div className="founder-caption">
                <p>NAME OF FOUNDER</p>
                <span>Founder Of Flax Collective</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}