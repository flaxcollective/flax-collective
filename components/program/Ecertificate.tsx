import "@/app/styles/Programs.css";

const features = [
  {
    icon: "/assets/images/shield.svg",
    title: "Secure & Verified",
    desc: "Digitally authenticated and securely protected to ensure certificate authenticity and prevent unauthorized modifications.",
  },
  {
    icon: "/assets/images/trust.svg",
    title: "Trusted & Recognized",
    desc: "A credible credential that reflects your learning achievements, professional growth, and successful programme completion.",
  },
  {
    icon: "/assets/images/share1.svg",
    title: "Easy To Share",
    desc: "Showcase your certificate across resumes, portfolios, LinkedIn profiles, and professional networks with ease.",
  },
  {
    icon: "/assets/images/access-control1.svg",
    title: "Permanent Access",
    desc: "Access, download, and verify your certificate anytime, anywhere through our secure digital platform.",
  },
];

export default function ECertificate() {
  return (
    <>
       <section className="py-6 md:py-20 px-4" >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12.5">
          <h2 className="ecert-title">E-Certificate</h2>
          <p className="ecert-subtextatom text-text-body text-sm md:text-base leading-7 max-w-4xl mx-auto mt-3">
            Empowering students with the skills, guidance, and global opportunities needed to build successful
            professional careers.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

        
          <div className="relative flex-1 min-w-0 flex flex-col ">
         
            <div className="absolute e-certverified">
              <img
                src="/assets/images/verified.png"
                alt="Verified"
                className=""
              />
            </div>

            <div className="ecert-cert-outer">
              <div className="ecert-cert-inner">
                <img
                  src="/assets/images/flax-certificate.png"
                  alt="Flax Collective Course Certificate"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Features */}
          <div className="ecert-features-panel flex-1 flex flex-col justify-between gap-6 p-4 md:p-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-4">
                <div className="ecert-icon-box">
                  <img src={f.icon} alt={f.title} className="" />
                </div>
                <div>
                  <h4 className="font-medium text-sm md:text-xl text-text-dark md:text-navy mb-1 md:mb-1.5">{f.title}</h4>
                  <p className="e-cert-featuresubdesc  font-medium text-text-body leading-3 md:leading-4.5 ">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
    <div className="global-page-divider mt-2"></div>
    </>
 
  );
}
