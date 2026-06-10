"use client";

import AuthLandingpage from "@/components/authlandingpage/authlanding";
import Onboardingpage from "@/components/authlandingpage/OnboardingPage";
import { useEffect, useState } from "react";

export default function Boardingpage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowOnboarding(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // return showOnboarding ? <Onboardingpage /> : <AuthLandingpage />;
}