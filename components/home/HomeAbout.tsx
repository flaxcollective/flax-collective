import "@/app/styles/home/home-about.css";

export default function HomeAbout() {
  return (
    <section className="about-section py-12 md:py-16">
      <div className="about-container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ABOUT US */}
        <div className="about-top">
          <h2>About Us</h2>

          <p className="about-intro text-left">
           Flax Collective is an educational and industry engagement platform redefining how learning is experienced.
          </p>


          <div className="about-grid">
            <div className="about-text">
              <p>
             By bridging the gap between academia and industry, we create immersive opportunities that enable learners to gain insight, build capability, and explore future possibilities beyond traditional education.
              </p>
              <p>
               Through thoughtfully designed programmes, strategic partnerships, and experiential learning initiatives, we empower individuals to develop the skills, awareness, and confidence required to thrive in a rapidly changing world.
              </p>
              <p>At the heart of Flax is a commitment to meaningful learning—where knowledge meets experience, and potential becomes opportunity.</p>
            
            </div>
          </div>
        </div>
        <div className="global-page-divider mt-14"></div>
      </div>
    </section>
  );
}