export default function ServicesHero() {
  return (
    <section
      className="mt-[70px] overflow-hidden"
      style={{ background: '#F4F1EA', minHeight: '75vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 min-h-[75vh]">
        {/* Left: Text */}
        <div>
          <h1
            className="font-bold leading-tight mb-5"
            style={{ color: '#2F3E56', fontFamily: 'Georgia, serif', fontSize: '42px' }}
          >
            Shaping The Future<br />Of Professionals
          </h1>
          <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#666666' }}>
            Flax Collective empowers professionals, educational institutions, and hospitality brands through strategic consulting, global staffing, and transformative programs designed for the modern world.
          </p>
          <p className="text-[14px] leading-relaxed mb-8" style={{ color: '#666666' }}>
            Our end-to-end solutions cover recruitment, career services, training, and institutional partnerships — built for the global hospitality ecosystem.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/contact-us"
              className="px-8 py-3 text-white text-[13px] font-bold tracking-wide transition-all duration-200"
              style={{ background: '#6E7C3A', borderRadius: '4px' }}
            >
              Get Started
            </a>
            <a
              href="#services"
              className="px-8 py-3 text-[13px] font-bold tracking-wide border-2 transition-all duration-200"
              style={{ borderColor: '#6E7C3A', color: '#6E7C3A', borderRadius: '4px' }}
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div
            className="rounded-lg overflow-hidden"
            style={{ boxShadow: '0 12px 40px rgba(47,62,86,0.18)' }}
          >
            <img
              src="/assets/images/about-us-image.png"
              alt="Shaping The Future Of Professionals"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '480px', objectFit: 'cover' }}
            />
          </div>
          {/* Accent block */}
          <div
            className="absolute -bottom-3 -right-3 w-24 h-24 rounded-lg -z-10"
            style={{ background: '#6E7C3A', opacity: 0.15 }}
          />
        </div>
      </div>
    </section>
  );
}
