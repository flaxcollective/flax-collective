import "@/app/styles/home/home-global-footprint.css";
export default function HomeGlobalFootprint() {
  return (
    <section className="global-footprint-section">
      <div className="global-footprint-container">
        <div className="global-footprint-top">
          <h2 className="global-footprint-title">Regions We Serve</h2>
          <p className="global-footprint-desc">
            Flax Collective Operates With A Focused Global Approach, Connecting Talent With Hospitality Employers Internationally.
          </p>
          <p className="global-footprint-desc">
            Our Work Centers On Regions That Are Known For Producing Motivated Hospitality Professionals While Also Supporting Hospitality Industries Experiencing Strong Demand For Skilled Service Talent.
          </p>
        </div>

        <div className="global-footprint-middle">
          <div className="global-footprint-middle-content">
            <h3 className="global-footprint-subtitle">Global Talent Sourcing</h3>
            <p className="global-footprint-subdesc">
              Flax Collective Connects Hospitality Employers With Skilled Professionals From Diverse International Talent Pools. We Focus On Identifying Candidates With Strong Technical Expertise, Cultural Adaptability, And A Commitment To Delivering Exceptional Guest Experiences Across Global Service Environments.
            </p>
          </div>
          <div className="global-footprint-middle-image">
            <img
              src="/assets/images/region-we-serve-image.png"
              alt="Regions We Serve Map"
            />
          </div>
        </div>

        <div className="global-footprint-bottom">
          <h3 className="global-footprint-subtitle-white">Employer Markets <span>– Globally</span></h3>
          <p className="global-footprint-desc-white">
            Flax Collective Focuses On <strong>Supporting Hospitality Employers Internationally</strong>, Across Some Of The World's Leading Hospitality Destinations.
          </p>
          <p className="global-footprint-desc-white">
            The Global Hospitality Sector Continues To Expand With <strong>Luxury Hotels, Resorts, Restaurants, And Service Organizations Seeking Professionals Who Can Deliver High-Quality Guest Experiences.</strong>
          </p>
          <p className="global-footprint-desc-white" style={{ marginBottom: 0 }}>
            Our Goal Is To Help Employers Access <strong>Prepared Hospitality Professionals Who Can Integrate Smoothly Into International Service Environments.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
