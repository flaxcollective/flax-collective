"use client";

import React, { useState } from 'react';
import StudentModal from '../shared/StudentModal';

export default function HomePrograms() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const basicPrograms = [
    {
      title: "Certificate In Food & Beverage Service",
      desc: "This Program Is Designed To Build A Strong Foundation In Food And Beverage Operations, Enhancing Service Quality And Professionalism.",
      price: "₹ 10,000",
      img: "/assets/images/programs-img/pro-1.png"
    },
    {
      title: "Certificate In Hospitality Management",
      desc: "Discover Key Concepts In Hospitality Management And Develop The Leadership Skills Necessary To Manage Diverse Hotel Operations.",
      price: "₹ 15,000",
      img: "/assets/images/programs-img/pro-2.png"
    },
    {
      title: "Diploma In Hospitality Management",
      desc: "A Comprehensive Program Offering Deep Insights Into Strategic Hospitality Operations, Accounting, And Guest Satisfaction.",
      price: "₹ 17,000",
      img: "/assets/images/programs-img/pro-3.png"
    },
    {
      title: "Professional Front Office Training Program",
      desc: "Equip Yourself With The Essential Skills Required To Excel In Front Desk Operations, Communication, And Guest Relations.",
      price: "₹ 20,000",
      img: "/assets/images/programs-img/pro-4.png"
    },
    {
      title: "Housekeeping Operations & Management Program",
      desc: "Learn Advanced Housekeeping Techniques, Inventory Management, And Quality Control Standards For Luxury Hotels.",
      price: "₹ 25,000",
      img: "/assets/images/programs-img/pro-5.png"
    }
  ];

  const advancePrograms = [
    {
      title: "Professional Food Production Program",
      desc: "Master Culinary Arts With Intensive Hands-On Training Focused On Global Cuisine, Kitchen Management, And Advanced Cooking Methods.",
      price: "₹ 25,000+",
      img: "/assets/images/programs-img/pro-6.png"
    },
    {
      title: "Advanced Culinary Arts & Leadership",
      desc: "Designed For Aspiring Executive Chefs, This Program Blends Advanced Culinary Techniques With Team Leadership Strategies.",
      price: "₹ 35,000+",
      img: "/assets/images/programs-img/pro-7.png"
    },
    {
      title: "Strategic Hospitality Leadership & Innovation",
      desc: "Elevate Your Career With Strategic Insights Focusing On Revenue Management, Innovative Service Delivery, And Global Hospitality Trends.",
      price: "₹ 45,000+",
      img: "/assets/images/programs-img/pro-8.png"
    }
  ];

  return (
    <section id="programs" className="programs-section">
      <div className="programs-container">
        
        {/* Header Section */}
        <div className="programs-header-section">
          <h2>Your Journey In Hospitality Starts Here</h2>
          <p>Build Your Skills With Industry-Focused Programs, From Foundational Training To Advanced Expertise In Hospitality.</p>
        </div>

        {/* Basic Programs */}
        <div className="programs-category">
          <h3>Basic Programs</h3>
          <div className="programs-grid programs-grid-basic">
            {basicPrograms.map((prog, idx) => (
              <div key={idx} className="program-card">
                <div className="program-card-img">
                  <img src={prog.img} alt={prog.title} />
                  <span className="program-tag">Basic</span>
                </div>
                <div className="program-card-content">
                  <h4>{prog.title}</h4>
                  <p className="program-desc">{prog.desc}</p>
                  <div className="program-card-footer">
                    <span className="program-price">{prog.price}</span>
                    <button onClick={() => setIsStudentModalOpen(true)} className="program-apply-btn">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advance Programs */}
        <div className="programs-category">
          <h3>Advance Programs</h3>
          <div className="programs-grid programs-grid-advance">
            {advancePrograms.map((prog, idx) => (
              <div key={idx} className="program-card">
                <div className="program-card-img">
                  <img src={prog.img} alt={prog.title} />
                  <span className="program-tag">Advance</span>
                </div>
                <div className="program-card-content">
                  <h4>{prog.title}</h4>
                  <p className="program-desc">{prog.desc}</p>
                  <div className="program-card-footer">
                    <span className="program-price">{prog.price}</span>
                    <button onClick={() => setIsStudentModalOpen(true)} className="program-apply-btn">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <StudentModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} />
    </section>
  );
}