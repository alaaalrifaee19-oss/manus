import { useState } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar, { WHATSAPP_LINK, WHATSAPP_NUMBER } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { ACADEMY_EMAIL, ACADEMY_INSTAGRAM } from "@/lib/academy";
import {
  Clock,
  User,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  Search,
  Instagram,
} from "lucide-react";

/* ---------------- BLOG ---------------- */
export function Blog() {
  const [selectedCat, setSelectedCat] = useState("الكل");
  const { data: posts, isLoading } = trpc.blog.list.useQuery({
    category: selectedCat === "الكل" ? undefined : selectedCat,
  });

  const categories = ["الكل", "تربية وتعليم", "تمكين المعلمات", "تكنولوجيا المستقبل"];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-12 border-b border-border text-center">
        <div className="container max-w-3xl space-y-3">
          <Badge className="bg-orange-100 text-accent font-bold text-xs">مدونة الأكاديمية</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-primary">
            مقالات وأفكار في تنمية العقل وبناء الطفل
          </h1>
          <p className="text-muted-foreground text-sm">
            إرشادات تربوية ومقالات تعليمية متخصصة من كادر وخبيرات أكاديمية الهدى.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={selectedCat === c ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCat(c)}
                className={selectedCat === c ? "bg-accent hover:bg-orange-600 text-white font-bold" : "font-medium"}
              >
                {c}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-10">جارٍ تحميل المقالات...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <Card key={post.id} className="overflow-hidden border-border hover:shadow-lg transition-all group flex flex-col">
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-[10px]">{post.categoryName}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTimeMinutes} دقائق قراءة
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{post.authorName}</span>
                      <Link href={`/blog/${post.slug}`} className="font-bold text-primary flex items-center gap-1 hover:text-accent">
                        <span>اقرأ المقال</span>
                        <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export function BlogPostDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">جارٍ تحميل المقال...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3">
          <h2 className="text-xl font-bold">المقال غير موجود</h2>
          <Link href="/blog">
            <Button>العودة للمدونة</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <article className="py-12 flex-1">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-3 text-center">
            <Badge className="bg-orange-100 text-accent font-bold text-xs">{post.categoryName}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
              <span>بقلم: {post.authorName}</span>
              <span>•</span>
              <span>{post.readTimeMinutes} دقائق قراءة</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-video shadow-md">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed whitespace-pre-line py-4">
            {post.content}
          </div>

          <div className="pt-8 border-t border-border flex items-center justify-between">
            <Link href="/blog">
              <Button variant="outline" className="gap-2 text-xs font-bold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>العودة لجميع المقالات</span>
              </Button>
            </Link>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>شارك المقال أو استفسر</span>
              </Button>
            </a>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: faqs, isLoading } = trpc.faqs.list.useQuery();

  const filteredFaqs = faqs?.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-12 border-b border-border text-center">
        <div className="container max-w-3xl space-y-3">
          <Badge className="bg-blue-100 text-primary font-bold text-xs">مركز المساعدة</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-primary">
            الأسئلة الشائعة والإرشادات
          </h1>
          <p className="text-muted-foreground text-sm">
            كل ما تحتاج لمعرفته حول التسجيل، المناهج، وطرق التعلم في أكاديمية الهدى.
          </p>
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-4 h-4 absolute right-3 top-7 text-muted-foreground" />
            <Input
              placeholder="ابحث في الأسئلة الشائعة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container max-w-3xl">
          {isLoading ? (
            <p className="text-center text-muted-foreground">جارٍ تحميل الأسئلة...</p>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs?.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
                  className="bg-white dark:bg-card border border-border rounded-xl px-5 shadow-sm"
                >
                  <AccordionTrigger className="font-bold text-base text-primary hover:no-underline py-4 text-right">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-4 border-t border-border/50">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="mt-12 p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 text-center space-y-3">
            <h3 className="font-bold text-lg text-primary">هل لديك استفسار آخر لم تجده هنا؟</h3>
            <p className="text-xs text-muted-foreground">
              فريق الاستقبال والدعم في أكاديمية الهدى جاهز للإجابة على جميع استفساراتك فوراً عبر الواتساب.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-accent hover:bg-orange-600 text-white font-bold gap-2 text-xs">
                <Phone className="w-4 h-4" />
                <span>تحدث معنا عبر الواتساب: {WHATSAPP_NUMBER}</span>
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

/* ---------------- CONTACT ---------------- */
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: (res) => {
      toast.success(res.message);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (err) => {
      toast.error(err.message || "حدث خطأ أثناء إرسال الرسالة");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("يرجى ملء الحقول المطلوبة");
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-12 border-b border-border text-center">
        <div className="container max-w-3xl space-y-3">
          <Badge className="bg-orange-100 text-accent font-bold text-xs">تواصل معنا</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-primary">
            نسعد بالتواصل معك والإجابة على كل استفساراتك
          </h1>
          <p className="text-muted-foreground text-sm">
            فريق أكاديمية الهدى متاح لمساعدتك في اختيار البرنامج التعليمي الأنسب لطفلك أو الانضمام لدبلومات المدربات.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 bg-white dark:bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="font-extrabold text-xl text-primary mb-6">أرسل لنا رسالة مباشرة</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary">الاسم الكامل *</label>
                  <Input
                    placeholder="مثال: أم خالد / سارة الشهري"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary">البريد الإلكتروني *</label>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary">رقم الهاتف أو الواتساب</label>
                  <Input
                    placeholder="+966xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary">الموضوع *</label>
                  <Input
                    placeholder="استفسار عن دبلوم المدربات / دورة الأطفال"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary">الرسالة أو الاستفسار *</label>
                <Textarea
                  placeholder="اكتب استفسارك بالتفصيل..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-6 text-base gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{contactMutation.isPending ? "جارٍ الإرسال..." : "إرسال الرسالة الآن"}</span>
              </Button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="font-extrabold text-xl text-white">قنوات التواصل السريع</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                للحصول على إجابة فورية وحجز المقاعد، نوصي بالتواصل المباشر مع مشرفة القبول والتسجيل عبر تطبيق الواتساب.
              </p>

              <div className="space-y-4 text-sm">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-300 block font-semibold">واتساب الأكاديمية الرسمي</span>
                    <span className="font-bold text-base" dir="ltr">{WHATSAPP_NUMBER}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-200 block font-semibold">البريد الإلكتروني</span>
                    <span className="font-bold text-sm">{ACADEMY_EMAIL}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-200 block font-semibold">المقر ونظام التدريب</span>
                    <span className="text-xs leading-tight block">منصة تدريب تفاعلية دولية أونلاين (عربياً وأوروبياً)</span>
                  </div>
                </div>

                <a href={ACADEMY_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-pink-200 block font-semibold">إنستغرام الأكاديمية</span>
                    <span className="font-bold text-sm" dir="ltr">@alhuda_academy26</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
