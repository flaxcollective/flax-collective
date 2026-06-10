import "@/app/styles/home/home-about.css";

export default function HomeAbout() {
  return (
    <section className="about-section py-12 md:py-16">
      <div className="about-container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ABOUT US */}
        <div className="about-top">
          <h2>About Us</h2>

          <p className="about-intro text-left">
           FLAX Collective is a modern talent development firm dedicated to elevating individuals across industries through structured learning, real-world insight, and meaningful opportunities.
          </p>


          <div className="about-grid">
            <div className="about-text">
              <p>
              We specialize in in-person seminars and interactive training sessions that focus on <strong> upskilling, professional growth, and confidence-building.</strong>  Complementing this, our virtual courses offer accessible, high-quality learning designed for today’s dynamic workforce.
              </p>
              <p>
                At our core, FLAX Collective aims to bridge the gap between potential and opportunity—guiding individuals not only in developing their capabilities, but also in securing the right career placements to match their growth.
              </p>
              <p>With a strong emphasis on practical knowledge, industry relevance, and personal development, we are building a community where ambition is refined into achievement.</p>
            
            </div>
          </div>
        </div>
        <div className="global-page-divider mt-14"></div>
      </div>
    </section>
  );
}