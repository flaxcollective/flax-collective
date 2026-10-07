"use client";

import { useState } from "react";
import ProgramHero from "./ProgramHero";
import HomePrograms from "../home/HomePrograms";
import WhatSetsApart from "./WhatSetsApart";
import StudentModal from "@/components/shared/StudentModal";
import EmployerModal from "@/components/shared/EmployerModal";
import HowItWorksStudents from "./HowItWorksStudents";
import CareerCTA from "./CareerCTA";
import CustomCourse from "./CustomCourse";
import AreaofLearning from "./AreaofLearning";
import { useAuth } from "@/context/AuthContext";
import ECertificate from "./Ecertificate";
import CertificationList from "./CertificationList";

export default function Program() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"course" | "exam">("course");
  const [selectedItem, setSelectedItem] = useState("");
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  const { user } = useAuth();

  const handleApplyCourse = (course: string) => {
    setModalType("course");
    setSelectedItem(course);
    setIsStudentModalOpen(true);
  };

  const handleApplyExam = (examTitle: string) => {
    setModalType("exam");
    setSelectedItem(examTitle);
    setIsStudentModalOpen(true);
  };

  return (
    <>
      <ProgramHero />
      <WhatSetsApart />
      <ECertificate />
      <CertificationList onApplyExam={handleApplyExam} />
      <HowItWorksStudents />
      <HomePrograms onApplyNow={handleApplyCourse} />
      <AreaofLearning />
      <CustomCourse user={user} />
      <CareerCTA />

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setSelectedItem("");
        }}
        initialCourse={selectedItem}
        type={modalType}
      />

      <EmployerModal
        isOpen={isEmployerModalOpen}
        onClose={() => setIsEmployerModalOpen(false)}
      />
    </>
  );
}