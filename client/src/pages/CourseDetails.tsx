import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Star,
  Users,
  CheckCircle,
  PlayCircle,
  FileText,
  ShieldCheck,
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function CourseDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = trpc.courses.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground font-semibold">جارٍ تحميل بيانات الدورة...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data || !data.course) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">الدورة المطلوبة غير متوفرة</h2>
          <Link href="/courses">
            <Button>العودة لدليل الدورات</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { course, instructor, syllabus, reviews, relatedCourses } = data;

  let learningOutcomes: string[] = [];
  try {
    learningOutcomes = course.learningOutcomes ? JSON.parse(course.learningOutcomes) : [];
  } catch (e) {}

  let requirements: string[] = [];
  try {
    requirements = course.requirements ? JSON.parse(course.requirements) : [];
  } catch (e) {}

  let targetAudience: string[] = [];
  try {
    targetAudience = course.targetAudience ? JSON.parse(course.targetAudience) : [];
  } catch (e) {}

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Top Breadcrumb & Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 to-background dark:from-slate-900 py-10 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {course.badgeText && (
                  <Badge className="bg-accent text-white font-bold">{course.badgeText}</Badge>
                )}
                <Badge variant="outline" className="border-primary/30 text-primary font-semibold">
                  {course.level}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {course.language}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                {course.title}
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {course.rating} ({course.reviewCount} تقييم)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  {course.studentCount} طالب مسجل
                </span>
              </div>

              {/* Instructor snippet */}
              {instructor && (
                <div className="flex items-center gap-3 pt-3">
                  {instructor.avatarUrl ? (
                    <img src={instructor.avatarUrl} alt={instructor.name} className="w-10 h-10 rounded-full object-cover border-2 border-orange-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-primary font-black border-2 border-orange-200">
                      {instructor.name.replace(/^أ\.\s*/, "").charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-muted-foreground block">تقديم وإشراف:</span>
                    <Link
                      href={`/instructors/${instructor.slug}`}
                      className="font-bold text-sm text-primary hover:text-accent transition-colors"
                    >
                      {instructor.name} ({instructor.title})
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Card / CTA Box */}
            <div className="lg:col-span-4">
              <Card className="overflow-hidden border-border/80 shadow-xl bg-white dark:bg-card sticky top-24">
                <div className="relative aspect-video">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-black text-emerald-600">التسجيل مفتوح</span>
                    <Badge variant="outline" className="text-xs text-primary bg-blue-50 border-blue-200">
                      تواصل مباشر
                    </Badge>
                  </div>

                  <div className="space-y-2.5">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-6 text-base shadow-md gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>التسجيل عبر الواتساب</span>
                      </Button>
                    </a>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2 border-t border-border/80 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>وصول كامل ومستمر لكافة الدروس والمواد</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>اختبارات تقييمية وتمارين تطبيقية أسبوعية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>خطة تعليمية واضحة ومتابعة مستمرة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>متابعة تفاعلية مع المعلمة والإدارة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-12">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* What you'll learn */}
            {learningOutcomes.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h3 className="font-extrabold text-lg text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span>ماذا ستتعلم في هذه الدورة؟</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {learningOutcomes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Course Description */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-xl text-primary">عن الدورة والمنهجية</h3>
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-muted-foreground">
                {course.fullDescription}
              </div>
            </div>

            {/* Curriculum Modules & Lessons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xl text-primary flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>المنهج الدراسي والدروس</span>
                </h3>
                <span className="text-xs text-muted-foreground font-semibold">
                  {syllabus.length} وحدات تدريبية
                </span>
              </div>

              <Accordion type="multiple" className="w-full space-y-3">
                {syllabus.map((mod, idx) => (
                  <AccordionItem
                    key={mod.id}
                    value={`item-${mod.id}`}
                    className="border border-border rounded-xl px-4 bg-white dark:bg-card"
                  >
                    <AccordionTrigger className="font-bold text-sm sm:text-base text-primary hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-right">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-accent text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{mod.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-2 border-t border-border/50">
                      {mod.description && (
                        <p className="text-xs text-muted-foreground mb-3">{mod.description}</p>
                      )}
                      <div className="space-y-2">
                        {mod.lessons?.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <PlayCircle className="w-4 h-4 text-primary" />
                              <span className="font-medium text-foreground">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.isFreePreview && (
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px]">
                                  معاينة مجانية
                                </Badge>
                              )}
                              <span className="text-muted-foreground">{lesson.durationMinutes} دقيقة</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Target Audience & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetAudience.length > 0 && (
                <div className="bg-white dark:bg-card p-5 rounded-xl border border-border space-y-3">
                  <h4 className="font-bold text-base text-primary">الفئة المستهدفة:</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {targetAudience.map((aud, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>{aud}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirements.length > 0 && (
                <div className="bg-white dark:bg-card p-5 rounded-xl border border-border space-y-3">
                  <h4 className="font-bold text-base text-primary">المتطلبات السابقة:</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Instructor Box */}
            {instructor && (
              <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border space-y-4">
                <h3 className="font-extrabold text-xl text-primary">عن المدربة</h3>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {instructor.avatarUrl ? (
                    <img src={instructor.avatarUrl} alt={instructor.name} className="w-20 h-20 rounded-full object-cover border-2 border-orange-200" />
                  ) : (
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-50 text-primary text-2xl font-black border-2 border-orange-200">
                      {instructor.name.replace(/^أ\.\s*/, "").charAt(0)}
                    </div>
                  )}
                  <div className="space-y-2 text-center sm:text-right flex-1">
                    <h4 className="font-bold text-lg text-primary">{instructor.name}</h4>
                    <p className="text-xs text-accent font-semibold">{instructor.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{instructor.bio}</p>
                    <Link href={`/instructors/${instructor.slug}`}>
                      <Button variant="link" className="p-0 text-primary font-bold text-xs">
                        مشاهدة الملف التعريفي الكامل والدورات الأخرى ←
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews && reviews.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-primary">تقييمات وآراء المشتركين</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border space-y-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-foreground/90 italic">«{rev.comment}»</p>
                      <p className="text-[11px] font-bold text-primary">{rev.authorName} - <span className="text-muted-foreground">{rev.authorRole}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Courses Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-extrabold text-lg text-primary">دورات ذات صلة</h3>
            <div className="space-y-4">
              {relatedCourses.map((rel) => (
                <Link key={rel.id} href={`/courses/${rel.slug}`} className="block group">
                  <Card className="overflow-hidden border-border hover:border-accent/40 transition-colors">
                    <div className="flex gap-3 p-3">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-xs text-primary group-hover:text-accent transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <span className="font-extrabold text-xs text-emerald-600 block">التسجيل عبر الواتساب</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
