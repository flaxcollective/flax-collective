const cards = [
  {
    icon: '/assets/transparent-recruitment.png',
    img: '/assets/for-employers-img-1.png',
    title: 'Training & Development',
    desc: 'Comprehensive training programs designed to upskill hospitality professionals across all levels of the industry.',
  },
  {
    icon: '/assets/prepared-talent.png',
    img: '/assets/for-employers-img-2.png',
    title: 'Flexible Recruitment',
    desc: 'Adaptive hiring strategies that connect the right talent with the right opportunity, locally and globally.',
  },
  {
    icon: '/assets/training-program (2).png',
    img: '/assets/for-employers-img-3.png',
    title: 'Curriculum & Programs',
    desc: 'Industry-aligned academic programs built with top institutions to prepare students for global careers.',
  },
];

export default function WhyFlexServices() {
  return (
    <section className="py-16" id="services" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6E7C3A' }}
          >
            Our Value
          </p>
          <h2
            className="text-[32px] font-bold mb-3"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif' }}
          >
            Why Flex Collective
          </h2>
          <p className="text-[14px] max-w-xl mx-auto" style={{ color: '#666666' }}>
            We deliver end-to-end support for students, professionals, and organizations navigating the global hospitality industry.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg group"
              style={{ background: '#F4F1EA', borderColor: '#e0d9ce' }}
            >
              {/* Image */}
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#6E7C3A' }}
                  >
                    <img
                      src={card.icon}
                      alt=""
                      className="w-5 h-5 object-contain"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <h3 className="font-bold text-[16px]" style={{ color: '#2F3E56' }}>
                    {card.title}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#666666' }}>
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: '#6E7C3A' }}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
