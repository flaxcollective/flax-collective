"use client";

import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "@/app/styles/events.css";

type EventType = {
  slug: string;
  date: string;
  title: string;
  location: string;
  images: string[];
};

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
  const [selectedEvent, setSelectedEvent] =
    useState<(typeof events)[number] | null>(null);

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="border border-[#d9d9d9] rounded-[28px] p-4 md:p-8"
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
                <h2 className="text-xl md:text-[22px] font-semibold text-text-dark mb-7.5">
                  {event.title}
                </h2>

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
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-navy rounded-[30px] p-5 md:p-8">

            {/* Close */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="sticky top-0 ml-auto z-20 bg-white rounded-lg w-10 h-10 flex items-center justify-center text-navy"
            >
              <IoClose size={24} />
            </button>

            {/* Images */}
            <div className="grid grid-cols-1 md:flex md:flex-wrap justify-center gap-4 md:gap-5 mt-4">
              {selectedEvent.images.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl"
                >
                  <img
                    src={img}
                    alt={`Workshop ${index + 1}`}
                    className="w-full md:w-[240px] h-[140px] md:h-[170px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="text-center mt-6">
              <h2 className="text-white text-xl md:text-[22px] font-semibold pb-3.5">
                {selectedEvent.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}