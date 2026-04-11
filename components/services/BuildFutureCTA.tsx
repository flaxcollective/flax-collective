export default function BuildFutureCTA() {
  return (
    <section className="py-20" style={{ background: '#6E7C3A' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="lg:w-1/2">
            <p
              className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'rgba(244,241,234,0.8)' }}
            >
              Take Action
            </p>
            <h2
              className="text-[36px] font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Build Your Future With Global<br />Opportunities
            </h2>
            <p
              className="text-[14px] leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(244,241,234,0.8)' }}
            >
              Whether you are a student seeking your first role or a brand ready to scale internationally — we have the tools, network, and expertise to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/program"
                className="px-8 py-3 text-[13px] font-bold tracking-wide text-white transition-all duration-200 text-center"
                style={{
                  background: '#2F3E56',
                  borderRadius: '4px',
                }}
              >
                For Students
              </a>
              <a
                href="/contact-us"
                className="px-8 py-3 text-[13px] font-bold tracking-wide transition-all duration-200 text-center"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255,255,255,0.6)',
                  borderRadius: '4px',
                }}
              >
                For Partners
              </a>
            </div>
          </div>

          {/* Right: Two image cards */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-5">
            <div
              className="rounded-lg overflow-hidden"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
            >
              <img
                src="/assets/for-employers-img-4.png"
                alt="For Students"
                className="w-full h-full object-cover"
                style={{ height: '240px' }}
              />
            </div>
            <div
              className="rounded-lg overflow-hidden"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
            >
              <img
                src="/assets/for-employers-img-5.png"
                alt="For Partners"
                className="w-full h-full object-cover"
                style={{ height: '240px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
