export interface MilestoneItem {
  key: string;
  title: string;
  description: string;
  urgency: "urgent" | "recommended" | "optional";
  week: number; // target week (1-13 = 90 days)
  category: "identity" | "health" | "financial" | "employment" | "housing" | "family";
  officialLink?: string;
  requiredDocs?: string[];
  tips?: string[];
  translations: Record<string, { title: string; description: string; tips?: string[] }>;
}

export const MILESTONES: MilestoneItem[] = [
  {
    key: "sim_card",
    title: "Get a Phone / SIM Card",
    description: "A local phone number is essential for everything — job applications, appointments, and emergencies.",
    urgency: "urgent",
    week: 1,
    category: "identity",
    tips: ["Walmart, T-Mobile, and AT&T have prepaid plans starting at $25/month", "You can get a SIM card without ID at many stores"],
    translations: {
      es: { title: "Obtener un Teléfono / SIM", description: "Un número de teléfono local es esencial para todo.", tips: ["Walmart, T-Mobile y AT&T tienen planes prepagados desde $25/mes"] },
      zh: { title: "获取手机/SIM卡", description: "本地电话号码对于一切都是必不可少的。", tips: ["沃尔玛、T-Mobile和AT&T有起价$25/月的预付费套餐"] },
      hi: { title: "फ़ोन / SIM कार्ड प्राप्त करें", description: "स्थानीय फ़ोन नंबर हर चीज़ के लिए ज़रूरी है।", tips: ["Walmart, T-Mobile और AT&T पर $25/माह से प्रीपेड प्लान उपलब्ध हैं"] },
      ar: { title: "احصل على هاتف / شريحة SIM", description: "رقم الهاتف المحلي ضروري لكل شيء.", tips: ["تبدأ خطط الدفع المسبق من 25 دولار شهريًا في Walmart وT-Mobile وAT&T"] },
    },
  },
  {
    key: "address",
    title: "Establish a Mailing Address",
    description: "You need a U.S. address to receive mail from government agencies, employers, and banks.",
    urgency: "urgent",
    week: 1,
    category: "housing",
    tips: ["Shelter address works", "Some nonprofits offer mail services for newcomers"],
    translations: {
      es: { title: "Establecer una Dirección Postal", description: "Necesitas una dirección en EE.UU. para recibir correo de agencias gubernamentales." },
      zh: { title: "确立邮寄地址", description: "您需要美国地址来接收政府机构、雇主和银行的邮件。" },
      hi: { title: "डाक पता स्थापित करें", description: "सरकारी एजेंसियों, नियोक्ताओं और बैंकों से मेल प्राप्त करने के लिए आपको अमेरिकी पता चाहिए।" },
      ar: { title: "إنشاء عنوان بريدي", description: "تحتاج إلى عنوان أمريكي لاستلام البريد من الجهات الحكومية وأصحاب العمل والبنوك." },
    },
  },
  {
    key: "i94",
    title: "Download Your I-94 Record",
    description: "The I-94 is your official U.S. arrival/departure record. Download it free from CBP's website.",
    urgency: "urgent",
    week: 1,
    category: "identity",
    officialLink: "https://i94.cbp.dhs.gov",
    requiredDocs: ["Passport"],
    tips: ["It's free at i94.cbp.dhs.gov", "You'll need it for SSN, benefits, and employment verification"],
    translations: {
      es: { title: "Descarga tu Registro I-94", description: "El I-94 es tu registro oficial de llegada/salida de EE.UU.", tips: ["Es gratis en i94.cbp.dhs.gov"] },
      zh: { title: "下载您的I-94记录", description: "I-94是您在美国的官方入境/出境记录。", tips: ["在i94.cbp.dhs.gov免费下载"] },
      hi: { title: "अपना I-94 रिकॉर्ड डाउनलोड करें", description: "I-94 आपका आधिकारिक अमेरिका आगमन/प्रस्थान रिकॉर्ड है।", tips: ["i94.cbp.dhs.gov पर मुफ़्त"] },
      ar: { title: "تنزيل سجل I-94", description: "I-94 هو سجل وصولك/مغادرتك الرسمي من الولايات المتحدة.", tips: ["مجاني على i94.cbp.dhs.gov"] },
    },
  },
  {
    key: "ssn",
    title: "Apply for Social Security Number (SSN)",
    description: "An SSN is needed for work, taxes, and many benefits. Apply at your local Social Security office.",
    urgency: "urgent",
    week: 2,
    category: "identity",
    officialLink: "https://www.ssa.gov/number-card/request-number-first-time",
    requiredDocs: ["Passport", "Visa", "I-94"],
    tips: ["Wait at least 10 days after arrival before applying", "Find your local SSA office at ssa.gov/locator", "It's free — never pay anyone to help you apply"],
    translations: {
      es: { title: "Solicitar Número de Seguro Social (SSN)", description: "Un SSN es necesario para trabajar, pagar impuestos y muchos beneficios.", tips: ["Espera al menos 10 días después de llegada", "Encuentra tu oficina SSA local en ssa.gov/locator", "Es gratis — nunca pagues a alguien"] },
      zh: { title: "申请社会安全号码 (SSN)", description: "SSN是工作、纳税和许多福利所必需的。", tips: ["到达后至少等待10天再申请", "在ssa.gov/locator找到当地SSA办事处", "免费 — 不要付钱给任何人帮你申请"] },
      hi: { title: "सामाजिक सुरक्षा संख्या (SSN) के लिए आवेदन करें", description: "काम, कर और कई लाभों के लिए SSN की ज़रूरत है।", tips: ["आवेदन करने से पहले कम से कम 10 दिन प्रतीक्षा करें", "ssa.gov/locator पर अपना स्थानीय SSA कार्यालय खोजें"] },
      ar: { title: "التقدم للحصول على رقم الضمان الاجتماعي", description: "رقم الضمان الاجتماعي مطلوب للعمل والضرائب والعديد من المزايا.", tips: ["انتظر 10 أيام على الأقل بعد الوصول قبل التقديم", "ابحث عن مكتب SSA المحلي على ssa.gov/locator"] },
    },
  },
  {
    key: "bank_account",
    title: "Open a Bank Account",
    description: "You don't need an SSN to open a bank or credit union account. Bring your passport and proof of address.",
    urgency: "urgent",
    week: 2,
    category: "financial",
    officialLink: "https://www.consumerfinance.gov/consumer-tools/bank-accounts/",
    requiredDocs: ["Passport", "Proof of address"],
    tips: ["Banks like Chase, Bank of America, Wells Fargo accept passport + ITIN", "Credit unions often have lower fees", "Look for accounts with no minimum balance", "CFPB: you do NOT need an SSN to open an account"],
    translations: {
      es: { title: "Abrir una Cuenta Bancaria", description: "No necesitas SSN para abrir una cuenta bancaria. Trae tu pasaporte y comprobante de dirección.", tips: ["Busca cuentas sin saldo mínimo", "CFPB dice que NO necesitas SSN para abrir una cuenta"] },
      zh: { title: "开设银行账户", description: "开设银行账户不需要SSN。带上护照和地址证明。", tips: ["寻找无最低余额要求的账户", "CFPB说开户不需要SSN"] },
      hi: { title: "बैंक खाता खोलें", description: "बैंक खाता खोलने के लिए SSN की ज़रूरत नहीं है। अपना पासपोर्ट और पते का प्रमाण लाएं।", tips: ["न्यूनतम शेष राशि के बिना खाते देखें", "CFPB: खाता खोलने के लिए SSN की ज़रूरत नहीं"] },
      ar: { title: "فتح حساب مصرفي", description: "لا تحتاج إلى SSN لفتح حساب مصرفي. أحضر جواز سفرك وإثبات العنوان.", tips: ["ابحث عن حسابات بدون حد أدنى للرصيد", "CFPB: لا تحتاج إلى SSN لفتح حساب"] },
    },
  },
  {
    key: "health_insurance",
    title: "Get Health Insurance",
    description: "Lawfully present immigrants may qualify for Marketplace coverage. Recently arrived families may have a Special Enrollment Period.",
    urgency: "urgent",
    week: 2,
    category: "health",
    officialLink: "https://www.healthcare.gov/immigrants/",
    requiredDocs: ["Immigration documents", "I-94"],
    tips: ["Visit healthcare.gov/immigrants for options", "You may qualify for savings (subsidies)", "Moving to US = Special Enrollment Period", "Free navigators available — healthcaregov/find-assistance"],
    translations: {
      es: { title: "Obtener Seguro Médico", description: "Los inmigrantes presentes legalmente pueden calificar para cobertura del Marketplace.", tips: ["Visita healthcare.gov/immigrants para opciones", "Puedes calificar para ahorros (subsidios)"] },
      zh: { title: "获取医疗保险", description: "合法在美的移民可能有资格获得市场保险。", tips: ["访问healthcare.gov/immigrants了解选项", "您可能有资格获得补贴"] },
      hi: { title: "स्वास्थ्य बीमा प्राप्त करें", description: "कानूनी रूप से उपस्थित आप्रवासी मार्केटप्लेस कवरेज के लिए अर्हता प्राप्त कर सकते हैं।", tips: ["healthcare.gov/immigrants पर विकल्प देखें", "आप सब्सिडी के लिए अर्हता प्राप्त कर सकते हैं"] },
      ar: { title: "الحصول على التأمين الصحي", description: "قد يكون المهاجرون الحاضرون بشكل قانوني مؤهلين للتغطية التأمينية.", tips: ["قم بزيارة healthcare.gov/immigrants للاطلاع على الخيارات", "قد تكون مؤهلاً للحصول على إعانات"] },
    },
  },
  {
    key: "snap",
    title: "Apply for SNAP (Food Assistance)",
    description: "SNAP provides money on a card to buy groceries. Many immigrant families may qualify depending on status and income.",
    urgency: "recommended",
    week: 3,
    category: "financial",
    officialLink: "https://www.benefits.gov/benefit/361",
    tips: ["Apply at your local SNAP office or online through your state's website", "Benefits are loaded monthly to an EBT card", "Check benefits.gov for eligibility"],
    translations: {
      es: { title: "Solicitar SNAP (Asistencia de Alimentos)", description: "SNAP proporciona dinero en una tarjeta para comprar alimentos.", tips: ["Solicita en tu oficina local de SNAP o en línea"] },
      zh: { title: "申请SNAP（食品援助）", description: "SNAP在卡上提供购买杂货的资金。", tips: ["在当地SNAP办公室或网上申请"] },
      hi: { title: "SNAP (खाद्य सहायता) के लिए आवेदन करें", description: "SNAP किराने का सामान खरीदने के लिए कार्ड पर पैसे प्रदान करता है।", tips: ["अपने स्थानीय SNAP कार्यालय में या ऑनलाइन आवेदन करें"] },
      ar: { title: "التقدم للحصول على SNAP (مساعدة الغذاء)", description: "يوفر SNAP أموالاً على بطاقة لشراء البقالة.", tips: ["تقدم في مكتب SNAP المحلي أو عبر الإنترنت"] },
    },
  },
  {
    key: "school_enrollment",
    title: "Enroll Children in School",
    description: "All children in the U.S. have the right to free public education, regardless of immigration status.",
    urgency: "urgent",
    week: 2,
    category: "family",
    officialLink: "https://www.ed.gov/policy/rights/guid/unaccompanied-children/index.html",
    requiredDocs: ["Proof of address", "Immunization records (can be obtained after enrollment)"],
    tips: ["Schools cannot ask about immigration status", "Contact your local school district office", "Language assistance must be provided"],
    translations: {
      es: { title: "Inscribir a los Niños en la Escuela", description: "Todos los niños en EE.UU. tienen derecho a educación pública gratuita.", tips: ["Las escuelas no pueden preguntar sobre estatus migratorio"] },
      zh: { title: "为孩子办理入学", description: "美国所有儿童都有权接受免费公共教育，不论移民身份。", tips: ["学校不能询问移民身份"] },
      hi: { title: "बच्चों को स्कूल में दाखिल कराएं", description: "अमेरिका में सभी बच्चों को आव्रजन स्थिति के बावजूद मुफ़्त सार्वजनिक शिक्षा का अधिकार है।", tips: ["स्कूल आव्रजन स्थिति नहीं पूछ सकते"] },
      ar: { title: "تسجيل الأطفال في المدرسة", description: "جميع الأطفال في الولايات المتحدة لهم الحق في التعليم العام المجاني.", tips: ["لا يحق للمدارس السؤال عن وضع الهجرة"] },
    },
  },
  {
    key: "drivers_license",
    title: "Get a State ID or Driver's License",
    description: "Most states allow immigrants to get a state ID or driver's license. It's the most accepted form of local ID.",
    urgency: "recommended",
    week: 4,
    category: "identity",
    officialLink: "https://www.usa.gov/state-motor-vehicle-services",
    requiredDocs: ["Passport", "I-94", "Proof of address", "SSN (if available)"],
    tips: ["DACA recipients may be eligible in all states", "Contact your local DMV for required documents"],
    translations: {
      es: { title: "Obtener ID Estatal o Licencia de Conducir", description: "La mayoría de los estados permiten a los inmigrantes obtener una ID estatal.", tips: ["Contacta tu DMV local para documentos requeridos"] },
      zh: { title: "获取州ID或驾驶执照", description: "大多数州允许移民获得州ID或驾驶执照。", tips: ["联系当地DMV了解所需文件"] },
      hi: { title: "राज्य ID या ड्राइवर लाइसेंस प्राप्त करें", description: "अधिकांश राज्य आप्रवासियों को राज्य ID या ड्राइवर लाइसेंस प्राप्त करने की अनुमति देते हैं।", tips: ["आवश्यक दस्तावेजों के लिए अपने स्थानीय DMV से संपर्क करें"] },
      ar: { title: "الحصول على بطاقة هوية الولاية أو رخصة القيادة", description: "تسمح معظم الولايات للمهاجرين بالحصول على بطاقة هوية الولاية.", tips: ["تواصل مع مكتب DMV المحلي للاطلاع على الوثائق المطلوبة"] },
    },
  },
  {
    key: "itin",
    title: "Apply for ITIN (if no SSN)",
    description: "An Individual Taxpayer Identification Number (ITIN) lets you file taxes and open bank accounts even without an SSN.",
    urgency: "recommended",
    week: 4,
    category: "financial",
    officialLink: "https://www.irs.gov/individuals/individual-taxpayer-identification-number",
    tips: ["Free to apply with IRS Form W-7", "Tax filing centers (VITA) can help you apply", "Needed for: bank accounts, taxes, some benefits"],
    translations: {
      es: { title: "Solicitar ITIN (si no tienes SSN)", description: "Un ITIN te permite presentar impuestos y abrir cuentas bancarias sin SSN.", tips: ["Gratis con el formulario IRS W-7", "Los centros VITA pueden ayudarte a solicitar"] },
      zh: { title: "申请ITIN（如果没有SSN）", description: "个人纳税人识别号(ITIN)让您在没有SSN的情况下申报税款和开立银行账户。", tips: ["使用IRS W-7表格免费申请", "VITA税务中心可以帮助您申请"] },
      hi: { title: "ITIN के लिए आवेदन करें (अगर SSN नहीं है)", description: "ITIN से आप SSN के बिना भी टैक्स फाइल कर सकते हैं और बैंक खाते खोल सकते हैं।", tips: ["IRS Form W-7 के साथ मुफ़्त", "VITA केंद्र आपको आवेदन में मदद कर सकते हैं"] },
      ar: { title: "التقدم للحصول على ITIN (إذا لم يكن لديك SSN)", description: "يسمح ITIN بتقديم الضرائب وفتح حسابات مصرفية حتى بدون SSN.", tips: ["مجاني مع نموذج IRS W-7", "يمكن لمراكز VITA مساعدتك في التقديم"] },
    },
  },
  {
    key: "vita_tax",
    title: "File Taxes (VITA Free Help)",
    description: "If you earned income in the U.S., you must file a federal tax return. VITA offers free help at locations near you.",
    urgency: "recommended",
    week: 10,
    category: "financial",
    officialLink: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers",
    tips: ["Tax deadline is April 15 each year", "VITA is free for income under $67,000", "Find locations at irs.gov/vita", "You may be eligible for Earned Income Tax Credit (EITC)"],
    translations: {
      es: { title: "Presentar Impuestos (Ayuda Gratuita VITA)", description: "Si ganaste ingresos en EE.UU., debes presentar una declaración de impuestos federal.", tips: ["La fecha límite es el 15 de abril", "VITA es gratis para ingresos menores a $67,000", "Puedes ser elegible para EITC"] },
      zh: { title: "申报税款（VITA免费帮助）", description: "如果您在美国有收入，必须提交联邦税务申报表。", tips: ["税务截止日期是每年4月15日", "VITA对收入低于$67,000免费", "您可能有资格获得EITC"] },
      hi: { title: "टैक्स फाइल करें (VITA मुफ़्त मदद)", description: "अगर आपने अमेरिका में आय अर्जित की है, तो आपको संघीय टैक्स रिटर्न दाखिल करना होगा।", tips: ["टैक्स डेडलाइन हर साल 15 अप्रैल है", "VITA $67,000 से कम आय के लिए मुफ़्त है", "आप EITC के लिए पात्र हो सकते हैं"] },
      ar: { title: "تقديم الضرائب (مساعدة VITA المجانية)", description: "إذا كسبت دخلاً في الولايات المتحدة، يجب عليك تقديم إقرار ضريبي فيدرالي.", tips: ["الموعد النهائي الضريبي هو 15 أبريل من كل عام", "VITA مجاني للدخل أقل من 67,000 دولار", "قد تكون مؤهلاً لـ EITC"] },
    },
  },
  {
    key: "wic",
    title: "WIC — Food for Women, Infants & Children",
    description: "WIC provides free food, formula, and nutrition support for pregnant women, new mothers, and children under 5.",
    urgency: "recommended",
    week: 3,
    category: "family",
    officialLink: "https://www.fns.usda.gov/wic",
    tips: ["Immigration status: lawfully present immigrants qualify", "Available regardless of SSN status", "Find local WIC clinic at wiclocator.fns.usda.gov"],
    translations: {
      es: { title: "WIC — Alimentos para Mujeres, Bebés y Niños", description: "WIC proporciona alimentos gratuitos y apoyo nutricional para madres embarazadas y niños menores de 5 años.", tips: ["Los inmigrantes legalmente presentes califican", "Disponible sin importar el estado del SSN"] },
      zh: { title: "WIC — 妇女、婴幼儿食品援助", description: "WIC为孕妇、新妈妈和5岁以下儿童提供免费食品和营养支持。", tips: ["合法在美移民有资格申请", "不受SSN状态影响"] },
      hi: { title: "WIC — महिलाओं, शिशुओं और बच्चों के लिए भोजन", description: "WIC गर्भवती महिलाओं और 5 साल से कम उम्र के बच्चों को मुफ़्त खाना प्रदान करता है।", tips: ["कानूनी रूप से उपस्थित आप्रवासी योग्य हैं", "SSN स्थिति की परवाह किए बिना उपलब्ध"] },
      ar: { title: "WIC — الغذاء للنساء والرضع والأطفال", description: "يوفر WIC غذاءً مجانياً ودعماً غذائياً للنساء الحوامل والأمهات الجدد والأطفال دون 5 سنوات.", tips: ["المهاجرون الحاضرون قانوناً مؤهلون", "متاح بغض النظر عن حالة SSN"] },
    },
  },
  {
    key: "medicaid",
    title: "Apply for Medicaid / CHIP",
    description: "Medicaid provides free or low-cost health insurance. CHIP covers children. Eligibility varies by state and immigration status.",
    urgency: "recommended",
    week: 3,
    category: "health",
    officialLink: "https://www.healthcare.gov/medicaid-chip/",
    tips: ["Many states cover pregnant women and children regardless of status", "Apply through your state's Medicaid office", "Emergency Medicaid is often available regardless of status"],
    translations: {
      es: { title: "Solicitar Medicaid / CHIP", description: "Medicaid ofrece seguro médico gratuito o de bajo costo. CHIP cubre a los niños.", tips: ["Muchos estados cubren a mujeres embarazadas y niños sin importar estatus"] },
      zh: { title: "申请Medicaid / CHIP", description: "Medicaid提供免费或低成本医疗保险。CHIP覆盖儿童。", tips: ["许多州不论移民身份都覆盖孕妇和儿童"] },
      hi: { title: "Medicaid / CHIP के लिए आवेदन करें", description: "Medicaid मुफ़्त या कम लागत का स्वास्थ्य बीमा प्रदान करता है। CHIP बच्चों को कवर करता है।", tips: ["कई राज्य स्थिति के बावजूद गर्भवती महिलाओं और बच्चों को कवर करते हैं"] },
      ar: { title: "التقدم للحصول على Medicaid / CHIP", description: "يوفر Medicaid تأميناً صحياً مجانياً أو منخفض التكلفة. CHIP يغطي الأطفال.", tips: ["تغطي كثير من الولايات النساء الحوامل والأطفال بغض النظر عن الوضع"] },
    },
  },
];

export function getMilestoneByKey(key: string): MilestoneItem | undefined {
  return MILESTONES.find(m => m.key === key);
}

export function getMilestoneTitle(m: MilestoneItem, lang: string): string {
  return m.translations[lang]?.title || m.title;
}

export function getMilestoneDescription(m: MilestoneItem, lang: string): string {
  return m.translations[lang]?.description || m.description;
}

export function getMilestoneTips(m: MilestoneItem, lang: string): string[] {
  return m.translations[lang]?.tips || m.tips || [];
}
