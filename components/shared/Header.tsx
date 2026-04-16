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

  const FADE_START = 100;
  const FADE_END = 200;
  const progress = Math.min(1, Math.max(0, (scrollY - FADE_START) / (FADE_END - FADE_START)));
  const svgOpacity = 1 - progress;
  const stickyOpacity = progress;


  const navLinksLeft = [
    { label: 'HOME', href: '/', hash: '' },
    { label: 'SERVICES', href: '#services', hash: '#services' },
  ];

  const navLinksRight = [
    { label: 'COURSES', href: '#programs', hash: '#programs' },
    { label: 'CONTACT US', href: '#contact', hash: '#contact' },
  ];

  const navLinks = [...navLinksLeft, ...navLinksRight];

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

      {/* ── DESKTOP: Original SVG shape header (visible when NOT scrolled) ── */}
      <div className="desktop-header hidden lg:block w-full relative header-container" style={{
        opacity: svgOpacity,
        pointerEvents: svgOpacity < 0.1 ? 'none' : 'auto',
        transition: 'opacity 0.1s linear',
      }}>

        <div className="desktop-svg-bg absolute top-0 left-0 w-full h-[320px] overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ filter: "drop-shadow(0 6px 16px rgba(47, 62, 86, 0.18))" }}
          >
            {/* Full-width white header bar */}
            <div
              className="absolute top-0 left-0 w-full bg-white"
              style={{ height: 196 }}
            />

            {/* Fixed-size centered notch — calc ensures perfect center at all screen sizes */}
            <svg
              style={{
                position: "absolute",
                top: 130,
                left: "calc(50% - 210px)",
              }}
              width="420"
              height="150"
              viewBox="0 0 420 150"
            >
              <path
                d="M0 66
           C40 66 70 90 70 115
           C70 135 90 150 120 150
           H300
           C330 150 350 135 350 115
           C350 90 380 66 420 66
           V0 H0 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="w-full flex h-[196px] relative z-10 max-w-[1920px] mx-auto">
          {/* Nav Left */}
          <div className="header-nav-left flex-1 flex items-end justify-end mb-10">
            <nav className="flex items-center gap-10">
              {navLinksLeft.map((link) => {
                const isActive = (link.hash === '' && activeHash === '') || (link.hash !== '' && activeHash === link.hash);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.hash, link.href)}
                    className={`transition-colors duration-200 cursor-pointer nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Logo Center */}
          <div className="header-logo-center flex-none flex justify-center items-start w-[400px]">
            <Link href="/" className="logo-link-responsive flex justify-center items-start mt-4" onClick={(e) => handleNavClick(e, '', '/')}>
              <img src="/assets/images/flex-collective-logo.png" alt="Flax Collective" className="header-logo-img" />
            </Link>
          </div>

          {/* Nav Right */}
          <div className="header-nav-right flex-1 flex items-end justify-start mb-10">
            <nav className="flex items-center gap-10">
              {navLinksRight.map((link) => {
                const isActive = activeHash === link.hash;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.hash, link.href)}
                    className={`transition-colors duration-200 cursor-pointer nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ── DESKTOP STICKY BAR (shown when scrolled) ── */}
      <div className="sticky-header"
        style={{
          opacity: stickyOpacity,
          pointerEvents: stickyOpacity < 0.1 ? 'none' : 'auto',
          transition: 'opacity 0.1s linear',
        }}>
        <div className="sticky-header-inner">
          {/* Left nav */}
          <nav className="sticky-nav sticky-nav-left">
            {navLinksLeft.map((link) => {
              const isActive = (link.hash === '' && activeHash === '') || (link.hash !== '' && activeHash === link.hash);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.hash, link.href)}
                  className={`nav-link cursor-pointer ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Logo */}
          <Link href="/" onClick={(e) => handleNavClick(e, '', '/')} className="sticky-logo">
            <img src="/assets/images/flex-collective-logo.png" alt="Flax Collective" />
          </Link>

          {/* Right nav */}
          <nav className="sticky-nav sticky-nav-right">
            {navLinksRight.map((link) => {
              const isActive = activeHash === link.hash;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.hash, link.href)}
                  className={`nav-link cursor-pointer ${isActive ? 'active' : ''}`}
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