"use client";

import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "@/app/styles/events.css";

export const events = [
  {
    slug: "real-estate-capability-enhancement-workshop",
    date: "May 06, 2026",
    title: "2-Day Real Estate Capability Enhancement Workshop",
    location: "Sahibzada Ajit Singh Nagar (Mohali)",
    images: [
      "/assets/images/events/1.png",
      "/assets/images/events/2.png",
      "/assets/images/events/3.png",
      "/assets/images/events/4.png",
      "/assets/images/events/5.png",
      "/assets/images/events/6.png",
      "/assets/images/events/flaxdescimg.png",
    ],
  },
];

export default function EventsCard() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="border border-[#d9d9d9] rounded-[28px] p-6 md:p-8"
            >
              {/* Images Row */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {event.images.slice(0, 7).map((img, i) => (
                  <div
                    key={i}
                    className="w-[110px] h-[80px] md:w-[130px] md:h-[90px] overflow-hidden rounded-xl"
                  >
                    <img
                      src={img}
                      alt={`Workshop ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-xl md:text-[22px] font-semibold text-text-dark mb-3.5">
                  {event.title}
                </h2>

                <div className="flex items-center justify-center gap-2 text-text-body mb-3.5">
                  <IoTimeOutline className="text-lg" />
                  <span>{event.date}</span>
                </div>

                <p className="text-text-dark text-sm font-medium mb-3.5">
                  {event.location}
                </p>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="bg-navy text-white px-6 py-2.5 cursor-pointer rounded-lg"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999]  flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-navy  rounded-[40px] p-5 md:p-8">

            {/* Close */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 bg-white cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center text-[#334766]"
            >
              <IoClose size={24} />
            </button>

            {/* Images */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
              {selectedEvent.images.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl"
                >
                  <img
                    src={img}
                    alt={`Event ${index + 1}`}
                    className="w-[170px] md:w-[240px] h-[120px] md:h-[170px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="text-center mt-6">
              <h2 className="text-white text-[22px] font-semibold pb-3.5">
                {selectedEvent.title}
              </h2>

              <div className="flex items-center justify-center gap-2 text-white">
                <IoTimeOutline />
                <span>{selectedEvent.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}