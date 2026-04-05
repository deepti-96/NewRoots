import { useApp } from "@/App";
import { t } from "@/lib/translations";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ExternalLink } from "lucide-react";

interface BenefitCard {
  key: string;
  icon: string;
  titleKey: string;
  description: Record<string, string>;
  eligibility: Record<string, string>;
  howToApply: Record<string, string>;
  officialLink: string;
  tags: string[];
  urgency: "urgent" | "recommended";
}

const BENEFITS: BenefitCard[] = [
  {
    key: "snap",
    icon: "🍎",
    titleKey: "foodAssistance",
    description: {
      en: "SNAP (Supplemental Nutrition Assistance Program) provides monthly money on an EBT card to buy groceries. The average benefit is $200+/month for a family. Many lawfully present immigrants qualify.",
      es: "SNAP proporciona dinero mensual en una tarjeta EBT para comprar alimentos. El beneficio promedio es $200+/mes para una familia.",
      zh: "SNAP每月在EBT卡上提供资金用于购买食品。家庭平均补贴超过200美元/月。",
      hi: "SNAP किराने का सामान खरीदने के लिए EBT कार्ड पर मासिक पैसे प्रदान करता है।",
      ar: "يوفر SNAP مبلغاً شهرياً على بطاقة EBT لشراء البقالة.",
      fr: "SNAP fournit de l'argent mensuel sur une carte EBT pour acheter des épiceries.",
      pt: "SNAP fornece dinheiro mensal em um cartão EBT para comprar mantimentos.",
      vi: "SNAP cung cấp tiền hàng tháng trên thẻ EBT để mua thực phẩm.",
      ko: "SNAP은 식료품 구매를 위해 EBT 카드에 매월 금액을 제공합니다.",
      tl: "Ang SNAP ay nagbibigay ng pera bawat buwan sa EBT card para bumili ng mga pagkain.",
    },
    eligibility: {
      en: "Lawfully present immigrants may qualify based on income and household size. Children born in the U.S. qualify regardless of parents' status.",
      es: "Los inmigrantes legalmente presentes pueden calificar según ingresos y tamaño del hogar.",
      zh: "合法在美移民可根据收入和家庭人数申请。",
      hi: "कानूनी रूप से उपस्थित आप्रवासी आय और घरेलू आकार के आधार पर अर्हता प्राप्त कर सकते हैं।",
      ar: "قد يكون المهاجرون الحاضرون قانوناً مؤهلين بناءً على الدخل وحجم الأسرة.",
      fr: "Les immigrants légalement présents peuvent être éligibles en fonction des revenus.",
      pt: "Imigrantes legalmente presentes podem se qualificar com base na renda.",
      vi: "Người nhập cư hợp pháp có thể đủ điều kiện dựa trên thu nhập và quy mô hộ gia đình.",
      ko: "합법적으로 체류 중인 이민자는 소득과 가구 규모에 따라 자격이 될 수 있습니다.",
      tl: "Ang mga legal na naninirahan ay maaaring maging kwalipikado batay sa kita at laki ng pamilya.",
    },
    howToApply: {
      en: "Apply at your local SNAP office, or online through your state's benefits website. Bring ID, proof of address, and income documents.",
      es: "Solicita en tu oficina local de SNAP o en línea. Lleva ID, comprobante de domicilio y documentos de ingresos.",
      zh: "在当地SNAP办公室或通过州福利网站在线申请。",
      hi: "अपने स्थानीय SNAP कार्यालय में या अपने राज्य के लाभ वेबसाइट के माध्यम से ऑनलाइन आवेदन करें।",
      ar: "تقدم في مكتب SNAP المحلي أو عبر الإنترنت من خلال موقع مزايا ولايتك.",
      fr: "Faites une demande au bureau SNAP local ou en ligne via le site de votre État.",
      pt: "Candidate-se no escritório SNAP local ou online pelo site de benefícios do seu estado.",
      vi: "Nộp đơn tại văn phòng SNAP địa phương hoặc trực tuyến qua trang web phúc lợi của tiểu bang.",
      ko: "지역 SNAP 사무소 또는 주 복지 웹사이트를 통해 온라인으로 신청하세요.",
      tl: "Mag-apply sa lokal na opisina ng SNAP, o online sa pamamagitan ng website ng benepisyo ng iyong estado.",
    },
    officialLink: "https://www.benefits.gov/benefit/361",
    tags: ["Food", "Monthly benefit", "EBT card"],
    urgency: "urgent",
  },
  {
    key: "medicaid",
    icon: "🏥",
    titleKey: "healthcare",
    description: {
      en: "Medicaid provides free or low-cost health insurance for low-income families. CHIP covers children up to age 19. Many immigrants, including pregnant women and children, qualify.",
      es: "Medicaid ofrece seguro médico gratuito o económico. CHIP cubre a los niños hasta los 19 años.",
      zh: "Medicaid为低收入家庭提供免费或低成本医疗保险。CHIP覆盖19岁以下儿童。",
      hi: "Medicaid कम आय वाले परिवारों के लिए मुफ़्त या कम लागत का स्वास्थ्य बीमा प्रदान करता है।",
      ar: "يوفر Medicaid تأميناً صحياً مجانياً أو منخفض التكلفة للأسر ذات الدخل المنخفض.",
      fr: "Medicaid offre une assurance santé gratuite ou peu coûteuse pour les familles à faible revenu.",
      pt: "O Medicaid oferece seguro de saúde gratuito ou de baixo custo para famílias de baixa renda.",
      vi: "Medicaid cung cấp bảo hiểm y tế miễn phí hoặc chi phí thấp cho các gia đình thu nhập thấp.",
      ko: "Medicaid는 저소득 가족을 위한 무료 또는 저렴한 의료 보험을 제공합니다.",
      tl: "Ang Medicaid ay nagbibigay ng libreng o murang health insurance para sa mga pamilyang may mababang kita.",
    },
    eligibility: {
      en: "Eligibility varies by state. Emergency Medicaid is available regardless of status. Many states cover pregnant women and children regardless of immigration status.",
      es: "La elegibilidad varía por estado. El Medicaid de emergencia está disponible sin importar el estatus.",
      zh: "资格因州而异。紧急Medicaid无论身份如何都可获得。",
      hi: "पात्रता राज्य के अनुसार भिन्न होती है। आपातकालीन Medicaid स्थिति की परवाह किए बिना उपलब्ध है।",
      ar: "تختلف الأهلية حسب الولاية. Medicaid الطارئ متاح بغض النظر عن الوضع.",
      fr: "L'éligibilité varie selon l'État. Le Medicaid d'urgence est disponible quel que soit le statut.",
      pt: "A elegibilidade varia por estado. O Medicaid de emergência está disponível independentemente do status.",
      vi: "Điều kiện thay đổi theo tiểu bang. Medicaid khẩn cấp có sẵn bất kể tình trạng di trú.",
      ko: "자격은 주마다 다릅니다. 응급 Medicaid는 이민 신분에 관계없이 이용 가능합니다.",
      tl: "Nag-iiba ang eligibility ayon sa estado. Ang Emergency Medicaid ay available anuman ang status.",
    },
    howToApply: {
      en: "Apply at your state's Medicaid office, through healthcare.gov, or call 1-800-318-2596. Applications are free.",
      es: "Solicita en la oficina de Medicaid de tu estado o a través de healthcare.gov.",
      zh: "在州Medicaid办公室或通过healthcare.gov申请，或拨打1-800-318-2596。",
      hi: "अपने राज्य के Medicaid कार्यालय में या healthcare.gov के माध्यम से आवेदन करें।",
      ar: "تقدم في مكتب Medicaid بولايتك أو عبر healthcare.gov.",
      fr: "Faites une demande au bureau Medicaid de votre État ou via healthcare.gov.",
      pt: "Candidate-se no escritório Medicaid do seu estado ou através do healthcare.gov.",
      vi: "Nộp đơn tại văn phòng Medicaid của tiểu bang hoặc qua healthcare.gov.",
      ko: "주 Medicaid 사무소 또는 healthcare.gov를 통해 신청하거나 1-800-318-2596에 전화하세요.",
      tl: "Mag-apply sa opisina ng Medicaid ng iyong estado, sa healthcare.gov, o tumawag sa 1-800-318-2596.",
    },
    officialLink: "https://www.healthcare.gov/medicaid-chip/",
    tags: ["Health", "Free or low-cost", "Children covered"],
    urgency: "urgent",
  },
  {
    key: "housing",
    icon: "🏠",
    titleKey: "housing",
    description: {
      en: "HUD provides housing assistance including Section 8 vouchers, public housing, and emergency shelter. Many nonprofit organizations also offer temporary housing for new arrivals.",
      es: "HUD proporciona asistencia de vivienda incluyendo vales Sección 8 y vivienda pública.",
      zh: "HUD提供住房援助，包括第8节住房补贴和公共住房。",
      hi: "HUD आवास सहायता प्रदान करता है जिसमें धारा 8 वाउचर और सार्वजनिक आवास शामिल हैं।",
      ar: "يوفر HUD مساعدة سكنية بما في ذلك قسائم القسم 8 والإسكان العام.",
      fr: "HUD fournit une aide au logement incluant les bons de la section 8 et les logements publics.",
      pt: "O HUD oferece assistência habitacional incluindo vouchers Seção 8 e habitação pública.",
      vi: "HUD cung cấp hỗ trợ nhà ở bao gồm phiếu Điều 8 và nhà ở công cộng.",
      ko: "HUD는 섹션 8 바우처, 공공주택 등 주거 지원을 제공합니다.",
      tl: "Ang HUD ay nagbibigay ng tulong sa pabahay kabilang ang Section 8 vouchers at pampublikong pabahay.",
    },
    eligibility: {
      en: "Lawfully present immigrants may apply. Priority for families with children. Waiting lists can be long — apply early.",
      es: "Los inmigrantes legalmente presentes pueden solicitar. Prioridad para familias con hijos.",
      zh: "合法在美移民可以申请。有孩子的家庭优先考虑。等待名单可能很长，请尽早申请。",
      hi: "कानूनी रूप से उपस्थित आप्रवासी आवेदन कर सकते हैं।",
      ar: "يمكن للمهاجرين الحاضرين قانوناً التقدم بطلب. الأولوية للعائلات التي لديها أطفال.",
      fr: "Les immigrants légalement présents peuvent postuler. Priorité aux familles avec enfants.",
      pt: "Imigrantes legalmente presentes podem se candidatar. Prioridade para famílias com filhos.",
      vi: "Người nhập cư hợp pháp có thể nộp đơn. Ưu tiên cho các gia đình có con nhỏ.",
      ko: "합법적으로 체류 중인 이민자는 신청할 수 있습니다. 자녀가 있는 가족에게 우선권이 주어집니다.",
      tl: "Ang mga legal na naninirahan ay maaaring mag-apply. Priority para sa mga pamilyang may mga bata.",
    },
    howToApply: {
      en: "Contact your local Public Housing Authority (PHA). Find them at hud.gov/program_offices/public_indian_housing/pha/contacts",
      es: "Contacta tu Autoridad de Vivienda Pública local. Encuéntralas en hud.gov.",
      zh: "联系当地公共住房局(PHA)。在hud.gov上查找。",
      hi: "अपने स्थानीय सार्वजनिक आवास प्राधिकरण (PHA) से संपर्क करें।",
      ar: "تواصل مع سلطة الإسكان العام المحلية (PHA). ابحث عنها على hud.gov.",
      fr: "Contactez votre autorité de logement public locale (PHA) sur hud.gov.",
      pt: "Entre em contato com sua Autoridade de Habitação Pública local (PHA) em hud.gov.",
      vi: "Liên hệ Cơ quan Nhà ở Công cộng địa phương (PHA) tại hud.gov.",
      ko: "지역 공공주택당국(PHA)에 연락하세요. hud.gov에서 찾을 수 있습니다.",
      tl: "Makipag-ugnayan sa iyong lokal na Public Housing Authority (PHA) sa hud.gov.",
    },
    officialLink: "https://www.hud.gov/topics/rental_assistance",
    tags: ["Housing", "Vouchers", "Apply early"],
    urgency: "recommended",
  },
  {
    key: "banking",
    icon: "🏦",
    titleKey: "banking",
    description: {
      en: "You do NOT need a Social Security Number to open a bank or credit union account. Banks accept passports and ITIN. Look for accounts with no minimum balance requirement.",
      es: "NO necesitas SSN para abrir una cuenta bancaria. Los bancos aceptan pasaportes e ITIN.",
      zh: "开设银行账户不需要社会安全号码。银行接受护照和ITIN。",
      hi: "बैंक खाता खोलने के लिए सामाजिक सुरक्षा नंबर की ज़रूरत नहीं है।",
      ar: "لا تحتاج إلى SSN لفتح حساب مصرفي. تقبل البنوك جوازات السفر وITIN.",
      fr: "Vous n'avez PAS besoin d'un SSN pour ouvrir un compte bancaire.",
      pt: "Você NÃO precisa de SSN para abrir uma conta bancária.",
      vi: "Bạn KHÔNG cần Số An Sinh Xã Hội để mở tài khoản ngân hàng.",
      ko: "은행 계좌를 개설하는 데 사회보장번호가 필요하지 않습니다.",
      tl: "Hindi mo KAILANGAN ang SSN para magbukas ng bank account.",
    },
    eligibility: {
      en: "Anyone with a valid ID (passport is accepted). Credit unions often have the best options with lower fees for newcomers.",
      es: "Cualquiera con ID válido. Las cooperativas de crédito suelen tener las mejores opciones con menores tarifas.",
      zh: "任何持有有效身份证件（护照被接受）的人。信用合作社通常有最佳选择，费用较低。",
      hi: "वैध आईडी वाला कोई भी व्यक्ति (पासपोर्ट स्वीकार किया जाता है)।",
      ar: "أي شخص لديه هوية صالحة (يُقبل جواز السفر).",
      fr: "Toute personne avec une pièce d'identité valide (le passeport est accepté).",
      pt: "Qualquer pessoa com um documento de identidade válido (passaporte é aceito).",
      vi: "Bất kỳ ai có giấy tờ tùy thân hợp lệ (hộ chiếu được chấp nhận).",
      ko: "유효한 신분증을 가진 모든 사람(여권 허용).",
      tl: "Sinuman na may valid na ID (tinatanggap ang pasaporte).",
    },
    howToApply: {
      en: "Visit any bank or credit union. Bring: passport or ID, proof of address, and initial deposit (often $0). Ask specifically for accounts with no minimum balance.",
      es: "Visita cualquier banco. Lleva: pasaporte, comprobante de domicilio y depósito inicial (a menudo $0).",
      zh: "访问任何银行或信用合作社。携带：护照或身份证、地址证明和初始存款（通常为$0）。",
      hi: "किसी भी बैंक या क्रेडिट यूनियन में जाएं। लाएं: पासपोर्ट या आईडी, पते का प्रमाण।",
      ar: "قم بزيارة أي بنك أو اتحاد ائتماني. أحضر: جواز السفر أو الهوية وإثبات العنوان.",
      fr: "Rendez-vous dans une banque ou coopérative de crédit. Apportez: passeport, preuve d'adresse.",
      pt: "Visite qualquer banco ou cooperativa de crédito. Traga: passaporte ou documento, comprovante de endereço.",
      vi: "Đến bất kỳ ngân hàng hoặc tín dụng hợp tác xã nào. Mang theo: hộ chiếu, bằng chứng địa chỉ.",
      ko: "은행 또는 신용협동조합을 방문하세요. 가져갈 것: 여권 또는 신분증, 주소 증명서.",
      tl: "Pumunta sa anumang bangko o credit union. Dalhin: pasaporte o ID, patunay ng address.",
    },
    officialLink: "https://www.consumerfinance.gov/consumer-tools/bank-accounts/",
    tags: ["No SSN required", "Free accounts available", "CFPB protected"],
    urgency: "urgent",
  },
  {
    key: "ssn_benefit",
    icon: "🪪",
    titleKey: "ssn",
    description: {
      en: "A Social Security Number (SSN) is used for taxes, work authorization, and many government services. If you're authorized to work in the U.S., you can apply.",
      es: "El SSN se usa para impuestos, autorización de trabajo y muchos servicios gubernamentales.",
      zh: "社会安全号码(SSN)用于税务、工作授权和许多政府服务。",
      hi: "सामाजिक सुरक्षा संख्या (SSN) कर, कार्य प्राधिकरण और कई सरकारी सेवाओं के लिए उपयोग की जाती है।",
      ar: "يُستخدم رقم الضمان الاجتماعي للضرائب وإذن العمل والعديد من الخدمات الحكومية.",
      fr: "Le SSN est utilisé pour les impôts, l'autorisation de travail et de nombreux services gouvernementaux.",
      pt: "O SSN é usado para impostos, autorização de trabalho e muitos serviços governamentais.",
      vi: "Số An Sinh Xã Hội (SSN) được sử dụng cho thuế, ủy quyền làm việc và nhiều dịch vụ chính phủ.",
      ko: "사회보장번호(SSN)는 세금, 취업 허가, 많은 정부 서비스에 사용됩니다.",
      tl: "Ang SSN ay ginagamit para sa buwis, work authorization, at maraming serbisyo ng gobyerno.",
    },
    eligibility: {
      en: "Work-authorized immigrants (visa holders, green card holders, refugees, asylees) can apply. Apply at least 10 days after arrival.",
      es: "Los inmigrantes con autorización de trabajo pueden solicitar. Espera al menos 10 días después de llegar.",
      zh: "有工作许可的移民可以申请。到达后至少等待10天。",
      hi: "कार्य-अधिकृत आप्रवासी आवेदन कर सकते हैं। आगमन के कम से कम 10 दिन बाद आवेदन करें।",
      ar: "يمكن للمهاجرين المرخص لهم بالعمل التقدم. انتظر 10 أيام على الأقل بعد الوصول.",
      fr: "Les immigrants autorisés à travailler peuvent postuler. Attendez au moins 10 jours après l'arrivée.",
      pt: "Imigrantes com autorização de trabalho podem se candidatar. Aguarde pelo menos 10 dias após a chegada.",
      vi: "Người nhập cư được phép làm việc có thể nộp đơn. Chờ ít nhất 10 ngày sau khi đến nơi.",
      ko: "취업 허가를 받은 이민자는 신청할 수 있습니다. 도착 후 최소 10일 후에 신청하세요.",
      tl: "Ang mga imigrante na may work authorization ay maaaring mag-apply. Maghintay ng hindi bababa sa 10 araw pagkatapos dumating.",
    },
    howToApply: {
      en: "Visit your local Social Security Administration (SSA) office. It's FREE. Find the nearest office at ssa.gov/locator. Bring passport, visa, and I-94.",
      es: "Visita tu oficina SSA local. Es GRATIS. Encuentra la más cercana en ssa.gov/locator.",
      zh: "访问当地社会保障管理局(SSA)办公室。免费。在ssa.gov/locator找到最近的办公室。",
      hi: "अपने स्थानीय सामाजिक सुरक्षा प्रशासन (SSA) कार्यालय में जाएं। यह मुफ़्त है।",
      ar: "قم بزيارة مكتب إدارة الضمان الاجتماعي (SSA) المحلي. إنه مجاني.",
      fr: "Visitez votre bureau SSA local. C'est GRATUIT. Trouvez le plus proche sur ssa.gov/locator.",
      pt: "Visite seu escritório SSA local. É GRATUITO. Encontre o mais próximo em ssa.gov/locator.",
      vi: "Ghé thăm văn phòng SSA địa phương. MIỄN PHÍ. Tìm văn phòng gần nhất tại ssa.gov/locator.",
      ko: "가까운 사회보장국(SSA) 사무소를 방문하세요. 무료입니다. ssa.gov/locator에서 찾으세요.",
      tl: "Bisitahin ang lokal na opisina ng SSA. Ito ay LIBRE. Hanapin ang pinakamalapit sa ssa.gov/locator.",
    },
    officialLink: "https://www.ssa.gov/number-card/request-number-first-time",
    tags: ["Free application", "Bring passport + I-94"],
    urgency: "urgent",
  },
  {
    key: "employment",
    icon: "💼",
    titleKey: "employment",
    description: {
      en: "American Job Centers (AJCs) offer free employment services including job search, resume help, skills training, and career counseling in multiple languages.",
      es: "Los Centros de Empleo Americanos ofrecen servicios de empleo gratuitos incluyendo búsqueda de empleo y capacitación.",
      zh: "美国就业中心(AJCs)提供免费就业服务，包括求职、简历帮助、技能培训。",
      hi: "अमेरिकी जॉब सेंटर (AJCs) मुफ़्त रोजगार सेवाएं प्रदान करते हैं।",
      ar: "تقدم مراكز العمل الأمريكية (AJCs) خدمات توظيف مجانية.",
      fr: "Les Centres d'emploi américains (AJCs) offrent des services d'emploi gratuits.",
      pt: "Os American Job Centers (AJCs) oferecem serviços de emprego gratuitos.",
      vi: "Các Trung tâm Việc làm Mỹ (AJCs) cung cấp dịch vụ việc làm miễn phí.",
      ko: "미국 취업 센터(AJCs)는 무료 취업 서비스를 제공합니다.",
      tl: "Ang mga American Job Center (AJCs) ay nag-aalok ng libreng serbisyo sa paghahanap ng trabaho.",
    },
    eligibility: {
      en: "Open to anyone. Work-authorized immigrants and U.S. citizens. Many services also available online.",
      es: "Abierto para todos. Muchos servicios también disponibles en línea.",
      zh: "对所有人开放。许多服务也可在线获得。",
      hi: "सभी के लिए खुला है। कई सेवाएं ऑनलाइन भी उपलब्ध हैं।",
      ar: "مفتوح للجميع. العديد من الخدمات متاحة أيضاً عبر الإنترنت.",
      fr: "Ouvert à tous. De nombreux services sont également disponibles en ligne.",
      pt: "Aberto para todos. Muitos serviços também disponíveis online.",
      vi: "Mở cho tất cả mọi người. Nhiều dịch vụ cũng có sẵn trực tuyến.",
      ko: "모든 사람에게 개방. 많은 서비스가 온라인으로도 이용 가능합니다.",
      tl: "Bukas sa lahat. Maraming serbisyo na available din online.",
    },
    howToApply: {
      en: "Find your nearest American Job Center at careeronestop.org/localhelp or call 1-877-872-5627.",
      es: "Encuentra tu Centro de Empleo más cercano en careeronestop.org/localhelp.",
      zh: "在careeronestop.org/localhelp找到最近的美国就业中心，或拨打1-877-872-5627。",
      hi: "careeronestop.org/localhelp पर अपना निकटतम अमेरिकी जॉब सेंटर खोजें।",
      ar: "ابحث عن أقرب مركز عمل أمريكي على careeronestop.org/localhelp.",
      fr: "Trouvez votre Centre d'emploi le plus proche sur careeronestop.org/localhelp.",
      pt: "Encontre seu Centro de Emprego Americano mais próximo em careeronestop.org/localhelp.",
      vi: "Tìm Trung tâm Việc làm Mỹ gần nhất tại careeronestop.org/localhelp.",
      ko: "careeronestop.org/localhelp에서 가장 가까운 미국 취업 센터를 찾으세요.",
      tl: "Hanapin ang pinakamalapit na American Job Center sa careeronestop.org/localhelp.",
    },
    officialLink: "https://www.careeronestop.org/LocalHelp/local-help.aspx",
    tags: ["Free", "Resume help", "Multiple languages"],
    urgency: "recommended",
  },
  {
    key: "education",
    icon: "🎓",
    titleKey: "education",
    description: {
      en: "Free adult education programs include ESL (English as a Second Language), GED preparation, and literacy programs. Children are entitled to free K-12 public education regardless of immigration status.",
      es: "Los programas gratuitos de educación para adultos incluyen ESL, preparación para GED y programas de alfabetización.",
      zh: "免费成人教育计划包括ESL（英语为第二语言）、GED备考和识字计划。",
      hi: "मुफ़्त वयस्क शिक्षा कार्यक्रमों में ESL, GED तैयारी और साक्षरता कार्यक्रम शामिल हैं।",
      ar: "تشمل برامج تعليم البالغين المجانية تعليم الإنجليزية كلغة ثانية وإعداد GED.",
      fr: "Les programmes d'éducation pour adultes gratuits comprennent ESL, la préparation au GED.",
      pt: "Programas gratuitos de educação de adultos incluem ESL, preparação para GED.",
      vi: "Các chương trình giáo dục người lớn miễn phí bao gồm ESL, chuẩn bị GED và chương trình đọc viết.",
      ko: "무료 성인 교육 프로그램에는 ESL, GED 준비, 문해력 프로그램이 포함됩니다.",
      tl: "Ang mga libreng programa sa adult education ay kinabibilangan ng ESL, GED preparation, at literacy programs.",
    },
    eligibility: {
      en: "K-12 public school is available for ALL children regardless of status. Adult ESL programs are generally open to all.",
      es: "La escuela pública K-12 está disponible para TODOS los niños sin importar su estatus.",
      zh: "K-12公立学校对所有儿童开放，不论身份如何。",
      hi: "K-12 सार्वजनिक स्कूल स्थिति की परवाह किए बिना सभी बच्चों के लिए उपलब्ध है।",
      ar: "المدارس العامة K-12 متاحة لجميع الأطفال بغض النظر عن الوضع.",
      fr: "L'école publique K-12 est disponible pour TOUS les enfants quel que soit leur statut.",
      pt: "A escola pública K-12 está disponível para TODAS as crianças independentemente do status.",
      vi: "Trường công K-12 có sẵn cho TẤT CẢ trẻ em bất kể tình trạng di trú.",
      ko: "K-12 공립학교는 이민 신분에 관계없이 모든 어린이가 이용할 수 있습니다.",
      tl: "Ang K-12 public school ay available para sa LAHAT ng bata anuman ang status.",
    },
    howToApply: {
      en: "For children: contact your local school district. For adults: search for adult education centers at lincs.ed.gov or call 2-1-1.",
      es: "Para niños: contacta tu distrito escolar local. Para adultos: busca centros de educación para adultos en lincs.ed.gov.",
      zh: "对于儿童：联系当地学区。对于成人：在lincs.ed.gov搜索成人教育中心。",
      hi: "बच्चों के लिए: अपने स्थानीय स्कूल जिले से संपर्क करें। वयस्कों के लिए: lincs.ed.gov पर खोजें।",
      ar: "للأطفال: تواصل مع منطقتك التعليمية المحلية. للبالغين: ابحث في lincs.ed.gov.",
      fr: "Pour les enfants: contactez votre district scolaire local. Pour les adultes: cherchez sur lincs.ed.gov.",
      pt: "Para crianças: contate seu distrito escolar local. Para adultos: pesquise em lincs.ed.gov.",
      vi: "Trẻ em: liên hệ quận học địa phương. Người lớn: tìm kiếm tại lincs.ed.gov.",
      ko: "어린이: 지역 학군에 연락하세요. 성인: lincs.ed.gov에서 성인 교육 센터를 검색하세요.",
      tl: "Para sa mga bata: makipag-ugnayan sa lokal na school district. Para sa mga adult: maghanap sa lincs.ed.gov.",
    },
    officialLink: "https://lincs.ed.gov/state-resources/federal-initiatives/all",
    tags: ["K-12 is free", "ESL classes", "GED prep"],
    urgency: "recommended",
  },
  {
    key: "wic_benefit",
    icon: "🍼",
    titleKey: "childcare",
    description: {
      en: "WIC provides free nutritious food, formula, and health support for pregnant women, new mothers, and children under 5. Over 6 million families use WIC every month.",
      es: "WIC proporciona alimentos nutritivos gratuitos y apoyo de salud para mujeres embarazadas y niños menores de 5 años.",
      zh: "WIC为孕妇、新妈妈和5岁以下儿童提供免费营养食品和健康支持。",
      hi: "WIC गर्भवती महिलाओं, नई माताओं और 5 साल से कम उम्र के बच्चों को मुफ़्त पौष्टिक भोजन प्रदान करता है।",
      ar: "يوفر WIC أغذية مغذية مجانية ودعماً صحياً للنساء الحوامل والأمهات الجدد والأطفال دون 5 سنوات.",
      fr: "WIC fournit des aliments nutritifs gratuits et un soutien de santé pour les femmes enceintes et les enfants de moins de 5 ans.",
      pt: "WIC fornece alimentos nutritivos gratuitos e suporte de saúde para gestantes e crianças menores de 5 anos.",
      vi: "WIC cung cấp thực phẩm bổ dưỡng miễn phí và hỗ trợ sức khỏe cho phụ nữ mang thai và trẻ em dưới 5 tuổi.",
      ko: "WIC는 임산부, 새 엄마, 5세 미만 어린이에게 무료 영양 식품과 건강 지원을 제공합니다.",
      tl: "Ang WIC ay nagbibigay ng libreng masustansyang pagkain at suporta sa kalusugan para sa mga buntis, bagong ina, at mga batang wala pang 5 taong gulang.",
    },
    eligibility: {
      en: "Lawfully present immigrants qualify. Available regardless of SSN status. Income requirements apply. Both documented and undocumented children qualify through their own citizenship status.",
      es: "Los inmigrantes legalmente presentes califican. Disponible independientemente del estado del SSN.",
      zh: "合法在美移民有资格申请。不受SSN状态影响。",
      hi: "कानूनी रूप से उपस्थित आप्रवासी योग्य हैं। SSN स्थिति की परवाह किए बिना उपलब्ध है।",
      ar: "المهاجرون الحاضرون قانوناً مؤهلون. متاح بغض النظر عن حالة SSN.",
      fr: "Les immigrants légalement présents sont éligibles. Disponible quelle que soit la situation du SSN.",
      pt: "Imigrantes legalmente presentes se qualificam. Disponível independentemente do status do SSN.",
      vi: "Người nhập cư hợp pháp đủ điều kiện. Có sẵn bất kể tình trạng SSN.",
      ko: "합법적으로 체류 중인 이민자는 자격이 됩니다. SSN 유무에 관계없이 이용 가능합니다.",
      tl: "Ang mga legal na naninirahan ay kwalipikado. Available anuman ang status ng SSN.",
    },
    howToApply: {
      en: "Find your local WIC office at wiclocator.fns.usda.gov. Bring ID, proof of address, and income information.",
      es: "Encuentra tu oficina WIC local en wiclocator.fns.usda.gov.",
      zh: "在wiclocator.fns.usda.gov找到当地WIC办公室。",
      hi: "wiclocator.fns.usda.gov पर अपना स्थानीय WIC कार्यालय खोजें।",
      ar: "ابحث عن مكتب WIC المحلي على wiclocator.fns.usda.gov.",
      fr: "Trouvez votre bureau WIC local sur wiclocator.fns.usda.gov.",
      pt: "Encontre seu escritório WIC local em wiclocator.fns.usda.gov.",
      vi: "Tìm văn phòng WIC địa phương tại wiclocator.fns.usda.gov.",
      ko: "wiclocator.fns.usda.gov에서 지역 WIC 사무소를 찾으세요.",
      tl: "Hanapin ang iyong lokal na opisina ng WIC sa wiclocator.fns.usda.gov.",
    },
    officialLink: "https://www.fns.usda.gov/wic",
    tags: ["Children under 5", "Pregnant women", "Free food"],
    urgency: "recommended",
  },
];

export default function BenefitsPage() {
  const { user, language } = useApp();
  const [, navigate] = useLocation();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const lang = language;

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-slate-900 text-3xl font-bold mb-2">{t(lang, "benefitsTitle")}</h1>
        
        {/* Soft blue informational box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4 shadow-sm">
          <p className="text-blue-800 font-medium">
            {t(lang, "benefitsDisclaimer")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {BENEFITS.map(benefit => {
          const isExpanded = expandedKey === benefit.key;
          const desc = benefit.description[lang] || benefit.description.en;
          const elig = benefit.eligibility[lang] || benefit.eligibility.en;
          const howTo = benefit.howToApply[lang] || benefit.howToApply.en;

          // Determine badge based on urgency mapping
          let badgeText = benefit.urgency === "urgent" ? t(lang, "youMayQualify") : t(lang, "worthChecking");
          let badgeStyle = benefit.urgency === "urgent" 
            ? "bg-emerald-50 text-emerald-700 border-none"
            : "bg-blue-50 text-blue-700 border-none";
            
          // If there's an action required or some missing state (mocked logic)
          if (benefit.key === "ssn_benefit") {
            badgeText = t(lang, "actionRequired");
            badgeStyle = "bg-amber-50 text-amber-700 border-none";
          }

          return (
            <div
              key={benefit.key}
              className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md cursor-pointer ${isExpanded ? 'ring-2 ring-emerald-600' : ''}`}
            >
              <div 
                className="w-full flex items-center justify-between p-6"
                onClick={() => setExpandedKey(isExpanded ? null : benefit.key)}
              >
                <div className="flex items-center gap-6">
                  {/* Monochromatic Soft Icon Compartment */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex justify-center items-center flex-shrink-0 text-3xl opacity-80 grayscale">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{t(lang, benefit.titleKey as any)}</h3>
                    <p className="text-slate-500 text-sm line-clamp-1">{desc}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <span className={`px-4 py-2 rounded-full font-bold text-sm tracking-wide whitespace-nowrap flex-shrink-0 text-center ${badgeStyle}`}>
                  {badgeText}
                </span>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">What it is</h4>
                      <p className="text-slate-700 leading-relaxed">{desc}</p>
                    </div>

                    <div>
                      <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Who qualifies</h4>
                      <p className="text-slate-700 leading-relaxed">{elig}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-2">
                    <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">How to apply</h4>
                    <p className="text-slate-700 mb-4">{howTo}</p>
                    
                    <a
                      href={benefit.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 hover:bg-slate-800 hover:shadow-md transition-all font-medium text-sm"
                    >
                      Visit Official Resource <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
