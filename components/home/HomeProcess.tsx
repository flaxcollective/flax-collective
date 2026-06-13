import "@/app/styles/home/home-process.css";
export default function HomeProcess() {
  const processData = [
    {
      step: "01",
      title: "Candidate Identification",
      desc: "We identify promising graduates and professionals through institutional partnerships and career networks worldwide."
    },
    {
      step: "02",
      title: "Career Counselling",
      desc: "Each candidate undergoes professional counselling to assess career goals, readiness for international employment, and industry suitability"
    },
    {
      step: "03",
      title: "Certification & Skill Development",
      desc: "Candidates participate in online certification programs and workshops focused on communication, and workplace professionalism."
    },
    {
      step: "04",
      title: "Screening & Evaluation",
      desc: "Applicants are assessed through interviews, skill evaluation, and professional profiling."
    },
    {
      step: "05",
      title: "Global Employer Connections",
      desc: "Qualified candidates are introduced to employers internationally based on their skills and role requirements."
    },
    {
      step: "06",
      title: "Placement & Onboarding",
      desc: "Once selected by an employer and successfully onboarded, the recruitment process is completed through our transparent placement structure."
    }
  ];

  return (
    <section className="process-section mb-10 md:mb-20">
      <div className="process-container max-w-7xl mx-auto px-4">
        <h2>Our Process</h2>
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