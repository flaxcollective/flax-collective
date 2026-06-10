"use client";
import "@/app/styles/home/home-mission-vision.css";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { IoDiamondOutline } from "react-icons/io5";

const values = [
    {
        title: "Learn with Purpose",
        desc: "We champion learning that is practical, relevant, and transformative.",
    },
    {
        title: "Connect Meaningfully",
        desc: "We foster relationships between education, industry, and opportunity.",
    },
    {
        title: "Pursue Excellence",
        desc: "We strive for quality, professionalism, and continuous improvement in everything we do.",
    },
    {
        title: "Grow Continuously",
        desc: "We encourage curiosity, adaptability, and lifelong development.",
    },
    {
        title: "Create Impact",
        desc: "We measure success by the opportunities, confidence, and outcomes we help create.",
    },
];

export default function HomeMissionVission() {
    const [valuesOpen, setValuesOpen] = useState(true);

    return (
        <section className="mv-section">
            <div className="mv-container max-w-7xl mx-auto pb-10 md:pb-20 px-4 md:px-6 lg:px-8 ">

                  
                       {/* ── CARD ─────────────────────────────────────────── */}
                <div className="mv-card">

                    {/* VISION ROW */}
                    <div className="mv-row">
                        <div className="mv-icon-wrap">
                         
                          <MdRemoveRedEye className="eye-icon" />
                        </div>
                        <div className="mv-row-body">
                            <h3 className="mv-row-title">Vision</h3>
                            <p className="mv-row-text">
                               To create pathways between learning and opportunity by connecting education, industry, and careers.
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
                            <h3 className="mv-row-title">Mission</h3>
                            <p className="mv-row-text">
                             To empower individuals through experiential learning, industry-led programmes, educational guidance, and career opportunities that prepare them for a rapidly evolving world.
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
                            <span className="mv-row-title">Values</span>
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
                                <div key={i} className="mv-value-item ml-6">

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

                {/* <div className="global-page-divider mt-16"></div> */}

           

               
            </div>
        </section>
    );
}