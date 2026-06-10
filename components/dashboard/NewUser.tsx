import React from "react";
import {
    User,
    BookOpen,
    Phone,
    Lock,
    Mail,
    Calendar,
    Eye,

} from "lucide-react";
import { LuUserRoundPlus } from "react-icons/lu";
import {
    FiMail,
    FiPhone,
    FiBookOpen,
    FiBriefcase,
    FiCalendar,
    FiEyeOff,
    FiLock,
} from "react-icons/fi";

export default function NewUser() {
    return (
        <div className="">

            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
                <div className=" hidden w-16 h-16 rounded-xl bg-navy md:flex items-center justify-center">
                    <LuUserRoundPlus className="text-white w-9 h-9" />
                </div>

                <div>
                    <h1 className="text-base md:text-3xl font-bold text-text-dark">
                        Add New User
                    </h1>
                    <p className="text-text-body text-sm">
                        Create a new user account and assign course access.
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Left Form */}
                <div className="xl:col-span-8 bg-white border border-[#B3B3B3] rounded-3xl  p-3 md:p-6 shadow-sm">

                    {/* Personal Details */}
                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10   md:w-15 md:h-15 rounded-full bg-[#334155] flex items-center justify-center">
                                <User className="text-white w-4 h-4 md:w-7.5 md:h-7.5" />
                            </div>

                            <h2 className="text-2xl font-semibold text-[#1F1F1F]">
                                Personal Details
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <Phone className="absolute left-4 top-4 w-4 h-4 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Enter Phone Number"
                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Course Selection */}
                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 md:w-15 md:h-15 rounded-full bg-navy flex items-center justify-center">
                                <BookOpen className="text-white w-4 h-4 md:w-7.5 md:h-7.5" />
                            </div>

                            <h2 className="text-2xl font-semibold text-[#1F1F1F]">
                                Course Selection
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Course
                                </label>

                                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]">
                                    <option>Select Course</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Role
                                </label>

                                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]">
                                    <option>Select Role</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Start Date
                                </label>

                                <div className="relative">
                                    <Calendar className="absolute left-4 top-4 w-4 h-4 text-gray-400" />

                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-8">

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10   md:w-15 md:h-15 rounded-full bg-navy flex items-center justify-center">
                                <Phone className="text-white w-4 h-4 md:w-7.5 md:h-7.5" />
                            </div>

                            <h2 className="text-2xl font-semibold text-[#1F1F1F]">
                                Contact Information
                            </h2>
                        </div>

                        <div>
                            <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Login Credentials */}
                    <div>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 md:w-15 md:h-15 rounded-full bg-navy flex items-center justify-center">
                                <Lock className="text-white w-4 h-4 md:w-7.5 md:h-7.5" />
                            </div>

                            <h2 className="text-2xl font-semibold text-[#1F1F1F]">
                                Login Credentials
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />

                                    <input
                                        type="password"
                                        placeholder="Create Password"
                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                    />

                                    <Eye className="absolute right-4 top-4 w-4 h-4 text-gray-400 cursor-pointer" />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-xs md:text-xl font-medium text-text-dark">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full border border-gray-300 rounded-xl pl-11 pr-12 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                                    />

                                    <Eye className="absolute right-4 top-4 w-4 h-4 text-gray-400 cursor-pointer" />
                                </div>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-8">

                            <button className="border border-gray-300 px-5 md:px-8 py-3 rounded-xl font-medium text-base md:text-xl hover:bg-gray-100 transition">
                                Cancel
                            </button>

                            <button className="bg-[#334155] hover:bg-[#1E293B] flex items-center gap-2 text-white px-5 md:px-8 py-3 rounded-xl text-base md:text-xl font-medium transition">
                                <LuUserRoundPlus className="text-white w-4.5 h-4.5 md:w-9 md:h-9" /> Create User
                            </button>

                        </div>

                    </div>

                </div>

                {/* Right Preview */}
                <div className="xl:col-span-4 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full bg-[#334155] flex items-center justify-center">
                            <Eye className="text-white w-4 h-4 md:w-7.5 md:h-7.5" />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-[#1F1F1F]">
                                User Preview
                            </h2>

                            <p className="text-sm text-gray-500">
                                Review the generated user account details
                            </p>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="border border-gray-200 rounded-2xl p-6 text-center mb-5">

                        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full bg-[#B3B3B3] shadow-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="text-white w-7 h-7" />
                        </div>

                        <h3 className="text-base md:text-xl font-semibold text-text-dark">
                            Anshuman Negi
                        </h3>

                        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1 mt-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-sm text-gray-600">
                                Account Ready
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 text-sm text-text-dark">

                        {/* Email */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                            <div className="flex items-center gap-2">
                                <FiMail className="text-base" />
                                <span className="text-xs md:text-base">Email</span>
                            </div>

                            <span className="text-xs md:text-base">anshumannegi@flaxcollective.com</span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                            <div className="flex items-center gap-2">
                                <FiPhone className="text-base" />
                                <span>Phone</span>
                            </div>

                            <span>+91 98765 43210</span>
                        </div>

                        {/* Course */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                            <div className="flex items-center gap-2">
                                <FiBookOpen className="text-base" />
                                <span>Course</span>
                            </div>

                            <span>HPF</span>
                        </div>

                        {/* Role */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                            <div className="flex items-center gap-2">
                                <FiBriefcase className="text-base" />
                                <span>Role</span>
                            </div>

                            <span>Student</span>
                        </div>

                        {/* Start Date */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-base" />
                                <span>Start Date</span>
                            </div>

                            <span>15 May 2025</span>
                        </div>

                    </div>

                    {/* Login Credentials */}
                    <div className="border border-gray-300 rounded-2xl p-5 mt-4 shadow-sm">

                        <h3 className="text-lg font-semibold text-text-dark mb-4">
                            Login Credentials Preview
                        </h3>

                        <div className="space-y-4 text-sm text-text-dark">

                            {/* Login Email */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">
                                    <FiMail className="text-base" />
                                    <span className="text-xs md:text-base">Email</span>
                                </div>

                                <span className="text-xs md:text-base">james.anderson@flaxcollective.com</span>
                            </div>

                            {/* Password */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">
                                    <FiLock className="text-base" />
                                    <span>Password</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span>********</span>
                                    <FiEyeOff className="cursor-pointer text-base" />
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Alert */}
                    <div className="mt-6 bg-[#F4FFF4] border border-green-200 rounded-2xl p-4">
                        <p className="text-green-700 font-semibold">
                            Account will be active
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                            User can log in using the credentials above.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}