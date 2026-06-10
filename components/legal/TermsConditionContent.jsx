import LegalSection from "./LegalSection";
import LegalList from "./LegalList";

const TermsConditionContent = () => {
  return (
    <>
        <div className="mb-5">
               <h4 className="text-xl md:text-3xl text-navy font-medium">Last Updated: 28/04/2026</h4>
        </div>
   

      <p className="text-xs md:text-base text-text-body leading-5 md:leading-6 font-medium">
       Welcome to Flax Collective. These Terms & Conditions (Terms) govern your access to and use of the Flax Collective website, training programs, certification courses, counselling services, and recruitment and placement services (collectively, the Services).
      </p>
     <p className="text-xs md:text-base text-text-body leading-5 md:leading-6 font-medium">By accessing our website, registering for any program, or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.</p>    
  
      <LegalSection title="Definitions">

        <LegalList
          items={[
                "Flax Collective, we, us, or our refers to the talent development and workforce solutions consultancy operating under the brand Flax Collective.",
                "Candidate or Student refers to any individual who applies for, enrols in, or participates in our training, certification, counselling, or placement programs.",
                "Employer refers to any organization, business, or hiring entity that engages Flax Collective for talent sourcing, screening, or recruitment services.",
                "User refers to any visitor, candidate, student, employer, or partner who accesses our website or Services.",
                "Program refers to any certification course, workshop, training module, bootcamp, or counselling service offered by Flax Collective."
             ]}
        />
      </LegalSection>

      {/* Usage */}
      <LegalSection title="Eligibility">
     
        <LegalList
          items={[
            "To use our Services, you must:",
            "Be at least 18 years of age, or the age of majority in your jurisdiction.",
            "Have the legal capacity to enter into a binding contract.",
            "Provide accurate, current, and complete information during registration and throughout your engagement with us.",
            "Not be barred from receiving the Services under any applicable law.",
            "Communicate program updates, schedules, opportunities, and important notices.",
        
          ]}
        />
            <p className="text-text-body text-base font-bold">We reserve the right to refuse Service, suspend access, or terminate accounts where eligibility requirements are not met or where information provided is found to be false or misleading.</p>
      </LegalSection>

      {/* Sharing */}
      <LegalSection title="Account Registration">
        <LegalList
          items={[
            "When creating an account with Flax Collective, you agree to:",
            "Provide accurate and truthful information.",
            "Maintain the confidentiality of your login credentials.",
            "Notify us immediately of any unauthorized access or security breach.",
            "Accept full responsibility for all activities carried out under your account.",
            "Accept full responsibility for all activities carried out under your account.",
            <>
                <b>We are not liable for losses resulting from unauthorized account access caused by your failure to safeguard your credentials.</b>
            </>
        ]}
        />
      </LegalSection>

    {/* Data Retention */}
      <LegalSection title="Services Offered">
       <LegalList
          items={[
            "Flax Collective provides the following Services:",
            "Career counselling and professional guidance.",
            "Certification programs, workshops, and skill development training.",
            "Talent sourcing and recruitment support for employers.",
            "Placement assistance and onboarding coordination.",
            <>
                <b>The specific scope, duration, and deliverables of each Service are described on the relevant program page or in a separate engagement agreement.</b>
            </>
            
          ]}
         
        />
   
      </LegalSection>

      {/* Rights */}
      <LegalSection title="Candidate Obligations">
        <LegalList
          items={[
            "If you enrol as a candidate or student, you agree to:",
            "Attend scheduled training sessions, workshops, and counselling appointments.",
            "Complete assignments, evaluations, and certification requirements honestly.",
            "Refrain from sharing course materials, recordings, or proprietary content with third parties.",
            "Cooperate during the screening, interview, and placement process.",
            "Provide truthful information regarding your qualifications, experience, and credentials.",
            "Honour any commitments made to employers introduced to you through Flax Collective.",
            "Misrepresentation, plagiarism, or non-compliance may result in disqualification from the program without refund."
          ]}
        />
      </LegalSection>

      {/* Cookies */}
      <LegalSection title="Employer Obligations">
         <LegalList
          items={[
            "If you engage Flax Collective as an employer, you agree to:",
            "Provide accurate role descriptions, hiring criteria, and compensation details.",
            "Conduct interviews and evaluations in a fair, lawful, and professional manner.",
            "Treat introduced candidates in accordance with applicable labour and employment laws.",
           
          ]}
         />
      </LegalSection>
         {/* Cookies */}
      <LegalSection title="Certification Programs">
         <LegalList
          items={[
            "Certification is awarded only upon successful completion of program requirements, including attendance, assessments, and evaluations.",
            "Certificates issued by Flax Collective acknowledge the successful completion of our internal program standards. They do not constitute a government-issued qualification or guarantee of employment.",
            "Course schedules, content, and instructors may be modified at our discretion to maintain quality and relevance.",
         ]}
         />
      </LegalSection>
       <LegalSection title="Placement and Recruitment">
         <LegalList
          items={[
            "Flax Collective facilitates introductions between candidates and prospective employers but does not guarantee placement, employment, or any specific salary, role, or location.",
            "Final hiring decisions are made solely by the employer.",
            "Visa approvals, immigration outcomes, and travel arrangements depend on independent third-party authorities and are outside our control.",
         ]}
         />
      </LegalSection>
        <LegalSection title="Fees and Payments">
         <LegalList
          items={[
            "Fees for programs, certifications, and recruitment services are listed on our website or communicated in a written engagement document.",
            "All fees must be paid in accordance with the agreed payment schedule.",
            "Late payments may result in suspension of Services or denial of access to the program.",
            "Taxes, duties, and applicable government levies are the responsibility of the User unless stated otherwise.",
            <>
                <b>Refunds are governed by our Refund Policy, which forms part of these Terms.</b>
            </>
         ]}
         />
      </LegalSection>

         <LegalSection title="Intellectual Property">
         <LegalList
          items={[
            "All content on our website and within our programs, including but not limited to course materials, videos, presentations, logos, branding, written content, assessments, and methodologies, is the intellectual property of Flax Collective or its licensors.",
            "You may not:",
            "Reproduce, distribute, modify, or publicly display our content without written permission.",
            "Use our trademarks, name, or branding without prior consent.",
            "Reverse engineer, scrape, or extract data from our website or platform.",
            <>
                <b>Limited personal, non-commercial use is permitted strictly for the purpose of participating in our Services.</b>
            </>
         ]}
         />
      </LegalSection>
        <LegalSection title="User Conduct">
         <LegalList
          items={[
                    "You agree not to:",
                    "Use the Services for any unlawful, fraudulent, or harmful purpose.",
                    "Upload or transmit malicious code, viruses, or harmful files.",
                    "Impersonate another person or misrepresent your identity.",
                    "Harass, threaten, or discriminate against any candidate, employer, or staff member.",
                    "Disrupt the functionality, security, or integrity of our website or Services.",
                  <>
                <b>Violation of these conduct rules may result in immediate termination of access without refund and, where applicable, legal action.</b>
            </>
         ]}
         />
      </LegalSection>
       <LegalSection title="Third-Party Services and Links">
         <LegalList
          items={[
                    "Our Services may include links to third-party websites, employer portals, or service providers. Flax Collective does not control these third parties and is not responsible for their content, terms, or practices. Engaging with such third parties is at your own risk.",
                ]}
         />
      </LegalSection>
    <LegalSection title="Disclaimers">
         <LegalList
          items={[
                    "Our Services are provided on an as is and as available basis.",
                    "While we strive to ensure accuracy and quality, we make no warranties regarding outcomes, employment results, salary expectations, or career success.",
                    "Information shared on our website is for general informational purposes and does not constitute legal, financial, or immigration advice."

          ]}
         />
      </LegalSection>
      <LegalSection title="Limitation of Liability">
         <LegalList
          items={[
                    "To the maximum extent permitted by law, Flax Collective, its directors, employees, partners, and affiliates shall not be liable for:",
                    "Indirect, incidental, special, consequential, or punitive damages.",
                    "Loss of income, opportunity, employment offers, business, or data.",
                    "Outcomes resulting from third-party actions, including those of employers, government authorities, or external service providers.",
                    <>
                        <b>Our total aggregate liability under these Terms shall not exceed the total fees paid by the User to Flax Collective in the twelve (12) months preceding the event giving rise to the claim.</b>
                    </>

          ]}
         />
      </LegalSection>
       <LegalSection title="Indemnification">
         <LegalList
          items={[
                    "You agree to indemnify, defend, and hold harmless Flax Collective from any claims, damages, losses, liabilities, or expenses (including reasonable legal fees) arising out of:",
                    "Your breach of these Terms.",
                    "Your violation of any law or third-party right.",
                    "Information provided by you that is inaccurate or misleading.",

          ]}
         />
      </LegalSection>
  <LegalSection title="Termination">
         <LegalList
          items={[
                    "We may suspend or terminate your access to the Services at any time, without notice, if:",
                    "You violate these Terms or any applicable policy.",
                    "You provide false or misleading information.",
                    "Your conduct poses a risk to other Users, employers, or our reputation.",
                    "Required by law or regulatory authority.",
                    <>
                        <b>Upon termination, any fees already paid are governed by the Refund Policy.</b>
                    </>

          ]}
         />
      </LegalSection>
      <LegalSection title="Governing Law and Jurisdiction">
         <LegalList
          items={[
                    "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts.",
                 ]}
         />
      </LegalSection>
       <LegalSection title="Dispute Resolution">
         <LegalList
          items={[
                    "In the event of a dispute, the parties agree to first attempt resolution through good-faith discussions. If the matter cannot be resolved within thirty (30) days, the dispute shall be referred to mediation or arbitration as mutually agreed, before proceeding to formal legal action.",
                 ]}
         />
      </LegalSection>
      <LegalSection title="Changes to These Terms">
         <LegalList
          items={[
                    "We may revise these Terms from time to time to reflect changes in our Services, business practices, or legal requirements. Updated Terms will be posted on this page with a revised Last Updated date. Continued use of our Services after such updates constitutes acceptance of the revised Terms.",
                 ]}
         />
      </LegalSection>
        <LegalSection title="Contact Information">
         <LegalList
          items={[
                    "For any questions, clarifications, or concerns relating to these Terms & Conditions, please reach out to:",
                    "Flax Collective Email: info@flaxcollective.com",
                    "We are committed to ensuring transparency and clarity in every interaction with our candidates, employers, and partners."
                 ]}
         />
      </LegalSection>
      
  

    </>
  );
};

export default TermsConditionContent;