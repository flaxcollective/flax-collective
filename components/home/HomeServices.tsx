export default function HomeServices({ includeTitle = true, isSubList = false }: { includeTitle?: boolean; isSubList?: boolean }) {
  const services = [
    { title: "Pre-Opening", desc: "Navigating the critical phases from conceptualization to global launch with precision." },
    { title: "Operations", desc: "Streamlining daily maneuvers and optimizing standard operating frameworks." },
    { title: "Sales & Marketing", desc: "Driving revenue and building robust brand presence in competitive markets." },
    { title: "Talent Solutions", desc: "Connecting you with the best industry professionals to elevate service standards." },
    { title: "F&B Solutions", desc: "Elevating your dining concepts through innovative culinary strategies." },
    { title: "Feasibility Studies", desc: "Comprehensive market analysis and financial projections for solid investments." },
  ];

  return (
    <section className={`py-24 ${isSubList ? 'bg-[var(--color-background-beige)]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {includeTitle && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">
              Our Services
            </h2>
          </div>
        )}
        {!includeTitle && isSubList && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 uppercase tracking-widest">
              OUR SERVICES INCLUDE
            </h2>
            <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto mt-6"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-[var(--color-primary)] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full min-h-[280px]">
              
              {/* Top right icon placeholder */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white/50 group-hover:bg-white/20 transition-colors">
                <span className="font-serif italic text-2xl font-black">{`0${idx + 1}`}</span>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-2xl font-bold font-serif mb-4 leading-snug">{srv.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  {srv.desc}
                </p>
                <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-wider text-white hover:text-white/80 cursor-pointer">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
