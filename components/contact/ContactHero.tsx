export default function ContactHero() {
  return (
    <section className="mt-[72px] relative w-full min-h-[55vh] bg-[#1e2d3d] overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/assets/hero-contact.png" alt="Contact Us" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#1e2d3d]/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-20">
        <p className="text-[#a8b87a] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-snug">
          Connect With Experts.<br />Create Better Outcomes.
        </h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto">
          Have Questions, Need Expert Advice, Or Ready To Take The Next Step? We&apos;re Here To Help. Connect With Our Team And Let&apos;s Turn Your Ideas Into Impactful Solutions.
        </p>
        <a href="#contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#6b7847] text-white text-[13px] font-bold rounded-full hover:bg-[#6b7847] transition-colors">
          Get In Touch <span>→</span>
        </a>
      </div>
    </section>
  );
}
