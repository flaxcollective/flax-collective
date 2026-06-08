const cards = [
  {
    icon: '/assets/icons/key-areas-icon-star.png',
    title: '360 Focus Plan',
    desc: 'A holistic approach covering recruitment, training, retention and performance measurement.',
  },
  {
    icon: '/assets/icons/key-areas-icon-chat.png',
    title: 'Client Testimonies',
    desc: 'Proven track record of success backed by real testimonials from satisfied global clients.',
  },
  {
    icon: '/assets/icons/transparent-recruitment.png',
    title: 'Transparent Services',
    desc: 'Complete clarity in pricing, processes and expectations with no hidden costs.',
  },
  {
    icon: '/assets/icons/key-areas-icon-breifcase.png',
    title: 'Customer Management',
    desc: 'Dedicated account management ensuring personalized attention throughout your partnership.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6E7C3A' }}
          >
            Our Advantage
          </p>
          <h2
            className="text-[30px] font-bold mb-3"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif' }}
          >
            Why Choose Us
          </h2>
          <p className="text-[14px] max-w-xl mx-auto" style={{ color: '#666666' }}>
            We stand apart through our commitment to excellence, transparency, and long-term impact.
          </p>
        </div>

        {/* 4-column layout: 3 beige cards + 1 image card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-7 rounded-lg transition-all duration-300 hover:shadow-md group"
              style={{ background: '#F4F1EA', border: '1px solid #e0d9ce' }}
            >
              {/* Icon circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: '#FFFFFF', border: '1px solid #e0d9ce' }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-[15px] mb-3" style={{ color: '#2F3E56' }}>
                {card.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: '#666666' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
