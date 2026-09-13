import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Target,
  Compass,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowLeft,
  Quote,
  Brain,
  CheckCircle2,
  Users,
} from "lucide-react";

const pillars = [
  {
    title: "مكان واحد لكل ما يحتاجه الطفل",
    icon: BookOpen,
    color: "bg-blue-100 text-primary",
    text: "بدل التنقل بين عدة مراكز، يجتمع في الأكاديمية كل ما يحتاجه الطفل من اللغة العربية والقرآن، واللغة الإنجليزية، والحساب الذهني وتنمية التركيز، ومهارات التفكير والخيال، وأساسيات الذكاء الاصطناعي للأطفال.",
  },
  {
    title: "خطة أسبوعية مريحة",
    icon: Clock,
    color: "bg-orange-100 text-accent",
    text: "نؤمن أن التعلم يجب أن يكون ممتعاً وليس مرهقاً؛ لذلك صممنا برنامجاً بسيطاً بساعة واحدة يومياً فقط ضمن جدول أسبوعي متوازن يناسب الطفل والأهل.",
  },
  {
    title: "متابعة واضحة لمستوى الطفل",
    icon: Compass,
    color: "bg-emerald-100 text-emerald-700",
    text: "يسير كل طفل ضمن مسار تعليمي واضح، ويمكن للأم معرفة المستوى الذي وصل إليه طفلها، والمهارات التي تعلمها، والمرحلة القادمة في رحلته التعليمية.",
  },
  {
    title: "معلمات متخصصات وذوات خبرة",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-700",
    text: "نحرص على أن يكون فريق الأكاديمية من معلمات ذوات خبرة حقيقية في تعليم الأطفال. معظم معلماتنا مدرسات في مدارس دولية، وكل معلمة متخصصة في مجالها لتقديم تعليم عالي الجودة مناسب لعمر الطفل.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-background dark:from-slate-900 py-16 md:py-24 border-b border-border">
        <div className="container max-w-4xl text-center space-y-5">
          <Badge className="bg-orange-100 text-accent hover:bg-orange-100 border-none font-bold text-xs px-3 py-1">
            التعريف بالأكاديمية
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-tight">
            لماذا أكاديميتنا مختلفة؟
            <span className="block text-accent text-2xl sm:text-3xl mt-3 font-bold">
              نحن لا نقدم مجرد دروس للأطفال… بل نبني عقل الطفل وثقته بنفسه
            </span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto">
            نحن نقدم منظومة تعليمية متكاملة تهدف إلى بناء عقل الطفل وتنمية مهاراته بطريقة ممتعة ومريحة، ضمن بيئة تجمع بين المعرفة والمهارات الأساسية التي يحتاجها الطفل في هذا العصر.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white dark:bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <Badge className="bg-blue-100 text-primary border-none font-bold text-xs">فلسفتنا التعليمية</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">منظومة متكاملة، لا دروس متفرقة</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              نمنح الطفل مساراً تعليمياً مستمراً، ونمنح الأهل وضوحاً وراحة، مع منهج ثابت لا يتأثر بتغير المعلمة لأي سبب.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-slate-50 dark:bg-slate-900/60 p-7 rounded-2xl border border-border space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-primary">{index + 1}. {pillar.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.text}</p>
                  {index === 2 && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>المنهج والنظام ثابتان حتى مع تغير المعلمة</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-border">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card p-7 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center"><Compass className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-xl text-primary">رؤيتنا</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">أن نكون الأكاديمية الرائدة إقليمياً ودولياً في إعداد جيل مبدع ومفكر يمتلك المرونة العقلية والمهارات الرقمية واللغوية لمواكبة المستقبل بثقة واعتزاز.</p>
            </div>
            <div className="bg-white dark:bg-card p-7 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-accent flex items-center justify-center"><Target className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-xl text-primary">رسالتنا</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">توفير بيئة تعليمية متكاملة تجمع بين المعرفة والمهارات الأساسية التي يحتاجها الطفل في هذا العصر، بطريقة ممتعة ومتوازنة، مع تمكين وتأهيل المعلمات بدبلومات احترافية معتمدة.</p>
            </div>
            <div className="bg-white dark:bg-card p-7 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Heart className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-xl text-primary">قيمنا</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">شغف التعلم، والتوازن النفسي والعقلي، والجودة والاحترافية، والمتابعة المستمرة للأهل، والأمانة التعليمية في صناعة الأثر الحقيقي.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <div className="text-center space-y-3 mb-10">
            <Badge className="bg-orange-100 text-accent border-none font-bold text-xs">رسالة الأكاديمية</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">رسالتنا: أن يتعلم الطفل بثقة ويتطور باستمرار</h2>
          </div>
          <div className="rounded-3xl bg-primary text-white p-8 md:p-12 space-y-5 shadow-xl">
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">رسالتنا هي أن نوفر للأطفال بيئة تعليمية متكاملة تجمع بين المعرفة والمهارات الأساسية التي يحتاجها الطفل في هذا العصر، بطريقة ممتعة ومتوازنة.</p>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">نسعى إلى تنمية ذكاء الطفل، وتركيزه، وثقته بنفسه من خلال برامج تعليمية مدروسة تجمع بين اللغات، والحساب الذهني، ومهارات التفكير، والتعلم الحديث.</p>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">نؤمن أن كل طفل يمتلك قدرات مميزة، ودورنا هو اكتشاف هذه القدرات وتنميتها خطوة بخطوة ضمن منهج واضح ومستمر. كما نحرص على أن تكون الرحلة التعليمية مريحة للأهل والطفل من خلال خطة أسبوعية بسيطة، ومعلمات متخصصات ذوات خبرة في تعليم الأطفال.</p>
            <p className="font-bold text-white text-lg">هدفنا أن يكون الطفل في أكاديميتنا يتعلم بثقة، ويتطور باستمرار، ويصل إلى أفضل نسخة من نفسه.</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-orange-50/60 dark:bg-orange-950/20 border-y border-orange-100">
        <div className="container max-w-4xl">
          <div className="relative bg-white dark:bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-5">
            <Quote className="w-12 h-12 text-orange-200 dark:text-orange-950 absolute top-6 left-6" />
            <div className="flex items-center gap-3 border-b border-border/80 pb-5">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-accent flex items-center justify-center"><Brain className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-black text-primary">كلمة من المؤسسة: أ. هدى عابدين</h3>
                <p className="text-xs text-accent font-semibold">مؤسسة أكاديمية الهدى التعليمية</p>
              </div>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-foreground/90 leading-relaxed">
              <p className="font-semibold text-primary text-lg">كأم… كنت دائماً أسأل نفسي: لماذا نضطر لتسجيل أطفالنا في عدة أماكن؟</p>
              <p>لغة في مكان، قرآن في مكان، حساب ذهني في مكان آخر… وكل هذا يعني وقتاً وجهداً وضغطاً على الطفل والأهل. كنت أتمنى لو يوجد مكان واحد يجمع كل ما يحتاجه الطفل ليتعلم، وينمو، ويكتشف قدراته، بدون تعب وبدون ضغط.</p>
              <p>من هنا بدأت الفكرة… أن تكون هناك أكاديمية واحدة تجمع أهم المهارات التي يحتاجها الطفل اليوم: اللغة العربية والقرآن، اللغة الإنجليزية، الحساب الذهني وتنمية التركيز، مهارات التفكير والذكاء والخيال، وأساسيات الذكاء الاصطناعي للأطفال.</p>
              <p>كل ذلك ضمن خطة أسبوعية مريحة تناسب الطفل والأهل. ساعة واحدة فقط يومياً، لكنها ساعة مليئة بالتعلم، والمتعة، وتنمية العقل.</p>
              <p>في أكاديميتنا، لا نركز فقط على التعليم… بل نركز على بناء عقل الطفل وثقته بنفسه. لأننا نؤمن أن الطفل عندما يتعلم بطريقة صحيحة، يمكنه أن يبدع… ويتفوق… ويصنع مستقبله بثقة.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white dark:bg-card">
        <div className="container max-w-4xl space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-blue-100 text-primary border-none font-bold text-xs">منهجية العمل</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">ثبات المنهج وشراكة مستمرة مع الأهل</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border space-y-3"><Users className="w-6 h-6 text-primary" /><h4 className="font-bold text-primary">معلمات متخصصات</h4><p className="text-sm text-muted-foreground leading-relaxed">معلمات ذوات خبرة حقيقية، ومعظمهن مدرسات في مدارس دولية، وكل معلمة متخصصة في مجالها.</p></div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border space-y-3"><CheckCircle2 className="w-6 h-6 text-emerald-600" /><h4 className="font-bold text-primary">منهج ثابت ومستمر</h4><p className="text-sm text-muted-foreground leading-relaxed">يبقى المنهج والنظام ثابتين حتى لو تغيرت المعلمة، فيكمل الطفل رحلته دون أن يبدأ من الصفر.</p></div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border space-y-3"><Target className="w-6 h-6 text-accent" /><h4 className="font-bold text-primary">متابعة واضحة</h4><p className="text-sm text-muted-foreground leading-relaxed">تواصل وتقارير تساعد الأم على معرفة المستوى والمهارات المكتسبة والخطوة التعليمية القادمة.</p></div>
          </div>
          <div className="text-center pt-4"><Link href="/courses"><Button size="lg" className="bg-accent hover:bg-orange-600 text-white font-bold gap-2"><span>تصفح برامج الأكاديمية وانضم إلينا</span><ArrowLeft className="w-4 h-4" /></Button></Link></div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
