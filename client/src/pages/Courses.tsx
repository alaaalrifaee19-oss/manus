import { useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, BookOpen, ArrowLeft, RefreshCw, Users, Baby, MessageCircle, Lightbulb, CheckCircle2 } from "lucide-react";

const CHILDREN_SLUGS = [
  "kids-quran-arabic",
  "kids-english",
  "kids-mental-math",
  "kids-sudoku",
  "kids-multiplication",
  "kids-rubik-cube",
  "kids-ai",
];
const TRAINER_SLUGS = [
  "trainer-mental-math",
  "trainer-sudoku",
  "trainer-rubik-cube",
  "trainer-multiplication",
  "trainer-ai",
];
const CATALOG_SLUGS = new Set([...CHILDREN_SLUGS, ...TRAINER_SLUGS]);

type Track = "all" | "children" | "trainers";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [track, setTrack] = useState<Track>("all");
  const { data: courses, isLoading } = trpc.courses.list.useQuery({ sortBy: "newest" });

  const catalogCourses = useMemo(() => {
    const source = (courses ?? []).filter((course) => CATALOG_SLUGS.has(course.slug));
    return source.filter((course) => {
      const matchesTrack = track === "all" || (track === "children" ? CHILDREN_SLUGS.includes(course.slug) : TRAINER_SLUGS.includes(course.slug));
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = !term || course.title.toLowerCase().includes(term) || course.shortDescription.toLowerCase().includes(term);
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      return matchesTrack && matchesSearch && matchesLevel;
    });
  }, [courses, track, searchTerm, selectedLevel]);

  const childrenCourses = catalogCourses.filter((course) => CHILDREN_SLUGS.includes(course.slug));
  const trainerCourses = catalogCourses.filter((course) => TRAINER_SLUGS.includes(course.slug));

  const renderCourseCard = (course: any) => (
    <Card key={course.id} className="overflow-hidden border-border/80 hover:border-accent/50 hover:shadow-xl transition-all duration-300 flex flex-col group bg-white dark:bg-card">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {course.badgeText && <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-accent text-white shadow-md">{course.badgeText}</span>}
      </div>
      <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-amber-500"><Star className="w-3.5 h-3.5 fill-amber-400" />{course.rating}</span>
          </div>
          <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{course.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{course.shortDescription}</p>
          <p className="text-xs text-primary/80 font-semibold">الفئة: {course.ageGroup}</p>
        </div>
        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-emerald-600">التسجيل متاح عبر الواتساب</span>
          <div className="flex items-center gap-2">
            <Link href={`/courses/${course.slug}`}><Button size="sm" variant="outline" className="font-bold gap-1 text-xs"><span>التفاصيل</span><ArrowLeft className="w-3.5 h-3.5" /></Button></Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1 text-xs"><MessageCircle className="w-3.5 h-3.5" /><span>التسجيل</span></Button></a>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-14 border-b border-border">
        <div className="container text-center max-w-4xl space-y-4">
          <Badge className="bg-orange-100 text-accent border-none font-bold text-xs px-3 py-1">دليل البرامج والدورات</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">تعلم الطفل… وتأهيل المدرب</h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">اختر المسار المناسب: برامج أطفال عملية تبني المهارات خطوة بخطوة، أو برامج تدريبية للمدربات تحول المعرفة إلى ممارسة تعليمية احترافية.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"><MessageCircle className="w-4 h-4" />اسألينا عبر الواتساب</Button></a>
          </div>
        </div>
      </section>

      <section className="py-10 flex-1">
        <div className="container">
          <div className="bg-white dark:bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-sm mb-10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative lg:col-span-2"><Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" /><Input placeholder="ابحث عن اسم الدورة أو المهارة..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-9 font-medium" /></div>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option value="all">جميع المستويات</option><option value="مبتدئ">مبتدئ</option><option value="متوسط">متوسط</option><option value="متقدم">متقدم</option><option value="جميع المستويات">شامل لجميع المستويات</option></select>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4">
              <Button variant={track === "all" ? "default" : "outline"} onClick={() => setTrack("all")} className="font-bold">كل الدورات</Button>
              <Button variant={track === "children" ? "default" : "outline"} onClick={() => setTrack("children")} className="font-bold gap-2"><Baby className="w-4 h-4" />دورات الأطفال</Button>
              <Button variant={track === "trainers" ? "default" : "outline"} onClick={() => setTrack("trainers")} className="font-bold gap-2"><Users className="w-4 h-4" />دورات المدربين</Button>
              <span className="text-xs text-muted-foreground self-center mr-auto">عرض {catalogCourses.length} دورة من المسارين</span>
            </div>
          </div>

          {isLoading ? <div className="py-20 text-center"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" /><p className="text-muted-foreground text-sm mt-3">جارٍ تحميل الدورات...</p></div> : (
            <div className="space-y-16">
              {(track === "all" || track === "children") && <section><div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-2xl bg-orange-100 text-accent flex items-center justify-center"><Baby className="w-6 h-6" /></div><div><h2 className="text-2xl font-black text-primary">دورات الأطفال</h2><p className="text-sm text-muted-foreground">مهارات أساسية وعقلية يتعلمها الطفل باللعب والتدرج والمتابعة.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">{childrenCourses.map(renderCourseCard)}</div></section>}
              {(track === "all" || track === "trainers") && <section>
                <div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-2xl bg-blue-100 text-primary flex items-center justify-center"><Users className="w-6 h-6" /></div><div><h2 className="text-2xl font-black text-primary">دورات المدربين</h2><p className="text-sm text-muted-foreground">تأهيل عملي للمعلمات والمدربات لبناء جلسات تعليمية مؤثرة وآمنة.</p></div></div>
                <div className="mb-8 rounded-3xl border border-blue-200 bg-gradient-to-l from-blue-50 via-white to-orange-50 p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-4 max-w-3xl">
                      <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center"><Lightbulb className="w-5 h-5" /></div><div><Badge className="bg-orange-100 text-accent border-none font-bold mb-1">خدمة استشارية</Badge><h3 className="text-xl sm:text-2xl font-black text-primary">استشارات في التعليم أونلاين</h3></div></div>
                      <p className="text-sm leading-7 text-muted-foreground">هل تريدين البدء في تقديم التعليم عن بُعد أو تطوير برنامجك الحالي؟ نساعدك على بناء تجربة تعليمية منظمة تناسب الأطفال والمتعلمين، من اختيار الأدوات إلى تصميم الحصة ومتابعة التقدم.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-primary/90 font-semibold">
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" />اختيار المنصة والأدوات المناسبة</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" />تصميم خطة تعليمية واضحة</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" />تطوير التفاعل وإدارة الحصة</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" />متابعة الأداء وتحسين النتائج</span>
                      </div>
                    </div>
                    <div className="shrink-0 lg:w-56"><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block"><Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 py-6"><MessageCircle className="w-5 h-5" />احجزي استشارتك عبر الواتساب</Button></a><p className="text-center text-xs text-muted-foreground mt-3">نبدأ بفهم احتياجك ثم نقترح الخطوة المناسبة</p></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">{trainerCourses.map(renderCourseCard)}</div>
              </section>}
              {catalogCourses.length === 0 && <div className="py-20 text-center bg-white dark:bg-card rounded-2xl border border-dashed border-border p-8"><BookOpen className="w-12 h-12 text-muted-foreground mx-auto" /><h3 className="font-bold text-lg text-primary mt-3">لم يتم العثور على دورة</h3><p className="text-xs text-muted-foreground mt-2">جربي تغيير كلمات البحث أو الفلاتر.</p></div>}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
