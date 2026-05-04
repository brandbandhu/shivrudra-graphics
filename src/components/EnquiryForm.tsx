"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail, MessageCircle, Paperclip, Send, ShieldCheck } from "lucide-react";
import { company } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type EnquiryFormProps = {
  serviceOptions: string[];
  productOptions: string[];
  compact?: boolean;
};

const enquiryTypes = [
  "New Order",
  "Quotation Request",
  "Design Help",
  "Bulk / Corporate Order",
  "Installation Visit",
  "Complaint / Support",
];

const customerTypes = [
  "Business",
  "Individual",
  "School / College",
  "Hospital / Clinic",
  "Factory / Industrial",
  "Agency / Reseller",
];

const artworkStatuses = [
  "I have print-ready artwork",
  "I have a reference image",
  "I need design support",
  "I will share files later",
];

const contactMethods = ["WhatsApp", "Call", "Email"];

const initialForm = {
  enquiryType: "Quotation Request",
  customerType: "Business",
  name: "",
  companyName: "",
  mobile: "",
  email: "",
  service: "",
  product: "",
  quantity: "",
  size: "",
  material: "",
  finishing: "",
  artworkStatus: "I will share files later",
  deadline: "",
  location: "",
  budget: "",
  contactMethod: "WhatsApp",
  notes: "",
  consent: false,
};

type EnquiryState = typeof initialForm;

function makeMessage(form: EnquiryState) {
  return [
    "Hello Shivrudra Graphics,",
    "",
    "Website Enquiry Form",
    `Enquiry type: ${form.enquiryType}`,
    `Customer type: ${form.customerType}`,
    `Name: ${form.name}`,
    `Company/Organisation: ${form.companyName || "Not specified"}`,
    `Mobile: ${form.mobile}`,
    `Email: ${form.email || "Not specified"}`,
    `Preferred contact: ${form.contactMethod}`,
    "",
    "Requirement Details",
    `Service category: ${form.service || "Not selected"}`,
    `Product type: ${form.product || "Not selected"}`,
    `Quantity: ${form.quantity || "Not specified"}`,
    `Size: ${form.size || "Not specified"}`,
    `Material: ${form.material || "Not specified"}`,
    `Finishing/Printing notes: ${form.finishing || "Not specified"}`,
    `Artwork status: ${form.artworkStatus}`,
    `Deadline: ${form.deadline || "Not specified"}`,
    `Delivery/installation location: ${form.location || "Not specified"}`,
    `Budget range: ${form.budget || "Not specified"}`,
    "",
    `Additional notes: ${form.notes || "No extra notes"}`,
    "",
    "I will attach artwork/photos directly in WhatsApp if required.",
  ].join("\n");
}

export function EnquiryForm({
  serviceOptions,
  productOptions,
  compact = false,
}: EnquiryFormProps) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const message = useMemo(() => makeMessage(form), [form]);
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(message), [message]);
  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(`Website enquiry - ${form.product || form.service || "Printing"}`);
    const body = encodeURIComponent(message);
    return `mailto:${company.email}?subject=${subject}&body=${body}`;
  }, [form.product, form.service, message]);

  const update = <Field extends keyof EnquiryState>(
    field: Field,
    value: EnquiryState[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className={`enquiry-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <div className="form-heading">
        <span className="form-icon enquiry-icon" aria-hidden="true">
          <Send size={20} />
        </span>
        <div>
          <h2>Online Enquiry Form</h2>
          <p>Share clear requirements once. The team receives a ready WhatsApp enquiry.</p>
        </div>
      </div>

      <div className="enquiry-grid two">
        <label>
          Enquiry type
          <select
            value={form.enquiryType}
            onChange={(event) => update("enquiryType", event.target.value)}
          >
            {enquiryTypes.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Customer type
          <select
            value={form.customerType}
            onChange={(event) => update("customerType", event.target.value)}
          >
            {customerTypes.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Mobile number
          <input
            required
            inputMode="tel"
            pattern="[0-9+ ]{8,18}"
            value={form.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            placeholder="+91"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
          />
        </label>
      </div>

      <label>
        Company / organisation
        <input
          value={form.companyName}
          onChange={(event) => update("companyName", event.target.value)}
          placeholder="Business, school, factory, agency, etc."
        />
      </label>

      <div className="enquiry-grid two">
        <label>
          Service category
          <select
            required
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Select service</option>
            {serviceOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product type
          <input
            required
            list="enquiry-product-options"
            value={form.product}
            onChange={(event) => update("product", event.target.value)}
            placeholder="e.g. Visiting Cards, LED Signage"
          />
          <datalist id="enquiry-product-options">
            {productOptions.map((option) => (
              <option value={option} key={option} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Quantity
          <input
            value={form.quantity}
            onChange={(event) => update("quantity", event.target.value)}
            placeholder="e.g. 500 pcs"
          />
        </label>
        <label>
          Size
          <input
            value={form.size}
            onChange={(event) => update("size", event.target.value)}
            placeholder="e.g. 3x2 ft, A4"
          />
        </label>
        <label>
          Material
          <input
            value={form.material}
            onChange={(event) => update("material", event.target.value)}
            placeholder="e.g. vinyl, acrylic"
          />
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Finishing / printing notes
          <input
            value={form.finishing}
            onChange={(event) => update("finishing", event.target.value)}
            placeholder="lamination, LED, mounting, etc."
          />
        </label>
        <label>
          Artwork status
          <select
            value={form.artworkStatus}
            onChange={(event) => update("artworkStatus", event.target.value)}
          >
            {artworkStatuses.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Deadline
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
          />
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Delivery / installation location
          <input
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="Area, city, site address"
          />
        </label>
        <label>
          Budget range
          <input
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            placeholder="Optional"
          />
        </label>
        <label>
          Preferred contact
          <select
            value={form.contactMethod}
            onChange={(event) => update("contactMethod", event.target.value)}
          >
            {contactMethods.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Requirement details
        <textarea
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Mention purpose, branding details, installation needs, references, or any special instruction."
        />
      </label>

      <div className="file-note">
        <Paperclip size={18} />
        Artwork/photos are attached directly in WhatsApp after this form opens.
      </div>

      <label className="consent-row">
        <input
          required
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
        />
        I agree that Shivrudra Graphics may contact me about this enquiry.
      </label>

      {submitted ? (
        <p className="success-note">
          <ShieldCheck size={18} />
          Enquiry prepared. If WhatsApp did not open, use the buttons below.
        </p>
      ) : null}

      <div className="enquiry-actions">
        <button className="submit-button" type="submit">
          <MessageCircle size={18} />
          Send on WhatsApp
        </button>
        <a className="mail-action" href={mailtoUrl}>
          <Mail size={18} />
          Send by Email
        </a>
      </div>
    </form>
  );
}
