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
      es: { title: "Establecer una Dirección Postal", description: "Necesitas una dirección en EE.UU. para recibir correo." },
      zh: { title: "确立邮寄地址", description: "您需要美国地址来接收政府机构的邮件。" },
      hi: { title: "डाक पता स्थापित करें", description: "मेल प्राप्त करने के लिए अमेरिकी पता चाहिए।" },
      ar: { title: "إنشاء عنوان بريدي", description: "تحتاج إلى عنوان أمريكي لاستلام البريد." },
    
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
      es: { title: "Descarga tu Registro I-94", description: "El I-94 es tu registro oficial de llegada/salida de EE.UU." },
      zh: { title: "下载您的I-94记录", description: "I-94是您在美国的官方入境/出境记录。" },
      hi: { title: "अपना I-94 रिकॉर्ड डाउनलोड करें", description: "I-94 आपका आधिकारिक अमेरिका आगमन/प्रस्थान रिकॉर्ड है।" },
      ar: { title: "تنزيل سجل I-94", description: "I-94 هو سجل وصولك/مغادرتك الرسمي." },
    
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
      es: { title: "Asistir a la Orientación Comunitaria", description: "Tu agencia te orientará sobre leyes, cultura y transporte en EE.UU." },
      zh: { title: "参加社区迎新会", description: "安置机构将介绍美国法律、文化、交通等信息。" },
      hi: { title: "सामुदायिक अभिविन्यास में भाग लें", description: "आपकी एजेंसी अमेरिकी कानूनों और संस्कृति के बारे में मार्गदर्शन देगी।" },
      ar: { title: "حضور التوجيه المجتمعي", description: "ستقدم وكالتك التوجيه حول القوانين والثقافة والنقل." },
    
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
      es: { title: "Aprender Números de Emergencia (911, 211, 988)", description: "911 para emergencias, 211 para servicios sociales, 988 para crisis de salud mental." },
      zh: { title: "学习紧急电话号码 (911, 211, 988)", description: "911报警、211社会服务、988心理健康危机热线。" },
      hi: { title: "आपातकालीन नंबर सीखें (911, 211, 988)", description: "911 आपातकाल, 211 सामाजिक सेवाएं, 988 मानसिक स्वास्थ्य।" },
      ar: { title: "تعلم أرقام الطوارئ (911، 211، 988)", description: "911 للطوارئ، 211 للخدمات الاجتماعية، 988 لدعم الأزمات النفسية." },
    
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
      es: { title: "Solicitar Número de Seguro Social (SSN)", description: "Un SSN es necesario para trabajar, pagar impuestos y muchos beneficios." },
      zh: { title: "申请社会安全号码 (SSN)", description: "SSN是工作、纳税和许多福利所必需的。" },
      hi: { title: "सामाजिक सुरक्षा संख्या (SSN) के लिए आवेदन करें", description: "काम, कर और कई लाभों के लिए SSN की ज़रूरत है।" },
      ar: { title: "التقدم للحصول على رقم الضمان الاجتماعي", description: "رقم الضمان الاجتماعي مطلوب للعمل والضرائب." },
    
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
      es: { title: "Abrir una Cuenta Bancaria", description: "No necesitas SSN para abrir una cuenta bancaria." },
      zh: { title: "开设银行账户", description: "开设银行账户不需要SSN。" },
      hi: { title: "बैंक खाता खोलें", description: "बैंक खाता खोलने के लिए SSN की ज़रूरत नहीं है।" },
      ar: { title: "فتح حساب مصرفي", description: "لا تحتاج إلى SSN لفتح حساب مصرفي." },
    
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
      es: { title: "Completar la Evaluación de Salud Inicial", description: "Se requiere un examen médico dentro de los primeros 30 días." },
      zh: { title: "完成初步健康筛查", description: "抵达后30天内须完成健康筛查。" },
      hi: { title: "प्रारंभिक स्वास्थ्य जांच पूरी करें", description: "आगमन के 30 दिनों के भीतर स्वास्थ्य जांच आवश्यक है।" },
      ar: { title: "إكمال الفحص الطبي الأولي", description: "الفحص الطبي مطلوب خلال 30 يومًا من الوصول." },
    
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
      es: { title: "Inscribirse en Seguro Médico", description: "Los inmigrantes pueden calificar para cobertura del Marketplace." },
      zh: { title: "注册医疗保险", description: "合法在美移民可能有资格获得市场保险。" },
      hi: { title: "स्वास्थ्य बीमा में नामांकन करें", description: "आप्रवासी मार्केटप्लेस कवरेज के लिए अर्हता प्राप्त कर सकते हैं।" },
      ar: { title: "التسجيل في التأمين الصحي", description: "قد يكون المهاجرون مؤهلين للتغطية التأمينية." },
    
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
      es: { title: "Inscribir a los Niños en la Escuela", description: "Todos los niños tienen derecho a educación pública gratuita." },
      zh: { title: "为孩子办理入学", description: "所有儿童都有权接受免费公共教育。" },
      hi: { title: "बच्चों को स्कूल में दाखिल कराएं", description: "सभी बच्चों को मुफ़्त सार्वजनिक शिक्षा का अधिकार है।" },
      ar: { title: "تسجيل الأطفال في المدرسة", description: "جميع الأطفال لهم الحق في التعليم العام المجاني." },
    
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
      es: { title: "Inscribirse en Clases de Inglés (ESL)", description: "Las clases de inglés son cruciales para la integración y el empleo." },
      zh: { title: "报名参加ESL英语课程", description: "英语课程对融入社会和就业至关重要。" },
      hi: { title: "ESL/अंग्रेजी कक्षाओं में दाखिला लें", description: "अंग्रेजी कक्षाएं एकीकरण और रोजगार के लिए महत्वपूर्ण हैं।" },
      ar: { title: "التسجيل في فصول اللغة الإنجليزية", description: "فصول ESL ضرورية للاندماج والتوظيف." },
    
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
      es: { title: "Solicitar SNAP (Asistencia Alimentaria)", description: "SNAP proporciona dinero en una tarjeta EBT para comprar alimentos." },
      zh: { title: "申请SNAP（食品援助）", description: "SNAP在EBT卡上提供购买杂货的资金。" },
      hi: { title: "SNAP (खाद्य सहायता) के लिए आवेदन करें", description: "SNAP किराने का सामान खरीदने के लिए EBT कार्ड पर पैसे देता है।" },
      ar: { title: "التقدم للحصول على SNAP (مساعدة الغذاء)", description: "يوفر SNAP أموالاً على بطاقة EBT لشراء البقالة." },
    
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
      es: { title: "Solicitar Asistencia en Efectivo para Refugiados (RCA)", description: "RCA proporciona asistencia mensual en efectivo a refugiados." },
      zh: { title: "申请难民现金援助 (RCA)", description: "RCA为难民提供每月现金援助，可用8个月。" },
      hi: { title: "शरणार्थी नकद सहायता (RCA) के लिए आवेदन करें", description: "RCA शरणार्थियों को मासिक नकद सहायता प्रदान करता है।" },
      ar: { title: "التقدم للحصول على المساعدة النقدية للاجئين (RCA)", description: "يوفر RCA مساعدة نقدية شهرية للاجئين." },
    
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
      es: { title: "Solicitar Medicaid / CHIP", description: "Medicaid ofrece seguro médico gratuito o de bajo costo." },
      zh: { title: "申请Medicaid / CHIP", description: "Medicaid提供免费或低成本医疗保险。" },
      hi: { title: "Medicaid / CHIP के लिए आवेदन करें", description: "Medicaid मुफ़्त या कम लागत का स्वास्थ्य बीमा प्रदान करता है।" },
      ar: { title: "التقدم للحصول على Medicaid / CHIP", description: "يوفر Medicaid تأميناً صحياً مجانياً أو منخفض التكلفة." },
    
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
      es: { title: "WIC — Alimentos para Mujeres, Bebés y Niños", description: "WIC proporciona alimentos gratuitos para madres y niños menores de 5." },
      zh: { title: "WIC — 妇女、婴幼儿食品援助", description: "WIC为孕妇和5岁以下儿童提供免费食品。" },
      hi: { title: "WIC — महिलाओं, शिशुओं और बच्चों के लिए भोजन", description: "WIC गर्भवती महिलाओं और 5 साल से कम बच्चों को मुफ़्त खाना देता है।" },
      ar: { title: "WIC — غذاء للنساء والرضع والأطفال", description: "يوفر WIC غذاءً مجانياً للحوامل والأطفال دون 5 سنوات." },
    
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
      es: { title: "Inscribirse en el Servicio Selectivo (Varones 18-25)", description: "La ley federal REQUIERE inscripción de varones 18-25 dentro de 30 días." },
      zh: { title: "登记选择性服务 (男性18-25岁)", description: "联邦法律要求18-25岁男性移民在30天内登记。" },
      hi: { title: "चयनात्मक सेवा पंजीकरण (पुरुष 18-25)", description: "संघीय कानून 18-25 वर्ष के पुरुषों को 30 दिनों में पंजीकरण की आवश्यकता है।" },
      ar: { title: "التسجيل في الخدمة الانتقائية (ذكور 18-25)", description: "يتطلب القانون الفيدرالي تسجيل الذكور 18-25 خلال 30 يوماً." },
    
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
      es: { title: "Obtener ID Estatal o Licencia de Conducir", description: "La mayoría de estados permiten a inmigrantes obtener una ID estatal." },
      zh: { title: "获取州ID或驾驶执照", description: "大多数州允许移民获得州ID或驾驶执照。" },
      hi: { title: "राज्य ID या ड्राइवर लाइसेंस प्राप्त करें", description: "अधिकांश राज्य आप्रवासियों को राज्य ID देते हैं।" },
      ar: { title: "الحصول على بطاقة هوية أو رخصة قيادة", description: "تسمح معظم الولايات للمهاجرين بالحصول على بطاقة هوية." },
    
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
      es: { title: "Solicitar ITIN (si no eres elegible para SSN)", description: "Un ITIN te permite presentar impuestos sin SSN." },
      zh: { title: "申请ITIN（如果不符合SSN资格）", description: "ITIN让您在没有SSN的情况下申报税款。" },
      hi: { title: "ITIN के लिए आवेदन करें (अगर SSN नहीं मिल सकता)", description: "ITIN से SSN के बिना टैक्स फाइल कर सकते हैं।" },
      ar: { title: "التقدم للحصول على ITIN", description: "يسمح ITIN بتقديم الضرائب بدون SSN." },
    
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
      es: { title: "Presentar AR-11 (Cambio de Dirección) ante USCIS", description: "La ley requiere notificar a USCIS dentro de 10 días de cualquier cambio de dirección." },
      zh: { title: "向USCIS提交AR-11地址变更", description: "法律要求在地址变更后10天内通知USCIS。" },
      hi: { title: "USCIS के साथ AR-11 पता परिवर्तन दाखिल करें", description: "कानूनन पता बदलने के 10 दिनों के भीतर USCIS को सूचित करना अनिवार्य है।" },
      ar: { title: "تقديم AR-11 (تغيير العنوان) إلى USCIS", description: "يتطلب القانون إبلاغ USCIS خلال 10 أيام من أي تغيير في العنوان." },
    
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
      es: { title: "Solicitar Autorización de Trabajo (EAD)", description: "Si tu estatus requiere permiso de trabajo, solicita con el Formulario I-765." },
      zh: { title: "申请工作许可 (EAD)", description: "如果您的身份需要单独的工作许可，使用I-765表格申请。" },
      hi: { title: "कार्य प्राधिकरण (EAD) के लिए आवेदन करें", description: "अगर आपकी स्थिति को अलग कार्य परमिट चाहिए, तो I-765 फॉर्म से आवेदन करें।" },
      ar: { title: "التقدم للحصول على تصريح العمل (EAD)", description: "إذا كان وضعك يتطلب تصريح عمل منفصل، قدم باستخدام النموذج I-765." },
    
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
      es: { title: "Asistir a Taller de Preparación para el Empleo", description: "Aprende a escribir un currículum en formato estadounidense." },
      zh: { title: "参加就业准备课程", description: "学习撰写美国格式的简历和面试技巧。" },
      hi: { title: "रोजगार तैयारी कार्यशाला में भाग लें", description: "अमेरिकी प्रारूप में रेज़्यूमे लिखना और साक्षात्कार की तैयारी करें।" },
      ar: { title: "حضور ورشة الاستعداد للتوظيف", description: "تعلم كتابة سيرة ذاتية بالتنسيق الأمريكي." },
    
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
      es: { title: "Comenzar a Buscar Empleo", description: "Inicia tu búsqueda activa de empleo usando agencias y portales en línea." },
      zh: { title: "开始求职", description: "开始积极求职，使用安置机构的服务和在线招聘网站。" },
      hi: { title: "नौकरी के लिए आवेदन शुरू करें", description: "अपनी सक्रिय नौकरी खोज शुरू करें।" },
      ar: { title: "ابدأ في التقدم للوظائف", description: "ابدأ البحث النشط عن عمل باستخدام خدمات التوظيف." },
    
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
      es: { title: "Aprender Transporte Público", description: "Conoce el sistema de autobuses y trenes de tu ciudad." },
      zh: { title: "学习使用公共交通", description: "了解当地公交和火车系统。" },
      hi: { title: "सार्वजनिक परिवहन सीखें", description: "अपने स्थानीय बस और ट्रेन सिस्टम को समझें।" },
      ar: { title: "تعلم وسائل النقل العام", description: "تعرف على نظام الحافلات والقطارات المحلي." },
    
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
      es: { title: "Entender tu Contrato y Derechos de Inquilino", description: "Conoce tus derechos como inquilino. Los propietarios no pueden discriminar." },
      zh: { title: "了解你的租约和租户权利", description: "了解你作为租户的权利。房东不能基于国籍歧视。" },
      hi: { title: "अपना किराया अनुबंध और किरायेदार अधिकार समझें", description: "अपने किरायेदार अधिकारों को जानें।" },
      ar: { title: "فهم عقد الإيجار وحقوق المستأجر", description: "اعرف حقوقك كمستأجر. لا يحق للمالك التمييز." },
    
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
      es: { title: "Comenzar a Construir Historial Crediticio", description: "Un buen puntaje de crédito es esencial en América para vivienda y préstamos." },
      zh: { title: "开始建立信用记录", description: "良好的信用评分对住房、贷款至关重要。" },
      hi: { title: "क्रेडिट इतिहास बनाना शुरू करें", description: "अमेरिका में अच्छा क्रेडिट स्कोर आवश्यक है।" },
      ar: { title: "ابدأ في بناء السجل الائتماني", description: "الدرجة الائتمانية الجيدة ضرورية للسكن والقروض." },
    
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
      es: { title: "Presentar Impuestos (Ayuda Gratuita VITA)", description: "Si ganaste ingresos, debes presentar impuestos. VITA te ayuda gratis." },
      zh: { title: "申报税款（VITA免费帮助）", description: "如果有收入须报税。VITA提供免费帮助。" },
      hi: { title: "टैक्स फाइल करें (VITA मुफ़्त मदद)", description: "अगर आय अर्जित की है तो टैक्स रिटर्न दाखिल करना होगा।" },
      ar: { title: "تقديم الضرائب (مساعدة VITA المجانية)", description: "إذا كسبت دخلاً، يجب تقديم إقرار ضريبي. VITA تساعد مجاناً." },
    
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
      es: { title: "Conectar con Ayuda Legal de Inmigración", description: "Encuentra un abogado de inmigración gratuito o de bajo costo." },
      zh: { title: "联系移民法律援助", description: "寻找免费或低成本的移民律师。" },
      hi: { title: "इमिग्रेशन कानूनी सहायता से जुड़ें", description: "मुफ़्त या कम लागत का इमिग्रेशन वकील खोजें।" },
      ar: { title: "التواصل مع المساعدة القانونية للهجرة", description: "ابحث عن محامي هجرة مجاني أو منخفض التكلفة." },
    
      fr: { title: "Se Connecter avec l'Aide Juridique en Immigration", description: "Les avocats en droit de l'immigration gratuits ou à faible coût peuvent vous aider avec le renouvellement de statut, l'asile et la citoyenneté.", tips: ["Recherchez des organisations accréditées EOIR", "Méfiez-vous des "notarios" — ce ne sont pas des avocats", "Les services d'aide juridique sont souvent gratuits pour les réfugiés"] },
    
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
      es: { title: "Unirse a Organizaciones Comunitarias y Culturales", description: "Conéctate con tu comunidad para apoyo social y redes." },
      zh: { title: "加入社区和文化组织", description: "连接侨民社区获得社会支持和人脉。" },
      hi: { title: "सामुदायिक और सांस्कृतिक संगठनों से जुड़ें", description: "सामाजिक सहायता के लिए अपने प्रवासी समुदाय से जुड़ें।" },
      ar: { title: "انضم إلى المنظمات المجتمعية والثقافية", description: "تواصل مع مجتمعك للدعم الاجتماعي والتواصل." },
    
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
      es: { title: "Configurar Pago del Préstamo de Viaje IOM", description: "Si recibiste un préstamo de viaje IOM, debes comenzar el pago. Es sin intereses." },
      zh: { title: "设置IOM旅行贷款还款", description: "如果你收到了IOM旅行贷款，需要开始还款。无利息。" },
      hi: { title: "IOM यात्रा ऋण चुकौती सेट करें", description: "अगर IOM यात्रा ऋण मिला था, तो चुकौती शुरू करें। ब्याज-मुक्त।" },
      ar: { title: "إعداد سداد قرض السفر من IOM", description: "إذا حصلت على قرض سفر IOM، ابدأ السداد. القرض بدون فوائد." },
    
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
