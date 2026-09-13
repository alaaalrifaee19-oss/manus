import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  PlayCircle,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileCheck,
  User,
} from "lucide-react";

export function StudentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: myCourses, isLoading: coursesLoading } = trpc.learning.myCourses.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: submissions } = trpc.quizzes.mySubmissions.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container max-w-md py-20 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-accent" />
          <h2 className="text-2xl font-black text-primary">تسجيل الدخول مطلوب</h2>
          <p className="text-sm text-muted-foreground">
            يرجى تسجيل الدخول للوصول إلى لوحة تحكم الطالب ودوراتك المسجلة.
          </p>
          <Link href="/login">
            <Button className="bg-accent hover:bg-orange-600 font-bold">تسجيل الدخول الآن</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate summary stats
  const totalCourses = myCourses?.length || 0;
  const completedCourses = myCourses?.filter((c) => c.status === "completed").length || 0;
  const inProgressCourses = myCourses?.filter((c) => c.status === "active").length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Student Welcome Banner */}
      <section className="bg-gradient-to-b from-blue-50/80 to-background dark:from-slate-900 py-10 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs text-accent font-bold">مرحباً بك مجدداً</span>
              <h1 className="text-2xl sm:text-3xl font-black text-primary">
                {user?.name || "طالب الأكاديمية"}
              </h1>
              <p className="text-xs text-muted-foreground">
                تابع تقدمك الدراسي وأكمل تمارينك اليومية بكل سهولة وثقة.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/courses">
                <Button variant="outline" className="text-xs font-bold gap-1 border-primary/20">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>تصفح دورات جديدة</span>
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                  مساعدة المعلمة
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4 bg-white dark:bg-card border-border shadow-sm">
              <span className="text-xs text-muted-foreground block">الدورات المسجلة</span>
              <span className="text-2xl font-black text-primary">{totalCourses}</span>
            </Card>

            <Card className="p-4 bg-white dark:bg-card border-border shadow-sm">
              <span className="text-xs text-muted-foreground block">قيد التعلم النشط</span>
              <span className="text-2xl font-black text-accent">{inProgressCourses}</span>
            </Card>

            <Card className="p-4 bg-white dark:bg-card border-border shadow-sm">
              <span className="text-xs text-muted-foreground block">الدورات المكتملة</span>
              <span className="text-2xl font-black text-emerald-600">{completedCourses}</span>
            </Card>

          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-10 flex-1">
        <div className="container">
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <TabsTrigger value="courses" className="font-bold text-xs sm:text-sm">
                دوراتي التعليمية ({totalCourses})
              </TabsTrigger>
              <TabsTrigger value="exams" className="font-bold text-xs sm:text-sm">
                سجل الاختبارات
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {coursesLoading ? (
                <p className="text-center py-10 text-muted-foreground font-semibold">جارٍ تحميل دوراتك...</p>
              ) : myCourses?.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-dashed border-border p-8 space-y-3">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
                  <h3 className="font-bold text-lg text-primary">لم تسجل في أي دورة بعد</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    ابدأ رحلتك التعليمية الآن بالاختيار من باقة دورات الأطفال والمدربات المتميزة في الأكاديمية.
                  </p>
                  <Link href="/courses">
                    <Button className="bg-accent hover:bg-orange-600 font-bold text-xs">
                      استكشف برامج ودورات الأكاديمية
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myCourses?.map((enr) => {
                    const c = enr.course;
                    if (!c) return null;
                    return (
                      <Card key={enr.id} className="overflow-hidden border-border hover:shadow-lg transition-all flex flex-col justify-between bg-white dark:bg-card">
                        <div>
                          <div className="relative aspect-video">
                            <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                            <Badge className="absolute top-2 right-2 bg-primary/90 text-white text-[10px]">
                              {enr.status === "completed" ? "مكتملة 🎉" : "نشطة"}
                            </Badge>
                          </div>

                          <div className="p-5 space-y-3">
                            <h3 className="font-bold text-base text-primary line-clamp-1">{c.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{c.shortDescription}</p>

                            <div className="space-y-1.5 pt-2">
                              <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-muted-foreground">نسبة الإنجاز:</span>
                                <span className="text-accent">{enr.progressPercentage}%</span>
                              </div>
                              <Progress value={enr.progressPercentage} className="h-2" />
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <Link href={`/learn/${c.id}`}>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1.5">
                              <PlayCircle className="w-4 h-4" />
                              <span>{enr.progressPercentage > 0 ? "متابعة التعلم" : "بدء الدرس الأول"}</span>
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Exams History Tab */}
            <TabsContent value="exams" className="space-y-4">
              {submissions?.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground">لم تقم بإجراء أي اختبارات بعد.</p>
              ) : (
                <div className="space-y-3">
                  {submissions?.map((sub) => (
                    <div key={sub.id} className="p-4 rounded-xl bg-white dark:bg-card border border-border flex items-center justify-between">
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-primary">محاولة اختبار</h5>
                        <p className="text-xs text-muted-foreground">
                          تاريخ التقديم: {new Date(sub.submittedAt).toLocaleDateString("ar-SA")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`font-extrabold text-sm ${sub.isPassed ? "text-emerald-600" : "text-destructive"}`}>
                          الدرجة: {sub.score}% {sub.isPassed ? "(ناجح ✅)" : "(يحتاج إعادة ❌)"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
