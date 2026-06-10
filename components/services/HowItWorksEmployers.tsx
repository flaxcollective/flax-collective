const steps = [
  {
    num: 1,
    title: 'Initial Client Consultation',
    desc: 'We begin with a thorough discovery session to understand your hiring needs, culture, and growth objectives.',
  },
  {
    num: 2,
    title: 'Candidate Sourcing',
    desc: 'Leveraging our global talent network, we identify and shortlist the most qualified candidates for your roles.',
  },
  {
    num: 3,
    title: 'Training & Skill Assessment',
    desc: 'Rigorous evaluation and upskilling ensure every candidate meets your performance and standards requirements.',
  },
  {
    num: 4,
    title: 'On-boarding & Role Assignment',
    desc: 'Seamless onboarding support ensuring candidates integrate perfectly into your team and workflow.',
  },
  {
    num: 5,
    title: 'Performance Monitoring',
    desc: 'Ongoing evaluation and feedback loops to maintain standards and address any performance concerns early.',
  },
  {
    num: 6,
    title: 'Permanent Placement',
    desc: 'After proven success in temporary roles, we facilitate smooth transitions to permanent employment.',
  },
];

export default function HowItWorksEmployers() {
  return (
    <section className="py-20" style={{ background: '#F4F1EA' }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6E7C3A' }}
          >
            Our Process
          </p>
          <h2
            className="text-[30px] font-bold mb-3"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif' }}
          >
            How It Works For Employers
          </h2>
          <p className="text-[14px] max-w-xl mx-auto" style={{ color: '#666666' }}>
            A structured, systematic approach that ensures quality placements and lasting partnerships.
          </p>
        </div>

        {/* Steps list */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[26px] top-6 bottom-6 w-px z-0"
            style={{ background: 'rgba(110,124,58,0.25)' }}
          />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 relative z-10">
                {/* Step circle */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #6E7C3A',
                    boxShadow: '0 3px 12px rgba(110,124,58,0.15)',
                  }}
                >
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: '#6E7C3A' }}
                  >
                    Step
                  </span>
                  <span
                    className="text-[18px] font-bold leading-none"
                    style={{ color: '#6E7C3A', fontFamily: 'Georgia, serif' }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className="rounded-lg p-5 flex-1 transition-all duration-200 hover:shadow-md"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #e0d9ce',
                  }}
                >
                  <h3 className="font-bold text-[15px] mb-1" style={{ color: '#2F3E56' }}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#666666' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
