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
      es: { title: "Obtener un Teléfono / SIM", description: "Un número de teléfono local es esencial para todo." , tips: ["Walmart, T-Mobile y AT&T tienen planes prepago desde $25/mes", "Puedes obtener una SIM sin ID en muchas tiendas", "Considera Mint Mobile o Tello para planes más baratos"] },
      zh: { title: "获取手机/SIM卡", description: "本地电话号码对于一切都是必不可少的。" , tips: ["沃尔玛、T-Mobile 和 AT&T 有低至 $25/月的预付套餐", "许多商店无需身份证即可购买 SIM 卡", "考虑 Mint Mobile 或 Tello 以获得更便宜的套餐"] },
      hi: { title: "फ़ोन / SIM कार्ड प्राप्त करें", description: "स्थानीय फ़ोन नंबर हर चीज़ के लिए ज़रूरी है।" , tips: ["Walmart, T-Mobile और AT&T में $25/माह से प्रीपेड प्लान हैं", "कई स्टोर में बिना ID के SIM कार्ड मिल सकता है", "सस्ते प्लान के लिए Mint Mobile या Tello पर विचार करें"] },
      ar: { title: "احصل على هاتف / شريحة SIM", description: "رقم الهاتف المحلي ضروري لكل شيء." , tips: ["تقدم وول مارت وT-Mobile وAT&T خططاً مسبقة الدفع تبدأ من 25 دولاراً شهرياً", "يمكنك الحصول على شريحة SIM دون بطاقة هوية في كثير من المتاجر", "فكر في Mint Mobile أو Tello للحصول على خطط أرخص"] },
    
      fr: { title: "Obtenir un Téléphone / SIM", description: "Un numéro de téléphone local est essentiel pour tout — candidatures, rendez-vous et urgences.", tips: ["Walmart, T-Mobile et AT&T proposent des forfaits prépayés à partir de 25$/mois", "Vous pouvez obtenir une SIM sans pièce d'identité dans de nombreux magasins", "Pensez à Mint Mobile ou Tello pour des tarifs moins chers"] },
    
      pt: { title: "Obter um Telefone / SIM", description: "Um número de telefone local é essencial para tudo — candidaturas, consultas e emergências.", tips: ["Walmart, T-Mobile e AT&T têm planos pré-pagos a partir de $25/mês", "Você pode obter um SIM card sem ID em muitas lojas", "Considere Mint Mobile ou Tello para planos mais baratos"] },
    
      vi: { title: "Lấy Điện Thoại / SIM", description: "Số điện thoại địa phương rất cần thiết cho mọi thứ — xin việc, hẹn gặp và khẩn cấp.", tips: ["Walmart, T-Mobile và AT&T có gói trả trước từ $25/tháng", "Bạn có thể mua SIM không cần ID ở nhiều cửa hàng", "Cân nhắc Mint Mobile hoặc Tello để tiết kiệm hơn"] },
    
      ko: { title: "전화기 / SIM 카드 구하기", description: "지역 전화번호는 취업 지원, 약속, 긴급 상황 등 모든 것에 필수적입니다.", tips: ["Walmart, T-Mobile, AT&T에서 월 $25부터 선불 요금제 이용 가능", "많은 매장에서 신분증 없이 SIM 카드를 구입할 수 있습니다", "저렴한 요금제는 Mint Mobile이나 Tello를 고려하세요"] },
    
      tl: { title: "Kumuha ng Telepono / SIM", description: "Ang lokal na numero ng telepono ay mahalaga para sa lahat — mga aplikasyon sa trabaho, appointment, at emergency.", tips: ["Ang Walmart, T-Mobile, at AT&T ay may prepaid na plano mula $25/buwan", "Makakakuha ka ng SIM card nang walang ID sa maraming tindahan", "Isaalang-alang ang Mint Mobile o Tello para sa mas murang plano"] },
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
      es: { title: "Establecer una Dirección Postal", description: "Necesitas una dirección en EE.UU. para recibir correo." , tips: ["La dirección de un refugio funciona", "Algunas organizaciones sin fines de lucro ofrecen servicios postales para recién llegados", "Las cajas de correo en USPS comienzan desde ~$30/6 meses"] },
      zh: { title: "确立邮寄地址", description: "您需要美国地址来接收政府机构的邮件。" , tips: ["收容所地址也可以", "一些非营利组织为新移民提供邮件服务", "USPS 邮政信箱约 $30 起/6 个月"] },
      hi: { title: "डाक पता स्थापित करें", description: "मेल प्राप्त करने के लिए अमेरिकी पता चाहिए।" , tips: ["आश्रय का पता भी काम करता है", "कुछ गैर-लाभकारी संस्थाएं नए लोगों के लिए डाक सेवाएं प्रदान करती हैं", "USPS पर PO Box ~$30/6 महीने से शुरू होती है"] },
      ar: { title: "إنشاء عنوان بريدي", description: "تحتاج إلى عنوان أمريكي لاستلام البريد." , tips: ["عنوان المأوى يفي بالغرض", "بعض المنظمات غير الربحية تقدم خدمات بريدية للوافدين الجدد", "صناديق البريد في USPS تبدأ من ~30 دولاراً لكل 6 أشهر"] },
    
      fr: { title: "Établir une Adresse Postale", description: "Vous avez besoin d'une adresse aux États-Unis pour recevoir le courrier des agences gouvernementales, des employeurs et des banques.", tips: ["L'adresse d'un refuge convient", "Certaines associations offrent des services postaux aux nouveaux arrivants", "Les boîtes postales à l'USPS commencent à ~30$/6 mois"] },
    
      pt: { title: "Estabelecer um Endereço Postal", description: "Você precisa de um endereço nos EUA para receber correspondências de agências governamentais, empregadores e bancos.", tips: ["O endereço de um abrigo funciona", "Algumas ONGs oferecem serviços postais para recém-chegados", "Caixas postais no USPS a partir de ~$30/6 meses"] },
    
      vi: { title: "Lập Địa Chỉ Nhận Thư", description: "Bạn cần địa chỉ Mỹ để nhận thư từ cơ quan chính phủ, nhà tuyển dụng và ngân hàng.", tips: ["Địa chỉ nơi trú ẩn cũng được", "Một số tổ chức phi lợi nhuận cung cấp dịch vụ nhận thư cho người mới đến", "Hộp thư tại USPS bắt đầu từ ~$30/6 tháng"] },
    
      ko: { title: "우편 주소 설정하기", description: "정부 기관, 고용주, 은행으로부터 우편물을 받으려면 미국 주소가 필요합니다.", tips: ["쉼터 주소도 사용 가능합니다", "일부 비영리 단체에서 신규 이민자를 위한 우편 서비스를 제공합니다", "USPS 사서함은 ~$30/6개월부터 시작합니다"] },
    
      tl: { title: "Magtatag ng Address para sa Koreo", description: "Kailangan mo ng address sa U.S. para makatanggap ng koreo mula sa mga ahensya ng gobyerno, employer, at bangko.", tips: ["Ang address ng shelter ay gumagana", "Ang ilang nonprofit ay nag-aalok ng serbisyo sa koreo para sa mga baguhan", "Ang PO Boxes sa USPS ay nagsisimula sa ~$30/6 buwan"] },
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
      es: { title: "Descarga tu Registro I-94", description: "El I-94 es tu registro oficial de llegada/salida de EE.UU." , tips: ["Es gratis en i94.cbp.dhs.gov", "Lo necesitarás para SSN, beneficios, empleo y licencia de conducir", "Imprime múltiples copias y guárdalas en un lugar seguro"] },
      zh: { title: "下载您的I-94记录", description: "I-94是您在美国的官方入境/出境记录。" , tips: ["在 i94.cbp.dhs.gov 免费获取", "申请 SSN、福利、就业和驾照时都需要", "打印多份并妥善保管"] },
      hi: { title: "अपना I-94 रिकॉर्ड डाउनलोड करें", description: "I-94 आपका आधिकारिक अमेरिका आगमन/प्रस्थान रिकॉर्ड है।" , tips: ["यह i94.cbp.dhs.gov पर मुफ्त है", "SSN, लाभ, रोजगार और ड्राइवर लाइसेंस के लिए इसकी जरूरत होगी", "कई प्रतियां प्रिंट करें और सुरक्षित रखें"] },
      ar: { title: "تنزيل سجل I-94", description: "I-94 هو سجل وصولك/مغادرتك الرسمي." , tips: ["إنه مجاني على i94.cbp.dhs.gov", "ستحتاجه للحصول على SSN والمزايا والتوظيف ورخصة القيادة", "اطبع نسخاً متعددة واحتفظ بها في مكان آمن"] },
    
      fr: { title: "Télécharger votre Dossier I-94", description: "L'I-94 est votre dossier officiel d'arrivée/départ aux États-Unis. Téléchargez-le gratuitement sur le site du CBP.", tips: ["Vous en aurez besoin pour postuler à des emplois, à des avantages sociaux et à des documents", "Disponible sur cbp.dhs.gov/i94", "Conservez une copie imprimée dans un endroit sûr"] },
    
      pt: { title: "Baixar seu Registro I-94", description: "O I-94 é seu registro oficial de chegada/saída nos EUA. Baixe-o gratuitamente no site do CBP.", tips: ["Você precisará dele para empregos, benefícios e documentos", "Disponível em cbp.dhs.gov/i94", "Guarde uma cópia impressa em local seguro"] },
    
      vi: { title: "Tải Hồ Sơ I-94 Của Bạn", description: "I-94 là hồ sơ nhập/xuất cảnh chính thức của bạn tại Mỹ. Tải miễn phí trên trang web CBP.", tips: ["Bạn sẽ cần nó để xin việc, phúc lợi và các giấy tờ khác", "Có tại cbp.dhs.gov/i94", "Giữ một bản in ở nơi an toàn"] },
    
      ko: { title: "I-94 기록 다운로드", description: "I-94는 미국 공식 입출국 기록입니다. CBP 웹사이트에서 무료로 다운로드하세요.", tips: ["취업, 혜택, 서류 신청에 필요합니다", "cbp.dhs.gov/i94에서 이용 가능", "출력본을 안전한 곳에 보관하세요"] },
    
      tl: { title: "I-download ang Iyong I-94 Record", description: "Ang I-94 ay ang iyong opisyal na rekord ng pagdating/pag-alis sa U.S. I-download ito nang libre sa website ng CBP.", tips: ["Kakailanganin mo ito para sa trabaho, benepisyo, at mga dokumento", "Available sa cbp.dhs.gov/i94", "Mag-ingat ng naka-print na kopya sa ligtas na lugar"] },
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
      es: { title: "Asistir a la Orientación Comunitaria", description: "Tu agencia te orientará sobre leyes, cultura y transporte en EE.UU." , tips: ["Pregunta a tu trabajador social por el horario", "Los temas incluyen: transporte, 911, derechos del inquilino y recursos comunitarios", "Toma notas — esta información es crítica"] },
      zh: { title: "参加社区迎新会", description: "安置机构将介绍美国法律、文化、交通等信息。" , tips: ["向您的案件工作人员询问时间安排", "主题包括：交通、911、租户权利和社区资源", "记笔记 — 这些信息至关重要"] },
      hi: { title: "सामुदायिक अभिविन्यास में भाग लें", description: "आपकी एजेंसी अमेरिकी कानूनों और संस्कृति के बारे में मार्गदर्शन देगी।" , tips: ["अपने केसवर्कर से शेड्यूल पूछें", "विषयों में शामिल हैं: परिवहन, 911, किरायेदार अधिकार और सामुदायिक संसाधन", "नोट्स लें — यह जानकारी बेहद जरूरी है"] },
      ar: { title: "حضور التوجيه المجتمعي", description: "ستقدم وكالتك التوجيه حول القوانين والثقافة والنقل." , tips: ["اسأل معالج حالتك عن الجدول الزمني", "تشمل الموضوعات: النقل و911 وحقوق المستأجر والموارد المجتمعية", "دوّن ملاحظات — هذه المعلومات بالغة الأهمية"] },
    
      fr: { title: "Assister à l'Orientation Communautaire", description: "Votre agence de réinstallation vous fournira une orientation sur les lois, la culture, les transports et les ressources américaines.", tips: ["Amenez toute votre famille", "Prenez des notes ou enregistrez avec permission", "Posez des questions — c'est pour ça que ça existe"] },
    
      pt: { title: "Participar da Orientação Comunitária", description: "Sua agência de reassentamento fornecerá orientação sobre leis, cultura, transporte e recursos dos EUA.", tips: ["Traga toda a família", "Faça anotações ou grave com permissão", "Faça perguntas — é para isso que serve"] },
    
      vi: { title: "Tham Dự Buổi Định Hướng Cộng Đồng", description: "Cơ quan tái định cư của bạn sẽ cung cấp hướng dẫn về luật pháp, văn hóa, giao thông và tài nguyên của Mỹ.", tips: ["Mang cả gia đình đến", "Ghi chú hoặc ghi âm khi được phép", "Đặt câu hỏi — đó là mục đích của buổi này"] },
    
      ko: { title: "지역 사회 오리엔테이션 참석", description: "재정착 기관에서 미국의 법률, 문화, 교통, 자원에 대한 안내를 제공합니다.", tips: ["온 가족이 함께 참석하세요", "허락을 받고 메모하거나 녹음하세요", "질문하세요 — 그게 목적입니다"] },
    
      tl: { title: "Dumalo sa Community Orientation", description: "Ang iyong resettlement agency ay magbibigay ng oryentasyon sa mga batas, kultura, transportasyon, at resources ng U.S.", tips: ["Dalhin ang buong pamilya", "Mag-take ng notes o mag-record kung pinapayagan", "Magtanong — para iyon ang nilalayon"] },
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
      es: { title: "Aprender Números de Emergencia (911, 211, 988)", description: "911 para emergencias, 211 para servicios sociales, 988 para crisis de salud mental." , tips: ["911 = policía, bomberos, ambulancia", "211 = encuentra comida, vivienda, empleos y servicios sociales", "988 = línea de crisis de salud mental (disponible en varios idiomas)", "Guarda estos números en tu teléfono inmediatamente"] },
      zh: { title: "学习紧急电话号码 (911, 211, 988)", description: "911报警、211社会服务、988心理健康危机热线。" , tips: ["911 = 警察、消防、救护车", "211 = 寻找食物、住房、工作和社会服务", "988 = 心理健康危机热线（多种语言）", "立即将这些号码存入手机"] },
      hi: { title: "आपातकालीन नंबर सीखें (911, 211, 988)", description: "911 आपातकाल, 211 सामाजिक सेवाएं, 988 मानसिक स्वास्थ्य।" , tips: ["911 = पुलिस, अग्निशमन, एम्बुलेंस", "211 = भोजन, आवास, नौकरियां और सामाजिक सेवाएं खोजें", "988 = मानसिक स्वास्थ्य संकट लाइन (कई भाषाओं में उपलब्ध)", "इन नंबरों को तुरंत अपने फोन में सेव करें"] },
      ar: { title: "تعلم أرقام الطوارئ (911، 211، 988)", description: "911 للطوارئ، 211 للخدمات الاجتماعية، 988 لدعم الأزمات النفسية." , tips: ["911 = شرطة وإطفاء وإسعاف", "211 = ابحث عن الطعام والإسكان والوظائف والخدمات الاجتماعية", "988 = خط أزمات الصحة النفسية (متاح بلغات عديدة)", "احفظ هذه الأرقام في هاتفك فوراً"] },
    
      fr: { title: "Apprendre les Numéros d'Urgence (911, 211, 988)", description: "Le 911 est pour les urgences, le 211 pour les services sociaux, le 988 pour la santé mentale.", tips: ["Ces appels sont gratuits depuis n'importe quel téléphone", "Le 911 dispose de services d'interprétation", "Enregistrez ces numéros maintenant"] },
    
      pt: { title: "Aprender os Números de Emergência (911, 211, 988)", description: "911 é para emergências, 211 para serviços sociais, 988 para saúde mental.", tips: ["Essas ligações são gratuitas de qualquer telefone", "O 911 tem serviços de interpretação", "Salve esses números agora"] },
    
      vi: { title: "Học Số Điện Thoại Khẩn Cấp (911, 211, 988)", description: "911 là cho khẩn cấp, 211 cho dịch vụ xã hội, 988 cho sức khỏe tâm thần.", tips: ["Các cuộc gọi này miễn phí từ bất kỳ điện thoại nào", "911 có dịch vụ thông dịch", "Lưu các số này ngay bây giờ"] },
    
      ko: { title: "긴급 번호 익히기 (911, 211, 988)", description: "911은 응급상황, 211은 사회 서비스, 988은 정신 건강을 위한 번호입니다.", tips: ["어떤 전화기에서도 무료로 이용 가능", "911에는 통역 서비스가 있습니다", "지금 바로 번호를 저장하세요"] },
    
      tl: { title: "Matutunan ang mga Emergency Number (911, 211, 988)", description: "Ang 911 ay para sa emergency, 211 para sa social services, 988 para sa mental health.", tips: ["Ang mga tawag na ito ay libre mula sa anumang telepono", "Ang 911 ay may serbisyo ng interpreter", "I-save ang mga numerong ito ngayon"] },
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
      es: { title: "Solicitar Número de Seguro Social (SSN)", description: "Un SSN es necesario para trabajar, pagar impuestos y muchos beneficios." , tips: ["Espera al menos 10 días después de llegar antes de solicitar", "Encuentra tu oficina local del SSA en ssa.gov/locator", "Es gratis — nunca pagues a nadie para ayudarte a solicitar", "El procesamiento tarda 2-4 semanas"] },
      zh: { title: "申请社会安全号码 (SSN)", description: "SSN是工作、纳税和许多福利所必需的。" , tips: ["到达后至少等待 10 天再申请", "在 ssa.gov/locator 查找当地 SSA 办公室", "免费 — 永远不要付钱给任何人帮您申请", "处理需要 2-4 周"] },
      hi: { title: "सामाजिक सुरक्षा संख्या (SSN) के लिए आवेदन करें", description: "काम, कर और कई लाभों के लिए SSN की ज़रूरत है।" , tips: ["आवेदन करने से पहले कम से कम 10 दिन प्रतीक्षा करें", "ssa.gov/locator पर अपना स्थानीय SSA कार्यालय खोजें", "यह मुफ्त है — आवेदन में मदद के लिए कभी भुगतान न करें", "प्रसंस्करण में 2-4 सप्ताह लगते हैं"] },
      ar: { title: "التقدم للحصول على رقم الضمان الاجتماعي", description: "رقم الضمان الاجتماعي مطلوب للعمل والضرائب." , tips: ["انتظر 10 أيام على الأقل بعد الوصول قبل التقديم", "ابحث عن مكتب SSA المحلي على ssa.gov/locator", "إنه مجاني — لا تدفع لأحد أبداً لمساعدتك في التقديم", "تستغرق المعالجة من 2 إلى 4 أسابيع"] },
    
      fr: { title: "Demander un Numéro de Sécurité Sociale (SSN)", description: "Le SSN est nécessaire pour travailler légalement, ouvrir un compte bancaire et accéder aux avantages sociaux.", tips: ["Apportez votre passeport, visa et I-94", "Rendez-vous au bureau de la Sécurité Sociale le plus proche", "Il faut généralement 2 semaines pour recevoir votre carte"] },
    
      pt: { title: "Solicitar Número de Seguro Social (SSN)", description: "O SSN é necessário para trabalhar legalmente, abrir conta bancária e acessar benefícios.", tips: ["Leve seu passaporte, visto e I-94", "Vá ao escritório do Seguro Social mais próximo", "Geralmente leva 2 semanas para receber o cartão"] },
    
      vi: { title: "Xin Số An Sinh Xã Hội (SSN)", description: "SSN cần thiết để làm việc hợp pháp, mở tài khoản ngân hàng và nhận phúc lợi.", tips: ["Mang theo hộ chiếu, thị thực và I-94", "Đến văn phòng An Sinh Xã Hội gần nhất", "Thường mất 2 tuần để nhận thẻ"] },
    
      ko: { title: "사회보장번호(SSN) 신청", description: "SSN은 합법적으로 일하고, 은행 계좌를 열고, 혜택을 받는 데 필요합니다.", tips: ["여권, 비자, I-94를 지참하세요", "가까운 사회보장국에 방문하세요", "카드 수령까지 보통 2주 소요"] },
    
      tl: { title: "Mag-apply para sa Social Security Number (SSN)", description: "Ang SSN ay kailangan para sa legal na trabaho, pagbubukas ng bank account, at pag-access ng mga benepisyo.", tips: ["Dalhin ang iyong pasaporte, visa, at I-94", "Pumunta sa pinakamalapit na Social Security office", "Karaniwang 2 linggo bago matanggap ang iyong card"] },
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
      es: { title: "Abrir una Cuenta Bancaria", description: "No necesitas SSN para abrir una cuenta bancaria." , tips: ["La CFPB confirma: NO necesitas SSN para abrir una cuenta", "Las cooperativas de crédito suelen tener comisiones más bajas", "Busca cuentas sin saldo mínimo", "Configura el depósito directo tan pronto como tengas ingresos"] },
      zh: { title: "开设银行账户", description: "开设银行账户不需要SSN。" , tips: ["消费者金融保护局确认：开户无需 SSN", "信用合作社通常手续费较低", "寻找无最低余额要求的账户", "一有收入就设置自动存款"] },
      hi: { title: "बैंक खाता खोलें", description: "बैंक खाता खोलने के लिए SSN की ज़रूरत नहीं है।" , tips: ["CFPB पुष्टि करता है: खाता खोलने के लिए SSN की जरूरत नहीं", "क्रेडिट यूनियन में अक्सर कम शुल्क होते हैं", "न्यूनतम शेष राशि के बिना खाते खोजें", "जैसे ही आमदनी हो, डायरेक्ट डिपॉजिट सेट करें"] },
      ar: { title: "فتح حساب مصرفي", description: "لا تحتاج إلى SSN لفتح حساب مصرفي." , tips: ["تؤكد CFPB: لا تحتاج إلى SSN لفتح حساب", "الاتحادات الائتمانية غالباً ما تكون رسومها أقل", "ابحث عن حسابات بدون حد أدنى للرصيد", "قم بإعداد الإيداع المباشر بمجرد حصولك على دخل"] },
    
      fr: { title: "Ouvrir un Compte Bancaire", description: "Un compte bancaire est nécessaire pour recevoir un salaire, payer des factures et stocker de l'argent en toute sécurité.", tips: ["Recherchez des banques proposant des comptes sans frais", "Les coopératives de crédit acceptent souvent des pièces d'identité étrangères", "Apportez votre passeport et preuve d'adresse"] },
    
      pt: { title: "Abrir uma Conta Bancária", description: "Uma conta bancária é necessária para receber salário, pagar contas e guardar dinheiro com segurança.", tips: ["Procure bancos com contas sem tarifas", "Cooperativas de crédito frequentemente aceitam documentos estrangeiros", "Leve passaporte e comprovante de endereço"] },
    
      vi: { title: "Mở Tài Khoản Ngân Hàng", description: "Tài khoản ngân hàng cần thiết để nhận lương, trả hóa đơn và giữ tiền an toàn.", tips: ["Tìm ngân hàng có tài khoản miễn phí", "Liên minh tín dụng thường chấp nhận giấy tờ nước ngoài", "Mang theo hộ chiếu và bằng chứng địa chỉ"] },
    
      ko: { title: "은행 계좌 개설", description: "은행 계좌는 급여 수령, 청구서 납부, 안전한 저축에 필요합니다.", tips: ["수수료 없는 계좌를 제공하는 은행을 찾으세요", "신용조합은 종종 외국 신분증을 수락합니다", "여권과 주소 증명서를 지참하세요"] },
    
      tl: { title: "Magbukas ng Bank Account", description: "Ang bank account ay kailangan para matanggap ang sahod, magbayad ng bills, at mag-ipon ng pera nang ligtas.", tips: ["Maghanap ng mga bangko na may libreng account", "Ang credit unions ay madalas tumatanggap ng foreign ID", "Dalhin ang pasaporte at patunay ng address"] },
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
      es: { title: "Completar la Evaluación de Salud Inicial", description: "Se requiere un examen médico dentro de los primeros 30 días." , tips: ["Los departamentos de salud locales generalmente realizan esto gratis", "Lleva cualquier historial médico de tu país de origen", "Esto es independiente de obtener seguro médico"] },
      zh: { title: "完成初步健康筛查", description: "抵达后30天内须完成健康筛查。" , tips: ["当地卫生部门通常免费提供这些服务", "带上原籍国的任何医疗记录", "这与获得健康保险是分开的"] },
      hi: { title: "प्रारंभिक स्वास्थ्य जांच पूरी करें", description: "आगमन के 30 दिनों के भीतर स्वास्थ्य जांच आवश्यक है।" , tips: ["स्थानीय स्वास्थ्य विभाग आमतौर पर यह मुफ्त में करते हैं", "अपने देश के किसी भी चिकित्सा रिकॉर्ड लाएं", "यह स्वास्थ्य बीमा प्राप्त करने से अलग है"] },
      ar: { title: "إكمال الفحص الطبي الأولي", description: "الفحص الطبي مطلوب خلال 30 يومًا من الوصول." , tips: ["تجري أقسام الصحة المحلية هذه الفحوصات عادةً مجاناً", "احضر أي سجلات طبية من بلدك الأصلي", "هذا منفصل عن الحصول على تأمين صحي"] },
    
      fr: { title: "Effectuer le Bilan de Santé Initial", description: "Un bilan de santé complet est requis dans les 90 jours et souvent couvert par votre assurance de réinstallation.", tips: ["Apportez tous les dossiers médicaux disponibles", "Informez le médecin de vos vaccinations antérieures", "Des services d'interprétation sont disponibles"] },
    
      pt: { title: "Realizar Triagem de Saúde Inicial", description: "Um exame de saúde completo é necessário nos primeiros 90 dias e frequentemente coberto pelo seu seguro de reassentamento.", tips: ["Leve todos os registros médicos disponíveis", "Informe ao médico sobre vacinações anteriores", "Serviços de interpretação estão disponíveis"] },
    
      vi: { title: "Hoàn Thành Kiểm Tra Sức Khỏe Ban Đầu", description: "Khám sức khỏe toàn diện cần được thực hiện trong 90 ngày và thường được bảo hiểm tái định cư chi trả.", tips: ["Mang theo tất cả hồ sơ y tế sẵn có", "Thông báo cho bác sĩ về các lần tiêm chủng trước đây", "Có dịch vụ thông dịch"] },
    
      ko: { title: "초기 건강 검진 완료", description: "전면적인 건강 검진은 90일 이내에 필요하며 재정착 보험으로 대부분 커버됩니다.", tips: ["가능한 모든 의료 기록을 지참하세요", "이전 예방접종 내역을 의사에게 알려주세요", "통역 서비스 이용 가능"] },
    
      tl: { title: "Kumpletuhin ang Initial Health Screening", description: "Ang kompletong health check-up ay kinakailangan sa loob ng 90 araw at madalas na sinasaklaw ng iyong resettlement insurance.", tips: ["Dalhin ang lahat ng available na medikal na rekord", "Ipaalam sa doktor ang tungkol sa nakaraang bakuna", "Available ang mga serbisyo ng interpreter"] },
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
      es: { title: "Inscribirse en Seguro Médico", description: "Los inmigrantes pueden calificar para cobertura del Marketplace." , tips: ["Visita healthcare.gov/immigrants para ver opciones", "Puede que califiques para subsidios", "Mudarse a EE.UU. = Período de Inscripción Especial (60 días)", "Navegadores gratuitos en healthcare.gov/find-assistance"] },
      zh: { title: "注册医疗保险", description: "合法在美移民可能有资格获得市场保险。" , tips: ["访问 healthcare.gov/immigrants 了解选项", "您可能有资格获得补贴", "移居美国 = 特殊注册期（60 天）", "healthcare.gov/find-assistance 提供免费导航员"] },
      hi: { title: "स्वास्थ्य बीमा में नामांकन करें", description: "आप्रवासी मार्केटप्लेस कवरेज के लिए अर्हता प्राप्त कर सकते हैं।" , tips: ["विकल्पों के लिए healthcare.gov/immigrants पर जाएं", "आप सब्सिडी के लिए पात्र हो सकते हैं", "अमेरिका जाना = विशेष नामांकन अवधि (60 दिन)", "healthcare.gov/find-assistance पर मुफ्त नेविगेटर"] },
      ar: { title: "التسجيل في التأمين الصحي", description: "قد يكون المهاجرون مؤهلين للتغطية التأمينية." , tips: ["قم بزيارة healthcare.gov/immigrants للاطلاع على الخيارات", "قد تكون مؤهلاً للحصول على دعم مالي", "الانتقال إلى الولايات المتحدة = فترة تسجيل خاصة (60 يوماً)", "مرشدون مجانيون على healthcare.gov/find-assistance"] },
    
      fr: { title: "S'inscrire à une Assurance Maladie", description: "Une couverture santé est essentielle. Les réfugiés sont souvent éligibles à Medicaid ou au programme d'assurance de réinstallation.", tips: ["Inscrivez-vous dans les 30 jours suivant votre arrivée", "Les enfants sont éligibles à CHIP", "Votre agence peut vous aider à vous inscrire"] },
    
      pt: { title: "Inscrever-se no Plano de Saúde", description: "Cobertura de saúde é essencial. Refugiados frequentemente são elegíveis para Medicaid ou programa de seguro de reassentamento.", tips: ["Inscreva-se nos primeiros 30 dias após a chegada", "Crianças são elegíveis para CHIP", "Sua agência pode ajudar na inscrição"] },
    
      vi: { title: "Đăng Ký Bảo Hiểm Y Tế", description: "Bảo hiểm y tế rất cần thiết. Người tị nạn thường đủ điều kiện cho Medicaid hoặc chương trình bảo hiểm tái định cư.", tips: ["Đăng ký trong vòng 30 ngày kể từ khi đến", "Trẻ em đủ điều kiện nhận CHIP", "Cơ quan của bạn có thể giúp đăng ký"] },
    
      ko: { title: "건강 보험 등록", description: "의료 보험은 필수입니다. 난민은 종종 Medicaid 또는 재정착 보험 프로그램 자격이 됩니다.", tips: ["도착 후 30일 이내에 등록하세요", "어린이는 CHIP 자격이 됩니다", "담당 기관에서 등록을 도울 수 있습니다"] },
    
      tl: { title: "Mag-enroll sa Health Insurance", description: "Ang health coverage ay mahalaga. Ang mga refugee ay madalas na karapat-dapat sa Medicaid o programa ng resettlement insurance.", tips: ["Mag-enroll sa loob ng 30 araw pagdating", "Ang mga bata ay karapat-dapat sa CHIP", "Ang iyong ahensya ay makakatulong sa pag-enroll"] },
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
      es: { title: "Inscribir a los Niños en la Escuela", description: "Todos los niños tienen derecho a educación pública gratuita." , tips: ["Las escuelas no pueden preguntar sobre el estatus migratorio", "Contacta la oficina de tu distrito escolar local", "La asistencia lingüística debe proporcionarse por ley", "Puede haber comidas escolares gratuitas (solicita en la escuela)"] },
      zh: { title: "为孩子办理入学", description: "所有儿童都有权接受免费公共教育。" , tips: ["学校不能询问移民身份", "联系当地学区办公室", "法律要求必须提供语言协助", "可能有免费学校餐（在学校申请）"] },
      hi: { title: "बच्चों को स्कूल में दाखिल कराएं", description: "सभी बच्चों को मुफ़्त सार्वजनिक शिक्षा का अधिकार है।" , tips: ["स्कूल आव्रजन स्थिति के बारे में नहीं पूछ सकते", "अपने स्थानीय स्कूल जिला कार्यालय से संपर्क करें", "कानून द्वारा भाषा सहायता प्रदान की जानी चाहिए", "मुफ्त स्कूल भोजन उपलब्ध हो सकता है (स्कूल में आवेदन करें)"] },
      ar: { title: "تسجيل الأطفال في المدرسة", description: "جميع الأطفال لهم الحق في التعليم العام المجاني." , tips: ["لا يمكن للمدارس الاستفسار عن الوضع الهجري", "اتصل بمكتب منطقتك التعليمية المحلية", "يجب توفير المساعدة اللغوية بموجب القانون", "قد تتوفر وجبات مدرسية مجانية (قدّم طلباً في المدرسة)"] },
    
      fr: { title: "Inscrire les Enfants à l'École", description: "L'éducation publique est gratuite et obligatoire pour les enfants de 5 à 18 ans aux États-Unis.", tips: ["Apportez les dossiers scolaires précédents si disponibles", "Les vaccinations sont généralement requises", "Des services ESL sont disponibles dans la plupart des écoles"] },
    
      pt: { title: "Matricular Crianças na Escola", description: "A educação pública é gratuita e obrigatória para crianças de 5 a 18 anos nos EUA.", tips: ["Traga registros escolares anteriores, se disponíveis", "Vacinações geralmente são necessárias", "Serviços de ESL estão disponíveis na maioria das escolas"] },
    
      vi: { title: "Đăng Ký Cho Trẻ Đi Học", description: "Giáo dục công lập miễn phí và bắt buộc cho trẻ em từ 5 đến 18 tuổi tại Mỹ.", tips: ["Mang theo hồ sơ học bạ cũ nếu có", "Thường cần giấy chứng nhận tiêm chủng", "Hầu hết các trường đều có dịch vụ ESL"] },
    
      ko: { title: "자녀 학교 등록", description: "미국의 공교육은 5-18세 어린이에게 무료이며 의무입니다.", tips: ["이전 학교 기록이 있으면 지참하세요", "예방접종이 일반적으로 필요합니다", "대부분의 학교에 ESL 서비스가 있습니다"] },
    
      tl: { title: "Mag-enroll ng mga Bata sa Paaralan", description: "Ang pampublikong edukasyon ay libre at sapilitan para sa mga batang 5-18 taong gulang sa U.S.", tips: ["Dalhin ang nakaraang mga rekord sa paaralan kung available", "Karaniwang kailangan ang mga bakuna", "Available ang mga serbisyo ng ESL sa karamihan ng mga paaralan"] },
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
      es: { title: "Inscribirse en Clases de Inglés (ESL)", description: "Las clases de inglés son cruciales para la integración y el empleo." , tips: ["Revisa tu biblioteca pública local para clases gratuitas", "Los colegios comunitarios ofrecen ESL a bajo costo", "En línea: USALearns.org es gratuito", "Muchas agencias de reasentamiento ofrecen sus propios programas de ESL"] },
      zh: { title: "报名参加ESL英语课程", description: "英语课程对融入社会和就业至关重要。" , tips: ["查看当地公共图书馆的免费课程", "社区学院提供低成本 ESL", "在线：USALearns.org 是免费的", "许多安置机构提供自己的 ESL 项目"] },
      hi: { title: "ESL/अंग्रेजी कक्षाओं में दाखिला लें", description: "अंग्रेजी कक्षाएं एकीकरण और रोजगार के लिए महत्वपूर्ण हैं।" , tips: ["मुफ्त कक्षाओं के लिए अपनी स्थानीय पुस्तकालय देखें", "कम्युनिटी कॉलेज कम लागत पर ESL प्रदान करते हैं", "ऑनलाइन: USALearns.org मुफ्त है", "कई पुनर्वास एजेंसियां अपने ESL कार्यक्रम चलाती हैं"] },
      ar: { title: "التسجيل في فصول اللغة الإنجليزية", description: "فصول ESL ضرورية للاندماج والتوظيف." , tips: ["تحقق من مكتبتك العامة المحلية للفصول المجانية", "تقدم كليات المجتمع ESL بتكلفة منخفضة", "عبر الإنترنت: USALearns.org مجاني", "كثير من وكالات إعادة التوطين تقدم برامج ESL خاصة بها"] },
    
      fr: { title: "S'inscrire aux Cours d'Anglais (ESL)", description: "L'anglais est la clé de l'emploi, de l'accès aux services et de l'intégration. Les cours ESL sont souvent gratuits.", tips: ["Vérifiez les bibliothèques locales, les centres communautaires et les écoles pour adultes", "Les cours en ligne sont disponibles à tout moment", "Des cours pour enfants sont souvent proposés simultanément"] },
    
      pt: { title: "Matricular-se em Aulas de Inglês (ESL)", description: "O inglês é a chave para emprego, acesso a serviços e integração. Aulas de ESL geralmente são gratuitas.", tips: ["Verifique bibliotecas locais, centros comunitários e escolas para adultos", "Aulas online estão disponíveis a qualquer hora", "Frequentemente são oferecidas aulas para crianças simultaneamente"] },
    
      vi: { title: "Đăng Ký Lớp Tiếng Anh (ESL)", description: "Tiếng Anh là chìa khóa để có việc làm, tiếp cận dịch vụ và hội nhập. Lớp ESL thường miễn phí.", tips: ["Kiểm tra thư viện địa phương, trung tâm cộng đồng và trường học người lớn", "Lớp học trực tuyến có thể tham gia bất cứ lúc nào", "Thường có lớp dành cho trẻ em cùng lúc"] },
    
      ko: { title: "영어 수업(ESL) 등록", description: "영어는 취업, 서비스 이용, 통합의 열쇠입니다. ESL 수업은 종종 무료입니다.", tips: ["지역 도서관, 커뮤니티 센터, 성인 학교를 확인하세요", "온라인 수업은 언제든지 이용 가능", "어린이를 위한 수업도 동시에 제공되는 경우가 많습니다"] },
    
      tl: { title: "Mag-enroll sa ESL / English Classes", description: "Ang Ingles ay susi sa trabaho, access sa serbisyo, at pagsasama. Ang mga klase ng ESL ay madalas na libre.", tips: ["Tingnan ang mga lokal na library, community center, at adult school", "Ang mga online na klase ay available anumang oras", "Madalas na may mga klase para sa mga bata nang sabay-sabay"] },
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
      es: { title: "Solicitar SNAP (Asistencia Alimentaria)", description: "SNAP proporciona dinero en una tarjeta EBT para comprar alimentos." , tips: ["Solicita en tu oficina local de SNAP o en línea", "Los beneficios se cargan mensualmente a una tarjeta EBT", "Los refugiados son elegibles de inmediato", "Otros estatus pueden tener un período de espera de 5 años — consulta con tu trabajador social"] },
      zh: { title: "申请SNAP（食品援助）", description: "SNAP在EBT卡上提供购买杂货的资金。" , tips: ["在当地 SNAP 办公室或在线申请", "福利每月加载到 EBT 卡", "难民立即有资格", "其他身份可能有 5 年等待期 — 向案件工作人员咨询"] },
      hi: { title: "SNAP (खाद्य सहायता) के लिए आवेदन करें", description: "SNAP किराने का सामान खरीदने के लिए EBT कार्ड पर पैसे देता है।" , tips: ["अपने स्थानीय SNAP कार्यालय या ऑनलाइन आवेदन करें", "लाभ मासिक रूप से EBT कार्ड में लोड होते हैं", "शरणार्थी तुरंत पात्र हैं", "अन्य स्थिति में 5 साल की प्रतीक्षा अवधि हो सकती है — केसवर्कर से पूछें"] },
      ar: { title: "التقدم للحصول على SNAP (مساعدة الغذاء)", description: "يوفر SNAP أموالاً على بطاقة EBT لشراء البقالة." , tips: ["قدّم طلباً في مكتب SNAP المحلي أو عبر الإنترنت", "يتم تحميل المزايا شهرياً على بطاقة EBT", "اللاجئون مؤهلون فوراً", "قد تكون هناك فترة انتظار 5 سنوات لأوضاع أخرى — تحقق مع معالج حالتك"] },
    
      fr: { title: "Demander le SNAP (Aide Alimentaire)", description: "Le SNAP fournit des fonds mensuels pour acheter de la nourriture. Les réfugiés sont généralement éligibles immédiatement.", tips: ["Postulez dans les 30 jours suivant votre arrivée pour une aide rétroactive", "Les fonds sont chargés sur une carte EBT", "Couvre fruits, légumes, viande, produits laitiers et pain"] },
    
      pt: { title: "Solicitar SNAP (Assistência Alimentar)", description: "O SNAP fornece fundos mensais para comprar alimentos. Refugiados geralmente são elegíveis imediatamente.", tips: ["Inscreva-se nos primeiros 30 dias para assistência retroativa", "Os fundos são carregados em um cartão EBT", "Cobre frutas, vegetais, carne, laticínios e pão"] },
    
      vi: { title: "Xin SNAP (Hỗ Trợ Thực Phẩm)", description: "SNAP cung cấp tiền hàng tháng để mua thực phẩm. Người tị nạn thường đủ điều kiện ngay lập tức.", tips: ["Nộp đơn trong 30 ngày đầu để được hỗ trợ hồi tố", "Tiền được nạp vào thẻ EBT", "Bao gồm rau quả, thịt, sữa và bánh mì"] },
    
      ko: { title: "SNAP (식품 지원) 신청", description: "SNAP은 식품 구매를 위한 월별 자금을 제공합니다. 난민은 보통 즉시 자격이 됩니다.", tips: ["소급 지원을 위해 30일 이내에 신청하세요", "자금은 EBT 카드에 충전됩니다", "과일, 채소, 육류, 유제품, 빵 포함"] },
    
      tl: { title: "Mag-apply para sa SNAP (Tulong sa Pagkain)", description: "Ang SNAP ay nagbibigay ng buwanang pondo para bumili ng pagkain. Ang mga refugee ay karaniwang karapat-dapat agad.", tips: ["Mag-apply sa loob ng 30 araw para sa retroactive na tulong", "Ang pondo ay nilo-load sa EBT card", "Sumasaklaw ng prutas, gulay, karne, gatas, at tinapay"] },
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
      es: { title: "Solicitar Asistencia en Efectivo para Refugiados (RCA)", description: "RCA proporciona asistencia mensual en efectivo a refugiados." , tips: ["Disponible para refugiados, asilados y ciertos otros estatus", "Dura hasta 8 meses", "Solicita a través de tu agencia de reasentamiento local", "Se puede combinar con SNAP y Medicaid"] },
      zh: { title: "申请难民现金援助 (RCA)", description: "RCA为难民提供每月现金援助，可用8个月。" , tips: ["适用于难民、难民身份者和某些其他身份", "持续最多 8 个月", "通过当地安置机构申请", "可与 SNAP 和 Medicaid 结合使用"] },
      hi: { title: "शरणार्थी नकद सहायता (RCA) के लिए आवेदन करें", description: "RCA शरणार्थियों को मासिक नकद सहायता प्रदान करता है।" , tips: ["शरणार्थियों, शरण प्राप्तकर्ताओं और कुछ अन्य स्थितियों के लिए उपलब्ध", "8 महीने तक चलता है", "अपनी स्थानीय पुनर्वास एजेंसी के माध्यम से आवेदन करें", "SNAP और Medicaid के साथ जोड़ा जा सकता है"] },
      ar: { title: "التقدم للحصول على المساعدة النقدية للاجئين (RCA)", description: "يوفر RCA مساعدة نقدية شهرية للاجئين." , tips: ["متاح للاجئين وطالبي اللجوء وبعض الأوضاع الأخرى", "يستمر حتى 8 أشهر", "قدّم طلباً عبر وكالة إعادة التوطين المحلية", "يمكن دمجه مع SNAP وMedicaid"] },
    
      fr: { title: "Demander l'Aide en Espèces pour Réfugiés (RCA)", description: "Le RCA fournit une aide financière mensuelle pendant les 8 premiers mois aux réfugiés qui ne sont pas éligibles aux programmes d'aide sociale ordinaires.", tips: ["Postulez immédiatement — les fonds sont limités dans le temps", "Votre agence de réinstallation gère les demandes", "Peut être utilisé pour le loyer, les services publics, les transports"] },
    
      pt: { title: "Solicitar Assistência em Dinheiro para Refugiados (RCA)", description: "O RCA fornece assistência financeira mensal nos primeiros 8 meses para refugiados que não são elegíveis para programas de bem-estar regular.", tips: ["Inscreva-se imediatamente — os fundos têm prazo limitado", "Sua agência de reassentamento gerencia as inscrições", "Pode ser usado para aluguel, serviços públicos, transporte"] },
    
      vi: { title: "Xin Hỗ Trợ Tiền Mặt Cho Người Tị Nạn (RCA)", description: "RCA cung cấp hỗ trợ tài chính hàng tháng trong 8 tháng đầu cho người tị nạn không đủ điều kiện các chương trình phúc lợi thông thường.", tips: ["Nộp đơn ngay lập tức — nguồn quỹ có giới hạn thời gian", "Cơ quan tái định cư của bạn quản lý các đơn đăng ký", "Có thể dùng cho tiền thuê nhà, điện nước, đi lại"] },
    
      ko: { title: "난민 현금 지원(RCA) 신청", description: "RCA는 일반 복지 프로그램 자격이 없는 난민에게 처음 8개월간 월별 재정 지원을 제공합니다.", tips: ["즉시 신청하세요 — 자금은 기간이 제한되어 있습니다", "담당 재정착 기관이 신청을 관리합니다", "임대료, 공과금, 교통비에 사용 가능"] },
    
      tl: { title: "Mag-apply para sa Refugee Cash Assistance (RCA)", description: "Ang RCA ay nagbibigay ng buwanang tulong pinansyal sa loob ng unang 8 buwan para sa mga refugee na hindi karapat-dapat sa regular na welfare programs.", tips: ["Mag-apply agad — limitado ang oras ng pondo", "Ang iyong resettlement agency ang namamahala ng mga aplikasyon", "Maaaring gamitin para sa upa, utility, transportasyon"] },
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
      es: { title: "Solicitar Medicaid / CHIP", description: "Medicaid ofrece seguro médico gratuito o de bajo costo." , tips: ["Muchos estados cubren a mujeres embarazadas y niños independientemente del estatus", "Los refugiados califican de inmediato para Asistencia Médica para Refugiados", "El Medicaid de emergencia está disponible independientemente del estatus", "Solicita en la oficina de Medicaid de tu estado"] },
      zh: { title: "申请Medicaid / CHIP", description: "Medicaid提供免费或低成本医疗保险。" , tips: ["许多州无论身份如何都覆盖孕妇和儿童", "难民立即有资格获得难民医疗援助", "无论身份如何都可享受紧急 Medicaid", "通过州 Medicaid 办公室申请"] },
      hi: { title: "Medicaid / CHIP के लिए आवेदन करें", description: "Medicaid मुफ़्त या कम लागत का स्वास्थ्य बीमा प्रदान करता है।" , tips: ["कई राज्य स्थिति की परवाह किए बिना गर्भवती महिलाओं और बच्चों को कवर करते हैं", "शरणार्थी तुरंत शरणार्थी चिकित्सा सहायता के लिए पात्र हैं", "स्थिति की परवाह किए बिना आपातकालीन Medicaid उपलब्ध है", "अपने राज्य के Medicaid कार्यालय के माध्यम से आवेदन करें"] },
      ar: { title: "التقدم للحصول على Medicaid / CHIP", description: "يوفر Medicaid تأميناً صحياً مجانياً أو منخفض التكلفة." , tips: ["كثير من الولايات تغطي النساء الحوامل والأطفال بصرف النظر عن الوضع", "اللاجئون مؤهلون فوراً للمساعدة الطبية للاجئين", "Medicaid الطارئ متاح بصرف النظر عن الوضع", "قدّم طلباً عبر مكتب Medicaid في ولايتك"] },
    
      fr: { title: "Demander Medicaid / CHIP", description: "Medicaid est une assurance maladie gratuite ou à faible coût pour les familles à faibles revenus. CHIP couvre les enfants.", tips: ["Les réfugiés sont généralement éligibles immédiatement", "Couvre les visites chez le médecin, les médicaments et les hospitalisations", "Postulez auprès de votre bureau local des services sociaux"] },
    
      pt: { title: "Solicitar Medicaid / CHIP", description: "Medicaid é seguro de saúde gratuito ou de baixo custo para famílias de baixa renda. CHIP cobre crianças.", tips: ["Refugiados geralmente são elegíveis imediatamente", "Cobre consultas médicas, medicamentos e hospitalização", "Inscreva-se no escritório local de serviços sociais"] },
    
      vi: { title: "Xin Medicaid / CHIP", description: "Medicaid là bảo hiểm y tế miễn phí hoặc chi phí thấp cho các gia đình thu nhập thấp. CHIP bao gồm trẻ em.", tips: ["Người tị nạn thường đủ điều kiện ngay lập tức", "Bao gồm khám bác sĩ, thuốc và nhập viện", "Nộp đơn tại văn phòng dịch vụ xã hội địa phương"] },
    
      ko: { title: "Medicaid / CHIP 신청", description: "Medicaid는 저소득 가정을 위한 무료 또는 저비용 건강 보험입니다. CHIP은 어린이를 커버합니다.", tips: ["난민은 보통 즉시 자격이 됩니다", "의사 방문, 약물, 입원 포함", "지역 사회복지 사무소에서 신청하세요"] },
    
      tl: { title: "Mag-apply para sa Medicaid / CHIP", description: "Ang Medicaid ay libreng o mababang gastos na health insurance para sa mga pamilyang may mababang kita. Ang CHIP ay sumasaklaw sa mga bata.", tips: ["Ang mga refugee ay karaniwang karapat-dapat agad", "Sumasaklaw ng mga pagbisita sa doktor, gamot, at ospital", "Mag-apply sa lokal na social services office"] },
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
      es: { title: "WIC — Alimentos para Mujeres, Bebés y Niños", description: "WIC proporciona alimentos gratuitos para madres y niños menores de 5." , tips: ["Los inmigrantes con presencia legal califican", "Disponible independientemente del estatus de SSN", "Encuentra la clínica WIC local en wiclocator.fns.usda.gov", "Proporciona vales para leche, huevos, cereales, fórmula infantil y más"] },
      zh: { title: "WIC — 妇女、婴幼儿食品援助", description: "WIC为孕妇和5岁以下儿童提供免费食品。" , tips: ["合法居留的移民有资格", "无论 SSN 状态如何均可获得", "在 wiclocator.fns.usda.gov 查找当地 WIC 诊所", "提供牛奶、鸡蛋、谷物、婴儿配方奶粉等代金券"] },
      hi: { title: "WIC — महिलाओं, शिशुओं और बच्चों के लिए भोजन", description: "WIC गर्भवती महिलाओं और 5 साल से कम बच्चों को मुफ़्त खाना देता है।" , tips: ["कानूनी रूप से मौजूद आप्रवासी पात्र हैं", "SSN स्थिति की परवाह किए बिना उपलब्ध है", "wiclocator.fns.usda.gov पर स्थानीय WIC क्लिनिक खोजें", "दूध, अंडे, अनाज, शिशु फार्मूला और अधिक के लिए वाउचर प्रदान करता है"] },
      ar: { title: "WIC — غذاء للنساء والرضع والأطفال", description: "يوفر WIC غذاءً مجانياً للحوامل والأطفال دون 5 سنوات." , tips: ["المهاجرون الحاضرون قانونياً مؤهلون", "متاح بصرف النظر عن وضع SSN", "ابحث عن عيادة WIC المحلية على wiclocator.fns.usda.gov", "يوفر قسائم للحليب والبيض والحبوب وحليب الأطفال والمزيد"] },
    
      fr: { title: "WIC — Alimentation pour Femmes, Nourrissons et Enfants", description: "Le WIC fournit des aliments nutritifs, des soins de santé et du soutien aux femmes enceintes, aux nouvelles mères et aux enfants jusqu'à 5 ans.", tips: ["Admissibilité basée sur le revenu — la plupart des familles de réfugiés sont éligibles", "Fournit du lait, des céréales, des légumes, du fromage et des préparations pour nourrissons", "Couvre également les soins prénatals"] },
    
      pt: { title: "WIC — Alimentos para Mulheres, Bebês e Crianças", description: "O WIC fornece alimentos nutritivos, cuidados de saúde e suporte para mulheres grávidas, novas mães e crianças até 5 anos.", tips: ["Elegibilidade baseada em renda — a maioria das famílias refugiadas é elegível", "Fornece leite, cereais, vegetais, queijo e fórmula infantil", "Também cobre cuidados pré-natais"] },
    
      vi: { title: "WIC — Thực Phẩm Cho Phụ Nữ, Trẻ Sơ Sinh & Trẻ Em", description: "WIC cung cấp thực phẩm dinh dưỡng, chăm sóc sức khỏe và hỗ trợ cho phụ nữ mang thai, bà mẹ mới sinh và trẻ em đến 5 tuổi.", tips: ["Đủ điều kiện dựa trên thu nhập — hầu hết gia đình tị nạn đều đủ điều kiện", "Cung cấp sữa, ngũ cốc, rau quả, phô mai và sữa công thức", "Cũng bao gồm chăm sóc trước sinh"] },
    
      ko: { title: "WIC — 여성, 영아 및 아동 식품 지원", description: "WIC은 임산부, 새 어머니, 5세 미만 어린이에게 영양 식품, 건강 관리, 지원을 제공합니다.", tips: ["소득 기반 자격 — 대부분의 난민 가정이 자격이 됩니다", "우유, 시리얼, 채소, 치즈, 분유 제공", "산전 관리도 포함"] },
    
      tl: { title: "WIC — Pagkain para sa mga Kababaihan, Sanggol at Bata", description: "Ang WIC ay nagbibigay ng masustansiyang pagkain, pangangalagang pangkalusugan, at suporta para sa mga buntis, bagong ina, at mga batang hanggang 5 taong gulang.", tips: ["Eligibility batay sa kita — karamihan sa mga pamilyang refugee ay karapat-dapat", "Nagbibigay ng gatas, cereal, gulay, keso, at formula", "Sumasaklaw din ng prenatal care"] },
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
      es: { title: "Inscribirse en el Servicio Selectivo (Varones 18-25)", description: "La ley federal REQUIERE inscripción de varones 18-25 dentro de 30 días." , tips: ["No registrarse puede descalificarte para la ciudadanía y empleos federales", "NO significa que te estás uniendo al ejército", "Puedes registrarte en línea en sss.gov o en una oficina de correos", "Esto es legalmente obligatorio — no es opcional"] },
      zh: { title: "登记选择性服务 (男性18-25岁)", description: "联邦法律要求18-25岁男性移民在30天内登记。" , tips: ["未注册可能使您失去公民资格和联邦工作资格", "这不意味着您要参军", "可在 sss.gov 在线注册或在邮局注册", "这是法律要求 — 不是可选的"] },
      hi: { title: "चयनात्मक सेवा पंजीकरण (पुरुष 18-25)", description: "संघीय कानून 18-25 वर्ष के पुरुषों को 30 दिनों में पंजीकरण की आवश्यकता है।" , tips: ["पंजीकरण न कराने से नागरिकता और संघीय नौकरियों से अयोग्य हो सकते हैं", "इसका मतलब यह नहीं है कि आप सेना में भर्ती हो रहे हैं", "sss.gov पर ऑनलाइन या डाकघर में पंजीकरण करें", "यह कानूनी रूप से आवश्यक है — वैकल्पिक नहीं"] },
      ar: { title: "التسجيل في الخدمة الانتقائية (ذكور 18-25)", description: "يتطلب القانون الفيدرالي تسجيل الذكور 18-25 خلال 30 يوماً." , tips: ["الفشل في التسجيل قد يجردك من الجنسية والوظائف الفيدرالية", "لا يعني ذلك أنك ستنضم إلى الجيش", "يمكنك التسجيل عبر الإنترنت على sss.gov أو في مكتب البريد", "هذا مطلوب قانونياً — وليس اختيارياً"] },
    
      fr: { title: "S'inscrire au Service Sélectif (Hommes 18-25 ans)", description: "La loi fédérale EXIGE que presque tous les immigrants masculins âgés de 18 à 25 ans s'inscrivent au Service Sélectif dans les 30 jours suivant leur arrivée.", tips: ["Ne pas s'inscrire peut disqualifier pour la citoyenneté et les emplois fédéraux", "Cela NE signifie PAS que vous rejoignez l'armée", "Vous pouvez vous inscrire en ligne sur sss.gov"] },
    
      pt: { title: "Registrar-se no Selective Service (Homens 18-25)", description: "A lei federal EXIGE que quase todos os imigrantes do sexo masculino entre 18 e 25 anos se registrem no Selective Service dentro de 30 dias da chegada.", tips: ["Não se registrar pode desqualificar para cidadania e empregos federais", "Isso NÃO significa que você está ingressando nas forças armadas", "Você pode se registrar online em sss.gov"] },
    
      vi: { title: "Đăng Ký Selective Service (Nam 18-25 Tuổi)", description: "Luật liên bang YÊU CẦU hầu hết nam giới nhập cư từ 18-25 tuổi đăng ký Selective Service trong vòng 30 ngày kể từ khi đến.", tips: ["Không đăng ký có thể bị tước quyền nhập tịch và việc làm liên bang", "Điều này KHÔNG có nghĩa là bạn gia nhập quân đội", "Bạn có thể đăng ký trực tuyến tại sss.gov"] },
    
      ko: { title: "선발적 복무 등록 (남성 18-25세)", description: "연방법은 18-25세 남성 이민자 거의 모두가 도착 후 30일 이내에 선발적 복무에 등록할 것을 요구합니다.", tips: ["미등록 시 시민권 취득 및 연방 취업 자격 박탈 가능", "군 입대를 의미하지 않습니다", "sss.gov에서 온라인 등록 가능"] },
    
      tl: { title: "Mag-register sa Selective Service (Lalaki 18-25)", description: "Ang batas federal ay NANGANGAILANGAN ng halos lahat ng lalaking immigrant na 18-25 taong gulang na mag-register sa Selective Service sa loob ng 30 araw ng pagdating.", tips: ["Ang hindi pagpaparehistro ay maaaring mag-disqualify para sa citizenship at federal jobs", "Hindi ito nangangahulugang sumasali ka sa militar", "Maaari kang mag-register online sa sss.gov"] },
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
      es: { title: "Obtener ID Estatal o Licencia de Conducir", description: "La mayoría de estados permiten a inmigrantes obtener una ID estatal." , tips: ["Contacta tu DMV local para requisitos específicos", "Algunos estados ofrecen 'Real ID' a inmigrantes con estatus válido", "Los materiales de estudio están disponibles en línea en varios idiomas", "Un ID estatal es útil incluso si no conduces"] },
      zh: { title: "获取州ID或驾驶执照", description: "大多数州允许移民获得州ID或驾驶执照。" , tips: ["联系当地 DMV 了解具体要求", "一些州向有效身份的移民提供 '真实身份证'", "学习材料可在网上多种语言中获得", "即使不开车，州 ID 也很有用"] },
      hi: { title: "राज्य ID या ड्राइवर लाइसेंस प्राप्त करें", description: "अधिकांश राज्य आप्रवासियों को राज्य ID देते हैं।" , tips: ["विशिष्ट आवश्यकताओं के लिए अपने स्थानीय DMV से संपर्क करें", "कुछ राज्य वैध स्थिति वाले आप्रवासियों को 'Real ID' प्रदान करते हैं", "अध्ययन सामग्री कई भाषाओं में ऑनलाइन उपलब्ध है", "राज्य ID उपयोगी है भले ही आप गाड़ी न चलाएं"] },
      ar: { title: "الحصول على بطاقة هوية أو رخصة قيادة", description: "تسمح معظم الولايات للمهاجرين بالحصول على بطاقة هوية." , tips: ["اتصل بـ DMV المحلي للاطلاع على المتطلبات المحددة", "بعض الولايات تقدم 'Real ID' للمهاجرين ذوي الوضع القانوني", "مواد الدراسة متاحة عبر الإنترنت بلغات متعددة", "بطاقة الهوية الحكومية مفيدة حتى لو لم تكن تقود سيارة"] },
    
      fr: { title: "Obtenir une Carte d'Identité ou un Permis de Conduire", description: "La carte d'identité d'État est la principale pièce d'identité aux États-Unis.", tips: ["Apportez passeport, SSN et preuve d'adresse au DMV", "Passez d'abord l'examen écrit", "Certains États ont des examens en plusieurs langues"] },
    
      pt: { title: "Obter Carteira de Identidade ou Habilitação", description: "A identidade estadual é a principal forma de identificação nos EUA.", tips: ["Leve passaporte, SSN e comprovante de endereço ao DMV", "Faça primeiro o exame escrito", "Alguns estados têm exames em vários idiomas"] },
    
      vi: { title: "Lấy Thẻ ID Tiểu Bang hoặc Bằng Lái Xe", description: "Thẻ ID tiểu bang là hình thức nhận dạng chính ở Mỹ.", tips: ["Mang theo hộ chiếu, SSN và bằng chứng địa chỉ đến DMV", "Thi lý thuyết trước", "Một số tiểu bang có bài thi bằng nhiều ngôn ngữ"] },
    
      ko: { title: "주 신분증 또는 운전면허증 취득", description: "주 신분증은 미국에서 가장 중요한 신분 확인 수단입니다.", tips: ["DMV에 여권, SSN, 주소 증명서를 지참하세요", "먼저 필기 시험을 보세요", "일부 주에서는 다국어로 시험 제공"] },
    
      tl: { title: "Kumuha ng State ID o Driver's License", description: "Ang state ID ay ang pangunahing paraan ng pagkakakilanlan sa U.S.", tips: ["Dalhin ang pasaporte, SSN, at patunay ng address sa DMV", "Kumuha muna ng written exam", "Ang ilang estado ay may mga pagsusulit sa maraming wika"] },
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
      es: { title: "Solicitar ITIN (si no eres elegible para SSN)", description: "Un ITIN te permite presentar impuestos sin SSN." , tips: ["Gratis al solicitarlo con el Formulario W-7 del IRS", "Los centros de impuestos VITA pueden ayudarte a solicitar", "Necesario para: impuestos, ciertas cuentas bancarias", "No es un reemplazo del SSN — es específicamente para fines fiscales"] },
      zh: { title: "申请ITIN（如果不符合SSN资格）", description: "ITIN让您在没有SSN的情况下申报税款。" , tips: ["使用 IRS W-7 表格申请免费", "VITA 税务中心可以帮助您申请", "需要用于：税务、某些银行账户", "不能替代 SSN — 专门用于税务目的"] },
      hi: { title: "ITIN के लिए आवेदन करें (अगर SSN नहीं मिल सकता)", description: "ITIN से SSN के बिना टैक्स फाइल कर सकते हैं।" , tips: ["IRS फॉर्म W-7 के साथ आवेदन करने पर मुफ्त", "VITA टैक्स केंद्र आवेदन में मदद कर सकते हैं", "आवश्यक: कर, कुछ बैंक खाते", "SSN का विकल्प नहीं — यह विशेष रूप से कर उद्देश्यों के लिए है"] },
      ar: { title: "التقدم للحصول على ITIN", description: "يسمح ITIN بتقديم الضرائب بدون SSN." , tips: ["مجاني عند التقديم بنموذج IRS W-7", "يمكن لمراكز ضرائب VITA مساعدتك في التقديم", "مطلوب لـ: الضرائب وبعض الحسابات المصرفية", "ليس بديلاً عن SSN — إنه مخصص للأغراض الضريبية فقط"] },
    
      fr: { title: "Demander un ITIN (si pas éligible au SSN)", description: "L'ITIN vous permet de payer des impôts et d'accéder à des services financiers si vous n'êtes pas éligible au SSN.", tips: ["Remplissez le formulaire IRS W-7", "Nécessite une preuve d'identité et de statut étranger", "Peut être utilisé pour ouvrir un compte bancaire"] },
    
      pt: { title: "Solicitar ITIN (se não elegível para SSN)", description: "O ITIN permite pagar impostos e acessar serviços financeiros se você não for elegível para SSN.", tips: ["Preencha o formulário IRS W-7", "Requer comprovante de identidade e status de estrangeiro", "Pode ser usado para abrir conta bancária"] },
    
      vi: { title: "Xin ITIN (Nếu Không Đủ Điều Kiện SSN)", description: "ITIN cho phép bạn nộp thuế và tiếp cận dịch vụ tài chính nếu không đủ điều kiện SSN.", tips: ["Điền mẫu IRS W-7", "Cần bằng chứng danh tính và tình trạng người nước ngoài", "Có thể dùng để mở tài khoản ngân hàng"] },
    
      ko: { title: "ITIN 신청 (SSN 자격 없는 경우)", description: "ITIN은 SSN 자격이 없는 경우 세금 납부 및 금융 서비스 이용을 가능하게 합니다.", tips: ["IRS W-7 양식을 작성하세요", "신분증 및 외국인 신분 증명 필요", "은행 계좌 개설에 사용 가능"] },
    
      tl: { title: "Mag-apply para sa ITIN (kung hindi karapat-dapat sa SSN)", description: "Ang ITIN ay nagpapahintulot sa iyo na magbayad ng buwis at ma-access ang mga serbisyong pinansyal kung hindi ka karapat-dapat sa SSN.", tips: ["Punan ang IRS Form W-7", "Nangangailangan ng patunay ng pagkakakilanlan at foreign status", "Maaaring gamitin para magbukas ng bank account"] },
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
      es: { title: "Presentar AR-11 (Cambio de Dirección) ante USCIS", description: "La ley requiere notificar a USCIS dentro de 10 días de cualquier cambio de dirección." , tips: ["Completa en línea en uscis.gov/ar-11 — es gratis", "Debe presentarse dentro de los 10 días de mudarse", "No presentarlo puede afectar tu caso de inmigración", "Cada miembro de la familia mayor de 14 años debe presentar por separado"] },
      zh: { title: "向USCIS提交AR-11地址变更", description: "法律要求在地址变更后10天内通知USCIS。" , tips: ["在 uscis.gov/ar-11 在线填写 — 免费", "必须在搬家后 10 天内提交", "未提交可能影响您的移民案件", "14 岁以上的每位家庭成员必须单独提交"] },
      hi: { title: "USCIS के साथ AR-11 पता परिवर्तन दाखिल करें", description: "कानूनन पता बदलने के 10 दिनों के भीतर USCIS को सूचित करना अनिवार्य है।" , tips: ["uscis.gov/ar-11 पर ऑनलाइन जमा करें — मुफ्त है", "स्थानांतरित होने के 10 दिनों के भीतर दाखिल करना होगा", "दाखिल न करने से आपका आव्रजन मामला प्रभावित हो सकता है", "14 से अधिक उम्र के प्रत्येक परिवार के सदस्य को अलग से दाखिल करना होगा"] },
      ar: { title: "تقديم AR-11 (تغيير العنوان) إلى USCIS", description: "يتطلب القانون إبلاغ USCIS خلال 10 أيام من أي تغيير في العنوان." , tips: ["قدّم عبر الإنترنت على uscis.gov/ar-11 — إنه مجاني", "يجب تقديمه خلال 10 أيام من الانتقال", "عدم التقديم قد يؤثر على قضيتك في الهجرة", "كل فرد من أفراد الأسرة فوق 14 سنة يجب أن يقدم بشكل منفصل"] },
    
      fr: { title: "Déposer le Changement d'Adresse AR-11 auprès de l'USCIS", description: "Si vous déménagez, vous devez informer l'USCIS de votre nouvelle adresse dans les 10 jours.", tips: ["Faites-le en ligne sur uscis.gov/ar-11", "S'applique à tous les non-citoyens", "Ne pas le faire peut entraîner des problèmes d'immigration"] },
    
      pt: { title: "Registrar Mudança de Endereço AR-11 no USCIS", description: "Se você se mudar, deve notificar o USCIS do seu novo endereço em 10 dias.", tips: ["Faça online em uscis.gov/ar-11", "Aplica-se a todos os não-cidadãos", "Não fazer isso pode causar problemas de imigração"] },
    
      vi: { title: "Nộp AR-11 Thay Đổi Địa Chỉ với USCIS", description: "Nếu bạn chuyển nhà, bạn phải thông báo cho USCIS địa chỉ mới trong vòng 10 ngày.", tips: ["Thực hiện trực tuyến tại uscis.gov/ar-11", "Áp dụng cho tất cả những người không phải công dân", "Không làm điều này có thể gây ra vấn đề về nhập cư"] },
    
      ko: { title: "USCIS에 AR-11 주소 변경 신고", description: "이사할 경우 10일 이내에 USCIS에 새 주소를 알려야 합니다.", tips: ["uscis.gov/ar-11에서 온라인으로 신청하세요", "모든 비시민권자에게 적용", "미신고 시 이민 문제가 발생할 수 있습니다"] },
    
      tl: { title: "Mag-file ng AR-11 Address Change sa USCIS", description: "Kung lumipat ka, kailangan mong ipaalam sa USCIS ang iyong bagong address sa loob ng 10 araw.", tips: ["Gawin ito online sa uscis.gov/ar-11", "Naaangkop sa lahat ng non-citizen", "Ang hindi paggawa nito ay maaaring magdulot ng mga problema sa immigration"] },
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
      es: { title: "Solicitar Autorización de Trabajo (EAD)", description: "Si tu estatus requiere permiso de trabajo, solicita con el Formulario I-765." , tips: ["Los refugiados obtienen autorización de trabajo automáticamente — puede que no necesites solicitar por separado", "Los asilados deben solicitar tan pronto como se otorgue el estatus", "Verifica si calificas para una exención de tarifa (Formulario I-912)", "Tiempo de procesamiento: consulta uscis.gov/processing-times", "NO puedes trabajar hasta recibir tu tarjeta EAD"] },
      zh: { title: "申请工作许可 (EAD)", description: "如果您的身份需要单独的工作许可，使用I-765表格申请。" , tips: ["难民自动获得工作授权 — 可能不需要单独申请", "难民身份者应在获得身份后立即申请", "检查是否符合费用豁免资格（I-912 表格）", "处理时间：查看 uscis.gov/processing-times", "在收到 EAD 卡之前不能工作"] },
      hi: { title: "कार्य प्राधिकरण (EAD) के लिए आवेदन करें", description: "अगर आपकी स्थिति को अलग कार्य परमिट चाहिए, तो I-765 फॉर्म से आवेदन करें।" , tips: ["शरणार्थियों को स्वतः कार्य प्राधिकरण मिलता है — अलग से आवेदन की जरूरत नहीं हो सकती", "शरण प्राप्तकर्ताओं को स्थिति मिलते ही आवेदन करना चाहिए", "शुल्क माफी के लिए पात्रता जांचें (फॉर्म I-912)", "प्रसंस्करण समय: uscis.gov/processing-times देखें", "EAD कार्ड मिलने तक काम नहीं कर सकते"] },
      ar: { title: "التقدم للحصول على تصريح العمل (EAD)", description: "إذا كان وضعك يتطلب تصريح عمل منفصل، قدم باستخدام النموذج I-765." , tips: ["اللاجئون يحصلون على تصريح عمل تلقائياً — قد لا تحتاج للتقديم بشكل منفصل", "يجب على طالبي اللجوء التقديم فور منح الوضع", "تحقق من أهليتك للإعفاء من الرسوم (نموذج I-912)", "وقت المعالجة: تحقق على uscis.gov/processing-times", "لا يمكنك العمل حتى تحصل على بطاقة EAD"] },
    
      fr: { title: "Demander l'Autorisation de Travail (EAD)", description: "L'EAD (carte de travail) vous autorise légalement à travailler aux États-Unis.", tips: ["Postulez dès que vous y êtes éligible", "Le délai de traitement est d'environ 3 à 6 mois", "Certaines catégories de réfugiés sont autorisées à travailler immédiatement"] },
    
      pt: { title: "Solicitar Autorização de Trabalho (EAD)", description: "O EAD (cartão de trabalho) autoriza você legalmente a trabalhar nos EUA.", tips: ["Inscreva-se assim que for elegível", "O tempo de processamento é de cerca de 3-6 meses", "Algumas categorias de refugiados podem trabalhar imediatamente"] },
    
      vi: { title: "Xin Giấy Phép Làm Việc (EAD)", description: "EAD (thẻ làm việc) cho phép bạn làm việc hợp pháp tại Mỹ.", tips: ["Nộp đơn ngay khi đủ điều kiện", "Thời gian xử lý khoảng 3-6 tháng", "Một số loại người tị nạn được phép làm việc ngay lập tức"] },
    
      ko: { title: "취업 허가(EAD) 신청", description: "EAD(취업 카드)는 미국에서 합법적으로 일할 수 있는 권한을 부여합니다.", tips: ["자격이 되는 즉시 신청하세요", "처리 기간은 약 3-6개월", "일부 난민 카테고리는 즉시 취업 가능"] },
    
      tl: { title: "Mag-apply para sa Work Authorization (EAD)", description: "Ang EAD (work card) ay nagbibigay sa iyo ng legal na pahintulot na magtrabaho sa U.S.", tips: ["Mag-apply sa sandaling maging karapat-dapat ka", "Ang oras ng pagproseso ay humigit-kumulang 3-6 buwan", "Ang ilang kategorya ng refugee ay pinapayagang magtrabaho agad"] },
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
      es: { title: "Asistir a Taller de Preparación para el Empleo", description: "Aprende a escribir un currículum en formato estadounidense." , tips: ["Organizaciones sin fines de lucro como Upwardly Global ofrecen ayuda gratuita con el currículum", "Tu agencia de reasentamiento probablemente tiene un programa de preparación laboral", "Enfócate en habilidades transferibles de tu país de origen", "Practica preguntas comunes de entrevista en inglés"] },
      zh: { title: "参加就业准备课程", description: "学习撰写美国格式的简历和面试技巧。" , tips: ["Upwardly Global 等非营利组织提供免费简历帮助", "您的安置机构可能有就业准备项目", "专注于从原籍国带来的可转移技能", "用英语练习常见面试问题"] },
      hi: { title: "रोजगार तैयारी कार्यशाला में भाग लें", description: "अमेरिकी प्रारूप में रेज़्यूमे लिखना और साक्षात्कार की तैयारी करें।" , tips: ["Upwardly Global जैसी गैर-लाभकारी संस्थाएं मुफ्त रेज़्यूमे सहायता प्रदान करती हैं", "आपकी पुनर्वास एजेंसी में संभवतः रोजगार तैयारी कार्यक्रम है", "अपने गृह देश से हस्तांतरणीय कौशल पर ध्यान दें", "अंग्रेजी में सामान्य साक्षात्कार प्रश्नों का अभ्यास करें"] },
      ar: { title: "حضور ورشة الاستعداد للتوظيف", description: "تعلم كتابة سيرة ذاتية بالتنسيق الأمريكي." , tips: ["منظمات غير ربحية مثل Upwardly Global تقدم مساعدة مجانية في السيرة الذاتية", "من المرجح أن وكالة إعادة التوطين لديك تمتلك برنامجاً للتأهيل الوظيفي", "ركز على المهارات القابلة للنقل من بلدك الأصلي", "تدرّب على أسئلة المقابلة الشائعة باللغة الإنجليزية"] },
    
      fr: { title: "Assister à un Atelier de Préparation à l'Emploi", description: "Ces ateliers enseignent la rédaction de CV, les entretiens et les attentes en milieu de travail américain.", tips: ["Souvent proposés gratuitement par les agences de réinstallation", "Apportez vos expériences professionnelles précédentes", "Demandez de l'aide pour la traduction de diplômes"] },
    
      pt: { title: "Participar de Workshop de Preparação para Emprego", description: "Esses workshops ensinam redação de currículo, entrevistas e expectativas do ambiente de trabalho americano.", tips: ["Frequentemente oferecidos gratuitamente por agências de reassentamento", "Leve experiências de trabalho anteriores", "Peça ajuda para tradução de diplomas"] },
    
      vi: { title: "Tham Dự Hội Thảo Chuẩn Bị Việc Làm", description: "Các hội thảo này dạy viết CV, phỏng vấn và kỳ vọng nơi làm việc của Mỹ.", tips: ["Thường được cung cấp miễn phí bởi các cơ quan tái định cư", "Mang theo kinh nghiệm làm việc trước đây", "Yêu cầu giúp đỡ dịch bằng cấp"] },
    
      ko: { title: "취업 준비 워크숍 참석", description: "이 워크숍에서는 이력서 작성, 면접, 미국 직장 환경에 대해 가르쳐 줍니다.", tips: ["재정착 기관에서 무료로 제공하는 경우가 많습니다", "이전 직장 경험을 가져오세요", "학위 번역 도움을 요청하세요"] },
    
      tl: { title: "Dumalo sa Employment Readiness Workshop", description: "Ang mga workshop na ito ay nagtuturo ng pagsulat ng resume, mga interview, at mga inaasahan sa lugar ng trabaho sa Amerika.", tips: ["Madalas na inaalok nang libre ng mga resettlement agency", "Dalhin ang mga nakaraang karanasan sa trabaho", "Humingi ng tulong para sa pagsasalin ng mga diploma"] },
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
      es: { title: "Comenzar a Buscar Empleo", description: "Inicia tu búsqueda activa de empleo usando agencias y portales en línea." , tips: ["Indeed.com, LinkedIn y las bolsas de trabajo estatales son recursos clave", "Pregunta a tu trabajador social sobre asociaciones con empleadores locales", "Las agencias de personal pueden ayudar con colocación inmediata", "Empieza con cualquier trabajo para ganar experiencia laboral en EE.UU. — puedes avanzar después"] },
      zh: { title: "开始求职", description: "开始积极求职，使用安置机构的服务和在线招聘网站。" , tips: ["Indeed.com、LinkedIn 和州就业网站是关键资源", "向案件工作人员询问当地雇主合作关系", "人力资源机构可以帮助立即安置", "从任何工作开始积累美国工作经验 — 以后可以晋升"] },
      hi: { title: "नौकरी के लिए आवेदन शुरू करें", description: "अपनी सक्रिय नौकरी खोज शुरू करें।" , tips: ["Indeed.com, LinkedIn और राज्य नौकरी बोर्ड प्रमुख संसाधन हैं", "स्थानीय नियोक्ता साझेदारियों के बारे में केसवर्कर से पूछें", "स्टाफिंग एजेंसियां तत्काल नियुक्ति में मदद कर सकती हैं", "अमेरिकी कार्य अनुभव के लिए किसी भी नौकरी से शुरू करें — बाद में आगे बढ़ सकते हैं"] },
      ar: { title: "ابدأ في التقدم للوظائف", description: "ابدأ البحث النشط عن عمل باستخدام خدمات التوظيف." , tips: ["Indeed.com وLinkedIn ومواقع الوظائف الحكومية هي موارد رئيسية", "اسأل معالج حالتك عن شراكات أصحاب العمل المحليين", "يمكن لوكالات التوظيف المساعدة في التوظيف الفوري", "ابدأ بأي عمل لبناء خبرة عمل أمريكية — يمكنك التقدم لاحقاً"] },
    
      fr: { title: "Commencer à Postuler des Emplois", description: "Commencez votre recherche d'emploi tôt. De nombreuses ressources sont disponibles pour les nouveaux arrivants.", tips: ["Indeed, LinkedIn et les offres d'emploi locales sont de bons points de départ", "Les agences de travail temporaire peuvent fournir un emploi immédiat", "Votre agence de réinstallation peut avoir des connexions avec des employeurs"] },
    
      pt: { title: "Começar a Candidatar-se a Empregos", description: "Comece sua busca de emprego cedo. Muitos recursos estão disponíveis para recém-chegados.", tips: ["Indeed, LinkedIn e vagas de emprego locais são bons pontos de partida", "Agências de trabalho temporário podem fornecer emprego imediato", "Sua agência de reassentamento pode ter conexões com empregadores"] },
    
      vi: { title: "Bắt Đầu Nộp Đơn Xin Việc", description: "Bắt đầu tìm việc sớm. Có nhiều tài nguyên dành cho người mới đến.", tips: ["Indeed, LinkedIn và bảng thông báo việc làm địa phương là điểm khởi đầu tốt", "Các công ty lao động tạm thời có thể cung cấp việc làm ngay lập tức", "Cơ quan tái định cư của bạn có thể có kết nối với các nhà tuyển dụng"] },
    
      ko: { title: "취업 지원 시작", description: "일찍 구직 활동을 시작하세요. 새로 온 분들을 위한 다양한 자원이 있습니다.", tips: ["Indeed, LinkedIn, 지역 구인 게시판이 좋은 출발점", "임시 직업 소개소에서 즉시 취업 가능", "재정착 기관에 고용주 연결 서비스가 있을 수 있습니다"] },
    
      tl: { title: "Magsimulang Mag-apply para sa Trabaho", description: "Simulan ang iyong paghahanap ng trabaho nang maaga. Maraming resources ang available para sa mga baguhan.", tips: ["Ang Indeed, LinkedIn, at lokal na job boards ay magandang simula", "Ang mga ahensya ng pansamantalang trabaho ay maaaring magbigay ng agarang trabaho", "Ang iyong resettlement agency ay maaaring may koneksyon sa mga employer"] },
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
      es: { title: "Aprender Transporte Público", description: "Conoce el sistema de autobuses y trenes de tu ciudad." , tips: ["Descarga la app de tránsito de tu ciudad (Google Maps funciona bien)", "Pregunta sobre programas de tarifa reducida para residentes de bajos ingresos", "Tu trabajador social puede proporcionar pases de autobús iniciales", "Aprende tu ruta a la oficina del SSA, la escuela y el hospital"] },
      zh: { title: "学习使用公共交通", description: "了解当地公交和火车系统。" , tips: ["下载您城市的交通应用（Google Maps 效果很好）", "询问低收入居民的减价票程序", "您的案件工作人员可能会提供初始公交卡", "学习前往 SSA 办公室、学校和医院的路线"] },
      hi: { title: "सार्वजनिक परिवहन सीखें", description: "अपने स्थानीय बस और ट्रेन सिस्टम को समझें।" , tips: ["अपने शहर का ट्रांजिट ऐप डाउनलोड करें (Google Maps अच्छा काम करता है)", "कम आय वाले निवासियों के लिए कम किराया कार्यक्रमों के बारे में पूछें", "आपका केसवर्कर शुरुआती बस पास प्रदान कर सकता है", "SSA कार्यालय, स्कूल और अस्पताल का रास्ता सीखें"] },
      ar: { title: "تعلم وسائل النقل العام", description: "تعرف على نظام الحافلات والقطارات المحلي." , tips: ["قم بتنزيل تطبيق المواصلات في مدينتك (Google Maps يعمل بشكل جيد)", "اسأل عن برامج تخفيض الأجرة للمقيمين ذوي الدخل المحدود", "قد يوفر معالج حالتك تذاكر حافلات أولية", "تعلّم طريقك إلى مكتب SSA والمدرسة والمستشفى"] },
    
      fr: { title: "Apprendre les Transports en Commun", description: "Savoir utiliser les bus et le métro vous aidera à vous déplacer pour le travail, l'école et les rendez-vous.", tips: ["Demandez des cartes de transport et des horaires à votre agence", "Beaucoup de villes ont des applications de transport gratuites", "Google Maps fonctionne bien pour la navigation en transports"] },
    
      pt: { title: "Aprender Transporte Público", description: "Saber usar ônibus e metrô vai ajudar a se locomover para trabalho, escola e compromissos.", tips: ["Peça mapas e horários de transporte à sua agência", "Muitas cidades têm aplicativos de transporte gratuitos", "O Google Maps funciona bem para navegação em transporte público"] },
    
      vi: { title: "Học Cách Sử Dụng Phương Tiện Công Cộng", description: "Biết cách sử dụng xe buýt và tàu điện ngầm sẽ giúp bạn di chuyển đến nơi làm việc, trường học và các cuộc hẹn.", tips: ["Xin bản đồ và lịch trình giao thông từ cơ quan của bạn", "Nhiều thành phố có ứng dụng giao thông miễn phí", "Google Maps hoạt động tốt cho việc điều hướng phương tiện công cộng"] },
    
      ko: { title: "대중교통 이용법 배우기", description: "버스와 지하철 이용법을 알면 직장, 학교, 약속 장소로 이동하는 데 도움이 됩니다.", tips: ["담당 기관에 교통 지도와 시간표를 요청하세요", "많은 도시에 무료 교통 앱이 있습니다", "Google Maps는 대중교통 내비게이션에 잘 작동합니다"] },
    
      tl: { title: "Matuto ng Public Transportation", description: "Ang pagkaalam kung paano gamitin ang bus at tren ay makakatulong sa iyo na makarating sa trabaho, paaralan, at mga appointment.", tips: ["Humingi ng mga mapa at iskedyul ng transportasyon mula sa iyong ahensya", "Maraming lungsod ang may libreng transportation app", "Ang Google Maps ay gumagana nang maayos para sa pag-navigate ng public transit"] },
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
      es: { title: "Entender tu Contrato y Derechos de Inquilino", description: "Conoce tus derechos como inquilino. Los propietarios no pueden discriminar." , tips: ["Lee tu contrato cuidadosamente — pide a tu trabajador social que lo explique", "Los arrendadores NO pueden discriminar por origen nacional", "Reporta discriminación en vivienda a HUD al 800-669-9777", "Guarda copias de todos los pagos de renta y comunicaciones"] },
      zh: { title: "了解你的租约和租户权利", description: "了解你作为租户的权利。房东不能基于国籍歧视。" , tips: ["仔细阅读租约 — 请案件工作人员解释", "房东不得因国籍而歧视", "向 HUD 800-669-9777 举报住房歧视", "保留所有租金支付和沟通记录"] },
      hi: { title: "अपना किराया अनुबंध और किरायेदार अधिकार समझें", description: "अपने किरायेदार अधिकारों को जानें।" , tips: ["अपना पट्टा ध्यान से पढ़ें — केसवर्कर से समझाने के लिए कहें", "मकान मालिक राष्ट्रीय मूल के आधार पर भेदभाव नहीं कर सकते", "HUD को 800-669-9777 पर आवास भेदभाव की रिपोर्ट करें", "सभी किराया भुगतान और संचार की प्रतियां रखें"] },
      ar: { title: "فهم عقد الإيجار وحقوق المستأجر", description: "اعرف حقوقك كمستأجر. لا يحق للمالك التمييز." , tips: ["اقرأ عقد الإيجار بعناية — اطلب من معالج حالتك شرحه", "لا يمكن لأصحاب العمل التمييز بناءً على الأصل القومي", "أبلغ عن التمييز في السكن إلى HUD على 800-669-9777", "احتفظ بنسخ من جميع مدفوعات الإيجار والمراسلات"] },
    
      fr: { title: "Comprendre votre Bail et vos Droits en tant que Locataire", description: "Connaître vos droits vous protège contre les propriétaires abusifs et vous aide à maintenir votre logement.", tips: ["Lisez chaque page avant de signer", "Demandez une traduction si nécessaire", "Les organisations d'aide juridique peuvent vous aider à comprendre les contrats"] },
    
      pt: { title: "Entender seu Contrato de Aluguel e Direitos do Inquilino", description: "Conhecer seus direitos o protege de proprietários abusivos e ajuda a manter sua moradia.", tips: ["Leia cada página antes de assinar", "Peça tradução se necessário", "Organizações de assistência jurídica podem ajudar a entender contratos"] },
    
      vi: { title: "Hiểu Hợp Đồng Thuê Nhà & Quyền Lợi Người Thuê", description: "Biết quyền lợi của bạn bảo vệ bạn khỏi chủ nhà lạm dụng và giúp duy trì chỗ ở.", tips: ["Đọc từng trang trước khi ký", "Yêu cầu bản dịch nếu cần", "Các tổ chức hỗ trợ pháp lý có thể giúp bạn hiểu hợp đồng"] },
    
      ko: { title: "임대 계약 및 세입자 권리 이해", description: "권리를 알면 횡포한 집주인으로부터 자신을 보호하고 주거를 유지하는 데 도움이 됩니다.", tips: ["서명 전 모든 페이지를 읽으세요", "필요시 번역을 요청하세요", "법률 지원 단체에서 계약 이해를 도울 수 있습니다"] },
    
      tl: { title: "Unawain ang Iyong Lease at Mga Karapatan ng Nangungupahan", description: "Ang pagkaalam ng iyong mga karapatan ay nagpoprotekta sa iyo mula sa mga mapang-abusong may-ari ng bahay at nakakatulong sa pagpapanatili ng iyong tirahan.", tips: ["Basahin ang bawat pahina bago pumirma", "Humingi ng pagsasalin kung kinakailangan", "Ang mga organisasyon ng legal aid ay makakatulong sa pag-unawa ng mga kontrata"] },
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
      es: { title: "Comenzar a Construir Historial Crediticio", description: "Un buen puntaje de crédito es esencial en América para vivienda y préstamos." , tips: ["Solicita una tarjeta de crédito asegurada en tu banco", "Las tarjetas aseguradas requieren un depósito (ej. $200) que se convierte en tu límite de crédito", "Paga tu saldo EN SU TOTALIDAD cada mes", "Verifica tu puntaje de crédito gratis en annualcreditreport.com"] },
      zh: { title: "开始建立信用记录", description: "良好的信用评分对住房、贷款至关重要。" , tips: ["在银行申请有担保信用卡", "有担保卡需要押金（如 $200）作为信用额度", "每月全额还款", "在 annualcreditreport.com 免费查看信用评分"] },
      hi: { title: "क्रेडिट इतिहास बनाना शुरू करें", description: "अमेरिका में अच्छा क्रेडिट स्कोर आवश्यक है।" , tips: ["अपने बैंक से सुरक्षित क्रेडिट कार्ड के लिए आवेदन करें", "सुरक्षित कार्डों के लिए जमा राशि की आवश्यकता होती है (जैसे $200) जो आपकी क्रेडिट सीमा बन जाती है", "हर महीने अपना बैलेंस पूरी तरह चुकाएं", "annualcreditreport.com पर मुफ्त में क्रेडिट स्कोर जांचें"] },
      ar: { title: "ابدأ في بناء السجل الائتماني", description: "الدرجة الائتمانية الجيدة ضرورية للسكن والقروض." , tips: ["قدّم طلباً للحصول على بطاقة ائتمان مضمونة من بنكك", "البطاقات المضمونة تتطلب وديعة (مثل 200 دولار) تصبح حد الائتمان الخاص بك", "ادفع رصيدك بالكامل كل شهر", "تحقق من درجة الائتمان مجاناً على annualcreditreport.com"] },
    
      fr: { title: "Commencer à Construire un Historique de Crédit", description: "Le crédit est essentiel pour louer un appartement, obtenir un prêt et parfois décrocher un emploi aux États-Unis.", tips: ["Commencez avec une carte de crédit sécurisée", "Payez toujours à temps", "Certaines coopératives de crédit proposent des prêts générateurs de crédit"] },
    
      pt: { title: "Começar a Construir Histórico de Crédito", description: "O crédito é essencial para alugar um apartamento, obter empréstimo e às vezes conseguir emprego nos EUA.", tips: ["Comece com um cartão de crédito garantido", "Sempre pague em dia", "Algumas cooperativas de crédito oferecem empréstimos para construção de crédito"] },
    
      vi: { title: "Bắt Đầu Xây Dựng Lịch Sử Tín Dụng", description: "Tín dụng rất cần thiết để thuê căn hộ, vay tiền và đôi khi xin việc ở Mỹ.", tips: ["Bắt đầu với thẻ tín dụng có bảo đảm", "Luôn thanh toán đúng hạn", "Một số liên minh tín dụng cung cấp khoản vay xây dựng tín dụng"] },
    
      ko: { title: "신용 기록 쌓기 시작", description: "미국에서 아파트 임대, 대출, 때로는 취업에도 신용이 필수입니다.", tips: ["보증 신용카드로 시작하세요", "항상 제때 납부하세요", "일부 신용조합은 신용 구축 대출을 제공합니다"] },
    
      tl: { title: "Magsimulang Bumuo ng Credit History", description: "Ang credit ay mahalaga para sa pag-upa ng apartment, pagkuha ng loan, at minsan para sa trabaho sa U.S.", tips: ["Magsimula sa isang secured credit card", "Laging magbayad sa oras", "Ang ilang credit union ay nag-aalok ng credit-building loans"] },
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
      es: { title: "Presentar Impuestos (Ayuda Gratuita VITA)", description: "Si ganaste ingresos, debes presentar impuestos. VITA te ayuda gratis." , tips: ["La fecha límite de impuestos es el 15 de abril cada año", "VITA es gratuito para ingresos menores a $67,000", "Encuentra ubicaciones en irs.gov/vita", "Puede que califiques para el Crédito Tributario por Ingreso del Trabajo (EITC) — ¡vale miles!"] },
      zh: { title: "申报税款（VITA免费帮助）", description: "如果有收入须报税。VITA提供免费帮助。" , tips: ["纳税截止日期是每年 4 月 15 日", "VITA 对收入低于 $67,000 的人免费", "在 irs.gov/vita 查找地点", "您可能有资格获得劳动所得税抵免（EITC）— 价值数千美元！"] },
      hi: { title: "टैक्स फाइल करें (VITA मुफ़्त मदद)", description: "अगर आय अर्जित की है तो टैक्स रिटर्न दाखिल करना होगा।" , tips: ["कर की अंतिम तिथि हर साल 15 अप्रैल है", "VITA $67,000 से कम आय के लिए मुफ्त है", "irs.gov/vita पर स्थान खोजें", "अर्जित आयकर क्रेडिट (EITC) के लिए पात्र हो सकते हैं — हजारों डॉलर की बचत!"] },
      ar: { title: "تقديم الضرائب (مساعدة VITA المجانية)", description: "إذا كسبت دخلاً، يجب تقديم إقرار ضريبي. VITA تساعد مجاناً." , tips: ["الموعد النهائي للضرائب هو 15 أبريل من كل عام", "VITA مجاني للدخل الأقل من 67,000 دولار", "ابحث عن مواقع على irs.gov/vita", "قد تكون مؤهلاً للحصول على ائتمان ضريبة الدخل المكتسب (EITC) — يستحق آلاف الدولارات!"] },
    
      fr: { title: "Déclarer ses Impôts (Aide Gratuite VITA)", description: "La plupart des immigrants doivent produire une déclaration de revenus. VITA offre une aide gratuite.", tips: ["La date limite est généralement le 15 avril", "Apportez tous vos formulaires W-2 et 1099", "Les remboursements peuvent inclure des crédits importants"] },
    
      pt: { title: "Declarar Impostos (Ajuda Gratuita VITA)", description: "A maioria dos imigrantes deve fazer declaração de imposto de renda. O VITA oferece ajuda gratuita.", tips: ["O prazo geralmente é 15 de abril", "Leve todos os formulários W-2 e 1099", "Reembolsos podem incluir créditos importantes"] },
    
      vi: { title: "Khai Thuế (Hỗ Trợ Miễn Phí VITA)", description: "Hầu hết người nhập cư phải khai báo thuế thu nhập. VITA cung cấp hỗ trợ miễn phí.", tips: ["Hạn chót thường là ngày 15 tháng 4", "Mang theo tất cả mẫu W-2 và 1099", "Hoàn thuế có thể bao gồm các khoản tín dụng quan trọng"] },
    
      ko: { title: "세금 신고 (VITA 무료 도움)", description: "대부분의 이민자는 소득세 신고를 해야 합니다. VITA에서 무료 도움을 제공합니다.", tips: ["마감일은 보통 4월 15일", "모든 W-2 및 1099 양식을 지참하세요", "환급에는 중요한 세금 공제가 포함될 수 있습니다"] },
    
      tl: { title: "Mag-file ng Buwis (Libreng Tulong ng VITA)", description: "Karamihan sa mga immigrant ay kailangang mag-file ng income tax return. Ang VITA ay nag-aalok ng libreng tulong.", tips: ["Ang deadline ay karaniwang Abril 15", "Dalhin ang lahat ng W-2 at 1099 na form", "Ang mga refund ay maaaring magsama ng mahahalagang credit"] },
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
      es: { title: "Conectar con Ayuda Legal de Inmigración", description: "Encuentra un abogado de inmigración gratuito o de bajo costo." , tips: ["NUNCA pagues a un notario — NO son abogados", "Encuentra ayuda legal gratuita en immigrationadvocates.org", "Tu agencia de reasentamiento puede referirte", "Mantén todos los documentos de inmigración organizados y seguros"] },
      zh: { title: "联系移民法律援助", description: "寻找免费或低成本的移民律师。" , tips: ["绝不要向公证人付钱 — 他们不是律师", "在 immigrationadvocates.org 查找免费法律援助", "您的安置机构可以为您推荐", "保持所有移民文件整理有序且安全"] },
      hi: { title: "इमिग्रेशन कानूनी सहायता से जुड़ें", description: "मुफ़्त या कम लागत का इमिग्रेशन वकील खोजें।" , tips: ["कभी भी नोटरी को भुगतान न करें — वे वकील नहीं हैं", "immigrationadvocates.org पर मुफ्त कानूनी सहायता खोजें", "आपकी पुनर्वास एजेंसी आपको रेफर कर सकती है", "सभी आव्रजन दस्तावेजों को व्यवस्थित और सुरक्षित रखें"] },
      ar: { title: "التواصل مع المساعدة القانونية للهجرة", description: "ابحث عن محامي هجرة مجاني أو منخفض التكلفة." , tips: ["لا تدفع أبداً لموثق — ليسوا محامين", "ابحث عن مساعدة قانونية مجانية على immigrationadvocates.org", "يمكن لوكالة إعادة التوطين إحالتك", "احتفظ بجميع وثائق الهجرة منظمة وآمنة"] },
    
      fr: { title: "Se Connecter avec l'Aide Juridique en Immigration", description: "Les avocats en droit de l'immigration gratuits ou à faible coût peuvent vous aider avec le renouvellement de statut, l'asile et la citoyenneté.", tips: ["Recherchez des organisations accréditées EOIR", "Méfiez-vous des 'notarios' — ce ne sont pas des avocats", "Les services d'aide juridique sont souvent gratuits pour les réfugiés"] },
    
      pt: { title: "Conectar-se com Assistência Jurídica em Imigração", description: "Advogados de imigração gratuitos ou de baixo custo podem ajudar com renovação de status, asilo e cidadania.", tips: ["Procure organizações credenciadas pela EOIR", "Cuidado com 'notarios' — eles não são advogados", "Serviços de assistência jurídica são frequentemente gratuitos para refugiados"] },
    
      vi: { title: "Kết Nối Với Hỗ Trợ Pháp Lý Về Di Trú", description: "Luật sư di trú miễn phí hoặc chi phí thấp có thể giúp gia hạn tình trạng cư trú, tị nạn và nhập tịch.", tips: ["Tìm kiếm các tổ chức được EOIR công nhận", "Cảnh giác với 'notarios' — họ không phải luật sư", "Dịch vụ hỗ trợ pháp lý thường miễn phí cho người tị nạn"] },
    
      ko: { title: "이민 법률 지원 연결", description: "무료 또는 저비용 이민 변호사가 신분 갱신, 망명, 시민권 취득을 도울 수 있습니다.", tips: ["EOIR 인증 단체를 찾으세요", "'notarios'를 조심하세요 — 그들은 변호사가 아닙니다", "법률 지원 서비스는 난민에게 종종 무료"] },
    
      tl: { title: "Makipag-ugnayan sa Immigration Legal Aid", description: "Ang mga libre o mababang gastos na abogado sa immigration ay makakatulong sa pag-renew ng status, asylum, at citizenship.", tips: ["Maghanap ng mga organisasyong accredited ng EOIR", "Mag-ingat sa mga 'notario' — hindi sila mga abogado", "Ang mga serbisyo ng legal aid ay madalas na libre para sa mga refugee"] },
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
      es: { title: "Unirse a Organizaciones Comunitarias y Culturales", description: "Conéctate con tu comunidad para apoyo social y redes." , tips: ["Busca grupos de Facebook de tu comunidad en tu ciudad", "Las casas de culto suelen brindar apoyo comunitario", "Los centros comunitarios ofrecen actividades gratuitas y conexiones", "Construir una red ayuda con referencias de trabajo y apoyo emocional"] },
      zh: { title: "加入社区和文化组织", description: "连接侨民社区获得社会支持和人脉。" , tips: ["在您的城市搜索您社区的 Facebook 群组", "宗教场所通常提供社区支持", "社区中心提供免费活动和联系", "建立网络有助于工作推荐和情感支持"] },
      hi: { title: "सामुदायिक और सांस्कृतिक संगठनों से जुड़ें", description: "सामाजिक सहायता के लिए अपने प्रवासी समुदाय से जुड़ें।" , tips: ["अपने शहर में अपने समुदाय के लिए Facebook समूह खोजें", "पूजा स्थल अक्सर सामुदायिक सहायता प्रदान करते हैं", "सामुदायिक केंद्र मुफ्त गतिविधियां और संपर्क प्रदान करते हैं", "नेटवर्क बनाना नौकरी के संदर्भ और भावनात्मक समर्थन में मदद करता है"] },
      ar: { title: "انضم إلى المنظمات المجتمعية والثقافية", description: "تواصل مع مجتمعك للدعم الاجتماعي والتواصل." , tips: ["ابحث في مجموعات Facebook عن مجتمعك في مدينتك", "دور العبادة كثيراً ما توفر دعماً مجتمعياً", "مراكز المجتمع تقدم أنشطة مجانية وروابط اجتماعية", "بناء شبكة يساعد في الحصول على فرص العمل والدعم العاطفي"] },
    
      fr: { title: "Rejoindre des Organisations Communautaires et Culturelles", description: "Se connecter avec d'autres de votre pays ou culture peut offrir un soutien émotionnel, une aide pratique et des opportunités d'emploi.", tips: ["Recherchez des associations culturelles, des mosquées, des églises, des temples", "Les bibliothèques locales organisent souvent des événements pour les immigrants", "Les groupes Facebook locaux peuvent être utiles"] },
    
      pt: { title: "Participar de Organizações Comunitárias e Culturais", description: "Conectar-se com outros do seu país ou cultura pode oferecer suporte emocional, ajuda prática e oportunidades de emprego.", tips: ["Procure associações culturais, mesquitas, igrejas, templos", "Bibliotecas locais frequentemente organizam eventos para imigrantes", "Grupos locais no Facebook podem ser úteis"] },
    
      vi: { title: "Tham Gia Các Tổ Chức Cộng Đồng & Văn Hóa", description: "Kết nối với những người từ cùng đất nước hoặc văn hóa có thể mang lại hỗ trợ tinh thần, giúp đỡ thực tế và cơ hội việc làm.", tips: ["Tìm kiếm hiệp hội văn hóa, nhà thờ Hồi giáo, nhà thờ, đền thờ", "Thư viện địa phương thường tổ chức sự kiện cho người nhập cư", "Các nhóm Facebook địa phương có thể hữu ích"] },
    
      ko: { title: "지역 사회 및 문화 단체 가입", description: "같은 나라나 문화권 사람들과 교류하면 정서적 지원, 실질적 도움, 취업 기회를 얻을 수 있습니다.", tips: ["문화 협회, 모스크, 교회, 사원을 찾아보세요", "지역 도서관에서 이민자를 위한 행사를 자주 개최합니다", "지역 Facebook 그룹이 도움이 될 수 있습니다"] },
    
      tl: { title: "Sumali sa Komunidad at Mga Organisasyong Pangkultura", description: "Ang pakikipag-ugnayan sa iba mula sa iyong bansa o kultura ay maaaring magbigay ng emosyonal na suporta, praktikal na tulong, at mga pagkakataon sa trabaho.", tips: ["Maghanap ng mga cultural association, mosque, simbahan, templo", "Ang mga lokal na library ay madalas nagdaraos ng mga event para sa mga immigrant", "Ang mga lokal na grupo sa Facebook ay maaaring makatulong"] },
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
      es: { title: "Configurar Pago del Préstamo de Viaje IOM", description: "Si recibiste un préstamo de viaje IOM, debes comenzar el pago. Es sin intereses." , tips: ["El préstamo no tiene intereses", "Contacta a IOM al 1-866-777-4661 para establecer un plan de pago", "Incluso pequeños pagos mensuales ($50) son aceptables", "No reembolsar NO afecta tu estatus migratorio, pero sí afecta tu crédito"] },
      zh: { title: "设置IOM旅行贷款还款", description: "如果你收到了IOM旅行贷款，需要开始还款。无利息。" , tips: ["贷款免息", "致电 IOM 1-866-777-4661 制定还款计划", "即使是小额月供（$50）也可以接受", "不还款不会影响您的移民身份，但会影响您的信用"] },
      hi: { title: "IOM यात्रा ऋण चुकौती सेट करें", description: "अगर IOM यात्रा ऋण मिला था, तो चुकौती शुरू करें। ब्याज-मुक्त।" , tips: ["ऋण ब्याज मुक्त है", "भुगतान योजना स्थापित करने के लिए IOM से 1-866-777-4661 पर संपर्क करें", "छोटे मासिक भुगतान ($50) भी स्वीकार्य हैं", "न चुकाने से आपकी आव्रजन स्थिति प्रभावित नहीं होती, लेकिन क्रेडिट प्रभावित होता है"] },
      ar: { title: "إعداد سداد قرض السفر من IOM", description: "إذا حصلت على قرض سفر IOM، ابدأ السداد. القرض بدون فوائد." , tips: ["القرض بدون فوائد", "اتصل بـ IOM على 1-866-777-4661 لإعداد خطة سداد", "حتى الدفعات الشهرية الصغيرة (50 دولاراً) مقبولة", "عدم السداد لا يؤثر على وضعك الهجري، لكنه يؤثر على ائتمانك"] },
    
      fr: { title: "Configurer le Remboursement du Prêt de Voyage IOM", description: "Si votre voyage a été financé par l'IOM, vous devez commencer à rembourser dans les 6 mois.", tips: ["Contactez l'IOM pour configurer un plan de paiement", "Les remboursements sont flexibles selon votre situation", "Le non-remboursement peut affecter vos futures demandes d'immigration"] },
    
      pt: { title: "Configurar Reembolso do Empréstimo de Viagem IOM", description: "Se sua viagem foi financiada pela OIM, você deve começar a reembolsar dentro de 6 meses.", tips: ["Entre em contato com a OIM para configurar um plano de pagamento", "Os reembolsos são flexíveis de acordo com sua situação", "A falta de reembolso pode afetar futuras solicitações de imigração"] },
    
      vi: { title: "Thiết Lập Trả Nợ Khoản Vay Du Lịch IOM", description: "Nếu chuyến đi của bạn được IOM tài trợ, bạn phải bắt đầu trả trong vòng 6 tháng.", tips: ["Liên hệ IOM để thiết lập kế hoạch thanh toán", "Việc trả nợ linh hoạt tùy theo hoàn cảnh của bạn", "Không trả nợ có thể ảnh hưởng đến các đơn xin nhập cư trong tương lai"] },
    
      ko: { title: "IOM 여행 대출 상환 설정", description: "IOM이 여행 비용을 지원한 경우 6개월 이내에 상환을 시작해야 합니다.", tips: ["IOM에 연락하여 납부 계획을 설정하세요", "상황에 따라 유연하게 상환 가능", "미상환 시 향후 이민 신청에 영향을 줄 수 있습니다"] },
    
      tl: { title: "I-set Up ang IOM Travel Loan Repayment", description: "Kung ang iyong paglalakbay ay pinondohan ng IOM, kailangan mong magsimulang magbayad sa loob ng 6 buwan.", tips: ["Makipag-ugnayan sa IOM para mag-set up ng plano sa pagbabayad", "Ang mga pagbabayad ay flexible ayon sa iyong sitwasyon", "Ang hindi pagbabayad ay maaaring makaapekto sa mga susunod na aplikasyon sa immigration"] },
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
