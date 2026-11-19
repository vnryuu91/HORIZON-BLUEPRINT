import { useState } from 'react';
import { Cpu, Radio, Compass, Radar, Truck } from 'lucide-react';
import type { Language, LocalizedText } from '../data/blueprints';

export type MeshNodeId =
  | 'mothership'
  | 'relay'
  | 'drone'
  | 'command-rover'
  | 'micro-robot';

interface MeshNodeInfo {
  id: MeshNodeId;
  tierBadge: LocalizedText;
  name: LocalizedText;
  role: LocalizedText;
  protocol: LocalizedText;
  metrics: { label: LocalizedText; value: string }[];
  accent: 'violet' | 'cyan';
}

const MESH_NODES: MeshNodeInfo[] = [
  {
    id: 'mothership',
    tierBadge: {
      vi: 'Tầng 1 · Quỹ đạo cao',
      en: 'Tier 1 · High Orbit',
    },
    name: {
      vi: 'Tàu mẹ Máy chủ Lượng tử',
      en: 'Quantum Server Mothership',
    },
    role: {
      vi: 'Lõi tính toán tập trung: chạy thuật toán tối ưu QAOA điều phối toàn bầy đàn, mô phỏng quang phổ khoáng vật tại chỗ và sàng lọc dữ liệu trước khi gửi về Trái Đất.',
      en: 'Centralized compute core: executes QAOA fleet routing, runs in-situ molecular spectroscopy simulations, and performs semantic data triage before Earth transmission.',
    },
    protocol: {
      vi: 'Đường truyền laser kết hợp liên quỹ đạo (Coherent Optical QKD · 12.5 Gbps)',
      en: 'Coherent Cross-Orbit Optical QKD Link (12.5 Gbps)',
    },
    metrics: [
      {
        label: { vi: 'Dung lượng Qubit', en: 'Qubit Budget' },
        value: '1,024 Logical',
      },
      {
        label: { vi: 'Nhiệt độ Lõi', en: 'Core Temp' },
        value: '11.4 K Passive',
      },
      {
        label: { vi: 'Độ cao Quỹ đạo', en: 'Orbit Altitude' },
        value: '420 – 800 km',
      },
    ],
    accent: 'violet',
  },
  {
    id: 'relay',
    tierBadge: {
      vi: 'Tầng 1 · Lưới vệ tinh',
      en: 'Tier 1 · Orbital Mesh',
    },
    name: {
      vi: 'Vệ tinh Chuyển tiếp Laser QKD',
      en: 'QKD Laser Relay Satellites',
    },
    role: {
      vi: 'Tạo mạng lưới chuyển tiếp quang học không điểm mù quanh hành tinh, phân phối khóa lượng tử và duy trì kết nối liên tục cho các drone và xe chỉ huy bên dưới.',
      en: 'Forms a zero-blindspot orbital optical relay ring around the planet, distributing quantum keys and maintaining unbroken links to drones and ground hubs below.',
    },
    protocol: {
      vi: 'Laser hồng ngoại thích nghi 1550 nm · Giao thức khóa lượng tử BB84',
      en: 'Adaptive 1550 nm IR Laser · Free-Space BB84 QKD',
    },
    metrics: [
      {
        label: { vi: 'Thông lượng', en: 'Throughput' },
        value: '12.5 Gbps',
      },
      {
        label: { vi: 'Sai số Pha', en: 'Phase Jitter' },
        value: '< 80 ps',
      },
      {
        label: { vi: 'Độ phủ Lưới', en: 'Mesh Coverage' },
        value: '18 MicroSats',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'drone',
    tierBadge: {
      vi: 'Tầng 2 · Không phận tầm thấp',
      en: 'Tier 2 · Low Altitude',
    },
    name: {
      vi: 'Drone Trinh sát Bản đồ 3D',
      en: 'Aerial 3D Scout Drones',
    },
    role: {
      vi: 'Bay tuần tra tầng thấp phía trên bề mặt để quét LiDAR địa hình 3D độ phân giải cao, phát hiện hố sụt và dẫn đường cho bầy robot mặt đất tránh chướng ngại vật.',
      en: 'Patrols low-altitude airspace sweeping high-resolution 3D LiDAR terrain cones, flagging unstable craters, and guiding surface swarms around hazards.',
    },
    protocol: {
      vi: 'Uplink quang học băng rộng lên Vệ tinh & Downlink điều hướng xuống Xe chỉ huy',
      en: 'Wideband Optical Uplink to Relays & RF/Optical Downlink to Command Rover',
    },
    metrics: [
      {
        label: { vi: 'Độ cao Bay', en: 'Flight Ceiling' },
        value: '120 – 450 m',
      },
      {
        label: { vi: 'Quét LiDAR', en: 'LiDAR Rate' },
        value: '2.4M pts/s',
      },
      {
        label: { vi: 'Độ trễ Lệnh', en: 'Loop Latency' },
        value: '3.8 ms',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'command-rover',
    tierBadge: {
      vi: 'Tầng 3 · Bề mặt hành tinh',
      en: 'Tier 3 · Planetary Surface',
    },
    name: {
      vi: 'Xe Chỉ huy Mặt đất (Trạm Trung gian)',
      en: 'Ground Command Rover (Relay Hub)',
    },
    role: {
      vi: 'Đóng vai trò cổng kết nối mặt đất (Surface Gateway): tổng hợp dữ liệu từ các robot vi mô, tiếp nhận chỉ thị từ drone/vệ tinh và cấp năng lượng sạc cảm ứng cục bộ.',
      en: 'Acts as the local Surface Gateway: aggregates raw telemetry from micro-robots, relays orbital/aerial directives, and provides local inductive recharge.',
    },
    protocol: {
      vi: 'Mạng lưới Mesh băng tần rộng (UWB/Optical Mast) kết nối đa điểm dưới mặt đất',
      en: 'Local High-Gain Optical Mast + Sub-ms Surface UWB Mesh',
    },
    metrics: [
      {
        label: { vi: 'Bán kính Mesh', en: 'Mesh Radius' },
        value: '4.5 km',
      },
      {
        label: { vi: 'Số Nút Quản lý', en: 'Managed Nodes' },
        value: '24 – 32 Units',
      },
      {
        label: { vi: 'Công suất Phát', en: 'Power Output' },
        value: '180 W RTG',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'micro-robot',
    tierBadge: {
      vi: 'Tầng 3 · Bề mặt hành tinh',
      en: 'Tier 3 · Planetary Surface',
    },
    name: {
      vi: 'Bầy Robot Thăm dò Vi mô (Edge Nodes)',
      en: 'Surface Micro-Robots (Edge Nodes)',
    },
    role: {
      vi: 'Sản xuất hàng loạt với chi phí thấp, không mang AI nặng hay chip lượng tử. Chuyên trách tiến sâu vào khe đá, bắn tia LIBS lấy mẫu địa chất và truyền về Xe chỉ huy.',
      en: 'Mass-produced, low-cost collectors stripped of heavy AI or quantum chips. Penetrate narrow craters to run LIBS geological sampling and stream raw waveforms.',
    },
    protocol: {
      vi: 'Gói tin telemetry siêu nhẹ (Low-Power Surface Mesh · < 15 W)',
      en: 'Ultralight Telemetry Burst (Low-Power Surface Mesh · < 15 W)',
    },
    metrics: [
      {
        label: { vi: 'Khối lượng', en: 'Unit Mass' },
        value: '4.6 kg',
      },
      {
        label: { vi: 'Chip Tại chỗ', en: 'Onboard MCU' },
        value: 'RISC-V Rad-Hard',
      },
      {
        label: { vi: 'Chi phí Tương đối', en: 'Relative Cost' },
        value: '0.03× Legacy',
      },
    ],
    accent: 'violet',
  },
];

const NODE_ICONS: Record<MeshNodeId, typeof Cpu> = {
  mothership: Cpu,
  relay: Radio,
  drone: Radar,
  'command-rover': Truck,
  'micro-robot': Compass,
};

interface LayeredMeshDiagramProps {
  lang: Language;
}

export function LayeredMeshDiagram({ lang }: LayeredMeshDiagramProps) {
  const [selectedId, setSelectedId] = useState<MeshNodeId>('mothership');
  const [hoveredId, setHoveredId] = useState<MeshNodeId | null>(null);

  const activeId = hoveredId || selectedId;
  const activeNode =
    MESH_NODES.find((n) => n.id === activeId) || MESH_NODES[0];

  const isHighlighted = (id: MeshNodeId) => activeId === id;

  const labels = {
    vi: {
      title: 'Sơ đồ Kiến trúc Lưới Phân Tầng Tương Tác',
      subtitle:
        'Di chuột hoặc chạm vào từng nút trên sơ đồ để kiểm tra vai trò và giao thức truyền tin',
      tier1: 'TẦNG 1: QUỸ ĐẠO CAO · LÕI XỬ LÝ',
      tier2: 'TẦNG 2: KHÔNG PHẬN TẦM THẤP · KHÍ QUYỂN',
      tier3: 'TẦNG 3: BỀ MẶT HÀNH TINH · MẠNG LƯỚI EDGE',
      mothership: 'TÀU MẸ MÁY CHỦ LƯỢNG TỬ',
      relay: 'VỆ TINH QKD',
      qkdLink: 'LASER QKD · 12.5 Gbps',
      atmoCurve: 'Ranh giới khí quyển',
      drone: 'DRONE TRINH SÁT 3D',
      scanLabel: 'QUÉT ĐỊA HÌNH 3D',
      rover: 'XE CHỈ HUY MẶT ĐẤT',
      micro: 'ROBOT BỀ MẶT',
      roleHeading: 'Vai trò kiến trúc',
      protocolHeading: 'Giao thức truyền tin',
    },
    en: {
      title: 'Interactive Layered Mesh Architecture Diagram',
      subtitle:
        'Hover or select any node in the schematic to inspect its operational role and link protocol',
      tier1: 'TIER 1: HIGH ORBIT · COMPUTE CORE',
      tier2: 'TIER 2: LOW ALTITUDE · ATMOSPHERE',
      tier3: 'TIER 3: PLANETARY SURFACE · EDGE MESH',
      mothership: 'QUANTUM SERVER MOTHERSHIP',
      relay: 'QKD RELAY',
      qkdLink: 'QKD LASER · 12.5 Gbps',
      atmoCurve: 'Atmospheric Boundary',
      drone: '3D SCOUT DRONE',
      scanLabel: '3D TERRAIN LIDAR',
      rover: 'GROUND COMMAND ROVER',
      micro: 'MICRO-ROBOT',
      roleHeading: 'Architectural Role',
      protocolHeading: 'Communication Protocol',
    },
  }[lang];

  return (
    <div
      className="my-10 bg-[#070A12] border border-[#00F0FF]/25 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.06)]"
      aria-label={labels.title}
    >
      {/* Top Frame Header */}
      <div className="px-5 py-4 border-b border-slate-800/90 bg-[#0A0F1C] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-base sm:text-lg font-semibold text-slate-50">
            {labels.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">{labels.subtitle}</p>
        </div>
        <span className="font-mono text-xs text-[#00F0FF]">
          SVG Blueprint · Interactive
        </span>
      </div>

      {/* Interactive SVG Vector Schematic */}
      <div className="relative bg-[#070A12] overflow-hidden">
        <svg
          viewBox="0 0 840 600"
          className="w-full h-auto block select-none"
          role="img"
          aria-label={labels.title}
        >
          <defs>
            {/* Technical Blueprint Coordinate Grid */}
            <pattern
              id="bp-grid-minor"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#1E293B"
                strokeWidth="0.6"
                strokeOpacity="0.45"
              />
            </pattern>
            <pattern
              id="bp-grid-major"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="url(#bp-grid-minor)" />
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="0.7"
                strokeOpacity="0.14"
              />
            </pattern>

            {/* Quantum Core Violet Glow */}
            <radialGradient id="quantum-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#7000FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7000FF" stopOpacity="0" />
            </radialGradient>

            {/* Drone 3D Scan Cone Gradient */}
            <linearGradient id="scan-cone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.34" />
              <stop offset="75%" stopColor="#00F0FF" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.01" />
            </linearGradient>

            {/* Planetary Terrain Fill */}
            <linearGradient id="terrain-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#131C2E" />
              <stop offset="100%" stopColor="#060911" />
            </linearGradient>

            {/* Glow Filter for Active Highlights */}
            <filter id="cyan-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base Grid Canvas */}
          <rect width="840" height="600" fill="#070A12" />
          <rect width="840" height="600" fill="url(#bp-grid-major)" />

          {/* ==================== TIER DIVIDERS & LABELS ==================== */}
          {/* Tier 1 Label */}
          <text
            x="22"
            y="26"
            fill="#00F0FF"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            letterSpacing="0.06em"
          >
            {labels.tier1}
          </text>

          {/* Divider 1-2 */}
          <line
            x1="16"
            y1="202"
            x2="824"
            y2="202"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />

          {/* Tier 2 Label */}
          <text
            x="22"
            y="224"
            fill="#94A3B8"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            letterSpacing="0.06em"
          >
            {labels.tier2}
          </text>

          {/* Atmospheric Boundary Curve */}
          <path
            d="M 0 264 Q 420 226 840 264"
            fill="none"
            stroke="#00F0FF"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />
          <text
            x="816"
            y="246"
            textAnchor="end"
            fill="#64748B"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            {labels.atmoCurve}
          </text>

          {/* Divider 2-3 */}
          <line
            x1="16"
            y1="406"
            x2="824"
            y2="406"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />

          {/* Tier 3 Label */}
          <text
            x="22"
            y="428"
            fill="#94A3B8"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            letterSpacing="0.06em"
          >
            {labels.tier3}
          </text>

          {/* ==================== OPTICAL & MESH LINKS ==================== */}
          {/* Mothership <-> Left Relay QKD Laser */}
          <g>
            <line
              x1="342"
              y1="104"
              x2="164"
              y2="120"
              stroke="#00F0FF"
              strokeOpacity="0.22"
              strokeWidth="5"
            />
            <line
              x1="342"
              y1="104"
              x2="164"
              y2="120"
              stroke="#00F0FF"
              strokeWidth="1.8"
              strokeDasharray="8 10"
              className="animate-qkd-stream"
            />
            <text
              x="252"
              y="98"
              textAnchor="middle"
              fill="#00F0FF"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.85"
            >
              {labels.qkdLink}
            </text>
          </g>

          {/* Mothership <-> Right Relay QKD Laser */}
          <g>
            <line
              x1="498"
              y1="104"
              x2="676"
              y2="120"
              stroke="#00F0FF"
              strokeOpacity="0.22"
              strokeWidth="5"
            />
            <line
              x1="498"
              y1="104"
              x2="676"
              y2="120"
              stroke="#00F0FF"
              strokeWidth="1.8"
              strokeDasharray="8 10"
              className="animate-qkd-stream"
            />
            <text
              x="588"
              y="98"
              textAnchor="middle"
              fill="#00F0FF"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.85"
            >
              {labels.qkdLink}
            </text>
          </g>

          {/* Left Drone <-> Left Relay Optical Uplink */}
          <g>
            <line
              x1="230"
              y1="302"
              x2="136"
              y2="140"
              stroke="#00F0FF"
              strokeOpacity="0.2"
              strokeWidth="3.5"
            />
            <line
              x1="230"
              y1="302"
              x2="136"
              y2="140"
              stroke="#00F0FF"
              strokeWidth="1.4"
              strokeDasharray="6 10"
              className="animate-qkd-uplink"
            />
          </g>

          {/* Right Drone <-> Right Relay Optical Uplink */}
          <g>
            <line
              x1="610"
              y1="302"
              x2="704"
              y2="140"
              stroke="#00F0FF"
              strokeOpacity="0.2"
              strokeWidth="3.5"
            />
            <line
              x1="610"
              y1="302"
              x2="704"
              y2="140"
              stroke="#00F0FF"
              strokeWidth="1.4"
              strokeDasharray="6 10"
              className="animate-qkd-uplink"
            />
          </g>

          {/* Ground Command Rover <-> Relays & Mothership Spine Link */}
          <g>
            <line
              x1="420"
              y1="472"
              x2="420"
              y2="134"
              stroke="#7000FF"
              strokeOpacity="0.22"
              strokeWidth="4"
            />
            <line
              x1="420"
              y1="472"
              x2="420"
              y2="134"
              stroke="#A855F7"
              strokeWidth="1.3"
              strokeDasharray="5 9"
              className="animate-qkd-uplink"
            />
            {/* Drone-to-Command Rover tactical cross-links */}
            <line
              x1="255"
              y1="322"
              x2="405"
              y2="478"
              stroke="#00F0FF"
              strokeOpacity="0.45"
              strokeWidth="1.1"
              strokeDasharray="4 6"
            />
            <line
              x1="585"
              y1="322"
              x2="435"
              y2="478"
              stroke="#00F0FF"
              strokeOpacity="0.45"
              strokeWidth="1.1"
              strokeDasharray="4 6"
            />
          </g>

          {/* ==================== PLANETARY TERRAIN ==================== */}
          <path
            d="M 0 546 L 65 538 L 122 552 L 185 524 L 245 532 L 315 546 L 372 522 L 472 522 L 534 544 L 606 530 L 674 520 L 742 546 L 795 534 L 840 542 L 840 600 L 0 600 Z"
            fill="url(#terrain-fill)"
            stroke="#334155"
            strokeWidth="1.6"
          />
          {/* Subtle Crater Rim Contours */}
          <path
            d="M 92 560 Q 124 574 156 560 M 512 558 Q 554 576 594 558"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* ==================== DRONE 3D SCAN CONES ==================== */}
          {/* Left Drone Scan Cone */}
          <g pointerEvents="none">
            <polygon
              points="230,326 146,526 314,526"
              fill="url(#scan-cone-grad)"
            />
            <line
              x1="230"
              y1="326"
              x2="146"
              y2="526"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="230"
              y1="326"
              x2="314"
              y2="526"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 185 450 Q 230 462 275 450"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <path
              d="M 164 495 Q 230 510 296 495"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <text
              x="230"
              y="440"
              textAnchor="middle"
              fill="#00F0FF"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.8"
            >
              {labels.scanLabel}
            </text>
          </g>

          {/* Right Drone Scan Cone */}
          <g pointerEvents="none">
            <polygon
              points="610,326 526,526 694,526"
              fill="url(#scan-cone-grad)"
            />
            <line
              x1="610"
              y1="326"
              x2="526"
              y2="526"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="610"
              y1="326"
              x2="694"
              y2="526"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 565 450 Q 610 462 655 450"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <path
              d="M 544 495 Q 610 510 676 495"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <text
              x="610"
              y="440"
              textAnchor="middle"
              fill="#00F0FF"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.8"
            >
              {labels.scanLabel}
            </text>
          </g>

          {/* ==================== SURFACE MESH LINKS ==================== */}
          <g pointerEvents="none">
            <path
              d="M 392 505 Q 275 478 162 522"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.3"
              strokeDasharray="4 5"
              className="animate-qkd-stream"
            />
            <path
              d="M 392 510 Q 340 492 290 526"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.3"
              strokeDasharray="4 5"
              className="animate-qkd-stream"
            />
            <path
              d="M 448 505 Q 565 478 678 518"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.3"
              strokeDasharray="4 5"
              className="animate-qkd-stream"
            />
          </g>

          {/* ==================== INTERACTIVE NODE 1: MOTHERSHIP ==================== */}
          <g
            role="button"
            tabIndex={0}
            aria-label={MESH_NODES[0].name[lang]}
            onClick={() => setSelectedId('mothership')}
            onMouseEnter={() => setHoveredId('mothership')}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedId('mothership');
              }
            }}
            className="cursor-pointer focus:outline-none"
          >
            {/* Hover / Selection Target Ring */}
            <rect
              x="252"
              y="58"
              width="336"
              height="92"
              rx="10"
              fill="transparent"
              stroke={isHighlighted('mothership') ? '#7000FF' : 'transparent'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Quantum Glow Aura */}
            <circle
              cx="420"
              cy="104"
              r="44"
              fill="url(#quantum-core-glow)"
              className="animate-core-pulse"
            />

            {/* Left & Right Solar Array Wings */}
            <g stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1">
              <rect x="266" y="88" width="76" height="32" rx="2" fill="#0D192B" />
              <line x1="285" y1="88" x2="285" y2="120" />
              <line x1="304" y1="88" x2="304" y2="120" />
              <line x1="323" y1="88" x2="323" y2="120" />
              <line x1="266" y1="104" x2="342" y2="104" />

              <rect x="498" y="88" width="76" height="32" rx="2" fill="#0D192B" />
              <line x1="517" y1="88" x2="517" y2="120" />
              <line x1="536" y1="88" x2="536" y2="120" />
              <line x1="555" y1="88" x2="555" y2="120" />
              <line x1="498" y1="104" x2="574" y2="104" />
            </g>

            {/* Mothership Main Titanium Hull */}
            <polygon
              points="342,92 384,78 456,78 498,92 498,116 456,130 384,130 342,116"
              fill="#111827"
              stroke={isHighlighted('mothership') ? '#00F0FF' : '#64748B'}
              strokeWidth="1.8"
            />

            {/* Cryo Radiator Fins */}
            <line x1="376" y1="78" x2="376" y2="66" stroke="#475569" strokeWidth="2" />
            <line x1="464" y1="78" x2="464" y2="66" stroke="#475569" strokeWidth="2" />

            {/* Central Quantum Server Core (#7000FF) */}
            <polygon
              points="420,84 440,104 420,124 400,104"
              fill="#7000FF"
              fillOpacity="0.45"
              stroke="#C084FC"
              strokeWidth="1.6"
            />
            <circle cx="420" cy="104" r="7" fill="#E9D5FF" />

            <text
              x="420"
              y="165"
              textAnchor="middle"
              fill={isHighlighted('mothership') ? '#00F0FF' : '#E2E8F0'}
              fontSize="12"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              letterSpacing="0.04em"
            >
              {labels.mothership}
            </text>
          </g>

          {/* ==================== INTERACTIVE NODE 2: RELAY SATELLITES ==================== */}
          {[
            { x: 135, y: 120 },
            { x: 705, y: 120 },
          ].map((pos, idx) => (
            <g
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={MESH_NODES[1].name[lang]}
              onClick={() => setSelectedId('relay')}
              onMouseEnter={() => setHoveredId('relay')}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId('relay');
                }
              }}
              className="cursor-pointer focus:outline-none"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="34"
                fill="transparent"
                stroke={isHighlighted('relay') ? '#00F0FF' : 'transparent'}
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              {/* Satellite Solar Wings */}
              <rect
                x={pos.x - 28}
                y={pos.y - 7}
                width="18"
                height="14"
                fill="#0D192B"
                stroke="#38BDF8"
                strokeWidth="1"
              />
              <rect
                x={pos.x + 10}
                y={pos.y - 7}
                width="18"
                height="14"
                fill="#0D192B"
                stroke="#38BDF8"
                strokeWidth="1"
              />
              {/* Satellite Core Bus */}
              <rect
                x={pos.x - 10}
                y={pos.y - 12}
                width="20"
                height="24"
                rx="3"
                fill="#1E293B"
                stroke={isHighlighted('relay') ? '#00F0FF' : '#94A3B8'}
                strokeWidth="1.5"
              />
              {/* Laser Gimbal */}
              <circle cx={pos.x} cy={pos.y} r="4" fill="#00F0FF" />
              <path
                d={`M ${pos.x - 6} ${pos.y + 12} L ${pos.x} ${pos.y + 19} L ${pos.x + 6} ${pos.y + 12}`}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.4"
              />
              <text
                x={pos.x}
                y={pos.y - 24}
                textAnchor="middle"
                fill={isHighlighted('relay') ? '#00F0FF' : '#CBD5E1'}
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {labels.relay}
              </text>
            </g>
          ))}

          {/* ==================== INTERACTIVE NODE 3: AERIAL SCOUT DRONES ==================== */}
          {[
            { x: 230, y: 314 },
            { x: 610, y: 314 },
          ].map((pos, idx) => (
            <g
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={MESH_NODES[2].name[lang]}
              onClick={() => setSelectedId('drone')}
              onMouseEnter={() => setHoveredId('drone')}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId('drone');
                }
              }}
              className="cursor-pointer focus:outline-none"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="32"
                fill="transparent"
                stroke={isHighlighted('drone') ? '#00F0FF' : 'transparent'}
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              {/* Rotor Arms & Blades */}
              <line
                x1={pos.x - 24}
                y1={pos.y - 8}
                x2={pos.x + 24}
                y2={pos.y - 8}
                stroke="#64748B"
                strokeWidth="2"
              />
              <line
                x1={pos.x - 30}
                y1={pos.y - 12}
                x2={pos.x - 14}
                y2={pos.y - 12}
                stroke="#00F0FF"
                strokeWidth="2"
              />
              <line
                x1={pos.x + 14}
                y1={pos.y - 12}
                x2={pos.x + 30}
                y2={pos.y - 12}
                stroke="#00F0FF"
                strokeWidth="2"
              />
              {/* Drone Chassis */}
              <polygon
                points={`${pos.x - 14},${pos.y - 4} ${pos.x + 14},${pos.y - 4} ${pos.x + 9},${pos.y + 10} ${pos.x - 9},${pos.y + 10}`}
                fill="#111827"
                stroke={isHighlighted('drone') ? '#00F0FF' : '#94A3B8'}
                strokeWidth="1.5"
              />
              {/* LiDAR Pod */}
              <circle cx={pos.x} cy={pos.y + 12} r="3.5" fill="#00F0FF" />
              <text
                x={pos.x}
                y={pos.y - 22}
                textAnchor="middle"
                fill={isHighlighted('drone') ? '#00F0FF' : '#CBD5E1'}
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {labels.drone}
              </text>
            </g>
          ))}

          {/* ==================== INTERACTIVE NODE 4: GROUND COMMAND ROVER ==================== */}
          <g
            role="button"
            tabIndex={0}
            aria-label={MESH_NODES[3].name[lang]}
            onClick={() => setSelectedId('command-rover')}
            onMouseEnter={() => setHoveredId('command-rover')}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedId('command-rover');
              }
            }}
            className="cursor-pointer focus:outline-none"
          >
            <rect
              x="376"
              y="466"
              width="88"
              height="68"
              rx="8"
              fill="transparent"
              stroke={isHighlighted('command-rover') ? '#00F0FF' : 'transparent'}
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            {/* Optical Mast & Dish */}
            <line
              x1="420"
              y1="494"
              x2="420"
              y2="472"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <path
              d="M 412 474 Q 420 480 428 474"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.8"
            />
            <circle cx="420" cy="472" r="3" fill="#00F0FF" />

            {/* Rover Hull */}
            <rect
              x="392"
              y="494"
              width="56"
              height="20"
              rx="4"
              fill="#1E293B"
              stroke={isHighlighted('command-rover') ? '#00F0FF' : '#CBD5E1'}
              strokeWidth="1.6"
            />
            <rect x="406" y="499" width="28" height="6" rx="1" fill="#00F0FF" fillOpacity="0.45" />

            {/* 6 Rugged Wheels */}
            {[398, 420, 442].map((wx) => (
              <circle
                key={wx}
                cx={wx}
                cy="518"
                r="5.5"
                fill="#0F172A"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
            ))}

            <text
              x="420"
              y="550"
              textAnchor="middle"
              fill={isHighlighted('command-rover') ? '#00F0FF' : '#E2E8F0'}
              fontSize="11"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              letterSpacing="0.03em"
            >
              {labels.rover}
            </text>
          </g>

          {/* ==================== INTERACTIVE NODE 5: SURFACE MICRO-ROBOTS ==================== */}
          {[
            { x: 146, y: 526, probeX: 118, probeY: 540 },
            { x: 278, y: 530, probeX: null, probeY: null },
            { x: 692, y: 522, probeX: 722, probeY: 538 },
          ].map((bot, idx) => (
            <g
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={MESH_NODES[4].name[lang]}
              onClick={() => setSelectedId('micro-robot')}
              onMouseEnter={() => setHoveredId('micro-robot')}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId('micro-robot');
                }
              }}
              className="cursor-pointer focus:outline-none"
            >
              <circle
                cx={bot.x}
                cy={bot.y}
                r="24"
                fill="transparent"
                stroke={isHighlighted('micro-robot') ? '#A855F7' : 'transparent'}
                strokeWidth="1.3"
                strokeDasharray="3 3"
              />
              {/* LIBS Geological Sample Laser */}
              {bot.probeX !== null && bot.probeY !== null && (
                <g>
                  <line
                    x1={bot.x}
                    y1={bot.y}
                    x2={bot.probeX}
                    y2={bot.probeY}
                    stroke="#A855F7"
                    strokeWidth="1.4"
                  />
                  <circle cx={bot.probeX} cy={bot.probeY} r="2.5" fill="#C084FC" />
                </g>
              )}
              {/* Micro-Robot Body */}
              <rect
                x={bot.x - 11}
                y={bot.y - 6}
                width="22"
                height="10"
                rx="2.5"
                fill="#111827"
                stroke={isHighlighted('micro-robot') ? '#C084FC' : '#94A3B8'}
                strokeWidth="1.4"
              />
              <circle cx={bot.x - 6} cy={bot.y + 6} r="3" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.2" />
              <circle cx={bot.x + 6} cy={bot.y + 6} r="3" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.2" />
              <circle cx={bot.x} cy={bot.y - 2} r="2" fill="#A855F7" />

              {idx !== 1 && (
                <text
                  x={bot.x}
                  y={bot.y + 26}
                  textAnchor="middle"
                  fill={isHighlighted('micro-robot') ? '#C084FC' : '#CBD5E1'}
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  {labels.micro}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Quick-Select Node Strip + Live Technical Info Panel */}
      <div className="border-t border-slate-800/90 bg-[#0B101D]">
        {/* Interactive Node Selector Buttons (guarantees effortless mobile tap & keyboard tabbing) */}
        <div
          role="tablist"
          aria-label={labels.title}
          className="px-4 py-3 border-b border-slate-800/80 flex flex-wrap gap-2"
        >
          {MESH_NODES.map((node) => {
            const Icon = NODE_ICONS[node.id];
            const isSelected = activeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                  isSelected
                    ? node.accent === 'violet'
                      ? 'bg-[#7000FF]/20 text-purple-200 border-[#7000FF]'
                      : 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]'
                    : 'bg-[#111827] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{node.name[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Node Info Panel */}
        <div role="tabpanel" className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span
                className={`font-mono text-xs font-medium ${
                  activeNode.accent === 'violet'
                    ? 'text-purple-400'
                    : 'text-[#00F0FF]'
                }`}
              >
                {activeNode.tierBadge[lang]}
              </span>
              <h5 className="font-display text-lg font-bold text-slate-50 mt-0.5">
                {activeNode.name[lang]}
              </h5>
            </div>

            <div className="flex flex-wrap gap-3">
              {activeNode.metrics.map((m) => (
                <div
                  key={m.label.en}
                  className="bg-[#111827] border border-slate-800 rounded-lg px-3 py-2"
                >
                  <div className="text-[11px] text-slate-400">
                    {m.label[lang]}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-slate-100 tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-800/80 text-sm">
            <div className="md:col-span-7">
              <div className="font-mono text-xs text-slate-400 mb-1">
                {labels.roleHeading}
              </div>
              <p className="text-slate-200 leading-relaxed">
                {activeNode.role[lang]}
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="font-mono text-xs text-slate-400 mb-1">
                {labels.protocolHeading}
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#00F0FF] leading-relaxed">
                {activeNode.protocol[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
