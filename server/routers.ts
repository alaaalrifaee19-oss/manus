import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

// Middleware for admin procedures
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    // If owner or admin
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "يتطلب هذا الإجراء صلاحيات مدير النظام",
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          phone: z.string().optional(),
          bio: z.string().optional(),
          country: z.string().optional(),
          city: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.upsertUser({
          openId: ctx.user.openId,
          ...input,
        });
        return { success: true };
      }),
  }),

  courses: router({
    list: publicProcedure
      .input(
        z
          .object({
            categoryId: z.number().optional(),
            level: z.enum(["مبتدئ", "متوسط", "متقدم", "جميع المستويات"]).optional(),
            isFree: z.boolean().optional(),
            featuredOnly: z.boolean().optional(),
            search: z.string().optional(),
            sortBy: z.enum(["newest", "popular", "rating", "price_asc", "price_desc"]).optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        return db.getCourses(input);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const course = await db.getCourseBySlug(input.slug);
        if (!course) {
          throw new TRPCError({ code: "NOT_FOUND", message: "الدورة غير موجودة" });
        }
        const instructor = await db.getInstructorById(course.instructorId);
        const syllabus = await db.getCourseSyllabus(course.id);
        const reviews = await db.getReviews(course.id);
        const relatedCourses = await db.getCourses({ categoryId: course.categoryId });

        return {
          course,
          instructor,
          syllabus,
          reviews,
          relatedCourses: relatedCourses.filter((c) => c.id !== course.id).slice(0, 3),
        };
      }),

    getSyllabus: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return db.getCourseSyllabus(input.courseId);
      }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return db.getCategories();
    }),
  }),

  instructors: router({
    list: publicProcedure
      .input(z.object({ featuredOnly: z.boolean().optional() }).optional())
      .query(async ({ input }) => {
        return db.getInstructors(input?.featuredOnly);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const instructor = await db.getInstructorBySlug(input.slug);
        if (!instructor) {
          throw new TRPCError({ code: "NOT_FOUND", message: "المدرب غير موجود" });
        }
        const allCourses = await db.getCourses();
        const instructorCourses = allCourses.filter((c) => c.instructorId === instructor.id);

        return {
          instructor,
          courses: instructorCourses,
        };
      }),
  }),

  learning: router({
    enroll: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const enrollment = await db.enrollStudent(ctx.user.id, input.courseId);
        return { success: true, enrollment };
      }),

    myCourses: protectedProcedure.query(async ({ ctx }) => {
      return db.getStudentEnrollments(ctx.user.id);
    }),

    getCourseProgress: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        const enrollment = await db.getEnrollment(ctx.user.id, input.courseId);
        const progress = await db.getStudentLessonProgress(ctx.user.id, input.courseId);
        const syllabus = await db.getCourseSyllabus(input.courseId);
        const course = await db.getCourseById(input.courseId);

        return {
          enrollment,
          progress,
          syllabus,
          course,
        };
      }),

    markLesson: protectedProcedure
      .input(
        z.object({
          courseId: z.number(),
          lessonId: z.number(),
          isCompleted: z.boolean(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.markLessonCompletion(ctx.user.id, input.courseId, input.lessonId, input.isCompleted);
      }),

    getLesson: protectedProcedure
      .input(z.object({ lessonId: z.number() }))
      .query(async ({ input }) => {
        const lesson = await db.getLessonById(input.lessonId);
        if (!lesson) throw new TRPCError({ code: "NOT_FOUND", message: "الدرس غير موجود" });
        return lesson;
      }),
  }),

  quizzes: router({
    getQuiz: publicProcedure
      .input(z.object({ quizId: z.number() }))
      .query(async ({ input }) => {
        const quiz = await db.getQuizWithQuestions(input.quizId);
        if (!quiz) throw new TRPCError({ code: "NOT_FOUND", message: "الاختبار غير موجود" });
        return quiz;
      }),

    submit: protectedProcedure
      .input(
        z.object({
          quizId: z.number(),
          courseId: z.number(),
          score: z.number(),
          isPassed: z.boolean(),
          answersJson: z.string(),
          feedback: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return db.submitQuizAnswers({
          userId: ctx.user.id,
          ...input,
        });
      }),

    mySubmissions: protectedProcedure.query(async ({ ctx }) => {
      return db.getStudentQuizSubmissions(ctx.user.id);
    }),
  }),

  certificates: router({
    myCertificates: protectedProcedure.query(async ({ ctx }) => {
      return db.getStudentCertificates(ctx.user.id);
    }),

    verify: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        const cert = await db.getCertificateByCode(input.code);
        if (!cert) {
          throw new TRPCError({ code: "NOT_FOUND", message: "لم يتم العثور على شهادة بهذا الرمز" });
        }
        return cert;
      }),
  }),

  reviews: router({
    list: publicProcedure
      .input(
        z
          .object({
            courseId: z.number().optional(),
            featuredOnly: z.boolean().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        return db.getReviews(input?.courseId, input?.featuredOnly);
      }),

    create: protectedProcedure
      .input(
        z.object({
          courseId: z.number().optional(),
          rating: z.number().min(1).max(5),
          comment: z.string().min(5),
          authorRole: z.string().default("طالب الأكاديمية"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.addReview({
          userId: ctx.user.id,
          authorName: ctx.user.name || "طالب الأكاديمية",
          courseId: input.courseId,
          rating: input.rating,
          comment: input.comment,
          authorRole: input.authorRole,
          isApproved: true,
          isFeatured: false,
        });
        return { success: true };
      }),
  }),

  faqs: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getFaqs(input?.category);
      }),
  }),

  blog: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getBlogPosts(input?.category);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await db.getBlogPostBySlug(input.slug);
        if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "المقال غير موجود" });
        return post;
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "الاسم مطلوب"),
          email: z.string().email("البريد الإلكتروني غير صحيح"),
          phone: z.string().optional(),
          subject: z.string().min(3, "الموضوع مطلوب"),
          message: z.string().min(10, "الرسالة يجب أن لا تقل عن 10 أحرف"),
        })
      )
      .mutation(async ({ input }) => {
        await db.saveContactMessage(input);
        return {
          success: true,
          message: "تم استلام رسالتك بنجاح! سيتواصل معك فريق أكاديمية الهدى في أقرب وقت.",
        };
      }),
  }),

  settings: router({
    getAll: publicProcedure.query(async () => {
      return db.getSettings();
    }),
  }),

  admin: router({
    stats: adminProcedure.query(async () => {
      return db.getAdminStats();
    }),

    users: adminProcedure
      .input(z.object({ search: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getAllUsers(input?.search);
      }),

    updateUserRole: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          role: z.enum(["user", "student", "instructor", "admin"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateUserRole(input.userId, input.role);
        return { success: true };
      }),

    messages: adminProcedure.query(async () => {
      return db.getContactMessages();
    }),

    certificates: adminProcedure.query(async () => {
      return db.getAllCertificates();
    }),
  }),
});

export type AppRouter = typeof appRouter;
