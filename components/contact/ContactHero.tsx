<<<<<<< HEAD
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
      answer: "Flax Collective is a global talent development and recruitment consultancy connecting skilled professionals with leading employers worldwide.",
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

              <h3 className="text-xl md:text-5xl lg:text-7xl font-normal text-left md:text-center leading-8 md:leading-24">
                Connect With Experts. Create Better Outcomes.
              </h3>

              <p className=" mt-4 text-dark text-left md:text-center text-xs leading-6 md:leading-9 md:text-base">
                Have questions, need expert advice, or ready to take the next step? We’re here to help. Connect with our team and let’s turn your ideas into impactful solutions.
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
                  className={`w-full flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-300 ${activeIndex === index ? 'pb-0 pt-5 px-5' : 'p-5'
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
=======
export default function ContactHero() {
  return (
    <section className="mt-[72px] relative w-full min-h-[55vh] bg-[#1e2d3d] overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/assets/icons/hero-contact.png" alt="Contact Us" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#1e2d3d]/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-20">
        <p className="text-[#a8b87a] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-snug">
          Connect With Experts.<br />Create Better Outcomes.
        </h1>
        <p className="text-white/70 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto">
          Have Questions, Need Expert Advice, Or Ready To Take The Next Step? We&apos;re Here To Help. Connect With Our Team And Let&apos;s Turn Your Ideas Into Impactful Solutions.
        </p>
        <a href="#contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#6b7847] text-white text-[13px] font-bold rounded-full hover:bg-[#6b7847] transition-colors">
          Get In Touch <span>→</span>
        </a>
      </div>
    </section>
  );
}
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
