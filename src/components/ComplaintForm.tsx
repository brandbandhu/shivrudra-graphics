"use client";

import { FormEvent, useState } from "react";
import { ClipboardList, Send, ShieldCheck } from "lucide-react";

const complaintTypes = [
  "Printing quality issue",
  "Wrong item delivered",
  "Damaged item",
  "Delay in delivery",
  "Installation issue",
  "Billing issue",
  "Other",
];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];
const resolutionOptions = [
  "Replacement",
  "Reprint",
  "Repair / Service visit",
  "Refund / Credit note",
  "Need callback",
];

const initialForm = {
  customerName: "",
  contact: "",
  email: "",
  orderReference: "",
  productService: "",
  complaintType: "Printing quality issue",
  issueDate: "",
  priority: "Medium",
  preferredResolution: "Replacement",
  locationAddress: "",
  attachmentLink: "",
  complaintDetails: "",
  additionalNotes: "",
};

type ComplaintState = typeof initialForm;

export function ComplaintForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const update = <Field extends keyof ComplaintState>(
    field: Field,
    value: ComplaintState[Field],
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
        orderReference: form.orderReference,
        productService: form.productService,
        complaintType: form.complaintType,
        issueDate: form.issueDate,
        priority: form.priority,
        preferredResolution: form.preferredResolution,
        locationAddress: form.locationAddress,
        attachmentLink: form.attachmentLink,
        complaintDetails: form.complaintDetails,
        additionalNotes: form.additionalNotes,
      };

      const response = await fetch("/api/complaint-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Could not submit complaint right now. Please try again.";
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
          setSuccessMessage(`Complaint submitted via ${data.endpoint}`);
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
          : "Could not submit complaint right now. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="enquiry-form complaint-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="form-icon complaint-icon" aria-hidden="true">
          <ClipboardList size={20} />
        </span>
        <div>
          <h2>Complaint Form</h2>
          <p>Raise a complaint with required details for faster support and resolution.</p>
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
          Order / Invoice / Job No *
          <input
            required
            value={form.orderReference}
            onChange={(event) => update("orderReference", event.target.value)}
            placeholder="e.g. ORD-1024"
          />
        </label>
        <label>
          Product / Service *
          <input
            required
            value={form.productService}
            onChange={(event) => update("productService", event.target.value)}
            placeholder="e.g. Visiting cards, Signboard"
          />
        </label>
        <label>
          Complaint Type *
          <select
            value={form.complaintType}
            onChange={(event) => update("complaintType", event.target.value)}
          >
            {complaintTypes.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="enquiry-grid three">
        <label>
          Issue Date *
          <input
            required
            type="date"
            value={form.issueDate}
            onChange={(event) => update("issueDate", event.target.value)}
          />
        </label>
        <label>
          Priority *
          <select
            value={form.priority}
            onChange={(event) => update("priority", event.target.value)}
          >
            {priorityOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Preferred Resolution *
          <select
            value={form.preferredResolution}
            onChange={(event) => update("preferredResolution", event.target.value)}
          >
            {resolutionOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="enquiry-grid two">
        <label>
          Location (for visit/installation)
          <input
            value={form.locationAddress}
            onChange={(event) => update("locationAddress", event.target.value)}
            placeholder="Address where issue happened"
          />
        </label>
        <label>
          Attachment Link (photos/video)
          <input
            value={form.attachmentLink}
            onChange={(event) => update("attachmentLink", event.target.value)}
            placeholder="Google Drive / WhatsApp media link"
          />
        </label>
      </div>

      <label>
        Complaint Details *
        <textarea
          required
          value={form.complaintDetails}
          onChange={(event) => update("complaintDetails", event.target.value)}
          placeholder="Describe issue clearly: what went wrong, quantity affected, and expected fix."
        />
      </label>

      <label>
        Additional Notes
        <textarea
          value={form.additionalNotes}
          onChange={(event) => update("additionalNotes", event.target.value)}
          placeholder="Any extra details for support team"
        />
      </label>

      {submitted ? (
        <p className="success-note">
          <ShieldCheck size={18} />
          {successMessage || "Complaint submitted successfully."}
        </p>
      ) : null}

      {error ? <p className="error-note">{error}</p> : null}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        <Send size={18} />
        {isSubmitting ? "Submitting..." : "Raise Complaint"}
      </button>
    </form>
  );
}
