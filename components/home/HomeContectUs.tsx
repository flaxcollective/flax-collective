
export default function HomeContectUs() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-left">
          <h2>Contact Us</h2>

          <p className="contact-subtext">
            For Inquiries Regarding <strong>Certification Programs, Recruitment Opportunities, Or Employer Partnerships,</strong> Please Contact The Flax Collective Team.
          </p>
          <p className="contact-subtext">
            We Look Forward To Supporting Professionals And Organizations In Building The Future Of Hospitality.
          </p>

          <div className="contact-points">
            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-1.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>24/7 Full Time Support</p>
            </div>

            <div className="contact-point">
              <span className="contact-check">
                <img src="/assets/icons/begin-your-journey-icon-check-2.png" alt="Check" className="w-5 h-5 object-contain" />
              </span>
              <p>Available Worldwide</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Mobile No." />
            <textarea placeholder="Massage"></textarea>

            <button type="submit">Submit Now</button>
          </form>
        </div>

      </div>
    </section>
  );
}