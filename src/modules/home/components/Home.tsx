"use client";
import { useState } from "react";
import HomeHero from "@/modules/home/components/HomeHero";
import HomeWhyFlex from "@/modules/home/components/HomeWhyFlex";
import HomeAbout from "@/modules/home/components/HomeAbout";
import HomeFounder from "@/modules/home/components/HomeFounder";
import HomeGlobalFootprint from "@/modules/home/components/HomeGlobalFootprint";
import HomeProcess from "@/modules/home/components/HomeProcess";
import HomeContectUs from "@/modules/home/components/HomeContectUs";
import HomeMissionVission from "@/modules/home/components/HomeMissionVission";
import HomePrograms from "@/modules/home/components/HomePrograms";
import HomeServices from "@/modules/home/components/HomeServices";
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