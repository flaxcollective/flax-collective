"use client";

import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "@/app/styles/dashboard/dashboard-home.css";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] = useState(false);
  const { user, setUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setProfile(false);
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getTitle = () => {
    if (pathname.includes("users")) return "Users";
    if (pathname.includes("courses")) return "Courses";
    if (pathname.includes("learning")) return "Learning";
    return "Super Admin";
  };

  return (
    <header className="dashboard-header px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">

      {/* Left */}
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
        {getTitle()}
      </h2>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">

        {/* Notification */}
        <button className="relative p-1.5 sm:p-2 text-white hover:text-gray-200 transition">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
        </button>

        {/* User */}
        <div className="relative flex items-center gap-2 sm:gap-3" ref={dropdownRef}>

          <p className="text-sm sm:text-base font-semibold text-white truncate max-w-25 sm:max-w-none">
            {user?.email ?? "Super Admin"}
          </p>

          <div
            onClick={() => setProfile(!profile)}
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white"
          >
            <img
              src="/assets/images/dashboard/user-profile.jpg"
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dropdown */}
          {profile && (
            <div className="absolute top-12 right-0 w-52 bg-navy rounded-b-2xl shadow-xl py-2 z-50">
              {[
                { name: "Profile", link: "/superadmin/profile" },
                { name: "Settings", link: "/superadmin/settings" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block px-4 py-3 text-white group"
                  onClick={() => setProfile(false)}
                >
                  <div className="pb-2 border-b text-base font-semibold md:text-lg border-transparent group-hover:border-white/40 transition-all duration-200">
                    {item.name}
                  </div>
                </Link>
              ))}

              <button
                onClick={() => {
                  setProfile(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-3 text-white group"
              >
                <div className="pb-2 border-b text-base font-semibold md:text-lg border-transparent group-hover:border-white/40 transition-all duration-200">
                  Logout
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
