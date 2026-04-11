import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo Placeholder */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
               <img src="/assets/icons/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="ml-3 font-serif font-bold text-xl text-[var(--color-primary)]">Flax Collective</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="#about" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">About Us</Link>
            <Link href="#solutions" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Academic Solutions</Link>
            <Link href="#consulting" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Consulting</Link>
            <Link href="#connect" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Connect</Link>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-500 cursor-pointer hover:text-[var(--color-primary)] transition-colors">EN</div>
          <Link href="#enroll" className="px-5 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] font-medium text-sm rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all">
            Enroll as Partner
          </Link>
        </div>

        {/* Mobile menu button (simplified) */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-500 hover:text-[var(--color-primary)]">
            <svg className="w-6 h-6" fill="fill" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
