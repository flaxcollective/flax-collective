const steps = [
  { num: 1, title: 'Choose Your Program', desc: 'Browse our catalog and select the program that best aligns with your career goals and interests in hospitality.' },
  { num: 2, title: 'Proof of Eligibility & Experience', desc: 'Submit your application with the required documents confirming your eligibility to enroll in the program.' },
  { num: 3, title: 'Training, Up & Self-assessment', desc: 'Engage in intensive training sessions, self-assessments, and practical workshops to build your core skill set.' },
  { num: 4, title: 'On-the-ground Location & Guidance', desc: 'Participate in real-world placements guided by industry mentors at top hospitality brands and establishments.' },
  { num: 5, title: 'Student Support & Career Launch', desc: 'Receive dedicated career support, CV assistance, and employer introductions to launch your global hospitality career.' },
];

export default function HowItWorksStudents() {
  return (
    <section className="py-24 bg-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#6b7847] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">The Journey</p>
          <h2 className="text-3xl font-bold text-[#1e2d3d] mb-3">How It Works For Students</h2>
          <p className="text-[14px] text-[#666] max-w-xl mx-auto">A clear five-step pathway from enrollment to career launch in the global hospitality industry.</p>
        </div>

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-[#6b7847] flex flex-col items-center justify-center shadow-md">
                <span className="text-[10px] text-[#6b7847] font-bold leading-none">Step</span>
                <span className="text-[18px] font-bold text-[#6b7847] leading-none">{step.num}</span>
              </div>
              <div className="bg-white rounded-2xl p-5 flex-1 shadow-sm border border-[#e8e0d5] hover:shadow-md hover:border-[#6b7847]/30 transition-all">
                <h3 className="font-bold text-[15px] text-[#1e2d3d] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
