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
      // Sticky header triggers after scrolling past the hero header
      setIsScrolled(window.scrollY > 180);

      const sections = ['services', 'programs', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = `#${section}`;
        }
      }
      if (window.scrollY < 100) current = '';
      setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="desktop-header hidden lg:block w-full relative header-container">
        <div className="desktop-svg-bg absolute top-0 left-0 w-full h-[320px] overflow-hidden">
          <svg
            width="100%"
            height="320"
            viewBox="0 0 1920 320"
            preserveAspectRatio="xMidYMin slice"
          >
            <g filter="url(#filter0_d_4743_3203)">
              <path d="M0 0H1920V196H1413.5H1193.5H1170
C1130 196 1100 220 1100 245
C1100 265 1080 280 1050 280
H870
C840 280 820 265 820 245
C820 220 790 196 750 196
H728.5H507H0V0Z" fill="white" />
            </g>
            <defs>
              <filter id="filter0_d_4743_3203" x="-36" y="-36" width="2000" height="356" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="4" dy="4" />
                <feGaussianBlur stdDeviation="12" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.243137 0 0 0 0 0.337255 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4743_3203" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4743_3203" result="shape" />
              </filter>
            </defs>
          </svg>
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
      <div className="sticky-header">
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