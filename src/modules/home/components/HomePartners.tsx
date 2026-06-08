export default function HomePartners() {
  const partners = [
    "Hospitality Brands seeking seamless global expansion.",
    "Educational Institutions requiring industry partnerships.",
    "Independent Hoteliers looking for strategic support."
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 uppercase tracking-widest mb-10">
          WHO WE PARTNER WITH
        </h2>
        
        <p className="text-gray-600 font-medium text-lg mb-10">
          We serve a diverse range of clients in the hospitality and education sectors:
        </p>
        
        <ul className="text-left max-w-2xl mx-auto space-y-4 mb-10">
          {partners.map((p, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
              <span className="text-gray-700 text-lg">{p}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-600 font-medium text-lg leading-relaxed">
          Whether you are looking to expand regionally or globally, or need strategic support to stabilize and grow, Flax Collective is your ideal partner.
        </p>
      </div>
    </section>
  );
}
