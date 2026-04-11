import HomeHero from "@/components/home/HomeHero";
import HomeQuote from "@/components/home/HomeQuote";
import HomeWhyFlex from "@/components/home/HomeWhyFlex";
import HomeServices from "@/components/home/HomeServices";
import HomePartners from "@/components/home/HomePartners";
import InquiryForm from "@/components/home/InquiryForm";
import HomeAbout from "@/components/home/HomeAbout";
import HomeFounder from "@/components/home/HomeFounder";
import WhoIsItFor from "@/components/WhoIsItFor";
import GlobalFootprint from "@/components/home/GlobalFootprint";
import HomeProcess from "@/components/home/HomeProcess";
import HomeGallery from "@/components/home/HomeGallery";
import PrePublicSection from "@/components/home/PrePublicSection";
import ContactSection from "@/components/shared/ContactSection";
import HomeJourney from "@/components/home/HomeJourney";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeQuote />
      <HomeWhyFlex />
      <HomeProcess />
      <HomeJourney />
      <HomeAbout />
      <HomeFounder />
      <WhoIsItFor />
      <GlobalFootprint />
      <HomeServices includeTitle={false} isSubList={true} /> 
      <HomeGallery />
      <PrePublicSection />
      <ContactSection />
    </>
  );
}
