"use client";
import "@/app/styles/home/home-mission-vision.css";
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

                     {/* ── CERTIFICATION PROGRAMS ──────────────────────── */}
                


             

                {/* ── CARD ─────────────────────────────────────────── */}
                <div className="mv-card mt-30">

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

                <div className="global-page-divider mt-14"></div>

           

               
            </div>
        </section>
    );
}