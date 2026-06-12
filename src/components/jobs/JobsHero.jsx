import React from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function JobsHero({ search, setSearch, total, featured }) {
  return (
    <section className="bg-[#0C0A0F] rounded-2xl mb-5 relative overflow-hidden border border-white/5">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 50%, rgba(217,43,43,.14) 0%, transparent 52%), radial-gradient(circle at 15% 80%, rgba(124,58,237,.09) 0%, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Inner */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-7 px-6 md:px-10 pt-8 pb-7 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-3.5 border border-white/10 rounded-full px-3 py-1 bg-white/5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Live · {total.toLocaleString()} open roles updated now
          </div>
          <h1 className="text-[26px] md:text-[32px] font-bold leading-[1.16] tracking-tight text-white mb-2.5">
            The intelligence layer<br />
            for the <span className="text-[#D92B2B]">AI ecosystem</span>
          </h1>
          <p className="text-[12.5px] text-white/40 leading-relaxed max-w-md mb-4">
            25,000+ startups · 100,000+ founders · 8,400+ investors — all connected in one knowledge graph.
          </p>
          <div className="flex items-center bg-white/10 border border-white/15 rounded-xl overflow-hidden max-w-lg focus-within:border-white/30 transition-colors">
            <span className="px-3 text-white/40">
              <Search className="w-4 h-4" />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search role, company, or skill…"
              className="flex-1 py-[11px] bg-transparent text-[13px] text-white outline-none placeholder:text-white/30 min-w-0"
            />
            <div className="hidden sm:flex w-px h-6 bg-white/10 shrink-0" />
            <div className="hidden sm:flex items-center gap-1 px-3 text-xs text-white/35 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5" /> Worldwide
            </div>
            <button className="bg-[#D92B2B] hover:bg-red-700 text-white px-5 h-[42px] text-[12.5px] font-semibold transition-colors shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* Featured cards */}
        <div className="hidden xl:flex flex-col gap-2 shrink-0">
          <div className="inline-flex items-center gap-1 self-start text-[9.5px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-px">
            <Sparkles className="w-2.5 h-2.5" /> Just posted
          </div>
          {featured.slice(0, 3).map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-[180px] hover:border-white/20 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wide mb-0.5">{j.company}</div>
              <div className="text-[12.5px] font-semibold text-white/90 leading-snug mb-1.5">{j.title}</div>
              <div className="inline-block text-[10px] font-medium px-2 py-px rounded-full bg-red-600/20 text-red-300 mb-2">
                {j.category}
              </div>
              <div className="text-[11.5px] font-bold text-white/60 tracking-tight">
                {j.currency}{j.salary_min}k – {j.currency}{j.salary_max}k
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex flex-wrap items-stretch border-t border-white/[0.07] relative z-10">
        {[
          ["25,000+", "AI startups tracked"],
          ["100k+", "Founder profiles"],
          ["8,400+", "Active investors"],
          [`${total.toLocaleString()}`, "Open roles"],
          ["$48.2B", "Funding tracked (2024)"],
        ].map(([n, l]) => (
          <div key={l} className="flex-1 min-w-[120px] px-5 py-3 border-r border-white/[0.07] last:border-r-0">
            <div className="text-lg font-bold text-white tracking-tight leading-none">{n}</div>
            <div className="text-[10.5px] text-white/30 mt-1">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
