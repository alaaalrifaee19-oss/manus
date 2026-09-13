import Navbar, { WHATSAPP_LINK } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Images, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const galleryImages = [
  ["/manus-storage/image1_2711c7ab.jpg", "تدريب الحساب الذهني بالعداد"],
  ["/manus-storage/image2_89119b12.jpg", "تعلم هادئ ومركّز"],
  ["/manus-storage/image3_da2fbdbe.jpg", "فرحة الأطفال بالإنجاز"],
  ["/manus-storage/image4_c64d9eb8.jpg", "تجربة جماعية تفاعلية"],
  ["/manus-storage/image5_601052ef.jpg", "تطبيقات عملية على السوروبان"],
  ["/manus-storage/image6_198e94d9.jpg", "التعلم بالحركة والمشاركة"],
  ["/manus-storage/image7_897d74f4.jpg", "تدريب فردي على الحساب"],
  ["/manus-storage/image8_970c98b8.jpg", "متابعة خطوة بخطوة"],
  ["/manus-storage/image9_ba9d00a1.jpg", "تركيز وممارسة"],
  ["/manus-storage/image10_73ee8646.jpg", "إنجازات أطفالنا"],
  ["/manus-storage/image11_4a3441fd.jpg", "نشاطات تعليمية ممتعة"],
  ["/manus-storage/image12_2953c24b.jpg", "تدريب عملي"],
  ["/manus-storage/image13_083330ad.jpg", "تمارين ذهنية متدرجة"],
  ["/manus-storage/image14_3dfd4610.jpg", "تنمية المهارات الحسابية"],
  ["/manus-storage/image15_9dcd066b.jpg", "لحظات تكريم"],
  ["/manus-storage/image16_1cd60417.jpg", "تعلم مستمر"],
  ["/manus-storage/image17_506332bf.jpg", "تثبيت جداول الضرب"],
  ["/manus-storage/image18_5ce859f5.jpg", "تطبيقات المدربين"],
  ["/manus-storage/image19_a3f4e218.jpg", "مكعب روبيك والتفكير المكاني"],
  ["/manus-storage/image20_bb288ce2.jpg", "التعلم الرقمي"],
  ["/manus-storage/image21_6244cb01.jpg", "مشروعات الذكاء الاصطناعي"],
  ["/manus-storage/image22_12b5c434.jpg", "تعلم عبر الإنترنت"],
  ["/manus-storage/image23_c281cc32.jpg", "بيئة منزلية داعمة"],
  ["/manus-storage/image24_71588333.jpg", "حصص تفاعلية"],
  ["/manus-storage/image25_3916e148.jpg", "تدريب الحساب"],
  ["/manus-storage/image26_70f2be46.jpg", "شهادات إنجاز الأطفال"],
  ["/manus-storage/image27_bae9235c.jpg", "تطبيقات المدربات"],
  ["/manus-storage/image28_fb305c9a.jpg", "التعلم بالتجربة"],
  ["/manus-storage/image29_ebe1ea2f.jpg", "تدريب مكعب روبيك"],
  ["/manus-storage/image30_4a00dbf4.jpg", "أدوات التعلم الرقمي"],
  ["/manus-storage/image31_2e3d4984.jpg", "جداول الضرب بطريقة عملية"],
  ["/manus-storage/image32_dffa6583.jpg", "مشاهدة الدرس وتطبيقه"],
  ["/manus-storage/image33_dc61a498.jpg", "تدريب الذكاء الاصطناعي"],
  ["/manus-storage/image34_0a6d3df5.jpg", "الحساب الذهني في المنزل"],
  ["/manus-storage/image35_5bf3056a.jpg", "تمارين رقمية"],
  ["/manus-storage/image36_6c9c71d2.jpg", "تعلم مستقل بإشراف"],
  ["/manus-storage/image37_4abcdd6b.jpg", "التعلم في كل مكان"],
  ["/manus-storage/image38_01f61890.jpg", "فرحة المشاركة"],
  ["/manus-storage/image39_ff98ed9f.jpg", "ألعاب التفكير"],
  ["/manus-storage/image40_567499a5.jpg", "تحديات ذهنية"],
  ["/manus-storage/image41_67e669c9.jpg", "أنشطة جماعية للأطفال"],
  ["/manus-storage/image42_2e976e77.jpg", "التعلم بالتركيز"],
  ["/manus-storage/image43_23fb5db8.jpg", "تدريب ممتع في الطبيعة"],
  ["/manus-storage/image44_dc331091.jpg", "الخيال وحل المشكلات"],
  ["/manus-storage/image45_39556975.jpg", "تعلم اللغات"],
  ["/manus-storage/image46_063f5180.jpg", "تدريب على المهارات"],
  ["/manus-storage/image47_6f4d51f5.jpg", "عرض أعمال الأطفال"],
  ["/manus-storage/image48_34bb3590.jpg", "فريق الأطفال"],
  ["/manus-storage/image49_71eca7ac.jpg", "إنجازات ومشروعات"],
  ["/manus-storage/image50_cbb58d80.jpg", "لحظة تعلم جماعي"],
  ["/manus-storage/image51_c1246c37.jpg", "تطبيقات سودوكو"],
  ["/manus-storage/image52_39cc7f4b.jpg", "سودوكو وتنمية المنطق"],
  ["/manus-storage/image53_e4ee52af.jpg", "تحديات التفكير المنطقي"],
];

export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <section className="bg-gradient-to-b from-blue-50/70 to-background dark:from-slate-900 py-14 border-b border-border text-center">
        <div className="container max-w-3xl space-y-4">
          <Badge className="bg-orange-100 text-accent border-none font-bold text-xs">من داخل أكاديمية الهدى</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">معرض صور الأكاديمية</h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">لقطات من حصصنا وأنشطتنا ومشروعات الأطفال والمدربات؛ لأن التعلم الحقيقي يظهر في لحظة تجربة ومشاركة وإنجاز.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"><MessageCircle className="w-4 h-4" />استفسري عن البرامج عبر الواتساب</Button></a>
        </div>
      </section>
      <section className="py-12 flex-1">
        <div className="container">
          <div className="flex items-center justify-between gap-3 mb-8"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-blue-100 text-primary flex items-center justify-center"><Images className="w-5 h-5" /></div><div><h2 className="text-xl sm:text-2xl font-black text-primary">لحظات من رحلتنا التعليمية</h2><p className="text-xs text-muted-foreground">صور مختارة من الملف المرفق</p></div></div><span className="text-xs text-muted-foreground">{galleryImages.length} صورة</span></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map(([src, alt], index) => (
              <figure key={src} className={`group overflow-hidden rounded-2xl bg-white dark:bg-card border border-border shadow-sm hover:shadow-xl transition-all ${index % 9 === 0 ? "md:row-span-2" : ""}`}>
                <div className="aspect-square overflow-hidden"><img src={src} alt={alt} title="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              </figure>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-primary text-white p-8 text-center space-y-4"><h2 className="text-2xl font-black">هل تريدين أن يكون طفلك جزءاً من هذه الرحلة؟</h2><p className="text-blue-100 text-sm">تواصلي معنا لنرشح لك المسار المناسب لعمر طفلك واحتياجه.</p><div className="flex flex-wrap justify-center gap-3"><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"><MessageCircle className="w-4 h-4" />تواصل عبر الواتساب</Button></a><Link href="/courses"><Button variant="outline" className="border-white/50 text-white hover:bg-white/10 font-bold gap-2">تصفح الدورات<ArrowLeft className="w-4 h-4" /></Button></Link></div></div>
        </div>
      </section>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
