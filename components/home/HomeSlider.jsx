// HomeSlider.jsx

'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const baseImages = [
  '/assets/images/home-slider/ihg.png',
  '/assets/images/home-slider/log.png',
  '/assets/images/home-slider/logispum.png',
  '/assets/images/home-slider/logoip.png',
  '/assets/images/home-slider/restaurant-cafe.png',
  '/assets/images/home-slider/rimberio.png',
]

// Loop mode needs at least slidesPerView * 2 slides (8 * 2 = 16), so triplicate
const images = [...baseImages, ...baseImages, ...baseImages]

export default function HomeSlider() {
  return (
    <section className='Home-slider max-w-7xl mx-auto px-4 md:px-6'>
      <div className="slider-carosel mb-0 mt-8 w-full">
        <Swiper
          modules={[Autoplay, Navigation]}
          className="w-full"
          spaceBetween={10}
          loop={true}
          navigation={false}
          slidesPerView={6}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 6 },
            640: { slidesPerView: 6 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="group border border-gray-100 w-full
                rounded-2xl p-0 lg:p-4 md:p-2 h-12 md:h-28 relative overflow-hidden
                transition-all duration-300">
                <Image
                  src={src}
                  alt={`Partner ${index % baseImages.length}`}
                  fill
                  sizes="(max-width: 1280px) 150px, 120px"
                  className="object-contain p-1 md:p-2 group-hover:scale-105 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
