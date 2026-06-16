"use client";
export const runtime = 'edge';

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CompanyLogo from "@/components/ui/CompanyLogo";
import Badge from "@/components/ui/Badge";
import Footer from "@/components/layout/Footer";
import { ALL_STARTUPS, CATEGORIES, type Startup } from "@/data/startups";

// ai-security includes AI Safety startups too
const CATEGORY_MAP: Record<string, string[]> = {
  "ai-agents":         ["AI Agents"],
  "ai-coding":         ["AI Coding"],
  "ai-search":         ["AI Search"],
  "ai-infrastructure": ["AI Infrastructure"],
  "ai-security":       ["AI Security", "AI Safety"],
  "ai-healthcare":     ["AI Healthcare"],
};

const CATEGORY_HERO: Record<string, { gradient: string; stat: string; statLabel: string }> = {
  "ai-agents":         { gradient: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 60%, #16213e 100%)", stat: "42%",   statLabel: "YoY funding growth"    },
  "ai-coding":         { gradient: "linear-gradient(135deg, #0f0c29 0%, #1a1040 60%, #141432 100%)", stat: "3.1M",  statLabel: "Active developer users" },
  "ai-search":         { gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 60%, #200a3e 100%)", stat: "1.2B",  statLabel: "Monthly queries"        },
  "ai-infrastructure": { gradient: "linear-gradient(135deg, #050d18 0%, #0a1628 60%, #081220 100%)", stat: "$8.4B", statLabel: "Total funding raised"    },
  "ai-security":       { gradient: "linear-gradient(135deg, #051a10 0%, #0a2a1a 60%, #081f14 100%)", stat: "99.7%", statLabel: "Threat detection rate"   },
  "ai-healthcare":     { gradient: "linear-gradient(135deg, #1a0f00 0%, #2a1800 60%, #1f1200 100%)", stat: "500M+", statLabel: "Patients impacted"       },
};

// Accent color per category (for hero glow + active pill)
const CATEGORY_ACCENT: Record<string, string> = {
  "ai-agents":         "#FF5A5F",
  "ai-coding":         "#6366F1",
  "ai-search":         "#8B5CF6",
  "ai-infrastructure": "#0EA5E9",
  "ai-security":       "#10B981",
  "ai-healthcare":     "#F59E0B",
};

// Filter options derived from real data
const STAGE_OPTIONS   = ["All Stages", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Series F", "Growth", "Bootstrapped", "Private", "Strategic"];
const COUNTRY_OPTIONS = ["All Locations", "USA", "UK", "Canada", "France", "Netherlands"];
const EMPLOYEE_OPTIONS= ["All Sizes", "50+", "100+", "200+", "500+", "1,000+", "5,000+"];
const SORT_OPTIONS    = ["Trending", "Most Funded", "Newest", "Oldest"];

function CategoryIcon({ icon, size = 22 }: { icon: string; size?: number }) {
  const p = { width: size, height: size, fill: "none" as const, stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };
  if (icon === "agents")   return <svg {...p}><circle cx="12" cy="5" r="3"/><path d="M12 8v8M8 12H4a2 2 0 0 0-2 2v2M16 12h4a2 2 0 0 1 2 2v2"/></svg>;
  if (icon === "coding")   return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  if (icon === "search")   return <svg {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
  if (icon === "infra")    return <svg {...p}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
  if (icon === "security") return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
  if (icon === "health")   return <svg {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
  return null;
}

// ── Dropdown component ────────────────────────────────────────────────────
function Dropdown({ label, icon, options, value, onChange }: {
  label: string; icon: React.ReactNode; options: string[];
  value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDefault = value === options[0];
  return (
    <div className="relative">
      <button
        suppressHydrationWarning
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-white border rounded-xl text-[13px] font-medium transition-all whitespace-nowrap"
        style={{
          borderColor: isDefault ? "#E8E8E8" : "#222",
          color: isDefault ? "#484848" : "#222",
          boxShadow: isDefault ? "none" : "0 0 0 1px #222",
        }}
      >
        <span className="text-[#9CA3AF]">{icon}</span>
        <div className="flex items-center">
        <span className="text-[12px] font-semibold" style={{ color: "#222" }}>
        {isDefault ? label : value}
        </span>
        </div>
        <svg width="10" height="10" fill="none" stroke="#9CA3AF" strokeWidth="2.5" viewBox="0 0 24 24"
          className={`ml-0.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}/>
          <div className="absolute top-full mt-2 left-0 z-20 bg-white border border-[#EBEBEB] rounded-xl shadow-xl py-1.5 min-w-[180px]">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F7F7F7] transition-colors flex items-center justify-between gap-3"
                style={{ color: opt === value ? "#FF5A5F" : "#484848", fontWeight: opt === value ? 600 : 400 }}
              >
                {opt}
                {opt === value && (
                  <svg width="12" height="12" fill="none" stroke="#FF5A5F" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Startup card ──────────────────────────────────────────────────────────
function StartupCard({ startup }: { startup: Startup }) {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-5 hover:shadow-md hover:border-[#D8D8D8] transition-all duration-200 flex flex-col" style={{ minHeight: 260 }}>

      {/* ── Row 1: Logo + Name + Bookmark ── */}
      <div className="flex items-start gap-3 mb-3">
        <CompanyLogo
          name={startup.name} website={startup.website}
          logoInitial={startup.logoInitial} logoBg={startup.logoBg} logoColor={startup.logoColor}
          size={48} radius="12px"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-[15px] font-semibold text-[#222] leading-snug truncate">{startup.name}</h3>
            <button suppressHydrationWarning
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F7F7F7] transition-colors ml-1"
              aria-label="Bookmark">
              <svg width="13" height="13" fill="none" stroke="#CCCCCC" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
          {/* ── Row 2: Description ── */}
          <p className="text-[12px] leading-relaxed mt-0.5 line-clamp-2" style={{ color: "#9CA3AF" }}>
            {startup.shortDesc}
          </p>
        </div>
      </div>

      {/* ── Row 3: Category badge ── */}
      <div className="mb-4">
        <Badge label={startup.category} color={startup.badgeColor} size="sm" />
      </div>

      {/* ── Row 4: Location (left) + Year (right) ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5" style={{ color: "#222" }}>
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-[11px]">{startup.hqCity}, {startup.hqCountry}</span>
        </div>
        <span className="text-[11px]" style={{ color: "#222" }}>{startup.founded}</span>
      </div>

      {/* ── Row 5: Hiring (left) + View button (right) — pinned to bottom ── */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F5F5F5]">
        <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "#FF5A5F" }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Hiring now
        </div>
        <Link
          href={`/startups/${startup.slug}`}
          className="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-all duration-150 hover:opacity-85 flex-shrink-0"
          style={{ background: "#FF5A5F", color: "#fff" }}
        >
          View
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const categories = CATEGORY_MAP[id];
  const catMeta    = CATEGORIES.find(c => c.id === id);
  const hero       = CATEGORY_HERO[id];
  const accent     = CATEGORY_ACCENT[id] ?? "#FF5A5F";

  if (!categories) notFound();

  // Filter state
  const [search,   setSearch]   = useState("");
  const [stage,    setStage]    = useState("All Stages");
  const [country,  setCountry]  = useState("All Locations");
  const [empSize,  setEmpSize]  = useState("All Sizes");
  const [sort,     setSort]     = useState("Trending");

  const baseStartups = ALL_STARTUPS.filter(s => categories.includes(s.category));

  const filtered = useMemo(() => {
    let r = [...baseStartups];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.hqCity.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (stage   !== "All Stages")    r = r.filter(s => s.latestRound === stage);
    if (country !== "All Locations") r = r.filter(s => s.hqCountry === country);
    if (empSize !== "All Sizes")     r = r.filter(s => s.employees === empSize);
    if (sort === "Trending")         r.sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
    else if (sort === "Newest")      r.sort((a, b) => b.founded - a.founded);
    else if (sort === "Oldest")      r.sort((a, b) => a.founded - b.founded);
    else if (sort === "Most Funded") r.sort((a, b) => {
      const parse = (s: string) => parseFloat(s.replace(/[$B+M<,]/g, "")) * (s.includes("B") ? 1000 : 1);
      return parse(b.totalFunding) - parse(a.totalFunding);
    });
    return r;
  }, [baseStartups, search, stage, country, empSize, sort]);

  const hasActiveFilters = stage !== "All Stages" || country !== "All Locations" || empSize !== "All Sizes" || search.trim() !== "";

  return (
    <div className="min-h-screen" style={{ background: "#F4F4F4" }}>
      <Navbar />
      <div className="pt-16">

        {/* ── DARK HERO ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: hero?.gradient ?? "linear-gradient(135deg,#0f0f0f,#1a1a1a)", minHeight: 220 }}
        >
          {/* Glow blob */}
          <div
            className="absolute top-[-80px] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: accent, filter: "blur(120px)", opacity: 0.15 }}
            aria-hidden="true"
          />
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }} aria-hidden="true">
            <defs>
              <pattern id={`dots-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${id})`}/>
          </svg>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[12px] mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Link href="/startups" className="hover:text-white transition-colors">Home</Link>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              <Link href="/startups/all" className="hover:text-white transition-colors">Startups</Link>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{catMeta?.name}</span>
            </nav>

            {/* Title row — NO right-side decoration */}
            <div className="flex items-center gap-4">
              {catMeta && (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    color: accent,
                  }}
                >
                  <CategoryIcon icon={catMeta.icon} size={26}/>
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <h1 className="text-[clamp(22px,3.5vw,36px)] font-bold text-white leading-tight">
                    {catMeta?.name}
                  </h1>
                  {id === "ai-security" && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.2)", color: "#34D399", border: "1px solid rgba(52,211,153,0.3)" }}>
                      Includes AI Safety
                    </span>
                  )}
                </div>
                <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {catMeta?.description} 
                  {/* &mdash;{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }} className="font-medium">
                    {baseStartups.length} companies tracked
                  </span> */}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORY PILLS — full width grid ────────────────────── */}
        <section className="bg-white border-b border-[#E8E8E8] sticky top-[64px] z-30 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${CATEGORIES.length + 1}, minmax(0, 1fr))` }}
            >
              {CATEGORIES.map(cat => {
                const active = cat.id === id;
                return (
                  <Link
                    key={cat.id}
                    href={`/startups/category/${cat.id}`}
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-center transition-all duration-200 border"
                    style={{
                      background:   active ? cat.bgColor      : "transparent",
                      borderColor:  active ? cat.color+"40"   : "transparent",
                      color:        active ? cat.color        : "#9CA3AF",
                    }}
                  >
                    <span style={{ color: active ? cat.color : "#C0C0C0" }}>
                      <CategoryIcon icon={cat.icon} size={15}/>
                    </span>
                    <span className="text-[10px] font-semibold leading-tight"
                      style={{ color: active ? cat.color : "#717171" }}>
                      {cat.name.replace("AI ", "")}
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/startups/all"
                className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-center transition-all duration-200 border border-transparent hover:bg-[#F5F5F5]"
              >
                <svg width="15" height="15" fill="none" stroke="#C0C0C0" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
                <span className="text-[10px] font-semibold text-[#717171] leading-tight">View All</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SEARCH + FILTERS ─────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E8E8E8]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center gap-3 flex-wrap">

              {/* Search */}
              <div className="flex items-center gap-2.5 bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl px-4 py-2.5 flex-1 min-w-[200px] max-w-[340px] focus-within:border-[#222] focus-within:bg-white transition-all">
                <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  suppressHydrationWarning
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${catMeta?.name ?? "startups"}...`}
                  className="flex-1 outline-none bg-transparent text-[13px] text-[#222] placeholder-[#B0B0B0]"
                />
                {search && (
                  <button suppressHydrationWarning onClick={() => setSearch("")} className="flex-shrink-0 text-[#9CA3AF] hover:text-[#484848] transition-colors">
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter dropdowns */}
              <Dropdown label="Stage" value={stage} options={STAGE_OPTIONS} onChange={setStage}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>}
              />
              <Dropdown label="Location" value={country} options={COUNTRY_OPTIONS} onChange={setCountry}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
              />
              <Dropdown label="Size" value={empSize} options={EMPLOYEE_OPTIONS} onChange={setEmpSize}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              />
              <Dropdown label="Sort by" value={sort} options={SORT_OPTIONS} onChange={setSort}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>}
              />

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  suppressHydrationWarning
                  onClick={() => { setSearch(""); setStage("All Stages"); setCountry("All Locations"); setEmpSize("All Sizes"); }}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-colors"
                  style={{ background:"#FFF0F0", color:"#FF5A5F" }}
                >
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear
                </button>
              )}

              {/* Results count — right side */}
              <div className="ml-auto text-[13px] text-[#9CA3AF]">
                <span className="font-semibold text-[#222]">{filtered.length}</span> of {baseStartups.length} companies
              </div>
            </div>
          </div>
        </section>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 pb-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(s => <StartupCard key={s.id} startup={s}/>)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center">
                <svg width="22" height="22" fill="none" stroke="#C0C0C0" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <p className="text-[16px] font-semibold text-[#484848]">No results found</p>
              <p className="text-[13px] text-[#9CA3AF]">Try adjusting your search or filters</p>
              <button
                suppressHydrationWarning
                onClick={() => { setSearch(""); setStage("All Stages"); setCountry("All Locations"); setEmpSize("All Sizes"); }}
                className="mt-1 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: "#111" }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}