import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Users,
  Award,
  BookOpen,
  MapPin,
  CheckCircle,
  Clock,
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";

export function Instructors() {
  const { data: instructors, isLoading } = trpc.instructors.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-12 border-b border-border text-center">
        <div className="container max-w-3xl space-y-4">
          <Badge className="bg-orange-100 text-accent hover:bg-orange-100 border-none font-bold text-xs px-3 py-1">
            كادر التعليم والتدريب
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">
            مدربات معتمدات دولياً بخبرة حقيقية
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            فريق أكاديمي متميز يجمع بين التخصص العلمي والاعتمادات الدولية في الحساب الذهني، وتدريس اللغات، والذكاء الاصطناعي للأطفال.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors?.map((inst) => (
              <Card
                key={inst.id}
                className="overflow-hidden border-border/80 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4 bg-white dark:bg-card"
              >
                <div className="space-y-4 text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                    {inst.avatarUrl ? (
                      <img src={inst.avatarUrl} alt={inst.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-primary text-4xl font-black">
                        {inst.name.replace(/^أ\.\s*/, "").charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-primary">{inst.name}</h3>
                    <p className="text-xs text-accent font-bold mt-1">{inst.title}</p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {inst.bio}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {inst.rating} ({inst.reviewCount})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {inst.studentsTrained}+ متدرب
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {inst.trainersGraduated}+ مدربة
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link href={`/instructors/${inst.slug}`}>
                    <Button variant="outline" className="w-full font-bold text-xs gap-1">
                      <span>عرض السيرة الذاتية والدورات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export function InstructorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = trpc.instructors.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">جارٍ تحميل الملف التعريفي...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data || !data.instructor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <h2 className="text-xl font-bold">المدرب غير موجود</h2>
          <Link href="/instructors">
            <Button>العودة لقائمة المدربين</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { instructor, courses } = data;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/80 to-background dark:from-slate-900 py-12 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0">
              {instructor.avatarUrl ? (
                <img src={instructor.avatarUrl} alt={instructor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-primary text-5xl font-black">
                  {instructor.name.replace(/^أ\.\s*/, "").charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-3 text-center md:text-right flex-1">
              <Badge className="bg-orange-100 text-accent border-none font-bold text-xs">
                مدرب معتمد بالأكاديمية
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-primary">{instructor.name}</h1>
              <p className="text-base text-accent font-semibold">{instructor.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {instructor.detailedBio || instructor.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-3 text-xs sm:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {instructor.rating} ({instructor.reviewCount} تقييم)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {instructor.studentsTrained}+ طالب
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  {instructor.trainersGraduated}+ مدربة متخرجة
                </span>
                {instructor.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {instructor.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Courses */}
      <section className="py-12 flex-1">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {instructor.qualifications && (
              <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm space-y-3">
                <h3 className="font-extrabold text-lg text-primary">المؤهلات العلمية والخبرات</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {instructor.qualifications}
                </p>
              </div>
            )}

            {instructor.credentials && (
              <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm space-y-3">
                <h3 className="font-extrabold text-lg text-primary">الشهادات والاعتمادات الدولية</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {instructor.credentials}
                </p>
              </div>
            )}

            {/* Courses presented by instructor */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-xl text-primary">الدورات المقدمة بواسطة {instructor.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((c) => (
                  <Card key={c.id} className="overflow-hidden border-border hover:shadow-md transition-shadow">
                    <img src={c.imageUrl} alt={c.title} className="w-full aspect-video object-cover" />
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-bold text-sm text-primary line-clamp-1">{c.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{c.shortDescription}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600">التسجيل عبر الواتساب</span>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                            التسجيل
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4 text-center">
              <h4 className="font-bold text-base text-primary">تواصل مع المدرب</h4>
              <p className="text-xs text-muted-foreground">
                للاستفسار عن دورات المدرب أو طلب جلسة تدريبية خاصة، يمكنك التواصل مع إدارة الأكاديمية مباشرة.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2">
                  <Phone className="w-4 h-4" />
                  <span>تواصل عبر الواتساب الرسمي</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
