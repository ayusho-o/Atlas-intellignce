import React from "react";
import { Globe, Building2, Star } from "lucide-react";

const BADGE_STYLES = {
  Hot: "bg-amber-100 text-amber-800",
  New: "bg-green-100 text-green-900",
  Remote: "bg-blue-50 text-blue-800",
  Featured: "bg-red-50 text-red-900",
};

export default function FeaturedJobs({ jobs }) {
  if (!jobs.length) return null;
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold tracking-tight">Featured roles</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 hover:shadow-md hover:-translate-y-px transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-base font-bold border border-black/5"
                style={{ background: j.logo_bg, color: j.logo_color }}
              >
                {j.company[0]}
              </div>
              {j.badge && (
                <span className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${BADGE_STYLES[j.badge] || ""}`}>
                  {j.badge === "Hot" ? "🔥 Hot" : j.badge}
                </span>
              )}
            </div>
            <div className="text-sm font-semibold tracking-tight mb-0.5">{j.title}</div>
            <div className="text-xs text-gray-400 font-medium mb-2.5">
              {j.company} · {j.location}
            </div>
            <div className="flex gap-1.5 flex-wrap mb-2.5">
              <span className="text-[10.5px] bg-red-50 text-[#D92B2B] px-2 py-[3px] rounded-full font-medium">
                {j.category}
              </span>
              {(j.tags || []).map((t) => (
                <span key={t} className="text-[10.5px] bg-gray-100 text-gray-600 px-2 py-[3px] rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2.5 text-[11.5px] text-gray-400">
              {j.work_mode === "Remote" ? (
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Remote</span>
              ) : (
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {j.work_mode}</span>
              )}
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {j.funding_stage}</span>
              <span className="ml-auto text-[13px] font-bold text-gray-900 tracking-tight">
                {j.currency}{j.salary_min}k–{j.currency}{j.salary_max}k
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
