"use client";
import "@/app/styles/header.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'SERVICES', href: '/services' },
    { label: 'PROGRAM', href: '/program' },
    { label: 'CONTACT US', href: '/contact-us' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto  flex items-center justify-between w-full  h-full">

        {/* LEFT: Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CENTER: Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/assets/logo-image-navbar.png"
            alt="Flex Collective"
            className=""
          />
        </Link>

        {/* RIGHT: Phone */}
        <div className="flex items-center gap-2">
          <img src="/assets/navbar-call-icon.png" alt="Call" className="w-4 h-4" />
          <a href="tel:+919876543210" className="header-contact-number">
            +91 98765-43210
          </a>
        </div>
      </div>
    </header>
  );
}
