import "@/app/styles/home/home-global-footprint.css";
export default function HomeGlobalFootprint() {
  return (
    <section className="global-footprint-section ">
      <div className="global-footprint-container max-w-7xl mx-auto px-4">

        <div className="global-footprint-top grid md:grid-cols-2 gap-8 items-center">

          {/* Left Content */}
          <div className="global-footprint-content">
            <h2 className="global-footprint-title ">
              Regions We Serve
            </h2>

            <p className="global-footprint-desc">
              Flax Collective operates with a focused global approach, connecting talent with employers nationwide and internationally.
            </p>

            <p className="global-footprint-desc">
              Our work centres on regions that are known for producing motivated professionals while also supporting industries experiencing strong demand for skilled service talent.
            </p>
          </div>

          {/* Right Image */}
          <div className="global-footprint-image flex justify-center md:justify-end">
            <img
              src="/assets/images/region-we-serve-image.png"
              alt="Regions We Serve Map"
              className=" rounded-2xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
