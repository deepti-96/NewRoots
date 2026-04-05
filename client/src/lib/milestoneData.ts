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
  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 1 — FIRST 72 HOURS (SURVIVAL)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    key: "sim_card",
    title: "Get a Phone / SIM Card",
    description: "A local phone number is essential for everything — job applications, appointments, and emergencies.",
    urgency: "urgent",
    week: 1,
    category: "identity",
    tips: ["Walmart, T-Mobile, and AT&T have prepaid plans starting at $25/month", "You can get a SIM card without ID at many stores", "Consider Mint Mobile or Tello for cheaper plans"],
    translations: {
      es: { title: "Obtener un Teléfono / SIM", description: "Un número de teléfono local es esencial para todo." },
      zh: { title: "获取手机/SIM卡", description: "本地电话号码对于一切都是必不可少的。" },
      hi: { title: "फ़ोन / SIM कार्ड प्राप्त करें", description: "स्थानीय फ़ोन नंबर हर चीज़ के लिए ज़रूरी है।" },
      ar: { title: "احصل على هاتف / شريحة SIM", description: "رقم الهاتف المحلي ضروري لكل شيء." },
    },
  },
  {
    key: "address",
    title: "Establish a Mailing Address",
    description: "You need a U.S. address to receive mail from government agencies, employers, and banks.",
    urgency: "urgent",
    week: 1,
    category: "housing",
    tips: ["Shelter address works", "Some nonprofits offer mail services for newcomers", "PO Boxes at USPS start at ~$30/6 months"],
    translations: {
      es: { title: "Establecer una Dirección Postal", description: "Necesitas una dirección en EE.UU. para recibir correo." },
      zh: { title: "确立邮寄地址", description: "您需要美国地址来接收政府机构的邮件。" },
      hi: { title: "डाक पता स्थापित करें", description: "मेल प्राप्त करने के लिए अमेरिकी पता चाहिए।" },
      ar: { title: "إنشاء عنوان بريدي", description: "تحتاج إلى عنوان أمريكي لاستلام البريد." },
    },
  },
  {
    key: "i94",
    title: "Download Your I-94 Record",
    description: "The I-94 is your official U.S. arrival/departure record. Download it free from CBP's website. You need this for almost everything.",
    urgency: "urgent",
    week: 1,
    category: "identity",
    officialLink: "https://i94.cbp.dhs.gov",
    requiredDocs: ["Passport"],
    tips: ["It's free at i94.cbp.dhs.gov", "You'll need it for SSN, benefits, employment, and driver's license", "Print multiple copies and keep them safe"],
    translations: {
      es: { title: "Descarga tu Registro I-94", description: "El I-94 es tu registro oficial de llegada/salida de EE.UU." },
      zh: { title: "下载您的I-94记录", description: "I-94是您在美国的官方入境/出境记录。" },
      hi: { title: "अपना I-94 रिकॉर्ड डाउनलोड करें", description: "I-94 आपका आधिकारिक अमेरिका आगमन/प्रस्थान रिकॉर्ड है।" },
      ar: { title: "تنزيل سجل I-94", description: "I-94 هو سجل وصولك/مغادرتك الرسمي." },
    },
  },
  {
    key: "local_orientation",
    title: "Attend Community Orientation",
    description: "Your resettlement agency will provide orientation on U.S. laws, culture, transportation, and how to navigate your neighborhood.",
    urgency: "urgent",
    week: 1,
    category: "family",
    tips: ["Ask your caseworker for the schedule", "Topics include: transportation, 911, tenant rights, and community resources", "Take notes — this information is critical"],
    translations: {
      es: { title: "Asistir a la Orientación Comunitaria", description: "Tu agencia te orientará sobre leyes, cultura y transporte en EE.UU." },
      zh: { title: "参加社区迎新会", description: "安置机构将介绍美国法律、文化、交通等信息。" },
      hi: { title: "सामुदायिक अभिविन्यास में भाग लें", description: "आपकी एजेंसी अमेरिकी कानूनों और संस्कृति के बारे में मार्गदर्शन देगी।" },
      ar: { title: "حضور التوجيه المجتمعي", description: "ستقدم وكالتك التوجيه حول القوانين والثقافة والنقل." },
    },
  },
  {
    key: "emergency_contacts",
    title: "Learn Emergency Numbers (911, 211, 988)",
    description: "Know how to call 911 for emergencies, 211 for social services, and 988 for mental health crisis support.",
    urgency: "urgent",
    week: 1,
    category: "family",
    tips: ["911 = police, fire, ambulance", "211 = find food, housing, jobs, and social services", "988 = mental health crisis line (available in many languages)", "Save these numbers in your phone immediately"],
    translations: {
      es: { title: "Aprender Números de Emergencia (911, 211, 988)", description: "911 para emergencias, 211 para servicios sociales, 988 para crisis de salud mental." },
      zh: { title: "学习紧急电话号码 (911, 211, 988)", description: "911报警、211社会服务、988心理健康危机热线。" },
      hi: { title: "आपातकालीन नंबर सीखें (911, 211, 988)", description: "911 आपातकाल, 211 सामाजिक सेवाएं, 988 मानसिक स्वास्थ्य।" },
      ar: { title: "تعلم أرقام الطوارئ (911، 211، 988)", description: "911 للطوارئ، 211 للخدمات الاجتماعية، 988 لدعم الأزمات النفسية." },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 2 — KEY PAPERWORK & IDENTITY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    key: "ssn",
    title: "Apply for Social Security Number (SSN)",
    description: "An SSN is needed for work, taxes, and many benefits. Apply at your local Social Security office.",
    urgency: "urgent",
    week: 2,
    category: "identity",
    officialLink: "https://www.ssa.gov/number-card/request-number-first-time",
    requiredDocs: ["Passport", "Visa", "I-94"],
    tips: ["Wait at least 10 days after arrival before applying", "Find your local SSA office at ssa.gov/locator", "It's free — never pay anyone to help you apply", "Processing takes 2-4 weeks"],
    translations: {
      es: { title: "Solicitar Número de Seguro Social (SSN)", description: "Un SSN es necesario para trabajar, pagar impuestos y muchos beneficios." },
      zh: { title: "申请社会安全号码 (SSN)", description: "SSN是工作、纳税和许多福利所必需的。" },
      hi: { title: "सामाजिक सुरक्षा संख्या (SSN) के लिए आवेदन करें", description: "काम, कर और कई लाभों के लिए SSN की ज़रूरत है।" },
      ar: { title: "التقدم للحصول على رقم الضمان الاجتماعي", description: "رقم الضمان الاجتماعي مطلوب للعمل والضرائب." },
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
    tips: ["CFPB confirms: you do NOT need an SSN to open an account", "Credit unions often have lower fees", "Look for accounts with no minimum balance", "Set up direct deposit as soon as you have income"],
    translations: {
      es: { title: "Abrir una Cuenta Bancaria", description: "No necesitas SSN para abrir una cuenta bancaria." },
      zh: { title: "开设银行账户", description: "开设银行账户不需要SSN。" },
      hi: { title: "बैंक खाता खोलें", description: "बैंक खाता खोलने के लिए SSN की ज़रूरत नहीं है।" },
      ar: { title: "فتح حساب مصرفي", description: "لا تحتاج إلى SSN لفتح حساب مصرفي." },
    },
  },
  {
    key: "health_screening",
    title: "Complete Initial Health Screening",
    description: "A domestic medical screening is required within the first 30 days of arrival. This includes a physical exam, blood tests, and immunizations.",
    urgency: "urgent",
    week: 2,
    category: "health",
    requiredDocs: ["I-94", "Immunization records from home country", "Any medical records"],
    tips: ["Local health departments usually conduct these for free", "Bring any medical records from your home country", "This is separate from getting health insurance"],
    translations: {
      es: { title: "Completar la Evaluación de Salud Inicial", description: "Se requiere un examen médico dentro de los primeros 30 días." },
      zh: { title: "完成初步健康筛查", description: "抵达后30天内须完成健康筛查。" },
      hi: { title: "प्रारंभिक स्वास्थ्य जांच पूरी करें", description: "आगमन के 30 दिनों के भीतर स्वास्थ्य जांच आवश्यक है।" },
      ar: { title: "إكمال الفحص الطبي الأولي", description: "الفحص الطبي مطلوب خلال 30 يومًا من الوصول." },
    },
  },
  {
    key: "health_insurance",
    title: "Enroll in Health Insurance",
    description: "Lawfully present immigrants may qualify for Marketplace coverage. Moving to the U.S. triggers a Special Enrollment Period.",
    urgency: "urgent",
    week: 2,
    category: "health",
    officialLink: "https://www.healthcare.gov/immigrants/",
    requiredDocs: ["Immigration documents", "I-94"],
    tips: ["Visit healthcare.gov/immigrants for options", "You may qualify for subsidies", "Moving to US = Special Enrollment Period (60 days)", "Free navigators at healthcare.gov/find-assistance"],
    translations: {
      es: { title: "Inscribirse en Seguro Médico", description: "Los inmigrantes pueden calificar para cobertura del Marketplace." },
      zh: { title: "注册医疗保险", description: "合法在美移民可能有资格获得市场保险。" },
      hi: { title: "स्वास्थ्य बीमा में नामांकन करें", description: "आप्रवासी मार्केटप्लेस कवरेज के लिए अर्हता प्राप्त कर सकते हैं।" },
      ar: { title: "التسجيل في التأمين الصحي", description: "قد يكون المهاجرون مؤهلين للتغطية التأمينية." },
    },
  },
  {
    key: "school_enrollment",
    title: "Enroll Children in School",
    description: "All children in the U.S. have the right to free public education, regardless of immigration status. Schools CANNOT ask about status.",
    urgency: "urgent",
    week: 2,
    category: "family",
    officialLink: "https://www.ed.gov/",
    requiredDocs: ["Proof of address", "Immunization records (can be obtained after enrollment)"],
    tips: ["Schools cannot ask about immigration status", "Contact your local school district office", "Language assistance must be provided by law", "Free school meals may be available (apply at school)"],
    translations: {
      es: { title: "Inscribir a los Niños en la Escuela", description: "Todos los niños tienen derecho a educación pública gratuita." },
      zh: { title: "为孩子办理入学", description: "所有儿童都有权接受免费公共教育。" },
      hi: { title: "बच्चों को स्कूल में दाखिल कराएं", description: "सभी बच्चों को मुफ़्त सार्वजनिक शिक्षा का अधिकार है।" },
      ar: { title: "تسجيل الأطفال في المدرسة", description: "جميع الأطفال لهم الحق في التعليم العام المجاني." },
    },
  },
  {
    key: "esl_classes",
    title: "Enroll in ESL / English Classes",
    description: "English as a Second Language classes are crucial for integration and employment. Many are free at libraries and community centers.",
    urgency: "recommended",
    week: 2,
    category: "employment",
    tips: ["Check your local public library for free classes", "Community colleges offer low-cost ESL", "Online: USALearns.org is free", "Many resettlement agencies offer their own ESL programs"],
    translations: {
      es: { title: "Inscribirse en Clases de Inglés (ESL)", description: "Las clases de inglés son cruciales para la integración y el empleo." },
      zh: { title: "报名参加ESL英语课程", description: "英语课程对融入社会和就业至关重要。" },
      hi: { title: "ESL/अंग्रेजी कक्षाओं में दाखिला लें", description: "अंग्रेजी कक्षाएं एकीकरण और रोजगार के लिए महत्वपूर्ण हैं।" },
      ar: { title: "التسجيل في فصول اللغة الإنجليزية", description: "فصول ESL ضرورية للاندماج والتوظيف." },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WEEK 3–4 — BENEFITS, FAMILY STABILITY & LEGAL COMPLIANCE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    key: "snap",
    title: "Apply for SNAP (Food Assistance)",
    description: "SNAP provides money on an EBT card to buy groceries. Many immigrant families qualify depending on status and income.",
    urgency: "recommended",
    week: 3,
    category: "financial",
    officialLink: "https://www.benefits.gov/benefit/361",
    tips: ["Apply at your local SNAP office or online", "Benefits are loaded monthly to an EBT card", "Refugees are eligible immediately", "Other statuses may have a 5-year waiting period — check with your caseworker"],
    translations: {
      es: { title: "Solicitar SNAP (Asistencia Alimentaria)", description: "SNAP proporciona dinero en una tarjeta EBT para comprar alimentos." },
      zh: { title: "申请SNAP（食品援助）", description: "SNAP在EBT卡上提供购买杂货的资金。" },
      hi: { title: "SNAP (खाद्य सहायता) के लिए आवेदन करें", description: "SNAP किराने का सामान खरीदने के लिए EBT कार्ड पर पैसे देता है।" },
      ar: { title: "التقدم للحصول على SNAP (مساعدة الغذاء)", description: "يوفر SNAP أموالاً على بطاقة EBT لشراء البقالة." },
    },
  },
  {
    key: "rca",
    title: "Apply for Refugee Cash Assistance (RCA)",
    description: "RCA provides monthly cash assistance to refugees who are not eligible for other federal programs. Available for first 8 months.",
    urgency: "recommended",
    week: 3,
    category: "financial",
    officialLink: "https://www.acf.hhs.gov/orr/programs/refugees/cma",
    tips: ["Available to refugees, asylees, and certain other statuses", "Lasts up to 8 months", "Apply through your local resettlement agency", "Can be combined with SNAP and Medicaid"],
    translations: {
      es: { title: "Solicitar Asistencia en Efectivo para Refugiados (RCA)", description: "RCA proporciona asistencia mensual en efectivo a refugiados." },
      zh: { title: "申请难民现金援助 (RCA)", description: "RCA为难民提供每月现金援助，可用8个月。" },
      hi: { title: "शरणार्थी नकद सहायता (RCA) के लिए आवेदन करें", description: "RCA शरणार्थियों को मासिक नकद सहायता प्रदान करता है।" },
      ar: { title: "التقدم للحصول على المساعدة النقدية للاجئين (RCA)", description: "يوفر RCA مساعدة نقدية شهرية للاجئين." },
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
    tips: ["Many states cover pregnant women and children regardless of status", "Refugees qualify immediately for Refugee Medical Assistance", "Emergency Medicaid is available regardless of status", "Apply through your state's Medicaid office"],
    translations: {
      es: { title: "Solicitar Medicaid / CHIP", description: "Medicaid ofrece seguro médico gratuito o de bajo costo." },
      zh: { title: "申请Medicaid / CHIP", description: "Medicaid提供免费或低成本医疗保险。" },
      hi: { title: "Medicaid / CHIP के लिए आवेदन करें", description: "Medicaid मुफ़्त या कम लागत का स्वास्थ्य बीमा प्रदान करता है।" },
      ar: { title: "التقدم للحصول على Medicaid / CHIP", description: "يوفر Medicaid تأميناً صحياً مجانياً أو منخفض التكلفة." },
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
    tips: ["Lawfully present immigrants qualify", "Available regardless of SSN status", "Find local WIC clinic at wiclocator.fns.usda.gov", "Provides vouchers for milk, eggs, cereal, baby formula, and more"],
    translations: {
      es: { title: "WIC — Alimentos para Mujeres, Bebés y Niños", description: "WIC proporciona alimentos gratuitos para madres y niños menores de 5." },
      zh: { title: "WIC — 妇女、婴幼儿食品援助", description: "WIC为孕妇和5岁以下儿童提供免费食品。" },
      hi: { title: "WIC — महिलाओं, शिशुओं और बच्चों के लिए भोजन", description: "WIC गर्भवती महिलाओं और 5 साल से कम बच्चों को मुफ़्त खाना देता है।" },
      ar: { title: "WIC — غذاء للنساء والرضع والأطفال", description: "يوفر WIC غذاءً مجانياً للحوامل والأطفال دون 5 سنوات." },
    },
  },
  {
    key: "selective_service",
    title: "Register for Selective Service (Males 18-25)",
    description: "Federal law REQUIRES nearly all male immigrants ages 18-25 to register with Selective Service within 30 days of arriving.",
    urgency: "urgent",
    week: 4,
    category: "identity",
    officialLink: "https://www.sss.gov/register/immigrants/",
    requiredDocs: ["I-94 or SSN"],
    tips: ["Failure to register can disqualify you from citizenship and federal jobs", "It does NOT mean you are joining the military", "You can register online at sss.gov or at a post office", "This is legally required — not optional"],
    translations: {
      es: { title: "Inscribirse en el Servicio Selectivo (Varones 18-25)", description: "La ley federal REQUIERE inscripción de varones 18-25 dentro de 30 días." },
      zh: { title: "登记选择性服务 (男性18-25岁)", description: "联邦法律要求18-25岁男性移民在30天内登记。" },
      hi: { title: "चयनात्मक सेवा पंजीकरण (पुरुष 18-25)", description: "संघीय कानून 18-25 वर्ष के पुरुषों को 30 दिनों में पंजीकरण की आवश्यकता है।" },
      ar: { title: "التسجيل في الخدمة الانتقائية (ذكور 18-25)", description: "يتطلب القانون الفيدرالي تسجيل الذكور 18-25 خلال 30 يوماً." },
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
    tips: ["Contact your local DMV for specific requirements", "Some states offer 'Real ID' to immigrants with valid status", "Study materials are available online in multiple languages", "A state ID is useful even if you don't drive"],
    translations: {
      es: { title: "Obtener ID Estatal o Licencia de Conducir", description: "La mayoría de estados permiten a inmigrantes obtener una ID estatal." },
      zh: { title: "获取州ID或驾驶执照", description: "大多数州允许移民获得州ID或驾驶执照。" },
      hi: { title: "राज्य ID या ड्राइवर लाइसेंस प्राप्त करें", description: "अधिकांश राज्य आप्रवासियों को राज्य ID देते हैं।" },
      ar: { title: "الحصول على بطاقة هوية أو رخصة قيادة", description: "تسمح معظم الولايات للمهاجرين بالحصول على بطاقة هوية." },
    },
  },
  {
    key: "itin",
    title: "Apply for ITIN (if no SSN eligible)",
    description: "An Individual Taxpayer Identification Number lets you file taxes and open bank accounts even without an SSN.",
    urgency: "recommended",
    week: 4,
    category: "financial",
    officialLink: "https://www.irs.gov/individuals/individual-taxpayer-identification-number",
    tips: ["Free to apply with IRS Form W-7", "VITA tax centers can help you apply", "Needed for: taxes, certain bank accounts", "Not a replacement for SSN — it's specifically for tax purposes"],
    translations: {
      es: { title: "Solicitar ITIN (si no eres elegible para SSN)", description: "Un ITIN te permite presentar impuestos sin SSN." },
      zh: { title: "申请ITIN（如果不符合SSN资格）", description: "ITIN让您在没有SSN的情况下申报税款。" },
      hi: { title: "ITIN के लिए आवेदन करें (अगर SSN नहीं मिल सकता)", description: "ITIN से SSN के बिना टैक्स फाइल कर सकते हैं।" },
      ar: { title: "التقدم للحصول على ITIN", description: "يسمح ITIN بتقديم الضرائب بدون SSN." },
    },
  },
  {
    key: "ar11_address",
    title: "File AR-11 Address Change with USCIS",
    description: "Federal law requires you to notify USCIS within 10 days of any address change using form AR-11. This is legally required.",
    urgency: "urgent",
    week: 4,
    category: "identity",
    officialLink: "https://www.uscis.gov/ar-11",
    tips: ["File online at uscis.gov/ar-11 — it's free", "Must be filed within 10 days of moving", "Failure to file can affect your immigration case", "Every family member over 14 must file separately"],
    translations: {
      es: { title: "Presentar AR-11 (Cambio de Dirección) ante USCIS", description: "La ley requiere notificar a USCIS dentro de 10 días de cualquier cambio de dirección." },
      zh: { title: "向USCIS提交AR-11地址变更", description: "法律要求在地址变更后10天内通知USCIS。" },
      hi: { title: "USCIS के साथ AR-11 पता परिवर्तन दाखिल करें", description: "कानूनन पता बदलने के 10 दिनों के भीतर USCIS को सूचित करना अनिवार्य है।" },
      ar: { title: "تقديم AR-11 (تغيير العنوان) إلى USCIS", description: "يتطلب القانون إبلاغ USCIS خلال 10 أيام من أي تغيير في العنوان." },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MONTH 2 — EMPLOYMENT & SELF-SUFFICIENCY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    key: "ead_work_authorization",
    title: "Apply for Work Authorization (EAD)",
    description: "If your immigration status requires a separate work permit, apply using Form I-765 with USCIS. Processing can take months — apply early!",
    urgency: "urgent",
    week: 5,
    category: "employment",
    officialLink: "https://www.uscis.gov/i-765",
    requiredDocs: ["I-94", "Passport", "Passport photos", "Filing fee or fee waiver"],
    tips: ["Refugees get work authorization automatically — you may not need to file separately", "Asylees should apply as soon as status is granted", "Check if you qualify for a fee waiver (Form I-912)", "Processing time: check uscis.gov/processing-times", "You CANNOT work until you receive your EAD card"],
    translations: {
      es: { title: "Solicitar Autorización de Trabajo (EAD)", description: "Si tu estatus requiere permiso de trabajo, solicita con el Formulario I-765." },
      zh: { title: "申请工作许可 (EAD)", description: "如果您的身份需要单独的工作许可，使用I-765表格申请。" },
      hi: { title: "कार्य प्राधिकरण (EAD) के लिए आवेदन करें", description: "अगर आपकी स्थिति को अलग कार्य परमिट चाहिए, तो I-765 फॉर्म से आवेदन करें।" },
      ar: { title: "التقدم للحصول على تصريح العمل (EAD)", description: "إذا كان وضعك يتطلب تصريح عمل منفصل، قدم باستخدام النموذج I-765." },
    },
  },
  {
    key: "job_readiness",
    title: "Attend Employment Readiness Workshop",
    description: "Learn how to write a U.S.-format resume, prepare for interviews, and understand workplace culture in America.",
    urgency: "recommended",
    week: 5,
    category: "employment",
    tips: ["Nonprofits like Upwardly Global offer free resume help", "Your resettlement agency likely has a job readiness program", "Focus on transferable skills from your home country", "Practice common interview questions in English"],
    translations: {
      es: { title: "Asistir a Taller de Preparación para el Empleo", description: "Aprende a escribir un currículum en formato estadounidense." },
      zh: { title: "参加就业准备课程", description: "学习撰写美国格式的简历和面试技巧。" },
      hi: { title: "रोजगार तैयारी कार्यशाला में भाग लें", description: "अमेरिकी प्रारूप में रेज़्यूमे लिखना और साक्षात्कार की तैयारी करें।" },
      ar: { title: "حضور ورشة الاستعداد للتوظيف", description: "تعلم كتابة سيرة ذاتية بالتنسيق الأمريكي." },
    },
  },
  {
    key: "job_search",
    title: "Start Applying for Jobs",
    description: "Begin your active job search. Use your resettlement agency's job placement services, online job boards, and community connections.",
    urgency: "recommended",
    week: 6,
    category: "employment",
    tips: ["Indeed.com, LinkedIn, and state job boards are key resources", "Ask your caseworker about local employer partnerships", "Staffing agencies can help with immediate placement", "Start with any job to build U.S. work experience — you can advance later"],
    translations: {
      es: { title: "Comenzar a Buscar Empleo", description: "Inicia tu búsqueda activa de empleo usando agencias y portales en línea." },
      zh: { title: "开始求职", description: "开始积极求职，使用安置机构的服务和在线招聘网站。" },
      hi: { title: "नौकरी के लिए आवेदन शुरू करें", description: "अपनी सक्रिय नौकरी खोज शुरू करें।" },
      ar: { title: "ابدأ في التقدم للوظائف", description: "ابدأ البحث النشط عن عمل باستخدام خدمات التوظيف." },
    },
  },
  {
    key: "public_transit",
    title: "Learn Public Transportation",
    description: "Understand your local bus and train system. Many cities offer reduced fare programs for low-income residents.",
    urgency: "recommended",
    week: 5,
    category: "housing",
    tips: ["Download your city's transit app (Google Maps works well)", "Ask about reduced fare programs for low-income residents", "Your caseworker may provide initial bus passes", "Learn your route to the SSA office, school, and hospital"],
    translations: {
      es: { title: "Aprender Transporte Público", description: "Conoce el sistema de autobuses y trenes de tu ciudad." },
      zh: { title: "学习使用公共交通", description: "了解当地公交和火车系统。" },
      hi: { title: "सार्वजनिक परिवहन सीखें", description: "अपने स्थानीय बस और ट्रेन सिस्टम को समझें।" },
      ar: { title: "تعلم وسائل النقل العام", description: "تعرف على نظام الحافلات والقطارات المحلي." },
    },
  },
  {
    key: "housing_lease",
    title: "Understand Your Lease & Tenant Rights",
    description: "Know your rights as a tenant. Landlords cannot discriminate based on national origin or immigration status.",
    urgency: "recommended",
    week: 6,
    category: "housing",
    officialLink: "https://www.hud.gov/topics/rental_assistance",
    tips: ["Read your lease carefully — ask your caseworker to explain it", "Landlords CANNOT discriminate based on national origin", "Report housing discrimination to HUD at 800-669-9777", "Keep copies of all rent payments and communications"],
    translations: {
      es: { title: "Entender tu Contrato y Derechos de Inquilino", description: "Conoce tus derechos como inquilino. Los propietarios no pueden discriminar." },
      zh: { title: "了解你的租约和租户权利", description: "了解你作为租户的权利。房东不能基于国籍歧视。" },
      hi: { title: "अपना किराया अनुबंध और किरायेदार अधिकार समझें", description: "अपने किरायेदार अधिकारों को जानें।" },
      ar: { title: "فهم عقد الإيجار وحقوق المستأجر", description: "اعرف حقوقك كمستأجر. لا يحق للمالك التمييز." },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MONTH 3 — TAX, LONG-TERM STABILITY & INTEGRATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    key: "credit_building",
    title: "Start Building Credit History",
    description: "A good credit score is essential in America for housing, loans, and even some jobs. Start building it early with a secured credit card.",
    urgency: "recommended",
    week: 8,
    category: "financial",
    tips: ["Apply for a secured credit card from your bank", "Secured cards require a deposit (e.g., $200) that becomes your credit limit", "Pay your balance IN FULL every month", "Check your credit score free at annualcreditreport.com"],
    translations: {
      es: { title: "Comenzar a Construir Historial Crediticio", description: "Un buen puntaje de crédito es esencial en América para vivienda y préstamos." },
      zh: { title: "开始建立信用记录", description: "良好的信用评分对住房、贷款至关重要。" },
      hi: { title: "क्रेडिट इतिहास बनाना शुरू करें", description: "अमेरिका में अच्छा क्रेडिट स्कोर आवश्यक है।" },
      ar: { title: "ابدأ في بناء السجل الائتماني", description: "الدرجة الائتمانية الجيدة ضرورية للسكن والقروض." },
    },
  },
  {
    key: "vita_tax",
    title: "File Taxes (VITA Free Help)",
    description: "If you earned income in the U.S., you must file a federal tax return. VITA offers free help for incomes under $67,000.",
    urgency: "recommended",
    week: 10,
    category: "financial",
    officialLink: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers",
    tips: ["Tax deadline is April 15 each year", "VITA is free for income under $67,000", "Find locations at irs.gov/vita", "You may qualify for Earned Income Tax Credit (EITC) — worth thousands!"],
    translations: {
      es: { title: "Presentar Impuestos (Ayuda Gratuita VITA)", description: "Si ganaste ingresos, debes presentar impuestos. VITA te ayuda gratis." },
      zh: { title: "申报税款（VITA免费帮助）", description: "如果有收入须报税。VITA提供免费帮助。" },
      hi: { title: "टैक्स फाइल करें (VITA मुफ़्त मदद)", description: "अगर आय अर्जित की है तो टैक्स रिटर्न दाखिल करना होगा।" },
      ar: { title: "تقديم الضرائب (مساعدة VITA المجانية)", description: "إذا كسبت دخلاً، يجب تقديم إقرار ضريبي. VITA تساعد مجاناً." },
    },
  },
  {
    key: "legal_aid",
    title: "Connect with Immigration Legal Aid",
    description: "Find a free or low-cost immigration attorney who can advise on your status, renewals, and path to permanent residency.",
    urgency: "recommended",
    week: 10,
    category: "identity",
    officialLink: "https://www.immigrationadvocates.org/legaldirectory/",
    tips: ["NEVER pay a notario — they are NOT lawyers", "Find free legal help at immigrationadvocates.org", "Your resettlement agency can refer you", "Keep all immigration documents organized and safe"],
    translations: {
      es: { title: "Conectar con Ayuda Legal de Inmigración", description: "Encuentra un abogado de inmigración gratuito o de bajo costo." },
      zh: { title: "联系移民法律援助", description: "寻找免费或低成本的移民律师。" },
      hi: { title: "इमिग्रेशन कानूनी सहायता से जुड़ें", description: "मुफ़्त या कम लागत का इमिग्रेशन वकील खोजें।" },
      ar: { title: "التواصل مع المساعدة القانونية للهجرة", description: "ابحث عن محامي هجرة مجاني أو منخفض التكلفة." },
    },
  },
  {
    key: "community_network",
    title: "Join Community & Cultural Organizations",
    description: "Connect with your diaspora community and local cultural organizations for social support, mentorship, and networking.",
    urgency: "optional",
    week: 8,
    category: "family",
    tips: ["Search Facebook Groups for your community in your city", "Houses of worship often provide community support", "Community centers offer free activities and connections", "Building a network helps with job referrals and emotional support"],
    translations: {
      es: { title: "Unirse a Organizaciones Comunitarias y Culturales", description: "Conéctate con tu comunidad para apoyo social y redes." },
      zh: { title: "加入社区和文化组织", description: "连接侨民社区获得社会支持和人脉。" },
      hi: { title: "सामुदायिक और सांस्कृतिक संगठनों से जुड़ें", description: "सामाजिक सहायता के लिए अपने प्रवासी समुदाय से जुड़ें।" },
      ar: { title: "انضم إلى المنظمات المجتمعية والثقافية", description: "تواصل مع مجتمعك للدعم الاجتماعي والتواصل." },
    },
  },
  {
    key: "iom_travel_loan",
    title: "Set Up IOM Travel Loan Repayment",
    description: "If you received an IOM travel loan for your flight to the U.S., you'll need to begin repayment. The loan is interest-free.",
    urgency: "optional",
    week: 12,
    category: "financial",
    officialLink: "https://www.iom.int/",
    tips: ["The loan is interest-free", "Contact IOM at 1-866-777-4661 to set up a payment plan", "Even small monthly payments ($50) are acceptable", "Failure to repay does NOT affect your immigration status, but it does affect your credit"],
    translations: {
      es: { title: "Configurar Pago del Préstamo de Viaje IOM", description: "Si recibiste un préstamo de viaje IOM, debes comenzar el pago. Es sin intereses." },
      zh: { title: "设置IOM旅行贷款还款", description: "如果你收到了IOM旅行贷款，需要开始还款。无利息。" },
      hi: { title: "IOM यात्रा ऋण चुकौती सेट करें", description: "अगर IOM यात्रा ऋण मिला था, तो चुकौती शुरू करें। ब्याज-मुक्त।" },
      ar: { title: "إعداد سداد قرض السفر من IOM", description: "إذا حصلت على قرض سفر IOM، ابدأ السداد. القرض بدون فوائد." },
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
