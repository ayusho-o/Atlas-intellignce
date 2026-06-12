import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

function ago(h) {
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

export default function JobRow({ job, saved, onSave }) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50/70 transition-colors">
      <div
        className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center text-sm font-bold border border-black/5 shrink-0"
        style={{ background: job.logo_bg, color: job.logo_color }}
      >
        {job.company.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-semibold tracking-tight mb-0.5 truncate">{job.title}</div>
        <div className="text-xs text-gray-400 font-medium mb-1">
          {job.company} · {job.location}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10.5px] bg-red-50 text-[#D92B2B] px-2 py-px rounded-full font-medium">
            {job.category}
          </span>
          {(job.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="text-[10.5px] bg-gray-100 text-gray-600 px-2 py-px rounded-full font-medium">
              {t}
            </span>
          ))}
          <span className="text-[10.5px] bg-gray-100 text-gray-600 px-2 py-px rounded-full font-medium">
            {job.work_mode}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0 hidden sm:block">
        <div className="text-[13px] font-bold tracking-tight mb-0.5">
          {job.currency}{job.salary_min}k–{job.currency}{job.salary_max}k
        </div>
        <div className="text-[11.5px] text-gray-400">{ago(job.posted_hours_ago || 0)}</div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
        className={`w-[30px] h-[30px] rounded-lg border flex items-center justify-center shrink-0 transition-all ${
          saved
            ? "border-[#D92B2B] text-[#D92B2B] bg-red-50 opacity-100"
            : "border-gray-200 text-gray-400 opacity-0 group-hover:opacity-100 hover:border-[#D92B2B] hover:text-[#D92B2B] hover:bg-red-50"
        }`}
      >
        {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
