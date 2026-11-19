export type Language = 'vi' | 'en';
export type CategoryId = 'space-quantum' | 'ai-robotics' | 'materials-energy';
export type ViewRoute = 'home' | CategoryId | 'about';

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface CategoryMeta {
  id: CategoryId;
  index: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  bannerScope: LocalizedText;
  coverImage: string;
  coverAlt: LocalizedText;
}

export interface SystemTierSpec {
  id: string;
  tierLabel: LocalizedText;
  name: LocalizedText;
  subtitle: LocalizedText;
  altitudeOrZone: LocalizedText;
  computeRole: LocalizedText;
  keySpecs: { label: LocalizedText; value: string; unit: string }[];
  engineeringSummary: LocalizedText;
  linkProtocol: LocalizedText;
}

export interface ArticleSection {
  id: string;
  index: string;
  title: LocalizedText;
  lead: LocalizedText;
  paragraphs: { vi: string[]; en: string[] };
  pullQuote?: LocalizedText;
  showArchitectureDiagram?: boolean;
  highlights?: { title: LocalizedText; detail: LocalizedText }[];
}

export interface BlueprintMetric {
  label: LocalizedText;
  value: string;
  unit: string;
  context: LocalizedText;
}

export interface BlueprintItem {
  id: string;
  issueNumber: string;
  category: CategoryId;
  status: 'published' | 'in-progress';
  publishedDate: LocalizedText;
  readTime: LocalizedText;
  author: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  heroImage: string;
  heroImageAlt: LocalizedText;
  heroCaption?: LocalizedText;
  contentOrigin?: 'speculative-fiction-ai-assisted';
  metrics?: BlueprintMetric[];
  tiers?: SystemTierSpec[];
  sections?: ArticleSection[];
  keyPillars?: { vi: string[]; en: string[] };
}

export interface ArchitecturalComment {
  id: string;
  author: string;
  isAnonymous?: boolean;
  content: string;
  createdAt: string;
}

export const UI_COPY = {
  vi: {
    brand: 'HORIZON BLUEPRINT',
    slogan: 'Lưu trữ những bản thiết kế kiến trúc cho kỷ nguyên tiếp theo',
    nav: {
      home: 'Trang chủ',
      spaceQuantum: 'Vũ trụ & Lượng tử',
      aiRobotics: 'AI & Robot',
      materialsEnergy: 'Vật liệu & Năng lượng',
      about: 'Giới thiệu',
    },
    home: {
      eyebrow: 'Ấn phẩm Kiến trúc Công nghệ Tương lai',
      heroTitle: 'Lưu trữ những bản thiết kế kiến trúc cho kỷ nguyên tiếp theo',
      heroDesc:
        'HORIZON BLUEPRINT kết hợp tư duy kỹ thuật hệ thống với tầm nhìn dài hạn 20–50 năm để phác thảo cấu trúc của các nền tảng vũ trụ, trí tuệ phân tán và năng lượng tiên phong.',
      exploreCta: 'Khám phá các chuyên mục',
      latestCta: 'Đọc bản thiết kế mới nhất',
      pillarsKicker: 'Các Trụ Cột Nghiên Cứu',
      pillarsHeading: 'Ba Lĩnh Vực Kiến Trúc Cốt Lõi',
      pillarsSubheading:
        'Mỗi chuyên mục là một không gian lưu trữ độc lập cho các hồ sơ phân tích chuyên sâu và ý tưởng đang trong quá trình phác thảo.',
      openCategory: 'Mở chuyên mục',
      publishedUnit: 'bài viết hoàn chỉnh',
      inProgressUnit: 'đang phác thảo',
      teaserKicker: 'Bản Thiết Kế Mới Nhất',
      teaserHeading: 'Ấn Phẩm Nổi Bật Đang Xuất Bản',
      teaserCta: 'Đọc bản thiết kế',
    },
    category: {
      backHome: 'Quay lại Trang chủ',
      publishedSectionTitle: 'Bản Thiết Kế Hoàn Chỉnh',
      inProgressSectionTitle: 'Hồ Sơ Đang Phác Thảo',
      inProgressBadge: 'Đang phác thảo',
      notifyBtn: 'Nhận thông báo khi xuất bản',
      notifiedBtn: 'Đã đăng ký nhận thông báo',
      notifyModalTitle: 'Đăng ký nhận thông báo xuất bản',
      notifyModalDesc:
        'Nhập email của bạn để nhận thông báo ngay khi bản thiết kế này hoàn thiện phần mô phỏng kỹ thuật và được phát hành chính thức.',
      notifyEmailLabel: 'Địa chỉ email *',
      notifyEmailPlaceholder: 'ban@mien-cong-nghe.vn',
      notifyError: 'Vui lòng nhập địa chỉ email hợp lệ.',
      notifyConfirmBtn: 'Xác nhận đăng ký',
      notifyCancelBtn: 'Hủy',
      pillarsLabel: 'Trọng tâm nghiên cứu dự kiến',
      readBlueprintBtn: 'Đọc bài viết chi tiết',
    },
    article: {
      issuePrefix: 'Bản thiết kế',
      documentHeading: 'Tài liệu Kiến trúc Hệ thống Chi tiết',
      tocTitle: 'Mục lục Bản thiết kế',
      fontSizeLabel: 'Cỡ chữ đọc',
      decreaseFont: 'Giảm cỡ chữ',
      increaseFont: 'Tăng cỡ chữ',
      focusEnter: 'Chế độ đọc tập trung',
      focusExit: 'Thoát tập trung',
      focusTag: 'Tập',
    },
    diagram: {
      heading: 'Sơ đồ Tương tác: Kiến trúc Điện toán Biên Không gian 3 Tầng',
      subheading:
        'Chọn từng tầng hệ thống để kiểm tra thông số vận hành và giao thức liên kết',
      badge: '3-Tier Orbital Continuum',
      zonePrefix: 'Vùng hoạt động:',
      computeRolePrefix: 'Vai trò tính toán:',
      linkProtocolPrefix: 'Giao thức liên kết:',
    },
    discussion: {
      kicker: 'Đóng góp Kiến trúc · Lưu trữ Cục bộ',
      heading: 'Đóng góp ý tưởng kiến trúc',
      countSuffix: 'đóng góp',
      authorLabel: 'Tên / Biệt danh kỹ sư (tùy chọn)',
      authorPlaceholder: 'Để trống nếu muốn đăng Ẩn danh',
      anonymousName: 'Ẩn danh',
      contentLabel: 'Nội dung đóng góp ý tưởng (10 – 1.000 ký tự) *',
      contentPlaceholder:
        'Chia sẻ góc nhìn kỹ thuật của bạn về kiến trúc tàu mẹ lượng tử, mạng chuyển tiếp QKD hoặc bầy robot bề mặt...',
      lengthError:
        'Nội dung đóng góp cần có độ dài từ 10 đến 1.000 ký tự để đảm bảo chất lượng thảo luận kỹ thuật.',
      moderationError:
        'Nội dung không thể đăng tải do chứa từ khóa nhạy cảm (chính trị, tôn giáo, công kích) hoặc không phù hợp với tiêu chuẩn thảo luận khoa học của HORIZON BLUEPRINT.',
      storageNote:
        'Đóng góp của bạn được kiểm duyệt cục bộ và lưu trữ trên trình duyệt (localStorage).',
      submitBtn: 'Gửi đóng góp kiến trúc',
      emptyState:
        'Chưa có đóng góp kiến trúc nào. Hãy là người đầu tiên chia sẻ góc nhìn kỹ thuật của bạn cho bản thiết kế này.',
      deleteAria: 'Xóa đóng góp của bạn',
      deleteLabel: 'Xóa',
    },
    transparency: {
      badgeLabel: 'Ý tưởng giả tưởng • Đồng sáng tạo bởi AI',
      badgeTooltip:
        'Bản thiết kế mô phỏng tương lai do con người định hướng kiến trúc và AI hỗ trợ biên tập dựa trên nguyên lý vật lý nền tảng.',
      disclaimerTitle: 'Lưu ý minh bạch nguồn gốc nội dung',
      disclaimerPrefix: 'Lưu ý minh bạch:',
      disclaimerBody:
        'Nội dung này được phát triển với sự hỗ trợ của AI dựa trên các nguyên lý khoa học chính thống, mang tính chất khoa học giả tưởng (Speculative Science) và định hướng ý tưởng tương lai — không phải công trình nghiên cứu thực nghiệm đã được kiểm chứng.',
    },
    about: {
      kicker: 'Triết Lý Hoạt Động · HORIZON BLUEPRINT',
      heading: 'Kết Nối Tư Duy Kỹ Thuật Thực Tế Với Tầm Nhìn 20–50 Năm Tới',
      lead: 'HORIZON BLUEPRINT ra đời để trả lời một câu hỏi đơn giản: Nếu không bị giới hạn bởi chu kỳ tin tức ngắn hạn, những hệ thống công nghệ định hình nửa thế kỷ tới sẽ có cấu trúc vật lý và kiến trúc vận hành như thế nào?',
      paragraphs: [
        'Phần lớn nội dung công nghệ hiện nay rơi vào hai thái cực: hoặc là tin tức sản phẩm tiêu dùng ngắn hạn, hoặc là khoa học viễn tưởng hoàn toàn tách rời khỏi các định luật nhiệt động lực học và ngân sách năng lượng. HORIZON BLUEPRINT chọn con đường thứ ba — phác thảo bản thiết kế kiến trúc hệ thống dựa trên các nguyên lý vật lý nền tảng (first principles).',
        'Mỗi bản thiết kế đều bắt đầu từ một nút thắt thực tế (độ trễ tốc độ ánh sáng, giới hạn tải trọng tên lửa, bức xạ vũ trụ hay mật độ năng lượng), sau đó đề xuất một cấu trúc phân tầng rõ ràng để biến khái niệm tưởng chừng xa vời thành lộ trình kỹ thuật có thể phản biện và kiểm chứng.',
      ],
      principlesTitle: 'Ba Nguyên Tắc Biên Tập Cốt Lõi',
      principles: [
        {
          index: '01',
          title: 'Tôn trọng Giới hạn Vật lý',
          desc: 'Mọi kiến trúc đều tính đến đánh đổi về khối lượng, nhiệt độ, độ trễ truyền tin và dung sai bức xạ thay vì giả định các "hộp đen phép màu".',
        },
        {
          index: '02',
          title: 'Tư duy Cấu trúc Hệ thống',
          desc: 'Tập trung vào cách các tầng phần cứng, giao thức truyền dẫn và thuật toán phối hợp thành một tổng thể tự trị bền vững.',
        },
        {
          index: '03',
          title: 'Phản biện Kỹ thuật Mở',
          desc: 'Mỗi bài viết là một bản thảo sống, luôn mở đón nhận góp ý từ kỹ sư, nhà nghiên cứu và độc giả đa ngành để hoàn thiện từng chi tiết.',
        },
      ],
      ctaExplore: 'Xem Bản Thiết Kế #01',
    },
    footer: {
      copyright: '© 2026',
    },
  },
  en: {
    brand: 'HORIZON BLUEPRINT',
    slogan: 'Archiving architectural blueprints for the next era',
    nav: {
      home: 'Home',
      spaceQuantum: 'Space & Quantum',
      aiRobotics: 'AI & Robotics',
      materialsEnergy: 'Materials & Energy',
      about: 'About',
    },
    home: {
      eyebrow: 'Future Systems Architecture Publication',
      heroTitle: 'Archiving architectural blueprints for the next era',
      heroDesc:
        'HORIZON BLUEPRINT pairs pragmatic systems engineering with a 20-to-50-year horizon to sketch the topologies of orbital quantum fleets, autonomous swarms, and frontier energy systems.',
      exploreCta: 'Explore Categories',
      latestCta: 'Read Latest Blueprint',
      pillarsKicker: 'Research Pillars',
      pillarsHeading: 'Three Core Architectural Domains',
      pillarsSubheading:
        'Each pillar serves as a dedicated archive housing published technical dossiers and blueprints currently in active drafting.',
      openCategory: 'Open Category',
      publishedUnit: 'published blueprint',
      inProgressUnit: 'in progress',
      teaserKicker: 'Latest Blueprint',
      teaserHeading: 'Featured Architecture Dossier',
      teaserCta: 'Read Blueprint',
    },
    category: {
      backHome: 'Back to Home',
      publishedSectionTitle: 'Published Blueprint',
      inProgressSectionTitle: 'Blueprints in Progress',
      inProgressBadge: 'Blueprint in Progress',
      notifyBtn: 'Notify on Publication',
      notifiedBtn: 'Notification Requested',
      notifyModalTitle: 'Subscribe to Publication Alert',
      notifyModalDesc:
        'Enter your email to be notified the moment this blueprint completes technical modeling and goes live.',
      notifyEmailLabel: 'Email address *',
      notifyEmailPlaceholder: 'you@engineering-domain.com',
      notifyError: 'Please enter a valid email address.',
      notifyConfirmBtn: 'Confirm Subscription',
      notifyCancelBtn: 'Cancel',
      pillarsLabel: 'Projected Engineering Pillars',
      readBlueprintBtn: 'Read Full Blueprint',
    },
    article: {
      issuePrefix: 'Blueprint',
      documentHeading: 'Detailed System Architecture Specification',
      tocTitle: 'Blueprint Outline',
      fontSizeLabel: 'Reading Size',
      decreaseFont: 'Decrease font size',
      increaseFont: 'Increase font size',
      focusEnter: 'Focus Mode',
      focusExit: 'Exit Focus',
      focusTag: 'Issue',
    },
    diagram: {
      heading: 'Interactive Schematic: 3-Tier Orbital Edge Computing Continuum',
      subheading:
        'Select each architectural tier to inspect operational telemetry and link protocols',
      badge: '3-Tier Orbital Continuum',
      zonePrefix: 'Operational Zone:',
      computeRolePrefix: 'Compute Role:',
      linkProtocolPrefix: 'Link Protocol:',
    },
    discussion: {
      kicker: 'Architecture Contributions · Local Storage',
      heading: 'Architecture Contributions & Feedback',
      countSuffix: 'contributions',
      authorLabel: 'Engineer Name / Handle (optional)',
      authorPlaceholder: 'Leave blank to post as Anonymous',
      anonymousName: 'Anonymous',
      contentLabel: 'Architectural contribution (10 – 1,000 characters) *',
      contentPlaceholder:
        'Share your technical perspective on the orbital quantum server, QKD relay mesh, or surface edge swarm...',
      lengthError:
        'Contributions must be between 10 and 1,000 characters to maintain high-signal technical discussion.',
      moderationError:
        'Unable to post content due to sensitive keywords (politics, religion, harassment) or violation of HORIZON BLUEPRINT\'s scientific discussion guidelines.',
      storageNote:
        'Contributions are moderated client-side and saved directly in your browser (localStorage).',
      submitBtn: 'Submit Contribution',
      emptyState:
        'No architectural contributions yet. Be the first to share your technical perspective on this blueprint.',
      deleteAria: 'Delete your contribution',
      deleteLabel: 'Delete',
    },
    transparency: {
      badgeLabel: 'Speculative Concept • Co-created with AI',
      badgeTooltip:
        'A future-simulation blueprint directed by human systems architects and co-edited with AI using established physical principles.',
      disclaimerTitle: 'Content Transparency Notice',
      disclaimerPrefix: 'Transparency Notice:',
      disclaimerBody:
        'This content was co-created with AI based on established scientific principles. It represents speculative science and future architectural concepts—not a peer-reviewed or empirically verified scientific paper.',
    },
    about: {
      kicker: 'Editorial Philosophy · HORIZON BLUEPRINT',
      heading: 'Bridging Pragmatic Engineering with a 20–50 Year Horizon',
      lead: 'HORIZON BLUEPRINT exists to answer a focused question: free from daily news cycles, what will the physical topologies and operational architectures of next-half-century technologies actually look like?',
      paragraphs: [
        'Most technology writing falls into two extremes: fleeting consumer product updates, or speculative fiction unmoored from thermodynamics and payload budgets. HORIZON BLUEPRINT takes a third path—drafting system blueprints grounded in physical first principles.',
        'Every dossier begins with a concrete physical bottleneck—speed-of-light latency, rocket mass ceilings, cosmic radiation, or thermal flux—and constructs a tiered architecture capable of turning long-range concepts into rigorous engineering roadmaps.',
      ],
      principlesTitle: 'Three Core Editorial Principles',
      principles: [
        {
          index: '01',
          title: 'First-Principles Physics',
          desc: 'Every architecture accounts for mass, thermal envelopes, propagation delay, and radiation tolerance—never relying on magic black boxes.',
        },
        {
          index: '02',
          title: 'Whole-System Topology',
          desc: 'We focus on how hardware tiers, optical/RF protocols, and distributed algorithms interlock into resilient autonomous systems.',
        },
        {
          index: '03',
          title: 'Open Architectural Critique',
          desc: 'Each published blueprint is a living technical document open to peer review from engineers, researchers, and curious builders.',
        },
      ],
      ctaExplore: 'Read Blueprint #01',
    },
    footer: {
      copyright: '© 2026',
    },
  },
} as const;

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'space-quantum',
    index: '01',
    name: {
      vi: 'Vũ trụ & Lượng tử',
      en: 'Space & Quantum',
    },
    shortDescription: {
      vi: 'Điện toán lượng tử quỹ đạo, mạng truyền tin laser QKD không gian sâu và kiến trúc động cơ đẩy liên sao.',
      en: 'Orbital quantum computing, deep-space QKD optical meshes, and interstellar propulsion topologies.',
    },
    bannerScope: {
      vi: 'Nghiên cứu cách tận dụng chân không tuyệt đối, nhiệt độ cryogenic tự nhiên và vật lý lượng tử để phá vỡ nút thắt khoảng cách ánh sáng trong thám hiểm không gian sâu.',
      en: 'Exploring how deep-space vacuum, passive cryogenic shadows, and quantum information protocols break speed-of-light bottlenecks across planetary exploration.',
    },
    coverImage: '/src/assets/images/hero_quantum_mothership_1795056797887.jpg',
    coverAlt: {
      vi: 'Tàu mẹ máy chủ lượng tử trên quỹ đạo',
      en: 'Orbital quantum server mothership',
    },
  },
  {
    id: 'ai-robotics',
    index: '02',
    name: {
      vi: 'AI & Robot',
      en: 'AI & Robotics',
    },
    shortDescription: {
      vi: 'Trí tuệ bầy đàn tự trị, robot tự tái tạo từ tài nguyên tại chỗ và hệ thần kinh điều phối nhà máy không trọng lực.',
      en: 'Autonomous swarm intelligence, in-situ self-replicating rovers, and zero-gravity manufacturing control planes.',
    },
    bannerScope: {
      vi: 'Thiết kế kiến trúc phần cứng tối giản kết hợp thuật toán đồng thuận phân tán cho các tập thể robot hoạt động tự trị tại những môi trường khắc nghiệt nhất.',
      en: 'Architecting ultralight modular robotics and decentralized consensus protocols for autonomous swarms operating in extreme, communications-denied environments.',
    },
    coverImage: '/src/assets/images/blueprint_lunar_swarm_1795056798404.jpg',
    coverAlt: {
      vi: 'Bầy robot tự hành in 3D trên bề mặt Mặt Trăng',
      en: 'Autonomous robotic swarm 3D printing on lunar regolith',
    },
  },
  {
    id: 'materials-energy',
    index: '03',
    name: {
      vi: 'Vật liệu & Năng lượng',
      en: 'Materials & Energy',
    },
    shortDescription: {
      vi: 'Siêu vật liệu tự phục hồi, lớp vỏ kim loại lỏng cho lò nhiệt hạch và mạng lưới thu phát năng lượng mặt trời quỹ đạo.',
      en: 'Self-healing metamaterials, liquid-metal fusion blankets, and orbital microwave solar transmission grids.',
    },
    bannerScope: {
      vi: 'Phác thảo các hệ thống vật liệu chịu bức xạ cực hạn và hạ tầng phát điện mật độ cao nhằm cung cấp năng lượng bền vững cho nền văn minh đa hành tinh.',
      en: 'Designing radiation-resilient metamaterials and high-density power transmission infrastructures to sustain orbital industry and planetary outposts.',
    },
    coverImage: '/src/assets/images/blueprint_fusion_blanket_1795058190367.jpg',
    coverAlt: {
      vi: 'Lõi lò phản ứng nhiệt hạch với lớp vỏ siêu vật liệu kim loại lỏng',
      en: 'Compact stellarator fusion core with liquid-metal metamaterial blanket',
    },
  },
];

export const BLUEPRINTS: BlueprintItem[] = [
  {
    id: 'blueprint-01',
    issueNumber: '01',
    category: 'space-quantum',
    status: 'published',
    publishedDate: {
      vi: '18 Tháng 11, 2026',
      en: 'November 18, 2026',
    },
    readTime: {
      vi: '12 phút đọc',
      en: '12 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Kiến trúc Hạm đội Thăm dò Vũ trụ Tự trị: Tàu mẹ Máy chủ Lượng tử & Bầy Robot Vệ tinh',
      en: 'Autonomous Space Exploration Fleet Architecture: Quantum Server Mothership & Satellite Robot Swarms',
    },
    summary: {
      vi: 'Thay vì trang bị chip lượng tử đắt đỏ lên từng robot nhỏ, chúng ta sản xuất hàng loạt các tàu vũ trụ mẹ mang theo một "Máy chủ Lượng tử" làm lõi trung tâm trên quỹ đạo. Xung quanh tàu mẹ là mạng lưới vệ tinh do thám và bầy robot bề mặt hoạt động như các nút thu thập dữ liệu (Edge Nodes).',
      en: 'Instead of placing expensive quantum processors inside every miniature rover, we deploy orbital motherships carrying a centralized "Quantum Server" core. Surrounding the mothership is a reconnaissance satellite relay mesh and a mass-produced swarm of surface robots operating as agile Edge Nodes.',
    },
    heroImage: '/src/assets/images/hero_quantum_mothership_1795056797887.jpg',
    heroImageAlt: {
      vi: 'Tàu mẹ máy chủ lượng tử trên quỹ đạo hành tinh đang truyền tín hiệu laser tới mạng lưới vệ tinh và bầy robot bề mặt',
      en: 'Orbital quantum server mothership projecting coherent laser links to a relay satellite constellation and surface rover nodes',
    },
    heroCaption: {
      vi: 'Hình 01 — Mô phỏng kiến trúc phân tầng: Tàu mẹ quỹ đạo duy trì kết nối quang học đa điểm tới mạng vệ tinh chuyển tiếp và các nút robot bề mặt.',
      en: 'Fig. 01 — Tiered architecture simulation: The orbital mothership maintains multi-point optical links to the relay constellation and surface edge nodes.',
    },
    metrics: [
      {
        label: {
          vi: 'Độ trễ Quỹ đạo — Bề mặt',
          en: 'Orbit-to-Surface Latency',
        },
        value: '3.8',
        unit: 'ms',
        context: {
          vi: 'Thay thế độ trễ 4–24 phút từ Trái Đất',
          en: 'Replaces 4–24 min Earth round-trip lag',
        },
      },
      {
        label: {
          vi: 'Nhiệt độ Bức xạ Thụ động',
          en: 'Passive Cryo Envelope',
        },
        value: '11.4',
        unit: 'K',
        context: {
          vi: 'Tận dụng chân không sâu & vùng tối quỹ đạo',
          en: 'Leverages deep vacuum & orbital shadow',
        },
      },
      {
        label: {
          vi: 'Băng thông Laser QKD',
          en: 'QKD Laser Bandwidth',
        },
        value: '12.5',
        unit: 'Gbps',
        context: {
          vi: 'Mã hóa khóa lượng tử chống nhiễu bức xạ',
          en: 'Quantum key distribution optical downlink',
        },
      },
      {
        label: {
          vi: 'Mật độ Nút Bề mặt',
          en: 'Surface Edge Density',
        },
        value: '240+',
        unit: 'Nodes',
        context: {
          vi: 'Robot Edge sản xuất hàng loạt mỗi hạm đội',
          en: 'Mass-produced edge rovers per fleet',
        },
      },
    ],
    tiers: [
      {
        id: 'tier-1',
        tierLabel: { vi: 'Tầng 01', en: 'Tier 01' },
        name: {
          vi: 'Tàu mẹ Máy chủ Lượng tử Quỹ đạo',
          en: 'Orbital Quantum Server Mothership',
        },
        subtitle: {
          vi: 'Lõi tính toán tập trung & trung tâm điều phối chiến lược',
          en: 'Centralized compute core & strategic swarm orchestrator',
        },
        altitudeOrZone: {
          vi: 'Quỹ đạo đồng bộ thấp (420 – 800 km)',
          en: 'Low Synchronous Orbit (420 – 800 km)',
        },
        computeRole: {
          vi: 'Xử lý QAOA, mô phỏng phổ vật chất & tối ưu quỹ đạo bầy đàn',
          en: 'QAOA optimization, molecular spectroscopy & swarm routing',
        },
        keySpecs: [
          {
            label: { vi: 'Dung lượng Qubit Lô-gic', en: 'Logical Qubit Capacity' },
            value: '1,024',
            unit: 'Logical Qubits',
          },
          {
            label: { vi: 'Chân không Tự nhiên', en: 'Ambient Vacuum' },
            value: '10⁻¹¹',
            unit: 'Torr',
          },
          {
            label: { vi: 'Ngân sách Nhiệt Lõi', en: 'Core Thermal Envelope' },
            value: '11.4',
            unit: 'Kelvin',
          },
        ],
        engineeringSummary: {
          vi: 'Mang theo một bộ xử lý lượng tử siêu dẫn hoặc bẫy ion quy mô lớn được che chắn từ trường đa lớp. Nhờ vận hành trong chân không vũ trụ và sử dụng tấm chắn bức xạ mặt trời đa tầng (sunshield), tàu mẹ loại bỏ tới 70% khối lượng hệ thống làm lạnh cồng kềnh so với trung tâm dữ liệu mặt đất.',
          en: 'Houses a large-scale superconducting or trapped-ion quantum processor wrapped in multi-layer magnetic shielding. By operating directly in deep-space vacuum behind passive multi-layer sunshields, the mothership eliminates up to 70% of the bulky cryogenic infrastructure required on Earth.',
        },
        linkProtocol: {
          vi: 'Đường truyền quang học kết hợp liên quỹ đạo (Coherent Optical Downlink)',
          en: 'Coherent Cross-Orbit Optical Downlink',
        },
      },
      {
        id: 'tier-2',
        tierLabel: { vi: 'Tầng 02', en: 'Tier 02' },
        name: {
          vi: 'Mạng lưới Vệ tinh Chuyển tiếp QKD',
          en: 'QKD Laser Relay Constellation',
        },
        subtitle: {
          vi: 'Hạ tầng định tuyến laser & đồng bộ hóa pha thời gian thực',
          en: 'Optical routing mesh & real-time phase synchronization',
        },
        altitudeOrZone: {
          vi: 'Quỹ đạo tầm trung phân tán (1,200 km)',
          en: 'Distributed Mid-Orbit Shell (1,200 km)',
        },
        computeRole: {
          vi: 'Phân phối khóa lượng tử (QKD) & chuyển tiếp gói tin không điểm mù',
          en: 'Quantum Key Distribution & zero-blindspot packet relay',
        },
        keySpecs: [
          {
            label: { vi: 'Số lượng Vệ tinh Lưới', en: 'Relay MicroSats' },
            value: '18',
            unit: 'Nodes',
          },
          {
            label: { vi: 'Tốc độ Chuyển tiếp', en: 'Optical Throughput' },
            value: '12.5',
            unit: 'Gbps',
          },
          {
            label: { vi: 'Sai số Đồng bộ Pha', en: 'Phase Sync Jitter' },
            value: '< 80',
            unit: 'ps',
          },
        ],
        engineeringSummary: {
          vi: 'Đóng vai trò như hệ thống thần kinh trung gian giữa tàu mẹ và bề mặt thiên thể. Các chùm laser bước sóng 1550 nm tự động bám mục tiêu quang học, đảm bảo các robot nằm trong hố sâu thiên thạch hay vùng khuất mặt trăng vẫn duy trì kết nối liên tục với lõi lượng tử.',
          en: 'Functions as the intermediary nervous system linking orbit to terrain. Autonomous 1550 nm adaptive optical beams track surface units continuously, ensuring rovers inside deep impact craters or far-side canyons never lose low-latency contact with the quantum core.',
        },
        linkProtocol: {
          vi: 'Laser hồng ngoại thích nghi & giao thức BB84 trên không gian tự do',
          en: 'Adaptive IR Laser & Free-Space BB84 QKD',
        },
      },
      {
        id: 'tier-3',
        tierLabel: { vi: 'Tầng 03', en: 'Tier 03' },
        name: {
          vi: 'Bầy Robot Thăm dò Bề mặt (Edge Nodes)',
          en: 'Surface Exploration Swarm (Edge Nodes)',
        },
        subtitle: {
          vi: 'Thiết bị thu thập cảm biến giá rẻ, tối giản hóa phần cứng',
          en: 'Low-cost, mass-produced sensory collectors',
        },
        altitudeOrZone: {
          vi: 'Bề mặt hành tinh, hố va chạm & hang dung nham',
          en: 'Planetary Surface, Craters & Lava Tubes',
        },
        computeRole: {
          vi: 'Thu thập quang phổ, LiDAR, địa chấn & thực thi lệnh bầy đàn',
          en: 'Spectroscopy, LiDAR, seismic capture & swarm actuation',
        },
        keySpecs: [
          {
            label: { vi: 'Khối lượng Mỗi Nút', en: 'Unit Mass Budget' },
            value: '4.6',
            unit: 'kg',
          },
          {
            label: { vi: 'Vi xử lý Tại chỗ', en: 'Local Processor' },
            value: 'RISC-V',
            unit: 'Rad-Hard',
          },
          {
            label: { vi: 'Chi phí Đơn vị Tương đối', en: 'Relative Unit Cost' },
            value: '0.03×',
            unit: 'Legacy Rover',
          },
        ],
        engineeringSummary: {
          vi: 'Không mang chip lượng tử hay AI nặng nề. Mỗi robot chỉ giữ lại cảm biến chính xác, khung gầm siêu nhẹ và chip điều khiển cổ điển tiêu thụ dưới 15 W. Nếu một robot hỏng do địa hình khắc nghiệt, hạm đội mất chưa tới 0.5% năng lực thu thập mà không tổn thất trí tuệ lõi.',
          en: 'Stripped of heavy onboard AI or delicate quantum hardware. Each robot carries only precision sensors, an ultralight chassis, and a sub-15 W radiation-hardened classical controller. Losing a single node to harsh terrain costs less than 0.5% of fleet sensory capacity with zero loss of intelligence.',
        },
        linkProtocol: {
          vi: 'Uplink quang-vô tuyến băng thông hẹp độ trễ thấp (3.8 ms)',
          en: 'Low-Latency Optical-RF Micro Uplink (3.8 ms)',
        },
      },
    ],
    sections: [
      {
        id: 'section-01',
        index: '01',
        title: {
          vi: 'Bối cảnh & Nút thắt hiện tại',
          en: 'Context & Current Bottlenecks',
        },
        lead: {
          vi: 'Khi khoảng cách ánh sáng và giới hạn tải trọng đang khóa chặt kỷ nguyên thăm dò không gian sâu.',
          en: 'How speed-of-light latency and payload mass ceilings constrain deep-space autonomy.',
        },
        paragraphs: {
          vi: [
            'Trong hơn nửa thế kỷ, nhân loại khám phá các thiên thể theo triết lý "một cỗ máy toàn năng": dồn toàn bộ phòng thí nghiệm hóa học, bộ xử lý chịu bức xạ và hệ thống tự hành phức tạp lên một chiếc rover đơn độc trị giá hàng tỷ USD. Kết quả là những cỗ máy nặng gần một tấn nhưng di chuyển với tốc độ vài chục mét mỗi giờ, phải liên tục dừng lại để chờ mệnh lệnh từ Trái Đất.',
            'Nút thắt lớn nhất không nằm ở bánh xe hay pin hạt nhân, mà ở vật lý truyền tin. Ánh sáng cần từ 4 đến 24 phút để đi một chiều từ Trái Đất tới Sao Hỏa, và gần một giờ để chạm tới hệ Sao Mộc. Không một hệ thống điều khiển thời gian thực nào có thể vận hành hiệu quả qua một sợi dây liên lạc trễ hàng chục phút. Khi một robot gặp vách đá sụt lở hay dòng khí methane bất thường, cơ hội khoa học đã trôi qua trước khi tín hiệu cảnh báo kịp về tới trung tâm điều khiển mặt đất.',
            'Để giải phóng tính tự trị, xu hướng tất yếu là đưa năng lực tính toán đỉnh cao — đặc biệt là điện toán lượng tử và mạng nơ-ron mô phỏng — đến gần hiện trường nhất có thể. Thế nhưng, không thể gắn trực tiếp một bộ xử lý lượng tử đòi hỏi nhiệt độ cận độ không tuyệt đối lên từng robot thăm dò nhỏ bé. Bài toán tải trọng phóng tên lửa (launch mass budget) và chi phí sản xuất sẽ lập tức phá sản nếu nhân bản phần cứng lượng tử cho hàng trăm thiết bị bề mặt.',
          ],
          en: [
            'For over half a century, planetary exploration has followed an "all-in-one monolith" philosophy: packing an entire analytical chemistry lab, radiation-hardened avionics, and navigation logic onto a single multi-billion-dollar rover. The result is a one-ton machine crawling at tens of meters per hour, pausing constantly to await instructions from Earth.',
            'The true bottleneck is neither traction nor nuclear batteries—it is the physics of communication. Light requires 4 to 24 minutes one-way between Earth and Mars, and nearly an hour to reach the Jovian system. No true real-time closed-loop control can survive a forty-minute round-trip tether. By the time a hazard alert or transient methane plume reaches mission control, the scientific window has already closed.',
            'Unlocking genuine autonomy demands bringing frontier compute—especially quantum optimization and physics simulation—directly to the operational theater. Yet placing cryogenic quantum processors onto dozens of rugged surface rovers is physically and economically impossible. Launch mass budgets and fabrication costs collapse immediately if fragile quantum hardware must be replicated across every ground unit.',
          ],
        },
        pullQuote: {
          vi: 'Thay vì cố gắng đưa bộ não đắt đỏ xuống bùn đất phóng xạ của hành tinh lạ, hãy giữ bộ não trong sự tĩnh lặng lạnh giá của quỹ đạo và triển khai hàng trăm đôi tay cơ khí giá rẻ bên dưới.',
          en: 'Instead of forcing fragile, expensive brains down into abrasive planetary dust, keep the intelligence in the cold stillness of orbit and deploy hundreds of expendable mechanical hands below.',
        },
      },
      {
        id: 'section-02',
        index: '02',
        title: {
          vi: 'Cấu trúc hệ thống 3 tầng',
          en: '3-Tier System Architecture',
        },
        lead: {
          vi: 'Phân tách triệt để giữa trí tuệ lõi trên quỹ đạo và năng lực cảm biến phân tán trên bề mặt.',
          en: 'Decoupling centralized orbital quantum intelligence from distributed surface sensory nodes.',
        },
        paragraphs: {
          vi: [
            'Giải pháp kiến trúc của HORIZON BLUEPRINT tái định nghĩa hoàn toàn chuỗi giá trị thăm dò bằng mô hình điện toán biên không gian 3 tầng (Orbital-to-Edge Continuum). Thay vì dàn trải tài nguyên, toàn bộ năng lực tính toán lượng tử được cô đặc vào một Tàu mẹ (Mothership) duy nhất vận hành ổn định trên quỹ đạo.',
            'Điều kỳ diệu về mặt nhiệt động lực học nằm ở chỗ: không gian sâu vốn là một môi trường lý tưởng cho phần cứng lượng tử. Trên Trái Đất, một máy tính lượng tử tiêu tốn hàng chục kilowatt chỉ để vận hành máy nén heli lỏng tạo chân không và hạ nhiệt xuống vài milikelvin. Trên quỹ đạo, chân không tự nhiên đạt ngưỡng 10⁻¹¹ Torr miễn phí hoàn toàn, và một hệ thống tấm chắn bức xạ hướng ngược mặt trời có thể đưa khoang lõi xuống mức nhiệt cryogenic thụ động trước khi kích hoạt tầng làm lạnh vi mô cuối cùng.',
          ],
          en: [
            'HORIZON BLUEPRINT’s architectural proposal redefines planetary exploration around a 3-tier Orbital-to-Edge Continuum. Rather than diluting compute across dozens of landers, all high-density quantum processing is concentrated inside a single stabilized Orbital Mothership.',
            'Thermodynamically, deep space is the native habitat for quantum hardware. On Earth, dilution refrigerators burn tens of kilowatts simply maintaining ultra-high vacuum and cryogenic stages. In orbit, ambient vacuum reaches 10⁻¹¹ Torr for free, and multi-stage passive sunshields drop the processor bay into deep cryogenic regimes before micro-coolers bridge the final millikelvin gap.',
          ],
        },
        showArchitectureDiagram: true,
        highlights: [
          {
            title: {
              vi: 'Tầng 1 — Tàu mẹ Máy chủ Lượng tử',
              en: 'Tier 1 — Orbital Quantum Server Mothership',
            },
            detail: {
              vi: 'Đóng vai trò trung tâm dữ liệu quỹ đạo. Tích hợp bộ nhớ đồng bộ quang học và lõi xử lý lượng tử lai cổ điển (Hybrid QPU-GPU), tránh hoàn toàn bão bụi, dao động địa chấn và mài mòn cơ học của bề mặt hành tinh.',
              en: 'Serves as the orbital data center. Combines optical memory buffers with a hybrid QPU-GPU compute core, completely insulated from dust storms, seismic shocks, and mechanical wear on the planet below.',
            },
          },
          {
            title: {
              vi: 'Tầng 2 — Mạng Vệ tinh Truyền tin Laser (QKD)',
              en: 'Tier 2 — Quantum Key Laser Relay Mesh (QKD)',
            },
            detail: {
              vi: 'Vòng vệ tinh vi mô tạo cầu nối quang học liên tục, đảm bảo mọi gói dữ liệu cảm biến thô từ mặt đất được mã hóa bằng phân phối khóa lượng tử và truyền thẳng lên tàu mẹ không góc chết.',
              en: 'A ring of agile micro-satellites forming an unbroken optical bridge, encrypting raw telemetry via Quantum Key Distribution and routing streams to the mothership without terrain blindspots.',
            },
          },
          {
            title: {
              vi: 'Tầng 3 — Bầy Robot Bề mặt (Edge Nodes)',
              en: 'Tier 3 — Surface Robot Swarm (Edge Nodes)',
            },
            detail: {
              vi: 'Các robot sáu chân hoặc drone cánh quạt đồng trục siêu nhẹ được đóng gói theo dạng mô-đun phẳng, thả xuống đồng loạt như hạt giống. Chúng chỉ thu nhận tín hiệu vật lý và thực thi quỹ đạo di chuyển do tàu mẹ tính toán.',
              en: 'Flat-packed hexapods and coaxial micro-drones dispersed like seeds across landing zones. Stripped to essentials, they capture raw physical telemetry and execute trajectories computed in orbit.',
            },
          },
        ],
      },
      {
        id: 'section-03',
        index: '03',
        title: {
          vi: 'Sức mạnh vận hành thực tế',
          en: 'Operational Power in Action',
        },
        lead: {
          vi: 'Từ điều phối bầy đàn mili-giây tới sàng lọc tri thức khoa học ngay trước khi gửi về Trái Đất.',
          en: 'From millisecond swarm intelligence to in-situ quantum spectroscopy and semantic data triage.',
        },
        paragraphs: {
          vi: [
            'Khi lõi lượng tử nằm ngay trên đầu bầy robot với độ trễ khứ hồi dưới 4 mili-giây, hành vi của cả hạm đội thay đổi về chất. Thuật toán tối ưu hóa xấp xỉ lượng tử (QAOA) trên tàu mẹ có thể giải bài toán định tuyến đa tác tử cho 240 robot cùng lúc theo thời gian thực: phân vùng tìm kiếm băng nước, tránh vùng sụt lún theo dữ liệu địa chấn tức thì từ các robot đi trước, và tự động tái cấu trúc đội hình khi một nút bị mất tín hiệu.',
            'Quan trọng hơn cả là khả năng phân tích mẫu địa chất tại chỗ. Khi một robot bề mặt chiếu tia laser quang phổ LIBS vào mạch khoáng vật lạ, dữ liệu phổ thô được bắn lên tàu mẹ. Thay vì phải nén ảnh gửi về Trái Đất chờ các nhà khoa học phân tích suốt nhiều ngày, lõi lượng tử trên quỹ đạo chạy ngay mô phỏng cấu trúc phân tử (Variational Quantum Eigensolver) để xác định liệu mẫu đá đó có chứa dấu hiệu sinh học cổ đại hay đồng vị hiếm hay không. Nếu phát hiện bất thường giá trị cao, tàu mẹ lập tức điều phối 5 robot gần nhất hội tụ về tọa độ đó để khoan sâu và chụp cắt lớp trước khi mặt trời lặn.',
            'Cuối cùng, tàu mẹ thực hiện cơ chế sàng lọc dữ liệu thông minh (Semantic Triage). Băng thông truyền về Trái Đất luôn đắt đỏ và chật hẹp. Thay vì gửi hàng terabyte dữ liệu nhiễu đá bazan lặp đi lặp lại, hệ thống chỉ nén và gửi về Trái Đất những chuỗi tri thức đã được xác thực, bản đồ khoáng sản 3D đã hiệu chỉnh và các dị thường khoa học thực sự đáng giá.',
          ],
          en: [
            'With a quantum compute core hovering overhead at sub-4 millisecond round-trip latency, fleet behavior undergoes a phase transition. Running Quantum Approximate Optimization Algorithms (QAOA), the mothership solves multi-agent routing across 240+ rovers simultaneously: partitioning subsurface ice surveys, rerouting around unstable regolith detected by lead units, and healing formation gaps whenever a node goes dark.',
            'Even more transformative is real-time in-situ geochemical analysis. When a surface node fires its LIBS laser spectrometer at an unfamiliar mineral vein, raw spectral waveforms stream directly to orbit. Rather than queuing multi-day downloads to Earth, the mothership executes Variational Quantum Eigensolver (VQE) molecular simulations on the spot to flag biosignatures or rare isotopes. Upon detecting a high-value anomaly, it instantly converges the five nearest rovers to core-drill and tomographically scan the site before local sunset.',
            'Finally, the mothership acts as a semantic filter before deep-space transmission. Deep Space Network bandwidth is perpetually scarce. Instead of beaming terabytes of redundant basalt imagery home, the orbital server performs intelligent triage—transmitting only verified scientific discoveries, calibrated 3D mineral maps, and high-priority anomalies back to Earth.',
          ],
        },
      },
      {
        id: 'section-04',
        index: '04',
        title: {
          vi: 'Thách thức kỹ thuật cần vượt qua',
          en: 'Technical Challenges to Overcome',
        },
        lead: {
          vi: 'Cuộc chiến thầm lặng chống lại tia vũ trụ, nhiễu lượng tử và bài toán tự trị phần cứng tuyệt đối.',
          en: 'Confronting cosmic-ray decoherence and autonomous zero-touch orbital quantum calibration.',
        },
        paragraphs: {
          vi: [
            'Mọi bản thiết kế tham vọng đều phải đối mặt với sự khắc nghiệt của vật lý thực nghiệm. Thách thức tử huyệt đầu tiên của Máy chủ Lượng tử Quỹ đạo là bức xạ vũ trụ bậc cao — đặc biệt là các hạt ion nặng từ gió mặt trời và tia gamma sâu. Chỉ một hạt năng lượng cao xuyên qua lớp vỏ hợp kim cũng có thể tạo ra hiện tượng mất kết hợp hàng loạt (correlated decoherence), làm sụp đổ trạng thái chồng chập của hàng chục qubit vật lý chỉ trong vài nano-giây.',
            'Để giải quyết, kiến trúc tàu mẹ không thể dựa vào lớp chì nặng nề truyền thống. Thay vào đó, lõi QPU phải được bọc trong buồng siêu dẫn từ trường chủ động kết hợp lớp composite giàu hydro (như polyethylene mật độ cao pha bo) để hấp thụ nơ-tron thứ cấp, đi kèm kiến trúc mã sửa lỗi lượng tử bề mặt (Surface Code) có ngưỡng chịu lỗi động theo thời gian thực.',
            'Thách thức thứ hai là khả năng tự động hiệu chỉnh phần cứng không cần bàn tay con người (Zero-Touch Orbital Calibration). Trên mặt đất, các kỹ sư phải tinh chỉnh xung vi sóng và tia laser bẫy ion mỗi ngày để bù đắp sai lệch nhiệt và trôi tần số. Trên quỹ đạo cách Trái Đất hàng trăm triệu kilômét, tàu mẹ phải tích hợp một hệ thống AI cổ điển chuyên trách đóng vai trò "bác sĩ phần cứng" — liên tục quét biên độ nhiễu của từng qubit, tự động định tuyến lại cổng lô-gic vòng qua các nút bị suy giảm và tái cân bằng công suất laser định kỳ mà không làm gián đoạn quá trình điều phối bầy robot bên dưới.',
          ],
          en: [
            'Every ambitious architecture must answer to unforgiving physics. The primary existential threat to an Orbital Quantum Server is high-energy cosmic radiation—specifically heavy solar ions and deep-space gamma bursts. A single high-energy strike penetrating the hull can trigger correlated decoherence across dozens of physical qubits within nanoseconds, collapsing active calculations.',
            'Solving this rules out heavy lead shielding. Instead, the QPU core requires an active superconducting magnetic deflection shell paired with hydrogen-rich boronated composites to thermalize secondary neutrons, backed by adaptive Surface Code quantum error correction capable of isolating damaged qubit patches dynamically.',
            'The second hurdle is Zero-Touch Orbital Calibration. Terrestrial quantum labs rely on daily human tuning of microwave pulses and trap lasers to counter thermal drift. Hundreds of millions of kilometers from Earth, the mothership must run an embedded classical AI hardware-diagnostics loop—continuously profiling per-qubit noise spectra, remapping logical gates around degraded physical nodes, and recalibrating optical trap intensities without ever dropping real-time control of the surface swarm below.',
          ],
        },
      },
    ],
  },
  {
    id: 'blueprint-02',
    issueNumber: '02',
    category: 'space-quantum',
    status: 'in-progress',
    publishedDate: {
      vi: 'Dự kiến · Quý II, 2027',
      en: 'Projected · Q2 2027',
    },
    readTime: {
      vi: '14 phút đọc',
      en: '14 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Động Cơ Đẩy Quang Tử Tự Chữa Lành & Cánh Buồm Siêu Vật Liệu Cho Hành Trình Liên Sao',
      en: 'Self-Healing Photonic Propulsion & Metamaterial Light Sails for Interstellar Transit',
    },
    summary: {
      vi: 'Thiết kế màng siêu vật liệu dày dưới 100 nanomet có khả năng tự hàn gắn vết thủng do bụi vi thiên thạch khi tăng tốc tới 20% vận tốc ánh sáng bằng chùm laser pha.',
      en: 'Sub-100nm metamaterial membranes engineered to thermally self-seal micrometeoroid punctures while accelerating to 20% the speed of light under phased laser arrays.',
    },
    heroImage: '/src/assets/images/blueprint_photonic_sail_1795056798737.jpg',
    heroImageAlt: {
      vi: 'Tàu vũ trụ cánh buồm quang tử siêu vật liệu phản chiếu ánh sáng laser xanh tím trong không gian sâu',
      en: 'Spacecraft with faceted metamaterial photonic sail catching coherent cyan-violet laser light in deep space',
    },
    keyPillars: {
      vi: [
        'Mạng lưới ống nano carbon tự liền mạch dưới ứng suất nhiệt cao',
        'Điều hướng bằng áp suất bức xạ lệch pha không cần động cơ phản lực',
        'Cảm biến ứng suất quang học tích hợp trực tiếp vào cấu trúc màng buồm',
      ],
      en: [
        'Carbon-nanotube lattice membranes that anneal punctures under beam heat',
        'Phase-asymmetric radiation pressure steering with zero chemical propellant',
        'Optical strain telemetry woven directly into the sail nanostructure',
      ],
    },
  },
  {
    id: 'blueprint-03',
    issueNumber: '03',
    category: 'ai-robotics',
    status: 'in-progress',
    publishedDate: {
      vi: 'Dự kiến · Quý I, 2027',
      en: 'Projected · Q1 2027',
    },
    readTime: {
      vi: '10 phút đọc',
      en: '10 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Bầy Robot Tự Tái Tạo Từ Bụi Mặt Trăng: Kiến Trúc In 3D Quang Nhiệt & Vòng Đời Vật Liệu Khép Kín',
      en: 'Self-Replicating Lunar Regolith Swarms: Solar-Thermal 3D Sintering & Closed-Loop Material Lifecycles',
    },
    summary: {
      vi: 'Thay vì phóng hàng nghìn tấn bê tông từ Trái Đất, thế hệ robot thợ mỏ sử dụng gương hội tụ mặt trời nung chảy regolith để tự đúc kết cấu hạ tầng và linh kiện thay thế ngay tại chỗ.',
      en: 'Instead of launching thousands of tons of concrete from Earth, autonomous miner swarms concentrate sunlight to sinter lunar regolith into modular habitats and replacement chassis parts on site.',
    },
    heroImage: '/src/assets/images/blueprint_lunar_swarm_1795056798404.jpg',
    heroImageAlt: {
      vi: 'Bầy robot tự hành sử dụng tia quang nhiệt in 3D các cấu trúc lục giác trên bề mặt Mặt Trăng',
      en: 'Autonomous rovers using focused solar-thermal beams to 3D print hexagonal domes on lunar regolith',
    },
    keyPillars: {
      vi: [
        'Thiêu kết quang nhiệt bằng năng lượng mặt trời tập trung (Solar Sintering)',
        'Giao thức phân chia nhiệm vụ phi tập trung không cần máy chủ trung tâm',
        'Khai thác hợp kim sắt-titan tại chỗ cho khung gầm tự sửa chữa',
      ],
      en: [
        'Concentrated solar-thermal regolith sintering without chemical binders',
        'Decentralized task-allocation protocol immune to single-point failure',
        'In-situ iron-titanium smelting for self-repairing mechanical frames',
      ],
    },
  },
  {
    id: 'blueprint-04',
    issueNumber: '04',
    category: 'ai-robotics',
    status: 'in-progress',
    publishedDate: {
      vi: 'Dự kiến · Quý III, 2027',
      en: 'Projected · Q3 2027',
    },
    readTime: {
      vi: '11 phút đọc',
      en: '11 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Hệ Thần Kinh Phân Tán Cho Nhà Máy Quỹ Đạo: Giao Thức Đồng Thuận Không Trọng Lực',
      en: 'Distributed Nervous Systems for Orbital Foundries: Zero-Gravity Consensus Protocols',
    },
    summary: {
      vi: 'Kiến trúc điều khiển cánh tay robot đa trục lắp ráp giàn khung quy mô kilômét ngoài không gian, nơi mọi xung lực nhỏ đều gây cộng hưởng dao động toàn cấu trúc.',
      en: 'Synchronizing multi-axis robotic manipulators to assemble kilometer-scale orbital trusses where every micro-impulse induces structural harmonic resonance.',
    },
    heroImage: '/src/assets/images/blueprint_orbital_foundry_1795056798404.jpg',
    heroImageAlt: {
      vi: 'Trạm nhà máy quỹ đạo hình vòng với các cánh tay robot lắp ráp cấu trúc mạng tinh thể carbon',
      en: 'Ring-shaped orbital foundry station with robotic manipulators assembling geometric carbon trusses',
    },
    keyPillars: {
      vi: [
        'Triệt tiêu mô-men xoắn phản hồi bằng đối trọng phản ứng chủ động',
        'Đồng thuận thời gian thực giữa 64 cánh tay robot qua bus quang học vòng',
        'Kiểm định mối hàn chân không bằng siêu âm laser không tiếp xúc',
      ],
      en: [
        'Reaction-torque cancellation using active counter-mass actuators',
        'Sub-millisecond consensus across 64 manipulators over an optical ring bus',
        'Non-contact laser-ultrasonic inspection of vacuum cold-welds',
      ],
    },
  },
  {
    id: 'blueprint-05',
    issueNumber: '05',
    category: 'materials-energy',
    status: 'in-progress',
    publishedDate: {
      vi: 'Dự kiến · Quý II, 2027',
      en: 'Projected · Q2 2027',
    },
    readTime: {
      vi: '13 phút đọc',
      en: '13 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Lớp Vỏ Kim Loại Lỏng Tự Phục Hồi Cho Lò Phản Ứng Nhiệt Hạch Stellarator',
      en: 'Self-Healing Liquid-Lithium Metamaterial Blankets for Compact Stellarators',
    },
    summary: {
      vi: 'Thay thế thành buồng rắn dễ giòn gãy bởi dòng nơ-tron bằng màng lưới mao dẫn lưu dẫn liti lỏng, vừa hấp thụ nhiệt cực hạn vừa tự tái tạo tritium tại chỗ.',
      en: 'Replacing brittle solid first-walls under intense neutron flux with capillary-stabilized liquid-lithium lattices that absorb extreme heat loads and breed tritium continuously.',
    },
    heroImage: '/src/assets/images/blueprint_fusion_blanket_1795058190367.jpg',
    heroImageAlt: {
      vi: 'Mặt cắt lõi lò phản ứng nhiệt hạch Stellarator với lớp vỏ siêu vật liệu kim loại lỏng',
      en: 'Compact stellarator fusion core cross-section showing liquid-lithium metamaterial walls',
    },
    keyPillars: {
      vi: [
        'Ổn định dòng kim loại lỏng trong từ trường xoắn bằng cấu trúc vi mao dẫn',
        'Chu trình tự nhân giống nhiên liệu Tritium khép kín ngay trong lớp thành đầu',
        'Giảm 60% chi phí bảo trì định kỳ cho nhà máy nhiệt hạch thế hệ mới',
      ],
      en: [
        'MHD flow stabilization of liquid lithium inside micro-capillary tungsten meshes',
        'Closed-loop in-situ tritium breeding inside the primary thermal blanket',
        '60% reduction in scheduled first-wall replacement downtime',
      ],
    },
  },
  {
    id: 'blueprint-06',
    issueNumber: '06',
    category: 'materials-energy',
    status: 'in-progress',
    publishedDate: {
      vi: 'Dự kiến · Quý IV, 2027',
      en: 'Projected · Q4 2027',
    },
    readTime: {
      vi: '11 phút đọc',
      en: '11 min read',
    },
    author: {
      vi: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
      en: 'Systems Architecture Editorial · HORIZON BLUEPRINT',
    },
    title: {
      vi: 'Trạm Điện Mặt Trời Quỹ Đạo & Mạng Truyền Tải Năng Lượng Vi Sóng Kết Hợp',
      en: 'Orbital Solar Power Arrays & Coherent Microwave Beaming Grids',
    },
    summary: {
      vi: 'Kiến trúc mảng thu quang điện siêu nhẹ quy mô kilômét trên quỹ đạo địa tĩnh, truyền điện liên tục 24/7 xuống mặt đất qua chùm vi sóng định pha an toàn sinh học.',
      en: 'Kilometer-scale ultralight photovoltaic arrays in geostationary orbit beaming continuous 24/7 baseload power to Earth via biologically safe phased microwave beams.',
    },
    heroImage: '/src/assets/images/blueprint_orbital_solar_1795058191006.jpg',
    heroImageAlt: {
      vi: 'Trạm điện mặt trời quỹ đạo phát chùm năng lượng xuống hành tinh bên dưới',
      en: 'Orbital solar power array beaming coherent energy down to a planetary horizon',
    },
    keyPillars: {
      vi: [
        'Tế bào quang điện perovskite siêu mỏng chống bức xạ tự phục hồi nhiệt',
        'Khóa pha chủ động bằng tín hiệu dẫn đường từ trạm thu mặt đất (Retrodirective)',
        'Mật độ năng lượng chùm tia dưới ngưỡng an toàn hàng không và sinh thái',
      ],
      en: [
        'Thermally self-annealing ultralight perovskite tandem solar sails',
        'Retrodirective pilot-beam phase locking preventing off-target drift',
        'Sub-threshold beam power density safe for aviation and ecosystems',
      ],
    },
  },
];
