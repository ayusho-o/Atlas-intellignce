import React from "react";

export default function HiringBar({ companies, onSelect }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-4 mb-5 overflow-hidden">
      <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
        Hiring now
      </div>
      <div className="flex gap-2 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {companies.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect(c.name)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 transition-colors shrink-0"
          >
            <span
              className="w-5 h-5 rounded text-[11px] font-bold text-white flex items-center justify-center"
              style={{ background: c.color }}
            >
              {c.name[0]}
            </span>
            <span className="text-left">
              <span className="block text-xs font-semibold text-gray-900 leading-tight">{c.name}</span>
              <span className="block text-[11px] text-gray-400 leading-tight">
                {c.count} role{c.count > 1 ? "s" : ""}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
