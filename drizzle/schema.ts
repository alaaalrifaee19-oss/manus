import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Users table with roles: student, instructor, admin
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  avatarUrl: text("avatarUrl"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "student", "instructor", "admin"]).default("student").notNull(),
  bio: text("bio"),
  country: varchar("country", { length: 120 }),
  city: varchar("city", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories for courses and blog
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 64 }),
  orderIndex: int("orderIndex").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Instructors Directory
 */
export const instructors = mysqlTable("instructors", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  detailedBio: text("detailedBio"),
  qualifications: text("qualifications"),
  credentials: text("credentials"),
  avatarUrl: text("avatarUrl").notNull(),
  experienceYears: int("experienceYears").default(5).notNull(),
  studentsTrained: int("studentsTrained").default(100).notNull(),
  trainersGraduated: int("trainersGraduated").default(20).notNull(),
  location: varchar("location", { length: 160 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  rating: varchar("rating", { length: 10 }).default("4.9").notNull(),
  reviewCount: int("reviewCount").default(45).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = typeof instructors.$inferInsert;

/**
 * Courses Table
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  categoryId: int("categoryId").notNull(),
  instructorId: int("instructorId").notNull(),
  badgeText: varchar("badgeText", { length: 64 }),
  shortDescription: text("shortDescription").notNull(),
  fullDescription: text("fullDescription").notNull(),
  imageUrl: text("imageUrl").notNull(),
  price: int("price").default(0).notNull(), // 0 = free, in USD or target currency
  originalPrice: int("originalPrice").default(0),
  isFree: boolean("isFree").default(false).notNull(),
  level: mysqlEnum("level", ["مبتدئ", "متوسط", "متقدم", "جميع المستويات"]).default("جميع المستويات").notNull(),
  durationText: varchar("durationText", { length: 120 }).notNull(), // e.g. "4 أسابيع - ساعة يومياً"
  lessonCount: int("lessonCount").default(12).notNull(),
  studentCount: int("studentCount").default(0).notNull(),
  rating: varchar("rating", { length: 10 }).default("5.0").notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  ageGroup: varchar("ageGroup", { length: 80 }).default("الأطفال واليافعين"),
  language: varchar("language", { length: 60 }).default("العربية"),
  requirements: text("requirements"), // JSON string array
  learningOutcomes: text("learningOutcomes"), // JSON string array
  targetAudience: text("targetAudience"), // JSON string array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Modules (Units/Sections) in Course
 */
export const modules = mysqlTable("modules", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: int("orderIndex").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferInsert;

/**
 * Lessons in Modules
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  content: text("content"),
  videoUrl: text("videoUrl"),
  durationMinutes: int("durationMinutes").default(20).notNull(),
  orderIndex: int("orderIndex").default(0).notNull(),
  isFreePreview: boolean("isFreePreview").default(false).notNull(),
  resourcesJson: text("resourcesJson"), // PDF links, worksheets
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * Enrollments: user enrolled in course
 */
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  progressPercentage: int("progressPercentage").default(0).notNull(),
  status: mysqlEnum("status", ["active", "completed", "paused"]).default("active").notNull(),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * Lesson Progress: tracks whether user completed lesson
 */
export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  lessonId: int("lessonId").notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  studentNotes: text("studentNotes"),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

/**
 * Quizzes & Exams
 */
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  lessonId: int("lessonId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  durationMinutes: int("durationMinutes").default(20),
  passingScore: int("passingScore").default(70).notNull(),
  isFinalExam: boolean("isFinalExam").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

/**
 * Quiz Questions
 */
export const questions = mysqlTable("questions", {
  id: int("id").autoincrement().primaryKey(),
  quizId: int("quizId").notNull(),
  questionText: text("questionText").notNull(),
  type: mysqlEnum("type", ["single_choice", "multiple_choice", "true_false"]).default("single_choice").notNull(),
  optionsJson: text("optionsJson").notNull(), // JSON array of options: [{id: 1, text: "A"}, ...]
  correctAnswerJson: text("correctAnswerJson").notNull(), // JSON: [option_id]
  explanation: text("explanation"),
  orderIndex: int("orderIndex").default(0).notNull(),
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

/**
 * Quiz Attempts & Submissions
 */
export const quizSubmissions = mysqlTable("quizSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizId: int("quizId").notNull(),
  courseId: int("courseId").notNull(),
  score: int("score").notNull(),
  isPassed: boolean("isPassed").notNull(),
  answersJson: text("answersJson").notNull(),
  feedback: text("feedback"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type InsertQuizSubmission = typeof quizSubmissions.$inferInsert;

/**
 * Certificates
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  certificateCode: varchar("certificateCode", { length: 64 }).notNull().unique(), // e.g. "ALHUDA-2026-89421"
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  studentName: varchar("studentName", { length: 160 }).notNull(),
  courseTitle: varchar("courseTitle", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 64 }).default("ممتاز"),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  instructorSignatureName: varchar("instructorSignatureName", { length: 160 }).default("أ. هدى عابدين"),
  status: mysqlEnum("status", ["valid", "revoked"]).default("valid").notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

/**
 * Testimonials & Reviews
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId"),
  userId: int("userId"),
  authorName: varchar("authorName", { length: 160 }).notNull(),
  authorRole: varchar("authorRole", { length: 160 }).notNull(), // e.g. "والدة الطفل جاد", "مدربة معتمدة", "طالبة متفوقة"
  rating: int("rating").default(5).notNull(),
  comment: text("comment").notNull(),
  isApproved: boolean("isApproved").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Blog Posts
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  authorName: varchar("authorName", { length: 160 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  categoryName: varchar("categoryName", { length: 120 }).notNull(),
  readTimeMinutes: int("readTimeMinutes").default(5).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * FAQs
 */
export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 120 }).default("عام").notNull(),
  orderIndex: int("orderIndex").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
});

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = typeof faqs.$inferInsert;

/**
 * Contact Submissions
 */
export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link", { length: 255 }),
  type: mysqlEnum("type", ["course", "exam", "certificate", "system", "announcement"]).default("system").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * System Settings
 */
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 120 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
