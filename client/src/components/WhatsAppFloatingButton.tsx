import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "./Navbar";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle className="w-6 h-6 animate-bounce" />
      <span className="hidden sm:inline-block text-xs font-bold">
        تحدث مع مستشارة القبول
      </span>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    </a>
  );
}
