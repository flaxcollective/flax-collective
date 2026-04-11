import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #e0d9ce' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        {/* Brand Column */}
        <div>
          <div className="mb-5">
            <img
              src="/assets/flex-collective-logo.png"
              alt="Flex Collective"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-[13px] leading-relaxed mb-5 max-w-[240px]" style={{ color: '#555555' }}>
            For Inquiries Regarding{' '}
            <strong style={{ color: '#333333' }}>
              Certification Programs, Recruitment Opportunities, Or Employer Partnerships,
            </strong>{' '}
            Please Contact The Flex Collective Team.
          </p>

          {/* Contact items */}
          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2">
              <img src="/assets/footer-mail-icon-1.png" alt="mail" className="w-4 h-4 object-contain" />
              <span className="text-[12px]" style={{ color: '#555555' }}>info@flexcollective.com</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/assets/footer-mail-icon-2.png" alt="mail" className="w-4 h-4 object-contain" />
              <span className="text-[12px]" style={{ color: '#555555' }}>studentsupport@flex.com</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2">
            {[
              { icon: '/assets/instagram-footer-icon.png', href: '#', label: 'Instagram' },
              { icon: '/assets/facebook-footer-icon.png', href: '#', label: 'Facebook' },
              { icon: '/assets/linkedin-footer-icon.png', href: '#', label: 'LinkedIn' },
              { icon: '/assets/snapchat-footer-icon.png', href: '#', label: 'Snapchat' },
              { icon: '/assets/youtube-footer-icon.png', href: '#', label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:shadow-md"
                style={{ background: '#F4F1EA', border: '1px solid #e0d9ce' }}
              >
                <img src={s.icon} alt={s.label} className="w-4 h-4 object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-[12px] font-bold mb-5 tracking-wider uppercase" style={{ color: '#2F3E56' }}>Policies</h4>
          <ul className="space-y-3">
            {['Refund Policy', 'Programs'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] transition-colors hover:underline" style={{ color: '#555555' }}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy */}
        <div>
          <h4 className="text-[12px] font-bold mb-5 tracking-wider uppercase" style={{ color: '#2F3E56' }}>Privacy</h4>
          <ul className="space-y-3">
            {['Terms & Conditions', 'Login', 'Feedback', 'Payment'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] transition-colors hover:underline" style={{ color: '#555555' }}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[12px] font-bold mb-5 tracking-wider uppercase" style={{ color: '#2F3E56' }}>Company</h4>
          <ul className="space-y-3">
            {['Contact', 'Career', 'Service'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] transition-colors hover:underline" style={{ color: '#555555' }}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #e0d9ce' }} className="py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex gap-5">
            <Link href="#" className="text-[12px] hover:underline" style={{ color: '#555555' }}>Privacy Policy</Link>
            <Link href="#" className="text-[12px] hover:underline" style={{ color: '#555555' }}>Terms Of Service</Link>
            <Link href="#" className="text-[12px] hover:underline" style={{ color: '#555555' }}>About</Link>
          </div>
          <p className="text-[12px]" style={{ color: '#888888' }}>© 2026 Flex Collective. All Rights Reserved.</p>
          <div className="flex gap-2">
            {[
              '/assets/instagram-footer-icon.png',
              '/assets/facebook-footer-icon.png',
              '/assets/linkedin-footer-icon.png',
              '/assets/snapchat-footer-icon.png',
              '/assets/youtube-footer-icon.png',
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                style={{ background: '#F4F1EA', border: '1px solid #e0d9ce' }}
              >
                <img src={icon} alt="" className="w-3.5 h-3.5 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
