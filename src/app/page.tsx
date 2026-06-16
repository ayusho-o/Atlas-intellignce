"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import Badge from "@/components/ui/Badge";
import {
  FOUNDERS_SPOTLIGHT, TOP_PRODUCTS, TOP_INVESTORS,
  NEWS_ITEMS, RESEARCH_PAPERS, LATEST_JOBS, FUNDING_ROUNDS,
  type Founder, type FundingRound,
} from "@/data/homepage";
import { TRENDING_EXTENDED } from "@/data/startups";

// ── Stats (no emojis — inline SVG icons) ─────────────────────
const STATS = [
  {
    value: "32,480+", label: "AI Companies", growth: "+2.7% this month", color: "#FF5A5F",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V9m6 12V9"/>
      </svg>
    ),
  },
  {
    value: "8,920+", label: "Founders", growth: "+3.1% this month", color: "#3B82F6",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
      </svg>
    ),
  },
  {
    value: "6,210+", label: "Investors", growth: "+8.0% this month", color: "#10B981",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
      </svg>
    ),
  },
  {
    value: "$202B+", label: "Funding Tracked", growth: "+75% YoY 2025", color: "#F59E0B",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    value: "18,240+", label: "News & Updates", growth: "+4.2% this month", color: "#8B5CF6",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M18 18h-8M18 10h-8"/>
      </svg>
    ),
  },
  {
    value: "98", label: "Countries Covered", growth: "Global reach", color: "#0EA5E9",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

// ── Horizontal scroll with arrow buttons ─────────────────────
function HScroll({ children, cardWidth = 320 }: { children: React.ReactNode; cardWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  return (
    <div className="relative group -mx-2 px-2">
      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {children}
      </div>
      <button suppressHydrationWarning onClick={() => scroll(-1)}
        className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[#E0E0E0] rounded-full shadow-md items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 hidden md:flex hover:shadow-lg hover:border-[#CCC]">
        <svg width="14" height="14" fill="none" stroke="#484848" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button suppressHydrationWarning onClick={() => scroll(1)}
        className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[#E0E0E0] rounded-full shadow-md items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 hidden md:flex hover:shadow-lg hover:border-[#CCC]">
        <svg width="14" height="14" fill="none" stroke="#484848" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────
function SectionHead({ title, href, label = "View all" }: { title: string; href: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[18px] font-bold text-[#111]">{title}</h2>
      <Link href={href} className="text-[13px] font-semibold hover:underline" style={{ color: "#FF5A5F" }}>
        {label}
      </Link>
    </div>
  );
}

// ── Logo with white bg ────────────────────────────────────────
function WhiteLogo({ name, website, initial, size = 40 }: { name: string; website: string; initial: string; size?: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const radius = Math.round(size * 0.28);
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 border border-[#F0F0F0]"
      style={{ width: size, height: size, borderRadius: radius, background: "#fff", overflow: "hidden" }}
    >
      {!imgFailed ? (
        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain=${website}`}
          alt={name} width={size * 1} height={size * 0.55}
          onError={() => setImgFailed(true)}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <span className="font-bold text-[#484848]" style={{ fontSize: size * 0.36 }}>{initial}</span>
      )}
    </div>
  );
}

// ── Verified badge (beautiful shield-check) ───────────────────
function VerifiedBadge() {
  return (
    <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)", boxShadow: "0 1px 4px rgba(59,130,246,0.45)" }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <polyline points="2.5,5 4,6.5 7.5,3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── Founder photo card ────────────────────────────────────────
function FounderCard({ founder }: { founder: Founder }) {
  const [src, setSrc] = useState(founder.photo);
  const [attempt, setAttempt] = useState(0);
  const [hovered, setHovered] = useState(false);
  const fallbacks = [
    founder.photo,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&size=400&background=${founder.initBg.replace("#", "")}&color=fff&bold=true&font-size=0.35`,
  ];
  const handleError = () => {
    const next = attempt + 1;
    if (next < fallbacks.length) { setAttempt(next); setSrc(fallbacks[next]); }
  };
  const domainMap: Record<string, string> = {
    "OpenAI": "openai.com", "Anthropic": "anthropic.com", "NVIDIA": "nvidia.com",
    "Google DeepMind": "deepmind.com", "Perplexity": "perplexity.ai",
    "Scale AI": "scale.com", "Mistral AI": "mistral.ai",
    "Databricks": "databricks.com", "World Labs": "worldlabs.ai", "xAI": "x.ai",
  };

  return (
    <Link href={`/startups/${founder.companySlug}`}
      className="flex-shrink-0 w-[185px] rounded-2xl overflow-hidden border border-[#EBEBEB] bg-white hover:shadow-lg hover:border-[#D0D0D0] transition-all duration-300 cursor-pointer"
      style={{ display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", background: "#F5F5F5" }}>
        <img
          src={src} alt={founder.name}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={handleError}
        />
        {/* Gradient overlay — subtle, only at bottom for text readability */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)", opacity: hovered ? 1 : 0.85 }}
          aria-hidden="true"/>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 70%)" }}
          aria-hidden="true"/>
        {/* Company badge */}
        <div className="absolute bottom-3 left-3 w-8 h-8 rounded-xl border-2 border-white shadow-lg flex items-center justify-center bg-white overflow-hidden">
          <img src={`https://www.google.com/s2/favicons?sz=64&domain=${domainMap[founder.company] ?? "google.com"}`}
            alt={founder.company} width={50} height={50} style={{ objectFit: "contain" }}/>
        </div>
        {/* Location pill — appears on hover */}
        <div className="absolute bottom-3 right-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(4px)" }}>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <svg width="8" height="8" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-[9px] text-white/90 font-medium whitespace-nowrap">{founder.location}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-[13px] font-bold text-[#111] leading-tight truncate">{founder.name}</p>
          {founder.verified && <VerifiedBadge />}
        </div>
        <p className="text-[11px] text-[#717171] mb-2 leading-snug">{founder.role}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
            style={{ background: "rgba(255,90,95,0.08)", color: "#FF5A5F" }}>
            {founder.company}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Dark funding card with wave pattern ───────────────────────
function FundingCard({ r }: { r: FundingRound }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const waveId = `wave-${r.id}`;
  return (
    <Link href={`/startups/${r.slug}`}
      className="flex-shrink-0 w-[200px] rounded-2xl relative flex flex-col justify-between p-5 hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${r.accentColor} 0%, #080808 100%)`, minHeight: 185 }}>
      {/* Top shine */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)" }}/>
      {/* Wave lines */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" height="80" viewBox="0 0 200 80"
        preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={waveId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
        </defs>
        <path d="M0 55 Q25 35 50 50 Q75 65 100 45 Q125 25 150 40 Q175 55 200 35 L200 80 L0 80 Z"
          fill={`url(#${waveId})`}/>
        <path d="M0 65 Q30 50 60 62 Q90 74 120 58 Q150 42 180 55 Q195 62 200 55 L200 80 L0 80 Z"
          fill="rgba(255,255,255,0.05)"/>
        {/* Horizontal scan lines */}
        {[38, 48, 58, 68].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="200" y2={y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        ))}
      </svg>
      {/* Top row */}
      <div className="flex items-center gap-2.5 relative z-10">
        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
  style={{ background: "transparent" }}>
          {!logoFailed ? (
            <img src={`https://www.google.com/s2/favicons?sz=64&domain=${r.website}`}
              alt={r.company} width={50} height={50}
              onError={() => setLogoFailed(true)}
              style={{ objectFit: "contain" }}/>
          ) : (
            <span className="text-white font-bold text-[13px]">{r.logoInitial}</span>
          )}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white leading-tight">{r.company}</p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>{r.round}</p>
        </div>
      </div>
      {/* Amount */}
      <div className="relative z-10 mt-5">
        <p className="text-[30px] font-black text-white leading-none tracking-tight mb-1.5">{r.amount}</p>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Led by <span className="font-semibold text-white">{r.leadInvestor}</span>
        </p>
        <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>{r.timeAgo}</p>
      </div>
    </Link>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Sidebar />
      <TopBar />

      <div className="lg:pl-[250px] pt-[52px]" style={{ maxWidth: "100vw", overflowX: "hidden" }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 lg:px-10 pt-14 pb-12" style={{ minHeight: 360 }}>
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle, #FF5A5F18 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              mask: "radial-gradient(ellipse 85% 90% at 75% 45%, black 30%, transparent 75%)",
              WebkitMask: "radial-gradient(ellipse 85% 90% at 75% 45%, black 30%, transparent 75%)",
            }}/>
          <div className="absolute right-0 top-0 pointer-events-none select-none hidden lg:block" aria-hidden="true"
            style={{ width: 520, height: 440, top: -30, right: -50, overflow: "hidden" }}>
            <svg viewBox="0 0 520 440" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="hg1" cx="55%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#FF5A5F" stopOpacity="0.22"/>
                  <stop offset="60%" stopColor="#FF5A5F" stopOpacity="0.06"/>
                  <stop offset="100%" stopColor="#FF5A5F" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <ellipse cx="290" cy="210" rx="200" ry="200" fill="url(#hg1)"/>
              {Array.from({ length: 22 }, (_, row) =>
                Array.from({ length: 26 }, (_, col) => {
                  const cx = 90 + col * 16; const cy = 20 + row * 18;
                  const dx = cx - 290; const dy = cy - 210;
                  const dist = Math.sqrt(dx*dx + dy*dy);
                  if (dist > 195) return null;
                  const op = 0.08 + (1 - dist/195) * 0.55;
                  return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="2" fill="#FF5A5F" fillOpacity={op}/>;
                })
              )}
            </svg>
          </div>
          <div className="relative z-10 max-w-[520px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-5"
              style={{ background: "#FEF0F0", color: "#FF5A5F" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] inline-block"/>
              The #1 Platform for AI Intelligence
            </div>
            <h1 className="text-[clamp(28px,4vw,46px)] font-black text-[#111] leading-[1.08] tracking-tight mb-4">
              The Intelligence Layer<br/>
              for the <span style={{ color: "#FF5A5F" }}>AI Economy.</span>
            </h1>
            <p className="text-[15px] text-[#717171] leading-relaxed mb-8 max-w-[440px]">
              Real-time insights on companies, founders, investors, funding rounds, product launches and market movements.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
  <Link href="/auth/signup"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-white hover:opacity-90 transition-opacity"
    style={{ background: "#FF5A5F" }}>
    Explore Platform
    <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  </Link>
</div>
          </div>
        </section>

        {/* ── STATS — professional, icon-driven ─────────────────── */}
        <section className="px-6 lg:px-10 py-5 border-y border-[#F0F0F0] mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-[#F0F0F0]">
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? "pl-0" : ""} ${i === STATS.length - 1 ? "pr-0" : ""}`}>
                {/* Icon pill */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}14`, color: s.color }}>
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[17px] font-black text-[#111] leading-tight tracking-tight">{s.value}</p>
                  <p className="text-[10px] text-[#9CA3AF] leading-tight truncate mt-0.5">{s.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      style={{ color: s.color, flexShrink: 0 }}>
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    <p className="text-[9px] font-semibold leading-tight truncate" style={{ color: s.color }}>{s.growth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 lg:px-10">

          {/* ── TRENDING STARTUPS ─────────────────────────────────── */}
          <section className="mb-12">
            <SectionHead title="Trending AI Startups" href="/startups/all?sort=Trending" label="View all startups →"/>
            <HScroll cardWidth={172}>
              {TRENDING_EXTENDED.slice(0, 15).map((s, i) => {
                // Cycle through strong colors so every rank tag is vivid
                const rankColors = ["#FF5A5F","#F59E0B","#10B981","#3B82F6","#8B5CF6","#0EA5E9","#EC4899","#14B8A6","#F97316","#6366F1","#EF4444","#84CC16"];
                const rankColor = rankColors[i % rankColors.length];
                return (
                  <Link key={s.id} href={`/startups/${s.slug}`}
                    className="flex-shrink-0 w-[160px] bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:shadow-md hover:border-[#D0D0D0] transition-all duration-200 flex flex-col items-center text-center gap-3">
                    <div className="w-full flex items-center justify-between mb-1">
                      <span className="text-[12px] font-black" style={{ color: ["#FF5A5F","#F59E0B","#10B981","#3B82F6","#8B5CF6","#0EA5E9","#EC4899","#14B8A6","#F97316","#6366F1","#EF4444","#84CC16"][i % 12] }}>
                      #{i + 1}
                      </span>
                      {s.isFeatured && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: "rgba(255,90,95,0.08)", color: "#FF5A5F" }}>Featured</span>
                      )}
                    </div>
                    <WhiteLogo name={s.name} website={s.website} initial={s.logoInitial} size={44}/>
                    <div>
                      <p className="text-[13px] font-bold text-[#111] leading-tight">{s.name}</p>
                      <p className="text-[11px] text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">{s.shortDesc}</p>
                    </div>
                    <Badge label={s.category} color={s.badgeColor} size="xs"/>
                    <div className="flex items-center justify-between w-full text-[10px] text-[#C0C0C0] mt-auto pt-2 border-t border-[#F5F5F5]">
                      <span>Est. {s.founded}</span>
                      <span className="truncate ml-1 max-w-[70px]">{s.hqCity}</span>
                    </div>
                  </Link>
                );
              })}
            </HScroll>
          </section>

          {/* ── FUNDING ROUNDS ────────────────────────────────────── */}
          <section className="mb-12">
            <SectionHead title="Latest Funding Rounds" href="/startups/all?sort=Most+Funded" label="View all funding →"/>
            <HScroll cardWidth={210}>
              {FUNDING_ROUNDS.map(r => <FundingCard key={r.id} r={r}/>)}
            </HScroll>
          </section>

          {/* ── FOUNDER SPOTLIGHT ─────────────────────────────────── */}
          <section className="mb-12">
            <SectionHead title="Founder Spotlight" href="/founders" label="View all founders →"/>
            <HScroll cardWidth={195}>
              {FOUNDERS_SPOTLIGHT.map(f => <FounderCard key={f.id} founder={f}/>)}
            </HScroll>
          </section>

          {/* ── TOP AI PRODUCTS ───────────────────────────────────── */}
          <section className="mb-12">
            <SectionHead title="Top AI Products" href="/products" label="View all products →"/>
            <HScroll cardWidth={160}>
              {TOP_PRODUCTS.map(p => (
                <Link key={p.id} href={`/startups/${p.companySlug}`}
                  className="flex-shrink-0 w-[148px] bg-white border border-[#EBEBEB] rounded-2xl p-4 hover:shadow-md hover:border-[#D0D0D0] transition-all duration-200 flex flex-col items-center text-center gap-3">
                  <WhiteLogo name={p.name} website={p.website} initial={p.logoInitial} size={44}/>
                  <div className="flex-1 w-full">
                    <p className="text-[12px] font-bold text-[#111] leading-tight">{p.name}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{p.company}</p>
                    <p className="text-[11px] text-[#717171] mt-1.5 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                  <Badge label={p.category} color={p.categoryColor as any} size="xs"/>
                </Link>
              ))}
            </HScroll>
          </section>


            {/* ── TWO-COLUMN: INVESTORS + NEWS ─────────────────────── */}
<section className="grid grid-cols-1 lg:grid-cols-[4.5fr_7.5fr] gap-10 mb-12">

  {/* Investors */}
  <div>
    <SectionHead
      title="Top Investors in AI"
      href="/investors"
      label="View all investors →"
    />

    <div className="space-y-2">
      {TOP_INVESTORS.slice(0, 6).map(inv => (
        <div
          key={inv.id}
          className="flex items-center gap-3 px-3 py-2.5 bg-white border border-[#F0F0F0] rounded-xl hover:border-[#E0E0E0] hover:shadow-sm transition-all cursor-pointer group"
        >
          <div
  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-[#F0F0F0]"
  style={{ background: "#fff" }}
>
            <img
  src={`https://www.google.com/s2/favicons?sz=64&domain=${inv.website}`}
  alt={inv.name}
  width={50}
  height={50}
  style={{
    objectFit: "contain",
  }}
  onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const p = (e.target as HTMLImageElement).parentElement;
                if (p) {
                  p.textContent = inv.logoInitial;
                  p.style.color = inv.logoColor;
                  p.style.fontWeight = "800";
                  p.style.fontSize = "15px";
                }
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#111] leading-tight truncate group-hover:text-[#FF5A5F] transition-colors">
              {inv.name}
            </p>
            <p className="text-[10px] text-[#9CA3AF] leading-tight">
              {inv.type}
            </p>
          </div>

          <div className="flex gap-5 text-right flex-shrink-0">
            <div>
              <p className="text-[9px] text-[#9CA3AF]">AI Investments</p>
              <p className="text-[15px] font-black text-[#111]">
                {inv.aiInvestments}
              </p>
              <p className="text-[9px] text-[#C0C0C0]">Portfolio</p>
            </div>

            <div>
              <p className="text-[9px] text-[#9CA3AF]">Total Raised</p>
              <p className="text-[15px] font-black text-[#111]">
                {inv.totalRaised}
              </p>
              <p className="text-[9px] text-[#C0C0C0] truncate max-w-[68px]">
                {inv.notable.split(",")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* News */}
  <div>
    <SectionHead
      title="News & Insights"
      href="/news"
      label="View all news →"
    />

    <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">

      {/* Featured News */}
      <div>
        {NEWS_ITEMS.filter(n => n.featured)
          .slice(0, 1)
          .map(n => (
            <div
              key={n.id}
              className="rounded-2xl overflow-hidden border border-[#F0F0F0] hover:shadow-md transition-shadow group cursor-pointer h-full"
            >
              <div className="relative h-[330px] overflow-hidden">
                <img
                  src={n.featuredImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.15) 60%, transparent 100%)",
                  }}
                />

                <span
                  className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "#FF5A5F",
                    color: "#fff",
                  }}
                >
                  Featured
                </span>
              </div>

              <div className="p-5">
                <p className="text-[18px] font-bold text-[#111] leading-snug mb-3 line-clamp-2">
                  {n.title}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#9CA3AF]">
                    {n.source} · {n.date}
                  </p>

                  <Link
                    href="/news"
                    className="text-[12px] font-semibold hover:underline"
                    style={{ color: "#FF5A5F" }}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* News Sidebar */}
      <div className="flex flex-col gap-3">
        {NEWS_ITEMS.filter(n => !n.featured)
          .slice(0, 4)
          .map(n => {
            const tagColors: Record<string, string> = {
              green: "#10B981",
              coral: "#FF5A5F",
              blue: "#3B82F6",
              purple: "#8B5CF6",
            };

            return (
              <div
                key={n.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F9F9F9] transition-colors cursor-pointer"
              >
                <div
  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#F0F0F0]"
  style={{ background: "#fff" }}
>
                  <img
  src={`https://www.google.com/s2/favicons?sz=64&domain=${n.sourceLogo}`}
  width={50}
  height={50}
  style={{ objectFit: "contain" }}
/>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[9px] font-bold uppercase"
                      style={{
                        color: tagColors[n.tagColor] ?? "#9CA3AF",
                      }}
                    >
                      {n.tag}
                    </span>

                    <span className="text-[9px] text-[#9CA3AF]">
                      {n.date}
                    </span>
                  </div>

                  <p className="text-[13px] font-semibold text-[#222] leading-snug line-clamp-3">
                    {n.title}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

    </div>
  </div>

</section>


          {/* ── TWO-COLUMN: JOBS + RESEARCH ──────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

            {/* Jobs */}
            <div>
              <SectionHead title="Latest AI Jobs" href="/jobs" label="View all jobs →"/>
              <div className="grid grid-cols-2 gap-2.5">
                {LATEST_JOBS.slice(0, 6).map(job => (
                  <div key={job.id} className="p-3.5 bg-white border border-[#F0F0F0] rounded-2xl hover:border-[#E0E0E0] hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <WhiteLogo name={job.company} website={job.website} initial={job.logoInitial} size={30}/>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-[#111] leading-tight truncate">{job.title}</p>
                        <p className="text-[10px] text-[#9CA3AF] truncate">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] mb-2">
                      <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-[#F5F5F5] text-[#484848]">{job.type}</span>
                      {job.isNew && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>New</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research — 4 papers */}
            <div>
              <SectionHead title="Latest Research Papers" href="/research" label="View all research →"/>
              <div className="space-y-2.5">
                {RESEARCH_PAPERS.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-start gap-3 group cursor-pointer p-2.5 rounded-xl hover:bg-[#F9F9F9] transition-colors">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-[#F0F0F0] flex items-center justify-center">
                      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${p.orgLogo}`}
                        alt={p.org} width={24} height={24} style={{ objectFit: "contain" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) { parent.style.background = p.orgBg; parent.style.color = "#fff"; parent.style.fontWeight = "700"; parent.style.fontSize = "14px"; parent.textContent = p.orgInitial; }
                        }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wide text-[#9CA3AF]">{p.tag}</span>
                        <span className="text-[9px] text-[#DEDEDE]">·</span>
                        <span className="text-[9px] text-[#9CA3AF]">{p.date}</span>
                      </div>
                      <p className="text-[12px] font-semibold text-[#222] leading-snug line-clamp-2 group-hover:text-[#FF5A5F] transition-colors">{p.title}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#C0C0C0]">
                        <span className="flex items-center gap-1">
                          <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          {p.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                          {p.bookmarks}
                        </span>
                        <span className="text-[#B0B0B0]">{p.org}</span>
                      </div>
                    </div>
                    <button suppressHydrationWarning className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                      <svg width="13" height="13" fill="none" stroke="#C0C0C0" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER CTA ────────────────────────────────────────── */}
          <section className="rounded-3xl overflow-hidden mb-10 relative"
            style={{ background: "linear-gradient(135deg, #FF5A5F 0%, #C0392B 55%, #7B0000 100%)" }}>
            <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" aria-hidden="true">
              <defs><pattern id="ctadots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white"/>
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#ctadots)"/>
            </svg>
            <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-[clamp(22px,3.5vw,36px)] font-black text-white leading-tight mb-3">
                  Stay ahead in<br/>the AI economy.
                </h2>
                <p className="text-[14px] mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Join thousands of founders, investors and researchers who rely on GraphOne for real-time AI insights.
                </p>
                <Link href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-white text-[13px] font-bold px-6 py-3 rounded-xl hover:bg-[#F5F5F5] transition-colors"
                  style={{ color: "#FF5A5F" }}>
                  Create account
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: "Real-time Data",   desc: "Live updates on funding, companies and markets.",
                    icon: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                  { label: "Advanced Filters", desc: "Powerful search and custom analytics.",
                    icon: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg> },
                  { label: "Global Coverage",  desc: "Comprehensive data across 98 countries.",
                    icon: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                  { label: "Save & Track",     desc: "Bookmark and get alerts on what matters.",
                    icon: <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
                ].map(f => (
                  <div key={f.label}>
                    <span className="mb-1.5 block">{f.icon}</span>
                    <p className="text-[12px] font-bold text-white mb-1">{f.label}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}