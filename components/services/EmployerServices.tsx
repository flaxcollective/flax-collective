const services = [
  {
    src: '/assets/images/for-employers-img-1.png',
    title: 'Hiring Solutions',
    desc: 'End-to-end recruitment for hospitality brands of all sizes.',
  },
  {
    src: '/assets/images/for-employers-img-3.png',
    title: 'Assessment of Employees',
    desc: 'Evaluate and optimize your existing workforce performance.',
  },
  {
    src: '/assets/images/for-employers-img-5.png',
    title: 'Internship Programs',
    desc: 'Structured internships bridging students with leading brands.',
  },
  {
    src: '/assets/images/for-employers-img-6.png',
    title: 'International Staffing',
    desc: 'Global talent sourcing across 20+ countries.',
  },
];

export default function EmployerServices() {
  return (
    <section className="py-16" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: '#6E7C3A' }}
          >
            For Businesses
          </p>
          <h2
            className="text-[30px] font-bold mb-3"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif' }}
          >
            Services For Employers
          </h2>
          <p className="text-[14px] max-w-xl mx-auto" style={{ color: '#666666' }}>
            Tailored solutions that help employers attract, assess, and retain exceptional hospitality talent.
          </p>
        </div>

        {/* 4-column image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ border: '1px solid #e0d9ce' }}
            >
              {/* Image */}
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <img
                  src={svc.src}
                  alt={svc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-5" style={{ background: '#FFFFFF' }}>
                <h3
                  className="font-bold text-[14px] mb-1.5 transition-colors"
                  style={{ color: '#2F3E56' }}
                >
                  {svc.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: '#666666' }}>
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/contact-us"
            className="inline-block px-10 py-3 text-white text-[13px] font-bold tracking-wide transition-colors duration-200"
            style={{ background: '#6E7C3A', borderRadius: '4px' }}
          >
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
