"use client";
export default function OpenPositionsForm() {
  return (
    <section className="positions-section">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/5">
            <h2 className="positions-heading">Open to All Positions</h2>
            <p className="positions-text">Send us your details and we'll reach out.</p>
          </div>
          <form className="md:w-3/5 flex flex-col sm:flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="positions-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="positions-input"
            />
            <button type="submit" className="positions-btn">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
