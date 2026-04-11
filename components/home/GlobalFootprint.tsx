export default function GlobalFootprint() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
          Global Reach, Local Impact
        </h2>
        <p className="text-gray-600 font-medium text-lg mb-16 max-w-3xl mx-auto">
          Our network spans the globe, providing you with targeted solutions that resonate on both an international and local level.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-[#eef1ed] flex justify-center p-8">
          {/* Use a map image from public/assets */}
          <img
            src="/assets/region-we-serve-image.png"
            alt="Regions We Serve Map"
            className="w-full max-w-5xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
