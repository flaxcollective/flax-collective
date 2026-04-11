"use client";
import "@/app/styles/header.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'programs', 'contact'];
      let current = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust 150px to represent the "active" threshold from the top
          if (rect.top <= 150) {
            current = `#${section}`;
          }
        }
      }

      // If we are at the very top of the page, highlight HOME
      if (window.scrollY < 100) {
        current = '';
      }

      setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/', hash: '' },
    { label: 'SERVICES', href: '#services', hash: '#services' },
    { label: 'PROGRAM', href: '#programs', hash: '#programs' },
    { label: 'CONTACT US', href: '#contact', hash: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="w-full px-10 md:px-20 lg:px-28 xl:px-40 2xl:px-48 mx-auto flex items-center justify-between h-full relative">

        {/* LEFT: Navigation Links */}
        <nav className="flex-1 flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeHash === link.hash;
            
            const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (link.hash) {
                e.preventDefault();
                const el = document.querySelector(link.hash);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              } else if (link.href === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            };

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className={`transition-colors duration-200 cursor-pointer ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CENTER: Logo */}
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/assets/images/flex-collective-logo.png"
            alt="Flax Collective"
            className="h-[114x] w-[114px] object-contain"
          />
        </Link>

        {/* RIGHT: Phone */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 border border-[#999] rounded-full px-5 py-2.5 hover:bg-gray-50 transition-colors">
            <img src="/assets/icons/navbar-call-icon.png" alt="Call" className="w-[18px] h-[18px] object-contain" />
            <a href="tel:+919876543210" className="header-contact-number text-[15px] whitespace-nowrap !text-[#333]">
              + 91 98765-43210
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
