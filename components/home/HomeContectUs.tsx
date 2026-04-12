"use client";
import "@/app/styles/home/home-contact.css";
export default function HomeContectUs() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-left">
          <h2>Contact Us</h2>

          <p className="contact-subtext">
            For inquiries regarding <span>certification programs, recruitment opportunities, or employer partnerships,</span> please contact the Flax Collective team.
          </p>
          <p className="contact-subtext mt-3">
            We look forward to supporting professionals and organizations in building the future of hospitality.
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Mobile No." />
            <input type="text" placeholder="Email" />
            <textarea placeholder="Massage"></textarea>

            <button type="submit">Submit Now</button>
          </form>
        </div>

      </div>
    </section>
  );
}
