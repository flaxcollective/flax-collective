import Link from 'next/link';
import "@/app/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Logo */}
        <div className="footer-logo">
          <img src="/assets/images/flex-collective-footer-logo.png" alt="Flax Collective" />
        </div>

        {/* Mobile-only tagline */}
        <p className="footer-tagline">
          Strategic Consultancy For Sustainable Growth &amp; Measurable Success
        </p>

        {/* Desktop-only inquiry text */}
        <p className="footer-inquiry-text">
          For Inquiries Regarding{' '}
          <strong>Certification Programs, Recruitment Opportunities, Or Employer Partnerships,</strong>
        </p>
        <p className="footer-please-text">Please Contact The Flax Collective Team.</p>

        {/* Email */}
        <div className="footer-email">
          <img src="/assets/icons/footer-mail-icon-1.png" alt="mail" />
          <span>info@flaxcollective.com</span>
        </div>

        {/* Mobile links — shown only on mobile */}
        <div className="footer-links-mobile">
          <div className="footer-links-mobile-row">
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="#">Privacy Policy</Link>
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="#">Terms &amp; Conditions</Link>
          </div>
          <div className="footer-links-mobile-row">
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="#">Refund Policy</Link>
          </div>
        </div>

        {/* Social icons */}
        <div className="footer-socials">
          {/* Mobile order: Instagram → Facebook → LinkedIn */}
          {/* Desktop order: LinkedIn → Instagram → Facebook */}
          <a href="https://www.instagram.com/flaxcollective/" target="_blank" rel="noreferrer" title="Instagram">
            <img src="/assets/icons/instagram-footer-icon.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/flaxcollective" target="_blank" rel="noreferrer" title="Facebook">
            <img src="/assets/icons/facebook-footer-icon.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/flaxcollective" target="_blank" rel="noreferrer" title="LinkedIn">
            <img src="/assets/icons/linkedin-footer-icon.png" alt="LinkedIn" />
          </a>
        </div>

        {/* Divider — desktop only */}
        <hr className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          {/* Desktop links */}
          <div className="footer-links-desktop">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms &amp; Conditions</Link>
            <Link href="#">Refund Policy</Link>
          </div>

          <p className="footer-copy">© 2026 FLAX Collective. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}