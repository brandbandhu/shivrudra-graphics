"use client";

import { FormEvent, useState } from "react";
import { Package, Send, ShieldCheck } from "lucide-react";

const deliveryModes = ["Pickup from store", "Home/Office delivery", "On-site installation"];
const artworkOptions = ["Artwork ready", "Need design support", "Rework from old design"];

const initialForm = {
  customerName: "",
  contact: "",
  email: "",
  companyName: "",
  productName: "",
  quantity: "",
  size: "",
  material: "",
  deadline: "",
  deliveryMode: "Pickup from store",
  deliveryAddress: "",
  artworkStatus: "Artwork ready",
  notes: "",
};

type OrderState = typeof initialForm;

export function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const update = <Field extends keyof OrderState>(
    field: Field,
    value: OrderState[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);
    setSuccessMessage("");

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: form.customerName,
        contact: form.contact,
        email: form.email,
        companyName: form.companyName,
        productName: form.productName,
        quantity: form.quantity,
        size: form.size,
        material: form.material,
        deadline: form.deadline,
        deliveryMode: form.deliveryMode,
        deliveryAddress: form.deliveryAddress,
        artworkStatus: form.artworkStatus,
        notes: form.notes,
      };

      const response = await fetch("/api/order-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Could not submit order right now. Please try again.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data.error) {
            message = data.error;
          }
        } catch {
          // Keep default message when response is not JSON.
        }
        throw new Error(message);
      }

      try {
        const data = (await response.json()) as { endpoint?: string };
        if (data.endpoint) {
          setSuccessMessage(`Submitted via ${data.endpoint}`);
        }
      } catch {
        // Success without JSON body is fine.
      }

      setSubmitted(true);
      setForm({ ...initialForm });
    } catch (errorInfo) {
      const message =
        errorInfo instanceof Error && errorInfo.message
          ? errorInfo.message
          : "Could not submit order right now. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const needsAddress = form.deliveryMode !== "Pickup from store";

  return (
    <form className="enquiry-form order-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="form-icon order-icon" aria-hidden="true">
          <Package size={20} />
        </span>
        <div>
          <h2>Order Form</h2>
          <p>Fill required order details for quotation, planning, and delivery.</p>
        </div>
      </div>

      <div className="enquiry-grid three">
        <label>
          Customer Name *
          <input
            required
            value={form.customerName}
            onChange={(event) => update("customerName", event.target.value)}
            placeholder="Customer full name"
          />
        </label>
        <label>
          Contact Number *
          <input
            required
            inputMode="tel"
            pattern="[0-9+ ]{8,18}"
            value={form.contact}
            onChange={(event) => update("contact", event.target.value)}
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

      <div className="enquiry-grid three">
        <label>
          Company / Business Name
          <input
            value={form.companyName}
            onChange={(event) => update("companyName", event.target.value)}
            placeholder="Optional"
          />
        </label>
        <label>
          Product / Service *
          <input
            required
            value={form.productName}
            onChange={(event) => update("productName", event.target.value)}
            placeholder="e.g. Visiting Cards, Banner, T-shirt print"
          />
        </label>
        <label>
          Quantity *
          <input
            required
            type="number"
            min={1}
            value={form.quantity}
            onChange={(event) => update("quantity", event.target.value)}
            placeholder="e.g. 100"
          />
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Size / Dimensions
          <input
            value={form.size}
            onChange={(event) => update("size", event.target.value)}
            placeholder="e.g. A4, 3x2 ft, L size"
          />
        </label>
        <label>
          Material / Finish
          <input
            value={form.material}
            onChange={(event) => update("material", event.target.value)}
            placeholder="e.g. Matte, Glossy, Flex, Cotton"
          />
        </label>
        <label>
          Required By Date *
          <input
            required
            type="date"
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
          />
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Delivery Mode *
          <select
            value={form.deliveryMode}
            onChange={(event) => update("deliveryMode", event.target.value)}
          >
            {deliveryModes.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Artwork Status *
          <select
            value={form.artworkStatus}
            onChange={(event) => update("artworkStatus", event.target.value)}
          >
            {artworkOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Delivery / Installation Address{needsAddress ? " *" : ""}
          <input
            required={needsAddress}
            value={form.deliveryAddress}
            onChange={(event) => update("deliveryAddress", event.target.value)}
            placeholder={needsAddress ? "Required for delivery/installation" : "Not needed for pickup"}
          />
        </label>
      </div>

      <label>
        Notes / Instructions
        <textarea
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Color, text, design references, special instructions"
        />
      </label>

      {submitted ? (
        <p className="success-note">
          <ShieldCheck size={18} />
          {successMessage || "Order submitted successfully."}
        </p>
      ) : null}

      {error ? <p className="error-note">{error}</p> : null}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        <Send size={18} />
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  );
}
