"use client";
import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="home-hero w-full">
      <img src="/assets/images/home-hero-image.png" alt="Hospitality Professional" className="w-full h-full object-cover absolute top-0 left-0" />
      <div className="home-hero-overlay bg-black/10 absolute inset-0 -z-10"></div>
      <div className="home-hero-content z-10">
        <h1>
          Unlock Global<br />
          Hospitality Potential
        </h1>

        <p className="max-w-2xl text-[16px] leading-[30px] font-medium text-[#E9E9E9] mt-6">
          Flax Collective Is A <strong>Hospitality Talent Development</strong> And <strong>Workforce Solutions Firm Connecting Skilled Professionals</strong> With <strong>Leading Hospitality Employers Globally.</strong>
        </p>
        <div className='hero-btn-sec-1'>
          <Link
            href="/services"
            className="home-hero-btn-services"
          >
            View Services
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.66537 11H18.332M18.332 11L12.832 5.5M18.332 11L12.832 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact-us"
            className="home-hero-btn-program"
          >
            View Programs
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.66537 11H18.332M18.332 11L12.832 5.5M18.332 11L12.832 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className='hero-btn-sec-2'>
          <Link
            href="/services"
            className=""
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="white" strokeLinejoin="round" />
              <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Talent Development</span>
          </Link>
          <Link
            href="/contact-us"
            className=""
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="white" strokeLinejoin="round" />
              <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Training Programs</span>
          </Link>
          <Link
            href="/contact-us"
            className=""
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2M8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43185 2.45672 5.7039C2.75825 4.97595 3.20021 4.31451 3.75736 3.75736C4.31451 3.20021 4.97595 2.75825 5.7039 2.45672C6.43185 2.15519 7.21207 2 8 2M8 14C9.84067 14 10.6273 10.558 10.6273 8C10.6273 5.442 9.84067 2 8 2M8 14C6.15933 14 5.37267 10.558 5.37267 8C5.37267 5.442 6.15933 2 8 2M2.33333 6H13.6667M2.33333 10H13.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>International Hospitality Recruitment</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
