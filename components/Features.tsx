import { MapPin, TrendingUp, Users, Globe2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Consult",
      description: "Expert guidance to optimize your hospitality operations and elevate guest experiences."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Develop",
      description: "Tailored strategies for sustainable growth and market expansion."
    },
    {
      icon: <Users className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Partnership",
      description: "Building strong alliances tailored for cross-border success."
    },
    {
      icon: <Globe2 className="w-8 h-8 text-[var(--color-primary)]" />,
      title: "Work Globally",
      description: "Access international talent and seamless digital transformation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-wider text-[var(--color-primary)] uppercase mb-3">Our Expertise</h2>
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 text-[var(--color-primary-dark)]">Comprehensive Hospitality Solutions</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide end-to-end support for businesses looking to scale internationally, improve operations, and connect with top talent.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-2xl hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="w-16 h-16 bg-[var(--color-background-beige)] rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
