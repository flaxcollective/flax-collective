import "@/app/styles/home/home-process.css";
export default function HomeProcess() {
  const processData = [
    {
      step: "01",
      title: "Discover",
      desc: "Explore new industries, opportunities, and career pathways through workshops and experiences."
    },
    {
      step: "02",
      title: "Learn",
      desc: "Gain practical knowledge, industry insights, and real-world perspectives."
    },
    {
      step: "03",
      title: "Connect",
      desc: "Build meaningful relationships with professionals, mentors, and peers."
    },
    {
      step: "04",
      title: "Grow",
      desc: "Develop confidence, awareness, and future-ready skills."
    },
    {
      step: "05",
      title: "Explore",
      desc: "Access opportunities for further learning, industry engagement, and career development."
    },
    {
      step: "06",
      title: "Belong",
      desc: "Become part of a community that supports lifelong growth and learning."
    }
  ];

  return (
    <section className="process-section mb-10 md:mb-20">
      <div className="process-container max-w-7xl mx-auto px-4">
        <h2>The Flax Journey</h2>
        {/* <p className="process-subtext">
          Flax Collective follows a structured pathway that prepares candidates and supports employers through a reliable recruitment process.
        </p> */}
        <div className="process-grid">
          {processData.map((item, idx) => (
            <div key={idx} className="process-card">
              <div className="process-step text-white">
                <span>STEP</span>
                <strong className="text-white">{item.step}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* <div className="global-page-divider mt-8 sm:mt-10 md:mt-16"></div> */}

        {/* <div className="process-quote-section mt-6 sm:mt-8 md:mt-12">
          <h2>Opportunities</h2>
          <div className="opportunities-layout">
            <div className="opportunities-cards">
              <div className="process-quote-section-content-1">
                <h2>Opportunities For Students</h2>
                <p>Flax Collective provides aspiring professionals with a structured pathway to build international careers.</p>
              </div>
              <div className="process-quote-section-content-2">
                <h2>Talent Solutions For Employers</h2>
                <p>
                  Organizations partner with Flax Collective to access a reliable pipeline of{" "}
                  <strong>trained and pre-screened professionals</strong> who are prepared to contribute
                  from day one. Our recruitment model emphasizes preparation, quality, and transparency.
                </p>
              </div>
            </div>
            <div className="opportunities-image">
              <img src="/assets/images/opportunities.png" alt="Opportunities illustration" />
            </div>
          </div>
        </div> */}

       
      </div>
    </section>
  );
}