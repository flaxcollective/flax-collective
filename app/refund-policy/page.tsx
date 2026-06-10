import React from 'react'
import LegalLayout from "@/components/legal/LegalLayout";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import RefundPolicyContent from "@/components/legal/RefundPolicyContent";

const PrivacyPolicy = () => {
  return (
     <LegalLayout title="Refund Policy">
      <RefundPolicyContent/>
    </LegalLayout>
  )
}

export default PrivacyPolicy