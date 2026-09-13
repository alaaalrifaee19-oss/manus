import { describe, expect, it } from "vitest";
import { ACADEMY_EMAIL, ACADEMY_INSTAGRAM, ACADEMY_OWNER_NAME, ACADEMY_WHATSAPP, buildRegistrationWhatsAppLink } from "../client/src/lib/academy";

describe("academy identity", () => {
  it("uses the requested owner name, academy email, and WhatsApp number", () => {
    expect(ACADEMY_OWNER_NAME).toBe("Huda Abden");
    expect(ACADEMY_EMAIL).toBe("alhudaacademy26@gmail.com");
    expect(ACADEMY_WHATSAPP).toBe("+905317329883");
    expect(ACADEMY_INSTAGRAM).toBe("https://www.instagram.com/alhuda_academy26?stkn=MWlmMG5qMXE0YjRmcw==");
  });

  it("builds a WhatsApp registration link with the submitted information", () => {
    const link = buildRegistrationWhatsAppLink({
      name: "أم ليان",
      email: "parent@example.com",
      phone: "+905551112233",
      program: "الحساب الذهني",
    });

    expect(link).toContain("https://wa.me/905317329883?text=");
    expect(decodeURIComponent(link)).toContain("أم ليان");
    expect(decodeURIComponent(link)).toContain("الحساب الذهني");
  });
});
