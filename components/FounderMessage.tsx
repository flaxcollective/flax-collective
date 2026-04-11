export default function FounderMessage() {
  return (
    <section className="py-24 bg-[var(--color-background-beige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="md:w-3/5">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Founder&apos;s Message</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                &quot;Welcome to Flex Collective. Our journey began with a simple but powerful observation: the hospitality industry thrives on connection, but the systems that support it are often fragmented. We set out to build an ecosystem that unites talent, education, and business operations under one roof.
              </p>
              <p>
                In today&apos;s globalized world, traditional boundaries are blurring. Our commitment is to provide flexible, forward-thinking solutions that empower institutions to teach better, professionals to work smarter, and brands to expand seamlessly. 
              </p>
              <p>
                We believe in partnerships that go beyond contracts—partnerships built on trust, innovation, and shared growth. Join us in shaping the future of global hospitality.&quot;
              </p>
            </div>
            <div className="mt-8">
              <h4 className="font-serif font-bold text-xl text-gray-900">John Doe</h4>
              <p className="text-[var(--color-primary)] font-medium text-sm tracking-wide uppercase mt-1">Founder & CEO</p>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <div className="relative">
              <div className="w-64 h-80 md:w-80 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-xl relative z-10">
                <img 
                  src="/assets/founder.png" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--color-primary)] rounded-full -z-0 opacity-20 blur-2xl"></div>
              <div className="absolute top-10 -right-8 w-24 h-24 bg-white rounded-full -z-0 shadow-lg border border-gray-100 flex items-center justify-center">
                <span className="text-[var(--color-primary)] font-serif text-4xl">&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
