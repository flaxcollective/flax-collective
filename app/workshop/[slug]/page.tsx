import { notFound } from "next/navigation";
import { events } from "@/components/events/EventsCard";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { IoTimeOutline } from "react-icons/io5";
type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};


export default async function EventDetails({
    params,
}: PageProps) {
    const { slug } = await params;

    const event = events.find(
        (item) =>
            item.slug
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-") === slug
    );


    if (!event) {
        notFound();
    }

    return (
        <>
            <Header />
            <div className="events-deskbg pt-32 pb-16 md:mt-28 w-full ">
                <div className="relative z-10 flex items-center justify-center   px-4">
                    <div className="events-desktop text-center max-w-7xl">

                        <h3 className="pb-3.5 text-xl md:text-5xl lg:text-6xl font-semibold md:font-light leading-24">
                            {event.title}
                        </h3>
                        <p className="flex items-center justify-center gap-2 text-text-dark text-sm md:text-lg mb-5">
                            <IoTimeOutline className="text-lg" />
                            {event.date}
                        </p>


                    </div>
                </div>
            </div>

            <section className="max-w-7xl mx-auto py-8 md:py-14 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

                    {/* Left Image */}
                    <div className="flaxieventsimg">
                        <img
                            src={event.images?.[0]}
                            alt={event.title}
                            className="w-full rounded-lg"
                        />
                    </div>

                    {/* Right Content */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            {event.title}
                        </h2>

                        <p className="text-base text-gray-600 mb-4">
                            {event.location}
                        </p>

                       
                    </div>

                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images?.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Event ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </>


    );
}