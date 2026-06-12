import React from "react";
import { Rocket, Users, Coins, Box, CandlestickChart, ArrowRight } from "lucide-react";

const LINKS = [
  { icon: Rocket, label: "Startups", count: "25,000+", bg: "bg-red-50", color: "text-[#D92B2B]" },
  { icon: Users, label: "Founders", count: "100,000+", bg: "bg-blue-50", color: "text-blue-600" },
  { icon: Coins, label: "Investors", count: "8,400+", bg: "bg-green-50", color: "text-green-600" },
  { icon: Box, label: "Products", count: "42,000+", bg: "bg-purple-50", color: "text-purple-600" },
  { icon: CandlestickChart, label: "Funding rounds", count: "18,600+", bg: "bg-amber-50", color: "text-amber-600" },
];

export default function ExploreGraph() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[15px] font-bold tracking-tight">Explore the rest of the graph</h2>
          <p className="text-xs text-gray-400 mt-0.5">Every job is connected to startups, founders, and investors in Atlas.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {LINKS.map(({ icon: Icon, label, count, bg, color }) => (
          <button
            key={label}
            className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm hover:-translate-y-px transition-all text-left"
          >
            <span className={`w-[30px] h-[30px] rounded-lg ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[12.5px] font-semibold leading-tight">{label}</span>
              <span className="block text-[11px] text-gray-400">{count}</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
}
