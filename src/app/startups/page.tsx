import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import SectionHeader from "@/components/layout/SectionHeader";
import CompanyCard from "@/components/cards/CompanyCard";
import FeaturedCard from "@/components/cards/FeaturedCard";
import FundingCard from "@/components/cards/FundingCard";
import GrowthCard from "@/components/cards/GrowthCard";
import NewStartupCard from "@/components/cards/NewStartupCard";
import CategoryCard from "@/components/cards/CategoryCard";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import SearchBar from "@/components/ui/SearchBar";
import Footer from "@/components/layout/Footer";
import {
  ALL_STARTUPS, FEATURED, RECENTLY_FUNDED_EXTRA as RECENTLY_FUNDED, NEWLY_ADDED_EXTRA as NEWLY_ADDED,
  FAST_GROWING_EXTRA as FAST_GROWING, CATEGORIES, TRENDING,
} from "@/data/startups";

// Build carousel rows — each needs ≥ 8 cards to show scrolling at any breakpoint
const EXTRA_TRENDING  = ALL_STARTUPS.filter(s => !s.isTrending).slice(0, 7);
const TRENDING_ROW    = [...TRENDING, ...EXTRA_TRENDING];   // 12 cards

const EXTRA_FEATURED  = ALL_STARTUPS.filter(s => !s.isFeatured).slice(0, 6);
const FEATURED_ROW    = [...FEATURED, ...EXTRA_FEATURED];   // 10 cards

const ENTITY_TABS = [
  { label:"Startups",  active:true,  href:"/startups" },
  { label:"Founders",  active:false, href:"/founders" },
  { label:"Investors", active:false, href:"/investors" },
  { label:"Products",  active:false, href:"/products" },
  { label:"News",      active:false, href:"/research" },
  { label:"Funding",   active:false, href:"/funding" },
  { label:"Jobs",      active:false, href:"/jobs" },
];

const SIDEBAR_W = 250;

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Sidebar />
      <TopBar />

      {/* Main content — offset by sidebar on desktop */}
      <div className="lg:pl-[250px] pt-[52px]" style={{ maxWidth: "100vw", overflowX: "hidden" }}>

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 lg:px-10 pt-14 pb-16" style={{ minHeight: 400 }}>

          {/* ── Background: subtle dot-grid pattern ── */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle, #FF5A5F18 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              mask: "radial-gradient(ellipse 85% 90% at 75% 45%, black 30%, transparent 75%)",
              WebkitMask: "radial-gradient(ellipse 85% 90% at 75% 45%, black 30%, transparent 75%)",
            }}
          />

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

          {/* ── Hero text ── */}
          <div className="relative z-10" style={{ maxWidth: 620 }}>
            <h1
              className="font-extrabold text-[#1A1A1A] tracking-tight mb-4 leading-[1.1]"
              style={{ fontSize: "clamp(30px,4.5vw,52px)" }}
            >
              Discover AI Startups<br />Building the Future
            </h1>
            <p className="text-[15px] text-[#717171] mb-8 leading-relaxed">
              The most comprehensive intelligence on AI companies,<br className="hidden sm:block"/>
              founders, funding, products and market trends.
            </p>

            <SearchBar />

            {/* Entity filter pills */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {ENTITY_TABS.map(t => (
                <a
                  key={t.label}
                  href={t.href}
                  className="flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[12px] font-medium border transition-all"
                  style={{
                    background:  t.active ? "#FEF0F0"  : "white",
                    color:       t.active ? "#FF5A5F"  : "#717171",
                    borderColor: t.active ? "#FFBABB"  : "#E5E5E5",
                  }}
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTENT SECTIONS ─────────────────────────────────────── */}
        <div className="px-6 lg:px-10 pb-20 space-y-12">

          {/* Explore by Category — strict CSS Grid, no scroll */}
          <section>
            <SectionHeader
              title="Explore by Category"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {CATEGORIES.map(c => <CategoryCard key={c.id} {...c}/>)}
            </div>
          </section>

          {/* Trending AI Startups */}
          <section>
            <SectionHeader
              title="Trending AI Startups"
              viewAllHref="/startups/all?sort=Trending"
              viewAllLabel="View all startups"
            />
            <HorizontalScroll>
              {TRENDING_ROW.map((s, i) => (
                <CompanyCard key={s.id} startup={s} rank={i + 1}/>
              ))}
            </HorizontalScroll>
          </section>

          {/* Featured Companies */}
          <section>
            <SectionHeader
              title="Featured Companies"
              viewAllHref="/startups/all?filter=featured"
              viewAllLabel="View all companies"
            />
            <HorizontalScroll>
              {FEATURED_ROW.map((s, i) => (
                <FeaturedCard key={s.id} startup={s} seed={i + 1}/>
              ))}
            </HorizontalScroll>
          </section>

          {/* Recently Funded */}
          <section>
            <SectionHeader
              title="Recently Funded"
              viewAllHref="/startups/all?sort=Most+Funded"
              viewAllLabel="View all"
            />
            <HorizontalScroll>
              {RECENTLY_FUNDED.map(e => <FundingCard key={e.id} entry={e}/>)}
            </HorizontalScroll>
          </section>

          {/* Fast Growing */}
          <section>
            <SectionHeader
              title="Fast Growing Companies"
              viewAllHref="/startups/all?sort=Fastest+Growing"
              viewAllLabel="View all"
            />
            <HorizontalScroll>
              {FAST_GROWING.map(e => <GrowthCard key={e.id} entry={e}/>)}
            </HorizontalScroll>
          </section>

          {/* Newly Added */}
          <section>
            <SectionHeader
              title="Newly Added Startups"
              viewAllHref="/startups/all?sort=Newest"
              viewAllLabel="View all"
            />
            <HorizontalScroll>
              {NEWLY_ADDED.map(e => <NewStartupCard key={e.id} entry={e}/>)}
            </HorizontalScroll>
          </section>

        </div>

        <Footer />
      </div>
    </div>
  );
}
