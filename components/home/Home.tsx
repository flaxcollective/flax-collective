"use client";
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
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Activate scroll observer once for the whole page
  useScrollAnimation();

  return (
    <>
      {/* ── HERO: load animations (instant, no scroll needed) ── */}
      <HomeHero />

      {/* ── WHY FLAX ── */}
      <AnimateOnScroll animation="fade-up">
        <HomeWhyFlex />
      </AnimateOnScroll>

      {/* ── PROCESS ── */}
      <AnimateOnScroll animation="fade-up" delay={100}>
        <HomeProcess />
      </AnimateOnScroll>

      {/* ── ABOUT ── */}
      <AnimateOnScroll animation="fade-left" delay={100}>
        <HomeAbout />
      </AnimateOnScroll>

      {/* ── FOUNDER ── */}
      <AnimateOnScroll animation="fade-right" delay={100}>
        <HomeFounder />
      </AnimateOnScroll>

      {/* ── PROGRAMS ── */}
      <AnimateOnScroll animation="slide-up" delay={100}>
        <HomePrograms />
      </AnimateOnScroll>

      {/* ── MISSION / VISION ── */}
      <AnimateOnScroll animation="scale-in" delay={100}>
        <HomeMissionVission />
      </AnimateOnScroll>

      {/* ── SERVICES ── */}
      <AnimateOnScroll animation="fade-up" delay={100}>
        <HomeServices />
      </AnimateOnScroll>

      {/* ── GLOBAL FOOTPRINT ── */}
      <AnimateOnScroll animation="fade-left" delay={100}>
        <HomeGlobalFootprint />
      </AnimateOnScroll>

      {/* ── CONTACT ── */}
      <AnimateOnScroll animation="fade-up" delay={200}>
        <HomeContectUs />
      </AnimateOnScroll>
    </>
  );
}