export type CategoryKey = 'all' | 'space-quantum' | 'ai-robotics';

export interface SystemTierSpec {
  id: string;
  tierLabel: string;
  name: string;
  subtitle: string;
  altitudeOrZone: string;
  computeRole: string;
  keySpecs: { label: string; value: string; unit: string }[];
  engineeringSummary: string;
  linkProtocol: string;
}

export interface ArticleSection {
  id: string;
  index: string;
  title: string;
  lead: string;
  paragraphs: string[];
  pullQuote?: string;
  showArchitectureDiagram?: boolean;
  highlights?: { title: string; detail: string }[];
}

export interface UpcomingBlueprint {
  id: string;
  issueNumber: string;
  category: Exclude<CategoryKey, 'all'>;
  categoryLabel: string;
  title: string;
  summary: string;
  estimatedRelease: string;
  readTimeEstimate: string;
  imageUrl: string;
  imageAlt: string;
  keyPillars: string[];
}

export interface ArchitecturalComment {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  likes: number;
  isUserCreated?: boolean;
}

export const FEATURED_BLUEPRINT = {
  id: 'blueprint-01',
  issueNumber: '01',
  category: 'space-quantum' as const,
  categoryLabel: 'Vũ trụ & Điện toán Lượng tử',
  publishedDate: 'Tháng 11, 2026',
  readTime: '12 phút đọc',
  author: 'Ban Biên Tập Kiến Trúc Hệ Thống · HORIZON BLUEPRINT',
  title:
    'Kiến trúc Hạm đội Thăm dò Vũ trụ Tự trị: Tàu mẹ Máy chủ Lượng tử & Bầy Robot Vệ tinh',
  summary:
    'Thay vì trang bị chip lượng tử đắt đỏ lên từng robot nhỏ, chúng ta sản xuất hàng loạt các tàu vũ trụ mẹ mang theo một "Máy chủ Lượng tử" làm lõi trung tâm trên quỹ đạo. Xung quanh tàu mẹ là mạng lưới vệ tinh do thám và bầy robot bề mặt hoạt động như các nút thu thập dữ liệu (Edge Nodes).',
  heroImage: '/src/assets/images/hero_quantum_mothership_1795056797887.jpg',
  heroImageAlt:
    'Tàu mẹ máy chủ lượng tử trên quỹ đạo hành tinh đang truyền tín hiệu laser tới mạng lưới vệ tinh và bầy robot bề mặt',
  heroCaption:
    'Hình 01 — Mô phỏng kiến trúc phân tầng: Tàu mẹ quỹ đạo duy trì kết nối quang học đa điểm tới mạng vệ tinh chuyển tiếp và các nút robot bề mặt.',
  metrics: [
    {
      label: 'Độ trễ Quỹ đạo — Bề mặt',
      value: '3.8',
      unit: 'ms',
      context: 'Thay thế độ trễ 4–24 phút từ Trái Đất',
    },
    {
      label: 'Nhiệt độ Bức xạ Thụ động',
      value: '11.4',
      unit: 'K',
      context: 'Tận dụng chân không sâu & vùng tối quỹ đạo',
    },
    {
      label: 'Băng thông Laser QKD',
      value: '12.5',
      unit: 'Gbps',
      context: 'Mã hóa khóa lượng tử chống nhiễu bức xạ',
    },
    {
      label: 'Mật độ Nút Bề mặt',
      value: '240+',
      unit: 'Nodes',
      context: 'Robot Edge sản xuất hàng loạt mỗi hạm đội',
    },
  ],
  tiers: [
    {
      id: 'tier-1',
      tierLabel: 'Tầng 01',
      name: 'Tàu mẹ Máy chủ Lượng tử Quỹ đạo',
      subtitle: 'Lõi tính toán tập trung & trung tâm điều phối chiến lược',
      altitudeOrZone: 'Quỹ đạo đồng bộ thấp (420 – 800 km)',
      computeRole: 'Xử lý QAOA, mô phỏng phổ vật chất & tối ưu quỹ đạo bầy đàn',
      keySpecs: [
        { label: 'Dung lượng Qubit Lô-gic', value: '1,024', unit: 'Logical Qubits' },
        { label: 'Chân không Tự nhiên', value: '10⁻¹¹', unit: 'Torr' },
        { label: 'Ngân sách Nhiệt Lõi', value: '11.4', unit: 'Kelvin' },
      ],
      engineeringSummary:
        'Mang theo một bộ xử lý lượng tử siêu dẫn hoặc bẫy ion quy mô lớn được che chắn từ trường đa lớp. Nhờ vận hành trong chân không vũ trụ và sử dụng tấm chắn bức xạ mặt trời đa tầng (sunshield), tàu mẹ loại bỏ tới 70% khối lượng hệ thống làm lạnh cồng kềnh so với trung tâm dữ liệu mặt đất.',
      linkProtocol: 'Đường truyền quang học kết hợp liên quỹ đạo (Coherent Optical Downlink)',
    },
    {
      id: 'tier-2',
      tierLabel: 'Tầng 02',
      name: 'Mạng lưới Vệ tinh Chuyển tiếp QKD',
      subtitle: 'Hạ tầng định tuyến laser & đồng bộ hóa pha thời gian thực',
      altitudeOrZone: 'Quỹ đạo tầm trung phân tán (1,200 km)',
      computeRole: 'Phân phối khóa lượng tử (QKD) & chuyển tiếp gói tin không điểm mù',
      keySpecs: [
        { label: 'Số lượng Vệ tinh Lưới', value: '18', unit: 'MicroSats' },
        { label: 'Tốc độ Chuyển tiếp', value: '12.5', unit: 'Gbps' },
        { label: 'Sai số Đồng bộ Pha', value: '< 80', unit: 'ps' },
      ],
      engineeringSummary:
        'Đóng vai trò như hệ thống thần kinh trung gian giữa tàu mẹ và bề mặt thiên thể. Các chùm laser bước sóng 1550 nm tự động bám mục tiêu quang học, đảm bảo các robot nằm trong hố sâu thiên thạch hay vùng khuất mặt trăng vẫn duy trì kết nối liên tục với lõi lượng tử.',
      linkProtocol: 'Laser hồng ngoại thích nghi & giao thức BB84 trên không gian tự do',
    },
    {
      id: 'tier-3',
      tierLabel: 'Tầng 03',
      name: 'Bầy Robot Thăm dò Bề mặt (Edge Nodes)',
      subtitle: 'Thiết bị thu thập cảm biến giá rẻ, tối giản hóa phần cứng',
      altitudeOrZone: 'Bề mặt hành tinh, hố va chạm & hang dung nham',
      computeRole: 'Thu thập quang phổ, LiDAR, địa chấn & thực thi lệnh bầy đàn',
      keySpecs: [
        { label: 'Khối lượng Mỗi Nút', value: '4.6', unit: 'kg' },
        { label: 'Vi xử lý Tại chỗ', value: 'RISC-V', unit: 'Rad-Hard' },
        { label: 'Chi phí Đơn vị Tương đối', value: '0.03×', unit: 'Rover truyền thống' },
      ],
      engineeringSummary:
        'Không mang chip lượng tử hay AI nặng nề. Mỗi robot chỉ giữ lại cảm biến chính xác, khung gầm siêu nhẹ và chip điều khiển cổ điển tiêu thụ dưới 15 W. Nếu một robot hỏng do địa hình khắc nghiệt, hạm đội mất chưa tới 0.5% năng lực thu thập mà không tổn thất trí tuệ lõi.',
      linkProtocol: 'Uplink quang-vô tuyến băng thông hẹp độ trễ thấp (3.8 ms)',
    },
  ] as SystemTierSpec[],
  sections: [
    {
      id: 'section-01',
      index: '01',
      title: 'Bối cảnh & Nút thắt hiện tại',
      lead: 'Khi khoảng cách ánh sáng và giới hạn tải trọng đang khóa chặt kỷ nguyên thăm dò không gian sâu.',
      paragraphs: [
        'Trong hơn nửa thế kỷ, nhân loại khám phá các thiên thể theo triết lý "một cỗ máy toàn năng": dồn toàn bộ phòng thí nghiệm hóa học, bộ xử lý chịu bức xạ và hệ thống tự hành phức tạp lên một chiếc rover đơn độc trị giá hàng tỷ USD. Kết quả là những cỗ máy nặng gần một tấn nhưng di chuyển với tốc độ vài chục mét mỗi giờ, phải liên tục dừng lại để chờ mệnh lệnh từ Trái Đất.',
        'Nút thắt lớn nhất không nằm ở bánh xe hay pin hạt nhân, mà ở vật lý truyền tin. Ánh sáng cần từ 4 đến 24 phút để đi một chiều từ Trái Đất tới Sao Hỏa, và gần một giờ để chạm tới hệ Sao Mộc. Không một hệ thống điều khiển thời gian thực nào có thể vận hành hiệu quả qua một sợi dây liên lạc trễ hàng chục phút. Khi một robot gặp vách đá sụt lở hay dòng khí methane bất thường, cơ hội khoa học đã trôi qua trước khi tín hiệu cảnh báo kịp về tới trung tâm điều khiển mặt đất.',
        'Để giải phóng tính tự trị, xu hướng tất yếu là đưa năng lực tính toán đỉnh cao — đặc biệt là điện toán lượng tử và mạng nơ-ron mô phỏng — đến gần hiện trường nhất có thể. Thế nhưng, không thể gắn trực tiếp một bộ xử lý lượng tử đòi hỏi nhiệt độ cận độ không tuyệt đối lên từng robot thăm dò nhỏ bé. Bài toán tải trọng phóng tên lửa (launch mass budget) và chi phí sản xuất sẽ lập tức phá sản nếu nhân bản phần cứng lượng tử cho hàng trăm thiết bị bề mặt.',
      ],
      pullQuote:
        'Thay vì cố gắng đưa bộ não đắt đỏ xuống bùn đất phóng xạ của hành tinh lạ, hãy giữ bộ não trong sự tĩnh lặng lạnh giá của quỹ đạo và triển khai hàng trăm đôi tay cơ khí giá rẻ bên dưới.',
    },
    {
      id: 'section-02',
      index: '02',
      title: 'Cấu trúc hệ thống 3 tầng',
      lead: 'Phân tách triệt để giữa trí tuệ lõi trên quỹ đạo và năng lực cảm biến phân tán trên bề mặt.',
      paragraphs: [
        'Giải pháp kiến trúc của Horizon Blueprint tái định nghĩa hoàn toàn chuỗi giá trị thăm dò bằng mô hình điện toán biên không gian 3 tầng (Orbital-to-Edge Continuum). Thay vì dàn trải tài nguyên, toàn bộ năng lực tính toán lượng tử được cô đặc vào một Tàu mẹ (Mothership) duy nhất vận hành ổn định trên quỹ đạo.',
        'Điều kỳ diệu về mặt nhiệt động lực học nằm ở chỗ: không gian sâu vốn là một môi trường lý tưởng cho phần cứng lượng tử. Trên Trái Đất, một máy tính lượng tử tiêu tốn hàng chục kilowatt chỉ để vận hành máy nén heli lỏng tạo chân không và hạ nhiệt xuống vài milikelvin. Trên quỹ đạo, chân không tự nhiên đạt ngưỡng 10⁻¹¹ Torr miễn phí hoàn toàn, và một hệ thống tấm chắn bức xạ hướng ngược mặt trời có thể đưa khoang lõi xuống mức nhiệt cryogenic thụ động trước khi kích hoạt tầng làm lạnh vi mô cuối cùng.',
      ],
      showArchitectureDiagram: true,
      highlights: [
        {
          title: 'Tầng 1 — Tàu mẹ Máy chủ Lượng tử',
          detail:
            'Đóng vai trò trung tâm dữ liệu quỹ đạo. Tích hợp bộ nhớ đồng bộ quang học và lõi xử lý lượng tử lai cổ điển (Hybrid QPU-GPU), tránh hoàn toàn bão bụi, dao động địa chấn và mài mòn cơ học của bề mặt hành tinh.',
        },
        {
          title: 'Tầng 2 — Mạng Vệ tinh Truyền tin Laser (QKD)',
          detail:
            'Vòng vệ tinh vi mô tạo cầu nối quang học liên tục, đảm bảo mọi gói dữ liệu cảm biến thô từ mặt đất được mã hóa bằng phân phối khóa lượng tử và truyền thẳng lên tàu mẹ không góc chết.',
        },
        {
          title: 'Tầng 3 — Bầy Robot Bề mặt (Edge Nodes)',
          detail:
            'Các robot sáu chân hoặc drone cánh quạt đồng trục siêu nhẹ được đóng gói theo dạng mô-đun phẳng, thả xuống đồng loạt như hạt giống. Chúng chỉ thu nhận tín hiệu vật lý và thực thi quỹ đạo di chuyển do tàu mẹ tính toán.',
        },
      ],
    },
    {
      id: 'section-03',
      index: '03',
      title: 'Sức mạnh vận hành thực tế',
      lead: 'Từ điều phối bầy đàn mili-giây tới sàng lọc tri thức khoa học ngay trước khi gửi về Trái Đất.',
      paragraphs: [
        'Khi lõi lượng tử nằm ngay trên đầu bầy robot với độ trễ khứ hồi dưới 4 mili-giây, hành vi của cả hạm đội thay đổi về chất. Thuật toán tối ưu hóa xấp xỉ lượng tử (QAOA) trên tàu mẹ có thể giải bài toán định tuyến đa tác tử cho 240 robot cùng lúc theo thời gian thực: phân vùng tìm kiếm băng nước, tránh vùng sụt lún theo dữ liệu địa chấn tức thì từ các robot đi trước, và tự động tái cấu trúc đội hình khi một nút bị mất tín hiệu.',
        'Quan trọng hơn cả là khả năng phân tích mẫu địa chất tại chỗ. Khi một robot bề mặt chiếu tia laser quang phổ LIBS vào mạch khoáng vật lạ, dữ liệu phổ thô được bắn lên tàu mẹ. Thay vì phải nén ảnh gửi về Trái Đất chờ các nhà khoa học phân tích suốt nhiều ngày, lõi lượng tử trên quỹ đạo chạy ngay mô phỏng cấu trúc phân tử (Variational Quantum Eigensolver) để xác định liệu mẫu đá đó có chứa dấu hiệu sinh học cổ đại hay đồng vị hiếm hay không. Nếu phát hiện bất thường giá trị cao, tàu mẹ lập tức điều phối 5 robot gần nhất hội tụ về tọa độ đó để khoan sâu và chụp cắt lớp trước khi mặt trời lặn.',
        'Cuối cùng, tàu mẹ thực hiện cơ chế sàng lọc dữ liệu thông minh (Semantic Triage). Băng thông truyền về Trái Đất luôn đắt đỏ và chật hẹp. Thay vì gửi hàng terabyte dữ liệu nhiễu đá bazan lặp đi lặp lại, hệ thống chỉ nén và gửi về Trái Đất những chuỗi tri thức đã được xác thực, bản đồ khoáng sản 3D đã hiệu chỉnh và các dị thường khoa học thực sự đáng giá.',
      ],
    },
    {
      id: 'section-04',
      index: '04',
      title: 'Thách thức kỹ thuật cần vượt qua',
      lead: 'Cuộc chiến thầm lặng chống lại tia vũ trụ, nhiễu lượng tử và bài toán tự trị phần cứng tuyệt đối.',
      paragraphs: [
        'Mọi bản thiết kế tham vọng đều phải đối mặt với sự khắc nghiệt của vật lý thực nghiệm. Thách thức tử huyệt đầu tiên của Máy chủ Lượng tử Quỹ đạo là bức xạ vũ trụ bậc cao — đặc biệt là các hạt ion nặng từ gió mặt trời và tia gamma sâu. Chỉ một hạt năng lượng cao xuyên qua lớp vỏ hợp kim cũng có thể tạo ra hiện tượng mất kết hợp hàng loạt (correlated decoherence), làm sụp đổ trạng thái chồng chập của hàng chục qubit vật lý chỉ trong vài nano-giây.',
        'Để giải quyết, kiến trúc tàu mẹ không thể dựa vào lớp chì nặng nề truyền thống. Thay vào đó, lõi QPU phải được bọc trong buồng siêu dẫn từ trường chủ động kết hợp lớp composite giàu hydro (như polyethylene mật độ cao pha bo) để hấp thụ nơ-tron thứ cấp, đi kèm kiến trúc mã sửa lỗi lượng tử bề mặt (Surface Code) có ngưỡng chịu lỗi động theo thời gian thực.',
        'Thách thức thứ hai là khả năng tự động hiệu chỉnh phần cứng không cần bàn tay con người (Zero-Touch Orbital Calibration). Trên mặt đất, các kỹ sư phải tinh chỉnh xung vi sóng và tia laser bẫy ion mỗi ngày để bù đắp sai lệch nhiệt và trôi tần số. Trên quỹ đạo cách Trái Đất hàng trăm triệu kilômét, tàu mẹ phải tích hợp một hệ thống AI cổ điển chuyên trách đóng vai trò "bác sĩ phần cứng" — liên tục quét biên độ nhiễu của từng qubit, tự động định tuyến lại cổng lô-gic vòng qua các nút bị suy giảm và tái cân bằng công suất laser định kỳ mà không làm gián đoạn quá trình điều phối bầy robot bên dưới.',
      ],
    },
  ] as ArticleSection[],
};

export const UPCOMING_BLUEPRINTS: UpcomingBlueprint[] = [
  {
    id: 'blueprint-02',
    issueNumber: '02',
    category: 'ai-robotics',
    categoryLabel: 'AI & Robot',
    title:
      'Bầy Robot Tự Tái Tạo Từ Bụi Mặt Trăng: Kiến Trúc In 3D Quang Nhiệt & Vòng Đời Vật Liệu Khép Kín',
    summary:
      'Thay vì phóng hàng nghìn tấn bê tông từ Trái Đất, thế hệ robot thợ mỏ sử dụng gương hội tụ mặt trời nung chảy regolith để tự đúc kết cấu hạ tầng và linh kiện thay thế ngay tại chỗ.',
    estimatedRelease: 'Dự kiến · Quý I, 2027',
    readTimeEstimate: '10 phút đọc',
    imageUrl: '/src/assets/images/blueprint_lunar_swarm_1795056798404.jpg',
    imageAlt: 'Bầy robot tự hành sử dụng tia quang nhiệt in 3D các cấu trúc lục giác trên bề mặt Mặt Trăng',
    keyPillars: [
      'Thiêu kết quang nhiệt bằng năng lượng mặt trời tập trung (Solar Sintering)',
      'Giao thức phân chia nhiệm vụ phi tập trung không cần máy chủ trung tâm',
      'Khai thác hợp kim sắt-titan tại chỗ cho khung gầm tự sửa chữa',
    ],
  },
  {
    id: 'blueprint-03',
    issueNumber: '03',
    category: 'space-quantum',
    categoryLabel: 'Vũ trụ & Lượng tử',
    title:
      'Động Cơ Đẩy Quang Tử Tự Chữa Lành & Cánh Buồm Siêu Vật Liệu Cho Hành Trình Liên Sao',
    summary:
      'Thiết kế màng siêu vật liệu dày dưới 100 nanomet có khả năng tự hàn gắn vết thủng do bụi vi thiên thạch khi tăng tốc tới 20% vận tốc ánh sáng bằng chùm laser pha.',
    estimatedRelease: 'Dự kiến · Quý II, 2027',
    readTimeEstimate: '14 phút đọc',
    imageUrl: '/src/assets/images/blueprint_photonic_sail_1795056798737.jpg',
    imageAlt: 'Tàu vũ trụ cánh buồm quang tử siêu vật liệu phản chiếu ánh sáng laser xanh tím trong không gian sâu',
    keyPillars: [
      'Mạng lưới ống nano carbon tự liền mạch dưới ứng suất nhiệt cao',
      'Điều hướng bằng áp suất bức xạ lệch pha không cần động cơ phản lực',
      'Cảm biến ứng suất quang học tích hợp trực tiếp vào cấu trúc màng buồm',
    ],
  },
  {
    id: 'blueprint-04',
    issueNumber: '04',
    category: 'ai-robotics',
    categoryLabel: 'AI & Robot',
    title:
      'Hệ Thần Kinh Phân Tán Cho Nhà Máy Quỹ Đạo: Giao Thức Đồng Thuận Không Trọng Lực',
    summary:
      'Kiến trúc điều khiển cánh tay robot đa trục lắp ráp giàn khung quy mô kilômét ngoài không gian, nơi mọi xung lực nhỏ đều gây cộng hưởng dao động toàn cấu trúc.',
    estimatedRelease: 'Dự kiến · Quý III, 2027',
    readTimeEstimate: '11 phút đọc',
    imageUrl: '/src/assets/images/blueprint_orbital_foundry_1795056798404.jpg',
    imageAlt: 'Trạm nhà máy quỹ đạo hình vòng với các cánh tay robot lắp ráp cấu trúc mạng tinh thể carbon',
    keyPillars: [
      'Triệt tiêu mô-men xoắn phản hồi bằng đối trọng phản ứng chủ động',
      'Đồng thuận thời gian thực giữa 64 cánh tay robot qua bus quang học vòng',
      'Kiểm định mối hàn chân không bằng siêu âm laser không tiếp xúc',
    ],
  },
];

export const INITIAL_COMMENTS: ArchitecturalComment[] = [
  {
    id: 'seed-1',
    author: 'TS. Nguyễn Minh Khôi',
    role: 'Kiến trúc sư Hệ thống Hàng không Vũ trụ',
    content:
      'Ý tưởng tận dụng chân không tự nhiên 10⁻¹¹ Torr trên quỹ đạo để giảm tải cho hệ thống làm lạnh cryogenic rất sắc bén. Tuy nhiên, ở tầng chuyển tiếp QKD, chúng ta cần tính thêm sai số trỏ tia (pointing jitter) khi tàu mẹ thực hiện điều chỉnh quỹ đạo bằng động cơ ion.',
    createdAt: '18/11/2026 · 14:20',
    likes: 14,
  },
  {
    id: 'seed-2',
    author: 'Lê Hoàng Thảo',
    role: 'Nghiên cứu sinh Điện toán Lượng tử',
    content:
      'Cơ chế tách biệt hoàn toàn QPU khỏi bầy Edge Nodes giải quyết được bài toán kinh tế cốt lõi. Mình đề xuất bổ sung thêm một tầng bộ đệm cổ điển (FPGA chịu bức xạ) ngay tại trạm vệ tinh tầng 2 để lưu trữ tạm quang phổ trong trường hợp có bão từ mặt trời làm gián đoạn đường truyền laser ngắn hạn.',
    createdAt: '18/11/2026 · 16:45',
    likes: 9,
  },
];
