"use client";
import { useState } from "react";
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
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  // Activate scroll observer once for the whole page

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  const handleApplyNow = (course: string) => {
    setSelectedCourse(course);
    setIsStudentModalOpen(true);
  };

  return (
    <>
      {/* ── HERO: load animations (instant, no scroll needed) ── */}
      <HomeHero />

        <HomeWhyFlex />

      {/* ── PROCESS ── */}
        <HomeProcess />

        {/* ── ABOUT ── */}
        <HomeAbout />

        {/* ── FOUNDER ── */}
        <HomeFounder />

        {/* ── PROGRAMS ── */}
        <HomePrograms onApplyNow={handleApplyNow} />

        <HomeMissionVission />

        <HomeServices onHireTalent={() => setIsEmployerModalOpen(true)} />

        <HomeGlobalFootprint />

        <HomeContectUs />

      <StudentModal 
        isOpen={isStudentModalOpen} 
        onClose={() => {
          setIsStudentModalOpen(false);
          setSelectedCourse("");
        }}
        initialCourse={selectedCourse}
      />
      <EmployerModal 
        isOpen={isEmployerModalOpen} 
        onClose={() => setIsEmployerModalOpen(false)} 
      />
    </>
  );
}