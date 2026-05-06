import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, pages, servicePages } from "@/lib/site-data";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";

const footerServiceLabels: Record<string, string> = {
  designing: "Designing",
  "solvent-eco-solvent-printing": "Solvent / Eco Solvent",
  "digital-printing": "Digital Printing",
  "offset-printing": "Offset Printing",
  "stamps-screen-pad-printing": "Stamps / Screen / Pad",
  "badges-stickers-keychains": "Badges & Keychains",
  "corporate-gifts": "Corporate Gifts",
  "engraving-marking": "Engraving & Marking",
  signages: "Signages",
  "premium-safety-signages": "Premium Safety Signages",
  "laser-cnc-ferrule-printing": "Laser, CNC & Ferrule",
  "trophies-medals-nameplates": "Trophies & Nameplates",
};

function footerServiceLabel(slug: string, fallback: string) {
  return footerServiceLabels[slug] ?? fallback;
}

const companyLinks = pages.filter((page) => !page.products?.length && page.slug !== "contact");

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img
              src="/images/home/logo.png"
              alt="Shivrudra Graphics logo"
              className="brand-logo"
            />
          </div>
          <p className="footer-copy">
            Complete designing, printing, branding, signage, gifting, engraving,
            fabrication, and industrial label solutions from Pune.
          </p>
        </div>

        <div>
          <h2>Services</h2>
          <div className="footer-links compact">
            {servicePages.map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>
                {footerServiceLabel(page.slug, page.navLabel)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>Company</h2>
          <div className="footer-links">
            <Link href="/enquiry">Enquiry</Link>
            {companyLinks.map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>
                {page.navLabel}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="contact-list">
            <li className="footer-phone-links">
              <Phone size={15} />
              <span>
                {company.phones.map((phone, index) => (
                  <span key={phone}>
                    <Link href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</Link>
                    {index < company.phones.length - 1 ? <span aria-hidden="true"> | </span> : null}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Mail size={15} />
              {company.email}
            </li>
            <li>
              <MapPin size={15} />
              {company.officeAddress}
            </li>
          </ul>
          <a
            className="footer-whatsapp"
            href={defaultWhatsAppMessage()}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} />
            WhatsApp Shivrudra
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Shivrudra Graphics Pvt Ltd. All rights reserved.</span>
        <span>Designing, Printing, Branding, Signage, Gifts, Engraving & Fabrication.</span>
        <Link href="/enquiry">
          Send Enquiry
          <ArrowRight size={14} />
        </Link>
      </div>
    </footer>
  );
}
