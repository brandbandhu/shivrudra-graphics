import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
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

export function PageHero({ page }: { page: CataloguePage }) {
  const Icon = page.icon;

  return (
    <section className={`page-hero accent-${page.accent}`}>
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
      <div className="hero-visual protected-media" aria-label={`${page.navLabel} visual preview`}>
        <Icon size={76} />
        <span>{page.navLabel}</span>
        <small>Protected preview</small>
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
        {page.products.map((product, index) => (
          <article className="product-card" key={product}>
            <div className={`product-media protected-media accent-${page.accent}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{product}</h3>
            <a href="#order">Start enquiry</a>
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
