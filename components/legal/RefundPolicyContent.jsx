import React from 'react'

import LegalSection from "./LegalSection";
import LegalList from "./LegalList";

const RefundPolicyContent = () => {
  return (
     <>
        <div className="mb-5">
              <h4 className="text-xl md:text-3xl text-navy font-medium">Last Updated: 28/04/2026</h4>
        </div>
   

      <p className="text-xs text-text-body md:text-base leading-5 md:leading-6 font-medium">
       At Flax Collective, we are committed to delivering high-quality training, certification, counselling, and recruitment services. We understand that circumstances may sometimes change, and this Refund & Cancellation Policy explains the conditions under which refunds may be requested, approved, or denied.
      </p>
     <p className="text-xs md:text-base text-text-body leading-5 md:leading-6 font-medium">By enrolling in any program or engaging our Services, you agree to the terms set out in this Refund & Cancellation Policy. This Policy should be read in conjunction with our Terms & Conditions.</p>    
      {/* Information We Collect */}
      <LegalSection title="General Principles">
         <LegalList
          items={[
            "Refund eligibility depends on the type of Service purchased, the timing of the request, and the stage of program delivery at which the request is made.",
            "All refund requests must be submitted in writing to info@flaxcollective.com with relevant supporting details.",
            "Approved refunds will be processed using the original payment method, unless otherwise agreed in writing.",
            "Bank charges, payment gateway fees, and currency conversion costs (where applicable) are non-refundable and will be deducted from the refund amount.",
          
          ]}
        />
        <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">Certification & Training Programs</p>
        </div>
          <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">A-  Cooling-Off Period (Cancellation Before Program Start)</p>
        </div>
        <LegalList
          items={[
            "If you wish to cancel your enrollment before the program officially begins, you may request a refund as follows:",
            "More than 7 days before the program start date: Eligible for a refund of program fees, less a non-refundable administrative charge of up to 10% of the total fee.",
            "Within 7 days of the program start date: Eligible for a refund of up to 50% of the total program fee.",
            "On or after the program start date: No refund will be issued, except in exceptional circumstances at the sole discretion of Flax Collective."
            ]}
        />
         <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">B-  Cancellation After the Program Has Begun</p>
        </div>
        <LegalList
          items={[
              "Once the program has commenced, refunds will generally not be issued. However, partial refunds may be considered in the following exceptional cases, supported by valid documentation:",
              "Serious medical illness preventing continued participation.",
              "Bereavement of an immediate family member.",
              "Other circumstances assessed and approved by Flax Collective at its sole discretion.",
              <>
                <b className='text-text-body font-base '>In such cases, the refund amount will be calculated on a pro-rated basis after deducting the cost of sessions already attended, materials issued, and administrative charges.</b>
              </>
          ]}
        />

        <div className="mb-5">
               <p className=" text-2xl md:">C-  Non-Refundable Components</p>
        </div>
        <LegalList
          items={[
            "The following components are non-refundable under any circumstances:",
            "Registration and application fees.",
            "Costs of issued course materials, kits, or printed certifications.",
            "Workshops, masterclasses, or events that have already been delivered.",
            "Third-party fees (such as assessment, examination, or licensing fees) once paid to the third party."
          ]}
        />

      </LegalSection>

      {/* Usage */}
      <LegalSection title="Counselling and Career Guidance Sessions:">
        
        <LegalList
          items={[
            "Counselling sessions cancelled at least 48 hours in advance can be rescheduled at no additional cost.",
            "Cancellations made within 48 hours of the scheduled session are non-refundable but may be rescheduled once at our discretion.",
            "Sessions missed without prior notice are considered delivered and are non-refundable.",
          ]}
        />
      </LegalSection>

       <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">Recruitment & Placement Services</p>
        </div>

      {/* Sharing */}
      <LegalSection title="A-  For Candidates">
        <LegalList
          items={[
            "Flax Collective does not charge candidates any fee in exchange for a guaranteed job offer or employment outcome.",
            "Where any optional preparation services (such as interview coaching or profile development) are paid for separately, refund eligibility will follow the same rules as our Certification & Training Programs.",
            "No refund will be issued on the basis of an unsuccessful interview, rejection by an employer, or visa-related outcomes, as these are outside our control."
           ]}
        />
      </LegalSection>

      <LegalSection title="B-  For Employers (Upfront or Retainer Engagements)">
        <LegalList
          items={[
            "Where an employer has paid an upfront or retainer fee:",
            "Refund eligibility will be governed by the specific engagement agreement signed between Flax Collective and the employer.",
            "Work already performed (such as candidate sourcing, screening, profile sharing, and interview coordination) is non-refundable.",
           ]}
            />

      </LegalSection>

      {/* Data Retention */}
      <LegalSection title="Circumstances Where Refunds Will Not Be Issued">
       <LegalList
          items={[
            "Refunds will not be granted in the following situations:",
            "The User has violated our Terms & Conditions or program code of conduct.",
            "The User has been removed from a program due to misconduct, dishonesty, or non-attendance.",
            "The User has misrepresented qualifications, experience, or personal information.",
            "The User has accessed or completed a substantial portion of the program content.",
            "The User is dissatisfied with an employer's hiring decision, salary offer, or visa outcome.",
            "A change of mind after the cooling-off period has lapsed."
            
          ]}
       />
      </LegalSection>

      {/* Rights */}
      <LegalSection title="How to Request a Refund">
        <LegalList
          items={[
            "To request a refund, please email info@flaxcollective.com with the following details:",
            "Full name and registered contact information.",
            "Program name, batch, or service engaged.",
            "Date of payment and transaction reference.",
            "Reason for the refund request.",
            "Supporting documents (where relevant, such as medical certificates or proof of bereavement).",
            <>
              <b>Our team will acknowledge your request within five (5) working days.</b>
            </>
            
          ]}
        />
      </LegalSection>

      {/* Cookies */}
      <LegalSection title="Refund Processing Timeline">
         <LegalList
          items={[
            "Approved refunds are typically processed within fifteen (15) to thirty (30) working days of approval.",
            "Refunds will be credited to the original payment method.",
            "For international transactions, additional time may be required due to bank or currency processing.",
            "Flax Collective is not responsible for delays caused by banks, payment gateways, or third-party financial institutions.",
           
          ]}
         />
       
      </LegalSection>

      {/* Security */}
      <LegalSection title="Disputes">
        <LegalList
          items={[
            "If you disagree with the outcome of a refund decision, you may submit a written appeal to info@flaxcollective.com within fifteen (15) days of the decision. Our internal review team will reassess the request and respond with a final determination.",
            "For unresolved disputes, the governing law and jurisdiction provisions outlined in our Terms & Conditions shall apply.",
          
           
          ]}
         />
      </LegalSection>

      {/* Children */}
      <LegalSection title="Children's Privacy">
        <LegalList
          items={[
            "Our services are intended for individuals who are 18 years of age or older, or the age of majority in their jurisdiction. We do not knowingly collect personal information from minors. If we become aware that information has been collected from a minor without verified parental consent, we will take steps to delete it promptly.",
           ]}
         />
     
      </LegalSection>
        <LegalSection title="Updates to This Refund & Cancellation Policy">

            <LegalList
          items={[
            "Flax Collective reserves the right to amend this Refund & Cancellation Policy at any time to reflect operational, legal, or business changes. The updated Policy will be posted on this page with a revised Last Updated date. Refund requests will be assessed under the version of the Policy in force at the time of the original payment.",
           ]}
         />
       
      </LegalSection>

      {/* Updates */}
      <LegalSection title="Contact Us">
        <LegalList
          items={[
            "For any questions or refund-related concerns, please contact:",
            "Flax Collective Email: info@flaxcollective.com",
            "We aim to handle every refund request fairly, transparently, and in line with the principles of integrity and responsibility that guide our work.",
            
            
          ]}
         
        />
      </LegalSection>

    

    </>
  )
}

export default RefundPolicyContent