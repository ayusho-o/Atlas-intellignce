"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

// ── Types ─────────────────────────────────────────────────────────────────
interface JobRow {
  id: number;
  logo: string;
  logoBg: string;
  logoColor: string;
  logoText: string;
  role: string;
  company: string;
  location: string;
  stage: string;
  category: string;
  skills: string[];
  salary: string;
  equity?: string;
  postedAgo: string;
  badge?: "new" | "hot" | "remote";
  applyUrl: string;
  perks?: string[];
}

interface FeaturedJob {
  id: number;
  logo: string;
  logoBg: string;
  logoColor: string;
  logoText: string;
  role: string;
  company: string;
  location: string;
  category: string;
  skills: string[];
  workMode: string;
  stage: string;
  salary: string;
  equity?: string;
  badges: string[];
}

// ── Static data ───────────────────────────────────────────────────────────
const FEATURED_JOBS: FeaturedJob[] = [
  {
    id: 1, logo: "https://logo.clearbit.com/openai.com",
    logoBg: "#DCFCE7", logoColor: "#166534", logoText: "O",
    role: "Staff Machine Learning Engineer", company: "OpenAI", location: "San Francisco, CA",
    category: "AI Infrastructure", skills: ["PyTorch", "CUDA", "Distributed ML"],
    workMode: "Remote OK", stage: "Series D", salary: "$280k–$380k", equity: "+0.1%",
    badges: ["🔥 Hot", "Equity"],
  },
  {
    id: 2, logo: "https://logo.clearbit.com/anthropic.com",
    logoBg: "#FEE2E2", logoColor: "#991B1B", logoText: "A",
    role: "Research Engineer, Alignment", company: "Anthropic", location: "San Francisco, CA",
    category: "AI Safety", skills: ["RL", "Interpretability", "Python"],
    workMode: "Hybrid", stage: "Series C", salary: "$240k–$340k",
    badges: ["✨ New", "Featured"],
  },
  {
    id: 3, logo: "https://logo.clearbit.com/perplexity.ai",
    logoBg: "#EFF6FF", logoColor: "#1D4ED8", logoText: "P",
    role: "Senior Product Manager — AI Search", company: "Perplexity AI", location: "Remote",
    category: "AI Search", skills: ["Product", "Growth"],
    workMode: "Fully Remote", stage: "Series B", salary: "$180k–$240k",
    badges: ["🌐 Remote"],
  },
  {
    id: 4, logo: "https://logo.clearbit.com/mistral.ai",
    logoBg: "#F5F3FF", logoColor: "#5B21B6", logoText: "M",
    role: "AI Platform Engineer", company: "Mistral AI", location: "Paris, France",
    category: "LLM", skills: ["Kubernetes", "Go", "Rust"],
    workMode: "Hybrid", stage: "Series A", salary: "€130k–€180k", equity: "+0.05%",
    badges: ["Equity", "Urgent"],
  },
];

const ALL_JOBS: JobRow[] = [
  {
    id: 1, logo: "https://logo.clearbit.com/x.ai", logoBg: "#DCFCE7", logoColor: "#166534", logoText: "xA",
    role: "Senior AI Research Engineer — Language Models", company: "xAI", location: "Austin, TX",
    stage: "Series B", category: "AI Infrastructure", skills: ["Python", "JAX", "CUDA", "Distributed ML"],
    salary: "$260k–$360k", equity: "+ equity", postedAgo: "2h ago", badge: "new",
    applyUrl: "https://x.ai/careers",
    perks: ["Remote OK", "0.1% equity", "Visa sponsorship"],
  },
  {
    id: 2, logo: "https://logo.clearbit.com/elevenlabs.io", logoBg: "#FEF9C3", logoColor: "#854D0E", logoText: "EL",
    role: "Product Designer — AI Consumer Apps", company: "ElevenLabs", location: "Remote (Global)",
    stage: "Series B", category: "Generative AI", skills: ["Figma", "Design Systems", "Prototyping"],
    salary: "$130k–$180k", postedAgo: "4h ago", badge: "remote",
    applyUrl: "https://elevenlabs.io/careers",
    perks: ["Fully Remote", "Relocation", "$5k home office"],
  },
  {
    id: 3, logo: "https://logo.clearbit.com/runwayml.com", logoBg: "#EFF6FF", logoColor: "#1E40AF", logoText: "RM",
    role: "MLOps Engineer — Training Infrastructure", company: "Runway ML", location: "New York, NY",
    stage: "Series D", category: "AI Coding", skills: ["Docker", "AWS", "Kubernetes", "Terraform"],
    salary: "$160k–$220k", equity: "+ equity", postedAgo: "6h ago",
    applyUrl: "https://runwayml.com/careers",
    perks: ["Hybrid", "0.05% equity", "401k match"],
  },
  {
    id: 4, logo: "https://logo.clearbit.com/cohere.com", logoBg: "#FFF1F2", logoColor: "#9F1239", logoText: "CO",
    role: "Head of Growth — Enterprise Sales", company: "Cohere", location: "Toronto, Canada",
    stage: "Series C", category: "AI Sales", skills: ["B2B SaaS", "Hybrid", "Salesforce"],
    salary: "$190k–$260k", equity: "+ equity", postedAgo: "8h ago", badge: "hot",
    applyUrl: "https://cohere.com/careers",
    perks: ["Remote OK", "Uncapped commission", "Stock options"],
  },
  {
    id: 5, logo: "https://logo.clearbit.com/langchain.com", logoBg: "#F5F3FF", logoColor: "#5B21B6", logoText: "LC",
    role: "Applied AI Engineer — Agentic Systems", company: "LangChain", location: "Remote (US)",
    stage: "Series A", category: "AI Agents", skills: ["Python", "LLMs", "LangGraph", "Vector DBs"],
    salary: "$200k–$280k", equity: "+ equity", postedAgo: "10h ago", badge: "remote",
    applyUrl: "https://www.langchain.com/careers",
    perks: ["Fully Remote", "0.08% equity", "Unlimited PTO"],
  },
  {
    id: 6, logo: "https://logo.clearbit.com/hiddenlayer.com", logoBg: "#ECFDF5", logoColor: "#064E3B", logoText: "HL",
    role: "Security Engineer — AI Red Teaming", company: "HiddenLayer", location: "Remote (Global)",
    stage: "Series A", category: "AI Security", skills: ["Adversarial ML", "Red Team", "Python"],
    salary: "$150k–$210k", postedAgo: "14h ago", badge: "new",
    applyUrl: "https://hiddenlayer.com/careers",
    perks: ["Remote OK", "Visa sponsorship", "Conferences budget"],
  },
  {
    id: 7, logo: "https://logo.clearbit.com/together.ai", logoBg: "#FFFBEB", logoColor: "#78350F", logoText: "TA",
    role: "Technical Writer — API & Developer Docs", company: "Together AI", location: "San Francisco, CA",
    stage: "Series B", category: "AI Infrastructure", skills: ["Technical Writing", "Hybrid", "OpenAPI"],
    salary: "$120k–$160k", postedAgo: "1d ago",
    applyUrl: "https://www.together.ai/careers",
    perks: ["Hybrid", "Health + dental", "$2k learning budget"],
  },
  {
    id: 8, logo: "https://logo.clearbit.com/scale.com", logoBg: "#EFF6FF", logoColor: "#1E3A8A", logoText: "SC",
    role: "Frontend Engineer — AI Dashboard Infrastructure", company: "Scale AI", location: "San Francisco, CA",
    stage: "Late stage", category: "AI Data", skills: ["React", "TypeScript", "GraphQL"],
    salary: "$170k–$230k", equity: "+ equity", postedAgo: "1d ago",
    applyUrl: "https://scale.com/careers",
    perks: ["Hybrid", "0.05% equity", "Relocation"],
  },
  {
    id: 9, logo: "https://logo.clearbit.com/harvey.ai", logoBg: "#FDF4FF", logoColor: "#6B21A8", logoText: "HV",
    role: "AI Legal Engineer — Contract Intelligence", company: "Harvey AI", location: "New York / Remote",
    stage: "Series C", category: "Legal AI", skills: ["LLMs", "Python", "Fine-tuning"],
    salary: "$190k–$250k", equity: "+ equity", postedAgo: "1d ago", badge: "new",
    applyUrl: "https://harvey.ai/careers",
    perks: ["Remote OK", "0.07% equity", "Bar sponsorship"],
  },
  {
    id: 10, logo: "https://logo.clearbit.com/physicalintelligence.company", logoBg: "#ECFDF5", logoColor: "#14532D", logoText: "PI",
    role: "Robotics Software Engineer — Perception Stack", company: "Physical Intelligence", location: "San Francisco, CA",
    stage: "Series A", category: "Robotics", skills: ["C++", "ROS2", "CUDA", "Perception"],
    salary: "$220k–$300k", equity: "+ equity", postedAgo: "2d ago", badge: "hot",
    applyUrl: "https://www.physicalintelligence.company/careers",
    perks: ["On-site", "0.1% equity", "Visa sponsorship", "Relocation"],
  },
];

const CATEGORIES = [
  { label: "All Jobs", count: "12.4k", icon: "🌐" },
  { label: "AI Agents", count: "1.8k", icon: "🤖" },
  { label: "AI Coding", count: "2.1k", icon: "💻" },
  { label: "Infrastructure", count: "3.3k", icon: "🖥️" },
  { label: "AI Security", count: "620", icon: "🛡️" },
  { label: "Healthcare", count: "780", icon: "🩺" },
  { label: "AI Finance", count: "490", icon: "📈" },
  { label: "Robotics", count: "870", icon: "🦾" },
  { label: "Legal AI", count: "310", icon: "⚖️" },
  { label: "AI Marketing", count: "520", icon: "📣" },
];

const TOP_COMPANIES = [
  { name: "OpenAI", stage: "Series D", city: "San Francisco", roles: 48, color: "#10A37F", letter: "O" },
  { name: "Anthropic", stage: "Series C", city: "San Francisco", roles: 31, color: "#D92B2B", letter: "A" },
  { name: "Perplexity AI", stage: "Series B", city: "Remote", roles: 22, color: "#2563EB", letter: "P" },
  { name: "Mistral AI", stage: "Series A", city: "Paris", roles: 19, color: "#7C3AED", letter: "M" },
  { name: "Cohere", stage: "Series C", city: "Toronto", roles: 15, color: "#0E7490", letter: "C" },
  { name: "xAI", stage: "Series B", city: "Austin", roles: 12, color: "#D97706", letter: "X" },
];

const SALARY_BENCHMARKS = [
  { role: "ML Engineer", range: "$180–380k", pct: 90 },
  { role: "AI Researcher", range: "$200–340k", pct: 85 },
  { role: "AI Product Mgr", range: "$160–240k", pct: 65 },
  { role: "Data Scientist", range: "$140–220k", pct: 60 },
  { role: "AI Engineer", range: "$160–280k", pct: 75 },
];

const TRENDING_SKILLS = [
  { label: "Python", count: "4.2k jobs" }, { label: "PyTorch", count: "2.8k" },
  { label: "LangChain", count: "1.9k" }, { label: "CUDA", count: "1.4k" },
  { label: "Kubernetes", count: "2.1k" }, { label: "HuggingFace", count: "1.6k" },
  { label: "AWS", count: "3.1k" }, { label: "JAX", count: "820" },
  { label: "Docker", count: "2.4k" }, { label: "Rust", count: "680" },
];

const MARKET_PULSE = [
  { label: "AI Engineering roles", change: "+23%", up: true },
  { label: "Remote AI jobs", change: "+11%", up: true },
  { label: "Avg. time to hire", change: "18 days", up: false },
  { label: "New roles this week", change: "2,140", up: true },
  { label: "Seed stage hiring", change: "+34%", up: true },
];

const HIRING_NOW = [
  { name: "OpenAI", roles: 48, color: "#10A37F", letter: "O", url: "https://openai.com/careers" },
  { name: "Anthropic", roles: 31, color: "#D92B2B", letter: "A", url: "https://anthropic.com/careers" },
  { name: "Perplexity", roles: 22, color: "#2563EB", letter: "P", url: "https://perplexity.ai/careers" },
  { name: "Mistral AI", roles: 19, color: "#7C3AED", letter: "M", url: "https://mistral.ai/careers" },
  { name: "xAI", roles: 12, color: "#D97706", letter: "X", url: "https://x.ai/careers" },
  { name: "Cohere", roles: 15, color: "#0E7490", letter: "C", url: "https://cohere.com/careers" },
];

// ── Sub-components ────────────────────────────────────────────────────────

function BadgePill({ type }: { type: "new" | "hot" | "remote" }) {
  const styles = {
    new: "bg-green-100 text-green-800",
    hot: "bg-amber-100 text-amber-800",
    remote: "bg-blue-100 text-blue-800",
  };
  const labels = { new: "✨ New", hot: "🔥 Hot", remote: "🌐 Remote" };
  return (
    <span className={`text-[9.5px] font-semibold px-[7px] py-[2px] rounded-[5px] ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}

function CompanyLogo({ src, fallbackBg, fallbackColor, fallbackText, size = 40 }: {
  src: string; fallbackBg: string; fallbackColor: string; fallbackText: string; size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const sz = `${size}px`;
  if (failed) {
    return (
      <div style={{ width: sz, height: sz, background: fallbackBg, color: fallbackColor, borderRadius: 10, border: "1px solid rgba(0,0,0,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
        {fallbackText}
      </div>
    );
  }
  return (
    <img src={src} alt="" onError={() => setFailed(true)}
      style={{ width: sz, height: sz, borderRadius: 10, objectFit: "contain", border: "1px solid #EAECF0", flexShrink: 0 }} />
  );
}

function VizPanel() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 150); return () => clearTimeout(t); }, []);

  const bars = [
    { label: "AI Engineers", val: "3.8k", pct: 88, color: "linear-gradient(90deg,#D92B2B,#F87171)" },
    { label: "ML Research", val: "2.9k", pct: 72, color: "linear-gradient(90deg,#7C3AED,#A78BFA)" },
    { label: "Infra / DevOps", val: "2.4k", pct: 65, color: "linear-gradient(90deg,#2563EB,#60A5FA)" },
    { label: "Product / PM", val: "1.7k", pct: 48, color: "linear-gradient(90deg,#059669,#34D399)" },
    { label: "AI Safety", val: "0.9k", pct: 32, color: "linear-gradient(90deg,#D97706,#FCD34D)" },
  ];

  const rings = [
    { label: "Remote OK", pct: 88, color: "#D92B2B" },
    { label: "Equity offered", pct: 74, color: "#2563EB" },
    { label: "$150k+", pct: 61, color: "#059669" },
  ];

  const circ = 2 * Math.PI * 18;

  return (
    <div style={{ width: 268, flexShrink: 0, background: "#F8F9FB", border: "1px solid #EAECF0", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 14, marginBottom: 20, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".7px", color: "#98A2B3" }}>Market Pulse</span>
        <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 99, padding: "2px 8px" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} /> Live
        </span>
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {bars.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10.5, color: "#98A2B3", width: 76, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.label}</span>
            <div style={{ flex: 1, height: 6, background: "#EAECF0", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: b.color, width: animated ? `${b.pct}%` : "0%", transition: `width 1.2s cubic-bezier(.22,1,.36,1) ${i * 80}ms` }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#475467", width: 28, textAlign: "right", flexShrink: 0 }}>{b.val}</span>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10.5, color: "#98A2B3" }}>New roles this week</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "#16A34A" }}>↑ +18%</span>
        </div>
        <svg width="100%" height="40" viewBox="0 0 240 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D92B2B" stopOpacity=".3" />
              <stop offset="100%" stopColor="#D92B2B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,32 L20,28 L40,30 L60,22 L80,24 L100,16 L120,18 L140,10 L160,12 L180,6 L200,8 L220,4 L240,2 L240,40 L0,40 Z" fill="url(#sg)" />
          <path d="M0,32 L20,28 L40,30 L60,22 L80,24 L100,16 L120,18 L140,10 L160,12 L180,6 L200,8 L220,4 L240,2" fill="none" stroke="#D92B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Rings */}
      <div style={{ display: "flex", gap: 10, justifyContent: "space-around" }}>
        {rings.map((r, i) => {
          const offset = animated ? circ * (1 - r.pct / 100) : circ;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ position: "relative", width: 44, height: 44 }}>
                <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#EAECF0" strokeWidth="4" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke={r.color} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1) ${200 + i * 130}ms` }} />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#101828" }}>{r.pct}%</span>
              </div>
              <span style={{ fontSize: 9.5, color: "#98A2B3", textAlign: "center", maxWidth: 44, lineHeight: 1.3 }}>{r.label}</span>
            </div>
          );
        })}
      </div>

      {/* Live counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#101828", letterSpacing: "-.5px", lineHeight: 1 }}>12,418</div>
          <div style={{ fontSize: 10, color: "#98A2B3", marginTop: 2 }}>open roles right now</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", display: "flex", alignItems: "center", gap: 3 }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          +18%
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function JobsPage() {
  const [activeCat, setActiveCat] = useState("All Jobs");
  const [activeQpills, setActiveQpills] = useState<string[]>(["🌐 Remote only"]);
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [savedFeatured, setSavedFeatured] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState("Most recent");
  const [salMin, setSalMin] = useState(80);
  const [salMax, setSalMax] = useState(400);
  const [alertEmail, setAlertEmail] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Remote", "Full-time", "Series A–B"]);

  const removeFilter = (filter: string) => setActiveFilters(prev => prev.filter(f => f !== filter));
  const clearAllFilters = () => setActiveFilters([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("category");

  const toggleQpill = (label: string) =>
    setActiveQpills(prev => prev.includes(label) ? prev.filter(p => p !== label) : [...prev, label]);

  const toggleSaved = (id: number) =>
    setSavedJobs(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const toggleSavedFeatured = (id: number) =>
    setSavedFeatured(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const SIDEBAR_W = 250;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F8F9FB", minHeight: "100vh", color: "#101828", fontSize: 14, lineHeight: 1.5, WebkitFontSmoothing: "antialiased" as const }}>
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", zIndex: 99 }} />
      )}

      {/* ── Main content offset by sidebar ── */}
      <div style={{ marginLeft: SIDEBAR_W }}>

        {/* ── Top bar ── */}
        <header style={{ height: 60, background: "#fff", borderBottom: "1px solid #EAECF0", display: "flex", alignItems: "center", gap: 14, padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(s => !s)} className="jh-mob-menu"
            style={{ display: "none", width: 36, height: 36, borderRadius: 8, border: "1px solid #EAECF0", background: "#fff", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475467", flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#98A2B3" }}>
            <Link href="/" style={{ color: "#98A2B3", textDecoration: "none" }}>Home</Link>
            <span style={{ fontSize: 10, opacity: .5 }}>›</span>
            <span style={{ color: "#101828", fontWeight: 600 }}>Jobs</span>
          </div>
          <div style={{ flex: 1, maxWidth: 440, display: "flex", alignItems: "center", gap: 8, background: "#F8F9FB", border: "1px solid #EAECF0", borderRadius: 12, padding: "0 14px", height: 38 }}>
            <svg width="14" height="14" fill="none" stroke="#98A2B3" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="search" placeholder="Search roles, companies, skills…" style={{ border: "none", background: "transparent", fontSize: 13, color: "#101828", outline: "none", flex: 1, fontFamily: "inherit" }} />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #EAECF0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475467", position: "relative" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "#D92B2B", borderRadius: "50%", border: "1.5px solid #fff" }} />
            </button>
            <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #EAECF0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475467" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", color: "#475467", border: "1px solid #EAECF0", padding: "0 14px", height: 36, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Sign in</button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#D92B2B", color: "#fff", border: "none", padding: "0 16px", height: 36, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Post a job</button>
          </div>
        </header>

        {/* ── Hero banner ── */}
        <div style={{ background: "#fff", padding: "28px 28px 0", borderBottom: "1px solid #EAECF0", position: "relative", overflow: "hidden" }}>
          {/* BG decoration — radial gradients + dot-grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 30%,rgba(217,43,43,.05) 0%,transparent 45%),radial-gradient(circle at 10% 80%,rgba(124,58,237,.04) 0%,transparent 38%)", pointerEvents: "none" }} />
          <div className="jh-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 28, position: "relative", zIndex: 1 }}>
            {/* Left copy */}
            <div style={{ flex: 1, minWidth: 0, maxWidth: 600 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".8px", color: "#D92B2B", border: "1px solid #FECACA", borderRadius: 99, padding: "3px 10px", background: "#FEF2F2", marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, background: "#22C55E", borderRadius: "50%", animation: "pulse 2s infinite", display: "inline-block" }} />
                Live · Updated every 15 minutes
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.18, letterSpacing: "-.6px", color: "#101828", marginBottom: 8 }}>
                12,418 curated AI jobs —<br />zero noise, only <span style={{ color: "#D92B2B" }}>signal</span>
              </h1>
              <p style={{ fontSize: 12.5, color: "#475467", lineHeight: 1.6, marginBottom: 20, maxWidth: 480 }}>
                Hand-curated roles at AI-native startups from seed to Series D. Salary and equity always shown upfront. No ATS black holes.
              </p>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 18 }}>
                {[
                  { icon: "✅", label: "Curated, not scraped" },
                  { icon: "🔒", label: "Apply privately" },
                  { icon: "💲", label: "Salary always shown" },
                  { icon: "🚫", label: "No ATS black holes" },
                ].map((b) => (
                  <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, border: "1px solid #EAECF0", background: "#F8F9FB", fontSize: 11, fontWeight: 500, color: "#475467" }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>

              {/* Big search */}
              <div className="jh-big-search" style={{ display: "flex", alignItems: "center", background: "#F3F5F7", border: "1.5px solid #D1D5DB", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", flex: 1 }}>
                  <svg width="16" height="16" fill="none" stroke="#98A2B3" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input type="search" placeholder="Role, skill, or keyword…" style={{ border: "none", background: "transparent", fontSize: 13.5, color: "#101828", fontFamily: "inherit", outline: "none", width: "100%", padding: "13px 0" }} />
                </div>
                <div style={{ width: 1, height: 30, background: "#EAECF0", flexShrink: 0 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", flex: "0 0 180px" }}>
                  <svg width="14" height="14" fill="none" stroke="#98A2B3" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <input type="text" placeholder="Location or Remote" style={{ border: "none", background: "transparent", fontSize: 12.5, color: "#101828", fontFamily: "inherit", outline: "none", width: "100%", padding: "13px 0" }} />
                </div>
                <div style={{ width: 1, height: 30, background: "#EAECF0", flexShrink: 0 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", flex: "0 0 160px" }}>
                  <svg width="14" height="14" fill="none" stroke="#98A2B3" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  <select style={{ border: "none", background: "transparent", fontSize: 12.5, color: "#475467", fontFamily: "inherit", outline: "none", width: "100%", padding: "13px 0", cursor: "pointer", appearance: "none" }}>
                    <option value="">All categories</option>
                    {["AI Agents","AI Coding","AI Research","Infrastructure","AI Security","Healthcare AI","AI Finance","Robotics","Generative AI","Legal AI"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button style={{ background: "#D92B2B", color: "#fff", border: "none", padding: "0 22px", height: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Search jobs
                </button>
              </div>

              {/* Quick pills */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 0", flexWrap: "wrap" as const }}>
                <span style={{ fontSize: 11, color: "#98A2B3", fontWeight: 500, marginRight: 2 }}>Popular:</span>
                {["🌐 Remote only","🤖 AI Engineer","🔬 ML Research","📦 Seed stage","💰 $200k+","⚡ Series A–B","🛡️ AI Safety","🏗️ Infrastructure"].map(pill => (
                  <button key={pill} onClick={() => toggleQpill(pill)}
                    style={{ fontSize: 11.5, fontWeight: 500, padding: "4px 10px", borderRadius: 99, border: "1px solid", borderColor: activeQpills.includes(pill) ? "#D92B2B" : "#EAECF0", background: activeQpills.includes(pill) ? "#D92B2B" : "#F8F9FB", color: activeQpills.includes(pill) ? "#fff" : "#475467", cursor: "pointer", whiteSpace: "nowrap" as const, fontFamily: "inherit" }}>
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Right viz panel */}
            <div className="jh-hero-viz">
              <VizPanel />
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", borderTop: "1px solid #EAECF0", margin: "0 -28px", padding: "0 28px" }}>
            {[
              { icon: "💼", num: "12,418", label: "Open roles", delta: "+18% vs last month" },
              { icon: "🏢", num: "3,200+", label: "Companies hiring", delta: "+7% this week" },
              { icon: "🌐", num: "81%", label: "Remote-friendly", delta: "of all open roles" },
              { icon: "💵", num: "$340k", label: "Top salary", delta: "incl. equity" },
              { icon: "⏰", num: "247", label: "Posted today", delta: "+12 in last hour" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, padding: "12px 0", borderRight: "1px solid #EAECF0", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#F8F9FB", border: "1px solid #EAECF0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#101828", letterSpacing: "-.4px", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 10.5, color: "#98A2B3", marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 600, color: "#16A34A", marginTop: 2 }}>{s.delta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works strip ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF0", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          {[
            { step: 1, color: "#D92B2B", bg: "#FEF2F2", title: "Browse curated roles", sub: "Hand-picked, no scraped noise" },
            { step: 2, color: "#2563EB", bg: "#EFF6FF", title: "See salary & equity upfront", sub: "No surprises, always transparent" },
            { step: 3, color: "#059669", bg: "#ECFDF5", title: "Apply privately", sub: "Direct to founders, no ATS" },
            { step: 4, color: "#7C3AED", bg: "#F5F3FF", title: "Get job alerts", sub: "Matching roles in your inbox" },
          ].map((s, i) => (
            <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 24px", borderRight: i < 3 ? "1px solid #EAECF0" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.step}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#101828" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#98A2B3" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3-column body ── */}
        <div style={{ display: "flex", gap: 0, flex: 1, minWidth: 0, alignItems: "flex-start" }}>

          {/* ── Filter sidebar (desktop) ── */}
          <aside className="jh-filter-sidebar" style={{ width: 224, flexShrink: 0, padding: "18px 0 18px 24px", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingRight: 18 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#101828" }}>Filters</span>
              <button style={{ fontSize: 11.5, fontWeight: 500, color: "#D92B2B", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", padding: 0 }}>Clear all</button>
            </div>

            {/* Active tags */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginBottom: 14, paddingRight: 18 }}>
              {activeFilters.map(tag => (
                <div key={tag} onClick={() => removeFilter(tag)} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 99, background: "#FEF2F2", color: "#D92B2B", border: "1px solid #FECACA", cursor: "pointer", transition: "all .15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#FEE2E2"; (e.currentTarget as HTMLDivElement).style.borderColor = "#FCA5A5"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLDivElement).style.borderColor = "#FECACA"; }}>
                  {tag} <span style={{ fontSize: 13, lineHeight: 1, opacity: .7 }}>×</span>
                </div>
              ))}
              {activeFilters.length > 0 && (
                <button onClick={clearAllFilters} style={{ fontSize: 11, fontWeight: 500, color: "#98A2B3", background: "none", border: "none", cursor: "pointer", padding: "3px 4px", fontFamily: "inherit" }}>Clear all</button>
              )}
            </div>

            {/* Filter boxes */}
            {[
              {
                title: "Job category",
                items: [["All AI Jobs","12.4k",true],["AI Engineering","4.2k",false],["ML Research","1.9k",false],["AI Product","1.4k",false],["AI Design","680",false],["Data Science","2.1k",false],["MLOps / Infra","1.6k",false],["AI Sales / GTM","940",false]],
              },
              {
                title: "Work mode",
                items: [["Remote","9.9k",true],["Hybrid","2.8k",false],["On-site","1.2k",false]],
              },
              {
                title: "Job type",
                items: [["Full-time","8.2k",true],["Contract","2.4k",false],["Part-time","1.1k",false],["Internship","680",false]],
              },
              {
                title: "Experience level",
                items: [["Entry level","1.4k",false],["Mid-level","4.3k",true],["Senior","5.1k",true],["Staff / Principal","1.6k",false],["Director+","820",false]],
              },
              {
                title: "Company stage",
                items: [["Pre-seed / Seed","2.2k",false],["Series A–B","4.8k",true],["Series C+","3.1k",false],["Public / Post-IPO","2.3k",false]],
              },
              {
                title: "Region",
                items: [["Worldwide","9.1k",true],["North America","4.8k",false],["Europe","2.6k",false],["Asia-Pacific","1.7k",false],["India","960",false],["Latin America","420",false]],
              },
              {
                title: "Posted within",
                items: [["Last 24 hours","312",false],["Last 7 days","2.1k",true],["Last 30 days","6.4k",false],["Any time","12.4k",false]],
              },
            ].map(section => (
              <FilterSection key={section.title} title={section.title} items={section.items as [string, string, boolean][]} />
            ))}

            {/* Salary slider */}
            <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, overflow: "hidden", marginBottom: 10, marginRight: 18 }}>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".7px", color: "#98A2B3", marginBottom: 9 }}>Salary (USD / yr)</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#98A2B3", marginBottom: 6 }}>
                  <span>Min: <strong style={{ color: "#475467" }}>${salMin}k</strong></span>
                  <span>Max: <strong style={{ color: "#475467" }}>${salMax}k</strong></span>
                </div>
                <input type="range" min={40} max={400} value={salMin} onChange={e => setSalMin(+e.target.value)} style={{ width: "100%", accentColor: "#D92B2B" }} />
                <div style={{ marginTop: 6 }} />
                <input type="range" min={40} max={500} value={salMax} onChange={e => setSalMax(+e.target.value)} style={{ width: "100%", accentColor: "#D92B2B" }} />
              </div>
            </div>
          </aside>

          {/* ── Feed ── */}
          <main style={{ flex: 1, minWidth: 0, padding: "18px 24px 40px 16px" }}>

            {/* Hiring now strip */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, padding: "10px 14px", marginBottom: 14, overflow: "hidden" }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "#98A2B3", textTransform: "uppercase" as const, letterSpacing: ".6px", whiteSpace: "nowrap" as const }}>Hiring now</span>
              <div style={{ display: "flex", gap: 7, flex: 1, overflow: "hidden" }}>
                {HIRING_NOW.map(co => (
                  <a key={co.name} href={co.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 10px", borderRadius: 8, border: "1px solid #EAECF0", background: "#F8F9FB", cursor: "pointer", flexShrink: 0, textDecoration: "none" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, background: co.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{co.letter}</div>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#101828" }}>{co.name}</div>
                      <div style={{ fontSize: 10, color: "#98A2B3" }}>{co.roles} roles</div>
                    </div>
                  </a>
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#D92B2B", cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0 }}>View all →</span>
            </div>

            {/* Category tabs */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto" as const, marginBottom: 14, paddingBottom: 2, scrollbarWidth: "none" as const }}>
              {CATEGORIES.map(cat => {
                const isActive = activeCat === cat.label;
                return (
                  <button key={cat.label} onClick={() => setActiveCat(cat.label)}
                    style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 99, border: "1px solid", borderColor: isActive ? "#101828" : "#EAECF0", background: isActive ? "#101828" : "#fff", color: isActive ? "#fff" : "#475467", fontSize: 12.5, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" as const, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                    <span>{cat.icon}</span> {cat.label} <span style={{ opacity: .6, fontSize: 11 }}>{cat.count}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Filter bar with popover ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" as const, position: "relative" }}>

              {/* Filter trigger button */}
              <div style={{ position: "relative" }}>
                <button onClick={() => setFilterPopoverOpen(o => !o)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "0 14px", height: 36, borderRadius: 8, border: `1px solid ${filterPopoverOpen ? "#D92B2B" : "#EAECF0"}`, background: filterPopoverOpen ? "#FEF2F2" : "#fff", fontSize: 13, fontWeight: 500, color: filterPopoverOpen ? "#D92B2B" : "#475467", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const }}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  Filters
                  <span style={{ minWidth: 18, height: 18, borderRadius: 99, background: "#D92B2B", color: "#fff", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>5</span>
                </button>

                {/* Filter Popover Panel */}
                {filterPopoverOpen && (
                  <>
                    <div onClick={() => setFilterPopoverOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: 720, maxWidth: "95vw", background: "#fff", border: "1px solid #EAECF0", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.06)", zIndex: 200, overflow: "hidden" }}>
                      <div style={{ display: "flex", minHeight: 320 }}>
                        {/* Left category tabs */}
                        <div style={{ width: 150, flexShrink: 0, background: "#F8F9FB", borderRight: "1px solid #EAECF0", padding: "8px 0" }}>
                          {[
                            { id: "category", label: "Category", count: 1 },
                            { id: "workmode", label: "Work mode", count: 1 },
                            { id: "type", label: "Job type", count: 1 },
                            { id: "exp", label: "Experience", count: 0 },
                            { id: "salary", label: "Salary", count: 0 },
                            { id: "equity", label: "Equity", count: 0 },
                            { id: "stage", label: "Stage", count: 1 },
                            { id: "size", label: "Company size", count: 0 },
                            { id: "region", label: "Region", count: 1 },
                            { id: "posted", label: "Posted", count: 0 },
                          ].map(tab => (
                            <div key={tab.id} onClick={() => setActiveFilterTab(tab.id)}
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", fontSize: 12.5, fontWeight: activeFilterTab === tab.id ? 600 : 500, color: activeFilterTab === tab.id ? "#D92B2B" : "#475467", cursor: "pointer", borderLeft: `2px solid ${activeFilterTab === tab.id ? "#D92B2B" : "transparent"}`, background: activeFilterTab === tab.id ? "#fff" : "transparent", gap: 6 }}>
                              {tab.label}
                              {tab.count > 0 && <span style={{ fontSize: 10, color: activeFilterTab === tab.id ? "#D92B2B" : "#98A2B3", background: activeFilterTab === tab.id ? "#FEF2F2" : "#EAECF0", borderRadius: 99, padding: "1px 6px" }}>{tab.count}</span>}
                            </div>
                          ))}
                        </div>

                        {/* Right panel */}
                        <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto", maxHeight: 400 }}>
                          <PopoverFilterPanel activeTab={activeFilterTab} salMin={salMin} salMax={salMax} setSalMin={setSalMin} setSalMax={setSalMax} />
                        </div>
                      </div>
                      {/* Popover footer */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #EAECF0", background: "#F8F9FB" }}>
                        <div style={{ fontSize: 12.5, color: "#98A2B3" }}>Showing <strong style={{ color: "#101828" }}>12,418</strong> jobs</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setFilterPopoverOpen(false)} style={{ padding: "0 14px", height: 32, borderRadius: 8, border: "1px solid #EAECF0", background: "#fff", fontSize: 12.5, fontWeight: 500, color: "#475467", cursor: "pointer", fontFamily: "inherit" }}>Clear all</button>
                          <button onClick={() => setFilterPopoverOpen(false)} style={{ padding: "0 18px", height: 32, borderRadius: 8, background: "#D92B2B", color: "#fff", border: "none", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Apply filters</button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Feed count */}
              <div style={{ fontSize: 13, fontWeight: 600, color: "#101828", flex: 1 }}>
                12,418 jobs <span style={{ color: "#98A2B3", fontWeight: 400, fontSize: 12 }}>· Updated 3 min ago</span>
              </div>

              {/* Mobile filter drawer trigger */}
              <button onClick={() => setFilterDrawerOpen(true)} className="jh-filter-btn"
                style={{ display: "none", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, border: "1px solid #EAECF0", background: "#fff", fontSize: 12, color: "#475467", cursor: "pointer", fontFamily: "inherit" }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                Filters
              </button>

              {/* List / Grid toggle */}
              <div style={{ display: "flex", border: "1px solid #EAECF0", borderRadius: 8, overflow: "hidden" }}>
                <button onClick={() => setViewMode("list")}
                  style={{ padding: "5px 10px", background: viewMode === "list" ? "#101828" : "#fff", color: viewMode === "list" ? "#fff" : "#98A2B3", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="List view">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <button onClick={() => setViewMode("grid")}
                  style={{ padding: "5px 10px", background: viewMode === "grid" ? "#101828" : "#fff", color: viewMode === "grid" ? "#fff" : "#98A2B3", border: "none", borderLeft: "1px solid #EAECF0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Grid view">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, color: "#98A2B3" }}>Sort:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid #EAECF0", fontSize: 12, fontFamily: "inherit", color: "#475467", background: "#fff", outline: "none", cursor: "pointer" }}>
                  {["Most recent","Best match","Highest salary","Most equity","Company stage"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 12, alignItems: "center" }}>
                {activeFilters.map(chip => (
                  <span key={chip} onClick={() => removeFilter(chip)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 500, padding: "4px 10px", borderRadius: 99, background: "#FEF2F2", color: "#D92B2B", border: "1px solid #FECACA", cursor: "pointer", transition: "all .15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.background = "#FEE2E2"; (e.currentTarget as HTMLSpanElement).style.borderColor = "#FCA5A5"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLSpanElement).style.borderColor = "#FECACA"; }}>
                    {chip}
                    <span style={{ fontSize: 13, lineHeight: 1, opacity: .7 }}>×</span>
                  </span>
                ))}
                <button onClick={clearAllFilters} style={{ fontSize: 11.5, fontWeight: 500, color: "#98A2B3", background: "none", border: "none", cursor: "pointer", padding: "4px 6px", fontFamily: "inherit" }}>Clear all</button>
              </div>
            )}

            {/* Alert inline banner */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
              <svg width="18" height="18" fill="none" stroke="#2563EB" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E40AF", marginBottom: 1 }}>Save this search</div>
                <div style={{ fontSize: 11.5, color: "#3B82F6" }}>Get notified when new AI Engineering roles in Remote are posted.</div>
              </div>
              <button style={{ background: "#2563EB", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const, flexShrink: 0 }}>Create alert</button>
              <button style={{ color: "#98A2B3", background: "none", border: "none", cursor: "pointer", fontSize: 16, flexShrink: 0, padding: 0 }}>×</button>
            </div>

            {/* ── Featured roles ── */}
            <SectionLabel text="Featured roles" />
            <div className="jh-featured-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              {FEATURED_JOBS.map(job => (
                <div key={job.id} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, padding: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(16,24,40,.08)"; (e.currentTarget as HTMLDivElement).style.borderColor = "#D0D5DD"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "#EAECF0"; }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 11 }}>
                    <CompanyLogo src={job.logo} fallbackBg={job.logoBg} fallbackColor={job.logoColor} fallbackText={job.logoText} size={38} />
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const, justifyContent: "flex-end" }}>
                      {job.badges.map(b => (
                        <span key={b} style={{ fontSize: 9.5, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: b.includes("Hot") ? "#FEF3C7" : b.includes("New") ? "#DCFCE7" : b.includes("Remote") ? "#EFF6FF" : b.includes("Feat") ? "#FEF2F2" : "#F5F3FF", color: b.includes("Hot") ? "#92400E" : b.includes("New") ? "#14532D" : b.includes("Remote") ? "#1E40AF" : b.includes("Feat") ? "#D92B2B" : "#4C1D95" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#101828", marginBottom: 3, letterSpacing: "-.2px" }}>{job.role}</div>
                  <div style={{ fontSize: 12, color: "#98A2B3", fontWeight: 500, marginBottom: 9 }}>🏢 {job.company} · {job.location}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: 10 }}>
                    <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 20, fontWeight: 500, background: "#FEF2F2", color: "#D92B2B" }}>{job.category}</span>
                    {job.skills.map(s => <span key={s} style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 20, fontWeight: 500, background: "#F8F9FB", color: "#475467" }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 10, borderTop: "1px solid #EAECF0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#98A2B3" }}>🌐 {job.workMode}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#98A2B3" }}>⭐ {job.stage}</span>
                    <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700, color: "#101828", letterSpacing: "-.3px" }}>{job.salary}</span>
                    {job.equity && <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED" }}>{job.equity}</span>}
                    <button onClick={() => toggleSavedFeatured(job.id)}
                      style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid", borderColor: savedFeatured.has(job.id) ? "#D92B2B" : "#EAECF0", background: savedFeatured.has(job.id) ? "#FEF2F2" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: savedFeatured.has(job.id) ? "#D92B2B" : "#98A2B3", fontSize: 13, cursor: "pointer" }}>
                      {savedFeatured.has(job.id) ? "🔖" : "🏷️"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── All open roles ── */}
            <SectionLabel text="All open roles" />
            {viewMode === "grid" ? (
              <div id="jobListView" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                {ALL_JOBS.map(job => (
                  <div key={job.id} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, padding: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(16,24,40,.08)"; (e.currentTarget as HTMLDivElement).style.borderColor = "#D0D5DD"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "#EAECF0"; }}>
                    {job.badge === "new" && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#D92B2B", borderRadius: "3px 0 0 3px" }} />}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <CompanyLogo src={job.logo} fallbackBg={job.logoBg} fallbackColor={job.logoColor} fallbackText={job.logoText} size={36} />
                      {job.badge && <BadgePill type={job.badge} />}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#101828", marginBottom: 3, letterSpacing: "-.2px" }}>{job.role}</div>
                    <div style={{ fontSize: 11.5, color: "#98A2B3", fontWeight: 500, marginBottom: 8 }}>🏢 {job.company} · 📍 {job.location}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: 8 }}>
                      <span style={{ fontSize: 10.5, background: "#FEF2F2", color: "#D92B2B", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{job.category}</span>
                      {job.skills.map(s => <span key={s} style={{ fontSize: 10.5, background: "#EFF6FF", color: "#1E40AF", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{s}</span>)}
                    </div>
                    {job.perks && (
                      <div className="jr-perks" style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: 8 }}>
                        {job.perks.map(p => (
                          <span key={p} style={{ fontSize: 10, background: "#F0FDF4", color: "#166534", padding: "2px 7px", borderRadius: 20, fontWeight: 500, border: "1px solid #BBF7D0" }}>{p}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 9, borderTop: "1px solid #EAECF0" }}>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#101828" }}>{job.salary}</div>
                        {job.equity && <div style={{ fontSize: 11, fontWeight: 500, color: "#7C3AED" }}>{job.equity}</div>}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#D92B2B", color: "#fff", padding: "0 12px", height: 30, borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                          Apply ↗
                        </a>
                        <button onClick={() => toggleSaved(job.id)}
                          style={{ height: 30, padding: "0 8px", borderRadius: 8, border: "1px solid", borderColor: savedJobs.has(job.id) ? "#D92B2B" : "#EAECF0", background: savedJobs.has(job.id) ? "#FEF2F2" : "#fff", fontSize: 12, color: savedJobs.has(job.id) ? "#D92B2B" : "#475467", cursor: "pointer", fontFamily: "inherit" }}>
                          {savedJobs.has(job.id) ? "🔖" : "🏷️"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <div id="jobListView" style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
              {ALL_JOBS.map((job, idx) => (
                <div key={job.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderBottom: idx < ALL_JOBS.length - 1 ? "1px solid #EAECF0" : "none", cursor: "pointer", position: "relative", transition: "background .1s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#FAFBFC"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>
                  {job.badge === "new" && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 32, background: "#D92B2B", borderRadius: "0 3px 3px 0" }} />}
                  <CompanyLogo src={job.logo} fallbackBg={job.logoBg} fallbackColor={job.logoColor} fallbackText={job.logoText} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 3 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#101828", letterSpacing: "-.2px", flex: 1 }}>{job.role}</div>
                      {job.badge && <BadgePill type={job.badge} />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: "#98A2B3", fontWeight: 500 }}>{job.company}</span>
                      <span style={{ width: 3, height: 3, background: "#D0D5DD", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#98A2B3" }}>📍 {job.location}</span>
                      <span style={{ width: 3, height: 3, background: "#D0D5DD", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#98A2B3", background: "#F8F9FB", padding: "1px 7px", borderRadius: 20 }}>{job.stage}</span>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginBottom: job.perks ? 6 : 0 }}>
                      <span style={{ fontSize: 10.5, background: "#FEF2F2", color: "#D92B2B", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{job.category}</span>
                      {job.skills.map(s => <span key={s} style={{ fontSize: 10.5, background: "#EFF6FF", color: "#1E40AF", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{s}</span>)}
                    </div>
                    {job.perks && (
                      <div className="jr-perks" style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, marginTop: 4 }}>
                        {job.perks.map(p => (
                          <span key={p} style={{ fontSize: 10, background: "#F0FDF4", color: "#166534", padding: "2px 7px", borderRadius: 20, fontWeight: 500, border: "1px solid #BBF7D0" }}>{p}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 6, minWidth: 110 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#101828", letterSpacing: "-.3px" }}>{job.salary}</div>
                    {job.equity && <div style={{ fontSize: 11, fontWeight: 500, color: "#7C3AED" }}>{job.equity}</div>}
                    <div style={{ fontSize: 11, color: "#98A2B3" }}>{job.postedAgo}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, flexShrink: 0 }}>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#D92B2B", color: "#fff", padding: "0 14px", height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const }}>
                      Apply ↗
                    </a>
                    <button onClick={() => toggleSaved(job.id)}
                      style={{ height: 32, padding: "0 10px", borderRadius: 8, border: "1px solid", borderColor: savedJobs.has(job.id) ? "#D92B2B" : "#EAECF0", background: savedJobs.has(job.id) ? "#FEF2F2" : "#fff", fontSize: 11.5, fontWeight: 500, color: savedJobs.has(job.id) ? "#D92B2B" : "#475467", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                      {savedJobs.has(job.id) ? "🔖 Saved" : "🏷️ Save"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}

            <div style={{ textAlign: "center", padding: "18px 0" }}>
              <button style={{ padding: "9px 28px", border: "1px solid #EAECF0", borderRadius: 8, background: "#fff", fontSize: 13, color: "#475467", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                Load 20 more roles
              </button>
            </div>

            {/* ── Cross-links ── */}
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #EAECF0" }}>
              <SectionLabel text="Explore Atlas Intelligence" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: "🚀", title: "AI Startups", count: "25,000+ companies", href: "/startups" },
                  { icon: "👥", title: "Founders", count: "100,000+ profiles", href: "/founders" },
                  { icon: "💰", title: "Investors", count: "8,400+ investors", href: "/investors" },
                  { icon: "📊", title: "Funding Rounds", count: "$48.2B tracked", href: "/funding" },
                  { icon: "🗺️", title: "Market Maps", count: "340 landscapes", href: "/market-maps" },
                  { icon: "📋", title: "Research Reports", count: "92 reports", href: "#" },
                ].map(item => (
                  <Link key={item.title} href={item.href}
                    style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, padding: 14, cursor: "pointer", textDecoration: "none", display: "block" }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#101828", marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: "#98A2B3" }}>{item.count}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Post a job CTA ── */}
            <div style={{ marginTop: 20, background: "linear-gradient(135deg,#0C0A0F,#1a0810)", borderRadius: 16, padding: "24px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%,rgba(217,43,43,.15) 0%,transparent 55%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" as const }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".8px", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>For founders & recruiters</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-.4px", marginBottom: 6 }}>Reach 50,000+ AI talent monthly</div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.4)", lineHeight: 1.6, maxWidth: 380 }}>Post your role to the most curated AI job board. Salary and equity shown upfront. Direct applications, no ATS middleman.</div>
                  <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" as const }}>
                    {["No ATS fees", "Salary & equity shown", "Direct to founders"].map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "rgba(255,255,255,.4)" }}>✅ {f}</div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, flexShrink: 0 }}>
                  <button style={{ background: "#D92B2B", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const }}>
                    + Post a job — Free
                  </button>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", textAlign: "center" as const }}>No credit card required</div>
                </div>
              </div>
            </div>
          </main>

          {/* ── Right rail ── */}
          <aside className="jh-right-rail" style={{ width: 268, flexShrink: 0, padding: "18px 24px 18px 0" }}>

            {/* Alert widget */}
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>🔔</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#7F1D1D", marginBottom: 4 }}>Get job alerts</div>
              <div style={{ fontSize: 11.5, color: "#9B2C2C", lineHeight: 1.5, marginBottom: 10 }}>We&apos;ll email you the moment a role matching your filters is posted.</div>
              <input value={alertEmail} onChange={e => setAlertEmail(e.target.value)} type="email" placeholder="your@email.com"
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #FECACA", borderRadius: 8, fontSize: 12, fontFamily: "inherit", outline: "none", background: "#fff", color: "#101828", marginBottom: 6 }} />
              <button style={{ width: "100%", background: "#D92B2B", color: "#fff", border: "none", padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Create free alert</button>
            </div>

            {/* Top companies */}
            <RailCard title="🏢 Top companies hiring" linkText="View all">
              {TOP_COMPANIES.map(co => (
                <div key={co.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: "1px solid #EAECF0", cursor: "pointer" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: co.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{co.letter}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#101828", marginBottom: 1 }}>{co.name}</div>
                    <div style={{ fontSize: 11, color: "#98A2B3" }}>{co.stage} · {co.city}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#D92B2B", flexShrink: 0 }}>{co.roles} roles</span>
                </div>
              ))}
            </RailCard>

            {/* Salary benchmarks */}
            <RailCard title="💵 Salary benchmarks">
              {SALARY_BENCHMARKS.map(s => (
                <div key={s.role} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", borderBottom: "1px solid #EAECF0" }}>
                  <div style={{ fontSize: 12, color: "#475467", fontWeight: 500 }}>{s.role}</div>
                  <div style={{ flex: 1, height: 4, background: "#F8F9FB", borderRadius: 99, margin: "0 10px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg,#D92B2B,#F87171)", borderRadius: 99, width: `${s.pct}%` }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#101828" }}>{s.range}</div>
                </div>
              ))}
            </RailCard>

            {/* Trending skills */}
            <RailCard title="📈 Trending skills">
              <div style={{ padding: "12px 14px", display: "flex", flexWrap: "wrap" as const, gap: "0 0" }}>
                {TRENDING_SKILLS.map(s => (
                  <button key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, border: "1px solid #EAECF0", background: "#F8F9FB", fontSize: 11.5, color: "#475467", cursor: "pointer", fontWeight: 500, margin: "0 4px 6px 0", fontFamily: "inherit" }}>
                    {s.label} <span style={{ fontSize: 10, color: "#98A2B3", marginLeft: 2 }}>{s.count}</span>
                  </button>
                ))}
              </div>
            </RailCard>

            {/* Market pulse */}
            <RailCard title="⚡ Hiring market pulse">
              {MARKET_PULSE.map(m => (
                <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid #EAECF0" }}>
                  <div style={{ fontSize: 12, color: "#475467", flex: 1, fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: m.up ? "#059669" : "#D92B2B", display: "flex", alignItems: "center", gap: 3 }}>
                    {m.up ? "↑" : "↓"} {m.change}
                  </div>
                </div>
              ))}
            </RailCard>

          </aside>
        </div>

        {/* ── Footer ── */}
        <footer style={{ background: "#0C0A0F", borderTop: "1px solid rgba(255,255,255,.07)" }}>

          {/* Footer mid-strip — stats + trust badges */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,.07)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 12 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const }}>
              {[
                { num: "12,418", label: "open roles" },
                { num: "25,000+", label: "startups" },
                { num: "$48.2B", label: "funding tracked" },
                { num: "Updated", label: "every 15 min" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.num}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {["SOC2", "GDPR", "4.9 ★"].map(b => (
                <span key={b} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 99, border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.4)", background: "rgba(255,255,255,.04)" }}>{b}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 40, padding: "36px 24px 28px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, background: "#D92B2B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>AI</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Atlas Intelligence</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>The Bloomberg for AI</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", lineHeight: 1.65, marginBottom: 16, maxWidth: 200 }}>The authoritative knowledge graph for the global AI ecosystem — startups, founders, investors, products, and jobs in one place.</p>
              {/* Social icons */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { label: "X", href: "https://x.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                  { label: "GitHub", href: "https://github.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
                  { label: "Discord", href: "https://discord.com", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.028.05a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg> },
                  { label: "RSS", href: "#", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.4)", textDecoration: "none", flexShrink: 0 }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 16 }}>
                {[
                  { heading: "Jobs", links: ["All open roles","Remote jobs","AI Engineering","ML Research",null] },
                  { heading: "Explore", links: ["Startups","Founders","Investors","Funding rounds","Market Maps"] },
                  { heading: "Categories", links: ["AI Agents","Infrastructure","AI Security","Healthcare AI","Legal AI"] },
                  { heading: "Company", links: ["About us","Blog","Careers","API access","Contact"] },
                ].map(col => (
                  <div key={col.heading}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".7px", color: "rgba(255,255,255,.3)", marginBottom: 12 }}>{col.heading}</div>
                    {col.links.map(l => l === null ? (
                      <div key="post-a-job" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 8, cursor: "pointer" }}>
                        Post a job
                        <span style={{ fontSize: 9.5, fontWeight: 700, background: "#D92B2B", color: "#fff", padding: "1px 5px", borderRadius: 4, lineHeight: 1.4 }}>free</span>
                      </div>
                    ) : (
                      <div key={l} style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginBottom: 8, cursor: "pointer" }}>{l}</div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 }}>The AI Intelligence Digest</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.35)", marginBottom: 10 }}>Weekly briefing on funding, launches, and hiring signals.</div>
                <div style={{ display: "flex", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, overflow: "hidden" }}>
                  <input type="email" placeholder="Enter your email address" style={{ flex: 1, padding: "8px 12px", background: "rgba(255,255,255,.06)", border: "none", fontSize: 12, color: "#fff", fontFamily: "inherit", outline: "none" }} />
                  <button style={{ background: "#D92B2B", color: "#fff", border: "none", padding: "0 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const }}>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", flexWrap: "wrap" as const, gap: 8, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.22)" }}>© 2025 Atlas Intelligence. All rights reserved.</div>
            <nav style={{ display: "flex", gap: 16 }}>
              {["Privacy","Terms","Cookies","Data sources","Sitemap"].map(l => (
                <a key={l} href="#" style={{ fontSize: 11, color: "rgba(255,255,255,.28)", textDecoration: "none" }}>{l}</a>
              ))}
            </nav>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1) }
          50% { opacity:.4; transform:scale(.65) }
        }
        ::-webkit-scrollbar { width: 3px }
        ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #D0D5DD; border-radius: 99px }

        /* Fix #13 — dot-grid hero background */
        .jh-grid {
          background-image: radial-gradient(circle, rgba(16,24,40,.07) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: .6;
        }

        /* Fix #12 — big search focus-within */
        .jh-big-search:focus-within {
          border-color: #D92B2B !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(217,43,43,.12), 0 2px 8px rgba(0,0,0,.06) !important;
        }

        /* Filter card hover */
        .jh-filter-card:hover {
          border-color: #D0D5DD !important;
          box-shadow: 0 2px 8px rgba(16,24,40,.04) !important;
        }

        /* Smooth scrollbar for filter sidebar */
        .jh-filter-sidebar::-webkit-scrollbar { width: 4px; }
        .jh-filter-sidebar::-webkit-scrollbar-track { background: transparent; }
        .jh-filter-sidebar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 99px; }
        .jh-filter-sidebar:hover::-webkit-scrollbar-thumb { background: #D0D5DD; }

        /* Fix #5 — mobile responsiveness */
        @media (max-width: 1024px) {
          .jh-right-rail { display: none !important; }
        }
        @media (max-width: 768px) {
          .jh-filter-sidebar { display: none !important; }
          .jh-filter-btn { display: flex !important; }
          .jh-right-rail { display: none !important; }
          .jh-hero-viz { display: none !important; }
        }
        @media (max-width: 640px) {
          .jh-featured-grid { grid-template-columns: 1fr !important; }
          .jh-cross-links-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Fix #11 — Mobile filter drawer */}
      {filterDrawerOpen && (
        <>
          <div onClick={() => setFilterDrawerOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(16,24,40,.5)", zIndex: 200, backdropFilter: "blur(3px)", transition: "opacity .2s" }} />
          <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 320, background: "#fff", zIndex: 201, overflowY: "auto", boxShadow: "8px 0 32px rgba(16,24,40,.15)", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #EAECF0", flexShrink: 0, position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" fill="none" stroke="#101828" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>Filters</span>
              </div>
              <button onClick={() => setFilterDrawerOpen(false)}
                style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #EAECF0", background: "#F8F9FB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475467", fontSize: 18 }}>×</button>
            </div>

            {/* Active filter pills */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #EAECF0", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {activeFilters.map(tag => (
                <div key={tag} onClick={() => removeFilter(tag)} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 500, padding: "4px 10px", borderRadius: 99, background: "#FEF2F2", color: "#D92B2B", border: "1px solid #FECACA", cursor: "pointer", transition: "all .15s" }}>
                  {tag} <span style={{ fontSize: 13, lineHeight: 1, opacity: .7 }}>×</span>
                </div>
              ))}
              {activeFilters.length === 0 && (
                <span style={{ fontSize: 12, color: "#98A2B3" }}>No active filters</span>
              )}
            </div>

            {/* Filter sections */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
              {[
                { title: "Job category", items: [["All AI Jobs","12.4k",true],["AI Engineering","4.2k",false],["ML Research","1.9k",false],["AI Product","1.4k",false],["Data Science","2.1k",false],["MLOps / Infra","1.6k",false]] as [string,string,boolean][] },
                { title: "Work mode", items: [["Remote","9.9k",true],["Hybrid","2.8k",false],["On-site","1.2k",false]] as [string,string,boolean][] },
                { title: "Job type", items: [["Full-time","8.2k",true],["Contract","2.4k",false],["Part-time","1.1k",false],["Internship","680",false]] as [string,string,boolean][] },
                { title: "Experience level", items: [["Entry level","1.4k",false],["Mid-level","4.3k",true],["Senior","5.1k",true],["Staff / Principal","1.6k",false]] as [string,string,boolean][] },
                { title: "Company stage", items: [["Pre-seed / Seed","2.2k",false],["Series A–B","4.8k",true],["Series C+","3.1k",false]] as [string,string,boolean][] },
              ].map(section => (
                <FilterSection key={section.title} title={section.title} items={section.items} />
              ))}
            </div>

            {/* Sticky footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #EAECF0", background: "#fff", flexShrink: 0, display: "flex", gap: 10 }}>
              <button
                style={{ flex: 1, background: "#F8F9FB", color: "#475467", border: "1px solid #EAECF0", padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                Clear all
              </button>
              <button onClick={() => setFilterDrawerOpen(false)}
                style={{ flex: 2, background: "#D92B2B", color: "#fff", border: "none", padding: "11px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Show 12,418 jobs
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Tiny helper components ────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".6px", color: "#98A2B3", marginBottom: 10 }}>
      {text}
      <div style={{ flex: 1, height: 1, background: "#EAECF0" }} />
    </div>
  );
}

function FilterSection({ title, items }: { title: string; items: [string, string, boolean][] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set(items.filter(i => i[2]).map(i => i[0])));
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const toggle = (label: string) => setChecked(prev => { const s = new Set(prev); s.has(label) ? s.delete(label) : s.add(label); return s; });

  const activeCount = checked.size;

  return (
    <div className="jh-filter-card" style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, overflow: "hidden", marginBottom: 10, marginRight: 18, transition: "border-color .2s, box-shadow .2s" }}>
      {/* Collapsible header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", cursor: "pointer", background: "transparent", border: "none", borderBottom: collapsed ? "none" : "1px solid #EAECF0", fontFamily: "inherit" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: "#475467" }}>{title}</span>
          {activeCount > 0 && (
            <span style={{ fontSize: 9.5, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 99, background: "#D92B2B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>
              {activeCount}
            </span>
          )}
        </div>
        <svg
          width="12" height="12" fill="none" stroke="#98A2B3" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform .2s ease", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible body with animation */}
      <div style={{ maxHeight: collapsed ? 0 : 500, overflow: "hidden", transition: "max-height .3s cubic-bezier(.4,0,.2,1)", opacity: collapsed ? 0 : 1 }}>
        <div style={{ padding: "6px 14px 12px" }}>
          {items.map(([label, count]) => {
            const isChecked = checked.has(label);
            const isHovered = hoveredItem === label;
            return (
              <div
                key={label}
                onClick={() => toggle(label)}
                onMouseEnter={() => setHoveredItem(label)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 2,
                  cursor: "pointer", borderRadius: 8,
                  background: isHovered ? (isChecked ? "#FEF2F2" : "#F8F9FB") : "transparent",
                  transition: "background .15s ease",
                }}
              >
                {/* Animated checkbox */}
                <div style={{
                  width: 16, height: 16, borderRadius: 5, flexShrink: 0,
                  border: `1.5px solid ${isChecked ? "#D92B2B" : isHovered ? "#98A2B3" : "#D0D5DD"}`,
                  background: isChecked ? "#D92B2B" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .15s ease",
                  boxShadow: isChecked ? "0 1px 3px rgba(217,43,43,.25)" : "none",
                }}>
                  {isChecked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <polyline points="2,5 4,7 8,3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 12.5, color: isChecked ? "#101828" : "#475467", flex: 1, fontWeight: isChecked ? 600 : 400, transition: "color .15s" }}>{label}</span>
                <span style={{ fontSize: 10.5, color: isChecked ? "#D92B2B" : "#98A2B3", background: isChecked ? "#FEF2F2" : "#F8F9FB", padding: "2px 7px", borderRadius: 20, fontWeight: 500, transition: "all .15s" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Popover Filter Panel (interactive checkboxes) ─────────────────────────
const POPOVER_FILTER_DATA: Record<string, { heading: string; items: [string, string, boolean][] }> = {
  category: { heading: "Job Category", items: [["All AI Jobs","12.4k",true],["AI Engineering","4.2k",false],["ML Research","1.9k",false],["AI Product","1.4k",false],["AI Design","680",false],["Data Science","2.1k",false],["MLOps / Infra","1.6k",false],["AI Sales / GTM","940",false]] },
  workmode: { heading: "Work Mode", items: [["Remote","9.9k",true],["Hybrid","2.8k",false],["On-site","1.2k",false]] },
  type: { heading: "Job Type", items: [["Full-time","8.2k",true],["Contract","2.4k",false],["Part-time","1.1k",false],["Internship","680",false]] },
  exp: { heading: "Experience Level", items: [["Entry level","1.4k",false],["Mid-level","4.3k",true],["Senior","5.1k",true],["Staff / Principal","1.6k",false],["Director+","820",false]] },
  equity: { heading: "Equity", items: [["Any equity","6.4k",false],["0.1% – 0.5%","3.1k",false],["0.5%+","880",false]] },
  stage: { heading: "Company Stage", items: [["Pre-seed / Seed","2.2k",false],["Series A–B","4.8k",true],["Series C+","3.1k",false],["Public / Post-IPO","2.3k",false]] },
  size: { heading: "Company Size", items: [["1–10","980",false],["11–50","2.4k",false],["51–200","3.8k",false],["201–1000","3.1k",false],["1000+","2.1k",false]] },
  region: { heading: "Region", items: [["Worldwide","9.1k",true],["North America","4.8k",false],["Europe","2.6k",false],["Asia-Pacific","1.7k",false],["India","960",false],["Latin America","420",false]] },
  posted: { heading: "Posted Within", items: [["Last 24 hours","312",false],["Last 7 days","2.1k",true],["Last 30 days","6.4k",false],["Any time","12.4k",false]] },
};

function PopoverFilterPanel({ activeTab, salMin, salMax, setSalMin, setSalMax }: { activeTab: string; salMin: number; salMax: number; setSalMin: (v: number) => void; setSalMax: (v: number) => void }) {
  // Each tab has its own checked state
  const [checkedMap, setCheckedMap] = useState<Record<string, Set<string>>>(() => {
    const map: Record<string, Set<string>> = {};
    Object.entries(POPOVER_FILTER_DATA).forEach(([key, { items }]) => {
      map[key] = new Set(items.filter(i => i[2]).map(i => i[0]));
    });
    return map;
  });

  const toggleItem = (tab: string, label: string) => {
    setCheckedMap(prev => {
      const updated = { ...prev };
      const s = new Set(updated[tab]);
      s.has(label) ? s.delete(label) : s.add(label);
      updated[tab] = s;
      return updated;
    });
  };

  if (activeTab === "salary") {
    return (
      <>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: "#98A2B3", marginBottom: 10 }}>Salary Range (USD/yr)</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475467", marginBottom: 8, fontWeight: 500 }}>
          <span>Min: <strong style={{ color: "#D92B2B" }}>${salMin}k</strong></span>
          <span>Max: <strong style={{ color: "#D92B2B" }}>${salMax}k</strong></span>
        </div>
        <input type="range" min={40} max={400} value={salMin} onChange={e => setSalMin(+e.target.value)} style={{ width: "100%", accentColor: "#D92B2B", marginBottom: 8 }} />
        <input type="range" min={40} max={500} value={salMax} onChange={e => setSalMax(+e.target.value)} style={{ width: "100%", accentColor: "#D92B2B" }} />
      </>
    );
  }

  const data = POPOVER_FILTER_DATA[activeTab];
  if (!data) return null;
  const checked = checkedMap[activeTab] || new Set();

  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: "#98A2B3", marginBottom: 10 }}>{data.heading}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px" }}>
        {data.items.map(([label, count]) => {
          const isOn = checked.has(label);
          return (
            <div key={label} onClick={() => toggleItem(activeTab, label)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", cursor: "pointer", borderRadius: 8, transition: "background .12s", background: isOn ? "#FEF2F2" : "transparent" }}
              onMouseEnter={e => { if (!isOn) (e.currentTarget as HTMLDivElement).style.background = "#F8F9FB"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = isOn ? "#FEF2F2" : "transparent"; }}
            >
              <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${isOn ? "#D92B2B" : "#D0D5DD"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isOn ? "#D92B2B" : "transparent", transition: "all .12s", boxShadow: isOn ? "0 1px 3px rgba(217,43,43,.2)" : "none" }}>
                {isOn && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="2,5 4,7 8,3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 12.5, color: isOn ? "#101828" : "#475467", flex: 1, fontWeight: isOn ? 600 : 400, transition: "color .12s" }}>{label}</span>
              <span style={{ fontSize: 11, color: isOn ? "#D92B2B" : "#98A2B3", fontWeight: 500, transition: "color .12s" }}>{count}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function RailCard({ title, linkText, children }: { title: string; linkText?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 10px", borderBottom: "1px solid #EAECF0" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#101828" }}>{title}</span>
        {linkText && <a href="#" style={{ fontSize: 11.5, fontWeight: 500, color: "#D92B2B", textDecoration: "none" }}>{linkText}</a>}
      </div>
      {children}
    </div>
  );
}