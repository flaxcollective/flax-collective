"use client";


import "@/app/styles/home/home-hero.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect, useRef } from "react";
import Link from "next/link";


export default function HomeHero() {
  return (
    <div className="hero-scroll-wrapper">
      <section className="home-hero sticky top-0 flex items-center overflow-hidden h-screen z-10">
        <div className="home-hero-section max-w-7xl mx-auto w-full">
          <div className="home-hero-flex-container items-center">
            <div className="hero-logo-wrapper">

              <div className="flex justify-center md:justify-start">
                <img
                  id="hero-logo"
                  src="/assets/images/logo/flax-square-logo.png"
                  alt="Flax Collective Logo"
                  className="hero-logo"
                />
              </div>
            </div>
            <div className="home-hero-content text-center md:text-left">
              <h1>Where Learning Meets The Real World</h1>

              <div className="hero-btn-sec-1">
                <Link href="/services" className="home-hero-btn-services cursor-pointer">
                  View Services
                  <FaLongArrowAltRight />
                </Link>

                <Link href="/programs" className="home-hero-btn-program cursor-pointer">
                  View Programs
                  <FaLongArrowAltRight />
                </Link>
              </div>


              <div className="hero-btn-sec-2">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#services")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }}

                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="currentColor" strokeLinejoin="round" />
                    <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Talent Development</span>
                </a>

                <a
                  href="#programs"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#programs")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }}

                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="currentColor" strokeLinejoin="round" />
                    <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Training Programs</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }}
                  className="cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2M8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43185 2.45672 5.7039C2.75825 4.97595 3.20021 4.31451 3.75736 3.75736C4.31451 3.20021 4.97595 2.75825 5.7039 2.45672C6.43185 2.15519 7.21207 2 8 2M8 14C9.84067 14 10.6273 10.558 10.6273 8C10.6273 5.442 9.84067 2 8 2M8 14C6.15933 14 5.37267 10.558 5.37267 8C5.37267 5.442 6.15933 2 8 2M2.33333 6H13.6667M2.33333 10H13.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>International Recruitment Exposer</span>
                </a>
              </div>

              <div className="home-hero-bottom-text">
                <h2>Train. Transform. Thrive</h2>
              </div>
            </div>
          </div>
        </div>


      </section>
    </div>
  );
}