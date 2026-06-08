"use client";

export default function InquiryForm() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Make an inquiry
          </h2>
          <p className="text-gray-600">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="First Name *" 
              className="w-full bg-[#f8f9f5] border border-gray-200 rounded px-5 py-4 focus:outline-none focus:border-[var(--color-primary)]"
            />
            <input 
              type="text" 
              placeholder="Last Name *" 
              className="w-full bg-[#f8f9f5] border border-gray-200 rounded px-5 py-4 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="email" 
              placeholder="Email *" 
              className="w-full bg-[#f8f9f5] border border-gray-200 rounded px-5 py-4 focus:outline-none focus:border-[var(--color-primary)]"
            />
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full bg-[#f8f9f5] border border-gray-200 rounded px-5 py-4 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div>
            <textarea 
              placeholder="Message *" 
              rows={5}
              className="w-full bg-[#f8f9f5] border border-gray-200 rounded px-5 py-4 focus:outline-none focus:border-[var(--color-primary)] resize-none"
            ></textarea>
          </div>
          <div className="text-center mt-8">
            <button 
              type="submit" 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-bold uppercase tracking-wider px-12 py-4 rounded transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
