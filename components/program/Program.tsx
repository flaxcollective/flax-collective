"use client";

import { useState } from "react";
import ProgramHero from "./ProgramHero";
import HomePrograms from "../home/HomePrograms";
import WhatSetsApart from "./WhatSetsApart";
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";
import HowItWorksStudents from "./HowItWorksStudents";
import CareerCTA from "./CareerCTA";
import StudnetTraining from "./StudnetTraining";
import CustomCourse from "./CustomCourse";

export default function Program() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  const handleApplyNow = (course:any) => {
    setSelectedCourse(course);
    setIsStudentModalOpen(true);
  };

  return (
    <>
      <ProgramHero />
       <WhatSetsApart />
       <StudnetTraining/>
      <HomePrograms onApplyNow={handleApplyNow} />
      <CustomCourse/>
      <HowItWorksStudents/>
      <CareerCTA/>

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