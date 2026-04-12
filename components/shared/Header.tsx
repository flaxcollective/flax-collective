"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      const sections = ['services', 'programs', 'contact'];
      let current = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = `#${section}`;
          }
        }
      }

      if (window.scrollY < 100) {
        current = '';
      }

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
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 header-main">
      {/* DESKTOP HEADER - Split nav with centered logo drop using pure SVG */}
      <div className="desktop-header hidden lg:block w-full relative header-container">
        
        {/* Background SVG exactly as requested */}
        <div className="desktop-svg-bg overflow-hidden absolute top-0 left-0 w-full h-[320px] z-0 pointer-events-none flex justify-center">
            <svg width="1920" height="320" viewBox="0 0 1920 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[1920px] max-w-none">
              <g filter="url(#filter0_d_4743_3203)">
                <path d="M0 0H1920V196H1413.5H1193.5H1153.95C1125.78 196 1102.37 217.718 1100.26 245.811C1098.99 262.837 1084.8 276 1067.73 276H961H862.094C839.519 276 820.798 258.522 819.25 236C817.702 213.478 798.981 196 776.406 196H728.5H507H0V0Z" fill="white"/>
              </g>
              <defs>
                <filter id="filter0_d_4743_3203" x="-36" y="-36" width="2000" height="356" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="4" dy="4"/>
                  <feGaussianBlur stdDeviation="20"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.184314 0 0 0 0 0.243137 0 0 0 0 0.337255 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4743_3203"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4743_3203" result="shape"/>
                </filter>
              </defs>
            </svg>
        </div>

        {/* Content layer */}
        <div className="w-full flex h-[196px] relative z-10 max-w-[1920px] mx-auto">
          {/* Nav Left */}
          <div className="header-nav-left flex-1 flex items-center justify-end">
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
              <img
                src="/assets/images/flex-collective-logo.png"
                alt="Flax Collective"
                className="header-logo-img"
              />
            </Link>
          </div>

          {/* Nav Right */}
          <div className="header-nav-right flex-1 flex items-center justify-start">
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

      {/* MOBILE HEADER */}
      <div className="mobile-header lg:hidden">

        {/* Logo Left */}
        <div className="mobile-logo">
          <Link href="/">
            <img
              src="/assets/images/flex-collective-logo.png"
              alt="Flax Collective"
            />
          </Link>
        </div>

        {/* Hamburger Right */}
        <div className="mobile-menu">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <span className={isMenuOpen ? "line l1 active" : "line l1"}></span>
            <span className={isMenuOpen ? "line l2 active" : "line l2"}></span>
            <span className={isMenuOpen ? "line l3 active" : "line l3"}></span>
          </button>
        </div>

      </div>

      {/* MOBILE NAVIGATION OVERLAY (Shared by mobile components) */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.hash, link.href)}
              className="text-2xl font-semibold text-[#333] tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
