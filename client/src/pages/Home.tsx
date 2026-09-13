import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK, WHATSAPP_NUMBER } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  Star,
  ArrowLeft,
  GraduationCap,
  ChevronLeft,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const REQUESTED_COURSE_SLUGS = new Set([
  "kids-quran-arabic",
  "kids-english",
  "kids-mental-math",
  "kids-sudoku",
  "kids-multiplication",
  "kids-rubik-cube",
  "kids-ai",
  "trainer-mental-math",
  "trainer-sudoku",
  "trainer-rubik-cube",
  "trainer-multiplication",
  "trainer-ai",
]);

export default function Home() {
  const { data: featuredCourses, isLoading: coursesLoading } = trpc.courses.list.useQuery({
    featuredOnly: true,
  });
  const { data: instructors } = trpc.instructors.list.useQuery({ featuredOnly: true });
  const { data: reviews } = trpc.reviews.list.useQuery({ featuredOnly: true });
  const { data: faqs } = trpc.faqs.list.useQuery();
  const requestedCourses = featuredCourses?.filter((course) => REQUESTED_COURSE_SLUGS.has(course.slug)).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-12 md:py-20 border-b border-border/50"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 48%, rgba(255,255,255,0.52) 100%), url('/manus-storage/alhuda-home-background_fe40e5b0.png')",
        }}
      >
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-right bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/70">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-accent font-bold text-xs tracking-wide">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>مكان واحد يجمع كل ما يحتاجه عقل طفلك</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.25] tracking-tight">
              نحن لا نقدم مجرد دروس…
              <span className="block text-accent mt-2">
                بل نبني عقل الطفل وثقته بنفسه
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              منظومة تعليمية متكاملة تجمع بين اللغات، والقرآن، والحساب الذهني، وتنمية التركيز، وأساسيات الذكاء الاصطناعي للأطفال.
              <strong className="text-foreground font-semibold"> خطة أسبوعية مريحة (ساعة واحدة يومياً فقط) </strong>
              تغنيكِ عن التنقل بين المراكز المتعددة، وتصنع مستقبلاً مشرقاً لطفلك.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/courses">
                <Button size="lg" className="bg-accent hover:bg-orange-600 text-white font-bold px-8 text-base shadow-lg shadow-orange-500/20 gap-2">
                  <span>استكشف الدورات المتاحة</span>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-base gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>تواصل عبر الواتساب</span>
                </Button>
              </a>
            </div>

            {/* Micro proof tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border/80 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ساعة واحدة ممتعة يومياً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>معلمات مدارس دولية معتمدات</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>أنشطة عملية قابلة للتطبيق</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent to-blue-600 opacity-20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl border border-white/60 dark:border-slate-800 shadow-2xl bg-white">
                <img
                  src="/manus-storage/alhuda-hero_9251f56c.png"
                  alt="أطفال أكاديمية الهدى في حصص تفاعلية"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-4 bg-white/95 dark:bg-card/95 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-accent">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary">أكثر من 250 طفلاً و50 مدربة</p>
                      <p className="text-xs text-muted-foreground">في مختلف الدول العربية والأوروبية</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    تقييم 5.0 ⭐
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 bg-primary text-white">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-extrabold text-accent">250+</span>
            <p className="text-xs md:text-sm text-blue-100 font-medium">طفل أتقنوا الحساب الذهني والتفكير</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-extrabold text-white">50+</span>
            <p className="text-xs md:text-sm text-blue-100 font-medium">مدربة معتمدة تخرجن من الأكاديمية</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-extrabold text-amber-400">100%</span>
            <p className="text-xs md:text-sm text-blue-100 font-medium">تفاعل حقيقي ومتابعة فردية للأهل</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-extrabold text-accent">12+</span>
            <p className="text-xs md:text-sm text-blue-100 font-medium">سنة خبرة تعليمية معتمدة دولياً</p>
          </div>
        </div>
      </section>

      {/* WHY ALHUDA ACADEMY (AUTHENTIC FOUNDER'S VISION) */}
      <section className="py-16 md:py-24 bg-white dark:bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <Badge className="bg-orange-100 text-accent hover:bg-orange-100 border-none font-bold text-xs px-3 py-1">
              لماذا أكاديميتنا مختلفة؟
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
              مكان واحد لكل ما يحتاجه طفلك دون تشتت أو إرهاق
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              «كأم… كنت دائماً أسأل نفسي: لماذا نضطر لتسجيل أطفالنا في عدة أماكن؟ لغة في مكان، قرآن في مكان، حساب ذهني في مكان آخر؟ من هنا انطلقت أكاديمية الهدى لتجمع كل ما يحتاجه الطفل في بيئة واحدة متوازنة.»
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-primary">1. مكان واحد متكامل</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                بدل التنقل والتشتت: لغة عربية، قرآن، إنجليزية، حساب ذهني، وتفكير إبداعي يجتمعون في بيئة واحدة مريحة.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-accent flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-primary">2. خطة أسبوعية مريحة</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ساعة واحدة يومياً فقط ضمن جدول مدروس يناسب الطفل والأهل، تمنحه التركيز دون إجهاد أو ضغط واجبات.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-primary">3. مسار ومتابعة واضحة</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تعرف الأم دائماً المستوى الذي وصل إليه طفلها والمهارات المكتسبة والمرحلة القادمة، بمنهج ونظام تعليمي ثابت ومستمر.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-primary">4. معلمات دوليات خبيرات</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                كادر معلمات من مدارس دولية (International Schools) متخصصات في تعليم الأطفال بأسلوب تفاعلي مليء بالشغف والتشجيع.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY MESSAGE */}
      <section className="py-16 md:py-20 bg-white dark:bg-card">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 rounded-3xl bg-primary p-8 text-white flex flex-col justify-center space-y-4">
              <Badge className="w-fit bg-orange-500 text-white border-none font-bold">رسالة الأكاديمية</Badge>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">نتعلم بثقة، نتطور باستمرار، ونصل إلى أفضل نسخة من أنفسنا</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                نؤمن أن كل طفل يمتلك قدرات مميزة، ودورنا هو اكتشاف هذه القدرات وتنميتها خطوة بخطوة ضمن منهج واضح ومستمر.
              </p>
            </div>
            <div className="lg:col-span-3 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-border p-8 space-y-4">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                رسالتنا هي توفير بيئة تعليمية متكاملة تجمع بين المعرفة والمهارات الأساسية التي يحتاجها الطفل في هذا العصر بطريقة ممتعة ومتوازنة. نسعى إلى تنمية ذكائه وتركيزه وثقته بنفسه من خلال برامج مدروسة تجمع بين اللغات والحساب الذهني ومهارات التفكير والتعلم الحديث.
              </p>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                نحرص كذلك على أن تكون الرحلة التعليمية مريحة للأهل والطفل، من خلال خطة أسبوعية بسيطة ومعلمات متخصصات ذوات خبرة حقيقية في تعليم الأطفال.
              </p>
              <Link href="/about">
                <Button variant="outline" className="font-bold text-primary gap-2">
                  <span>تعرف على الأكاديمية ورسالتها</span>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES CATALOG */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-y border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <Badge className="bg-blue-100 text-primary hover:bg-blue-100 border-none font-bold text-xs px-3 py-1 mb-2">
                برامجنا المعتمدة
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                الدورات الأكثر تميزاً وإقبالاً
              </h2>
            </div>
            <Link href="/courses">
              <Button variant="outline" className="gap-2 font-bold text-primary">
                <span>تصفح كافة البرامج ({REQUESTED_COURSE_SLUGS.size})</span>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requestedCourses?.map((course) => (
              <Card key={course.id} className="overflow-hidden border-border/80 hover:border-accent/50 hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {course.badgeText && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-accent text-white shadow-md">
                      {course.badgeText}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-black/70 text-white backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {course.rating} ({course.reviewCount})
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-600">التسجيل عبر الواتساب</span>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1 text-xs">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>التسجيل</span>
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT JOURNEY */}
      <section className="py-16 md:py-24 bg-white dark:bg-card">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-bold text-xs px-3 py-1">
              رحلة التعلم في الهدى
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
              كيف يسير طفلك نحو التميز والتفوق؟
            </h2>
            <p className="text-muted-foreground text-sm">
              خطوات واضحة ومدروسة تضمن تقدم طفلك واستمتاعه بكل لحظة تعليمية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 text-accent flex items-center justify-center font-extrabold text-xl shadow">
                1
              </div>
              <h4 className="font-bold text-base text-primary">تحديد المستوى والهدف</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                جلسة تقييم ودية لاكتشاف إمكانات طفلك وتوجيهه للمسار المناسب لعمره وشغفه.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-primary flex items-center justify-center font-extrabold text-xl shadow">
                2
              </div>
              <h4 className="font-bold text-base text-primary">ساعة تفاعلية يومياً</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                دروس ممتعة تجمع بين الألعاب الذهنية وحل المسائل وتمارين التركيز الحركية.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-xl shadow">
                3
              </div>
              <h4 className="font-bold text-base text-primary">متابعة وتقارير للأهل</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تقارير أسبوعية تفصيلية توضح تطور سرعة الحساب والبديهة وثقة الطفل بنفسه.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-xl shadow">
                4
              </div>
              <h4 className="font-bold text-base text-primary">شهادة اعتماد وتكريم</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                احتفاء بإنجاز الطفل ومنحه شهادة معتمدة دولياً برمز تحقق رسمي مسجل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTORS DIRECTORY PREVIEW */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <Badge className="bg-orange-100 text-accent hover:bg-orange-100 border-none font-bold text-xs px-3 py-1 mb-2">
                كادرنا التعليمي
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                نخبة من المدربات المعتمدات دولياً
              </h2>
            </div>
            <Link href="/instructors">
              <Button variant="outline" className="font-bold text-primary">
                عرض كادر التدريب بالكامل
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors?.map((inst) => (
              <Card key={inst.id} className="overflow-hidden border-border/80 hover:shadow-lg transition-all p-6 text-center space-y-4">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                  {inst.avatarUrl ? (
                    <img src={inst.avatarUrl} alt={inst.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-primary text-4xl font-black">
                      {inst.name.replace(/^أ\.\s*/, "").charAt(0)}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg text-primary">{inst.name}</h3>
                  <p className="text-xs text-accent font-semibold">{inst.title}</p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {inst.bio}
                </p>
                <div className="pt-3 border-t border-border/60 flex items-center justify-around text-xs text-muted-foreground font-medium">
                  <span>{inst.studentsTrained}+ متدرب</span>
                  <span>•</span>
                  <span>{inst.experienceYears} سنوات خبرة</span>
                  <span>•</span>
                  <span className="text-amber-500 font-bold">⭐ {inst.rating}</span>
                </div>
                <Link href={`/instructors/${inst.slug}`}>
                  <Button variant="outline" size="sm" className="w-full font-bold text-xs">
                    عرض السيرة الذاتية والدورات
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHENTIC TESTIMONIALS (FROM REAL PROJECT FILES) */}
      <section className="py-16 md:py-24 bg-white dark:bg-card">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-bold text-xs px-3 py-1">
              آراء حقيقية نفخر بها
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              ماذا يقول أولياء الأمور والمتدربات عن الأكاديمية؟
            </h2>
            <p className="text-muted-foreground text-sm">
              شهادات صادقة من متدرباتنا وأمهات أطفالنا في مختلف الدول.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews?.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-orange-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    «{rev.comment}»
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-primary">{rev.authorName}</h5>
                    <span className="text-xs text-muted-foreground">{rev.authorRole}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY PREVIEW */}
      <section className="py-16 md:py-20 bg-white dark:bg-card">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <Badge className="bg-blue-100 text-primary border-none font-bold text-xs mb-2">من داخل الأكاديمية</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-primary">معرض من لحظات التعلم والإنجاز</h2>
              <p className="text-sm text-muted-foreground mt-2">صور حقيقية من حصص الحساب واللغات والأنشطة الذهنية.</p>
            </div>
            <Link href="/gallery"><Button variant="outline" className="font-bold text-primary gap-2">عرض المعرض كاملاً<ArrowLeft className="w-4 h-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["/manus-storage/image3_da2fbdbe.jpg", "فرحة الأطفال بالإنجاز"],
              ["/manus-storage/image7_897d74f4.jpg", "تدريب الحساب الذهني"],
              ["/manus-storage/image19_a3f4e218.jpg", "التفكير المكاني بمكعب روبيك"],
              ["/manus-storage/image50_cbb58d80.jpg", "التعلم الجماعي"],
            ].map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl border border-border shadow-sm hover:scale-[1.02] transition-transform" />)}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-t border-border">
        <div className="container max-w-4xl">
          <div className="text-center space-y-3 mb-12">
            <Badge className="bg-blue-100 text-primary hover:bg-blue-100 border-none font-bold text-xs px-3 py-1">
              الأسئلة الشائعة
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              إجابات على استفسارات الأهل والمتدربات
            </h2>
          </div>

          <div className="space-y-4">
            {faqs?.slice(0, 5).map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm space-y-2 text-right"
              >
                <h3 className="font-bold text-base text-primary flex items-center justify-between gap-2">
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq">
              <Button variant="outline" className="font-bold text-primary">
                عرض جميع الأسئلة والإرشادات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-blue-900 text-white text-center relative overflow-hidden">
        <div className="container max-w-3xl space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            ابدأ رحلة بناء عقل طفلك اليوم مع أكاديمية الهدى
          </h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            انضم إلى مئات الأطفال والمدربات الذين صنعوا فارقاً حقيقياً في ثقتهم وذكائهم، بخطة مريحة ومعلمات خبيرات معتمدات دولياً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-orange-600 text-white font-extrabold px-8 text-base shadow-xl">
                إنشاء حساب وتسجيل فوري
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-bold text-base gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>تحدث مع مشرفة القبول على الواتساب</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
