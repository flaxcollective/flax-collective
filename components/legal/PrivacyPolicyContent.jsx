import LegalSection from "./LegalSection";
import LegalList from "./LegalList";

const PrivacyPolicyContent = () => {
  return (
    <>
        <div className="mb-5">
               <h4 className="text-xl md:text-3xl text-navy font-medium">Last Updated: 28/04/2026</h4>
        </div>
   

      <p className="text-xs text-text-body md:text-base leading-5 md:leading-6 font-medium">
        Flax Collective is committed to protecting the privacy of every candidate, student, employer, partner institution, and visitor who interacts with our website, training programs, or recruitment services. This Privacy Policy explains how we collect, use, store, share, and protect your information.
      </p>
     <p className="text-xs text-text-body md:text-base leading-5 md:leading-6 font-medium">By accessing our website, registering for any program, or engaging our recruitment services, you agree to the practices described in this Policy.</p>    
      {/* Information We Collect */}
      <LegalSection title="Information We Collect">

        <p className=" text-xs md:text-base text-text-body font-medium leading-5 md:leading-7">We collect information that is necessary to deliver our training, certification, counselling, and recruitment services. The information we collect falls into the following categories:</p>

      <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">A-  Information You Provide Directly:</p>
        </div>
        <LegalList
          items={[
             <>
             <b>Identification details: </b>Full name, date of birth, gender, nationality, photograph, and government-issued ID details (where required for placement or visa support).
            </>,
            <>
            <b>Contact information:</b> Email address, phone number, residential address, and emergency contact details.
            </>,
            <>
              <b>Professional information:</b>Educational qualifications, certifications, work history, resume/CV, references, language proficiency, and career preferences.
            </>,
            <>
            <b> Employer information:</b> Company name, designation of point of contact, business email, hiring requirements, and organizational details (for employer partners).
            </>,
            <>
              <b>Communication records:</b> Messages, enquiries, counselling notes, interview feedback, and correspondence with our team.
            </>

        
          ]}
        />
         <div className="mb-5">
               <p className="text-2xl md:text-3xl font-medium text-navy mt-8">B-  Information We Collect Automatically</p>
        </div>
        <LegalList
          items={[
                <>
                   <b>Usage data:</b>  pages visited, time spent on the website, links clicked, and referral sources.
                </>,
                <>
                <b> Device and technical data:</b> IP address, browser type, operating system, device identifiers, and approximate location.
                </>,
                <>
                    <b>Cookies and similar technologies:</b> as described in Section 7.
                </>
          ]}
        />

        <div className="mb-5">
               <p className=" text-2xl md:">C-  Information from Third Parties</p>
        </div>
        <LegalList
          items={[
            "Educational institutions, training partners, or referral agents who introduce candidates to us.",
            "Background verification agencies (only where the candidate has consented).",
            "Public professional profiles (such as LinkedIn) where you have made information publicly available.",
          ]}
        />

      </LegalSection>

      {/* Usage */}
      <LegalSection title="How We Use Your Information">
          <p className="font-medium">We use your information to:</p>
        <LegalList
          items={[
            "Evaluate eligibility for our certification, training, and placement programs.",
            "Deliver counselling, training, workshops, and certification.",
            "Match candidates with suitable employers and prepare them for interviews",
            "Share candidate profiles with prospective employers (only after candidate consent).",
            "Process payments, fees, and applicable refunds.",
            "Communicate program updates, schedules, opportunities, and important notices.",
            "Comply with legal, regulatory, and visa-related requirements.",
            "Improve our services, content, and user experience." ,
            "Prevent fraud, misuse of our platform, and unauthorized access."
          ]}
        />
            <p className="text-text-body text-base font-bold">We do not sell your personal information to third parties for marketing purposes.</p>
      </LegalSection>

      {/* Sharing */}
      <LegalSection title="Sharing of Information">
        <LegalList
          items={[
            "We share your information only with parties who play a role in delivering our services or where required by law. These include:",
            <>
                <b>Prospective Employers:</b>   Candidate profiles, certifications, and interview-related information are shared with employers as part of the recruitment process, with the candidate's prior consent.
            </>,
            <>
              <b> Training and Certification Partners:</b> For program delivery, evaluation, and issuance of certifications.
            </>,
            <>
              <b>Service Providers:</b>  Including hosting providers, payment processors, communication tools, background verification agencies, and analytics providers, all bound by confidentiality obligations.
            </>,
            <>
              <b>
                Legal and Regulatory Authorities:</b> Where disclosure is required by applicable law, court order, or government request.
          
            </>,
            <>
              <b>Successors in Interest: </b> In the event of a merger, acquisition, or restructuring, your information may be transferred as part of the business assets, subject to the protections set out in this Policy.
            </>
 ]}
        />
      </LegalSection>

      <LegalSection title="International Data Transfers">
        <p>As Flax Collective connects candidates with employers across multiple countries, your information may be transferred to and processed in jurisdictions other than your country of residence. We take reasonable steps to ensure that such transfers are conducted in line with applicable data protection requirements and that your information remains protected.</p>

      </LegalSection>

      {/* Data Retention */}
      <LegalSection title="Data Retention">
       <LegalList
          items={[
            "We retain personal information only for as long as is necessary to fulfil the purposes for which it was collected, including:",
            "Active candidate or employer engagement.",
            "Compliance with legal, tax, accounting, and regulatory obligations.",
            "Resolution of disputes and enforcement of agreements.",
            
          ]}
         
        />
         <b className="text-text-body">Once your information is no longer required, it is securely deleted, anonymised, or archived in accordance with our internal retention schedule.</b>
      </LegalSection>

      {/* Rights */}
      <LegalSection title="Your Rights">
        <LegalList
          items={[
            "Subject to applicable law, you have the right to:",
            "Access the personal information we hold about you.",
            "Request correction of inaccurate or incomplete information.",
            "Request deletion of your information, subject to legitimate retention requirements.",
            "Withdraw consent for specific uses (such as sharing your profile with employers).",
            "Opt out of marketing or promotional communications.",
            "Lodge a complaint with the relevant data protection authority."
          ]}
        />

        <p>To exercise any of these rights, please contact us at <strong>info@flaxcollective.com</strong>. We may verify your identity before processing your request.</p>
      </LegalSection>

      {/* Cookies */}
      <LegalSection title="Cookies and Tracking Technologies">
         <LegalList
          items={[
            "Our website uses cookies and similar technologies to:",
            "Remember user preferences and session information.",
            "Understand how visitors use the website.",
            "Improve performance, security, and user experience.",
           
          ]}
         />
        <b className="text-text-body">You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain features of the website.</b>
      </LegalSection>

      {/* Security */}
      <LegalSection title="Data Security">
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission, restricted access controls, and secure storage practices.
        </p>
        <p>However, no method of transmission over the internet or electronic storage is fully secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
      </LegalSection>

      {/* Children */}
      <LegalSection title="Children's Privacy">
        <p>
          Our services are intended for individuals who are 18 years of age or older, or the age of majority in their jurisdiction. We do not knowingly collect personal information from minors. If we become aware that information has been collected from a minor without verified parental consent, we will take steps to delete it promptly.
        </p>
      </LegalSection>
        <LegalSection title="Third-Party Links">
        <p>
         Our website may contain links to third-party websites, including those of employers, partner institutions, or social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before sharing any information with them.
        </p>
      </LegalSection>

      {/* Updates */}
      <LegalSection title="Updates to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal obligations. The revised version will be posted on this page with an updated Last Updated date. Material changes will be communicated through our website or via email where appropriate.
        </p>
        <p>Continued use of our services after the updated Policy is published constitutes acceptance of the revised terms.</p>
      </LegalSection>

      {/* Contact */}
      <LegalSection title="Contact Us">
        <p>
          For any questions, concerns, or requests relating to this Privacy Policy or your personal information, please contact:
        </p>
        <p>Flax Collective <strong> Email: info@flaxcollective.com</strong></p>
        <p className="font-bold text-base text-text-body leading-6">We are committed to addressing your privacy-related concerns promptly and transparently.</p>
      </LegalSection>

    </>
  );
};

export default PrivacyPolicyContent;