import HomeHero from "@/components/home/HomeHero";
import HomeWhyFlex from "@/components/home/HomeWhyFlex";
import HomeAbout from "@/components/home/HomeAbout";
import HomeFounder from "@/components/home/HomeFounder";
import HomeGlobalFootprint from "@/components/home/HomeGlobalFootprint";
import HomeProcess from "@/components/home/HomeProcess";
import HomeContectUs from "@/components/home/HomeContectUs";
import HomeMissionVission from "./HomeMissionVission";
import HomePrograms from "@/components/home/HomePrograms";
import HomeServices from "@/components/home/HomeServices";


export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeWhyFlex />
      <HomeProcess />      
      <HomeAbout />
      <HomeFounder />
      <HomePrograms />
      <HomeMissionVission />
      <HomeServices />
      <HomeGlobalFootprint />
      <HomeContectUs />
    </>
  );
}
