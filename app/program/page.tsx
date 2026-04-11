import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ProgramHero from "@/components/program/ProgramHero";
import WhatSetsApart from "@/components/program/WhatSetsApart";
import ProgramList from "@/components/program/ProgramList";
import HowItWorksStudents from "@/components/program/HowItWorksStudents";
import ProgramFAQ from "@/components/program/ProgramFAQ";
import CareerCTA from "@/components/program/CareerCTA";
import ContactSection from "@/components/shared/ContactSection";

export default function ProgramPage() {
  return (
    <>
      <Header />
      <ProgramHero />
      <WhatSetsApart />
      <ProgramList />
      <HowItWorksStudents />
      <ProgramFAQ />
      <CareerCTA />
      <ContactSection />
      <Footer />
    </>
  );
}
