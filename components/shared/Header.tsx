"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { usePathname, useRouter } from "next/navigation";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROGRAM", href: "/programs" },
  { label: "WORKSHOP", href: "/workshop" },
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
=======

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
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
    }
  };

  return (
    <header
<<<<<<< HEAD
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
                    user?.usertype === "employee"
                      ? "/admin-dashboard"
                      : "/dashboard"
                  }
                >
                  <button className="sign-item">
                    DASHBOARD
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="login-item flex items-center gap-1"
                >
                  LOGOUT <MdLogout />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <button className="sign-item">SIGN UP</button>
                </Link>

                <Link href="/auth/login">
                  <button className="login-item flex items-center gap-1">
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
          ☰
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
                      user?.usertype === "employee"
                        ? "/admin-dashboard"
                        : "/dashboard"
                    }
                    onClick={closeMenu}
                  >
                    <button className="mobile-auth-btn sign">
                      DASHBOARD
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="mobile-auth-btn login flex items-center gap-2"
                  >
                    LOGOUT <MdLogout />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signup" onClick={closeMenu}>
                    <button className="mobile-auth-btn sign">
                      SIGN UP
                    </button>
                  </Link>

                  <Link href="/auth/login" onClick={closeMenu}>
                    <button className="mobile-auth-btn login flex items-center gap-2">
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




=======
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
>>>>>>> 70a3c600e509d3d5019cd6c5191f9e78e42e0186
    </header>
  );
}