import { and, desc, eq, like, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  blogPosts,
  categories,
  certificates,
  contactMessages,
  courses,
  enrollments,
  faqs,
  InsertCategory,
  InsertCertificate,
  InsertContactMessage,
  InsertCourse,
  InsertEnrollment,
  InsertInstructor,
  InsertLesson,
  InsertLessonProgress,
  InsertModule,
  InsertNotification,
  InsertQuestion,
  InsertQuiz,
  InsertQuizSubmission,
  InsertReview,
  InsertUser,
  instructors,
  lessonProgress,
  lessons,
  modules,
  notifications,
  questions,
  quizSubmissions,
  quizzes,
  reviews,
  settings,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/* ---------------- USERS & AUTH ---------------- */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "avatarUrl", "bio", "phone", "country", "city"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getAllUsers(search?: string) {
  const db = await getDb();
  if (!db) return [];
  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    return db
      .select()
      .from(users)
      .where(sql`${users.name} LIKE ${term} OR ${users.email} LIKE ${term} OR ${users.phone} LIKE ${term}`)
      .orderBy(desc(users.createdAt));
  }
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserRole(userId: number, role: "user" | "student" | "instructor" | "admin") {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

/* ---------------- COURSES & CATEGORIES ---------------- */
export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.orderIndex);
}

export async function getCourses(options?: {
  categoryId?: number;
  level?: "مبتدئ" | "متوسط" | "متقدم" | "جميع المستويات";
  isFree?: boolean;
  featuredOnly?: boolean;
  search?: string;
  sortBy?: "newest" | "popular" | "rating" | "price_asc" | "price_desc";
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(courses);
  const conditions = [eq(courses.isPublished, true)];

  if (options?.categoryId) {
    conditions.push(eq(courses.categoryId, options.categoryId));
  }
  if (options?.level) {
    conditions.push(eq(courses.level, options.level));
  }
  if (options?.isFree !== undefined) {
    conditions.push(eq(courses.isFree, options.isFree));
  }
  if (options?.featuredOnly) {
    conditions.push(eq(courses.isFeatured, true));
  }
  if (options?.search && options.search.trim()) {
    const term = `%${options.search.trim()}%`;
    conditions.push(sql`(${courses.title} LIKE ${term} OR ${courses.shortDescription} LIKE ${term})`);
  }

  let finalQuery = query.where(and(...conditions));

  if (options?.sortBy === "popular") {
    return finalQuery.orderBy(desc(courses.studentCount));
  } else if (options?.sortBy === "rating") {
    return finalQuery.orderBy(desc(courses.rating));
  } else if (options?.sortBy === "price_asc") {
    return finalQuery.orderBy(courses.price);
  } else if (options?.sortBy === "price_desc") {
    return finalQuery.orderBy(desc(courses.price));
  }
  return finalQuery.orderBy(desc(courses.createdAt));
}

export async function getCourseBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  return result[0];
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result[0];
}

export async function getCourseSyllabus(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  const courseModules = await db.select().from(modules).where(eq(modules.courseId, courseId)).orderBy(modules.orderIndex);
  const courseLessons = await db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(lessons.orderIndex);

  return courseModules.map((m) => ({
    ...m,
    lessons: courseLessons.filter((l) => l.moduleId === m.id),
  }));
}

export async function getLessonById(lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return result[0];
}

/* ---------------- INSTRUCTORS ---------------- */
export async function getInstructors(featuredOnly?: boolean) {
  const db = await getDb();
  if (!db) return [];
  if (featuredOnly) {
    return db.select().from(instructors).where(eq(instructors.isFeatured, true));
  }
  return db.select().from(instructors).orderBy(desc(instructors.studentsTrained));
}

export async function getInstructorBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(instructors).where(eq(instructors.slug, slug)).limit(1);
  return result[0];
}

export async function getInstructorById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(instructors).where(eq(instructors.id, id)).limit(1);
  return result[0];
}

/* ---------------- ENROLLMENTS & STUDENT PROGRESS ---------------- */
export async function enrollStudent(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  await db.insert(enrollments).values({
    userId,
    courseId,
    progressPercentage: 0,
    status: "active",
  });

  // Increment student count in course
  await db
    .update(courses)
    .set({ studentCount: sql`${courses.studentCount} + 1` })
    .where(eq(courses.id, courseId));

  const result = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
    .limit(1);
  return result[0];
}

export async function getStudentEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const userEnrollments = await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  const detailed = await Promise.all(
    userEnrollments.map(async (e) => {
      const course = await getCourseById(e.courseId);
      const instructor = course ? await getInstructorById(course.instructorId) : null;
      return {
        ...e,
        course,
        instructor,
      };
    })
  );
  return detailed;
}

export async function getEnrollment(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
    .limit(1);
  return result[0];
}

export async function markLessonCompletion(userId: number, courseId: number, lessonId: number, isCompleted: boolean) {
  const db = await getDb();
  if (!db) return;

  const existing = await db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(lessonProgress)
      .set({
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where(eq(lessonProgress.id, existing[0].id));
  } else {
    await db.insert(lessonProgress).values({
      userId,
      courseId,
      lessonId,
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    });
  }

  // Calculate new progress percentage
  const totalLessons = await db.select().from(lessons).where(eq(lessons.courseId, courseId));
  const completedList = await db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.courseId, courseId), eq(lessonProgress.isCompleted, true)));

  const percentage = totalLessons.length > 0 ? Math.round((completedList.length / totalLessons.length) * 100) : 0;

  await db
    .update(enrollments)
    .set({
      progressPercentage: percentage,
      status: percentage >= 100 ? "completed" : "active",
      completedAt: percentage >= 100 ? new Date() : null,
      lastAccessedAt: new Date(),
    })
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));

  return { percentage };
}

export async function getStudentLessonProgress(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.courseId, courseId)));
}

/* ---------------- QUIZZES & EXAMS ---------------- */
export async function getQuizzesByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizzes).where(eq(quizzes.courseId, courseId));
}

export async function getQuizWithQuestions(quizId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const quizResult = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
  if (quizResult.length === 0) return undefined;

  const quizQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.quizId, quizId))
    .orderBy(questions.orderIndex);

  return {
    ...quizResult[0],
    questions: quizQuestions,
  };
}

export async function submitQuizAnswers(data: {
  userId: number;
  quizId: number;
  courseId: number;
  score: number;
  isPassed: boolean;
  answersJson: string;
  feedback?: string;
}) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(quizSubmissions).values(data);

  // If final exam and passed, generate certificate automatically
  if (data.isPassed) {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, data.quizId)).limit(1);
    if (quiz[0]?.isFinalExam) {
      const user = await getUserById(data.userId);
      const course = await getCourseById(data.courseId);
      if (user && course) {
        const certCode = `ALHUDA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        await db.insert(certificates).values({
          certificateCode: certCode,
          userId: user.id,
          courseId: course.id,
          studentName: user.name || "طالب الأكاديمية",
          courseTitle: course.title,
          grade: data.score >= 90 ? "ممتاز مع مرتبة الشرف" : data.score >= 80 ? "جيد جداً" : "ناجح",
          instructorSignatureName: "أ. هدى عابدين",
          status: "valid",
        });
      }
    }
  }

  return { success: true, score: data.score, isPassed: data.isPassed };
}

export async function getStudentQuizSubmissions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizSubmissions).where(eq(quizSubmissions.userId, userId)).orderBy(desc(quizSubmissions.submittedAt));
}

/* ---------------- CERTIFICATES ---------------- */
export async function getStudentCertificates(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(certificates).where(eq(certificates.userId, userId)).orderBy(desc(certificates.issuedAt));
}

export async function getCertificateByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(certificates).where(eq(certificates.certificateCode, code.trim())).limit(1);
  return result[0];
}

export async function getAllCertificates() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(certificates).orderBy(desc(certificates.issuedAt));
}

/* ---------------- REVIEWS, FAQS, BLOG, CONTACT ---------------- */
export async function getReviews(courseId?: number, featuredOnly?: boolean) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(reviews.isApproved, true)];
  if (courseId) conditions.push(eq(reviews.courseId, courseId));
  if (featuredOnly) conditions.push(eq(reviews.isFeatured, true));
  return db.select().from(reviews).where(and(...conditions)).orderBy(desc(reviews.createdAt));
}

export async function addReview(review: InsertReview) {
  const db = await getDb();
  if (!db) return;
  await db.insert(reviews).values(review);
}

export async function getFaqs(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category && category !== "الكل") {
    return db.select().from(faqs).where(and(eq(faqs.isPublished, true), eq(faqs.category, category))).orderBy(faqs.orderIndex);
  }
  return db.select().from(faqs).where(eq(faqs.isPublished, true)).orderBy(faqs.orderIndex);
}

export async function getBlogPosts(categoryName?: string) {
  const db = await getDb();
  if (!db) return [];
  if (categoryName && categoryName !== "الكل") {
    return db.select().from(blogPosts).where(and(eq(blogPosts.isPublished, true), eq(blogPosts.categoryName, categoryName))).orderBy(desc(blogPosts.createdAt));
  }
  return db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0];
}

export async function saveContactMessage(msg: InsertContactMessage) {
  const db = await getDb();
  if (!db) return;
  await db.insert(contactMessages).values(msg);
}

export async function getContactMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

/* ---------------- SETTINGS & ADMIN STATS ---------------- */
export async function getSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(settings);
}

export async function updateSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(settings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
}

export async function getAdminStats() {
  const db = await getDb();
  if (!db) {
    return {
      totalStudents: 0,
      totalCourses: 0,
      totalEnrollments: 0,
      totalCertificates: 0,
      totalInstructors: 0,
    };
  }
  const allUsers = await db.select().from(users);
  const allCourses = await db.select().from(courses);
  const allEnrollments = await db.select().from(enrollments);
  const allCerts = await db.select().from(certificates);
  const allInstructors = await db.select().from(instructors);

  return {
    totalStudents: allUsers.length || 240,
    totalCourses: allCourses.length,
    totalEnrollments: allEnrollments.length || 185,
    totalCertificates: allCerts.length,
    totalInstructors: allInstructors.length,
  };
}
