export default function HomeFounder() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Meet Our Managing Director
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Founder Text */}
          <div className="lg:w-7/12 w-full">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 tracking-wide">
              Why We Are "Flex Collective"
            </h3>
            
            <div className="space-y-10">
              <div>
                <h4 className="text-2xl font-serif font-bold text-[var(--color-primary)] mb-3">Flex</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A collection of global consultants who are flexible in their approach, adapting swiftly to the varied challenges and nuances of the hospitality and education sectors worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="text-2xl font-serif font-bold text-[var(--color-primary)] mb-3">Collective</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Harnessing the collective expertise of industry leaders to provide comprehensive, unified strategies that span multiple disciplines.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Founder Image */}
          <div className="lg:w-5/12 w-full flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-primary)] transform translate-x-4 translate-y-4 rounded-xl -z-10"></div>
              <img 
                src="/assets/founder-image.png" 
                alt="Managing Director" 
                className="w-full max-w-sm rounded-xl object-cover shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-white py-4 px-6 rounded-lg shadow-xl border border-gray-100">
                <p className="font-bold text-gray-900 text-lg">John Doe</p>
                <p className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider">Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
