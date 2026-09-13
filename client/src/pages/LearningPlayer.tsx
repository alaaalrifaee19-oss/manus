import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  Award,
  ArrowLeft,
  ArrowRight,
  Menu,
  Clock,
  HelpCircle,
} from "lucide-react";

export function LearningPlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const idNum = Number(courseId);
  const { user, isAuthenticated } = useAuth();

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data, isLoading, refetch } = trpc.learning.getCourseProgress.useQuery(
    { courseId: idNum },
    { enabled: isAuthenticated && !isNaN(idNum) }
  );

  const markMutation = trpc.learning.markLesson.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث تقدم الدرس بنجاح!");
      refetch();
    },
  });

  const allLessons = data?.syllabus?.flatMap((m) => m.lessons) || [];
  const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];

  useEffect(() => {
    if (allLessons.length > 0 && !activeLessonId) {
      setActiveLessonId(allLessons[0].id);
    }
  }, [allLessons, activeLessonId]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold">يرجى تسجيل الدخول للوصول لقاعة التعلم</h2>
        <Link href="/login">
          <Button>تسجيل الدخول</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-semibold">جارٍ تحميل محتوى الدورة...</p>
      </div>
    );
  }

  const isCurrentCompleted = data?.progress?.some((p) => p.lessonId === currentLesson?.id && p.isCompleted);

  const handleToggleComplete = () => {
    if (!currentLesson) return;
    markMutation.mutate({
      courseId: idNum,
      lessonId: currentLesson.id,
      isCompleted: !isCurrentCompleted,
    });
  };

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  let parsedResources: any[] = [];
  try {
    parsedResources = currentLesson?.resourcesJson ? JSON.parse(currentLesson.resourcesJson) : [];
  } catch (e) {}

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Learning Header */}
      <header className="h-16 border-b border-border bg-white dark:bg-card px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary">
            <ArrowRight className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
          <span className="text-muted-foreground">•</span>
          <span className="font-bold text-sm text-primary line-clamp-1">{data?.course?.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">الإنجاز:</span>
            <span className="text-xs font-extrabold text-accent">{data?.enrollment?.progressPercentage || 0}%</span>
            <Progress value={data?.enrollment?.progressPercentage || 0} className="w-24 h-2" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xs font-bold gap-1"
          >
            <Menu className="w-4 h-4" />
            <span>قائمة الدروس</span>
          </Button>
        </div>
      </header>

      {/* Main Learning Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Video & Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Video Player Frame */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title={currentLesson?.title || "فيديو الدرس"}
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            {/* Lesson Title & Mark Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="space-y-1">
                <span className="text-xs text-accent font-bold">الدرس الحالي:</span>
                <h2 className="text-xl sm:text-2xl font-black text-primary">{currentLesson?.title}</h2>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {currentLesson?.durationMinutes} دقيقة
                </span>
              </div>

              <Button
                onClick={handleToggleComplete}
                disabled={markMutation.isPending}
                className={
                  isCurrentCompleted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-xs"
                    : "bg-accent hover:bg-orange-600 text-white font-bold gap-2 text-xs"
                }
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isCurrentCompleted ? "مكتمل بنجاح (إلغاء التحديد)" : "تحديد كمنجز"}</span>
              </Button>
            </div>

            {/* Lesson Explanation Content */}
            <div className="bg-white dark:bg-card p-6 sm:p-8 rounded-2xl border border-border space-y-4">
              <h3 className="font-extrabold text-lg text-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>شرح وملاحظات الدرس</span>
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-foreground/90">
                {currentLesson?.content || "لا توجد ملاحظات إضافية لهذا الدرس."}
              </div>
            </div>

            {/* Downloadable Resources & Worksheets */}
            {parsedResources.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-border space-y-3">
                <h4 className="font-bold text-base text-primary">الموارد وأوراق العمل المرفقة:</h4>
                <div className="space-y-2">
                  {parsedResources.map((res: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-card border border-border text-xs"
                    >
                      <span className="font-semibold flex items-center gap-2 text-primary">
                        <FileText className="w-4 h-4 text-accent" />
                        {res.name}
                      </span>
                      <Button size="sm" variant="outline" className="text-xs font-bold" onClick={() => toast.success("بدء تحميل ملف ورقة العمل")}>
                        تحميل الملف
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Nav: Prev / Next */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              {prevLesson ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveLessonId(prevLesson.id)}
                  className="gap-1 font-bold text-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>الدرس السابق: {prevLesson.title}</span>
                </Button>
              ) : <div />}

              {nextLesson ? (
                <Button
                  size="sm"
                  onClick={() => setActiveLessonId(nextLesson.id)}
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-xs gap-1"
                >
                  <span>الدرس التالي: {nextLesson.title}</span>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Link href={`/quiz/1`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1">
                    <Award className="w-4 h-4" />
                    <span>الانتقال للاختبار التقييمي</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar Modules & Lessons */}
        {sidebarOpen && (
          <aside className="w-80 border-r border-border bg-white dark:bg-card overflow-y-auto p-4 space-y-4">
            <h3 className="font-extrabold text-base text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>فهرس الوحدات والدروس</span>
            </h3>

            <div className="space-y-4">
              {data?.syllabus?.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-2">
                  <h5 className="font-bold text-xs text-muted-foreground">
                    الوحدة {mIdx + 1}: {mod.title}
                  </h5>
                  <div className="space-y-1">
                    {mod.lessons?.map((les) => {
                      const isCompleted = data?.progress?.some((p) => p.lessonId === les.id && p.isCompleted);
                      const isCurrent = les.id === currentLesson?.id;

                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLessonId(les.id)}
                          className={`w-full text-right p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 transition-colors ${
                            isCurrent
                              ? "bg-orange-50 text-accent font-bold dark:bg-orange-950/40 border border-orange-200"
                              : "hover:bg-slate-50 dark:hover:bg-slate-900 text-foreground/80"
                          }`}
                        >
                          <div className="flex items-center gap-2 line-clamp-1">
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">{les.durationMinutes} د</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <Link href="/quiz/1">
                <Button variant="outline" className="w-full font-bold text-xs gap-1 border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100">
                  <Award className="w-3.5 h-3.5" />
                  <span>دخول اختبار الوحدة التقييمي</span>
                </Button>
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const qId = Number(quizId) || 1;
  const { user, isAuthenticated } = useAuth();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; isPassed: boolean } | null>(null);

  const { data: quiz, isLoading } = trpc.quizzes.getQuiz.useQuery({ quizId: qId });
  const submitMutation = trpc.quizzes.submit.useMutation({
    onSuccess: (res) => {
      if (res) {
        setResult({ score: res.score, isPassed: res.isPassed });
        setIsSubmitted(true);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-semibold">جارٍ تحميل الاختبار...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold">الاختبار غير موجود</h2>
        <Link href="/dashboard">
          <Button>العودة للوحة الطالب</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("يرجى تسجيل الدخول أولاً");
      return;
    }

    // Grade answers
    let correctCount = 0;
    const questions = quiz.questions || [];

    questions.forEach((q) => {
      let correct: string[] = [];
      try {
        correct = JSON.parse(q.correctAnswerJson);
      } catch (e) {}

      const userAns = selectedAnswers[q.id.toString()];
      if (correct.includes(userAns)) {
        correctCount++;
      }
    });

    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;
    const isPassed = score >= quiz.passingScore;

    submitMutation.mutate({
      quizId: quiz.id,
      courseId: quiz.courseId,
      score,
      isPassed,
      answersJson: JSON.stringify(selectedAnswers),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-10 border-b border-border text-center">
        <div className="container max-w-2xl space-y-3">
          <Badge className="bg-accent text-white font-bold text-xs">اختبار تقييم الأكاديمية</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">{quiz.title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            درجة الاجتياز المقررة: {quiz.passingScore}% • المدة المقترحة: {quiz.durationMinutes} دقيقة
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container max-w-3xl">
          {isSubmitted && result ? (
            <Card className="p-8 text-center space-y-6 border-2 border-emerald-500 bg-white dark:bg-card shadow-xl animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary">
                  {result.isPassed ? "تهانينا! لقد اجتزت الاختبار بنجاح 🎉" : "حظاً أوفر، يمكنك إعادة الاختبار"}
                </h3>
                <p className="text-3xl font-extrabold text-accent">
                  الدرجة المحققة: {result.score}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.isPassed
                    ? "تم توثيق نتيجتك بنجاح واعتمادها في سجلك الأكاديمي."
                    : "راجع دروس الوحدة وأعد المحاولة لتحقيق نسبة الاجتياز المطلوبة."}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 font-bold text-xs">
                    العودة للوحة الطالب
                  </Button>
                </Link>
                {result.isPassed && (
                  <Link href="/dashboard">
                    <Button variant="outline" className="font-bold text-xs border-amber-400 text-amber-700">
                      متابعة مسارك التعليمي
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {quiz.questions?.map((q, qIdx) => {
                let options: any[] = [];
                try {
                  options = JSON.parse(q.optionsJson);
                } catch (e) {}

                return (
                  <Card key={q.id} className="p-6 bg-white dark:bg-card border-border shadow-sm space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-orange-100 text-accent flex items-center justify-center font-bold text-xs shrink-0">
                        {qIdx + 1}
                      </span>
                      <h4 className="font-bold text-base text-primary leading-relaxed">
                        {q.questionText}
                      </h4>
                    </div>

                    <RadioGroup
                      value={selectedAnswers[q.id.toString()] || ""}
                      onValueChange={(val) =>
                        setSelectedAnswers({ ...selectedAnswers, [q.id.toString()]: val })
                      }
                      className="space-y-3 pt-2"
                    >
                      {options.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem value={opt.id.toString()} id={`opt-${q.id}-${opt.id}`} />
                          <Label htmlFor={`opt-${q.id}-${opt.id}`} className="text-sm font-medium cursor-pointer flex-1">
                            {opt.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                );
              })}

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-accent hover:bg-orange-600 text-white font-extrabold py-6 text-base"
              >
                {submitMutation.isPending ? "جارٍ تصحيح الإجابات..." : "تسليم الإجابات واعتماد النتيجة"}
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
