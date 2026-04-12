"use client";
import "@/app/styles/home/home-hero.css";
export default function HomeHero() {
  return (
    <section className="home-hero w-full">
      <div className="home-hero-container">
        <div className="home-hero-top">
          {/* LEFT: Content */}
          <div className="home-hero-content">
            <h1>
              Where Learning<br />
              Meets The Real World
            </h1>

            <p className="home-hero-desc">
              Flax Collective is a{" "}
              <strong>hospitality talent development</strong> and workforce
              solutions firm connecting skilled professionals with{" "}
              <strong>leading hospitality employers</strong> globally.
            </p>

            {/* CTA Buttons */}
            <div className="hero-btn-sec-1">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="home-hero-btn-services cursor-pointer"
              >
                View Services
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66537 11H18.332M18.332 11L12.832 5.5M18.332 11L12.832 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#programs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="home-hero-btn-program cursor-pointer"
              >
                View Programs
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66537 11H18.332M18.332 11L12.832 5.5M18.332 11L12.832 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Tag Pills */}
            <div className="hero-btn-sec-2">
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="currentColor" strokeLinejoin="round" />
                  <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Talent Development</span>
              </a>

              <a
                href="#programs"
                onClick={(e) => { e.preventDefault(); document.querySelector("#programs")?.scrollIntoView({ behavior: "smooth" }); }}
                className="cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.666016 5.8L7.67335 3L14.6807 5.8L7.67335 8.6L0.666016 5.8Z" stroke="currentColor" strokeLinejoin="round" />
                  <path d="M14.6809 5.83691V8.91125M3.85156 7.27525V11.4226C3.85156 11.4226 5.4549 13.0002 7.67356 13.0002C9.89256 13.0002 11.4959 11.4226 11.4959 11.4226V7.27525" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Training Programs</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2M8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43185 2.45672 5.7039C2.75825 4.97595 3.20021 4.31451 3.75736 3.75736C4.31451 3.20021 4.97595 2.75825 5.7039 2.45672C6.43185 2.15519 7.21207 2 8 2M8 14C9.84067 14 10.6273 10.558 10.6273 8C10.6273 5.442 9.84067 2 8 2M8 14C6.15933 14 5.37267 10.558 5.37267 8C5.37267 5.442 6.15933 2 8 2M2.33333 6H13.6667M2.33333 10H13.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>International Hospitality Recruitment</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Hero image (desktop) */}
          <div className="home-hero-image-wrap">
            <img
              src="/assets/images/home-hero-image.png"
              alt="Hospitality Professional"
              className="home-hero-desktop-img"
            />
          </div>

        </div>

        <div className="home-hero-bottom-text">
          <p>
            Flax combines <strong>career counselling</strong>, <strong>industry-focused certification programs</strong>, <strong>professional workshops</strong>, and <strong>structured recruitment processes</strong> to prepare candidates for successful careers in international hospitality environments.
          </p>
          <p>
            For employers, we provide access to <strong>professionally trained and pre-screened hospitality talent</strong>, ensuring confident hiring through a transparent <strong>pay-after-joining placement model.</strong>
          </p>


        </div>

        <div className="global-page-divider w-full mt-14"></div>
      </div>

    </section>
  );
}