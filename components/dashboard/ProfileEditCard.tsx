"use client";

import React, { useState, useEffect, useRef } from "react";
import { countries } from "@/data/countries";

function getInitials(name: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
import {
  Mail,
  Phone,
  BookOpen,
  User,
  Calendar,
  Camera,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Cropper from "react-easy-crop";
import { getCroppedImg, Area } from "@/lib/crop";

export default function ProfileEditCard() {
  const { user, setUser } = useAuth();

  const [showSecurity, setShowSecurity] = useState(false);

  // Profile Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [alternativePhone, setAlternativePhone] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading States
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image Crop States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result as string);
      setIsCropModalOpen(true);
    });
    reader.readAsDataURL(file);
  };

  const handleCropAndSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setSaving(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const formData = new FormData();
      formData.append("file", croppedImageBlob, "avatar.jpg");

      const res = await fetch("/api/auth/profile/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to upload profile picture");
        return;
      }
      setUser(data.user);
      setIsCropModalOpen(false);
      setImageSrc(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while cropping and uploading your profile picture");
    } finally {
      setSaving(false);
    }
  };

  // Sync state with user context on load/change
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
      setDob(user.dob || "");
      setGender(user.gender || "");
      setAlternativePhone(user.alternativePhone || "");
      setAddress(user.address || "");
      setCountryCode(user.countryCode || "+91");
      setCountry(user.country || "");
      setState(user.state || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 font-medium text-lg">Loading profile details...</p>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!/[a-zA-Z]/.test(name)) {
      alert("Name must contain letters");
      return;
    }

    if (phone && !/^\d+$/.test(phone)) {
      alert("Primary Phone number must contain only numbers");
      return;
    }

    if (city && !/[a-zA-Z]/.test(city)) {
      alert("City name must contain letters");
      return;
    }

    if (alternativePhone && !/^\d+$/.test(alternativePhone)) {
      alert("Alternative Phone number must contain only numbers");
      return;
    }

    if (country && !/[a-zA-Z]/.test(country)) {
      alert("Country name must contain letters");
      return;
    }

    if (state && !/[a-zA-Z]/.test(state)) {
      alert("State name must contain letters");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city,
          dob,
          gender,
          alternativePhone,
          address,
          countryCode,
          country,
          state,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update profile details");
        return;
      }

      setUser(data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile Save Error:", error);
      alert("Something went wrong while saving your details.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      alert("New password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setPasswordSaving(true);
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update password");
        return;
      }

      setUser(data.user);
      alert(user.hasPassword ? "Password changed successfully!" : "Password created successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowSecurity(false);
    } catch (error) {
      console.error("Password Save Error:", error);
      alert("Something went wrong while setting password.");
    } finally {
      setPasswordSaving(false);
    }
  };

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
        {/* LEFT COLUMN: User Summary & Preview */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Avatar & Summary */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Inner wrapper for clipping image and SVG crescent overlay */}
              <div className="w-16 h-16 md:w-35 md:h-35 rounded-full overflow-hidden relative bg-white">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2F3E56] text-white flex items-center justify-center font-bold text-xl md:text-5xl">
                    {getInitials(user.name || "User")}
                  </div>
                )}

                {/* LinkedIn-style ENROLLED / ADMIN crescent overlay */}
                {user && (
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <defs>
                      <linearGradient id="avatar-gradient" gradientUnits="userSpaceOnUse" x1="50" y1="45.5" x2="5" y2="64.7">
                        {user.usertype === "admin" || user.usertype === "employee" ? (
                          <>
                            <stop offset="0%" stopColor="#2F3E56" stopOpacity="0" />
                            <stop offset="20%" stopColor="#2F3E56" stopOpacity="0.3" />
                            <stop offset="35%" stopColor="#2F3E56" stopOpacity="0.5" />
                            <stop offset="45%" stopColor="#2F3E56" stopOpacity="0.7" />
                            <stop offset="52%" stopColor="#2F3E56" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#2F3E56" stopOpacity="1" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#666" stopOpacity="0" />
                            <stop offset="20%" stopColor="#666" stopOpacity="0.3" />
                            <stop offset="35%" stopColor="#666" stopOpacity="0.5" />
                            <stop offset="45%" stopColor="#666" stopOpacity="0.7" />
                            <stop offset="52%" stopColor="#666" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#666" stopOpacity="1" />
                          </>
                        )}
                      </linearGradient>
                    </defs>
                    <path
                      id="enrolled-path"
                      d="M 50 2.5 A 47.5 47.5 0 1 0 77.92 88.43"
                      fill="none"
                      stroke="url(#avatar-gradient)"
                      strokeWidth="20"
                      strokeLinecap="butt"
                    />
                    <text dy="-1">
                      <textPath
                        href="#enrolled-path"
                        startOffset="50%"
                        textAnchor="middle"
                        fill="white"
                        className="font-bold text-[7.5px] tracking-[0.05em]"
                      >
                        {user.usertype === "admin" || user.usertype === "employee" ? "A D M I N" : "N O T - E N R O L L E D"}
                      </textPath>
                    </text>
                  </svg>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 md:bottom-1 right-0 md:right-1 bg-text-body border-2 border-white rounded-full p-2 hover:bg-text-body transition cursor-pointer"
              >
                <Camera className="w-2 h-2 md:w-4 md:h-4 text-white" />
              </button>
            </div>

            <h2 className="mt-2 md:mt-4 text-base md:text-2xl font-semibold text-text-dark text-center">
              {user.name || "User"}
            </h2>

            <p className="text-text-body text-base mt-1 capitalize">
              {user.usertype || "Student"}
            </p>

            {user && user.usertype !== "admin" && user.usertype !== "employee" && (
              <div className="mt-2 md:mt-4 px-4 py-1 rounded-full bg-[#C0FFD7] text-black text-lg lg:text-md md:text-sm font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] mr-2"></span>Active Learner
              </div>
            )}
          </div>

          {/* User Account Details */}
          <div>
            <h3 className="text-base md:text-lg pt-3 md:pt-7 font-semibold text-[#1F1F1F]">
              User Preview
            </h3>
            <p className="text-sm text-gray-500 mt-1.5">
              Review The Generated User Account Details
            </p>
            <div className="border-t border-gray-200 my-6"></div>

            <div className="mt-6 space-y-5">
              {/* Email */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <Mail className="w-4 h-4 text-text-dark" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <span className="text-xs md:text-sm text-text-dark text-right break-all">
                  {user.email}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <Phone className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">Phone</span>
                </div>
                <span className="text-xs md:text-sm text-text-dark text-right">
                  {user.countryCode ? `${user.countryCode} ` : ""}{user.phone || "Not set"}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <BookOpen className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">Location</span>
                </div>
                <span className="text-xs md:text-sm text-text-dark text-right truncate max-w-[150px]">
                  {[user.city, user.state, user.country].filter(Boolean).join(", ") || "Not set"}
                </span>
              </div>

              {/* Course */}
              {/*
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <BookOpen className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">Course</span>
                </div>
                <span className="text-xs md:text-sm text-text-dark">HPF</span>
              </div>
              */}

              {/* Role */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <User className="w-4 h-4 text-text-dark" />
                  <span className="text-xs md:text-sm font-medium">Role</span>
                </div>
                <span className="text-xs md:text-sm text-gray-600 capitalize">
                  {user.usertype}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 md:gap-3">
                  <Calendar className="w-4 h-4 text-text-dark" />
                  <span className="text-sm font-medium">Joined</span>
                </div>
                <span className="text-xs md:text-sm text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : "15 May 2025"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Edit Forms */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {!showSecurity ? (
            <form onSubmit={handleSaveProfile}>
              <div className="flex items-center justify-between mb-2 md:mb-8">
                <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="pt-2 md:pt-4 space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      required
                    />
                  </div>

                  {/* Primary Phone with Country Code */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Code
                      </label>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155] bg-white cursor-pointer"
                      >
                        <option value="">Code</option>
                        {countries.map((c) => (
                          <option key={`${c.iso}-${c.code}`} value={c.code}>
                            {c.code} ({c.iso})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Primary Phone
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      />
                    </div>
                  </div>

                  {/* Country, State, City */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155] bg-white cursor-pointer"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter state name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      />
                    </div>
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      />
                    </div>
                  </div>

                  {/* Date of Birth, Gender, Alternative Mobile Number */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      />
                    </div>

                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155] bg-white cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Alternative Mobile
                      </label>
                      <input
                        type="text"
                        value={alternativePhone}
                        onChange={(e) => setAlternativePhone(e.target.value)}
                        placeholder="Alternative number"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                    />
                  </div>

                  {/* Save Profile Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#334155] hover:bg-[#1E293B] text-white px-8 py-3 rounded-xl font-medium transition cursor-pointer disabled:opacity-50 w-full md:w-auto"
                    >
                      {saving ? "Saving Details..." : "Save Profile Details"}
                    </button>
                  </div>

                  <hr className="border-gray-200 my-6" />

                  {/* Account Security Toggle */}
                  <div className="pt-2">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] mb-4">
                      Account Security
                    </h2>
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                      <div className="flex justify-self-start mt-4">
                        <button
                          type="button"
                          onClick={() => setShowSecurity(true)}
                          className="text-sm font-semibold text-[#334155] hover:underline"
                        >
                          {user.hasPassword ? "Change Password" : "Create Password"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSavePassword}>
              <div className="flex items-center justify-between mb-2 md:mb-8">
                <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">
                  {user.hasPassword ? "Change Password" : "Create Password"}
                </h2>
              </div>

              <p className="text-xs md:text-base text-text-body pb-4">
                {user.hasPassword
                  ? "Your password must be at least 6 characters and should include a combination of numbers, letters, and uppercase letters."
                  : "You registered via Google. Setting a password will allow you to log in with your email and password as well."}
              </p>

              <div className="space-y-6">
                <div className="pt-4 space-y-4">
                  {/* Current Password - only shown if password exists */}
                  {user.hasPassword && (
                    <div>
                      <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                        Current Password
                      </label>
                      <div className="relative flex items-center w-full">
                        <Lock className="absolute left-4 w-5 h-5 text-gray-500" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* New Password */}
                  <div>
                    <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                      New Password
                    </label>
                    <div className="relative flex items-center w-full">
                      <Lock className="absolute left-4 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </div>

                  {/* Retype Password */}
                  <div>
                    <label className="block text-text-dark text-xs md:text-lg font-semibold mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center w-full">
                      <Lock className="absolute left-4 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#334155]"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="bg-[#334155] hover:bg-[#1E293B] text-white px-8 py-3 rounded-xl font-medium transition cursor-pointer disabled:opacity-50 flex-1 text-center"
                    >
                      {passwordSaving
                        ? "Saving..."
                        : user.hasPassword
                          ? "Change Password"
                          : "Create Password"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSecurity(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-medium transition cursor-pointer text-center"
                    >
                      Back to Profile Details
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Image Crop Modal */}
      {isCropModalOpen && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-text-dark">Crop Profile Picture</h3>
              <button
                type="button"
                onClick={() => { setIsCropModalOpen(false); setImageSrc(null); }}
                className="text-gray-400 hover:text-gray-600 transition text-2xl font-semibold leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Cropper Container */}
            <div className="relative w-full h-80 bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                onZoomChange={setZoom}
              />
            </div>

            {/* Slider / Controls */}
            <div className="px-6 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm text-gray-500 font-medium">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#334155]"
              />
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setIsCropModalOpen(false); setImageSrc(null); }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropAndSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#334155] text-white font-medium hover:bg-[#1E293B] transition cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2"
              >
                {saving ? "Saving..." : "Crop & Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}