"use client";
import "@/app/styles/header.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogin } from "react-icons/md";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROGRAM", href: "/programs" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle header scroll state
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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 header-main ${isScrolled ? "header-scrolled" : ""
        }`}
    >
      {/* DESKTOP HEADER */}
      <div className="sticky-header hidden lg:block">
        <div className="sticky-header-inner flex items-center justify-between">

          {/*  Logo */}
          <Link href="/" className="header-logo transition-all duration-700">
            <img
              src="/assets/images/logo/flax-square-logo.png"
              alt="Flax Collective"
              className="w-[120px] h-auto"
            />
          </Link>

          <nav className="sticky-nav flex-1 flex justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link cursor-pointer ${pathname === link.href ? "active" : ""
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="auth-header">
            <button className="sign-item">SIGN UP</button>
            <button className="login-item flex gap-1">
              LOGIN <MdLogin className="text-md" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER BAR */}
      <div className="mobile-header mobile-menu lg:hidden sticky top-0 z-50">
        <div className="mobile-header-spacer" />
        <div className="mobile-logo">
          <Link href="/" onClick={closeMenu}>
            <img
              src="/assets/images/logo/flax-square-logo.png"
              alt="Flax Collective"
            />
          </Link>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`line l1 ${isMenuOpen ? "active" : ""}`} />
          <span className={`line l2 ${isMenuOpen ? "active" : ""}`} />
          <span className={`line l3 ${isMenuOpen ? "active" : ""}`} />
        </button>
      </div>

      {/* MOBILE NAV PANEL */}
      <div
        className={`mobile-nav-panel lg:hidden ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="mobile-nav-close"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          ✕
        </button>

        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className={`mobile-nav-item ${pathname === link.href ? "active" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>


        <div className="auth-header mt-6 flex flex-col gap-3 px-4">
          <button className="sign-item">SIGN UP</button>
          <button className="login-item ">
            LOGIN <MdLogin />
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {isMenuOpen && (
        <div
          className="mobile-nav-backdrop lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}