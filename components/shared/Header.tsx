"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [activeHash, setActiveHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClickScrolling, setIsClickScrolling] = useState(false); // ✅ NEW

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // ✅ Scroll Spy (FIXED)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 200);

      const sections = ["services", "programs", "contact"];
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();

          // ✅ Accurate detection
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = `#${section}`;
          }
        }
      }

      if (y < 100) current = "";

      // ✅ Prevent flicker during click scroll
      if (!isClickScrolling) {
        setActiveHash(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClickScrolling]);

  const navLinks = [
    { label: "HOME", href: "/", hash: "" },
    { label: "SERVICES", href: "#services", hash: "#services" },
    { label: "COURSES", href: "#programs", hash: "#programs" },
    { label: "CONTACT US", href: "#contact", hash: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
    href: string
  ) => {
    setIsMenuOpen(false);

    if (hash) {
      setIsClickScrolling(true);
      setActiveHash(hash);

      e.preventDefault();
      const el = document.querySelector(hash);

      if (el) {
        const width = window.innerWidth;

        let offset = 130;

        // ✅ Mobile
        if (width < 768) {
          offset = 100;
        }

        // ✅ Tablet
        else if (width >= 768 && width < 1024) {
          offset = 115;
        }

        // ✅ Desktop
        else {
          offset = 130;
        }

        // ✅ Extra for SERVICES only
        if (hash === "#services") {
          if (width < 768) offset = 140;
          else if (width < 1024) offset = 160;
          else offset = 200;
        }

        const top =
          el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsClickScrolling(false);
        }, 800);
      }
    } else if (href === "/") {
      setIsClickScrolling(true);
      setActiveHash("");

      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setIsClickScrolling(false);
      }, 800);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 header-main ${isScrolled ? "header-scrolled" : ""
        }`}
    >
      {/* DESKTOP HEADER */}
      <div className="sticky-header">
        <div className="sticky-header-inner">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "", "/")}
            className="sticky-logo"
          >
            <img
              src="/assets/images/flex-collective-logo.png"
              alt="Flax Collective"
            />
          </Link>

          {/* Nav */}
          <nav className="sticky-nav">
            {navLinks.map((link) => {
              const isActive =
                (link.hash === "" && activeHash === "") ||
                (link.hash !== "" && activeHash === link.hash);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) =>
                    handleNavClick(e, link.hash, link.href)
                  }
                  className={`nav-link cursor-pointer ${isActive ? "active" : ""
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mobile-header lg:hidden sticky top-0 z-50">
        <div className="mobile-header-spacer" />

        <div className="mobile-logo">
          <Link href="/">
            <img
              src="/assets/images/flex-collective-logo.png"
              alt="Flax Collective"
            />
          </Link>
        </div>

        <div className="mobile-menu">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <span className={`line l1 ${isMenuOpen ? "active" : ""}`} />
            <span className={`line l2 ${isMenuOpen ? "active" : ""}`} />
            <span className={`line l3 ${isMenuOpen ? "active" : ""}`} />
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <div
        className={`mobile-nav-panel lg:hidden ${isMenuOpen ? "open" : ""
          }`}
      >
        <button
          className="mobile-nav-close"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) =>
                handleNavClick(e, link.hash, link.href)
              }
              className="mobile-nav-item"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* BACKDROP */}
      {isMenuOpen && (
        <div
          className="mobile-nav-backdrop lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}