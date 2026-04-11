const features = [
  {
    icon: '/assets/icons/international- hospitality-recruitment.png',
    title: 'International Hospitality Recruitment',
    desc: 'Connecting top-tier international talent with premier hospitality establishments worldwide.',
    link: '/services',
  },
  {
    icon: '/assets/icons/telent-devlopement.png',
    title: 'Talent Development',
    desc: 'Comprehensive human resources strategies for retention and organizational development.',
    link: '/services',
  },
  {
    icon: '/assets/icons/industry-focused-devlopemnt.png',
    title: 'Industry Focused Development',
    desc: 'Bridging the gap between educational institutions and hospitality students worldwide.',
    link: '/services',
  },
  {
    icon: '/assets/icons/key-areas-icon-globe.png',
    title: 'Work Globally',
    desc: 'Access international talent and digital transformation.',
    link: '/services',
  },
];

export default function HomeFeatures() {
  return (
    <section className="features-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrap">
                <img src={f.icon} alt={f.title} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
              <a href={f.link} className="feature-link">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
