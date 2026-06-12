"use client";

import { useState } from "react";
import ServicesHero from "./ServicesHero";
import RecruitmentSolutions from "./RecruitmentSolutions";
import HomeProcess from "../home/HomeProcess";
import GlobalService from "./GlobalService";
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";
import WhatWeDo from "@/components/home/WhatweDo";
import Whyflax from "@/components/home/WhyFlax";

export default function Services() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  const handleApplyNow = (course: string) => {
    setSelectedCourse(course);
    setIsStudentModalOpen(true);
  };

  return (
    <>
      <ServicesHero />
      <WhatWeDo/>
      {/* <RecruitmentSolutions /> */}
      {/* <HomeProcess /> */}
       <Whyflax/>

      <GlobalService
        onApplyNow={handleApplyNow}
        onHireTalent={() => setIsEmployerModalOpen(true)}
      />
   
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