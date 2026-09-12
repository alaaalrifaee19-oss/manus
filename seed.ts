import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  categories,
  instructors,
  courses,
  modules,
  lessons,
  quizzes,
  questions,
  reviews,
  faqs,
  blogPosts,
  settings,
  certificates,
  users,
} from "./drizzle/schema";

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DATABASE_URL set");
    return;
  }
  const connection = await mysql.createConnection(connectionString);
  const db = drizzle(connection);

  console.log("Seeding categories...");
  await db.insert(categories).values([
    {
      name: "الحساب الذهني وتنمية الذاكرة",
      slug: "mental-math",
      description: "برامج تنمية الذكاء والتركيز الحسابي والسرعة الذهنية للأطفال والمدربين بتقنيات السوروبان والمكعب الذكي.",
      icon: "Brain",
      orderIndex: 1,
    },
    {
      name: "اللغات والقرآن الكريم",
      slug: "languages-quran",
      description: "تأسيس اللغة العربية السليمة والقرآن الكريم، وتعليم اللغات الأجنبية كالألمانية والإنجليزية بطرق ممتعة.",
      icon: "BookOpen",
      orderIndex: 2,
    },
    {
      name: "البرمجة والذكاء الاصطناعي",
      slug: "coding-ai",
      description: "أساسيات التفكير البرمجي، الروبوتات، والذكاء الاصطناعي للأطفال واليافعين لصناعة قادة المستقبل.",
      icon: "Cpu",
      orderIndex: 3,
    },
    {
      name: "إعداد وتأهيل المدربات",
      slug: "trainer-certifications",
      description: "دبلومات مهنية معتمدة لتمكين المعلمات والأمهات من العمل كمدربات أطفال محترفات دولياً وعبر الإنترنت.",
      icon: "Award",
      orderIndex: 4,
    },
  ]).onDuplicateKeyUpdate({ set: { name: categories.name } });

  console.log("Seeding instructors from authentic project data...");
  await db.insert(instructors).values([
    {
      name: "أ. هدى عابدين",
      slug: "huda-abdeen",
      title: "مؤسسة الأكاديمية ومدربة دولية معتمدة في الحساب الذهني",
      bio: "بكالوريوس فيزياء وأساليب تدريسها. مدربة أطفال ومدربين معتمدة دولياً من مؤسسة علمني، متخصصة في تطوير القدرات العقلية للأطفال من خلال أساليب مبتكرة.",
      detailedBio: "دربت أكثر من 50 مدربة وأكثر من 200 طفل في العديد من الدول العربية والأوروبية، وخرجت مدربات أطفال قادرات على تدريب الأطفال بلغات متعددة كالألمانية والفرنسية.",
      qualifications: "بكالوريوس فيزياء وطرق تدريسها | مدربة مدربات معتمدة دولياً | أكثر من 12 عاماً خبرة تعليمية",
      credentials: "اعتماد دولي من مؤسسة علمني العالمية | شهادات تميز في التعليم الإبداعي والذكاء الحسابي",
      avatarUrl: "/manus-storage/huda-abdeen-portrait_095fea91.jpg",
      experienceYears: 12,
      studentsTrained: 250,
      trainersGraduated: 55,
      location: "الشرق الأوسط وأوروبا (أونلاين)",
      email: "alhudaacademy26@gmail.com",
      phone: "+905317329883",
      rating: "5.0",
      reviewCount: 68,
      isFeatured: true,
    },
    {
      name: "أ. آلاء الرفاعي",
      slug: "alaa-alrefai",
      title: "مدربة برمجة وذكاء اصطناعي للأطفال واليافعين",
      bio: "مدربة وتربوية شغوفة بتبسيط البرمجة والذكاء الاصطناعي للأطفال واليافعين، وتقديم المعرفة التقنية بطريقة آمنة وممتعة.",
      detailedBio: "تتخصص في تصميم أنشطة تعليمية تساعد الطفل على التفكير الخوارزمي، وصياغة الأسئلة، والتحقق من المعلومات، وتحويل التقنية إلى مساحة للإبداع وحل المشكلات.",
      qualifications: "تخصص في التعليم الرقمي والذكاء الاصطناعي للأطفال | خبرة في تصميم الحقائب التدريبية والتعلم الافتراضي",
      credentials: "مدربة في البرمجة والذكاء الاصطناعي للأطفال | خبرة في تدريب المعلمات وبناء المشاريع التعليمية",
      avatarUrl: "",
      experienceYears: 10,
      studentsTrained: 180,
      trainersGraduated: 35,
      location: "أونلاين",
      email: "alhudaacademy26@gmail.com",
      phone: "+905317329883",
      rating: "4.9",
      reviewCount: 42,
      isFeatured: true,
    },
    {
      name: "أ. سحر الحردان",
      slug: "sahar-alhardan",
      title: "مدربة حساب ذهني باللغة الألمانية",
      bio: "مستقرة في ألمانيا، خريجة كلية العلوم اختصاص فيزياء مع خبرة تدريسية لأكثر من 10 سنوات للمرحلتين الإعدادية والثانوية وبرامج اللغات.",
      detailedBio: "متخصصة في تقديم برامج تنمية الذاكرة والحساب الذهني السريع للأطفال الناطقين بالألمانية والعرب المقيمين بأوروبا لتعزيز التفوق المدرسي.",
      qualifications: "بكالوريوس علوم (فيزياء) | شهادة تدريس متقدمة بألمانيا | خبرة 10 سنوات في المدارس والمعاهد الأوروبية",
      credentials: "اعتماد تدريب الحساب الذهني التفاعلي بالألمانية | تدريب مكثف لأطفال المهجر",
      avatarUrl: "",
      experienceYears: 10,
      studentsTrained: 120,
      trainersGraduated: 15,
      location: "ألمانيا",
      email: "alhudaacademy26@gmail.com",
      phone: "+905317329883",
      rating: "4.9",
      reviewCount: 38,
      isFeatured: true,
    },
  ]).onDuplicateKeyUpdate({ set: { name: instructors.name } });

  console.log("Seeding courses...");
  await db.insert(courses).values([
    {
      title: "دبلوم إعداد مدربات الحساب الذهني المعتمد",
      slug: "mental-math-trainers-diploma",
      categoryId: 4,
      instructorId: 1,
      badgeText: "الأكثر طلباً",
      shortDescription: "برنامج تدريبي معتمد يؤهل الأمهات والمعلمات لاحتراف تدريب الأطفال على الحساب الذهني السريع وإطلاق مشاريعهن التعليمية المنزلية وعبر الإنترنت.",
      fullDescription: "صُمم هذا البرنامج خصيصاً لكل أم ومعلمة ترغب في امتلاك مهارة استثنائية تؤهلها لسوق العمل الحر والتعليم المنزلي الذكي. يشمل البرنامج قواعد الحساب الذهني وتطبيقات العداد السوروبان وطرق تبسيط المفاهيم للأطفال مع خطط الدروس ونماذج الجلسات التفاعلية.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      isFree: true,
      level: "جميع المستويات",
      durationText: "",
      lessonCount: 18,
      studentCount: 56,
      rating: "5.0",
      reviewCount: 34,
      isPublished: true,
      isFeatured: true,
      ageGroup: "المعلمات والأمهات والمدربات",
      language: "العربية",
      requirements: JSON.stringify(["شغف بالتعليم وتطوير مهارات الأطفال", "لا يُشترط تخصص رياضيات مسبق"]),
      learningOutcomes: JSON.stringify([
        "إتقان العمليات الحسابية الأربع على العداد الياباني وتخيلياً",
        "أساليب تدريس محببة ومسلية تجذب انتباه الأطفال",
        "إدارة الصفوف التفاعلية أونلاين وحضورياً",
        "الحصول على شهادة مدربة معتمدة رسمية لبدء التدريب فوراً"
      ]),
      targetAudience: JSON.stringify(["الأمهات الراغبات في تعليم أطفالهن بالمنزل", "المعلمات الطامحات لزيادة دخلهن", "الراغبات في إطلاق أكاديميتهن الخاصة"]),
    },
    {
      title: "برنامج العباقرة الصغار: الحساب الذهني وتنمية التركيز",
      slug: "young-geniuses-mental-math",
      categoryId: 1,
      instructorId: 1,
      badgeText: "المسار الشامل",
      shortDescription: "خطة أسبوعية مريحة مدتها ساعة يومياً لتنمية ذكاء الطفل وتركيزه وسرعة بديهته بالأنشطة والمنافسات المحفزة.",
      fullDescription: "مسار متكامل يأخذ بيد الطفل من الصفر، يبني تركيزه وذاكرته الفوتوغرافية، ويجعله يعشق الرياضيات والأرقام بعيداً عن التلقين والملل مع متابعة دورية مستمرة للأهل.",
      imageUrl: "/manus-storage/alhuda-hero_9251f56c.png",
      isFree: true,
      level: "مبتدئ",
      durationText: "",
      lessonCount: 24,
      studentCount: 210,
      rating: "5.0",
      reviewCount: 58,
      isPublished: true,
      isFeatured: true,
      ageGroup: "الأطفال من 5 إلى 14 سنة",
      language: "العربية",
      requirements: JSON.stringify(["لا يوجد متطلبات، نبدأ مع الطفل من الصفر", "جهاز لوحي أو كمبيوتر للاتصال"]),
      learningOutcomes: JSON.stringify([
        "مضاعفة سرعة الحساب والبديهة 5 أضعاف",
        "تعزيز التركيز والانتباه وتقليل التشتت",
        "بناء ثقة فائقة بالنفس أمام الزملاء والمدرسة",
        "تقوية الذاكرة الصورية والتفكير المنطقي"
      ]),
      targetAudience: JSON.stringify(["الأطفال الذين يعانون من تشتت الانتباه", "الراغبون في التفوق المدرسي", "الأطفال الشغوفون بالألعاب الذهنية"]),
    },
    {
      title: "أساسيات الذكاء الاصطناعي والتفكير المنطقي للصغار",
      slug: "ai-and-logic-for-kids",
      categoryId: 3,
      instructorId: 1,
      badgeText: "مستقبل التعليم",
      shortDescription: "اكتشف كيف يفكر الحاسوب والذكاء الاصطناعي من خلال ألعاب برمجية وقصص تفاعلية تناسب أعمار اليافعين.",
      fullDescription: "محتوى تعليمي عملي يشرح مفاهيم الذكاء الاصطناعي بطريقة مبسطة، مع تطبيقات سكراتش وتوليد القصص والأفكار بالذكاء الاصطناعي الأخلاقي المسؤول.",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      isFree: true,
      level: "مبتدئ",
      durationText: "",
      lessonCount: 12,
      studentCount: 92,
      rating: "4.9",
      reviewCount: 26,
      isPublished: true,
      isFeatured: true,
      ageGroup: "من 8 إلى 16 سنة",
      language: "العربية",
      requirements: JSON.stringify(["معرفة أساسية باستخدام الحاسوب"]),
      learningOutcomes: JSON.stringify([
        "فهم كيف تتعلم الآلات والذكاء الاصطناعي",
        "برمجة أول لعبة تفاعلية مبسطة",
        "تنمية مهارات التفكير النقدي وحل المشكلات",
        "الاستخدام الآمن والذكي لأدوات الذكاء الاصطناعي"
      ]),
      targetAudience: JSON.stringify(["الأطفال واليافعون المهتمون بالتقنية", "أولياء الأمور الراغبون بإعداد أبنائهم لمهن المستقبل"]),
    },
    {
      title: "الحساب الذهني وتنشيط العقل باللغة الألمانية",
      slug: "mental-math-in-german",
      categoryId: 1,
      instructorId: 3,
      badgeText: "لأطفال المهجر",
      shortDescription: "دورة تخصصية تجمع بين تقنيات الحساب الذهني وتقوية المصطلحات باللغة الألمانية لدعم اندماج وتفوق أطفالنا في المدارس الألمانية.",
      fullDescription: "برنامج مصمم لأطفال العائلات العربية في ألمانيا والنمسا وسويسرا، يقدمه كادر متخصص يشرح المفاهيم الذهنية ومصطلحات الرياضيات باللغتين الألمانية والعربية.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      isFree: true,
      level: "جميع المستويات",
      durationText: "",
      lessonCount: 16,
      studentCount: 64,
      rating: "4.9",
      reviewCount: 19,
      isPublished: true,
      isFeatured: false,
      ageGroup: "من 6 إلى 15 سنة",
      language: "الألمانية والعربية",
      requirements: JSON.stringify(["معرفة أولية بالأرقام"]),
      learningOutcomes: JSON.stringify([
        "إتقان الأرقام والعمليات الحسابية بالألمانية",
        "سرعة الحل التخيلي بثقة في الفصل المدرسي",
        "دمج مهارات الذاكرة مع إثراء المفردات التعليمية"
      ]),
      targetAudience: JSON.stringify(["الطلاب المقيمون في ألمانيا والدول الناطقة بالألمانية"]),
    },
    {
      title: "ورشة تجريبية: مدخل إلى الحساب الذهني السريع للأطفال",
      slug: "intro-mental-math-free",
      categoryId: 1,
      instructorId: 1,
      badgeText: "ورشة تمهيدية",
      shortDescription: "ورشة تعريفية مجانية للأطفال والأمهات للتعرف على العداد السوروبان وطريقة التعلم الممتعة وسرعة حل المسائل الحسابية.",
      fullDescription: "فرصة رائعة لكل أم وطفل لتجربة أسلوب أكاديمية الهدى التفاعلي الممتع ورؤية كيف يمكن للطفل أن يحل مسائل الجمع والطرح في ثوانٍ معدودة.",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      isFree: true,
      level: "مبتدئ",
      durationText: "",
      lessonCount: 3,
      studentCount: 430,
      rating: "5.0",
      reviewCount: 88,
      isPublished: true,
      isFeatured: false,
      ageGroup: "جميع الأطفال والأمهات",
      language: "العربية",
      requirements: JSON.stringify(["لا يوجد أي متطلب"]),
      learningOutcomes: JSON.stringify(["التعرف على العداد الياباني وتكوينه", "تمثيل الأرقام بالأصابع والخرزات", "حل أول 5 مسائل حسابية بسرعة"]),
      targetAudience: JSON.stringify(["كل أسرة تريد تجربة المنصة والتعرف على كادرنا"]),
    },
  ]).onDuplicateKeyUpdate({ set: { title: courses.title } });

  await db.insert(courses).values([
    { title: "دورة القرآن واللغة العربية", slug: "kids-quran-arabic", categoryId: 2, instructorId: 1, badgeText: "مسار الأطفال", shortDescription: "تأسيس الطفل في القراءة العربية وتلاوة القرآن وفهم المفردات بأسلوب تفاعلي متدرج.", fullDescription: "برنامج تأسيسي يجمع القراءة الصحيحة والوعي الصوتي ومخارج الحروف وحفظ السور القصيرة مع ربط المعنى بالسلوك اليومي. يتدرج الطفل من الحروف إلى القراءة والتلاوة ضمن أنشطة قصيرة تدعم التركيز والثقة.", imageUrl: "/manus-storage/quran-arabic-kids-course_26a38cfb.jpg", durationText: "", ageGroup: "الأطفال من 5 إلى 12 سنة", language: "العربية", isFeatured: true },
    { title: "دورة اللغة الإنجليزية للأطفال", slug: "kids-english", categoryId: 2, instructorId: 1, badgeText: "مسار الأطفال", shortDescription: "لغة إنجليزية عملية من خلال القصص والحوار والألعاب الصوتية المناسبة لعمر الطفل.", fullDescription: "يبني البرنامج أساساً متوازناً في الاستماع والنطق والمفردات والعبارات اليومية عبر قصص قصيرة ومواقف حوارية وتمارين نطق متكررة، لتصبح اللغة وسيلة للتواصل.", imageUrl: "/manus-storage/english-kids-course_9b73f52c.jpg", durationText: "", ageGroup: "الأطفال من 5 إلى 14 سنة", language: "العربية والإنجليزية", isFeatured: true },
    { title: "دورة الحساب الذهني", slug: "kids-mental-math", categoryId: 1, instructorId: 1, badgeText: "الأكثر طلباً", shortDescription: "تدريب ممتع على السوروبان والتخيل الذهني وسرعة الاستجابة الحسابية.", fullDescription: "ينقل البرنامج الطفل من التعامل المحسوس مع العداد إلى التصور الذهني للعمليات الحسابية، مع تمارين تطور الانتباه والذاكرة العاملة والمرونة في حل المشكلات.", imageUrl: "/manus-storage/image7_897d74f4.jpg", durationText: "", ageGroup: "الأطفال من 5 إلى 14 سنة", language: "العربية", isFeatured: true },
    { title: "دورة السودوكو للأطفال", slug: "kids-sudoku", categoryId: 1, instructorId: 1, badgeText: "تفكير منطقي", shortDescription: "ألغاز سودوكو متدرجة لتنمية الاستدلال والتركيز والصبر.", fullDescription: "يعلم الطفل قواعد السودوكو من خلال شبكات صغيرة وألعاب بصرية ثم ينتقل إلى استراتيجيات الاستبعاد واكتشاف الأنماط، مع شرح التفكير والخطوات.", imageUrl: "/manus-storage/image52_39cc7f4b.jpg", durationText: "", ageGroup: "الأطفال من 7 إلى 15 سنة", language: "العربية", isFeatured: true },
    { title: "دورة جداول الضرب", slug: "kids-multiplication", categoryId: 1, instructorId: 1, badgeText: "مهارة أساسية", shortDescription: "طريقة ذكية ومرنة لفهم جداول الضرب وتثبيتها بعيداً عن الحفظ الجاف.", fullDescription: "يقدم البرنامج جداول الضرب عبر أنماط بصرية وإيقاعات وتطبيقات عملية وتمارين استرجاع متباعدة، ليفهم الطفل العلاقة بين الضرب والجمع والتوزيع.", imageUrl: "/manus-storage/image17_506332bf.jpg", durationText: "", ageGroup: "الأطفال من 6 إلى 13 سنة", language: "العربية", isFeatured: true },
    { title: "دورة مكعب روبيك", slug: "kids-rubik-cube", categoryId: 1, instructorId: 1, badgeText: "تعلم باللعب", shortDescription: "تدريب عملي على حل مكعب روبيك وتنمية التصور المكاني وتسلسل الخطوات.", fullDescription: "يتعرف الطفل إلى بنية المكعب والرموز والخوارزميات المبسطة مع فهم سبب كل حركة، بما يدرب الذاكرة الإجرائية والتصور المكاني والمثابرة.", imageUrl: "/manus-storage/image19_a3f4e218.jpg", durationText: "", ageGroup: "الأطفال من 7 إلى 16 سنة", language: "العربية", isFeatured: true },
    { title: "دورة الذكاء الاصطناعي للأطفال", slug: "kids-ai", categoryId: 3, instructorId: 2, badgeText: "مستقبل الطفل", shortDescription: "مدخل آمن ومبسط إلى التفكير الحاسوبي والذكاء الاصطناعي.", fullDescription: "يشرح البرنامج كيف تتعلم الأنظمة من البيانات وكيف يستخدم الطفل الأدوات الحديثة بمسؤولية، مع تعلم صياغة السؤال وتقييم الإجابة وحماية الخصوصية.", imageUrl: "/manus-storage/ai-courses_522f9710.jpg", durationText: "", ageGroup: "الأطفال من 8 إلى 16 سنة", language: "العربية", isFeatured: true },
    { title: "دورة مدرب الحساب الذهني", slug: "trainer-mental-math", categoryId: 4, instructorId: 1, badgeText: "مسار المدربين", shortDescription: "تأهيل عملي لتعليم الحساب الذهني للأطفال وبناء جلسات تدريبية فعالة.", fullDescription: "تتدرب المعلمة على مبادئ السوروبان والتدرج المهاري وتصميم النشاط وإدارة الجلسة وقياس تقدم الطفل والتواصل مع الأسرة.", imageUrl: "/manus-storage/image18_5ce859f5.jpg", durationText: "", ageGroup: "المعلمات والأمهات والمدربات", language: "العربية", isFeatured: true },
    { title: "دورة مدرب السودوكو", slug: "trainer-sudoku", categoryId: 4, instructorId: 1, badgeText: "مسار المدربين", shortDescription: "منهجية تدريب الأطفال على السودوكو وبناء أنشطة التفكير المنطقي.", fullDescription: "تتعلم المدربة تحليل مهارات الاستدلال واختيار الشبكات وشرح الاستبعاد والأنماط وبناء بنك أنشطة وقياس التحسن.", imageUrl: "/manus-storage/image27_bae9235c.jpg", durationText: "", ageGroup: "المعلمات والمدربات", language: "العربية", isFeatured: true },
    { title: "دورة مدرب مكعب روبيك", slug: "trainer-rubik-cube", categoryId: 4, instructorId: 1, badgeText: "مسار المدربين", shortDescription: "تأهيل المدرب لتعليم مكعب روبيك عبر منهج واضح وآمن وممتع.", fullDescription: "تقدم الدورة أساسيات المكعب وخوارزمياته وتشرح تقسيم المهارة إلى خطوات صغيرة مع النمذجة والتدريب الموجه وتنمية الذاكرة والتصور المكاني.", imageUrl: "/manus-storage/image29_ebe1ea2f.jpg", durationText: "", ageGroup: "المعلمات والمدربات", language: "العربية", isFeatured: true },
    { title: "دورة مدرب جداول الضرب", slug: "trainer-multiplication", categoryId: 4, instructorId: 1, badgeText: "مسار المدربين", shortDescription: "أدوات تربوية لتدريس جداول الضرب بالفهم والاسترجاع المتباعد.", fullDescription: "تتعلم المدربة الانتقال بالطفل من فهم معنى الضرب إلى الطلاقة باستخدام التمثيل البصري والألعاب والتقييم القصير ودعم مواطن التعثر.", imageUrl: "/manus-storage/image31_2e3d4984.jpg", durationText: "", ageGroup: "المعلمات والأمهات والمدربات", language: "العربية", isFeatured: true },
    { title: "دورة مدرب الذكاء الاصطناعي", slug: "trainer-ai", categoryId: 4, instructorId: 2, badgeText: "مسار المدربين", shortDescription: "تأهيل المدرب لتقديم الذكاء الاصطناعي للأطفال بمحتوى تربوي آمن ومسؤول.", fullDescription: "تتناول الدورة مبادئ الذكاء الاصطناعي المناسبة للطفولة وتصميم المشاريع وأخلاقيات الخصوصية والتحقق من المعلومات وبناء درس عملي.", imageUrl: "/manus-storage/ai-courses_522f9710.jpg", durationText: "", ageGroup: "المعلمات والمدربات", language: "العربية", isFeatured: true },
  ]).onDuplicateKeyUpdate({ set: { title: courses.title } });

  console.log("Seeding modules & lessons...");
  await db.insert(modules).values([
    {
      courseId: 1,
      title: "الوحدة الأولى: أساسيات السوروبان والتمثيل البصري",
      description: "مدخل تاريخي، تشريح العداد الياباني، وقواعد تحريك الخرزات العلوية والسفلية.",
      orderIndex: 1,
    },
    {
      courseId: 1,
      title: "الوحدة الثانية: قواعد أصدقاء العدد 5 والعدد 10",
      description: "المعادلات الأساسية للجمع والطرح المركب وتطبيقات عملية مكثفة.",
      orderIndex: 2,
    },
    {
      courseId: 1,
      title: "الوحدة الثالثة: منهجية تدريس الأطفال وإدارة الجلسات",
      description: "كيف تحولين الدرس إلى مغامرة ممتعة تجذب الطفل وتصنع منه بطلاً حسابياً.",
      orderIndex: 3,
    },
    {
      courseId: 2,
      title: "المستوى الأول: التعرف على العداد وألعاب الأصابع",
      description: "تمثيل الأعداد من 1 إلى 99 بواسطة اليدين والعداد الصغير.",
      orderIndex: 1,
    },
    {
      courseId: 2,
      title: "المستوى الثاني: الجمع والطرح البسيط والمتكرر",
      description: "مسابقات تفاعلية وسرعة استجابة ذهنية في أقل من ثانيتين.",
      orderIndex: 2,
    },
  ]);

  await db.insert(lessons).values([
    {
      moduleId: 1,
      courseId: 1,
      title: "الدرس 1: الترحيب وفلسفة الحساب الذهني للأطفال",
      slug: "welcome-and-philosophy",
      content: `أهلاً بكِ في أكاديمية الهدى التعليمية. الحساب الذهني ليس مجرد حل أرقام بل هو وسيلة لتفعيل نصفي الدماغ الأيمن والأيسر معاً.
في هذا الدرس نتعلم كيف نغرس حب العلم والاستكشاف في قلب الطفل ونحول وقت الشاشات إلى وقت بناء وتفكير راقٍ.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 25,
      orderIndex: 1,
      isFreePreview: true,
      resourcesJson: JSON.stringify([
        { name: "كتيب الدليل التعريفي للمدربة.pdf", url: "#" },
        { name: "أوراق عمل تمارين الأصابع اليومية.pdf", url: "#" }
      ]),
    },
    {
      moduleId: 1,
      courseId: 1,
      title: "الدرس 2: تشريح العداد السوروبان وقيم الخرزات",
      slug: "soroban-structure",
      content: `يتكون العداد من الإطار الخارجي، العارضة الفاصلة، خرزات السماء (قيمتها 5) وخرزات الأرض (قيمة كل منها 1).
تدربي على تصفير العداد بمسحة واحدة باستخدام السبابة والإبهام كما نوضح في الفيديو التطبيقي.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 30,
      orderIndex: 2,
      isFreePreview: false,
      resourcesJson: JSON.stringify([{ name: "لوحة تمارين الخرزات.pdf", url: "#" }]),
    },
    {
      moduleId: 2,
      courseId: 1,
      title: "الدرس 3: أصدقاء العدد 5 الموجب والسالب",
      slug: "friends-of-5",
      content: `حين نحتاج لإضافة 4 ولا نجد خرزات سفلية كافية: نضيف 5 ونطرح 1 (+4 = +5 - 1).
نطبق هذه القواعد مع الأناشيد الإيقاعية المحببة للطفل لكي يحفظها بسهولة ويسر.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 35,
      orderIndex: 1,
      isFreePreview: false,
      resourcesJson: JSON.stringify([{ name: "بطاقات أصدقاء الخمسة المصورة.pdf", url: "#" }]),
    },
    {
      moduleId: 4,
      courseId: 2,
      title: "الدرس 1: مغامرة الأرقام مع العداد السحري",
      slug: "magic-soroban-intro",
      content: `مرحباً يا بطل! اليوم سنتعرف على عدادنا السحري الملون. سنلعب لعبة تحريك الخرزات ونعد من 1 إلى 9 بسرعة البرق!`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 20,
      orderIndex: 1,
      isFreePreview: true,
      resourcesJson: JSON.stringify([{ name: "تلوين العداد للأبطال.pdf", url: "#" }]),
    },
    {
      moduleId: 4,
      courseId: 2,
      title: "الدرس 2: سباق السرعة الذهني الأول",
      slug: "first-mental-race",
      content: `أغمض عينيك وتخيل العداد أمامك، ارفع خرزة واحدة، أضف اثنتين، كم أصبح الناتج؟ نعم، ثلاثة! أحسنت يا عبقري!`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 20,
      orderIndex: 2,
      isFreePreview: false,
      resourcesJson: JSON.stringify([{ name: "جدول نقاط البطل الأسبوعي.pdf", url: "#" }]),
    },
  ]);

  console.log("Seeding quizzes & questions...");
  await db.insert(quizzes).values([
    {
      courseId: 1,
      title: "اختبار تقييم الوحدة الأولى: بنية السوروبان والتمثيل البصري",
      description: "اختبار لقياس فهم المدربة لمكونات العداد وقواعد تمثيل الأرقام قبل الانتقال للعمليات المركبة.",
      durationMinutes: 15,
      passingScore: 75,
      isFinalExam: false,
    },
    {
      courseId: 1,
      title: "الاختبار النهائي لدبلوم إعداد مدربات الحساب الذهني",
      description: "الامتحان الختامي المؤهل لإصدار شهادة الاعتماد الدولية للأكاديمية.",
      durationMinutes: 30,
      passingScore: 80,
      isFinalExam: true,
    },
  ]);

  await db.insert(questions).values([
    {
      quizId: 1,
      questionText: "كم تبلغ قيمة الخرزة الواحدة في الجزء العلوي (خرزات السماء) في العداد الياباني؟",
      type: "single_choice",
      optionsJson: JSON.stringify([
        { id: "1", text: "1 (واحد)" },
        { id: "2", text: "5 (خمسة)" },
        { id: "3", text: "10 (عشرة)" },
        { id: "4", text: "0 (صفر)" }
      ]),
      correctAnswerJson: JSON.stringify(["2"]),
      explanation: "في السوروبان الياباني، كل خرزة علوية تمثل القيمة 5 في عمودها الخاص.",
      orderIndex: 1,
    },
    {
      quizId: 1,
      questionText: "العمليات على العداد السوروبان تنشط النصفين الأيمن والأيسر من الدماغ في آن واحد.",
      type: "true_false",
      optionsJson: JSON.stringify([
        { id: "1", text: "صحيح" },
        { id: "2", text: "خطأ" }
      ]),
      correctAnswerJson: JSON.stringify(["1"]),
      explanation: "صحيح، لأن استخدام اليدين والتخيل ينشط الإبداع البصري (الأيمن) والمنطق الرياضي (الأيسر).",
      orderIndex: 2,
    },
    {
      quizId: 1,
      questionText: "ما هي القاعدة المتبعة لإضافة العدد 4 عند استخدام أصدقاء العدد 5؟",
      type: "single_choice",
      optionsJson: JSON.stringify([
        { id: "1", text: "+5 - 1" },
        { id: "2", text: "+5 + 1" },
        { id: "3", text: "+10 - 6" },
        { id: "4", text: "+4 مباشرة دائماً" }
      ]),
      correctAnswerJson: JSON.stringify(["1"]),
      explanation: "عند غياب 4 خرزات سفلية، ننزل خرزة الـ 5 ونطرح خرزة الـ 1: (+4 = +5 - 1).",
      orderIndex: 3,
    },
  ]);

  console.log("Seeding authentic reviews & testimonials...");
  await db.insert(reviews).values([
    {
      courseId: 2,
      authorName: "والدة الطفل جاد",
      authorRole: "ولي أمر - طالب في مسار العباقرة",
      rating: 5,
      comment: "شكراً كتير عنجد لألك آنسة هدى، فعلاً جاد ما عاد عم يعذبني بفهم القواعد! صار يفهمها فوراً لما تشرحي من أول مرة ويطلب بنفسه يحل التمارين.",
      isApproved: true,
      isFeatured: true,
    },
    {
      courseId: 2,
      authorName: "والدة الطفل عبد الله",
      authorRole: "ولي أمر - طالب في المستوى المتقدم",
      rating: 5,
      comment: "شكراً كتير عنجد وكتير أنا مبسوطة من السرعة والطلاقة يلي وصل فيها عبد الله. طبعاً هاد كلو بفضل جهودك وأسلوبك السلس والمحبب للأطفال.",
      isApproved: true,
      isFeatured: true,
    },
    {
      courseId: 1,
      authorName: "Lara Ababneh",
      authorRole: "مدربة معتمدة - خريجة الدبلوم",
      rating: 5,
      comment: "فخورة فيكِ كتير والله! شو حلوة السوشال ميديا يلي عرفتني ع إنسانة متلك، بإصرارك وعزيمتك بتستاهلي تكوني من أكبر الأسماء في الحساب الذهني عربياً.",
      isApproved: true,
      isFeatured: true,
    },
    {
      courseId: 1,
      authorName: "Nouha Fadloun",
      authorRole: "مدربة ومقيمة في أوروبا",
      rating: 5,
      comment: "والله كتير شكراً يا هدى والله يقويكِ ويزيدك من علمه.. كورس المدربين تبع الحساب رجع لي الشغف يلي كنت حبه لما كنت طالبة بالمدرسة! مادة الرياضيات كانت الأحب لقلبي ورجعت لي ثقتي بنفسي.",
      isApproved: true,
      isFeatured: true,
    },
    {
      courseId: 1,
      authorName: "Fatemah",
      authorRole: "مدربة وأم - خريجة الدفعة السابقة",
      rating: 5,
      comment: "تسلم إيدك يا رب والله الفضل إلك من بعد رب العالمين. كتير حبيت الكورس واستفدت بشكل كبير، رجعت المرونة لعقلي بعد انقطاع وهلق قادرة علّم ولادي والطلاب بكل ثقة.",
      isApproved: true,
      isFeatured: true,
    },
    {
      courseId: 1,
      authorName: "Sevin Nabou",
      authorRole: "أم ومدربة مستقلة",
      rating: 5,
      comment: "أنا أم لطفلتين وحالياً عندي عملي الخاص من البيت حضورياً وأونلاين. بصراحة أكتر شي كنت محتاجته كأم إنه يكون وقتي ملكي وببيتي، وكتير مبسوطة مع طلابي والحمدلله.",
      isApproved: true,
      isFeatured: true,
    },
  ]);

  console.log("Seeding FAQs...");
  await db.insert(faqs).values([
    {
      question: "ما الذي يجعل أكاديمية الهدى التعليمية مختلفة عن المراكز الأخرى؟",
      answer: "مكان واحد متكامل يجمع كل ما يحتاجه الطفل (لغات، قرآن، حساب ذهني، ذكاء اصطناعي، ومهارات تفكير) بخطة أسبوعية مريحة (ساعة واحدة يومياً فقط) وبمنهج ثابت يضمن استمرارية تطور الطفل حتى في حال تغير المعلمة، وبإشراف معلمات خبيرات في المدارس الدولية.",
      category: "عن الأكاديمية",
      orderIndex: 1,
      isPublished: true,
    },
    {
      question: "هل أحتاج لمعرفة مسبقة بالرياضيات للتسجيل في دبلوم المدربات؟",
      answer: "إطلاقاً، نبدأ معكِ من الصفر وبشرح تفصيلي مبسط. الدورة تركز على المهارة وأساليب تبسيطها للأطفال وليس على الرياضيات المعقدة.",
      category: "دبلوم المدربات",
      orderIndex: 2,
      isPublished: true,
    },
    {
      question: "كيف تتم متابعة مستوى طفلي؟",
      answer: "يمتلك كل ولي أمر وطالب لوحة تحكم خاصة تتيح متابعة الدروس المنجزة، نتائج الاختبارات الدورية، تقارير المعلمة الأسبوعية، والمهارات المكتسبة والملاحظات القادمة من المعلمة.",
      category: "التعليم والطلاب",
      orderIndex: 3,
      isPublished: true,
    },
    {
      question: "ما هو العمر المناسب لدورات الأطفال؟",
      answer: "نقدم برامج مخصصة للأطفال بدءاً من عمر 5 سنوات حتى 16 سنة، موزعة على فئات عمرية ومستويات تناسب الإدراك العقلي لكل مرحلة.",
      category: "التعليم والطلاب",
      orderIndex: 4,
      isPublished: true,
    },
    {
      question: "كيف يمكنني التواصل المباشر مع إدارة الأكاديمية؟",
      answer: "يمكنكِ التواصل معنا مباشرة عبر الواتساب على الرقم الرسمي المعتمد: +905317329883 أو عبر نموذج الاتصال في الموقع.",
      category: "التواصل والتسجيل",
      orderIndex: 5,
      isPublished: true,
    },
  ]);

  console.log("Seeding Blog Posts...");
  await db.insert(blogPosts).values([
    {
      title: "ساعة واحدة يومياً تصنع الفارق: كيف نبني عقل الطفل دون ضغط أو إرهاق؟",
      slug: "one-hour-daily-child-mind",
      summary: "فلسفة أكاديمية الهدى في تقديم تعليم متوازن ومريح يجمع بين المتعة والمعرفة، ويجعل الطفل يقبل على التعلم بشغف حقيقي.",
      content: `لماذا قد تكون ساعة واحدة أفضل من يوم طويل مليء بالأنشطة؟

لا يقاس التعلم بعدد الساعات التي يقضيها الطفل أمام الكتاب أو الشاشة، بل بجودة الانتباه وطريقة بناء الخبرة. عندما تكون الجلسة قصيرة وواضحة الهدف، يستطيع الطفل أن يدخلها وهو يعرف ما الذي سيتعلمه، ثم يطبق ويخطئ ويعيد المحاولة دون أن يشعر بأن المهمة لا تنتهي. هذه البنية تقلل الحمل المعرفي وتمنح الدماغ فرصة لترسيخ المهارة بدلاً من الانتقال السريع بين واجبات كثيرة.

في أكاديمية الهدى نبدأ عادة بهدف واحد أو هدفين قابلين للملاحظة: تمييز نمط عددي، قراءة كلمات جديدة، حل شبكة صغيرة، أو تفسير فكرة تقنية. ثم نقسم النشاط إلى خطوات قصيرة تتخللها أسئلة وحركة وتغذية راجعة. هذا التدرج لا يعني تبسيط المحتوى بصورة سطحية؛ بل يعني تقديمه في وحدات تناسب الذاكرة العاملة، ثم العودة إليه في أوقات متباعدة حتى ينتقل من المعرفة المؤقتة إلى الطلاقة.

يبدأ الطفل بتهيئة سريعة تستدعي ما تعلمه سابقاً، ثم يواجه مثالاً جديداً، وبعدها يحاول بنفسه مع دعم المعلمة عند الحاجة. في نهاية الجلسة نستخدم سؤالاً قصيراً أو مهمة صغيرة للتأكد من الفهم، ونترك للطفل نقطة نجاح واضحة يشعر بها. هذه الخطوات تبني الدافعية الداخلية؛ فالطفل لا يتعلم لأنه خائف من الخطأ، بل لأنه يرى تقدمه ويشعر أن لديه قدرة على المحاولة.

ولكي تنجح الخطة في المنزل، يكفي أن تحافظ الأسرة على وقت ثابت وبيئة هادئة، وأن تسأل الطفل ماذا اكتشف بدلاً من الاكتفاء بسؤال هل أنهيت واجبك. من المفيد الاحتفال بالاستراتيجية التي استخدمها الطفل لا بالنتيجة وحدها. بهذه الطريقة تصبح الساعة اليومية مساحة آمنة للتفكير واللغة والخيال وبناء الثقة.

الخلاصة أن البرنامج المتوازن يختار مهارة مهمة، يقدمها بوضوح، يتيح ممارسة متكررة، ثم يتابع أثرها. وعندما تجتمع هذه العناصر مع معلمة متخصصة ومنهج ثابت، تصبح الساعة القصيرة عادة تعليمية يمكن أن ترافق الطفل طويلاً.`,
      authorName: "أ. هدى عابدين",
      imageUrl: "/manus-storage/alhuda-hero_9251f56c.png",
      categoryName: "تربية وتعليم",
      readTimeMinutes: 9,
      isPublished: true,
    },
    {
      title: "كيف تبدأين مشروعك التعليمي الخاص وتدريب الأطفال من المنزل؟",
      slug: "start-home-teaching-project",
      summary: "دليل عملي للأمهات والمعلمات الراغبات في استثمار شغفهن بالتعليم لتحقيق الاستقلال المالي والعمل المرن من البيت.",
      content: `التعليم من المنزل ليس مجرد تحويل الحصة إلى مكالمة فيديو. إنه مشروع تربوي يحتاج إلى رؤية واضحة ونظام عمل يحمي وقت المدربة ويضمن تجربة محترمة للطفل والأسرة.

الخطوة الأولى هي اختيار مجال يمكن شرحه بعمق وبأسلوب مناسب للعمر. قد يكون الحساب الذهني أو السودوكو أو اللغة أو مهارات التفكير، لكن المهم ألا تحاولي تقديم كل شيء منذ اليوم الأول. التخصص يساعدك على تصميم مسار متدرج، وتحديد نواتج تعلم قابلة للقياس، وبناء تمارين تكشف أين يحتاج الطفل إلى دعم إضافي.

بعد ذلك اكتبي خريطة المنهج قبل فتح التسجيل. حددي نقطة البداية، والمهارات التي يجب أن يكتسبها الطفل في كل مرحلة، وطريقة الانتقال إلى المرحلة التالية. اجعلي كل لقاء يتضمن هدفاً واضحاً، ونشاطاً تطبيقياً، ومهمة قصيرة للمراجعة، مع جدول يوضح المهارة ومستوى الاستقلالية والملاحظة القادمة.

في التعليم الرقمي تزداد أهمية إدارة الانتباه. استخدمي صوراً وأدوات قليلة وواضحة، وغيّري نمط النشاط كل عدة دقائق، واطلبي من الطفل أن يشرح لك كيف فكر. كما ينبغي حماية خصوصية الأطفال، والحصول على موافقة الأسرة قبل تسجيل أي مادة، وعدم نشر صور أو أسماء أو نتائج في التسويق دون إذن صريح.

أما الجانب المهني فيبدأ من تسعير عادل وسياسة واضحة للتأجيل والغياب والتواصل. اكتبي للأهل ما الذي تقدمه الجلسة وما الذي لا تقدمه، ومتى تصلك الرسائل، وكيف يتلقون التقرير. التسويق الأخلاقي يصف الفائدة الواقعية ولا يعد بنتائج سحرية أو تفوق مضمون.

ابدئي بمجموعة صغيرة، واختبري الخطة، واسألي عن تجربة الأطفال والأهل، ثم حسّني المنهج بناء على الأدلة. المشروع الناجح يبنى على جودة الدرس واستمرارية المتابعة وقدرة المدربة على التعلم من الممارسة.`,
      authorName: "أ. هدى عابدين",
      imageUrl: "/manus-storage/home-teaching-project_8b8c4ebf.jpg",
      categoryName: "تمكين المعلمات",
      readTimeMinutes: 12,
      isPublished: true,
    },
    {
      title: "لماذا يجب أن يتعلم أطفالنا أساسيات الذكاء الاصطناعي اليوم؟",
      slug: "why-kids-learn-ai-today",
      summary: "نظرة على مهارات القرن الحادي والعشرين وكيف نحول أطفالنا من مجرد مستهلكين للتقنية إلى مبتكرين ومفكرين يصنعون المستقبل.",
      content: `لم يعد الذكاء الاصطناعي موضوعاً بعيداً عن حياة الأطفال؛ فالأدوات الذكية تدخل في البحث والكتابة والصور والألعاب. لذلك لا يكفي أن نمنع الطفل من التقنية أو نتركه يستخدمها بلا توجيه. الأفضل هو بناء فهم مبكر وآمن يجعله مستخدماً واعياً يسأل ويفحص ويعرف حدود الأداة.

نبدأ بشرح الفكرة بلغة بسيطة: النظام الذكي لا يفكر مثل الإنسان، بل يتعلم أنماطاً من أمثلة وبيانات ويقدم توقعاً أو اقتراحاً. قد تكون النتيجة مفيدة، لكنها ليست حقيقة تلقائياً. يتعلم الطفل أن يسأل من أين جاءت الإجابة، وهل توجد أدلة، وهل يمكن أن تكون ناقصة أو متحيزة.

التعلم الجيد يجمع بين المفهوم والتجربة. يمكن أن يصمم الطفل قصة قصيرة ويقارن بين اقتراحين، أو يصنف صوراً وفق قواعد يحددها، أو يكتب تعليمات واضحة لأداة ثم يراجع الناتج. في كل نشاط نطلب منه تحديد الهدف، وكتابة السؤال، وملاحظة ما تغير عندما عدل الكلمات، ثم شرح سبب اختياره للنتيجة الأفضل.

الخصوصية جزء أساسي من المنهج. يتعلم الطفل ألا يكتب اسمه الكامل أو عنوانه أو صورته أو معلومات أسرته في أداة لا يعرفها، وألا يشارك بيانات زملائه. كما يتعلم احترام حقوق الآخرين وعدم نسخ نص أو صورة ونسبها إلى نفسه.

دور الأسرة والمعلمة هو وضع حدود واضحة ومراجعة الاستخدام. ينبغي أن يكون لكل نشاط هدف ومدة محددة، وأن يتبع استخدام الأداة نقاش أو تطبيق يدوي حتى يبقى التفكير في يد الطفل. الطفل الذي يتعلم هذه العادات مبكراً يصبح قادراً على طرح أسئلة أفضل واكتشاف المشكلات وبناء أفكار جديدة.`,
      authorName: "أ. هدى عابدين",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      categoryName: "تكنولوجيا المستقبل",
      readTimeMinutes: 11,
      isPublished: true,
    },
  ]);

  console.log("Seeding system settings...");
  await db.insert(settings).values([
    {
      key: "academy_name",
      value: "أكاديمية الهدى التعليمية",
      description: "الاسم الرسمي للأكاديمية",
    },
    {
      key: "whatsapp_number",
      value: "+905317329883",
      description: "رقم الواتساب الرسمي للتواصل المباشر والاستفسارات",
    },
    {
      key: "contact_email",
      value: "alhudaacademy26@gmail.com",
      description: "البريد الإلكتروني الرسمي",
    },
    {
      key: "address",
      value: "منصة تعليمية دولية أونلاين - المقر الرئيسي للتدريب الافتراضي",
      description: "عنوان الأكاديمية",
    },
    {
      key: "hero_title",
      value: "منظومة تعليمية متكاملة لبناء عقل طفلك وصناعة مستقبله بثقة",
      description: "عنوان الواجهة الرئيسية",
    },
    {
      key: "hero_subtitle",
      value: "مكان واحد يجمع الحساب الذهني، اللغات، مهارات التفكير، والذكاء الاصطناعي للأطفال، مع برامج معتمدة لإعداد وتأهيل المدربات دولياً.",
      description: "الوصف التعريفي للواجهة الرئيسية",
    },
  ]).onDuplicateKeyUpdate({ set: { value: settings.value } });

  console.log("Seeding a sample verifiable certificate...");
  await db.insert(certificates).values([
    {
      certificateCode: "ALHUDA-2026-89421",
      userId: 1,
      courseId: 1,
      studentName: "سارة عبد الرحمن الشهري",
      courseTitle: "دبلوم إعداد مدربات الحساب الذهني المعتمد",
      grade: "ممتاز مع مرتبة الشرف",
      instructorSignatureName: "أ. هدى عابدين",
      status: "valid",
    },
    {
      certificateCode: "ALHUDA-2026-10574",
      userId: 1,
      courseId: 2,
      studentName: "جاد أحمد الخالد",
      courseTitle: "برنامج العباقرة الصغار: الحساب الذهني وتنمية التركيز",
      grade: "امتياز (100%)",
      instructorSignatureName: "أ. هدى عابدين",
      status: "valid",
    },
  ]).onDuplicateKeyUpdate({ set: { grade: certificates.grade } });

  console.log("Seed completed successfully!");
  await connection.end();
}

seed().catch(console.error);
