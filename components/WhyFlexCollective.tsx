import { Handshake, TrendingUp, ShieldCheck } from 'lucide-react';

export default function WhyFlexCollective() {
  const cards = [
    {
      icon: <Handshake className="w-10 h-10 text-[var(--color-primary)]" />,
      title: "Global Expertise",
      desc: "Deep understanding of international markets combined with local nuances, ensuring your brand resonates everywhere."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[var(--color-primary)]" />,
      title: "Tangible Results",
      desc: "Our strategies go beyond theory; they are designed to impact your bottom line, retention rates, and operational flow."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[var(--color-primary)]" />,
      title: "Strategic Partnerships",
      desc: "We connect you to a curated network of educational institutions and corporate leaders."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Why Flax Collective</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are more than consultants; we are your dedicated partners in navigating the complex landscape of global hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl border border-gray-200 text-center hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto bg-[#f0f4e6] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
