export default function GlobalPresence() {
  return (
    <section className="py-24 bg-[var(--color-primary-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold mb-6">Our Global Footprint</h2>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              Operating across key international hubs, Flex Collective brings a world of expertise right to your doorstep. Our localized teams understand regional subtleties while leveraging a vast global network.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                <h4 className="text-xl font-bold mb-2">Headquarters</h4>
                <p className="text-gray-300">123 Hospitality Ave, Suite 400<br/>Business District, NY 10001<br/>United States</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                <h4 className="text-xl font-bold mb-2">European Office</h4>
                <p className="text-gray-300">45 Luxe Boulevard<br/>75008 Paris<br/>France</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-2 rounded-2xl shadow-2xl">
              <img 
                src="/assets/global-map.png" 
                alt="Global Presence Map" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
