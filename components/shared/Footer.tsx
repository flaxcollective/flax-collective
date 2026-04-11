import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#F4F1EA' }} className=" pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mt-10 mb-5">
          <img src="/assets/images/flex-collective-footer-logo.png" alt="Flax Collective" className="" />
        </div>

        {/* Text */}
        <p className="text-[14px] leading-relaxed max-w-2xl font-medium" style={{ color: '#888888' }}>
          For Inquiries Regarding{' '}
          <strong style={{ color: '#555555', fontWeight: 600 }}>
            Certification Programs, Recruitment Opportunities, Or Employer Partnerships,
          </strong>
        </p>
        <p className="text-[14px] leading-relaxed mb-10 max-w-2xl font-medium" style={{ color: '#888888' }}>
          Please Contact The Flax Collective Team.
        </p>

        {/* Contact items */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-10">
          <div className="flex items-center gap-2">
            <img src="/assets/icons/footer-mail-icon-1.png" alt="mail" className="w-4 h-4 object-contain" style={{ filter: 'brightness(0)' }} />
            <span className="text-[13px] font-semibold" style={{ color: '#555555' }}>info@flaxcollective.com</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/icons/footer-mail-icon-2.png" alt="mail" className="w-4 h-4 object-contain" style={{ filter: 'brightness(0)' }} />
            <span className="text-[13px] font-semibold" style={{ color: '#555555' }}>studentsupport@flax.com</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          {[
            { icon: '/assets/icons/linkedin-footer-icon.png', label: 'LinkedIn' },
            { icon: '/assets/icons/facebook-footer-icon.png', label: 'Facebook' },
            { icon: '/assets/icons/instagram-footer-icon.png', label: 'Instagram' },
            { icon: '/assets/icons/snapchat-footer-icon.png', label: 'Snapchat' },
          ].map((s) => (
            <a
              key={s.label}
              href="#"
              title={s.label}
              className="transition-opacity hover:opacity-75"
            >
              <img src={s.icon} alt={s.label} className="w-[18px] h-[18px] object-contain" style={{ filter: 'brightness(0)' }} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t mb-6" style={{ borderColor: '#d0c9be' }}></div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            <Link href="#" className="text-[12px] font-medium hover:underline" style={{ color: '#555555' }}>Privacy Policy</Link>
            <Link href="#" className="text-[12px] font-medium hover:underline" style={{ color: '#555555' }}>Terms Of Service</Link>
            <Link href="#" className="text-[12px] font-medium hover:underline" style={{ color: '#555555' }}>About</Link>
            <Link href="#" className="text-[12px] font-medium hover:underline" style={{ color: '#555555' }}>Refund Policy</Link>
          </div>
          <p className="text-[12px] font-medium" style={{ color: '#555555' }}>
            © 2026 FLAX Collective. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
