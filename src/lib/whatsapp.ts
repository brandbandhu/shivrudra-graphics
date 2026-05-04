import { company } from "@/lib/site-data";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function defaultWhatsAppMessage(topic = "Website enquiry") {
  return buildWhatsAppUrl(
    `Hello Shivrudra Graphics,\n\nI want to discuss: ${topic}\n\nPlease contact me.`,
  );
}
