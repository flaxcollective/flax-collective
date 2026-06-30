"use client";


import "@/app/styles/home/home-hero.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";


export default function HomeHero() {
  return (
    <div className="hero-scroll-wrapper">
      <section className="home-hero sticky top-0 flex items-center z-10">
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
                  <span>Flexible Learning</span>
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
                    <path d="M7.00033 11.6667L4.33366 9.00002M7.00033 11.6667L8.66699 13.3334L9.18499 12.93C9.37166 12.7847 9.54566 12.6187 9.66166 12.412C9.88375 12.0145 10.0003 11.5667 10.0003 11.1114V9.33335M4.33366 9.00002L5.62966 7.33335L6.66699 6.00002L7.68899 4.63669C8.90099 3.02069 11.3463 2.30535 13.3337 2.66669C13.695 4.65335 12.9797 7.09869 11.3637 8.31135L10.0003 9.33335L8.66699 10.3707L7.00033 11.6667M4.33366 9.00002L2.66699 7.33335L3.06966 6.81535C3.21566 6.62869 3.38166 6.45469 3.58833 6.33869C3.98585 6.1166 4.43363 6.00001 4.88899 6.00002H6.66699M5.00033 12.6667L2.66699 13.3334L3.44433 11M10.3337 6.33335C10.5105 6.33335 10.68 6.26312 10.8051 6.13809C10.9301 6.01307 11.0003 5.8435 11.0003 5.66669C11.0003 5.48988 10.9301 5.32031 10.8051 5.19528C10.68 5.07026 10.5105 5.00002 10.3337 5.00002C10.1568 5.00002 9.98728 5.07026 9.86225 5.19528C9.73723 5.32031 9.66699 5.48988 9.66699 5.66669C9.66699 5.8435 9.73723 6.01307 9.86225 6.13809C9.98728 6.26312 10.1568 6.33335 10.3337 6.33335Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs">Career Advancement</span>
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
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 6C6.5 6.13261 6.44732 6.25979 6.35355 6.35355C6.25979 6.44732 6.13261 6.5 6 6.5H3C2.86739 6.5 2.74021 6.44732 2.64645 6.35355C2.55268 6.25979 2.5 6.13261 2.5 6C2.5 5.86739 2.55268 5.74021 2.64645 5.64645C2.74021 5.55268 2.86739 5.5 3 5.5H6C6.13261 5.5 6.25979 5.55268 6.35355 5.64645C6.44732 5.74021 6.5 5.86739 6.5 6ZM6 3.5H3C2.86739 3.5 2.74021 3.55268 2.64645 3.64645C2.55268 3.74021 2.5 3.86739 2.5 4C2.5 4.13261 2.55268 4.25979 2.64645 4.35355C2.74021 4.44732 2.86739 4.5 3 4.5H6C6.13261 4.5 6.25979 4.44732 6.35355 4.35355C6.44732 4.25979 6.5 4.13261 6.5 4C6.5 3.86739 6.44732 3.74021 6.35355 3.64645C6.25979 3.55268 6.13261 3.5 6 3.5ZM13 7.59188V11.5C13.0008 11.5881 12.9783 11.6749 12.9347 11.7516C12.8911 11.8282 12.8281 11.892 12.752 11.9364C12.6758 11.9808 12.5893 12.0043 12.5011 12.0045C12.413 12.0047 12.3263 11.9816 12.25 11.9375L10.75 11.0787L9.25 11.9375C9.17366 11.9816 9.08702 12.0047 8.99887 12.0045C8.91072 12.0043 8.82419 11.9808 8.74804 11.9364C8.6719 11.892 8.60885 11.8282 8.56529 11.7516C8.52173 11.6749 8.49921 11.5881 8.5 11.5V10H1C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H12C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V2.90812C13.3161 3.2108 13.5676 3.57433 13.7394 3.97681C13.9113 4.37928 13.9999 4.81238 13.9999 5.25C13.9999 5.68762 13.9113 6.12072 13.7394 6.5232C13.5676 6.92567 13.3161 7.2892 13 7.59188ZM8.5 9V7.59188C7.95513 7.06639 7.61078 6.3672 7.52637 5.61495C7.44196 4.86269 7.62278 4.10457 8.03764 3.4714C8.45249 2.83822 9.07535 2.36972 9.79874 2.14674C10.5221 1.92376 11.3007 1.96028 12 2.25V1H1V9H8.5ZM12 8.25C11.604 8.41544 11.1791 8.50063 10.75 8.50063C10.3209 8.50063 9.89598 8.41544 9.5 8.25V10.6388L10.5 10.0662C10.5756 10.0231 10.6611 10.0003 10.7481 10.0003C10.8352 10.0003 10.9207 10.0231 10.9963 10.0662L11.9963 10.6388L12 8.25ZM13 5.25C13 4.80499 12.868 4.36998 12.6208 3.99997C12.3736 3.62996 12.0222 3.34157 11.611 3.17127C11.1999 3.00097 10.7475 2.95642 10.311 3.04323C9.87459 3.13005 9.47368 3.34434 9.15901 3.65901C8.84434 3.97368 8.63005 4.37459 8.54323 4.81105C8.45642 5.2475 8.50097 5.6999 8.67127 6.11104C8.84157 6.52217 9.12996 6.87357 9.49997 7.12081C9.86998 7.36804 10.305 7.5 10.75 7.5C11.0455 7.5 11.3381 7.4418 11.611 7.32873C11.884 7.21566 12.1321 7.04992 12.341 6.84099C12.5499 6.63206 12.7157 6.38402 12.8287 6.11104C12.9418 5.83805 13 5.54547 13 5.25Z" fill="white" />
                  </svg>
                  <span>Professional Certifications</span>
                </a>
              </div>

              <div className="home-hero-bottom-text">
                <h2>Learn . Grow . Belong </h2>
              </div>
            </div>
          </div>
        </div>


      </section>
    </div>
  );
}