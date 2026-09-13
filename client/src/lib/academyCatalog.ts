export const CHILDREN_SLUGS = [
  "kids-quran-arabic",
  "kids-english",
  "kids-mental-math",
  "kids-sudoku",
  "kids-multiplication",
  "kids-rubik-cube",
  "kids-ai",
] as const;

export const TRAINER_SLUGS = [
  "trainer-mental-math",
  "trainer-sudoku",
  "trainer-rubik-cube",
  "trainer-multiplication",
  "trainer-ai",
] as const;

export const ALAA_ALRIFAEI_COURSE_SLUGS = ["kids-ai", "trainer-ai"] as const;

export const REQUESTED_COURSE_SLUGS = new Set<string>([
  ...CHILDREN_SLUGS,
  ...TRAINER_SLUGS,
]);
