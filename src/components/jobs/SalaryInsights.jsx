import React from "react";
import { TrendingUp } from "lucide-react";

export default function SalaryInsights({ jobs }) {
  const byCat = {};
  jobs.forEach((j) => {
    if (!j.salary_min || !j.salary_max) return;
    const mid = (j.salary_min + j.salary_max) / 2;
    if (!byCat[j.category]) byCat[j.category] = [];
    byCat[j.category].push(mid);
  });

  const rows = Object.entries(byCat)
    .map(([cat, vals]) => ({
      cat,
      avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
      n: vals.length,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 6);

  const max = rows[0]?.avg || 1;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-3.5 py-3 border-b border-gray-200 text-[12.5px] font-bold flex items-center gap-2 tracking-tight">
        <TrendingUp className="w-4 h-4 text-[#D92B2B]" /> Salary insights
      </div>
      <div className="px-3.5 py-3 space-y-2.5">
        {rows.map((r) => (
          <div key={r.cat}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">{r.cat}</span>
              <span className="text-xs font-bold text-gray-900">${r.avg}k avg</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D92B2B] rounded-full"
                style={{ width: `${(r.avg / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
