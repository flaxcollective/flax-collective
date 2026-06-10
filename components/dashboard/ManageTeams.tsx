'use client'
import React, { useState } from "react";
import {
    FiUsers,
    FiUserPlus,
    FiMail,
    FiSearch,
    FiFilter,
    FiEye,
    FiEdit,
    FiTrash2,

} from "react-icons/fi";
import { FaRegHourglass } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TiTick } from "react-icons/ti";



const temasmembers: TeamMember[] = [
    {
        name: "James Anderson",
        email: "james.anderson@flaxcollective.com",
        role: "Admin",
        courses: "12 Courses",
        status: "Active",
        joined: "12 May 2025",
        image: "/assets/images/dashboard/user-profile.jpg",
    },
    {
        name: "David Wilson",
        email: "david.wilson@flaxcollective.com",
        role: "Member",
        courses: "4 Courses",
        status: "Active",
        joined: "13 May 2025",
        image: "/assets/images/dashboard/user-profile.jpg",
    },
    {
        name: "Sarah Mitchell",
        email: "sarah.mitchell@flaxcollective.com",
        role: "Member",
        courses: "4 Courses",
        status: "Active",
        joined: "15 May 2025",
        image: "/assets/images/dashboard/user-profile.jpg",
    },
    {
        name: "Michael Brown",
        email: "michael.brown@flaxcollective.com",
        role: "Member",
        courses: "6 Courses",
        status: "Active",
        joined: "17 May 2025",
        image: "/assets/images/dashboard/user-profile.jpg",
    },
];

const stats = [
    {
        title: "Total Members",
        value: "24",
        desc: "All team members",
        icon: FiUsers,
    },
    {
        title: "Admins",
        value: "3",
        desc: "administrators",
        icon: MdOutlineAdminPanelSettings,
    },
    {
        title: "Active Members",
        value: "21",
        desc: "Currently active",
        icon: CiUser,
    },
    {
        title: "Pending Invites",
        value: "5",
        desc: "Invitations awaiting",
        icon: FiMail,
    },
];
interface TeamMember {
    name: string;
    email: string;
    role: string;
    courses: string;
    status: string;
    joined: string;
    image: string;
}

const ViewManageTeams = () => {
    const [addMembers, setAddMembers] = useState<TeamMember[]>([]);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const batches = ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"];

    const handleCheckboxChange = (member: any) => {
        setAddMembers((prev) =>
            prev.includes(member)
                ? prev.filter((item) => item !== member)
                : [...prev, member]
        );
    };

    const handleBatchChange = (batch: string) => {
        setSelectedBatches((prev) =>
            prev.includes(batch)
                ? prev.filter((b) => b !== batch)
                : [...prev, batch]
        );
    };

    const toggleGroupPanel = () => {
        if (addMembers.length === 0) {
            alert("Please select at least one member");
            return;
        }
        setIsGroupOpen(!isGroupOpen);
        setSelectedBatches([]);
    };

    const handleAddToGroup = () => {
        if (addMembers.length === 0) {
            alert("Please select at least one member");
            return;
        }
        setIsGroupOpen(true);
        setSelectedBatches([]);
    };

    const handleAssign = () => {
        if (selectedBatches.length === 0) {
            alert("Please select at least one batch");
            return;
        }

        // console.log("Assigned Members:", addMembers.map(m => m.name));
        // console.log("To Batches:", selectedBatches);

        setIsGroupOpen(false);
        setShowSuccess(true);

        // Reset selections
        setTimeout(() => {
            setAddMembers([]);
            setSelectedBatches([]);
        }, 800);
    };

    const closeSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <div className="">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

                <div className="flex items-start gap-4">

                    <div className="hidden w-14 h-14 rounded-xl bg-navy md:flex items-center justify-center">
                        <FiUsers className="text-white text-2xl" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-[#1F1F1F]">
                            Manage Team
                        </h1>

                        <p className="text-text-body text-sm mt-1">
                            View and manage your team members, roles and activity.
                        </p>
                    </div>
                </div>

                <button className="bg-navy hover:bg-[#1E293B] text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
                    <FiUserPlus />
                    Invite Member
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-2 md:p-5 shadow-sm"
                    >

                        <div className="flex items-start gap-2 md:gap-4">

                            {/* Icon */}
                            <div className="w-9 h-9 md:w-12.5 md:h-12.5 rounded-xl bg-navy flex items-center mt-2.5 justify-center shrink-0">
                                {/* If icon */}
                                {item.icon && (
                                    <item.icon className="text-white text-xl md:text-2xl" />
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <h2 className="text-3xl md:text-6xl font-bold text-navy">
                                    {item.value}
                                </h2>

                                <p className="font-semibold font-xs md:text-base text-text-dark pt-2">
                                    {item.title}
                                </p>

                                <span className="text-xs text-text-body">
                                    {item.desc}
                                </span>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Left */}
                <div className="xl:col-span-9">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3">

                        {/* Search + Filter */}
                        <div className="flex items-center gap-3 order-1 lg:order-2 w-full lg:w-auto">

                            {/* Search */}
                            <div className="relative flex-1 lg:w-72">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                                <input
                                    type="text"
                                    placeholder="Search team..."
                                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#334155]"
                                />
                            </div>

                            {/* Filter */}
                            <button className="border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition whitespace-nowrap">
                                <FiFilter className="text-lg" />
                                <span className="hidden sm:block">Filter</span>
                            </button>
                        </div>

                        {/* Team + Button */}
                        <div className="flex items-center justify-between lg:justify-start gap-3 order-2 lg:order-1">

                            <h2 className="text-xl md:text-2xl font-bold text-text-dark">
                                Team Details
                            </h2>

                            <button
                                disabled={addMembers.length === 0}
                                onClick={() => setIsGroupOpen(!isGroupOpen)}
                                className={`text-sm font-medium px-4 py-2.5 rounded-xl transition whitespace-nowrap
                                ${addMembers.length === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-navy hover:bg-[#1E293B] text-white"
                                    }`} >
                                + Add Group
                            </button>
                        </div>

                    </div>
                    {isGroupOpen && (
                        <div className="relative">

                            <div className="absolute left-0 md:left-40 top-0 w-60 bg-[#1E293B] text-white rounded-lg  z-50 overflow-hidden border border-text-body">

                                {/* Header */}
                                <div className="p-4 border-b border-gray-700">
                                    <h3 className="font-semibold text-lg">+ Add In Group</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {addMembers.length} member{addMembers.length > 1 ? 's' : ''} selected
                                    </p>
                                </div>

                                {/* Batches List */}
                                <div className="p-3 max-h-72 overflow-y-auto">
                                    {batches.map((batch) => (
                                        <label
                                            key={batch}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-[#334155] rounded-xl cursor-pointer transition"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedBatches.includes(batch)}
                                                onChange={() => handleBatchChange(batch)}
                                                className="w-5 h-5 accent-white cursor-pointer"
                                            />
                                            <span className="font-medium">{batch}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Footer Buttons */}
                                <div className="p-4 border-t border-gray-700 flex gap-3">
                                    {/* <button
                                        onClick={() => {
                                            setIsGroupOpen(false);
                                            setSelectedBatches([]);
                                        }}
                                        className="flex-1 py-3 text-gray-300 font-medium border border-gray-600 rounded-xl hover:bg-[#334155]"
                                    >
                                        Cancel
                                    </button> */}
                                    <button
                                        onClick={handleAssign}
                                        className="flex-1 py-3 bg-white text-[#1E293B] font-semibold rounded-xl hover:bg-gray-100"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== SUCCESS MODAL ==================== */}
                    {showSuccess && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                            <div className="bg-white rounded-3xl w-full max-w-sm mx-4 text-center p-8 shadow-2xl">
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
                                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-6xl">
                                                <TiTick />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-semibold mb-2">User Added Successfully</h2>
                                <p className="text-gray-600 mb-8">
                                    The user has been successfully added in a group.
                                </p>

                                <button
                                    onClick={closeSuccess}
                                    className="w-full bg-navy text-white py-3.5 rounded-2xl font-medium hover:bg-[#1E293B]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Responsive Table */}
                    <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">

                        <table className="w-full ">

                            {/* Header */}
                            <thead className="bg-[#F8F8F8] border-b border-gray-200">

                                <tr>

                                    <th className="text-left px-6 py-5 text-lg font-semibold text-text-dark">
                                        Member
                                    </th>

                                    <th className="text-center px-6 py-5 text-lg font-semibold text-text-dark">
                                        Role
                                    </th>

                                    <th className="text-center px-6 py-5 text-lg text-nowrap font-semibold text-text-dark">
                                        Courses Access
                                    </th>

                                    <th className="text-center px-6 py-5 text-lg font-semibold text-text-dark">
                                        Status
                                    </th>

                                    <th className="text-center px-6 py-5 text-lg text-nowrap font-semibold text-text-dark">
                                        Joined On
                                    </th>

                                    <th className="text-center px-6 py-5 text-lg font-semibold text-text-dark">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            {/* Body */}
                            <tbody>

                                {temasmembers.map((temasmember, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">
                                                <input
                                                    checked={addMembers.includes(temasmember)}
                                                    onChange={() => handleCheckboxChange(temasmember)}
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-navy cursor-pointer"
                                                />

                                                <img
                                                    src={temasmember.image}
                                                    alt={temasmember.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />

                                                <div>
                                                    <h3 className="font-semibold text-[#1F1F1F]">
                                                        {temasmember.name}
                                                    </h3>

                                                    <p className="text-sm text-text-body">
                                                        {temasmember.email}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>


                                        <td className="px-6 py-5 text-center font-medium text-[#1F1F1F]">
                                            {temasmember.role}
                                        </td>


                                        <td className="px-6 py-5 text-center text-[#1F1F1F]">
                                            {temasmember.courses}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5 text-center">

                                            <span className="bg-green-100 text-green-700 text-sm px-4 py-1 rounded-full">
                                                {temasmember.status}
                                            </span>

                                        </td>

                                        {/* Joined */}
                                        <td className="px-6 py-5 text-center text-[#1F1F1F]">
                                            {temasmember.joined}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center justify-center gap-2 ">

                                                <button className="bg-navy hover:bg-[#1E293B] text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition">
                                                    <FiEye />

                                                </button>

                                                <button className="border border-gray-300 hover:bg-gray-100 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition">
                                                    <FiEdit />

                                                </button>

                                                <button className="border border-red-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition">
                                                    <FiTrash2 />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">

                        <p className="text-sm text-text-body">
                            Showing 1 to 5 of 24 members
                        </p>

                        <div className="flex items-center gap-2">

                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-white transition"
                                >
                                    {page}
                                </button>
                            ))}

                            <button className="px-4 h-9 rounded-lg bg-navy text-white">
                                Next
                            </button>

                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="xl:col-span-3 space-y-5">

                    {/* Team Preview */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <h2 className="text-xl font-semibold text-text-dark mb-1.5">
                            Team Preview
                        </h2>

                        <p className="text-sm text-text-body font-medium mb-6">
                            Access and review team member information
                        </p>

                        {/* Circle */}
                        <div className="flex justify-center mb-6">

                            <div
                                className="relative w-40 h-40 rounded-full flex items-center justify-center"
                                style={{
                                    background: `conic-gradient(
                                    #3B82F6 0% 12.5%, 
                                    #22C55E 12.5% 87.5%, 
                                    #FB923C 87.5% 100%
                                )`,
                                }}
                            >

                                {/* Inner Circle */}
                                <div className="w-34 h-34 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">

                                    <h3 className="text-4xl font-bold text-navy">
                                        24
                                    </h3>

                                    <p className="text-sm text-text-body">
                                        Total
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Labels */}
                        <div className="space-y-3 text-sm">

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <p>Admins — 3 (12.5%)</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <p>Active Members — 21 (87.5%)</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                                <p>Pending Invites — 5 (17.2%)</p>
                            </div>

                        </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <h2 className="text-sm md:text-xl font-bold text-[#1F1F1F] mb-6">
                            Activity Summary
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">

                            <div>
                                <div className="w-12.5 h-12.5 rounded-xl bg-navy flex items-center justify-center mx-auto mb-3">
                                    <img src="/assets/images/dashboard/user-icon.png" alt="img" />

                                </div>

                                <h3 className="text-3xl font-bold text-navy">
                                    5
                                </h3>

                                <p className="text-sm text-text-body">
                                    Login
                                </p>
                            </div>

                            <div>
                                <div className="w-12.5 h-12.5 rounded-xl bg-navy flex items-center justify-center mx-auto mb-3">
                                    <img src="/assets/images/dashboard/mdi_dots-triangle.png" alt="img" />
                                </div>

                                <h3 className="text-3xl font-bold text-navy">
                                    42
                                </h3>

                                <p className="text-sm text-text-body">
                                    Courses
                                </p>
                            </div>

                            <div>
                                <div className="w-12.5 h-12.5 rounded-xl bg-navy flex items-center justify-center mx-auto mb-3">
                                    <FaRegHourglass className="text-white w-5" />
                                </div>

                                <h3 className="text-3xl font-bold text-navy">
                                    36
                                </h3>

                                <p className="text-sm text-text-body">
                                    Study Time
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewManageTeams;