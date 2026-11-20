export const SITE_SEO_META = {
  siteName: 'HORIZON BLUEPRINT',
  vi: {
    title: 'HORIZON BLUEPRINT | Lưu trữ những bản thiết kế kiến trúc cho kỷ nguyên tiếp theo',
    description:
      'Khám phá các ý tưởng khoa học giả tưởng định hướng tương lai về Vũ trụ, Điện toán Lượng tử, AI & Robot.',
    tagline: 'Lưu trữ những bản thiết kế kiến trúc cho kỷ nguyên tiếp theo',
    speculativeBadge: 'Ý tưởng giả tưởng · Đồng sáng tạo bởi AI',
  },
  en: {
    title: 'HORIZON BLUEPRINT | Archiving Architectural Blueprints for the Next Era',
    description:
      'Explore speculative future-oriented science blueprints covering Space, Quantum Computing, AI & Robotics, and Frontier Energy.',
    tagline: 'Archiving architectural blueprints for the next era',
    speculativeBadge: 'Speculative Concept · Co-created with AI',
  },
};

export const CATEGORY_SEO_META = {
  'space-quantum': {
    vi: 'Vũ trụ & Lượng tử',
    en: 'Space & Quantum',
  },
  'ai-robotics': {
    vi: 'AI & Robot',
    en: 'AI & Robotics',
  },
  'materials-energy': {
    vi: 'Vật liệu & Năng lượng',
    en: 'Materials & Energy',
  },
};

export const BLUEPRINT_SEO_CATALOG = [
  {
    id: 'blueprint-01',
    slug: 'quantum-fleet-architecture',
    issueNumber: '01',
    category: 'space-quantum',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Tàu mẹ máy chủ lượng tử trên quỹ đạo hành tinh đang truyền tín hiệu laser tới mạng lưới vệ tinh và bầy robot bề mặt',
      en: 'Orbital quantum server mothership projecting coherent laser links to a relay satellite constellation and surface rover nodes',
    },
  },
  {
    id: 'blueprint-02',
    slug: 'photonic-propulsion-light-sail',
    issueNumber: '02',
    category: 'space-quantum',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Tàu vũ trụ cánh buồm quang tử siêu vật liệu phản chiếu ánh sáng laser xanh tím trong không gian sâu',
      en: 'Spacecraft with faceted metamaterial photonic sail catching coherent cyan-violet laser light in deep space',
    },
  },
  {
    id: 'blueprint-03',
    slug: 'lunar-regolith-robot-swarm',
    issueNumber: '03',
    category: 'ai-robotics',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Bầy robot tự hành sử dụng tia quang nhiệt in 3D các cấu trúc lục giác trên bề mặt Mặt Trăng',
      en: 'Autonomous rovers using focused solar-thermal beams to 3D print hexagonal domes on lunar regolith',
    },
  },
  {
    id: 'blueprint-04',
    slug: 'orbital-foundry-consensus',
    issueNumber: '04',
    category: 'ai-robotics',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Trạm nhà máy quỹ đạo hình vòng với các cánh tay robot lắp ráp cấu trúc mạng tinh thể carbon',
      en: 'Ring-shaped orbital foundry station with robotic manipulators assembling geometric carbon trusses',
    },
  },
  {
    id: 'blueprint-05',
    slug: 'liquid-lithium-fusion-blanket',
    issueNumber: '05',
    category: 'materials-energy',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Mặt cắt lõi lò phản ứng nhiệt hạch Stellarator với lớp vỏ siêu vật liệu kim loại lỏng',
      en: 'Compact stellarator fusion core cross-section showing liquid-lithium metamaterial walls',
    },
  },
  {
    id: 'blueprint-06',
    slug: 'orbital-solar-microwave-grid',
    issueNumber: '06',
    category: 'materials-energy',
    publishedIso: '2026-11-18T00:00:00Z',
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
    heroImageAlt: {
      vi: 'Trạm điện mặt trời quỹ đạo phát chùm năng lượng xuống hành tinh bên dưới',
      en: 'Orbital solar power array beaming coherent energy down to a planetary horizon',
    },
  },
];

export function findBlueprintSeoBySlugOrId(slugOrId) {
  if (!slugOrId) return undefined;
  const normalized = String(slugOrId).trim().toLowerCase();
  return BLUEPRINT_SEO_CATALOG.find(
    (item) =>
      item.slug.toLowerCase() === normalized ||
      item.id.toLowerCase() === normalized
  );
}
