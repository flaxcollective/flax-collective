import React from 'react'
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";

const Onboardingpage = () => {
    return (
        <>
            <div className="getstarted-bg  w-full flex items-center justify-center">

                {/* Card */}
                <div className="getstarted-card">

                    {/* Logo */}
                    <Link href="/" className="block mb-7 text-center">
                        <img
                            src="/assets/images/logo/flax-square-logo.png"
                            alt="Flax Collective"
                            className="getstarted-logo mx-auto"
                        />
                    </Link>

                    {/* Heading */}
                    <h2 className="onboarding-heading">
                        Step Into the World of Refined Hospitality Careers
                    </h2>
                    <p className='text-center onboarding-para'>Flax Collective prepares and connects aspiring professionals with global hospitality opportunities through structured training and industry-focused development.</p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 w-full">
                        <Link href="/auth/signup?role=student" className="getstarted-btn">
                            Sign Up as Student
                        </Link>

                        <Link href="/auth/signup?role=employee" className="getstarted-btn">
                            Sign Up as Employee  
                        </Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Onboardingpage