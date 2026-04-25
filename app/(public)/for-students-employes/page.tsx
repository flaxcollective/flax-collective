import Link from "next/link";
import "@/app/styles/auth/GetStarted.css";

export default function GetStartedPage() {
  return (
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
        <h2 className="getstarted-heading">
          How would you like to get started?
        </h2>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link href="/for-students" className="getstarted-btn">
            I am a Student
          </Link>
          <Link href="/for-employers" className="getstarted-btn">
            I am an Employer
          </Link>
        </div>

      </div>
    </div>
  );
}