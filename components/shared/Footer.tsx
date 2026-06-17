import Link from 'next/link';
import "@/app/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Logo */}
        <div className="footer-logo">
          <img src="/assets/images/logo/flax-square-logo.png" alt="Flax Collective" />
        </div>

        {/* Mobile-only tagline */}
        <p className="footer-tagline">
          For inquiries regarding certification programs, recruitment opportunities, or employer partnerships, please contact the Flax Collective team.
        </p>

        {/* Desktop-only inquiry text */}
        <div className="footer-inquiry-text">
          <p>
            For inquiries regarding
            <strong> certification programs, recruitment opportunities, or employer</strong>
          </p>

          <p className="footer-please-text">
            <strong>partnerships, </strong>
            please contact the flax collective team.
          </p>
        </div>


        {/* Email */}
        <div className="footer-email">
          <img src="/assets/icons/footer-mail-icon-1.png" alt="mail" />
          <span>info@flaxcollective.com</span>
        </div>
        <div className="footer-phone">
          <img src="/assets/icons/mi_call.svg" alt="phone" />
          <span>+91 6280074060</span>
        </div>

        {/* Mobile links — shown only on mobile */}
        <div className="footer-links-mobile">
          <div className="footer-links-mobile-row">
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="/about">About Us</Link>
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="footer-links-mobile-row">
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
          <div className="footer-links-mobile-row">
            <span className="footer-links-mobile-bullet">•</span>
            <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>
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
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
            <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>
          </div>

          <p className="footer-copy"> © {new Date().getFullYear()} FLAX Collective. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}