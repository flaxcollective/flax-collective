export default function HomeGallery() {
  const images = [
    "/assets/for-employers-img-1.png",
    "/assets/for-employers-img-2.png",
    "/assets/for-employers-img-3.png",
    "/assets/for-employers-img-4.png",
    "/assets/for-employers-img-5.png",
    "/assets/for-employers-img-6.png",
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16">
          Our Engagement
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-sm aspect-[4/3] group cursor-pointer relative">
               <img 
                 src={img} 
                 alt={`Gallery image ${idx + 1}`} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
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
