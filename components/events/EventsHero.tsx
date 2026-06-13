'use client'

import Image from 'next/image'
import '@/app/styles/events.css'


export default function EventsHero() {
  return (
    <section className="flax-events">

    
      <div className="events-deskbg pt-32 pb-4 md:pb-16 md:mt-25 w-full ">
         <div className="relative z-10 flex items-center justify-center px-4">
          <div className="events-desktop text-center max-w-7xl">

            <h3 className="pb-3.5 text-xl md:text-5xl lg:text-7xl font-normal leading-24">
            Workshops & Learning Sessions
            </h3>

            <p className="text-dark text-base md:text-md max-w-4xl mx-auto leading-8">
             Enhance your skills through expert-led workshops, interactive training sessions, and industry-focused learning experiences designed to support your professional growth.
            </p>

           </div>
        </div>
      </div>

   

    </section>
  )
}