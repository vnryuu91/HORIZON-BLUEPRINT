import { useState } from 'react';
import { Cpu, Radio, Compass } from 'lucide-react';
import { FEATURED_BLUEPRINT } from '../data/blueprints';

const TIER_ICONS = [Cpu, Radio, Compass];

export function ArchitectureInspector() {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    FEATURED_BLUEPRINT.tiers[0].id
  );

  const activeTier =
    FEATURED_BLUEPRINT.tiers.find((t) => t.id === selectedTierId) ||
    FEATURED_BLUEPRINT.tiers[0];

  return (
    <div className="my-10 bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
      {/* Header Bar */}
      <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-semibold text-slate-100">
            Sơ đồ Tương tác: Kiến trúc Điện toán Biên Không gian 3 Tầng
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Chọn từng tầng hệ thống để kiểm tra thông số vận hành và giao thức liên kết
          </p>
        </div>
        <span className="font-mono text-xs text-[#00F0FF]">
          3-Tier Orbital Continuum
        </span>
      </div>

      {/* Tier Selector Tabs */}
      <div
        role="tablist"
        aria-label="Các tầng kiến trúc hệ thống"
        className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800"
      >
        {FEATURED_BLUEPRINT.tiers.map((tier, index) => {
          const isSelected = tier.id === selectedTierId;
          const Icon = TIER_ICONS[index] || Cpu;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-4 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00F0FF] ${
                isSelected
                  ? 'bg-[#0D1526] text-slate-50'
                  : 'bg-[#111827] text-slate-400 hover:bg-[#141D30] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`font-mono text-xs font-medium ${
                    isSelected ? 'text-[#00F0FF]' : 'text-slate-500'
                  }`}
                >
                  {tier.tierLabel}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? 'text-[#00F0FF]' : 'text-slate-500'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div className="text-sm font-semibold leading-snug">
                {tier.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tier Details */}
      <div role="tabpanel" className="p-5 sm:p-6 bg-[#0E1422]">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div>
            <h5 className="font-display text-lg font-semibold text-slate-50">
              {activeTier.name}
            </h5>
            <p className="text-sm text-slate-400">{activeTier.subtitle}</p>
          </div>
          <span className="font-mono text-xs text-slate-300">
            Vùng hoạt động: {activeTier.altitudeOrZone}
          </span>
        </div>

        {/* 3 Numeric Telemetry Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {activeTier.keySpecs.map((spec) => (
            <div
              key={spec.label}
              className="bg-[#111827] border border-slate-800/90 rounded-lg p-3.5"
            >
              <div className="text-xs text-slate-400 mb-1">{spec.label}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-xl font-semibold text-slate-50 tabular-nums">
                  {spec.value}
                </span>
                <span className="font-mono text-xs text-[#00F0FF]">
                  {spec.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {activeTier.engineeringSummary}
        </p>

        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400">Vai trò tính toán: </span>
            <span className="text-slate-200">{activeTier.computeRole}</span>
          </div>
          <div>
            <span className="text-slate-400">Giao thức liên kết: </span>
            <span className="font-mono text-[#00F0FF]">{activeTier.linkProtocol}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
