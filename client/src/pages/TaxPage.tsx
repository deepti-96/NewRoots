import { useApp } from "@/App";
import { t } from "@/lib/translations";
import AppNav from "@/components/AppNav";
import VoiceButton from "@/components/VoiceButton";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ExternalLink, Bell, BellOff, Calendar, DollarSign, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface TaxSection {
  key: string;
  icon: string;
  title: Record<string, string>;
  content: Record<string, string>;
  link?: string;
  linkLabel?: Record<string, string>;
  important?: boolean;
}

const TAX_SECTIONS: TaxSection[] = [
  {
    key: "who_files",
    icon: "📋",
    title: {
      en: "Do I need to file taxes?",
      es: "¿Necesito presentar impuestos?",
      zh: "我需要报税吗？",
      hi: "क्या मुझे टैक्स फाइल करना होगा?",
      ar: "هل أحتاج إلى تقديم الضرائب؟",
      fr: "Dois-je déclarer des impôts ?",
      pt: "Preciso declarar impostos?",
      vi: "Tôi có cần khai thuế không?",
      ko: "세금 신고를 해야 하나요?",
      tl: "Kailangan ko bang mag-file ng buwis?",
    },
    content: {
      en: "If you earned income in the U.S. — from a job, freelance work, or any wages — you generally must file a federal tax return. This is true even if you just arrived. If you had NO income and are not a permanent resident, you may still need to file Form 8843. A tax professional or free VITA site can help you determine your specific situation.",
      es: "Si ganaste ingresos en EE.UU. — de un trabajo, trabajo independiente o cualquier salario — generalmente debes presentar una declaración de impuestos federal. Un profesional de impuestos o sitio gratuito VITA puede ayudarte.",
      zh: "如果您在美国获得了收入——来自工作、自由职业或任何工资——您通常必须提交联邦税务申报表。即使您刚刚到达也是如此。",
      hi: "अगर आपने अमेरिका में आय अर्जित की — नौकरी, फ्रीलांस काम, या किसी भी मजदूरी से — तो आपको आम तौर पर संघीय टैक्स रिटर्न दाखिल करना होगा।",
      ar: "إذا كسبت دخلاً في الولايات المتحدة — من وظيفة أو عمل مستقل أو أي أجور — فعليك عموماً تقديم إقرار ضريبي فيدرالي.",
      fr: "Si vous avez gagné un revenu aux États-Unis, vous devez généralement déposer une déclaration de revenus fédérale.",
      pt: "Se você ganhou renda nos EUA — de um emprego, trabalho freelance ou qualquer salário — geralmente deve declarar impostos federais.",
      vi: "Nếu bạn kiếm được thu nhập ở Mỹ, nhìn chung bạn phải nộp tờ khai thuế liên bang.",
      ko: "미국에서 수입을 얻었다면 — 직업, 프리랜서 작업 또는 임금에서 — 일반적으로 연방 세금 신고를 해야 합니다.",
      tl: "Kung nakakita ka ng kita sa U.S. — mula sa trabaho, freelance na trabaho, o anumang sahod — karaniwan kang kailangang mag-file ng federal tax return.",
    },
    important: true,
  },
  {
    key: "deadline",
    icon: "📅",
    title: {
      en: "Tax Deadline — April 15",
      es: "Fecha Límite de Impuestos — 15 de Abril",
      zh: "报税截止日期 — 4月15日",
      hi: "टैक्स डेडलाइन — 15 अप्रैल",
      ar: "الموعد النهائي للضرائب — 15 أبريل",
      fr: "Date limite fiscale — 15 avril",
      pt: "Prazo fiscal — 15 de abril",
      vi: "Hạn chót khai thuế — ngày 15 tháng 4",
      ko: "세금 신고 기한 — 4월 15일",
      tl: "Tax Deadline — Abril 15",
    },
    content: {
      en: "The U.S. federal tax return deadline is April 15 each year. You can request a 6-month extension (Form 4868), but any taxes owed are still due by April 15. If you arrived after October 15, you have more time. For your first tax year, consider visiting a free VITA site.",
      es: "La fecha límite federal para presentar impuestos es el 15 de abril de cada año. Puedes solicitar una extensión de 6 meses (Formulario 4868), pero los impuestos adeudados aún deben pagarse el 15 de abril.",
      zh: "美国联邦税务申报截止日期为每年4月15日。您可以申请6个月延期（表格4868），但欠款仍需在4月15日前支付。",
      hi: "अमेरिका में संघीय टैक्स रिटर्न की डेडलाइन हर साल 15 अप्रैल है। आप 6 महीने का विस्तार मांग सकते हैं (फॉर्म 4868)।",
      ar: "الموعد النهائي لتقديم الإقرار الضريبي الفيدرالي هو 15 أبريل من كل عام. يمكنك طلب تمديد 6 أشهر (النموذج 4868).",
      fr: "La date limite de déclaration de revenus fédérale est le 15 avril de chaque année. Vous pouvez demander une prorogation de 6 mois (formulaire 4868).",
      pt: "O prazo federal para declaração de imposto de renda é 15 de abril de cada ano. Você pode solicitar uma prorrogação de 6 meses (Formulário 4868).",
      vi: "Hạn chót khai thuế liên bang là ngày 15 tháng 4 hàng năm. Bạn có thể yêu cầu gia hạn 6 tháng (Mẫu 4868).",
      ko: "미국 연방 세금 신고 기한은 매년 4월 15일입니다. 6개월 연장을 요청할 수 있습니다(양식 4868).",
      tl: "Ang deadline ng federal tax return ay Abril 15 bawat taon. Maaari kang humiling ng 6-buwang extension (Form 4868).",
    },
  },
  {
    key: "vita",
    icon: "🆓",
    title: {
      en: "Free Tax Help — VITA Program",
      es: "Ayuda Gratuita — Programa VITA",
      zh: "免费税务帮助 — VITA计划",
      hi: "मुफ़्त टैक्स मदद — VITA कार्यक्रम",
      ar: "مساعدة ضريبية مجانية — برنامج VITA",
      fr: "Aide fiscale gratuite — Programme VITA",
      pt: "Ajuda fiscal gratuita — Programa VITA",
      vi: "Hỗ trợ thuế miễn phí — Chương trình VITA",
      ko: "무료 세금 도움 — VITA 프로그램",
      tl: "Libreng Tulong sa Buwis — Programa ng VITA",
    },
    content: {
      en: "The IRS's Volunteer Income Tax Assistance (VITA) program offers FREE tax preparation for people who generally make $67,000 or less. Multilingual assistance is available at many sites. Volunteers are IRS-certified. No appointment needed at many locations — just walk in.",
      es: "El programa VITA del IRS ofrece preparación de impuestos GRATUITA para personas que generalmente ganan $67,000 o menos. Asistencia multilingüe disponible.",
      zh: "IRS的VITA计划为收入一般不超过$67,000的人提供免费报税服务。许多地点提供多语言协助。",
      hi: "IRS का VITA कार्यक्रम उन लोगों के लिए मुफ़्त टैक्स तैयारी प्रदान करता है जो आम तौर पर $67,000 या उससे कम कमाते हैं।",
      ar: "يقدم برنامج VITA التابع لمصلحة الضرائب إعداداً ضريبياً مجانياً للأشخاص الذين يكسبون عموماً 67,000 دولار أو أقل.",
      fr: "Le programme VITA de l'IRS offre une préparation fiscale GRATUITE pour les personnes gagnant généralement 67 000 $ ou moins.",
      pt: "O programa VITA do IRS oferece preparação de impostos GRATUITA para pessoas que geralmente ganham $67.000 ou menos.",
      vi: "Chương trình VITA của IRS cung cấp dịch vụ khai thuế MIỄN PHÍ cho người có thu nhập thường từ $67.000 trở xuống.",
      ko: "IRS의 VITA 프로그램은 일반적으로 $67,000 이하를 버는 사람들에게 무료 세금 신고 서비스를 제공합니다.",
      tl: "Ang VITA program ng IRS ay nag-aalok ng LIBRENG paghahanda ng buwis para sa mga taong kumikita ng $67,000 o mas mababa.",
    },
    link: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers",
    linkLabel: { en: "Find a VITA location near you", es: "Encuentra un lugar VITA cerca de ti", zh: "查找附近的VITA地点", hi: "अपने पास VITA स्थान खोजें", ar: "ابحث عن موقع VITA بالقرب منك", fr: "Trouvez un site VITA près de chez vous", pt: "Encontre um local VITA perto de você", vi: "Tìm địa điểm VITA gần bạn", ko: "가까운 VITA 위치 찾기", tl: "Hanapin ang isang VITA location malapit sa iyo" },
    important: true,
  },
  {
    key: "eitc",
    icon: "💰",
    title: {
      en: "Earned Income Tax Credit (EITC)",
      es: "Crédito Tributario por Ingreso del Trabajo (EITC)",
      zh: "劳动所得税减免 (EITC)",
      hi: "अर्जित आय कर क्रेडिट (EITC)",
      ar: "ائتمان ضريبة الدخل المكتسب (EITC)",
      fr: "Crédit d'impôt sur le revenu gagné (EITC)",
      pt: "Crédito Tributário de Renda do Trabalho (EITC)",
      vi: "Tín thuế Thu nhập kiếm được (EITC)",
      ko: "근로 소득 세액 공제 (EITC)",
      tl: "Earned Income Tax Credit (EITC)",
    },
    content: {
      en: "The EITC can give you money back even if you owe no taxes. For a family with 3 or more children, it can be worth up to $7,830. To qualify, you must have a Social Security Number and U.S. earned income. Many working immigrant families qualify.",
      es: "El EITC puede devolverte dinero incluso si no debes impuestos. Para una familia con 3 o más hijos, puede valer hasta $7,830. Para calificar, debes tener un SSN.",
      zh: "即使您不欠税，EITC也可以退还您金钱。对于有3个或以上子女的家庭，最高可达$7,830。",
      hi: "EITC आपको पैसे वापस दे सकता है भले ही आप कोई टैक्स नहीं देते। 3 या अधिक बच्चों वाले परिवार के लिए, यह $7,830 तक हो सकता है।",
      ar: "يمكن أن يمنحك EITC أموالاً حتى لو لم تكن مديناً بأي ضرائب. بالنسبة لعائلة مع 3 أطفال أو أكثر، يمكن أن تصل قيمته إلى 7,830 دولار.",
      fr: "L'EITC peut vous rembourser de l'argent même si vous ne devez pas d'impôts. Pour une famille avec 3 enfants ou plus, cela peut valoir jusqu'à 7 830 $.",
      pt: "O EITC pode devolver dinheiro para você mesmo que não deva impostos. Para uma família com 3 ou mais filhos, pode valer até $7.830.",
      vi: "EITC có thể hoàn tiền cho bạn ngay cả khi bạn không nợ thuế. Đối với gia đình có 3 con trở lên, có thể lên đến $7.830.",
      ko: "EITC는 세금을 내지 않아도 돈을 돌려받을 수 있습니다. 자녀 3명 이상인 가족의 경우 최대 $7,830까지 받을 수 있습니다.",
      tl: "Ang EITC ay maaaring magbigay ng pera pabalik sa iyo kahit hindi ka nagkakautang ng buwis. Para sa pamilyang may 3 o higit pang anak, maaari itong umabot sa $7,830.",
    },
    link: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit",
    linkLabel: { en: "Check EITC eligibility", es: "Verificar elegibilidad EITC", zh: "检查EITC资格", hi: "EITC पात्रता जांचें", ar: "تحقق من أهلية EITC", fr: "Vérifier l'éligibilité EITC", pt: "Verificar elegibilidade EITC", vi: "Kiểm tra điều kiện EITC", ko: "EITC 자격 확인", tl: "Suriin ang EITC eligibility" },
    important: true,
  },
  {
    key: "ctc",
    icon: "👶",
    title: {
      en: "Child Tax Credit",
      es: "Crédito Tributario por Hijos",
      zh: "子女税收抵免",
      hi: "बाल कर क्रेडिट",
      ar: "ائتمان ضريبة الأطفال",
      fr: "Crédit d'impôt pour enfants",
      pt: "Crédito Tributário por Filho",
      vi: "Tín thuế Trẻ em",
      ko: "자녀 세액 공제",
      tl: "Child Tax Credit",
    },
    content: {
      en: "If you have children under 17 with Social Security Numbers, you may qualify for the Child Tax Credit — up to $2,000 per child. The Additional Child Tax Credit may also give you a refund. This is one of the most valuable tax benefits for immigrant families with U.S.-born children.",
      es: "Si tienes hijos menores de 17 años con SSN, puedes calificar para el Crédito Tributario por Hijos — hasta $2,000 por hijo.",
      zh: "如果您有持有社会安全号码的17岁以下子女，您可能有资格获得子女税收抵免 — 每个孩子最高$2,000。",
      hi: "अगर आपके 17 साल से कम उम्र के बच्चे हैं जिनके पास सामाजिक सुरक्षा नंबर हैं, तो आप बाल कर क्रेडिट के लिए अर्हता प्राप्त कर सकते हैं — प्रति बच्चे $2,000 तक।",
      ar: "إذا كان لديك أطفال دون 17 عاماً برقم ضمان اجتماعي، فقد تكون مؤهلاً للحصول على ائتمان ضريبة الأطفال — ما يصل إلى 2,000 دولار لكل طفل.",
      fr: "Si vous avez des enfants de moins de 17 ans avec des SSN, vous pouvez être éligible au crédit d'impôt pour enfants — jusqu'à 2 000 $ par enfant.",
      pt: "Se você tem filhos menores de 17 anos com SSN, pode se qualificar para o Crédito Tributário por Filho — até $2.000 por filho.",
      vi: "Nếu bạn có con dưới 17 tuổi có SSN, bạn có thể đủ điều kiện nhận Tín thuế Trẻ em — lên đến $2.000 mỗi trẻ.",
      ko: "SSN이 있는 17세 미만 자녀가 있다면 자녀 세액 공제(최대 자녀 1인당 $2,000)를 받을 수 있습니다.",
      tl: "Kung mayroon kang mga batang wala pang 17 taong gulang na may SSN, maaari kang maging kwalipikado para sa Child Tax Credit — hanggang $2,000 bawat bata.",
    },
    link: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
    linkLabel: { en: "Learn about Child Tax Credit", es: "Conoce el Crédito por Hijos", zh: "了解子女税收抵免", hi: "बाल कर क्रेडिट के बारे में जानें", ar: "تعرف على ائتمان ضريبة الأطفال", fr: "En savoir plus sur le crédit pour enfants", pt: "Saiba sobre o Crédito por Filho", vi: "Tìm hiểu về Tín thuế Trẻ em", ko: "자녀 세액 공제에 대해 알아보기", tl: "Matuto tungkol sa Child Tax Credit" },
  },
  {
    key: "itin_tax",
    icon: "🔢",
    title: {
      en: "Filing Without an SSN — ITIN",
      es: "Declarar Sin SSN — ITIN",
      zh: "无SSN申报 — ITIN",
      hi: "SSN के बिना फाइल करना — ITIN",
      ar: "تقديم الضرائب بدون SSN — ITIN",
      fr: "Déclarer sans SSN — ITIN",
      pt: "Declarar sem SSN — ITIN",
      vi: "Khai thuế không có SSN — ITIN",
      ko: "SSN 없이 신고 — ITIN",
      tl: "Pag-file nang walang SSN — ITIN",
    },
    content: {
      en: "If you don't have an SSN, you can apply for an Individual Taxpayer Identification Number (ITIN) using IRS Form W-7. VITA sites can help you apply for an ITIN and prepare your tax return at the same time. Having an ITIN also allows you to open certain bank accounts.",
      es: "Si no tienes SSN, puedes solicitar un ITIN usando el Formulario W-7 del IRS. Los sitios VITA pueden ayudarte a solicitar un ITIN y preparar tu declaración al mismo tiempo.",
      zh: "如果您没有SSN，您可以使用IRS W-7表格申请个人纳税人识别号(ITIN)。VITA站点可以帮助您同时申请ITIN并准备税务申报表。",
      hi: "अगर आपके पास SSN नहीं है, तो आप IRS Form W-7 का उपयोग करके ITIN के लिए आवेदन कर सकते हैं। VITA साइटें आपको एक साथ ITIN के लिए आवेदन करने और टैक्स रिटर्न तैयार करने में मदद कर सकती हैं।",
      ar: "إذا لم يكن لديك SSN، يمكنك التقدم للحصول على ITIN باستخدام نموذج IRS W-7. يمكن لمواقع VITA مساعدتك في التقدم للحصول على ITIN وإعداد إقرارك الضريبي في نفس الوقت.",
      fr: "Si vous n'avez pas de SSN, vous pouvez demander un ITIN en utilisant le formulaire IRS W-7. Les sites VITA peuvent vous aider à demander un ITIN et à préparer votre déclaration en même temps.",
      pt: "Se não tiver SSN, pode solicitar um ITIN usando o Formulário W-7 do IRS. Sites VITA podem ajudá-lo a solicitar um ITIN e preparar sua declaração ao mesmo tempo.",
      vi: "Nếu không có SSN, bạn có thể nộp đơn xin ITIN bằng Mẫu W-7 của IRS. Các trang VITA có thể giúp bạn xin ITIN và chuẩn bị khai thuế cùng lúc.",
      ko: "SSN이 없다면 IRS Form W-7을 사용하여 ITIN을 신청할 수 있습니다. VITA 사이트에서 ITIN 신청과 세금 신고서 작성을 동시에 도움받을 수 있습니다.",
      tl: "Kung wala kang SSN, maaari kang mag-apply para sa ITIN gamit ang IRS Form W-7. Ang mga VITA site ay maaaring tumulong sa iyo na mag-apply para sa ITIN at ihanda ang iyong tax return nang sabay.",
    },
    link: "https://www.irs.gov/individuals/individual-taxpayer-identification-number",
    linkLabel: { en: "Apply for ITIN", es: "Solicitar ITIN", zh: "申请ITIN", hi: "ITIN के लिए आवेदन करें", ar: "التقدم للحصول على ITIN", fr: "Demander un ITIN", pt: "Solicitar ITIN", vi: "Đăng ký ITIN", ko: "ITIN 신청", tl: "Mag-apply para sa ITIN" },
  },
  {
    key: "resources",
    icon: "🔗",
    title: {
      en: "Helpful Resources",
      es: "Recursos Útiles",
      zh: "有用的资源",
      hi: "उपयोगी संसाधन",
      ar: "موارد مفيدة",
      fr: "Ressources utiles",
      pt: "Recursos úteis",
      vi: "Tài nguyên hữu ích",
      ko: "유용한 리소스",
      tl: "Mga Kapaki-pakinabang na Mapagkukunan",
    },
    content: {
      en: "• IRS Free File (irs.gov/freefile): Free tax software if income under $79,000\n• MilTax: Free for military families\n• AARP Tax-Aide: Free for ages 50+\n• IRS Tools: Tax Withholding Estimator, Where's My Refund?\n• Taxpayer Advocate Service: irs.gov/advocate (if you have IRS problems)",
      es: "• IRS Free File (irs.gov/freefile): Software gratuito si ingresos menores a $79,000\n• AARP Tax-Aide: Gratis para mayores de 50 años\n• Servicio del Defensor del Contribuyente: irs.gov/advocate",
      zh: "• IRS免费报税 (irs.gov/freefile): 收入低于$79,000的免费税务软件\n• AARP Tax-Aide: 50岁以上免费\n• 纳税人权益保护服务: irs.gov/advocate",
      hi: "• IRS Free File (irs.gov/freefile): $79,000 से कम आय के लिए मुफ़्त टैक्स सॉफ़्टवेयर\n• AARP Tax-Aide: 50+ आयु के लिए मुफ़्त\n• करदाता अधिवक्ता सेवा: irs.gov/advocate",
      ar: "• IRS Free File (irs.gov/freefile): برنامج ضرائب مجاني للدخل أقل من 79,000 دولار\n• AARP Tax-Aide: مجاني للأعمار 50+\n• خدمة المناصرة لدافعي الضرائب: irs.gov/advocate",
      fr: "• IRS Free File (irs.gov/freefile): Logiciel fiscal gratuit si revenu inférieur à 79 000 $\n• AARP Tax-Aide: Gratuit pour les 50 ans et plus\n• Service de défense des contribuables: irs.gov/advocate",
      pt: "• IRS Free File (irs.gov/freefile): Software fiscal gratuito se renda abaixo de $79.000\n• AARP Tax-Aide: Gratuito para maiores de 50 anos\n• Serviço de Defesa do Contribuinte: irs.gov/advocate",
      vi: "• IRS Free File (irs.gov/freefile): Phần mềm thuế miễn phí nếu thu nhập dưới $79,000\n• AARP Tax-Aide: Miễn phí cho người từ 50 tuổi trở lên\n• Dịch vụ Người ủng hộ Người nộp thuế: irs.gov/advocate",
      ko: "• IRS Free File (irs.gov/freefile): 소득 $79,000 미만 무료 세금 소프트웨어\n• AARP Tax-Aide: 50세 이상 무료\n• 납세자 권익 보호 서비스: irs.gov/advocate",
      tl: "• IRS Free File (irs.gov/freefile): Libreng tax software kung kita ay wala pang $79,000\n• AARP Tax-Aide: Libre para sa edad 50+\n• Taxpayer Advocate Service: irs.gov/advocate",
    },
  },
];

export default function TaxPage() {
  const { user, language } = useApp();
  const [, navigate] = useLocation();
  const [expandedKey, setExpandedKey] = useState<string | null>("vita");
  const lang = language;

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const currentYear = new Date().getFullYear();
  const taxDeadline = `April 15, ${currentYear + (new Date().getMonth() >= 4 ? 1 : 0)}`;
  const daysUntilDeadline = () => {
    const deadline = new Date(`April 15, ${currentYear + (new Date().getMonth() >= 4 ? 1 : 0)}`);
    return Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppNav />
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold">{t(lang, "taxTitle")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t(lang, "taxSub")}</p>
          <VoiceButton text={`${t(lang, "taxTitle")}. ${t(lang, "taxSub")}`} lang={lang} className="mt-1" />
        </div>

        {/* Tax deadline reminder */}
        <div className={`rounded-2xl p-4 mb-5 border ${daysUntilDeadline() <= 30 ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" : "bg-card border-border"}`}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{t(lang, "taxDeadline")}: {taxDeadline}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {daysUntilDeadline() > 0
                  ? `${daysUntilDeadline()} days away`
                  : "Deadline has passed — file an extension if needed"}
              </p>
              <VoiceButton text={`Tax deadline is ${taxDeadline}, which is ${daysUntilDeadline()} days away.`} lang={lang} className="mt-1" />
            </div>
            {daysUntilDeadline() <= 30 && daysUntilDeadline() > 0 && (
              <span className="flex-shrink-0 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-2 py-0.5 font-medium">
                Soon!
              </span>
            )}
          </div>
        </div>

        {/* Key tax benefits cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: "💵", label: "EITC", sub: "Up to $7,830 refund" },
            { icon: "👶", label: "Child Tax Credit", sub: "Up to $2,000/child" },
            { icon: "🆓", label: "Free Filing", sub: "VITA — income < $67K" },
            { icon: "🔢", label: "ITIN Available", sub: "File without SSN" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-3 flex items-center gap-2.5">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-xs font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-5">
          <div className="flex gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              This information is educational. Tax situations vary. For your specific case, visit a free VITA site or consult a tax professional. NewRoots does not provide tax advice.
            </p>
          </div>
        </div>

        {/* Tax sections */}
        <div className="space-y-3">
          {TAX_SECTIONS.map(section => {
            const isExpanded = expandedKey === section.key;
            const title = section.title[lang] || section.title.en;
            const content = section.content[lang] || section.content.en;
            const linkLabel = section.linkLabel ? (section.linkLabel[lang] || section.linkLabel.en) : null;

            return (
              <div
                key={section.key}
                data-testid={`tax-section-${section.key}`}
                className={`bg-card border rounded-2xl overflow-hidden ${section.important ? "border-primary/30" : "border-border"}`}
              >
                <button
                  onClick={() => setExpandedKey(isExpanded ? null : section.key)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{title}</span>
                        {section.important && (
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-1.5 py-0.5">Key</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <VoiceButton text={title} lang={lang} />
                      <span className="text-muted-foreground text-xs">{isExpanded ? "▲" : "▼"}</span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</div>
                    <VoiceButton text={content} lang={lang} />
                    {section.link && linkLabel && (
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {linkLabel} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Find VITA near you */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 text-center">
          <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">{t(lang, "taxFreeHelp")}</h3>
          <p className="text-xs text-muted-foreground mb-3">Free tax preparation in your language at community locations near you.</p>
          <a
            href="https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-green-500 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30">
              <ExternalLink className="w-4 h-4 mr-2" />
              Find Free Tax Help Near Me
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}
