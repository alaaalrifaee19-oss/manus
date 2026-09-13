import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { buildRegistrationWhatsAppLink } from "@/lib/academy";
import { Lock, Mail, User, Phone, BookOpen } from "lucide-react";

export function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setLoading(true);
    // Simulate login and redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      toast.success("أهلاً بك! تم تسجيل الدخول بنجاح.");
      setLocation("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-md border-border shadow-xl bg-white dark:bg-card">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <img
                src="/manus-storage/alhuda-logo_7a65487d.png"
                alt="أكاديمية الهدى"
                className="w-14 h-14 mx-auto object-contain"
              />
              <h1 className="text-2xl font-black text-primary">تسجيل الدخول للأكاديمية</h1>
              <p className="text-xs text-muted-foreground">
                مرحباً بعودتك! أدخل بياناتك للوصول إلى مقرراتك وجلسات التعلم.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-primary">كلمة المرور</label>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-9"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-6 text-base"
              >
                {loading ? "جارٍ تسجيل الدخول..." : "دخول إلى حسابي"}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-border text-xs text-muted-foreground">
              <span>ليس لديك حساب بعد؟ </span>
              <Link href="/register" className="font-bold text-primary hover:text-accent">
                أنشئ حساباً جديداً وابدأ التعلم
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("يرجى ملء كافة الحقول الإلزامية");
      return;
    }
    setLoading(true);
    window.open(buildRegistrationWhatsAppLink({ name, email, phone, program }), "_blank", "noopener,noreferrer");
    setLoading(false);
    toast.success("تم تجهيز معلومات التسجيل في رسالة واتساب إلى الأكاديمية.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-md border-border shadow-xl bg-white dark:bg-card">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <img
                src="/manus-storage/alhuda-logo_7a65487d.png"
                alt="أكاديمية الهدى"
                className="w-14 h-14 mx-auto object-contain"
              />
              <h1 className="text-2xl font-black text-primary">إنشاء حساب جديد</h1>
              <p className="text-xs text-muted-foreground">
                انضم الآن لمجتمع أكاديمية الهدى التعليمي بخطوات بسيطة.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">الاسم الكامل *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="اسم الطالب أو ولي الأمر"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pr-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">البريد الإلكتروني *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">رقم الواتساب للتواصل ومتابعة المهام</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="+966xxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pr-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">الدورة أو البرنامج المطلوب</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="مثال: الحساب الذهني أو دورة الذكاء الاصطناعي"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="pr-9"
                  />
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground text-right leading-relaxed">
                تُستخدم هذه المعلومات فقط لمساعدتك في اختيار البرنامج المناسب والتواصل معك بخصوص التسجيل.
              </div>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                عند الضغط على الزر، ستُفتح رسالة واتساب جاهزة تتضمن معلومات التسجيل لإرسالها إلى الأكاديمية.
              </p>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-6 text-base"
              >
                {loading ? "جارٍ تجهيز الرسالة..." : "إرسال معلومات التسجيل عبر الواتساب"}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-border text-xs text-muted-foreground">
              <span>لديك حساب بالفعل؟ </span>
              <Link href="/login" className="font-bold text-primary hover:text-accent">
                تسجيل الدخول هنا
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
