import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { ACADEMY_EMAIL, ACADEMY_INSTAGRAM, ACADEMY_WHATSAPP } from "@/lib/academy";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Phone,
  User,
  ChevronDown,
  Instagram,
  Mail,
} from "lucide-react";

export const WHATSAPP_NUMBER = ACADEMY_WHATSAPP;
export const WHATSAPP_LINK = `https://wa.me/${ACADEMY_WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent("السلام عليكم، أود الاستفسار عن برامج ودورات أكاديمية الهدى التعليمية")}`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { title: "الرئيسية", href: "/" },
    { title: "عن الأكاديمية", href: "/about" },
    { title: "البرامج والدورات", href: "/courses" },
    { title: "المدربون", href: "/instructors" },
    { title: "المعرض", href: "/gallery" },
    { title: "المدونة", href: "/blog" },
    { title: "الأسئلة الشائعة", href: "/faq" },
    { title: "تواصل معنا", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur-md dark:bg-card/95">
      {/* Top micro bar for quick support */}
      <div className="bg-primary text-white text-xs py-1.5 px-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              التسجيل مفتوح للفوج الجديد - خطة أسبوعية مريحة (ساعة يومياً)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>واتساب الاستفسارات والتسجيل: {WHATSAPP_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/manus-storage/alhuda-logo_7a65487d.png"
            alt="شعار أكاديمية الهدى التعليمية"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-tight text-primary">
              أكاديمية الهدى
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              لبناء عقل الطفل وتأهيل المدربات
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  active
                    ? "text-accent bg-orange-50 font-bold dark:bg-orange-950/40"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>تواصل واتساب</span>
          </a>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">{user?.name || "حسابي"}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 text-right">
                <div className="p-2 border-b border-border/50">
                  <p className="font-bold text-sm">{user?.name || "المتدرب"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer w-full">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>التواصل عبر الواتساب</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={ACADEMY_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer w-full">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>حساب الأكاديمية على إنستغرام</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`mailto:${ACADEMY_EMAIL}`} className="flex items-center gap-2 cursor-pointer w-full">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>البريد الإلكتروني</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-bold text-primary">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-accent hover:bg-orange-600 text-white font-bold shadow-sm"
                >
                  ابدأ التعلم الآن
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none"
            aria-label="القائمة"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-50 text-accent font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>واتساب الاستفسارات: {WHATSAPP_NUMBER}</span>
              </a>

              {isAuthenticated ? (
                <div className="flex flex-col gap-1 mt-2">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>التواصل عبر الواتساب</span>
                  </a>
                  <a href={ACADEMY_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 transition-colors">
                    <Instagram className="w-4 h-4" />
                    <span>إنستغرام الأكاديمية</span>
                  </a>
                  <a href={`mailto:${ACADEMY_EMAIL}`} className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-primary bg-muted hover:bg-muted/80 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>راسلينا بالبريد</span>
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full font-bold">
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-accent hover:bg-orange-600 font-bold">
                      ابدأ التعلم
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
