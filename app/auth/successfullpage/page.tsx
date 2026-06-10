import React from 'react'
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";

const SuccessFullpage = () => {
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
                       Profile Created Successfully
                    </h2>
                    <p className='text-center onboarding-para'>Your account has been created successfully. Let’s get started.</p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 w-full">
                        <Link href="/auth/login" className="getstarted-btn">
                           Get Started
                        </Link>
                       
                    </div>

                </div>
            </div>
            
            </>
  )
}

export default SuccessFullpage