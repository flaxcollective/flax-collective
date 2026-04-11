
export default function HomeJourney() {
  return (
    <section className="journey-section">
      <div className="journey-container">

        {/* LEFT */}
        <div className="journey-left">
          <h2>Begin Your Journey</h2>

          <p className="journey-subtext">
            Whether You Are A Student Aspiring To Build A Global Hospitality Career Or
            An Employer Seeking Prepared Professionals, Flax Collective Offers The
            Guidance, Training, And Connections Required To Succeed.
          </p>

          <div className="journey-points">
            <div className="journey-point">
              <span className="journey-check">✔</span>
              <p>24/7 Full Time Support</p>
            </div>

            <div className="journey-point">
              <span className="journey-check">✔</span>
              <p>Available Worldwide</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="journey-right">
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