import React from 'react'
import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";

const ForStudentsEmployess = () => {
  return (
    <>
      <div className="getstarted-bg  w-full flex items-center justify-center">

        {/* Card */}
        <div className="getstarted-card">

          {/* Logo */}
          <Link href="/" className="block mb-5 text-center">
            <img
              src="/assets/images/logo/flax-square-logo.png"
              alt="Flax Collective"
              className="getstarted-logo mx-auto"
            />
          </Link>

          {/* Heading */}
          <h2 className="getstarted-heading">
            How would you like to get started?
          </h2>
            <div className="flex flex-col gap-3 w-full">
            <Link href="/auth/onboarding?role=student" className="getstarted-btn">
              I am a Student
            </Link>
            <Link href="/auth/onboarding?role=employee" className="getstarted-btn">
              I am an Employer
            </Link>



          </div>

        </div>
      </div>
    </>
  )
}

export default ForStudentsEmployess