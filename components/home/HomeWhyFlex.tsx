import { Users, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";

const whyFlexData = [
  {
    icon: <Users />,
    title: "Prepared Talent",
    desc: "Candidates undergo training, professional development, and screening to ensure they are ready to perform in international hospitality environments."
  },
  {
    icon: <BadgeCheck />,
    title: "Industry-Focused Development",
    desc: "Certification programs and workshops are designed around the expectations of global hospitality standards."
  },
  {
    icon: <MapPin />,
    title: "Regional Talent Network",
    desc: "We work with hospitality graduates and aspiring professionals from around the world, building a reliable and diverse talent pipeline."
  },
  {
    icon: <ShieldCheck />,
    title: "Transparent Recruitment",
    desc: "Employers benefit from our pay-after-joining placement structure, ensuring confidence and accountability."
  }
];

export default function HomeWhyFlex() {
  return (
    <section className="why-flex">
      <div className="why-flex-container">

        <h2>Why Flax Collective</h2>

        <p className="why-flex-subtext">
          Successful recruitment requires more than matching resumes with job openings.
          At Flax Collective, we focus on <strong>developing talent before connecting them with opportunity</strong>,
          ensuring both candidates and employers experience long-term success.
          <br /><br />
          Our process emphasizes professional readiness, structured evaluation, and responsible recruitment practices.
        </p>

        <div className="why-flex-grid">
          {whyFlexData.map((item, idx) => (
            <div key={idx} className="why-flex-card">
              
              <div className="why-flex-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}