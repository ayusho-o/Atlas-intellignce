"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CompanyLogo from "@/components/ui/CompanyLogo";
import Badge from "@/components/ui/Badge";
import { ALL_STARTUPS, CATEGORIES, type Startup } from "@/data/startups";
import Footer from "@/components/layout/Footer";

const CARDS_PER_PAGE = 15;

const SORT_OPTIONS     = ["Trending", "Most Funded", "Newest", "Oldest", "Fastest Growing"];
const STAGE_OPTIONS    = ["All Stages", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Series F", "Growth", "Bootstrapped", "Private", "Strategic"];
const COUNTRY_OPTIONS  = ["All Locations", "USA", "UK", "Canada", "France", "Netherlands"];
const EMPLOYEE_OPTIONS = ["All Sizes", "50+", "100+", "200+", "500+", "1,000+", "5,000+"];
const ALL_CATEGORIES   = ["All Categories", ...Array.from(new Set(ALL_STARTUPS.map(s => s.category))).sort()];

// ── Dropdown ──────────────────────────────────────────────────────────────
function Dropdown({ label, icon, options, value, onChange }: {
  label: string; icon: React.ReactNode; options: string[];
  value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDefault = value === options[0];
  return (
    <div className="relative flex-1 min-w-0">
      <button
        suppressHydrationWarning
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border rounded-xl text-[13px] font-medium transition-all"
        style={{
          borderColor: isDefault ? "#E8E8E8" : "#222",
          boxShadow: isDefault ? "none" : "0 0 0 1px #222",
        }}
      >
        <span className="text-[#9CA3AF] flex-shrink-0">{icon}</span>
        <div className="flex items-center flex-1 min-w-0 overflow-hidden">
  <span className="text-[12px] font-semibold text-[#222] truncate">
    {isDefault ? label : value}
  </span>
</div>
        <svg width="10" height="10" fill="none" stroke="#9CA3AF" strokeWidth="2.5" viewBox="0 0 24 24"
          className={`flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}/>
          <div className="absolute top-full mt-2 left-0 z-20 bg-white border border-[#EBEBEB] rounded-xl shadow-xl py-1.5 min-w-[180px] max-h-[260px] overflow-y-auto">
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
      <div className="flex items-start gap-3 mb-3">
        <CompanyLogo
          name={startup.name} website={startup.website}
          logoInitial={startup.logoInitial} logoBg={startup.logoBg} logoColor={startup.logoColor}
          size={48} radius="12px"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-[15px] font-semibold text-[#222] leading-snug truncate">{startup.name}</h3>
            <button suppressHydrationWarning className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F7F7F7] transition-colors ml-1" aria-label="Bookmark">
              <svg width="13" height="13" fill="none" stroke="#CCCCCC" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
          <p className="text-[12px] leading-relaxed mt-0.5 line-clamp-2" style={{ color: "#9CA3AF" }}>
            {startup.shortDesc}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Badge label={startup.category} color={startup.badgeColor} size="sm"/>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5" style={{ color: "#B0B8C4" }}>
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="text-[11px]">{startup.hqCity}, {startup.hqCountry}</span>
        </div>
        <span className="text-[11px]" style={{ color: "#B0B8C4" }}>{startup.founded}</span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F5F5F5]">
        <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "#FF5A5F" }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Hiring now
        </div>
        <Link
          href={`/startups/${startup.slug}`}
          className="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-all duration-150 hover:opacity-85"
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
function AllStartupsContent() {
  const searchParams = useSearchParams();

  // Read query params set by "View all" links from homepage sections
  const paramSort   = searchParams.get("sort")   ?? "";
  const paramFilter = searchParams.get("filter") ?? "";

  // Resolve initial sort from URL
  const resolveSort = () => {
    if (SORT_OPTIONS.includes(paramSort)) return paramSort;
    if (paramSort === "Most+Funded" || paramSort === "Most Funded") return "Most Funded";
    if (paramSort === "Fastest+Growing" || paramSort === "Fastest Growing") return "Fastest Growing";
    return "Trending";
  };

  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stage,    setStage]    = useState("All Stages");
  const [country,  setCountry]  = useState("All Locations");
  const [empSize,  setEmpSize]  = useState("All Sizes");
  const [sort,     setSort]     = useState(resolveSort);
  const [page,     setPage]     = useState(1);

  // Apply filter=featured / filter=new from URL on mount
  useEffect(() => {
    if (paramFilter === "featured") {
      // no direct filter for featured, just show newest sort
    }
    if (paramFilter === "new") setSort("Newest");
    if (paramFilter === "fast-growing") setSort("Fastest Growing");
  }, [paramFilter]);

  const filtered = useMemo(() => {
    let r = [...ALL_STARTUPS];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.hqCity.toLowerCase().includes(q) ||
        s.hqCountry.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // filters
    if (category !== "All Categories") r = r.filter(s => s.category === category);
    if (stage    !== "All Stages")     r = r.filter(s => s.latestRound === stage);
    if (country  !== "All Locations")  r = r.filter(s => s.hqCountry === country);
    if (empSize  !== "All Sizes")      r = r.filter(s => s.employees === empSize);

    // featured filter from URL
    if (paramFilter === "featured") r = r.filter(s => s.isFeatured);
    if (paramFilter === "new")      r = r.filter(s => s.isNew);

    // sort
    if (sort === "Trending")         r.sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
    else if (sort === "Newest")      r.sort((a, b) => b.founded - a.founded);
    else if (sort === "Oldest")      r.sort((a, b) => a.founded - b.founded);
    else if (sort === "Most Funded") r.sort((a, b) => {
      const parse = (s: string) => parseFloat(s.replace(/[$B+M<,]/g, "")) * (s.includes("B") ? 1000 : 1);
      return parse(b.totalFunding) - parse(a.totalFunding);
    });
    else if (sort === "Fastest Growing") r.sort((a, b) => (b.growth ?? 0) - (a.growth ?? 0));

    return r;
  }, [search, category, stage, country, empSize, sort, paramFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  const hasActiveFilters = search.trim() !== "" || category !== "All Categories" ||
    stage !== "All Stages" || country !== "All Locations" || empSize !== "All Sizes";

  const resetFilters = () => {
    setSearch(""); setCategory("All Categories");
    setStage("All Stages"); setCountry("All Locations");
    setEmpSize("All Sizes"); setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white px-4 md:px-8 pt-12 pb-10 max-w-[1400px] mx-auto">
          {/* Dot globe */}
          {/* ── Globe — SVG dot sphere matching screenshot ── */}
          <div
            className="absolute right-0 top-0 pointer-events-none select-none hidden lg:block"
            aria-hidden="true"
            style={{ width: 560, height: 480, top: -40, right: -60, overflow: "hidden" }}
          >
            <svg viewBox="0 0 560 480" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="hglow1" cx="55%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#FF5A5F" stopOpacity="0.22"/>
                  <stop offset="60%" stopColor="#FF5A5F" stopOpacity="0.06"/>
                  <stop offset="100%" stopColor="#FF5A5F" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="hglow2" cx="55%" cy="45%" r="35%">
                  <stop offset="0%" stopColor="#FF5A5F" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#FF5A5F" stopOpacity="0"/>
                </radialGradient>
              </defs>
              {/* Soft ambient glow */}
              <ellipse cx="310" cy="220" rx="210" ry="210" fill="url(#hglow1)"/>
              <ellipse cx="310" cy="220" rx="155" ry="155" fill="url(#hglow2)"/>

              {/* Dot grid — sphere-shaped mask */}
              {Array.from({ length: 26 }, (_, row) =>
                Array.from({ length: 30 }, (_, col) => {
                  const cx = 110 + col * 14;
                  const cy = 50  + row * 16;
                  const dx = cx - 310, dy = cy - 220;
                  const dist = Math.sqrt(dx*dx + dy*dy);
                  const R = 188;
                  if (dist > R) return null;
                  // perspective: dots shrink toward edges
                  const norm = dist / R;
                  const r = 1.8 * (1 - norm * 0.45);
                  const opacity = (0.85 - norm * 0.6) * Math.max(0, 1 - (col * 0.01));
                  if (opacity <= 0.04) return null;
                  return <circle key={`${row}-${col}`} cx={cx} cy={cy} r={r} fill="#FF5A5F" opacity={opacity}/>;
                })
              )}

              {/* Mesh lines — give sphere a wireframe feel */}
              {[-60,-30,0,30,60,90].map(angle => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 310 + 185 * Math.cos(rad);
                const y1 = 220 + 185 * Math.sin(rad);
                const x2 = 310 - 185 * Math.cos(rad);
                const y2 = 220 - 185 * Math.sin(rad);
                return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF5A5F" strokeWidth="0.5" strokeOpacity="0.12"/>;
              })}
              {[0.4, 0.7, 1.0].map(f => (
                <circle key={f} cx="310" cy="220" r={188*f} fill="none" stroke="#FF5A5F" strokeWidth="0.6" strokeOpacity="0.1"/>
              ))}

              {/* Accent floating dots */}
              <circle cx="122" cy="88"  r="6"   fill="#FF5A5F" opacity="0.45"/>
              <circle cx="490" cy="310" r="8"   fill="#FF5A5F" opacity="0.22"/>
              <circle cx="440" cy="58"  r="4.5" fill="#FF5A5F" opacity="0.35"/>
              <circle cx="96"  cy="290" r="4"   fill="#FF5A5F" opacity="0.25"/>
              <circle cx="520" cy="160" r="3.5" fill="#FF5A5F" opacity="0.2"/>
              <circle cx="180" cy="400" r="3"   fill="#FF5A5F" opacity="0.18"/>
              <circle cx="380" cy="30"  r="3"   fill="#FF5A5F" opacity="0.28"/>
            </svg>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-[#9CA3AF] mb-6">
            <Link href="/startups" className="hover:text-[#484848] transition-colors">Home</Link>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-[#222] font-medium">All Startups</span>
          </nav>

          <div className="max-w-[600px] relative z-10">
            <h1 className="text-[clamp(26px,4vw,42px)] font-bold text-[#222] leading-tight tracking-tight mb-3">
              Explore startups shaping the future
            </h1>
            <p className="text-[15px] text-[#535050] leading-relaxed">
              Discover AI startups — filter by category, stage, location and more.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative mt-8 max-w-[640px] z-10">
            <div className="flex items-center gap-3 bg-white border border-[#EBEBEB] rounded-2xl px-5 py-3.5 shadow-sm hover:border-[#D0D0D0] focus-within:border-[#FF5A5F] focus-within:ring-2 focus-within:ring-[#FF5A5F]/10 transition-all">
              <svg width="17" height="17" fill="none" stroke="#9CA3AF" strokeWidth="1.8" viewBox="0 0 24 24" className="flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                suppressHydrationWarning
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search startups, founders, technologies, investors..."
                className="flex-1 outline-none bg-transparent text-[14px] text-[#222] placeholder-[#9CA3AF]"
              />
              {search && (
                <button suppressHydrationWarning onClick={() => { setSearch(""); setPage(1); }} className="flex-shrink-0 text-[#9CA3AF] hover:text-[#484848] transition-colors">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
              <button suppressHydrationWarning
                className="flex-shrink-0 px-5 py-2 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "#FF5A5F" }}>
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR — full width equal columns ─────────────────── */}
        <section className="border-t border-b border-[#F0F0F0] bg-white sticky top-[64px] z-30 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3">
            {/* Equal-width grid: 5 dropdowns + sort + clear */}
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr)) auto auto" }}>

              <Dropdown label="Category" value={category} options={ALL_CATEGORIES} onChange={v => { setCategory(v); setPage(1); }}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>}
              />
              <Dropdown label="Stage" value={stage} options={STAGE_OPTIONS} onChange={v => { setStage(v); setPage(1); }}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>}
              />
              <Dropdown label="Location" value={country} options={COUNTRY_OPTIONS} onChange={v => { setCountry(v); setPage(1); }}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
              />
              <Dropdown label="Size" value={empSize} options={EMPLOYEE_OPTIONS} onChange={v => { setEmpSize(v); setPage(1); }}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              />
              <Dropdown label="Sort by" value={sort} options={SORT_OPTIONS} onChange={v => { setSort(v); setPage(1); }}
                icon={<svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>}
              />

              {/* Clear — only when active */}
              {hasActiveFilters ? (
                <button suppressHydrationWarning onClick={resetFilters}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-colors"
                  style={{ background: "#FFF0F0", color: "#FF5A5F" }}>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear
                </button>
              ) : <div/>}

              {/* Results count */}
              <div className="flex items-center justify-end whitespace-nowrap">
                <span className="text-[12px] text-[#9CA3AF]">
                  <span className="font-semibold text-[#222]">{filtered.length}</span> results
                </span>
              </div>
            </div>

            
          </div>
        </section>

        {/* ── GRID ──────────────────────────────────────────────────── */}
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 pb-16">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paginated.map(s => <StartupCard key={s.id} startup={s}/>)}
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
              <button suppressHydrationWarning onClick={resetFilters}
                className="mt-1 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-80 transition-opacity"
                style={{ background: "#FF5A5F" }}>
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button suppressHydrationWarning onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#EBEBEB] text-[#484848] hover:border-[#D0D0D0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {(() => {
                const pages: (number | "...")[] = [];
                if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
                else {
                  pages.push(1);
                  if (page > 3) pages.push("...");
                  for (let i = Math.max(2, page-1); i <= Math.min(totalPages-1, page+1); i++) pages.push(i);
                  if (page < totalPages - 2) pages.push("...");
                  pages.push(totalPages);
                }
                return pages.map((p, i) => p === "..." ? (
                  <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-[13px] text-[#9CA3AF]">…</span>
                ) : (
                  <button suppressHydrationWarning key={p} onClick={() => setPage(p as number)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-medium transition-colors"
                    style={{ background: page===p ? "#FF5A5F" : "white", color: page===p ? "white" : "#484848", border: page===p ? "none" : "1px solid #EBEBEB" }}>
                    {p}
                  </button>
                ));
              })()}
              <button suppressHydrationWarning onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#EBEBEB] text-[#484848] hover:border-[#D0D0D0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>

    </div>
  );
}



export default function AllStartupsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#FF5A5F] border-t-transparent animate-spin"/>
          <p className="text-[14px] text-[#9CA3AF]">Loading startups...</p>
        </div>
      </div>
    }>
      <AllStartupsContent />
    </Suspense>
  );
}