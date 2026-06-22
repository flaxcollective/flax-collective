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
      answer: "Where learning meets opportunity. Flax Collective brings together learning, industry, and community.Through thoughtfully designed experiences and meaningful connections, we help individuals develop practical skills, broaden their perspectives, and discover new possibilities. At Flax, we believe growth happens when people are given the opportunity to learn, connect, and belong.",
    },
    {
      question: "Who can apply as a candidate?",
      answer: "Students, graduates, and professionals can apply for global opportunities.",
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

      <section className={`${styles.contactherobg} mt-25 md:mt-28 w-full`}>

        <div className=" relative w-full h-40 md:h-[50vh]">
          <div className="relative z-10 flex items-center justify-center h-48 md:h-full px-0 md:px-4">
            <div className={`${styles.contacthero} max-w-7xl mx-auto px-4 sm:px-6 text-center`}>

              <h3 className="text-xl md:text-5xl lg:text-7xl font-normal text-left md:text-center max-w-4xl mx-auto leading-8 md:leading-24">
                Connect With Experts. Create Better Outcomes.
              </h3>

              <p className=" mt-4 text-dark text-left md:text-center text-xs leading-6 md:leading-9 md:text-base">
                Have questions, need expert advice, or ready to take the next step? <br />Connect with our team and let’s turn your ideas into impactful solutions.
              </p>

            </div>
          </div>
        </div>


      </section>




      <HomeContectUs />




      <section className="contact_faq py-7.5 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <div className="mb-6 md;mb-12">
            <h2 className="text-xl lg:text-3xl font-medium text-navy">
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
                  className={`w-full flex items-center cursor-pointer justify-between text-left hover:bg-gray-50 transition-all duration-300 ${activeIndex === index ? 'pb-0 pt-5 px-5' : 'p-5'
                    }`}
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