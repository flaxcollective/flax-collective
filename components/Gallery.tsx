export default function Gallery() {
  const images = [
    { src: "/assets/icons/gallery-1.png", alt: "Gallery Case 1", label: "Hospitality Check" },
    { src: "/assets/icons/gallery-2.png", alt: "Gallery Case 2", label: "Client Meeting" },
    { src: "/assets/icons/gallery-3.png", alt: "Gallery Case 3", label: "Service Excellence" },
    { src: "/assets/icons/gallery-4.png", alt: "Gallery Case 4", label: "Culinary Arts" },
    { src: "/assets/icons/gallery-5.png", alt: "Gallery Case 5", label: "Team Collaboration" },
    { src: "/assets/icons/gallery-6.png", alt: "Gallery Case 6", label: "Global Summit" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Gallery Cases</h2>
          <p className="text-gray-600 max-w-2xl">
            A glimpse into the real-world impact of our strategic partnerships and hands-on consulting across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                 <div className="p-6">
                   <h4 className="text-white font-bold text-lg">{img.label}</h4>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
