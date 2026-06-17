import React from "react";
import "@/app/styles/home/home-responsive.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import HomeAbout from "@/components/home/HomeAbout";
import HomeMissionVission from "@/components/home/HomeMissionVission";
import HomeFounder from "@/components/home/HomeFounder";

export const metadata = {
  title: "About Us | Flax Collective",
  description: "Learn more about Flax Collective, our mission, vision, and the team empowering learners and bridging the gap between academia and industry.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Spacer to push content below sticky header */}
      <div className="pt-24 md:pt-30">
        <div className="bg-[#2F3E56] text-white py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold font-montserrat tracking-wide">
            About Flax Collective
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl mx-auto px-4 font-medium">
            Redefining how learning is experienced and bridging the gap between academia and industry.
          </p>
        </div>

        <HomeAbout />
        <HomeMissionVission />
        <HomeFounder />
      </div>

      <Footer />
    </main>
  );
}
