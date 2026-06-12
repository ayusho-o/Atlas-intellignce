import React from "react";
import { Check } from "lucide-react";

const GROUPS = [
  { key: "job_type", title: "Job type", options: ["Full-time", "Part-time", "Contract", "Internship"] },
  { key: "work_mode", title: "Work mode", options: ["Remote", "Hybrid", "On-site"] },
  { key: "experience", title: "Experience", options: ["Entry level", "Mid-level", "Senior", "Lead / Staff"] },
  { key: "funding_stage", title: "Funding stage", options: ["Seed", "Series A-B", "Series C+", "Public"] },
  { key: "region", title: "Region", options: ["Worldwide", "North America", "Europe", "Asia-Pacific", "India"] },
];

export default function FilterPanel({ filters, toggle, clearAll, counts, salaryMin, setSalaryMin }) {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl overflow-hidden lg:sticky lg:top-[70px]">
      {GROUPS.map((g) => (
        <div key={g.key} className="px-3.5 py-3 border-b border-gray-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{g.title}</div>
          {g.options.map((opt) => {
            const on = filters[g.key].includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggle(g.key, opt)}
                className="flex items-center gap-2 py-1 cursor-pointer group"
              >
                <div
                  className={`w-3.5 h-3.5 rounded border-[1.5px] shrink-0 flex items-center justify-center transition-colors ${
                    on ? "bg-[#D92B2B] border-[#D92B2B]" : "border-gray-300"
                  }`}
                >
                  {on && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />}
                </div>
                <span className="text-[12.5px] text-gray-600 flex-1 group-hover:text-gray-900 transition-colors">{opt}</span>
                <span className="text-[10.5px] text-gray-400 bg-gray-100 px-1.5 rounded-full">
                  {counts[g.key]?.[opt] || 0}
                </span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="px-3.5 py-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Min salary (USD k / yr)</div>
        <input
          value={salaryMin}
          onChange={(e) => setSalaryMin(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 150"
          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-gray-50 outline-none focus:border-[#D92B2B] focus:bg-white transition-colors"
        />
        <button
          onClick={clearAll}
          className="w-full mt-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-[#D92B2B] hover:text-[#D92B2B] transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </aside>
  );
}
