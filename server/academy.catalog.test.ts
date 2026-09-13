import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ALAA_ALRIFAEI_COURSE_SLUGS, CHILDREN_SLUGS, REQUESTED_COURSE_SLUGS, TRAINER_SLUGS } from "../client/src/lib/academyCatalog";

describe("academy course catalog", () => {
  it("contains the requested seven children courses and five trainer courses", () => {
    expect(CHILDREN_SLUGS).toHaveLength(7);
    expect(TRAINER_SLUGS).toHaveLength(5);
    expect(REQUESTED_COURSE_SLUGS.size).toBe(12);
    expect(CHILDREN_SLUGS).toContain("kids-quran-arabic");
    expect(TRAINER_SLUGS).toContain("trainer-ai");
  });

  it("assigns Alaa Alrifaee only the two AI courses", () => {
    expect(ALAA_ALRIFAEI_COURSE_SLUGS).toEqual(["kids-ai", "trainer-ai"]);
  });

  it("keeps the supplied image on both AI course seed records", () => {
    const seed = readFileSync(new URL("../seed.ts", import.meta.url), "utf8");
    expect(seed.match(/ai-courses_522f9710\.jpg/g)).toHaveLength(2);
  });

  it("keeps the supplied image on the English children course seed record", () => {
    const seed = readFileSync(new URL("../seed.ts", import.meta.url), "utf8");
    expect(seed).toContain("english-kids-course_9b73f52c.jpg");
  });

  it("keeps the supplied image on the Quran and Arabic children course seed record", () => {
    const seed = readFileSync(new URL("../seed.ts", import.meta.url), "utf8");
    expect(seed).toContain("quran-arabic-kids-course_26a38cfb.jpg");
  });

  it("keeps the trainer consultation section connected to the academy WhatsApp CTA", () => {
    const coursesPage = readFileSync(new URL("../client/src/pages/Courses.tsx", import.meta.url), "utf8");
    expect(coursesPage).toContain("استشارات في التعليم أونلاين");
    expect(coursesPage).toContain("احجزي استشارتك عبر الواتساب");
    expect(coursesPage).toContain("href={WHATSAPP_LINK}");
  });
});
