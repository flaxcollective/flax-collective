import "@/app/styles/home/home-about.css";

export default function HomeAbout() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* ABOUT US */}
        <div className="about-top">
          <h2>About Us</h2>

          <p className="about-intro text-left">
            Flax Collective is a <strong>talent development and workforce solutions</strong>  consultancy connecting skilled professionals worldwide with employers through structured training, certification, and responsible recruitment practices.
          </p>

          <div className="about-grid">
            <div className="about-text">
              <p>
                Recognizing the growing demand for skilled service professionals in global markets, Flax Collective was established to bridge the gap between education and industry readiness.
              </p>
              <p>
                Many graduates possess the ambition and foundational knowledge required to succeed internationally, yet often lack structured preparation for global workplace environments. Flax Collective addresses this challenge by combining <strong>career guidance, certification programs, professional workshops, and recruitment support.</strong> 
              </p>
              <p>
                By preparing candidates before introducing them to employers, we help ensure that organizations receive professionals who are confident, capable, and aligned with international standards.
              </p>
              <p>
                Our work is built on the <strong> principles of professional development, ethical recruitment, and long-term partnership,</strong>  enabling both candidates and employers to benefit from a reliable and transparent process
              </p>
            </div>
          </div>
        </div>
        <div className="global-page-divider mt-14"></div>
      </div>
    </section>
  );
}