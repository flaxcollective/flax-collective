const objectives = [
  {
    num: '01',
    icon: '/assets/icons/key-areas-icon-globe.png',
    title: 'Global Staffing',
    desc: 'Connecting top-tier international talent with premier hospitality establishments worldwide.',
    link: '/services',
  },
  {
    num: '02',
    icon: '/assets/icons/key-areas-icon-breifcase.png',
    title: 'HR Consulting',
    desc: 'Comprehensive human resources strategies for retention and organizational development.',
    link: '/services',
  },
  {
    num: '03',
    icon: '/assets/icons/key-areas-building-icon.png',
    title: 'Education Management & Student Recruitment',
    desc: 'Bridging the gap between educational institutions and hospitality students worldwide.',
    link: '/services',
  },
  {
    num: '04',
    icon: '/assets/icons/key-areas-icon-star.png',
    title: 'Institutional Alliance',
    desc: 'Fostering partnerships between universities and global corporate entities.',
    link: '/services',
  },
  {
    num: '05',
    icon: '/assets/icons/key-areas-icon-chat.png',
    title: 'Software Solutions',
    desc: 'Implementing cutting-edge digital management tools for modern hospitality operations.',
    link: '/services',
  },
  {
    num: '06',
    icon: '/assets/icons/key-areas-icon-globe.png',
    title: 'Marketing & Sales Strategy',
    desc: 'Data-driven approaches to elevate your brand presence and maximize revenue.',
    link: '/services',
  },
];

export default function HomeObjectives() {
  return (
    <section className="objectives-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="objectives-heading">Our Objectives</h2>
          <div className="objectives-divider" />
          <p className="objectives-desc">
            We are committed to delivering excellence across multiple verticals in the hospitality and education sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {objectives.map((obj, i) => (
            <div key={i} className="objectives-card">
              <div className="flex items-center gap-3 mb-1">
                <div className="objectives-icon-box">
                  <img src={obj.icon} alt={obj.title} className="w-6 h-6 object-contain" />
                </div>
                <span className="objectives-num">{obj.num}</span>
              </div>
              <h3 className="objectives-card-title">{obj.title}</h3>
              <p className="objectives-card-desc">{obj.desc}</p>
              <a href={obj.link} className="objectives-card-link">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
