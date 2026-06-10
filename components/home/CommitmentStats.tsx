import "@/app/styles/home/commitment-stats.css";
const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '30+', label: 'Global Partnerships' },
  { value: '500+', label: 'Placements Made' },
  { value: '20+', label: 'Countries Served' },
];

export default function CommitmentStats() {
  return (
    <section className="stats-section">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="stats-label">Our Impact</p>
          <h2 className="stats-heading">Commitment Timeline</h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="stats-connector" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 py-4 relative">
                <div className="stats-circle">
                  <h3 className="stats-circle-value">{stat.value}</h3>
                </div>
                <p className="stats-circle-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
