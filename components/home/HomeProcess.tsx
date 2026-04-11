export default function HomeProcess() {
  const processData = [
    {
      step: "01",
      title: "Candidate Identification",
      desc: "We identify promising hospitality graduates and professionals through institutional partnerships and global career networks."
    },
    {
      step: "02",
      title: "Career Counselling",
      desc: "Each candidate undergoes professional counselling to assess career goals, readiness for international employment, and industry fit."
    },
    {
      step: "03",
      title: "Certification & Skill Development",
      desc: "Candidates participate in certification programs and workshops focused on hospitality standards and workplace professionalism."
    },
    {
      step: "04",
      title: "Screening & Evaluation",
      desc: "Applicants are assessed through interviews, skill evaluation, and structured professional profiling."
    },
    {
      step: "05",
      title: "Employer Matching",
      desc: "Qualified candidates are introduced to hospitality employers based on their skills and role requirements."
    },
    {
      step: "06",
      title: "Placement & Onboarding",
      desc: "Once selected and onboarded, the recruitment process is completed through our transparent placement structure."
    }
  ];

  return (
    <section className="process-section">
      <div className="process-container">
        <h2>Our Process</h2>
        <p className="process-subtext">
          Flax Collective follows a structured pathway that prepares candidates and supports employers through a reliable recruitment process.
        </p>
        <div className="process-grid">
          {processData.map((item, idx) => (
            <div key={idx} className="process-card">
              <div className="process-step">
                <span>STEP</span>
                <strong>{item.step}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="process-quote-section">
          <h2>Opportunities for Students & Employers</h2>
          <div className="process-quote-section-content">
            <div className="process-quote-section-content-1">
              <h2>Opportunities for Students</h2>
              <p>Flax Collective provides aspiring hospitality professionals with a structured pathway to build international careers.</p>
            </div>
            <div className="process-quote-section-content-2">
              <h2>Talent Solutions for Employers</h2>
              <p>Hospitality organizations partner with Flax Collective to access a reliable pipeline of trained and pre-screened hospitality professionals who are prepared to contribute from day one. Our recruitment model emphasizes preparation, quality, and transparency.</p>
            </div>
          </div>
        </div>       
      </div>
    </section>
  );
}