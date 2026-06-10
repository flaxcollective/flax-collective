import "@/app/styles/home/pre-public-section.css";
export default function PrePublicSection() {
  return (
    <section className="py-24 bg-[#f8f9f5]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16">
          Our Guiding Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4 h-12 flex items-center justify-center text-center">Core Values</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Integrity, transparency, and a relentless pursuit of excellence drive everything we do.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4 h-12 flex items-center justify-center text-center">Long-Term Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              We build strategic frameworks designed for sustainable success and future adaptability.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4 h-12 flex items-center justify-center text-center">Innovation & Adaptability</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              In a rapidly evolving industry, we stay ahead by continuously refining our approaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
