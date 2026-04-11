export default function HomeFounder() {
  return (
    <section className="py-24 home-founder-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Founder’s Message
          </h2>
        </div>

        <div className="flex w-full gap-16 items-stretch">
          <div className="flex flex-col founder-text-container">
            <div className="founder-text">
              <p className="mb-4">
                At Flax Collective, We Believe That Exceptional Hospitality Begins With Exceptional People.
              </p>

              <p className="mb-4">
                <strong>Across Global Markets,</strong> Many Talented Hospitality Professionals Possess The Passion And Potential To Succeed On The International Stage. At The Same Time, <strong>Hospitality Organizations Worldwide Seek Individuals</strong> Who Are Not Only Qualified But Truly Prepared To <strong>Deliver World-Class Service. Flax Collective Was Founded To Thoughtfully Bridge This Gap.</strong>
              </p>

              <p className="mb-4">
                Our Focus Is On <strong>Preparation, Professionalism, And Partnership.</strong> Through Structured Counselling, Targeted Certification Programs, And Practical Industry Workshops, We Ensure That Every Candidate We Introduce To Employers Is Aligned With International Hospitality Standards And Ready To <strong>Contribute With Confidence From Day One.</strong>
              </p>

              <p className="mb-4">
                Equally Central To Our Philosophy Is A Commitment To <strong>Integrity And Transparency.</strong> Our <strong>Pay-After-Joining Recruitment Model</strong> Reflects The Trust We Aim To Build With Both Our Candidates And Our Employer Partners.
              </p>

              <p className="mb-4">
                Flax Collective Exists To Create Meaningful Connections—Helping <strong>Aspiring Professionals Build Global Careers While Enabling Hospitality Organizations</strong> To Strengthen Their Teams With <strong>Capable, Well-Prepared Talent."</strong>
              </p>
            </div>
          </div>
          <div className="flex justify-center h-auto items-stretch founder-image-container">
            <div className="relative w-full rounded-[16px] overflow-hidden shadow-xl h-full">
              <img
                src="/assets/images/founder-image.png"
                alt="Founder"
                className="w-full h-full object-cover block"
              />
              <div className="absolute bottom-0 left-0 right-0 pt-24 pb-8 px-6 bg-gradient-to-t from-black via-black/70 to-transparent text-center">
                <p className="font-serif text-white text-lg font-bold tracking-wider mb-2 uppercase">NAME OF FOUNDER</p>
                <p className="text-[#eee] text-[13px] font-medium">Founder Of Flax Collective</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
