import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                <img src="/assets/icons/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="ml-3 font-serif font-bold text-lg text-[var(--color-primary-dark)]">Flax Collective</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering global hospitality through strategic consulting, unparalleled talent acquisition, and transformative digital solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link href="#services" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Our Services</Link></li>
              <li><Link href="#gallery" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Gallery</Link></li>
              <li><Link href="#faq" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">FAQ</Link></li>
              <li><Link href="#contact" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-serif">Global Network</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">North America</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Europe</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Asia Pacific</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Middle East</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-serif">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 text-sm">123 Hospitality Ave, Suite 400<br/>Business District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[var(--color-primary)] mr-3 flex-shrink-0" />
                <span className="text-gray-500 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[var(--color-primary)] mr-3 flex-shrink-0" />
                <span className="text-gray-500 text-sm">hello@flexcollective.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Flax Collective. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
