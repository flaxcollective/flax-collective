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
            item.title
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
                            src={event.descimage}
                            alt={event.title}
                            className=""
                        />
                    </div>

                    {/* Right Content */}
                    <div>
                        {/* <p className="flex items-center gap-2 text-text-dark text-sm md:text-lg mb-5">
                            <IoTimeOutline className="text-lg" />
                            {event.date}
                        </p> */}

                        <div className="space-y-4">
                            {event.description?.map((item, index) => (
                                <p
                                    key={index}
                                    className="text-xs md:text-base leading-4 md:leading-6 text-text-dark text-justify"
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className=" max-w-7xl mx-auto  px-4 image-grid py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <img
                        src="/assets/images/events/1.png"
                        alt="Image 1"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/assets/images/events/2.png"
                        alt="Image 2"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/assets/images/events/3.png"
                        alt="Image 3"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/assets/images/events/4.png"
                        alt="Image 4"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/assets/images/events/5.png"
                        alt="Image 5"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/assets/images/events/6.png"
                        alt="Image 6"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            </section>
            <Footer />
        </>


    );
}