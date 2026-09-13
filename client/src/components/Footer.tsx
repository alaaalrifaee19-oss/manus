import { Link } from "wouter";
import { Phone, Mail, MapPin, Shield, CheckCircle, Heart, Instagram } from "lucide-react";
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from "./Navbar";
import { ACADEMY_EMAIL, ACADEMY_INSTAGRAM } from "@/lib/academy";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-12 border-t border-slate-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Academy Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-xl shadow">
                <img
                  src="/manus-storage/alhuda-logo_7a65487d.png"
                  alt="أكاديمية الهدى التعليمية"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white">أكاديمية الهدى</span>
                <span className="block text-xs text-amber-400 font-medium">
                  منظومة تعليمية تفاعلية متكاملة
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              نوفر للأطفال بيئة تعليمية متوازنة وممتعة تجمع بين اللغات، والقرآن، والحساب الذهني، والذكاء الاصطناعي بخطة أسبوعية مريحة (ساعة واحدة يومياً)، كما نؤهل المعلمات والأمهات بدبلومات تدريبية معتمدة دولياً.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/30 text-emerald-300 hover:bg-emerald-700/50 border border-emerald-600/50 text-sm font-semibold transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>واتساب الاستفسارات: {WHATSAPP_NUMBER}</span>
              </a>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                فصول افتراضية دولية تفاعلية عبر الإنترنت
              </span>
              <a href={`mailto:${ACADEMY_EMAIL}`} className="text-xs text-slate-400 flex items-center gap-1.5 hover:text-amber-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {ACADEMY_EMAIL}
              </a>
              <a href={ACADEMY_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 flex items-center gap-1.5 hover:text-pink-300 transition-colors">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                حساب الأكاديمية على إنستغرام
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              روابط الأكاديمية
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  عن الأكاديمية ورسالتنا
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-400 transition-colors">
                  دليل البرامج والدورات
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-amber-400 transition-colors">
                  كادر المدربين المعتمدين
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                  معرض صور الأكاديمية
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  مدونة التفكير والتربية
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              مسارات التعلم
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/courses?category=mental-math" className="hover:text-amber-400 transition-colors">
                  الحساب الذهني للأطفال
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-400 transition-colors">
                  دورات المدربين
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-400 transition-colors">
                  دورات الأطفال والمهارات الذهنية
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                  معرض صور الأكاديمية
                </Link>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  اسألينا عن التسجيل عبر الواتساب
                </a>
              </li>
            </ul>
          </div>

          {/* Learning quality */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              جودة التعلم والمتابعة
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>مسارات تعليمية واضحة ومحتوى مناسب لعمر الطفل.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>منهج ثابت ومتابعة أسبوعية مستمرة لمستوى الطفل.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>كادر معلمات خبيرات في المدارس الدولية (International Schools).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} أكاديمية الهدى التعليمية. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              الشروط والأحكام
            </Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">
              الأسئلة الشائعة
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              الدعم الفني عبر الواتساب
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
