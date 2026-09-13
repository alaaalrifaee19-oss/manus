export const ACADEMY_OWNER_NAME = "Huda Abden";
export const ACADEMY_EMAIL = "alhudaacademy26@gmail.com";
export const ACADEMY_WHATSAPP = "+905317329883";
export const ACADEMY_INSTAGRAM = "https://www.instagram.com/alhuda_academy26?stkn=MWlmMG5qMXE0YjRmcw==";

export function buildRegistrationWhatsAppLink(details: {
  name: string;
  email: string;
  phone?: string;
  program?: string;
}) {
  const message = encodeURIComponent(
    `السلام عليكم، أرغب في التسجيل في أكاديمية الهدى التعليمية.\nمعلومات التسجيل:\nالاسم: ${details.name}\nالبريد الإلكتروني: ${details.email}\nرقم الواتساب: ${details.phone || "لم يُذكر"}\nالبرنامج أو الدورة المطلوبة: ${details.program || "أرغب بالاستشارة"}`
  );
  return `https://wa.me/${ACADEMY_WHATSAPP.replace(/\D/g, "")}?text=${message}`;
}
