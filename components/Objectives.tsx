import { Briefcase, Building, GraduationCap, Link2, MonitorPlay, LineChart } from 'lucide-react';

export default function Objectives() {
  const cards = [
    {
      id: "01",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      title: "Global Staffing",
      desc: "Connecting top-tier international talent with premier hospitality establishments."
    },
    {
      id: "02",
      icon: <Building className="w-6 h-6 text-white" />,
      title: "HR Consulting",
      desc: "Comprehensive human resources strategies for retention and organizational development."
    },
    {
      id: "03",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "Education Management & Student Recruitment",
      desc: "Bridging the gap between educational institutions and eager hospitality students worldwide."
    },
    {
      id: "04",
      icon: <Link2 className="w-6 h-6 text-white" />,
      title: "Institutional Alliance",
      desc: "Fostering partnerships between universities and global corporate entities."
    },
    {
      id: "05",
      icon: <MonitorPlay className="w-6 h-6 text-white" />,
      title: "Software Solutions",
      desc: "Implementing cutting-edge digital management tools for modern hospitality operations."
    },
    {
      id: "06",
      icon: <LineChart className="w-6 h-6 text-white" />,
      title: "Marketing and Sales Strategy",
      desc: "Data-driven approaches to elevate your brand presence and maximize revenue."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Objectives</h2>
          <div className="w-20 h-1 bg-[var(--color-primary)] mb-6 rounded-full"></div>
          <p className="text-gray-700 max-w-3xl text-lg">
            We are committed to delivering excellence across multiple verticals in the hospitality and education sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Top Accent Bar */}
              <div className="h-2 w-full bg-[var(--color-primary)] group-hover:bg-[var(--color-primary-dark)] transition-colors"></div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/40 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-3xl font-black text-gray-100 group-hover:text-[var(--color-primary)]/10 transition-colors font-serif italic">{card.id}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 min-h-[3.5rem]">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>
              </div>
              
              {/* Border detail on bottom similar to design */}
              <div className="absolute inset-x-4 bottom-4 h-1 border-b border-dashed border-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
