"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isSecureRoute = pathname?.startsWith("/secure") || pathname?.startsWith("/hidden-document");

  if (isAdminRoute || isSecureRoute) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .os-footer {
          --os-bg: #0a0710;
          --os-bg-raised: #120c1e;
          --os-line: rgba(255, 255, 255, 0.08);
          --os-line-soft: rgba(255, 255, 255, 0.06);
          --os-text: #f4f2f9;
          --os-text-dim: #a39cb8;
          --os-text-faint: #6e6680;
          --os-orange: #FD7B28;
          --os-orange-bright: #ff914d;
          --os-orange-deep: #b24b07;
          --os-orange-glow: rgba(253, 123, 40, 0.25);

          position: relative;
          background: var(--os-bg);
          color: var(--os-text-dim);
          overflow: hidden;
          isolation: isolate;
          font-family: var(--font-poppins), sans-serif;
        }

        /* ambient orange glow, obsidian-glass feel */
        .os-footer::before {
          content: "";
          position: absolute;
          top: -220px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse at center, var(--os-orange-glow) 0%, rgba(253, 123, 40, 0) 70%);
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .os-footer::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--os-line-soft) 1px, transparent 1px),
                            linear-gradient(90deg, var(--os-line-soft) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 60%);
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 60%);
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        .os-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ---- CTA strip ---- */
        .os-cta {
          border-bottom: 1px solid var(--os-line);
          padding: 72px 0 56px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .os-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--os-orange);
          margin: 0 0 14px;
        }

        .os-cta-eyebrow::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--os-orange);
          box-shadow: 0 0 10px var(--os-orange);
        }

        .os-cta h2 {
          margin: 0;
          font-size: clamp(28px, 3.6vw, 44px);
          line-height: 1.12;
          font-weight: 300;
          color: var(--os-text);
          letter-spacing: -0.01em;
          max-width: 620px;
        }

        .os-cta h2 span {
          font-family: var(--font-times), "Times New Roman", serif;
          font-style: italic;
          font-weight: 300;
          color: var(--os-orange);
          background: none;
          -webkit-background-clip: initial;
          background-clip: initial;
        }

        .os-cta-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 28px;
          background: var(--os-orange);
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid var(--os-orange);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 0 0 var(--os-orange-glow);
        }

        .os-cta-btn:hover {
          background: var(--os-orange-bright);
          border-color: var(--os-orange-bright);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px -8px var(--os-orange-glow);
        }

        .os-cta-btn svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* ---- main grid ---- */
        .os-main {
          padding: 56px 0 48px;
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 1.2fr 1fr 1.2fr;
          gap: 40px;
          border-bottom: 1px solid var(--os-line);
        }

        .os-brand-col .os-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 18px;
        }

        .os-brand-col p {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: var(--os-text-dim);
          max-width: 300px;
          margin: 0 0 20px;
        }

        .os-locations {
          font-family: var(--font-inter), sans-serif;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 0;
          font-size: 13px;
          color: var(--os-text-faint);
          margin: 0 0 24px;
        }

        .os-locations span {
          position: relative;
          padding: 0 10px;
        }

        .os-locations span:first-child {
          padding-left: 0;
        }

        .os-locations span:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--os-text-faint);
        }

        .os-social-row {
          display: flex;
          gap: 10px;
        }

        .os-social-row a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--os-line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--os-text-dim);
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .os-social-row a:hover {
          border-color: var(--os-orange);
          color: var(--os-orange);
          transform: translateY(-2px);
        }

        .os-social-row svg {
          width: 16px;
          height: 16px;
        }

        .os-col h3 {
          margin: 0 0 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--os-text);
        }

        .os-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .os-col ul a {
          color: var(--os-text-dim);
          text-decoration: none;
          font-size: 14.5px;
          transition: color 0.18s ease, padding-left 0.18s ease;
          position: relative;
        }

        .os-col ul a:hover {
          color: var(--os-orange);
          padding-left: 6px;
        }

        .os-office {
          margin-bottom: 18px;
        }

        .os-office:last-child {
          margin-bottom: 0;
        }

        .os-office-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--os-text);
          margin: 0 0 4px;
        }

        .os-office-addr {
          font-family: var(--font-inter), sans-serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--os-text-dim);
          margin: 0;
        }

        .os-contact-block {
          margin-bottom: 18px;
        }

        .os-contact-block:last-child {
          margin-bottom: 0;
        }

        .os-contact-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 12px;
          color: var(--os-text-faint);
          margin: 0 0 4px;
        }

        .os-contact-value {
          font-family: var(--font-inter), sans-serif;
          font-size: 14.5px;
          color: var(--os-text);
          text-decoration: none;
          font-weight: 600;
          display: block;
          transition: color 0.18s ease;
        }

        .os-contact-value:hover {
          color: var(--os-orange);
        }

        /* ---- bottom bar ---- */
        .os-bottom {
          padding: 24px 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .os-bottom-left {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          color: var(--os-text-faint);
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .os-bottom-left a {
          color: var(--os-text-faint);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .os-bottom-left a:hover {
          color: var(--os-orange);
        }

        .os-divider-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--os-text-faint);
          display: inline-block;
        }

        .os-back-top {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--os-line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--os-text-dim);
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .os-back-top:hover {
          border-color: var(--os-orange);
          color: var(--os-orange);
          transform: translateY(-3px);
        }

        .os-back-top svg {
          width: 15px;
          height: 15px;
        }

        @media (max-width: 980px) {
          .os-main {
            grid-template-columns: 1fr 1fr;
            row-gap: 36px;
          }
          .os-brand-col {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 600px) {
          .os-inner {
            padding: 0 22px;
          }
          .os-main {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .os-cta {
            padding: 52px 0 40px;
            align-items: flex-start;
          }
          .os-cta-btn {
            width: 100%;
            justify-content: center;
          }
          .os-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}} />

      <footer className="os-footer">
        <div className="os-inner">

          <div className="os-cta">
            <div>
              <p className="os-cta-eyebrow">Start a project</p>
              <h2>Let&apos;s construct your <span>future</span>, together.</h2>
            </div>
            <Link className="os-cta-btn" href="/#contactUs">
              Start a conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

          <div className="os-main">

            <div className="os-brand-col">
              <Link className="os-logo" href="/">
                <Image
                  src="/images/logo/logo1.png"
                  alt="Obsidian Six"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <p>Your growth partner in the digital age — we design brands, build websites, and market businesses for success.</p>
              <div className="os-locations">
                <span>Mumbai</span><span>Bhopal</span><span>Indore</span><span>Delhi</span>
              </div>
              <div className="os-social-row">
                <a href="https://www.instagram.com/obsidiansixofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="3.6"></circle><circle cx="17.2" cy="6.8" r="1"></circle></svg>
                </a>
                <a href="https://www.linkedin.com/company/obsidian-six/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6.5 9.5v9"></path><circle cx="6.5" cy="6" r="1.4"></circle><path d="M11 18.5v-5.2c0-1.8 1.1-3.1 2.8-3.1 1.7 0 2.7 1.2 2.7 3.1v5.2"></path><path d="M11 9.5v9"></path></svg>
                </a>
                <a href="https://wa.me/918085652729" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17l-1.4 3.4L9 19a8 8 0 1 0-3.4-3.1Z"></path><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"></path></svg>
                </a>
              </div>
            </div>

            <div className="os-col">
              <h3>Quick links</h3>
              <ul>
                <li><Link href="/#home">Home</Link></li>
                <li><Link href="/aboutus/">About us</Link></li>
                <li><Link href="/case-studies/">Works</Link></li>
                <li><Link href="/blogs/">Blogs</Link></li>
                <li><Link href="/contactus/">Contact us</Link></li>
              </ul>
            </div>

            <div className="os-col">
              <h3>Services</h3>
              <ul>
                <li><Link href="/services/experience-design">Experience Design</Link></li>
                <li><Link href="/services/technology">Technology</Link></li>
                <li><Link href="/digital-marketing-agency-uae">Digital Marketing</Link></li>
                <li><Link href="/branding-agency-uae">Branding</Link></li>
              </ul>
            </div>

            <div className="os-col">
              <h3>Our offices</h3>
              <div className="os-office">
                <p className="os-office-name">Mumbai office</p>
                <p className="os-office-addr">Platinum BKC, 3rd Floor,<br />Bandra, Mumbai 400051</p>
              </div>
              <div className="os-office">
                <p className="os-office-name">Bhopal office</p>
                <p className="os-office-addr">Danish Nagar, Hoshangabad Road,<br />Bhopal 462026</p>
              </div>
            </div>

            <div className="os-col">
              <h3>Connect</h3>
              <div className="os-contact-block">
                <p className="os-contact-label">Business inquiry</p>
                <Link className="os-contact-value" href="tel:+918085652729">+91 80856 52729</Link>
              </div>
              <div className="os-contact-block">
                <p className="os-contact-label">HR &amp; careers</p>
                <Link className="os-contact-value" href="tel:+918982992729">+91 89829 92729</Link>
              </div>
              <div className="os-contact-block">
                <p className="os-contact-label">Email us</p>
                <Link className="os-contact-value" href="mailto:info@obsidiansix.com">info@obsidiansix.com</Link>
              </div>
              {/* Minimal Download Brochure Link */}
              <div className="mt-4">
                <Link
                  href="/download-brochure"
                  className="text-slate-400 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-wider underline inline-flex items-center gap-1"
                >
                  Download Brochure &rarr;
                </Link>
              </div>
            </div>

          </div>

          <div className="os-bottom">
            <div className="os-bottom-left">
              <span>© 2026 Obsidian Six. All rights reserved.</span>
              <span className="os-divider-dot"></span>
              <Link href="/terms/">Privacy policy</Link>
              <span className="os-divider-dot"></span>
              <Link href="/terms/">Terms &amp; conditions</Link>
            </div>
            <a className="os-back-top" href="#top" aria-label="Back to top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </a>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;