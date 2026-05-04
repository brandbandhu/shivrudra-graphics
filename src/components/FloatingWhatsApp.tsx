import { MessageCircle } from "lucide-react";
import { defaultWhatsAppMessage } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={defaultWhatsAppMessage("Website enquiry")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Shivrudra Graphics on WhatsApp"
    >
      <MessageCircle size={28} />
      <span>WhatsApp</span>
    </a>
  );
}
