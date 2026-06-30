"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { CgMenuRight } from "react-icons/cg";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROGRAMS", href: "/programs" },
  { label: "WORKSHOPS", href: "/workshop" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  // ---------------- BODY SCROLL LOCK ----------------
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ---------------- SCROLL HEADER ----------------
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 992) {
        setIsScrolled(false);
        document.body.classList.remove("scrolled");
        return;
      }

      if (pathname !== "/") {
        setIsScrolled(true);
        document.body.classList.add("scrolled");
        return;
      }

      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
      document.body.classList.toggle("scrolled", scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);



  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 header-main ${isScrolled ? "header-scrolled" : ""
        }`}
    >
      {/* ---------------- DESKTOP ---------------- */}
      <div className="sticky-header hidden lg:block">
        <div className="sticky-header-inner flex items-center justify-between">

          <Link href="/" className="header-logo">
            <img
              src="/assets/images/logo/flax-square-logo.png"
              className="w-28"
              alt="Flax"
            />
          </Link>

          <nav className="sticky-nav flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="auth-header flex gap-3 items-center">
            {user ? (
              <>
                <Link
                  href={
                    user?.usertype === "employee" || user?.usertype === "admin"
                      ? "/admin-dashboard"
                      : "/dashboard"
                  }
                >
                  <button className="sign-item cursor-pointer">
                    DASHBOARD
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="login-item flex items-center gap-1 cursor-pointer"
                >
                  LOGOUT <MdLogout />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <button className="sign-item cursor-pointer">SIGN UP</button>
                </Link>

                <Link href="/auth/login">
                  <button className="login-item flex items-center gap-1 cursor-pointer">
                    LOGIN <MdLogin />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE HEADER ---------------- */}
      <div className="mobile-header lg:hidden sticky top-0 z-50">
        <div className="mobile-logo">
          <Link href="/" onClick={closeMenu}>
            <img src="/assets/images/logo/flax-square-logo.png" />
          </Link>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <CgMenuRight className="text-3xl" />
        </button>
        {/* ── MOBILE SIDE PANEL ── */}
        <div className={`mobile-nav-panel lg:hidden ${isMenuOpen ? 'open' : ''}`}>
          <button className="mobile-nav-close" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="1" x2="19" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <line x1="19" y1="1" x2="1" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="mobile-nav-item"
              >
                {link.label}
              </Link>
            ))}

            {/* MOBILE AUTH BUTTONS */}
            <div className="mobile-auth-buttons">
              {user ? (
                <>
                  <Link
                    href={
                      user?.usertype === "employee" || user?.usertype === "admin"
                        ? "/admin-dashboard"
                        : "/dashboard"
                    }
                    onClick={closeMenu}
                  >
                    <button className="mobile-auth-btn sign cursor-pointer">
                      DASHBOARD
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="mobile-auth-btn login flex items-center gap-2 cursor-pointer"
                  >
                    LOGOUT <MdLogout />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signup" onClick={closeMenu}>
                    <button className="mobile-auth-btn sign cursor-pointer">
                      SIGN UP
                    </button>
                  </Link>

                  <Link href="/auth/login" onClick={closeMenu}>
                    <button className="mobile-auth-btn login flex items-center gap-2 cursor-pointer">
                      LOGIN <MdLogin />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* BACKDROP */}
        {isMenuOpen && (
          <div className="mobile-nav-backdrop" onClick={closeMenu} />
        )}
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}




    </header>
  );
}