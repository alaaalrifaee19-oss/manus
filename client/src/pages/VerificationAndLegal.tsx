import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Search, Award, CheckCircle2, AlertCircle, Calendar, User, BookOpen } from "lucide-react";

/* ---------------- CERTIFICATE VERIFICATION ---------------- */
export function CertificateVerify() {
  const [certCode, setCertCode] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: cert, isLoading, isError, error, refetch } = trpc.certificates.verify.useQuery(
    { code: certCode },
    { enabled: false }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certCode.trim()) return;
    setSearchTriggered(true);
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-12 border-b border-border text-center">
        <div className="container max-w-2xl space-y-3">
          <Badge className="bg-emerald-100 text-emerald-800 font-bold text-xs">نظام التحقق الإلكتروني</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-primary">
            التحقق من صحة شهادات أكاديمية الهدى
          </h1>
          <p className="text-muted-foreground text-sm">
            أدخل الرمز التعريفي الفريد المطبوع على الشهادة للتحقق من بيانات الخريجة واعتمادها الدولي.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container max-w-2xl space-y-8">
          <Card className="p-6 border-border shadow-sm bg-white dark:bg-card">
            <form onSubmit={handleSearch} className="space-y-4">
              <label className="text-sm font-bold text-primary block text-right">
                رمز الشهادة الإلكتروني (Certificate ID)
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="مثال: ALHUDA-2026-89421"
                  value={certCode}
                  onChange={(e) => setCertCode(e.target.value)}
                  className="font-mono text-center tracking-wider text-base"
                />
                <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-orange-600 text-white font-bold gap-1">
                  <Search className="w-4 h-4" />
                  <span>تحقق</span>
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-right">
                جرب الرمز التجريبي المعتمد: <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-bold">ALHUDA-2026-89421</code> أو <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-bold">ALHUDA-2026-10574</code>
              </p>
            </form>
          </Card>

          {/* Verification Result */}
          {isLoading && (
            <p className="text-center text-muted-foreground font-semibold">جارٍ مطابقة السجلات المعتمدة...</p>
          )}

          {searchTriggered && !isLoading && cert && (
            <div className="bg-white dark:bg-card border-2 border-emerald-500 rounded-3xl p-8 shadow-xl space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base">
                  <ShieldCheck className="w-6 h-6" />
                  <span>شهادة معتمدة ورسمية ومسجلة</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold">
                  سارية المفعول
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">اسم الخريج / المتدربة:</span>
                  <p className="font-extrabold text-base text-primary flex items-center gap-1.5">
                    <User className="w-4 h-4 text-accent" />
                    {cert.studentName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">البرنامج التدريبي المنجز:</span>
                  <p className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {cert.courseTitle}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">التقدير العام:</span>
                  <p className="font-bold text-sm text-amber-600 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    {cert.grade}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">جهة الإصدار والاعتماد:</span>
                  <p className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    أكاديمية الهدى التعليمية ({cert.instructorSignatureName})
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">تاريخ الإصدار:</span>
                  <p className="text-xs text-muted-foreground font-mono">
                    {new Date(cert.issuedAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground block">الرمز المرجعي:</span>
                  <p className="text-xs font-mono font-bold text-primary">
                    {cert.certificateCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {searchTriggered && !isLoading && !cert && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-2xl p-6 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <h4 className="font-bold text-red-800 dark:text-red-300">لم يتم العثور على شهادة بهذا الرمز</h4>
              <p className="text-xs text-red-700 dark:text-red-400">
                يرجى التأكد من كتابة رمز الشهادة بدقة أو التواصل مع الإدارة عبر الواتساب للاستفسار.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

/* ---------------- LEGAL: PRIVACY & TERMS ---------------- */
export function LegalPrivacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="container max-w-3xl py-16 flex-1 space-y-6 text-right">
        <h1 className="text-3xl font-black text-primary">سياسة الخصوصية</h1>
        <p className="text-xs text-muted-foreground">آخر تحديث: سبتمبر 2026</p>
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
          <p>
            نحرص في <strong>أكاديمية الهدى التعليمية</strong> على حماية خصوصية بيانات طلابنا وأولياء الأمور والمتدربات بأعلى معايير الأمان الرقمي.
          </p>
          <h3 className="font-bold text-base text-primary">1. البيانات التي نجمعها</h3>
          <p>نجمع فقط البيانات الضرورية لتقديم الخدمة التعليمية ومتابعة مستوى الطالب مثل: الاسم، البريد الإلكتروني، رقم الهاتف أو الواتساب، والدروس المكتملة.</p>
          <h3 className="font-bold text-base text-primary">2. سرية وخصوصية الأطفال</h3>
          <p>نولي خصوصية الأطفال أولوية مطلقة؛ لا نشارك صور أو بيانات أي طفل دون موافقة خطية صريحة من ولي الأمر، وتتم كافة الجلسات الافتراضية في بيئة آمنة ومشفرة.</p>
          <h3 className="font-bold text-base text-primary">3. حماية البيانات</h3>
          <p>تُخزن بيانات المنصة في قواعد بيانات محمية ومراقبة بأحدث تقنيات التشفير.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function LegalTerms() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="container max-w-3xl py-16 flex-1 space-y-6 text-right">
        <h1 className="text-3xl font-black text-primary">الشروط والأحكام</h1>
        <p className="text-xs text-muted-foreground">آخر تحديث: سبتمبر 2026</p>
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
          <p>أهلاً بك في منصة أكاديمية الهدى التعليمية. يرجى قراءة الشروط والأحكام المنظمة للاستخدام بعناية:</p>
          <h3 className="font-bold text-base text-primary">1. التسجيل والحساب</h3>
          <p>يلتزم المشترك بتقديم معلومات صحيحة عند التسجيل، ويكون مسؤولاً عن سرية حسابه وبيانات دخوله.</p>
          <h3 className="font-bold text-base text-primary">2. الملكية الفكرية للمناهج</h3>
          <p>كافة الحقائب التدريبية وأوراق العمل وفيديوهات الدورات وحقوق السوروبان التابعة للأكاديمية هي ملكية فكرية خاصة بأكاديمية الهدى ومؤسستها، ولا يجوز نسخها أو إعادة بيعها.</p>
          <h3 className="font-bold text-base text-primary">3. معايير إصدار الشهادات</h3>
          <p>تُمنح الشهادات المعتمدة بعد اجتياز متطلبات البرنامج التدريبي والاختبار التقييمي بنجاح وفق النسبة المقررة.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
