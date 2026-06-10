"use client";

import React , {useState} from "react";

import {
  Mail,
  Phone,
  BookOpen,
  User,
  Calendar,
  Camera,
  Pencil,
  Lock,
  LockIcon,
} from "lucide-react";



export default function ProfileEditCard() {
  const [showSecurity, setShowSecurity] = useState(false);
  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-base md:text-3xl font-semibold text-text-dark">
          Profile Settings
        </h1>

        <p className="text-xs md:text-base text-text-body mt-1">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7.5">

        {/* LEFT CARD */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          {/* Avatar */}
          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src="/assets/images/dashboard/user-profile.jpg"
                alt="profile"
                className="w-16 h-16 md:w-35 md:h-35 rounded-full object-cover"
              />

              <button className="absolute  bottom-0 md:bottom-1 right-0 md:right-1 bg-text-body border-2 border-white rounded-full p-2 hover:bg-text-body transition">
                <Camera className="w-2 h-2 md:w-4 md:h-4 text-white" />
              </button>

            </div>

            <h2 className=" mt-2 md:mt-4 text-base md:text-2xl font-semibold text-text-dark">
              Anshuman Negi
            </h2>

            <p className="text-text-body text-base mt-1">
              Student
            </p>

            <div className="mt-2 md:mt-4 px-4 py-1 rounded-full bg-[#cbfcc8] text-text-dark text-sm font-medium">
              • Active Learner
            </div>

          </div>



          {/* Preview */}
          <div>

            <h3 className="text-base md:text-lg pt-3 md:pt-7 font-semibold text-[#1F1F1F]">
              User Preview
            </h3>

            <p className="text-sm text-gray-500 mt-1.5">
              Review The Generated User Account Details
            </p>
            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>
            <div className="mt-6 space-y-5">

              {/* Email */}
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-1 md:gap-3">
                  <Mail className="w-4 h-4 text-text-dark" />
                  <span className="text-sm font-medium ">
                    Email
                  </span>
                </div>

                <span className="text-xs md:text-sm text-text-dark text-right">
                  anshumannegi@flaxcollective.com
                </span>

              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-cente gap-1 md:gap-3">
                  <Phone className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">
                    Phone
                  </span>
                </div>

                <span className="text-xs md:text-sm text-text-dark">
                  +91 98765 43210
                </span>

              </div>

              {/* Course */}
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-1 md:gap-3">
                  <BookOpen className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">
                    Course
                  </span>
                </div>

                <span className="text-xs md:text-sm text-text-dark">
                  HPF
                </span>

              </div>

              {/* Role */}
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-1 md:gap-3">
                  <User className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">
                    Role
                  </span>
                </div>

                <span className="text-xs md:text-sm text-gray-600">
                  Student
                </span>

              </div>

              {/* Date */}
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-1 md:gap-3">
                  <Calendar className="w-4 h-4 text-text-dark" />
                  <span className="text-sm font-medium">
                    Start Date
                  </span>
                </div>

                <span className="text-xs md:text-sm text-gray-600">
                  15 May 2025
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT CARD */}
        {!showSecurity ? (

        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          {/* Top */}
          <div className="flex items-center justify-between mb-2 md:mb-8">

            <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">
              Personal Information
            </h2>



          </div>


          <div className="space-y-6">

            {/* Personal Details */}
            <div className="pt-2 md:pt-4 space-y-5">

              {/* Date of Birth */}
              <div>
                <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-text-dark  text-xs md:text-xl font-semibold mb-2">
                  Gender
                </label>

                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Alternative Mobile Number */}
              <div>
                <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                  Alternative Mobile Number
                </label>

                <input
                  type="text"
                  placeholder="Enter alternative mobile number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                  Address
                </label>

                <textarea
                  rows={1}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                />
              </div>

              {/* Account Security */}
              <div className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] mb-4">
                  Account Security
                </h2>

                {/* Password */}
                <div>
                  <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                  />

                  <div className="flex justify-self-start mt-2">
                    <button
                    onClick={() => setShowSecurity(true)}
                    className="text-sm font-medium text-[#334155] hover:underline">
                     Forgotten Your Password? <span className="font-bold">Reset</span> 
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>


        ):(


        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          {/* Top */}
          <div className="flex items-center justify-between mb-2 md:mb-8">

            <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">
              Account Security
            </h2>



          </div>
          <p className="text-xs md:text-base text-text-body">Your password must be at least 6 Characters and should include a combination of numbers, letters and special characters (!$@%)</p>


          <div className="space-y-6">

            {/* Security */}
            <div className="pt-4 space-y-4">

              <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                Current Password
              </label>

              <div className="relative flex items-center w-full">
                <Lock className="absolute left-4 w-5 h-5 text-gray-500" />

                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                  placeholder="updated on 09/09/2025"
                />
              </div>


              <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                New Password
              </label>

              <div className="relative flex items-center w-full">
                <Lock className="absolute left-4 w-5 h-5 text-gray-500" />

                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                  placeholder="updated on 09/09/2025"
                />
              </div>



              <label className="block text-text-dark text-xs md:text-xl font-semibold mb-2">
                Retype Password
              </label>

              <div className="relative flex items-center w-full">
                <Lock className="absolute left-4 w-5 h-5 text-gray-500" />

                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                  placeholder="updated on 09/09/2025"
                />
              </div>

              <button className="bg-[#334155] w-full mt-2 md:mt-6 hover:bg-[#1E293B] text-white px-8 py-3 rounded-xl font-medium transition">
                Change password
              </button>

            </div>

          </div>

        </div>

        )}

      </div>



    </div>
  );
}