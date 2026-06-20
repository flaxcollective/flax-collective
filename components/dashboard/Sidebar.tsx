"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { MdLogout } from "react-icons/md";

import "@/app/styles/dashboard/dashboard-home.css";
import { useAuth } from "@/context/AuthContext";

const studentMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "My Learning",
    icon: BookOpen,
    href: "/dashboard/mylearning",
  },
  {
    name: "Courses",
    icon: ClipboardList,
    href: "/dashboard/course",
  },
];

const adminMenu = [
  {
    name: "Admin Dashboard",
    icon: LayoutDashboard,
    href: "/admin-dashboard",
  },
  {
    name: "Add Course",
    icon: Users,
    href: "#",
  },
  // {
  //   name: "Courses",
  //   icon: ClipboardList,
  //   href: "/admin-dashboard/courses",
  // },
];

export default function Sidebar() {
  const pathname = usePathname();
    const { user, setUser } = useAuth();
   const router = useRouter();



  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems =
    user?.usertype === "admin"
      ? adminMenu
      : studentMenu;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
       setUser(null);
      setMobileOpen(false);
     
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
        setCollapsed(false);
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleToggle = () => setMobileOpen(true);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);


  useEffect(() => {
    if (isMobile && mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, mobileOpen]);

  const SidebarContent = ({ forMobile = false }: { forMobile?: boolean }) => (
    <div
      className={`sidebar-container ${!forMobile && collapsed ? "sidebar-collapsed" : ""
        }`}
      style={
        forMobile
          ? {
            width: "240px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "white",
          }
          : undefined
      }
    >
      {/* Desktop toggle */}
      {!forMobile && (
        <div className="desktop-toggle">
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>
      )}

      {/* Mobile close button inside drawer */}
      {forMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "12px 12px 0",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
            }}
          >
            <X size={22} />
          </button>
        </div>
      )}

      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/">
          <img
            src="/assets/images/logo/flax-square-logo.png"
            alt="Logo"
            className={`logo-img ${!forMobile && collapsed ? "logo-collapsed" : ""
              }`}
          />
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center ${!forMobile && collapsed ? "justify-center" : "gap-3"
                    } px-3 py-3 rounded-md text-sm font-medium transition-all
                  ${isActive
                      ? "bg-[#6e7c3a26] text-black"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                  title={!forMobile && collapsed ? item.name : ""}
                >
                  <item.icon className="w-5 h-5" />
                  {(forMobile || !collapsed) && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      <div className="p-3 ">
        <button
          onClick={() => {
            setMobileOpen(false); // ✅ mobile drawer close
            handleLogout();       // ✅ logout call
          }}
          className={`flex items-center w-full ${!forMobile && collapsed ? "justify-center" : "gap-3"
            } px-3 py-3 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-md text-sm font-medium transition-all`}
        >
          <MdLogout className="w-5 h-5" />
          {(forMobile || !collapsed) && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── MOBILE: Overlay backdrop ── */}
      {isMobile && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(0,0,0,0.4)",
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
            transition: "opacity 0.25s ease",
          }}
        />
      )}

      {/* ── MOBILE: Slide-in Drawer ── */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100dvh",
            zIndex: 1200,
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: mobileOpen ? "4px 0 24px rgba(0,0,0,0.15)" : "none",
          }}
        >
          <SidebarContent forMobile={true} />
        </div>
      )}

      {/* ── DESKTOP: Normal sidebar ── */}
      {!isMobile && <SidebarContent forMobile={false} />}
    </>
  );
}