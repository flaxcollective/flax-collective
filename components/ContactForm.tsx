"use client";

export default function ContactForm() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Drop us a message</h2>
            <p className="text-gray-500 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
          </div>
          <div className="md:w-2/3 w-full">
            <form className="flex w-full items-end gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1 space-y-4 flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-[var(--color-background-beige)] border border-transparent focus:border-[var(--color-primary)] rounded-lg px-4 py-3 outline-none transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-[var(--color-background-beige)] border border-transparent focus:border-[var(--color-primary)] rounded-lg px-4 py-3 outline-none transition-colors"
                />
              </div>
              <input 
                type="text" 
                placeholder="Message" 
                className="w-full bg-[var(--color-background-beige)] border border-transparent focus:border-[var(--color-primary)] rounded-lg px-4 py-3 outline-none transition-colors mt-4 md:mt-0 flex-1"
              />
              <button type="submit" className="px-8 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors h-[50px]">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
