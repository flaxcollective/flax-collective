'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaPlus, FaMinus } from 'react-icons/fa'
import { HiOutlineMail } from "react-icons/hi";
import { GoCheckCircleFill } from "react-icons/go";
import styles from "@/app/styles/contact.module.css";
import HomeContectUs from '../home/HomeContectUs'

export default function ContactHero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Flax Collective?",
      answer: "Flax Collective is a global hospitality talent development and recruitment consultancy connecting skilled professionals with leading employers worldwide.",
    },
    {
      question: "Who can apply as a candidate?",
      answer: "Students, graduates, and professionals in hospitality can apply for global opportunities.",
    },
    {
      question: "Do you guarantee job placement?",
      answer: "We provide strong placement support, but final selection depends on performance and employer requirements.",
    },
    {
      question: "Are certification programs online?",
      answer: "Yes, most certification programs are available online with flexible access.",
    },
    {
      question: "Do certification courses improve job opportunities?",
      answer: "Yes, they enhance your skills and increase your chances of getting hired.",
    },
    {
      question: "How are candidates evaluated before placement?",
      answer: "Through structured training, interviews, and skill assessments.",
    },
    {
      question: "How does the pay-after-joining model work?",
      answer: "You pay the service fee only after successfully joining a job.",
    },
    {
      question: "How can employers partner with Flax Collective?",
      answer: "Employers can connect with us to hire trained and job-ready professionals.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  return (
    <>
    
      <section className={`${styles.contactherobg} mt-20 md:mt-28 w-full`}>

        <div className=" relative w-full h-[50vh]">
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className={`${styles.contacthero} text-center max-w-5xl`}>

              <h3 className="text-xl md:text-4xl lg:text-7xl font-semibold leading-16">
                Connect With Experts. Create Better Outcomes.
              </h3>

              <p className=" mt-4 text-dark text-sm md:text-base">
                Have questions, need expert advice, or ready to take the next step?
                We’re here to help. Let’s turn your ideas into impactful solutions.
              </p>

            </div>
          </div>
        </div>


      </section>


      {/* <section className="contact-form py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">


            <div className="md:col-span-7 space-y-6">

              <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#2F3E56] font-medium">
                Contact Us
              </h2>

              <p className="text-gray-600 text-base leading-7">
                For inquiries regarding <strong>certification programs, recruitment opportunities,
                  or employer partnerships ,</strong> please contact the Flax Collective team.
              </p>

              <div className="">
                <p className="text-md flex items-center gap-1">
                  <HiOutlineMail className="text-lg" />
                  info@flaxcollective.com</p>

              </div>


              <div className="flex gap-4">
                <a
                  href="#"
                  className=" flex items-center justify-center rounded-fulle transition group"
                >
                  <FaInstagram className="text-gray-700 text-2xl" />
                </a>
                <a
                  href="#"
                  className=" flex items-center justify-center rounded-full  transition group"
                >
                  <FaFacebook className="text-gray-700  text-2xl" />
                </a>

                <a
                  href="#"
                  className=" flex items-center justify-center rounded-full  transition group"
                >
                  <FaLinkedin className="text-gray-700 text-2xl" />
                </a>

              </div>

              <div className="">
                <h3 className="text-xl text-dark font-medium mb-6">
                  Why Reach Out to Us?
                </h3>

                <ul className="space-y-3 text-base font-medium  text-dark">
                  <li className="flex items-center gap-5">
                    <GoCheckCircleFill  className="text-[#2F3E56] text-2xl" />
                    Expert Consultation Tailored to Your Needs
                  </li>
                  <li className="flex items-center gap-5">
                    <GoCheckCircleFill  className="text-[#2F3E56] text-2xl" />
                    Quick Response & Professional Guidance
                  </li>
                  <li className="flex items-center gap-5">
                    <GoCheckCircleFill  className="text-[#2F3E56] text-2xl" />
                    Trusted by Clients Across Industries
                  </li>
                  <li className="flex items-center gap-5">
                    <GoCheckCircleFill  className="text-[#2F3E56] text-2xl" />
                    End-to-End Support & Solutions
                  </li>
                </ul>
              </div>

            </div>


            <div className="md:col-span-5">

              <div className="bg-[#2F3E56] p-6 md:p-8 rounded-2xl shadow-xl text-white">

                <h2 className="text-base lg:text-xl font-semibold mb-6">
                  Contact Form
                </h2>

                <form className="space-y-4">
                  <label htmlFor="" className=''>Your Full Name</label>

                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full p-3 rounded-lg bg-[#2F3E56] placeholder-gray-300 border border-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                    <label htmlFor="">Email Id</label>
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                   <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <label htmlFor="">Service Required</label>
                  <select className="w-full p-3 rounded-lg bg-white/10 text-gray-300 border border-white/20 focus:outline-none">
                    <option>Service Required</option>
                    <option>Certification Programs</option>
                    <option>Recruitment</option>
                    <option>Employer Partnerships</option>
                  </select>
                  <label htmlFor="#">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Write your message..."
                    className="w-full p-3 rounded-lg bg-white/10 placeholder-gray-300 border border-white/20 focus:outline-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Submit Now
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section> */}

      <HomeContectUs/>




      <section className="contact_faq py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-3xl font-medium text-[#2F3E56]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition"
              >

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>

                  <span className="text-gray-600">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                <div
                  className={`px-5 transition-all duration-300 ${activeIndex === index
                    ? 'max-h-40 py-4 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  )
}