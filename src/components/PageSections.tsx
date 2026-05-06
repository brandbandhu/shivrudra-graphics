import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Home, Layers3, MessageCircle, Palette } from "lucide-react";
import {
  allProducts,
  clients,
  company,
  industries,
  pages,
  servicePages,
  timeline,
  type CataloguePage,
  workProcess,
} from "@/lib/site-data";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";
import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsAppLeadForm } from "@/components/WhatsAppLeadForm";

const serviceOptions = servicePages.map((page) => page.navLabel);
const productOptions = allProducts.map((item) => item.product);

function productVisualClass(product: string) {
  const normalized = product.toLowerCase();

  if (normalized.includes("card") || normalized.includes("certificate") || normalized.includes("voucher")) {
    return "visual-cards";
  }

  if (normalized.includes("shirt") || normalized.includes("uniform") || normalized.includes("fabric")) {
    return "visual-shirt";
  }

  if (normalized.includes("cap")) {
    return "visual-cap";
  }

  if (normalized.includes("sticker") || normalized.includes("label") || normalized.includes("tag")) {
    return "visual-sticker";
  }

  if (normalized.includes("album") || normalized.includes("photo") || normalized.includes("frame")) {
    return "visual-album";
  }

  if (normalized.includes("bag") || normalized.includes("folder") || normalized.includes("book")) {
    return "visual-bag";
  }

  if (normalized.includes("letterhead") || normalized.includes("envelope") || normalized.includes("pad")) {
    return "visual-folder";
  }

  if (normalized.includes("sign") || normalized.includes("board") || normalized.includes("standee")) {
    return "visual-sign";
  }

  if (normalized.includes("stamp") || normalized.includes("print")) {
    return "visual-stamp";
  }

  if (normalized.includes("bottle") || normalized.includes("mug") || normalized.includes("tumbler")) {
    return "visual-bottle";
  }

  return "visual-book";
}

const heroImageSets: Record<string, string[]> = {
  "about-us": ["stationery", "signage", "business-cards", "notebook"],
  "vision-mission-values": ["notebook", "stationery", "business-cards", "photo"],
  "commitment-timeline": ["business-cards", "stationery", "signage", "notebook"],
  "why-choose-us": ["stationery", "business-cards", "packaging", "signage"],
  "industries-we-serve": ["signage", "packaging", "apparel", "stationery"],
  designing: ["stationery", "business-cards", "stickers", "photo"],
  "solvent-eco-solvent-printing": ["signage", "shipping", "stickers", "packaging"],
  "digital-printing": ["stickers", "business-cards", "photo", "packaging"],
  "offset-printing": ["business-cards", "stationery", "notebook", "photo"],
  "stamps-screen-pad-printing": ["stationery", "packaging", "stickers", "business-cards"],
  "badges-stickers-keychains": ["stickers", "photo", "packaging", "business-cards"],
  "corporate-gifts": ["apparel", "photo", "notebook", "packaging"],
  "engraving-marking": ["notebook", "stationery", "signage", "packaging"],
  signages: ["signage", "shipping", "stickers", "business-cards"],
  "premium-safety-signages": ["signage", "shipping", "packaging", "stickers"],
  "laser-cnc-ferrule-printing": ["signage", "stationery", "packaging", "stickers"],
  "trophies-medals-nameplates": ["photo", "notebook", "stationery", "signage"],
  clients: ["signage", "business-cards", "stationery", "photo"],
  contact: ["stationery", "signage", "notebook", "business-cards"],
};

function heroImages(page: CataloguePage) {
  return heroImageSets[page.slug] ?? ["business-cards", "stationery", "notebook", "photo"];
}

function breadcrumbGroup(page: CataloguePage) {
  if (page.slug === "contact") {
    return "Contact";
  }

  if (page.slug === "clients") {
    return "Work";
  }

  if (page.slug === "industries-we-serve") {
    return "Industries";
  }

  if (page.products?.length) {
    return "Services";
  }

  return "Company";
}

export function PageHero({ page }: { page: CataloguePage }) {
  const group = breadcrumbGroup(page);
  const images = heroImages(page);

  return (
    <section className={`page-hero offset-hero accent-${page.accent}`}>
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">
          <Home size={14} />
          Home
        </Link>
        <span>/</span>
        <span>{group}</span>
        <span>/</span>
        <strong>{page.navLabel}</strong>
      </nav>
      <div className="page-hero-copy protected-content">
        <span className="eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
        <div className="hero-actions">
          <a className="primary-action" href="#order">
            <MessageCircle size={18} />
            Start WhatsApp Order
          </a>
          <Link className="secondary-action" href="/contact">
            Contact Details
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      <div className="hero-visual service-visual offset-visual protected-media" aria-label={`${page.navLabel} visual preview`}>
        {images.map((image, index) => (
          <div
            className={`service-image-tile service-tile-${index + 1} hero-img-${image}`}
            key={`${page.slug}-${image}-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function OffsetShowcase() {
  const steps = [
    { title: "Artwork Check", text: "Share files, size, paper and quantity before production starts.", icon: FileText },
    { title: "Color Planning", text: "Keep stationery, catalogues and brand material visually consistent.", icon: Palette },
    { title: "Finishing", text: "Discuss folds, binding, numbering, bags, tags and dispatch needs.", icon: Layers3 },
  ];

  return (
    <section className="offset-showcase">
      <div className="offset-showcase-copy">
        <span className="eyebrow">Offset workflow</span>
        <h2>Built for repeatable, clean business print runs.</h2>
        <p>
          From visiting cards to catalogues, offset jobs need clarity before the press starts.
          This page helps customers move from product selection to a precise WhatsApp enquiry.
        </p>
      </div>
      <div className="offset-step-grid protected-content">
        {steps.map((step) => {
          const StepIcon = step.icon;
          return (
            <article key={step.title}>
              <StepIcon size={22} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Highlights({ page }: { page: CataloguePage }) {
  return (
    <section className="content-band">
      <div className="section-heading">
        <span className="eyebrow">What you get</span>
        <h2>Built for practical business printing.</h2>
      </div>
      <div className="highlight-grid protected-content">
        {page.highlights.map((item) => (
          <article className="highlight-card" key={item}>
            <CheckCircle2 size={20} />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Products({ page }: { page: CataloguePage }) {
  if (!page.products?.length) {
    return null;
  }

  return (
    <section className="content-band" id="products">
      <div className="section-heading split">
        <div>
          <span className="eyebrow">Products</span>
          <h2>Choose a product type to discuss on WhatsApp.</h2>
        </div>
        <a className="secondary-action" href="#order">
          Order Details
          <ArrowRight size={18} />
        </a>
      </div>

      <div className="product-grid protected-content">
        {page.products.map((product) => (
          <article className="product-card" key={product}>
            <div className={`product-media protected-media ${productVisualClass(product)}`} />
            <h3>{product}</h3>
            <a href="#order">Enquire</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Materials({ page }: { page: CataloguePage }) {
  if (!page.materials?.length) {
    return null;
  }

  return (
    <section className="option-band">
      <div>
        <span className="eyebrow">Common options</span>
        <h2>Mention these details in your WhatsApp order.</h2>
      </div>
      <div className="option-chips protected-content">
        {page.materials.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function SpecialSections({ page }: { page: CataloguePage }) {
  if (page.slug === "offset-printing") {
    return <OffsetShowcase />;
  }

  if (page.slug === "commitment-timeline") {
    return (
      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">Evolution</span>
          <h2>Company timeline</h2>
        </div>
        <div className="timeline protected-content">
          {timeline.map((item) => (
            <article key={item.year}>
              <span>{item.year}</span>
              <h3>{item.name}</h3>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (page.slug === "why-choose-us") {
    return (
      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">Process</span>
          <h2>From lead to feedback.</h2>
        </div>
        <div className="process-line protected-content">
          {workProcess.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (page.slug === "industries-we-serve") {
    return (
      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">Industries</span>
          <h2>Print requirements across sectors.</h2>
        </div>
        <div className="industry-grid protected-content">
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </section>
    );
  }

  if (page.slug === "clients") {
    return (
      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">Client logos</span>
          <h2>Protected placeholder logo wall.</h2>
        </div>
        <div className="client-grid protected-content">
          {clients.map((client) => (
            <span className="client-logo" key={client}>
              {client}
            </span>
          ))}
        </div>
      </section>
    );
  }

  if (page.slug === "vision-mission-values" && page.sections?.length) {
    return (
      <section className="content-band">
        <div className="value-grid protected-content">
          {page.sections.map((section) => (
            <article className="value-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (page.stats?.length) {
    return (
      <section className="stats-row protected-content">
        {page.stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>
    );
  }

  return null;
}

export function LeadSection({ page }: { page: CataloguePage }) {
  if (page.slug === "contact") {
    return (
      <section className="contact-layout" id="order">
        <div className="contact-panel protected-content">
          <span className="eyebrow">Office</span>
          <h2>Shivrudra Graphics Pvt Ltd</h2>
          <p>{company.officeAddress}</p>
          <span className="eyebrow">Factory</span>
          <p>{company.factoryAddress}</p>
          <ul>
            {company.phones.map((phone) => (
              <li key={phone}>{phone}</li>
            ))}
            <li>{company.email}</li>
            <li>{company.website}</li>
          </ul>
          <a
            className="primary-action"
            href={defaultWhatsAppMessage("Contact request")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp Now
          </a>
        </div>
        <div className="stacked-forms">
          <EnquiryForm serviceOptions={serviceOptions} productOptions={productOptions} compact />
          <WhatsAppLeadForm
            serviceOptions={serviceOptions}
            productOptions={productOptions}
            mode="Complaint"
            compact
          />
        </div>
      </section>
    );
  }

  return (
    <section className="order-section" id="order">
      <div className="section-heading">
        <span className="eyebrow">WhatsApp order</span>
        <h2>Send service, size, quantity, material, and deadline in one message.</h2>
      </div>
      <WhatsAppLeadForm
        serviceOptions={serviceOptions}
        productOptions={page.products ?? productOptions}
        defaultService={page.navLabel}
        defaultProduct={page.products?.[0] ?? ""}
      />
    </section>
  );
}

export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const related = pages.filter((page) => page.slug !== currentSlug).slice(0, 6);

  return (
    <section className="content-band">
      <div className="section-heading">
        <span className="eyebrow">More from Shivrudra</span>
        <h2>Continue browsing services.</h2>
      </div>
      <div className="related-grid">
        {related.map((page) => {
          const Icon = page.icon;
          return (
            <Link className={`related-card accent-${page.accent}`} href={`/${page.slug}`} key={page.slug}>
              <Icon size={22} />
              <span>{page.navLabel}</span>
              <ArrowRight size={16} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
