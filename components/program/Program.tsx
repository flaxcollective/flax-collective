"use client";

import { useState , useEffect } from "react";
import ProgramHero from "./ProgramHero";
import HomePrograms from "../home/HomePrograms";
import WhatSetsApart from "./WhatSetsApart";
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";
import HowItWorksStudents from "./HowItWorksStudents";
import CareerCTA from "./CareerCTA";
import StudnetTraining from "./StudnetTraining";
import CustomCourse from "./CustomCourse";
import AreaofLearning from "./AreaofLearning";
import { useAuth } from "@/context/AuthContext";
import ECertificate from "./Ecertificate";

export default function Program() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  

  const { user } = useAuth();



  const handleApplyNow = (course:any) => {
    setSelectedCourse(course);
    setIsStudentModalOpen(true);
  };

  return (
    <>
      <ProgramHero />
       <WhatSetsApart />
       {/* <StudnetTraining/> */}
      <ECertificate/>
       <HowItWorksStudents/>
      <HomePrograms onApplyNow={handleApplyNow} />
        <AreaofLearning/>
     <CustomCourse user={user} />
    
     
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