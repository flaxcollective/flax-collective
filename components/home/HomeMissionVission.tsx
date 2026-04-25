"use client";
import "@/app/styles/home/home-mission-vision.css";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { IoDiamondOutline } from "react-icons/io5";

const values = [
    {
        title: "Integrity",
        desc: "We maintain transparency and fairness in every stage of our training and recruitment process.",
    },
    {
        title: "Excellence",
        desc: "We prepare candidates to meet the highest standards of professional service.",
    },
    {
        title: "Opportunity",
        desc: "We believe talented individuals deserve access to global career pathways.",
    },
    {
        title: "Responsibility",
        desc: "We are committed to ethical recruitment practices that protect and empower both candidates and employers.",
    },
    {
        title: "Partnership",
        desc: "We build long-term relationships with institutions, employers, and professionals based on trust and shared growth.",
    },
];

export default function HomeMissionVission() {
    const [valuesOpen, setValuesOpen] = useState(true);

    return (
        <section className="mv-section">
            <div className="mv-container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ">

                  
                       {/* ── CARD ─────────────────────────────────────────── */}
                <div className="mv-card">

                    {/* VISION ROW */}
                    <div className="mv-row">
                        <div className="mv-icon-wrap">
                         
                          <MdRemoveRedEye className="eye-icon" />
                        </div>
                        <div className="mv-row-body">
                            <h3 className="mv-row-title">Our Vision</h3>
                            <p className="mv-row-text">
                               To become a trusted bridge between talent and opportunity, enabling skilled professionals to build global careers while supporting organizations in developing high-performing teams.
                            </p>
                        </div>
                    </div>

                    <div className="mv-divider" />

                    {/* MISSION ROW */}
                    <div className="mv-row">
                        <div className="mv-icon-wrap">
                            <TbTargetArrow className="target-icon" />
                        </div>
                        <div className="mv-row-body">
                            <h3 className="mv-row-title">Our Mission</h3>
                            <p className="mv-row-text">
                                To prepare professionals for international careers through structured training, professional guidance, and responsible recruitment practices while providing employers with access to reliable, job-ready talent.
                            </p>
                        </div>
                    </div>

                    <div className="mv-divider" />

                    {/* VALUES ROW */}
                    <div className="mv-row mv-values-header-row">
                        <div className="mv-icon-wrap mv-icon-wrap--green">
                          <IoDiamondOutline className="diamond-icon" />
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

                <div className="global-page-divider mt-16"></div>

           

               
            </div>
        </section>
    );
}