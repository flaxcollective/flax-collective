import { Search, Cog, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      id: "1",
      icon: <Search className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Discovery Phase",
      desc: "We analyze your core needs, market position, and organizational culture to build a solid foundation."
    },
    {
      id: "2",
      icon: <Cog className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Implement the Strategy & Solutions",
      desc: "Execution of customized protocols, targeted recruitment, and technology integration."
    },
    {
      id: "3",
      icon: <Rocket className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Empower & Support Locally",
      desc: "Continuous training, performance tracking, and local market adaptations to ensure long-term success."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Continuous Progress</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our established process provides a clear roadmap from initial consultation to sustained operational brilliance.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] w-[80%] h-1 bg-gray-300"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-[var(--color-primary)] flex items-center justify-center mb-6 shadow-xl relative group-hover:scale-110 transition-transform duration-300">
                   {step.icon}
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                     {step.id}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
