import { CheckCircle2 } from 'lucide-react';

export default function WhyWorkWithUs() {
  const points = [
    { title: "Client & Candidate Alignment", desc: "We ensure perfect synergy between organizational goals and professional aspirations." },
    { title: "Long-term Talent Development", desc: "Focusing on sustainable growth and continuous education for hospitality leaders." },
    { title: "Global Vision, Local execution", desc: "International strategies adapted seamlessly for your specific regional market." },
    { title: "Data-Driven Approach", desc: "Leveraging analytics and insights to drive operational efficiency and revenue." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Why Work With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our approach is centered on delivering measurable results through tailored consultancy and dedicated partnership.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Box left */}
          <div className="lg:w-1/2">
            <div className="bg-[#f0f4e6] p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <svg className="w-32 h-32 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 relative z-10">Unlocking the exceptional</h3>
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-lg">
                We go beyond standard consultancy. We embed ourselves in your culture to understand the subtle nuances that make your brand unique, ensuring that every candidate, strategy, and system we provide feels like a natural extension of your team.
              </p>
              <button className="px-6 py-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                Discover More
              </button>
            </div>
          </div>

          {/* Checklist right */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {points.map((point, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-white group">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{point.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
