import React from "react";
import '@/app/styles/events.css'
import { IoTimeOutline } from "react-icons/io5";
import Link from "next/link";
export const events = [
    {
        slug: "ai-powered-productivity-masterclass",
        date: "May 06, 2026",
        title: "2-Day Real Estate Capability Enhancement Workshop",
        location: "Sahibzada Ajit Singh Nagar (Mohali)",
        image: "/assets/images/events/2.png",
        descimage: "/assets/images/events/2.png",
        description: [
            "This two-day workshop, conducted in collaboration with STJ Group, is designed to enhance the sales, leadership, and business development capabilities of real estate professionals. Participants will gain practical insights into market trends, customer engagement, negotiation strategies, and revenue growth through expert-led sessions and real-world case studies.",

            "The program focuses on improving client relationships, strengthening sales performance, and adapting to evolving industry demands. Attendees will also have the opportunity to network with peers and industry experts while gaining actionable strategies that can be applied immediately in their roles.",

            "Designed for Sales Executives, Managers, GMs, AGMs, and VP Sales, this workshop equips participants with the skills and knowledge needed to drive business success and achieve long-term growth.",

            "Participants will tackle real-world sales challenges through interactive discussions and practical exercises. The workshop encourages strategic thinking and stronger leadership skills."
        ]
    }
];

export default function EventsCard() {


    return (
        <section className="flax-eventsCard py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="flax-card-border rounded-2xl p-0 md:p-5  flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition-all duration-300"
                        >

                            <div className="w-full h-auto md:w-48 md:min-h-52 shrink-0 order-1 md:order-2">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 news-eventsbtn order-2 md:order-1">
                                <p className="text-xs md:text-base flex items-center gap-1 text-text-body mb-1 md:mb-5">
                                    <span> <IoTimeOutline /></span>
                                    {event.date}
                                </p>

                                <h3 className="text-sm md:text-2xl font-semibold text-text-dark mb-1.5 md:mb-2.5 line-clamp-2">
                                    {event.title}
                                </h3>

                                <p className="text-xs md:text-sm font-medium text-text-dark mb-4 md:mb-14">
                                    {event.location}
                                </p>

                                <Link
                                    href={`/workshop/${event.title
                                        .toLowerCase()
                                        .replace(/[^a-z0-9\s-]/g, "")
                                        .replace(/\s+/g, "-")}`}
                                    className="bg-navy inline-block cursor-pointer hover:bg-slate-900 text-white text-base leading-6 px-6 py-2.5 rounded-lg"
                                >
                                    Read More
                                </Link>
                            </div>


                        </div>
                    ))}
                </div>

            
            </div>
        </section>
    );
}