"use client";

import { useState } from "react";

const values = [
    {
        title: "Integrity",
        desc: "We Maintain Transparency And Fairness In Every Stage Of Our Training And Recruitment Process.",
    },
    {
        title: "Excellence",
        desc: "We Prepare Candidates To Meet The Highest Standards Of Professional Hospitality Service.",
    },
    {
        title: "Opportunity",
        desc: "We Believe Talented Individuals Deserve Access To Global Career Pathways.",
    },
    {
        title: "Responsibility",
        desc: "We Are Committed To Ethical Recruitment Practices That Protect And Empower Both Candidates And Employers.",
    },
    {
        title: "Partnership",
        desc: "We Build Long-Term Relationships With Institutions, Employers, And Professionals Based On Trust And Shared Growth.",
    },
];

export default function HomeMissionVission() {
    const [valuesOpen, setValuesOpen] = useState(true);

    return (
        <section className="mv-section">
            <div className="mv-container">
                {/* ── HEADER ────────────────────────────────────────── */}
                <div className="mv-header">
                    <h2 className="mv-heading">Our Mission, Vision &amp; Values</h2>
                    <p className="mv-subtext">
                        Across The World, Many Talented Hospitality Graduates Possess The
                        Passion And Potential To Succeed On The Global Stage. At The Same
                        Time, Hospitality Organizations Continue To Seek Professionals Who
                        Are Not Only Qualified, But Truly Prepared To Deliver World-Class
                        Service. Flax Collective Was Founded To Thoughtfully Bridge This Gap.
                    </p>
                </div>

                {/* ── CARD ─────────────────────────────────────────── */}
                <div className="mv-card">

                    {/* VISION ROW */}
                    <div className="mv-row">
                        <div className="mv-icon-wrap">
                            {/* Eye icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                width="26" height="26">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>
                        <div className="mv-row-body">
                            <h3 className="mv-row-title">Our Vision</h3>
                            <p className="mv-row-text">
                                To Become A Trusted Bridge Between Hospitality Talent And International Opportunity,
                                Enabling Skilled Professionals To Build Global Careers While Supporting Organizations
                                In Developing High-Performing Hospitality Teams.
                            </p>
                        </div>
                    </div>

                    <div className="mv-divider" />

                    {/* MISSION ROW */}
                    <div className="mv-row">
                        <div className="mv-icon-wrap">
                            {/* Target icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                width="26" height="26">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                                <line x1="12" y1="2" x2="12" y2="5" />
                                <line x1="12" y1="19" x2="12" y2="22" />
                                <line x1="2" y1="12" x2="5" y2="12" />
                                <line x1="19" y1="12" x2="22" y2="12" />
                            </svg>
                        </div>
                        <div className="mv-row-body">
                            <h3 className="mv-row-title">Our Mission</h3>
                            <p className="mv-row-text">
                                To Prepare Hospitality Professionals For International Careers Through Structured
                                Training, Professional Guidance, And Responsible Recruitment Practices While
                                Providing Employers With Access To Reliable, Job-Ready Talent.
                            </p>
                        </div>
                    </div>

                    <div className="mv-divider" />

                    {/* VALUES ROW */}
                    <div className="mv-row mv-values-header-row">
                        <div className="mv-icon-wrap mv-icon-wrap--green">
                            {/* Diamond icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                width="26" height="26">
                                <path d="M6 3h12l4 6-10 13L2 9z" />
                                <path d="M2 9h20" />
                                <path d="M6 3l4 6m8-6l-4 6" />
                            </svg>
                        </div>
                        <button
                            className="mv-values-toggle"
                            onClick={() => setValuesOpen((o) => !o)}
                            aria-expanded={valuesOpen}
                        >
                            <span className="mv-row-title">Our Values</span>
                            <svg
                                className={`mv-chevron ${valuesOpen ? "mv-chevron--open" : ""}`}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                width="18" height="18">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                    </div>

                    {/* VALUES TIMELINE */}
                    {valuesOpen && (
                        <div className="mv-values-list">
                            {values.map((v, i) => (
                                <div key={i} className="mv-value-item ml-10">

                                    {/* Content */}
                                    <div className="mv-value-content">
                                        <span className="mv-value-title">{v.title}</span>
                                          {/* Timeline track */}
                                    <div className="mv-value-track">
                                        <div className="mv-value-dot" />
                                        {i < values.length - 1 && <div className="mv-value-line" />}
                                    </div>
                                        <p className="mv-value-desc">{v.desc}</p>
                                    </div>
                                  
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* ── CERTIFICATION PROGRAMS ──────────────────────── */}
                <div className="cp-section">
                    <h2 className="cp-heading">Certification Programs</h2>
                    <p className="cp-text">
                        Flax Collective Offers <strong>Online Certification Programs Designed To Prepare Aspiring Professionals For International Hospitality Careers.</strong>
                    </p>
                    <p className="cp-text">
                        These Programs Focus On Building The Practical Knowledge, Communication Skills, And Professional Confidence Required In Global Hospitality Environments.
                    </p>
                    <p className="cp-text">
                        Our Certification Courses Are Developed To Align With The Expectations Of International Hospitality Employers And Help Participants Strengthen Their Professional Profiles Before Pursuing Placement Opportunities.
                    </p>

                    <p className="cp-areas-label">Key Areas Of Learning</p>

                    <div className="cp-areas-grid">
                        {/* Guest Service Excellence */}
                        <div className="cp-area-card">
                            <span className="cp-area-icon">
                                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.4167 24.7083L16.6667 21.5417L21.9167 24.75L20.5417 18.75L25.1667 14.75L19.0833 14.2083L16.6667 8.54167L14.25 14.1667L8.16667 14.7083L12.7917 18.75L11.4167 24.7083ZM6.375 31.6667L9.08333 19.9583L0 12.0833L12 11.0417L16.6667 0L21.3333 11.0417L33.3333 12.0833L24.25 19.9583L26.9583 31.6667L16.6667 25.4583L6.375 31.6667Z" fill="#6E7C3A"/>
                                </svg>
                            </span>
                            <p className="cp-area-label">Guest Service Excellence</p>
                        </div>

                        {/* Hospitality Operations Fundamentals */}
                        <div className="cp-area-card">
                            <span className="cp-area-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.99935 31.667V9.50035C4.99925 9.15823 5.10443 8.82436 5.30063 8.54408C5.49682 8.2638 5.77452 8.05069 6.09602 7.93369L22.2144 2.07369C22.3403 2.02786 22.4754 2.01308 22.6082 2.03058C22.741 2.04808 22.8677 2.09735 22.9774 2.17422C23.0872 2.25109 23.1768 2.35329 23.2386 2.47215C23.3005 2.59101 23.3327 2.72303 23.3327 2.85702V11.112L33.8594 14.6204C34.1914 14.7309 34.4801 14.9432 34.6848 15.2271C34.8894 15.511 34.9994 15.8521 34.9994 16.202V31.667H38.3327V35.0004H1.66602V31.667H4.99935ZM8.33268 31.667H19.9993V6.42535L8.33268 10.6687V31.667ZM31.666 31.667V17.4037L23.3327 14.6254V31.667H31.666Z" fill="#6E7C3A"/>
                                </svg>
                            </span>
                            <p className="cp-area-label">Hospitality Operations Fundamentals</p>
                        </div>

                        {/* Professional Communication In Hospitality */}
                        <div className="cp-area-card">
                            <span className="cp-area-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 15.0013H26.6667M13.3333 21.668H23.3333M30 6.66797C31.3261 6.66797 32.5979 7.19475 33.5355 8.13244C34.4732 9.07012 35 10.3419 35 11.668V25.0013C35 26.3274 34.4732 27.5992 33.5355 28.5368C32.5979 29.4745 31.3261 30.0013 30 30.0013H21.6667L13.3333 35.0013V30.0013H10C8.67392 30.0013 7.40215 29.4745 6.46447 28.5368C5.52678 27.5992 5 26.3274 5 25.0013V11.668C5 10.3419 5.52678 9.07012 6.46447 8.13244C7.40215 7.19475 8.67392 6.66797 10 6.66797H30Z" stroke="#6E7C3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <p className="cp-area-label">Professional Communication In Hospitality</p>
                        </div>

                        {/* Workplace Professionalism And Etiquette */}
                        <div className="cp-area-card">
                            <span className="cp-area-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 13.3346V10.0013C25 9.11725 24.6488 8.2694 24.0237 7.64428C23.3986 7.01916 22.5507 6.66797 21.6667 6.66797H18.3333C17.4493 6.66797 16.6014 7.01916 15.9763 7.64428C15.3512 8.2694 15 9.11725 15 10.0013V13.3346M25 13.3346H31.6667C32.5507 13.3346 33.3986 13.6858 34.0237 14.3109C34.6488 14.9361 35 15.7839 35 16.668V21.668M25 13.3346H15M15 13.3346H8.33333C7.44928 13.3346 6.60143 13.6858 5.97631 14.3109C5.35119 14.9361 5 15.7839 5 16.668V21.668M35 21.668V30.0013C35 30.8854 34.6488 31.7332 34.0237 32.3583C33.3986 32.9834 32.5507 33.3346 31.6667 33.3346H8.33333C7.44928 33.3346 6.60143 32.9834 5.97631 32.3583C5.35119 31.7332 5 30.8854 5 30.0013V21.668M35 21.668H23.3333M5 21.668H16.6667M16.6667 21.668V18.3346H23.3333V21.668M16.6667 21.668V25.0013H23.3333V21.668" stroke="#6E7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <p className="cp-area-label">Workplace Professionalism And Etiquette</p>
                        </div>

                        {/* Cultural Readiness For International Work Environments */}
                        <div className="cp-area-card">
                            <span className="cp-area-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 3.75C11.0258 3.75 3.75 11.0258 3.75 20C3.75 28.9742 11.0258 36.25 20 36.25C28.9742 36.25 36.25 28.9742 36.25 20C36.25 11.0258 28.9742 3.75 20 3.75Z" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10"/>
                                    <path d="M19.9996 3.75C15.4629 3.75 11.1973 11.0258 11.1973 20C11.1973 28.9742 15.4629 36.25 19.9996 36.25C24.5363 36.25 28.802 28.9742 28.802 20C28.802 11.0258 24.5363 3.75 19.9996 3.75Z" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10"/>
                                    <path d="M9.16602 9.16602C12.1535 11.2871 15.9145 12.552 19.9996 12.552C24.0848 12.552 27.8457 11.2871 30.8332 9.16602M30.8332 30.8332C27.8457 28.7121 24.0848 27.4473 19.9996 27.4473C15.9145 27.4473 12.1535 28.7121 9.16602 30.8332" stroke="#6E7C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20 3.75V36.25M36.25 20H3.75" stroke="#6E7C3A" strokeWidth="2" strokeMiterlimit="10"/>
                                </svg>
                            </span>
                            <p className="cp-area-label">Cultural Readiness For International Work Environments</p>
                        </div>
                    </div>

                    <p className="cp-text cp-text--small">
                        Courses Are Delivered Through <strong>Online Learning Modules And Interactive Sessions,</strong> Allowing Participants From Different Locations To Develop Industry-Relevant Skills While Preparing For International Hospitality Roles.
                    </p>
                </div>

                {/* ── FOR STUDENTS ────────────────────────────────── */}
                <div className="cp-section">
                    <h2 className="cp-heading">For Students</h2>
                    <p className="cp-text">
                        Flax Collective Provides A Structured Pathway For Students And Hospitality Graduates Who Aspire To Build Careers In International Hospitality Markets. Our Program Is Designed To Guide Candidates Through Professional Preparation Before Introducing Them To Employment Opportunities.
                    </p>

                    <div className="fs-steps-grid">

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/document 2.png" alt="Application" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Initial Application And Profile Review</p>
                        </div>

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/communications 2.png" alt="Counselling" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Career Counselling And Professional Guidance</p>
                        </div>

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/certificate 2.png" alt="Certification" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Enrollment In Certification Or Training Programs Where Required</p>
                        </div>

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/settings (1) 1.png" alt="Workshops" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Participation In Skill Development Workshops</p>
                        </div>

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/briefcase 1.png" alt="Screening" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Candidate Screening And Interview Preparation</p>
                        </div>

                        <div className="fs-step-card">
                            <span className="fs-step-icon">
                                <img src="/assets/icons/buildings 1.png" alt="Employers" width={36} height={36} />
                            </span>
                            <p className="fs-step-label">Introduction To Potential Hospitality Employers</p>
                        </div>

                    </div>

                    <p className="cp-text cp-text--small">
                        Our Goal Is To Help Aspiring Professionals Develop The <strong>Skills, Confidence, And Industry Awareness Required To Succeed In Global Hospitality Environments.</strong>
                    </p>
                </div>

                {/* ── FOR EMPLOYERS ───────────────────────────────── */}
                <div className="cp-section">
                    <h2 className="cp-heading">For Employers</h2>
                    <p className="cp-text">
                        Flax Collective Supports Hospitality Organizations By Providing Access To <strong>Trained And Pre-Screened Professionals Prepared For International Service Environments.</strong>
                    </p>
                    <p className="cp-text">
                        Through Our Structured Preparation And Evaluation Process, Employers Receive Candidates Who Are Ready To Integrate Into Hospitality Operations And Contribute To Guest Experience Excellence.
                    </p>

                    <div className="fe-gallery">
                        {[
                            { src: "/assets/images/for-employers-img-1.png", label: "Front Office Associates" },
                            { src: "/assets/images/for-employers-img-2.png", label: "Guest Relations Executives" },
                            { src: "/assets/images/for-employers-img-3.png", label: "Food & Beverage Service Staff" },
                            { src: "/assets/images/for-employers-img-4.png", label: "Hospitality Management Trainees" },
                            { src: "/assets/images/for-employers-img-5.png", label: "Housekeeping Operations Staff" },
                            { src: "/assets/images/for-employers-img-6.png", label: "Customer Service Professionals" },
                        ].map((img, i) => (
                            <div key={i} className="fe-gallery-item">
                                <img src={img.src} alt={img.label} className="fe-gallery-img" />
                                <span className="fe-gallery-label">{img.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="fe-recruitment">
                        <h3 className="fe-recruitment-heading">Recruitment Approach</h3>
                        <p className="cp-text">
                            Candidates Are Introduced Only After Undergoing <strong>Professional Development, Screening, And Evaluation,</strong> Ensuring Alignment With Employer Expectations.
                        </p>
                        <p className="cp-text">
                            Our <strong>Pay-After-Joining Recruitment Model</strong> Allows Organizations To Engage With Confidence, Knowing That Placement Fees Are Applied Only After A Candidate Successfully Joins The Team.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}