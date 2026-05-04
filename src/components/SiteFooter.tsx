import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, servicePages } from "@/lib/site-data";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
              {company.mark}
            </span>
            <div>
              <strong>{company.name}</strong>
              <p>{company.tagline}</p>
            </div>
          </div>
          <p className="footer-copy">
            Complete designing, printing, branding, signboard, gifting, engraving,
            fabrication, and industrial label solutions from Pune.
          </p>
        </div>

        <div>
          <h2>Popular Services</h2>
          <div className="footer-links">
            {servicePages.slice(0, 8).map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>
                {page.navLabel}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="contact-list">
            <li>
              <Phone size={16} />
              {company.phones.join(" | ")}
            </li>
            <li>
              <Mail size={16} />
              {company.email}
            </li>
            <li>
              <MapPin size={16} />
              {company.officeAddress}
            </li>
          </ul>
          <a
            className="footer-whatsapp"
            href={defaultWhatsAppMessage()}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp Shivrudra
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Shivrudra Graphics Pvt Ltd. All rights reserved.</span>
        <span>Local MVP build. Admin, payments, and Google Sheets are deferred.</span>
      </div>
    </footer>
  );
}
