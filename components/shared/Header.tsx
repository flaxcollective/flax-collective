"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > 200); // Wait for fade to complete before toggling state

      const sections = ['services', 'programs', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = `#${section}`;
        }
      }
      if (y < 100) current = '';
      setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { label: "HOME", href: "/", hash: "" },
    { label: "SERVICES", href: "#services", hash: "#services" },
    { label: "COURSES", href: "#programs", hash: "#programs" },
    { label: "CONTACT US", href: "#contact", hash: "#contact" },
  ];


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, href: string) => {
    setIsMenuOpen(false);
    if (hash) {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 header-main ${isScrolled ? 'header-scrolled' : ''}`}>


      <div className="sticky-header">
        <div className="sticky-header-inner">

             {/* Logo */}
          <Link href="/" onClick={(e) => handleNavClick(e, '', '/')} className="sticky-logo">
            <img src="/assets/images/flex-collective-logo.png" alt="Flax Collective" />
          </Link>
          {/* Left nav */}
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
                  className={`nav-link cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── MOBILE HEADER BAR ── */}
      <div className="mobile-header lg:hidden sticky top-0 z-50">
        {/* Spacer — balances the right-side hamburger */}
        <div className="mobile-header-spacer" />

        <div className="mobile-logo">
          <Link href="/">
            <img src="/assets/images/flex-collective-logo.png" alt="Flax Collective" />
          </Link>
        </div>

        <div className="mobile-menu">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <span className={`line l1 ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`line l2 ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`line l3 ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>
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
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.hash, link.href)}
              className="mobile-nav-item"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── BACKDROP ── */}
      {isMenuOpen && (
        <div className="mobile-nav-backdrop lg:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

    </header>
  );
}