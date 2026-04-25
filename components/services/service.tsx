"use client";

import { useState } from "react";
import ServicesHero from "./ServicesHero";
import RecruitmentSolutions from "./RecruitmentSolutions";
import HomeProcess from "../home/HomeProcess";
import GlobalService from "./GlobalService";
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";

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
      <RecruitmentSolutions />
      <HomeProcess />

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