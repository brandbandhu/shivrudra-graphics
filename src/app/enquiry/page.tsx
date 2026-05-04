import type { Metadata } from "next";
import { CheckCircle2, Clock3, MessageCircle, Paperclip } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { allProducts, company, servicePages } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Enquiry Form",
  description:
    "Send Shivrudra Graphics a structured printing, branding, signage, gifting, or industrial marking enquiry.",
};

const serviceOptions = servicePages.map((page) => page.navLabel);
const productOptions = allProducts.map((item) => item.product);

export default function EnquiryPage() {
  return (
    <main>
      <section className="enquiry-hero">
        <div className="enquiry-hero-copy">
          <span className="eyebrow">Online enquiry</span>
          <h1>Tell us what you need printed, branded, or installed.</h1>
          <p>
            Submit one structured enquiry for quotation, order planning, design support,
            installation visit, or complaint follow-up.
          </p>
        </div>
        <div className="enquiry-steps">
          <article>
            <CheckCircle2 size={22} />
            <span>Fill product details</span>
          </article>
          <article>
            <Paperclip size={22} />
            <span>Attach artwork in WhatsApp</span>
          </article>
          <article>
            <Clock3 size={22} />
            <span>Team replies with next steps</span>
          </article>
          <article>
            <MessageCircle size={22} />
            <span>WhatsApp-first support</span>
          </article>
        </div>
      </section>

      <section className="enquiry-page-layout">
        <EnquiryForm serviceOptions={serviceOptions} productOptions={productOptions} />
        <aside className="enquiry-side-card">
          <h2>Need direct help?</h2>
          <p>{company.phoneDisplay}</p>
          <p>{company.email}</p>
          <p>{company.officeAddress}</p>
          <strong>Response details</strong>
          <span>
            The MVP does not store submissions in a database. Your enquiry opens in
            WhatsApp or email so the team can respond directly.
          </span>
        </aside>
      </section>
    </main>
  );
}
