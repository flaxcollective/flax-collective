import Image from "next/image";
import "@/app/styles/home/what-we-do.css";

const features = [
    {
        icon: "/assets/icons/leaf.png",
        title: "LEARN",
        desc: "Knowledge that inspires action.",
    },
    {
        icon: "/assets/icons/service-icon/big-sprout.svg",
        title: "GROW",
        desc: "Skills that build Confidence.",
    },
    {
        icon: "/assets/icons/service-icon/related.svg",
        title: "BELONG",
        desc: "Communities that create lasting impact.",
    },
];

export default function WhyFlax() {
    return (
        <section className="bg-[#e5e4d8] mb-10 md:mb-20 py-5 md:py-10">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                {/* <div className="text-left md:text-center mb-5 md:mb-10">
                    <h2 className="whatweheading  font-serif text-navy">
                        Why FLAX
                    </h2>

                </div> */}

                {/* Features */}
                <div className="grid md:grid-cols-3 space-y-5 md:space-y-0">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className={`flex why-flaxborder items-center gap-4 w-full
                                     ${index < 2 ? "border-b border-text-body pb-5 md:border-b-0 md:pb-0" : ""}
                                     ${index === 0
                                    ? "justify-start"
                                    : index === 1
                                        ? "justify-start md:justify-center"
                                        : "justify-start md:justify-end"
                                }
                                 `}
                        >
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={91}
                                height={91}
                                className="object-contain w-12.5 h-12.5 md:w-22.75 md:h-22.75 shrink-0"
                            />

                            <div>
                                <h3 className="text-navy mb-1.5 md:mb-2.5 font-semibold  text-base md:text-2xl">
                                    {item.title}
                                </h3>

                                <p className="text-text-body text-[10px] md:text-sm font-medium leading-4 md:leading-6 w-full md:max-w-[160px]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}