"use client";

import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, Paperclip } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LeadMode = "Order Request" | "General Enquiry" | "Complaint";

type WhatsAppLeadFormProps = {
  serviceOptions: string[];
  productOptions: string[];
  defaultService?: string;
  defaultProduct?: string;
  mode?: LeadMode;
  compact?: boolean;
};

const blankState = {
  name: "",
  mobile: "",
  service: "",
  product: "",
  quantity: "",
  size: "",
  material: "",
  deadline: "",
  address: "",
  notes: "",
};

export function WhatsAppLeadForm({
  serviceOptions,
  productOptions,
  defaultService = "",
  defaultProduct = "",
  mode = "Order Request",
  compact = false,
}: WhatsAppLeadFormProps) {
  const [form, setForm] = useState({
    ...blankState,
    service: defaultService,
    product: defaultProduct,
  });

  const selectedProducts = useMemo(() => {
    if (!defaultService || form.service === defaultService) {
      return productOptions;
    }

    return productOptions;
  }, [defaultService, form.service, productOptions]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      `Hello Shivrudra Graphics,`,
      ``,
      `${mode} from website`,
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Service: ${form.service || "Not selected"}`,
      `Product type: ${form.product || "Not selected"}`,
      `Quantity: ${form.quantity || "Not specified"}`,
      `Size: ${form.size || "Not specified"}`,
      `Material: ${form.material || "Not specified"}`,
      `Deadline: ${form.deadline || "Not specified"}`,
      `Address/Location: ${form.address || "Not specified"}`,
      `Notes: ${form.notes || "No extra notes"}`,
      ``,
      `I will attach artwork/photos directly in WhatsApp if required.`,
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form className={`lead-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <div className="form-heading">
        <span className="form-icon" aria-hidden="true">
          <MessageCircle size={20} />
        </span>
        <div>
          <h2>{mode}</h2>
          <p>Fill details once. WhatsApp opens with a ready message.</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Customer name
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
            value={form.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            placeholder="+91"
          />
        </label>
        <label>
          Service
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
            list="product-options"
            required
            value={form.product}
            onChange={(event) => update("product", event.target.value)}
            placeholder="e.g. Business Cards"
          />
          <datalist id="product-options">
            {selectedProducts.map((option) => (
              <option value={option} key={option} />
            ))}
          </datalist>
        </label>
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
            placeholder="e.g. A4, 3x2 ft"
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
        <label>
          Deadline
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
          />
        </label>
      </div>

      <label>
        Address / location
        <input
          value={form.address}
          onChange={(event) => update("address", event.target.value)}
          placeholder="Delivery or installation location"
        />
      </label>

      <label>
        Notes
        <textarea
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder={
            mode === "Complaint"
              ? "Describe the issue, order reference, and expected resolution"
              : "Tell us finish, design, installation, or branding requirements"
          }
        />
      </label>

      <div className="file-note">
        <Paperclip size={18} />
        Artwork and photos are attached directly in WhatsApp after this message opens.
      </div>

      <button className="submit-button" type="submit">
        <MessageCircle size={18} />
        Open WhatsApp
      </button>
    </form>
  );
}
