import "@/app/styles/services.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import WhyFlexServices from "@/components/services/WhyFlexServices";
import StudentCareer from "@/components/services/StudentCareer";
import EmployerServices from "@/components/services/EmployerServices";
import HowItWorksEmployers from "@/components/services/HowItWorksEmployers";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import BuildFutureCTA from "@/components/services/BuildFutureCTA";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ServicesHero />
      <WhyFlexServices />
      <StudentCareer />
      <EmployerServices />
      <HowItWorksEmployers />
      <WhyChooseUs />
      <BuildFutureCTA />
      <Footer />
    </>
  );
}
