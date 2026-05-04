"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { company } from "@/lib/site-data";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const quickReplies = [
  "I want a quotation",
  "What services do you provide?",
  "How do I place an order?",
  "Share contact details",
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "bot",
    text: "Hi, I am Shivrudra Assistant. I can help with product selection, quotation details, ordering steps, complaints, and contact information.",
  },
];

function getBotReply(input: string) {
  const query = input.toLowerCase();

  if (query.match(/quote|quotation|price|rate|cost|estimate|budget/)) {
    return "For a quotation, please share product type, quantity, size, material, artwork status, deadline, and delivery or installation location. I can open WhatsApp with these details for the team.";
  }

  if (query.match(/order|buy|place|whatsapp|artwork|file|upload/)) {
    return "To place an order, choose a product, mention size, quantity, material and deadline, then attach artwork or photos directly in WhatsApp.";
  }

  if (query.match(/service|provide|printing|design|sign|gift|label|sticker|cnc|engraving/)) {
    return "Shivrudra provides designing, digital and offset printing, solvent printing, signages, stickers, labels, corporate gifts, engraving, laser/CNC cutting, trophies, stamps, screen printing, pad printing and fabrication.";
  }

  if (query.match(/contact|phone|mobile|email|address|location|office|factory/)) {
    return `Contact Shivrudra at ${company.phoneDisplay}, ${company.email}. Office: ${company.officeAddress}. Factory: ${company.factoryAddress}.`;
  }

  if (query.match(/complaint|issue|problem|wrong|delay|damaged|support/)) {
    return "For complaints, please share your name, mobile number, product/order reference, issue photos if available, and expected resolution. The team can follow up on WhatsApp.";
  }

  if (query.match(/time|delivery|urgent|today|tomorrow|deadline/)) {
    return "Delivery timelines depend on product, quantity, material and finishing. For urgent work, share the deadline clearly on WhatsApp so the team can confirm feasibility.";
  }

  if (query.match(/hello|hi|hey|namaste/)) {
    return "Hello. Tell me what you want to print or brand, and I will guide you with the right details to share.";
  }

  return "I can help with services, quotation details, order steps, complaints and contact information. For exact pricing, please continue on WhatsApp with product, quantity, size and material.";
}

function whatsappHandoffUrl(messages: ChatMessage[]) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => `- ${message.text}`)
    .join("\n");

  return buildWhatsAppUrl(
    `Hello Shivrudra Graphics,\n\nI was using the website chatbot and need help.\n\nMy questions/details:\n${userMessages || "- Website enquiry"}\n\nPlease contact me.`,
  );
}

export function SimpleChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const handoffUrl = useMemo(() => whatsappHandoffUrl(messages), [messages]);

  const addUserMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: trimmed },
      { id: Date.now() + 1, role: "bot", text: getBotReply(trimmed) },
    ]);
    setInput("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUserMessage(input);
  };

  return (
    <div className={`chatbot-widget ${open ? "open" : ""}`}>
      {open ? (
        <section className="chatbot-panel" aria-label="Shivrudra chatbot">
          <header className="chatbot-header">
            <span className="chatbot-avatar" aria-hidden="true">
              <Bot size={21} />
            </span>
            <div>
              <strong>Shivrudra Assistant</strong>
              <small>Quick help for printing enquiries</small>
            </div>
            <button type="button" aria-label="Close chatbot" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <p className={`chat-message ${message.role}`} key={message.id}>
                {message.text}
              </p>
            ))}
          </div>

          <div className="chatbot-quick-replies" aria-label="Quick chatbot questions">
            {quickReplies.map((reply) => (
              <button type="button" key={reply} onClick={() => addUserMessage(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={submit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question"
              aria-label="Type your question"
            />
            <button type="submit" aria-label="Send message">
              <Send size={17} />
            </button>
          </form>

          <a className="chatbot-whatsapp" href={handoffUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17} />
            Continue on WhatsApp
          </a>
        </section>
      ) : (
        <button
          className="chatbot-launcher"
          type="button"
          aria-label="Open Shivrudra chatbot"
          onClick={() => setOpen(true)}
        >
          <Bot size={26} />
          <span>Chat</span>
        </button>
      )}
    </div>
  );
}
