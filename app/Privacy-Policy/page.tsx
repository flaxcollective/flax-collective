import React from 'react'
import LegalLayout from "@/components/legal/LegalLayout";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

const PrivacyPolicy = () => {
  return (
     <LegalLayout title="Privacy Policy">
      <PrivacyPolicyContent />
    </LegalLayout>
  )
}

export default PrivacyPolicy