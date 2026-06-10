import React from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const LegalLayout = ({ title, children }) => {
  return (
    <>
      <Header/>
    <section className="bg-beige">
      
      <div className="w-full mx-auto border-b-2  border-b-olive-950  mt-24 md:mt:30 lg:mt-36">
        
        {/* Title */}
        <div className=" md:bg-[#3f536e] pt-14 md:py-24 text-center">
        <span className="md:text-white  text-4xl font-medium px-3 py-1 rounded">
          {title}
        </span>
      </div>


        {/* Content */}
        <div className="space-y-6 py-8 md:py-20 max-w-7xl px-5 mx-auto text-sm md:text-base leading-relaxed">
          {children}
        </div>

      </div>

    </section>
    <Footer/>
    
    </>

  
  );
};

export default LegalLayout;