import React from 'react'
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";

const AuthLandingpage = () => {
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
                    <h2 className="text-xl md:text-2xl pb-2.5 text-[#202020] font-semibold text-center">
                        Shaping World-Class Hospitality Professionals
                    </h2>

                    {/* Buttons */}
                    <div className="text-center gap-3 w-full">
                        <Link href="#" className='text-base font-medium'>
                            Sign in or create an account to begin your journey.
                        </Link>

                    </div>

                </div>
            </div>

        </>

    )
}

export default AuthLandingpage