import "@/app/styles/home/home-process.css";
export default function ProcessQuote(){
    return(
        <>
<section className="process-section pb-16">
  <div className="max-w-7xl mx-auto px-4">

    <div className="process-quote-section">
      <h2 className="text-3xl font-semibold mb-10 text-center">
        Opportunities
      </h2>

      {/* ✅ Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-center">

        {/* LEFT CONTENT */}
        <div className="flex  md:flex-row lg:flex-col gap-6 w-full lg:w-1/2">

          <div className="process-quote-section-content-1 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">
              Opportunities For Students
            </h2>
            <p className="text-gray-600 mt-1.5">
              Flax Collective provides aspiring professionals with a <strong>structured pathway to build international careers.</strong> 
            </p>
          </div>

          <div className="process-quote-section-content-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">
              Talent Solutions For Employers
            </h2>
            <p className="text-gray-600 mt-1.5">
              Organizations partner with Flax Collective to access a reliable pipeline of
              <strong> trained and pre-screened professionals.</strong> 
            
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/assets/images/opportunities.png"
            alt="Opportunities"
            className="w-3/4 max-w-sm lg:max-w-md h-auto"
          />
        </div>

      </div>

    </div>

   

  </div>
</section>
      
        
        </>
    )
}