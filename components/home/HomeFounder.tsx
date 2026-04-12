import "@/app/styles/home/home-founder.css";
export default function HomeFounder() {
  return (
    <section className="home-founder-section">
      <div className="home-founder-section-container ">
        <div className="mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Founder’s Message
          </h2>
        </div>

        <div className="flex w-full gap-16 items-stretch">
          <div className="flex flex-col founder-text-container">
            <div className="founder-text">
              <p className="mb-4">
                At Flax Collective, we believe that exceptional hospitality begins with exceptional people.
              </p>

              <p className="mb-4">
                <strong>Across global markets,</strong> many talented hospitality professionals possess the passion and potential to succeed on the international stage. At the same time, <strong>hospitality organizations worldwide seek individuals</strong> who are not only qualified but truly prepared to <strong>deliver world-class service. Flax Collective was founded to thoughtfully bridge this gap.</strong>
              </p>

              <p className="mb-4">
                Our focus is on <strong>preparation, professionalism, and partnership.</strong> Through structured counselling, targeted certification programs, and practical industry workshops, we ensure that every candidate we introduce to employers is aligned with international hospitality standards and ready to <strong>contribute with confidence from day one.</strong>
              </p>

              <p className="mb-4">
                Equally central to our philosophy is a commitment to <strong>integrity and transparency.</strong> Our <strong>pay-after-joining recruitment model</strong> reflects the trust we aim to build with both our candidates and our employer partners.
              </p>

              <p className="mb-4">
                Flax Collective exists to create meaningful connections—helping <strong>aspiring professionals build global careers while enabling hospitality organizations</strong> to strengthen their teams with <strong>capable, well-prepared talent.</strong>
              </p>
            </div>
          </div>

          {/* <div className="flex justify-center h-auto items-stretch founder-image-container">
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
          </div> */}
        </div>
        <div className="global-page-divider mt-14"></div>
      </div>
    </section>
  );
}