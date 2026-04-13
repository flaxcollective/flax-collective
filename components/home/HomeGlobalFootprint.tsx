import "@/app/styles/home/home-global-footprint.css";
export default function HomeGlobalFootprint() {
  return (
    <section className="global-footprint-section">
      <div className="global-footprint-container">
        <div className="global-footprint-top">
          <h2 className="global-footprint-title">Regions We Serve</h2>
          <p className="global-footprint-desc">
            Flax Collective operates with a focused global approach, connecting talent with employers nationwide and internationally.
          </p>
          <p className="global-footprint-desc">
            Our work centres on regions that are known for producing motivated professionals while also supporting industries experiencing strong demand for skilled service talent.
          </p>
        </div>

        <div className="global-footprint-middle">
          <div className="global-footprint-middle-content">
            <h3 className="global-footprint-subtitle">Global Talent Sourcing</h3>
            <p className="global-footprint-subdesc">
              Flax Collective connects employers with skilled professionals from diverse international talent pools. We focus on identifying candidates with strong technical expertise, cultural adaptability, and a commitment to delivering exceptional guest experiences across global service environments.
            </p>
          </div>
          <div className="global-footprint-middle-image">
            <img
              src="/assets/images/region-we-serve-image.png"
              alt="Regions We Serve Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
