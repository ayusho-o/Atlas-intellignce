"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

// ── Custom TopBar matching reference design ──
function GPTopBar() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[250px] h-[60px] bg-white border-b border-[#EBEBEB] z-30 flex items-center gap-4 px-5">
      {/* Center search */}
      <div className="flex-1 max-w-[560px] mx-auto relative">
        <div className="flex items-center gap-2.5 h-11 px-4 rounded-full border border-[#EBEBEB] bg-[#FAFAFA]">
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="flex-1 bg-transparent outline-none text-[13px] text-[#1F2430] placeholder:text-[#9CA3AF]" placeholder="Search startups, products, investors, jobs and news" />
          <kbd className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded border border-[#E5E7EB] bg-white text-[11px] text-[#9CA3AF]">/</kbd>
          <button className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FF5A5F" }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors">
          <svg width="18" height="18" fill="none" stroke="#4B5563" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#FF5A5F] text-white text-[9px] font-bold flex items-center justify-center">9</span>
        </button>
        <button className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#F59E0B] flex items-center justify-center text-white text-[12px] font-bold">A</div>
          <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>
    </header>
  );
}


const products = [
  { id: 1, slug: "cursor", name: "Cursor", tagline: "The AI-first code editor built for speed and productivity.", categories: ["Code", "Developer Tools"], badge: "🔥 Trending in Coding", likes: "8.3K", comments: "173", domain: "cursor.sh" },
  { id: 2, slug: "claude", name: "Claude", tagline: "AI assistant for thoughtful work and collaboration.", categories: ["Chat", "Productivity"], badge: "❤️ Most used this week", likes: "6.7K", comments: "89", domain: "claude.ai" },
  { id: 3, slug: "midjourney", name: "Midjourney", tagline: "AI image generator for creators and designers.", categories: ["Image", "Design"], badge: "⭐ Top rated in Image", likes: "5.5K", comments: "386", domain: "midjourney.com" },
  { id: 4, slug: "chatgpt", name: "ChatGPT", tagline: "Conversational AI for any question or task.", categories: ["Chat", "Artificial Intelligence"], badge: "❤️ Most used this week", likes: "5.1K", comments: "341", domain: "chat.openai.com" },
  { id: 5, slug: "runway", name: "Runway", tagline: "AI video creation platform for everyone.", categories: ["Video", "Audio"], badge: "⬆️ Fastest growing", likes: "3.9K", comments: "210", domain: "runwayml.com" },
  { id: 6, slug: "elevenlabs", name: "ElevenLabs", tagline: "AI voice synthesis and audio tools.", categories: ["Voice", "Audio"], badge: "🔥 Trending in Voice", likes: "3.2K", comments: "175", domain: "elevenlabs.io" },
  { id: 7, slug: "perplexity", name: "Perplexity", tagline: "AI search engine for real-time answers.", categories: ["Search", "Productivity"], badge: "❤️ Most used this week", likes: "2.9K", comments: "144", domain: "perplexity.ai" },
  { id: 8, slug: "notion-ai", name: "Notion AI", tagline: "AI notes, docs and knowledge workspace.", categories: ["Productivity", "Writing"], badge: "", likes: "2.6K", comments: "128", domain: "notion.so" },
  { id: 9, slug: "descript", name: "DescriptAI", tagline: "Edit audio & video like a doc.", categories: ["Video", "Audio"], badge: "", likes: "2.3K", comments: "98", domain: "descript.com" },
  { id: 10, slug: "canva-ai", name: "Canva AI", tagline: "Design anything with AI, together.", categories: ["Design", "Productivity"], badge: "", likes: "2.1K", comments: "86", domain: "canva.com" },
  { id: 11, slug: "github-copilot", name: "GitHub Copilot", tagline: "AI pair programmer that suggests code in real time.", categories: ["Code", "Developer Tools"], badge: "🔥 Trending in Coding", likes: "7.8K", comments: "412", domain: "github.com" },
  { id: 12, slug: "stable-diffusion", name: "Stable Diffusion", tagline: "Open-source AI image generation model.", categories: ["Image", "Design"], badge: "", likes: "4.2K", comments: "267", domain: "stability.ai" },
  { id: 13, slug: "sora", name: "Sora", tagline: "AI video generation from text prompts by OpenAI.", categories: ["Video", "Agents"], badge: "⬆️ Fastest growing", likes: "4.8K", comments: "523", domain: "openai.com" },
  { id: 14, slug: "gemini", name: "Google Gemini", tagline: "Multimodal AI model by Google for text, code, and images.", categories: ["Chat", "Agents"], badge: "❤️ Most used this week", likes: "4.5K", comments: "198", domain: "gemini.google.com" },
  { id: 15, slug: "dall-e", name: "DALL·E 3", tagline: "Generate images from natural language descriptions.", categories: ["Image", "Artificial Intelligence"], badge: "", likes: "3.8K", comments: "245", domain: "openai.com" },
  { id: 16, slug: "suno", name: "Suno", tagline: "Generate full songs with vocals and instruments from text.", categories: ["Voice", "Audio"], badge: "🔥 Trending in Voice", likes: "3.1K", comments: "189", domain: "suno.com" },
  { id: 17, slug: "devin", name: "Devin", tagline: "Autonomous AI software engineer that codes, tests, and deploys.", categories: ["Code", "Agents"], badge: "⬆️ Fastest growing", likes: "5.2K", comments: "634", domain: "cognition.ai" },
  { id: 18, slug: "v0", name: "v0 by Vercel", tagline: "Generate production-ready UI from text prompts.", categories: ["Code", "Design"], badge: "🔥 Trending in Coding", likes: "4.1K", comments: "312", domain: "v0.dev" },
  { id: 19, slug: "figma-ai", name: "Figma AI", tagline: "AI design tools built into Figma for faster workflows.", categories: ["Design", "Productivity"], badge: "", likes: "2.8K", comments: "156", domain: "figma.com" },
  { id: 20, slug: "grammarly", name: "Grammarly", tagline: "AI writing assistant for grammar, tone, and clarity.", categories: ["Productivity", "Writing"], badge: "", likes: "3.4K", comments: "201", domain: "grammarly.com" },
  { id: 21, slug: "jasper", name: "Jasper", tagline: "AI platform for marketing content and brand copy.", categories: ["Productivity", "Writing"], badge: "", likes: "1.9K", comments: "87", domain: "jasper.ai" },
  { id: 22, slug: "synthesia", name: "Synthesia", tagline: "Create AI avatar videos in minutes, no camera needed.", categories: ["Video", "Productivity"], badge: "", likes: "2.4K", comments: "134", domain: "synthesia.io" },
  { id: 23, slug: "heygen", name: "HeyGen", tagline: "AI video generation with talking avatars for business.", categories: ["Video", "Productivity"], badge: "", likes: "2.0K", comments: "98", domain: "heygen.com" },
  { id: 24, slug: "lindy", name: "Lindy AI", tagline: "Build AI agents that handle email, scheduling, and workflows.", categories: ["Agents", "Productivity"], badge: "⬆️ Fastest growing", likes: "1.6K", comments: "67", domain: "lindy.ai" },
  { id: 25, slug: "replit", name: "Replit AI", tagline: "AI coding assistant built into the Replit cloud IDE.", categories: ["Code", "Developer Tools"], badge: "", likes: "2.7K", comments: "156", domain: "replit.com" },
  { id: 26, slug: "pika", name: "Pika", tagline: "Turn text or images into short stylized video clips.", categories: ["Video", "Image"], badge: "", likes: "1.8K", comments: "94", domain: "pika.art" },
  { id: 27, slug: "copy-ai", name: "Copy.ai", tagline: "AI copywriting for emails, ads, and marketing at scale.", categories: ["Productivity", "Writing"], badge: "", likes: "1.5K", comments: "72", domain: "copy.ai" },
  { id: 28, slug: "superhuman", name: "Superhuman", tagline: "AI-powered email client built for speed and inbox zero.", categories: ["Productivity", "Chat"], badge: "", likes: "1.9K", comments: "104", domain: "superhuman.com" },
  { id: 29, slug: "leonardo-ai", name: "Leonardo AI", tagline: "AI image generation for game art and concept design.", categories: ["Image", "Design"], badge: "", likes: "1.7K", comments: "88", domain: "leonardo.ai" },
  { id: 30, slug: "udio", name: "Udio", tagline: "Create original music tracks in any style with AI.", categories: ["Voice", "Audio"], badge: "", likes: "2.2K", comments: "145", domain: "udio.com" },
];

const categories = [
  { label: "All", icon: "🌐" },
  { label: "Chat", icon: "💬" },
  { label: "Code", icon: "💻" },
  { label: "Agents", icon: "🤖" },
  { label: "Image", icon: "🖼️" },
  { label: "Video", icon: "🎬" },
  { label: "Voice", icon: "🎙️" },
  { label: "Productivity", icon: "⚡" },
  { label: "More ˅", icon: "📦" },
];

const popularNow = [
  { name: "Cursor", category: "Code Editor", domain: "cursor.sh" },
  { name: "Claude", category: "AI Chat", domain: "claude.ai" },
  { name: "Midjourney", category: "Image Gen", domain: "midjourney.com" },
  { name: "Perplexity", category: "AI Search", domain: "perplexity.ai" },
  { name: "Runway", category: "Video AI", domain: "runwayml.com" },
  { name: "ElevenLabs", category: "Voice AI", domain: "elevenlabs.io" },
  { name: "Notion AI", category: "Productivity", domain: "notion.so" },
  { name: "ChatGPT", category: "AI Chat", domain: "chat.openai.com" },
];

const trendingSearches = ["Cursor", "Claude", "Vibe Coding", "Lovable", "Perplexity", "Midjourney", "Runway", "MCP", "AI Agents", "AI Notetaker"];
const mostSearched = ["Databricks", "Notion", "Pinecone", "Weaviate", "LangChain"];

const heroLogos = [
  { name: "OpenAI", domain: "openai.com", top: "10%", left: "5%" },
  { name: "Anthropic", domain: "anthropic.com", top: "5%", left: "55%" },
  { name: "Cursor", domain: "cursor.sh", top: "40%", left: "30%" },
  { name: "Midjourney", domain: "midjourney.com", top: "60%", left: "0%" },
  { name: "Perplexity", domain: "perplexity.ai", top: "55%", left: "60%" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState<"popular" | "newest">("popular");
  const [email, setEmail] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = (() => {
    let list = activeCategory === "All"
      ? products
      : products.filter((p) => p.categories.some((c) => c.toLowerCase().includes(activeCategory.toLowerCase())));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.categories.some((c) => c.toLowerCase().includes(q)));
    }
    return list;
  })();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        /* ── Products page CSS polish (no layout changes) ── */

        /* Product row hover — subtle lift + accent */
        .gp-row { transition: background .18s ease, box-shadow .18s ease, transform .18s ease; }
        .gp-row:hover { background: #FAFAFA; box-shadow: 0 2px 12px rgba(16,24,40,.05); }
        .gp-row:hover .gp-logo { transform: scale(1.06); box-shadow: 0 4px 12px rgba(0,0,0,.08); }
        .gp-row:hover .gp-name { color: #FF5A5F; }
        .gp-logo { transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease; }
        .gp-name { transition: color .15s ease; }

        /* Hero orbit logos — gentle float on hover */
        .gp-orbit-logo { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease; }
        .gp-orbit-logo:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,.1); }

        /* Pills — smooth hover */
        .gp-pill { transition: background .15s ease, color .15s ease, transform .12s ease; }
        .gp-pill:hover { transform: translateY(-1px); }
        .gp-pill:active { transform: translateY(0) scale(.97); }

        /* Buttons — press + glow */
        .gp-btn { transition: transform .15s ease, box-shadow .2s ease, opacity .2s ease; }
        .gp-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(255,90,95,.28); }
        .gp-btn:active { transform: translateY(0) scale(.98); }

        /* Cards — refined hover shadow */
        .gp-card { transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease; }
        .gp-card:hover { box-shadow: 0 8px 28px rgba(16,24,40,.08); transform: translateY(-2px); }

        /* Search bar focus glow */
        .gp-search { transition: border-color .2s ease, box-shadow .2s ease; }
        .gp-search:focus-within { border-color: #FF5A5F; box-shadow: 0 0 0 4px rgba(255,90,95,.1); }

        /* Category tab smooth */
        .gp-tab { transition: background .15s ease, color .15s ease, border-color .15s ease, transform .12s ease; }
        .gp-tab:hover { transform: translateY(-1px); }

        /* Popular-now tiles */
        .gp-pop { transition: transform .2s cubic-bezier(.34,1.56,.64,1); }
        .gp-pop:hover { transform: translateY(-3px); }
        .gp-pop:hover .gp-pop-logo { box-shadow: 0 6px 16px rgba(0,0,0,.1); }
        .gp-pop-logo { transition: box-shadow .2s ease; }

        /* Collection thumbnails */
        .gp-thumb { transition: transform .25s ease, box-shadow .25s ease; }
        .gp-thumb:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 24px rgba(0,0,0,.1); }

        /* Heart / comment icons */
        .gp-action { transition: color .15s ease, transform .15s ease; }
        .gp-row:hover .gp-action-heart { color: #FF5A5F; }

        /* Fade-in on load */
        @keyframes gpFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .gp-fade { animation: gpFade .4s ease both; }

        /* Smooth scroll for horizontal rows */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <Sidebar />
      <GPTopBar />

      <main className="lg:pl-[250px] pt-[60px]">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <section className="px-6 pt-10 pb-8 lg:px-10">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Hero Text */}
                <div className="flex-1 max-w-[600px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4"
                    style={{ background: "#FFF0F0", color: "#FF5A5F" }}>
                    <span className="w-2 h-2 rounded-full bg-[#FF5A5F] animate-pulse" />
                    LIVE AI INTELLIGENCE
                  </div>
                  <h1 className="text-[32px] lg:text-[40px] font-bold leading-tight text-[#1F2430] mb-3">
                    The Global Intelligence Layer{" "}
                    <span style={{ color: "#FF5A5F" }}>for AI.</span>
                  </h1>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6">
                    One graph connecting companies, founders, investors, products, funding and talent.
                  </p>

                  {/* Search Bar */}
                  <div className="gp-search relative mb-4 rounded-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search companies, founders, investors, products or funding rounds..."
                      className="w-full h-12 pl-5 pr-14 rounded-full border border-[#EBEBEB] text-[13px] text-[#1F2430] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                    />
                    <button
                      className="gp-btn absolute right-1.5 top-1.5 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "#FF5A5F" }}
                      aria-label="Search"
                    >
                      <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </button>
                  </div>

                  {/* Most Searched */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] text-[#6B7280] font-medium">Most searched:</span>
                    {mostSearched.map((term) => (
                      <span key={term} onClick={() => setSearchQuery(term)} className="gp-pill px-3 py-1 rounded-full text-[12px] font-medium text-[#1F2430] bg-[#F3F4F6] hover:bg-[#E5E7EB] cursor-pointer">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hero Logo Cluster — spider-web orbital matching instructor design */}
                <div className="hidden lg:block relative w-[420px] h-[360px] flex-shrink-0">
                  {/* Concentric rings + radial spokes + intersection dots */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 360" style={{ zIndex: 0 }}>
                    {/* concentric circles */}
                    <circle cx="210" cy="180" r="70" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.8" />
                    <circle cx="210" cy="180" r="110" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.65" />
                    <circle cx="210" cy="180" r="150" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.5" />
                    {/* radial spokes — pre-calculated endpoints */}
                    <line x1="210" y1="180" x2="360" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="340" y2="93" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="30" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="30" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="30" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80" y2="93" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="60" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80" y2="267" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="330" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="330" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="330" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="340" y2="267" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    {/* dots at key positions */}
                    {[[280,180],[340,180],[360,180],[245,145],[275,110],[210,110],[210,70],[210,30],[175,145],[145,110],[135,30],[80,93],[80,267],[135,330],[285,330],[340,267],[175,215],[145,250],[245,215],[275,250]].map(([x,y], i) => (
                      <circle key={`d${i}`} cx={x} cy={y} r="2.2" fill="#FF5A5F" opacity="0.45" />
                    ))}
                  </svg>

                  {/* Center pink glow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,90,95,.12) 0%, transparent 70%)", zIndex: 1 }} />

                  {/* Center red hexagon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ zIndex: 3 }}>
                    <div className="w-[78px] h-[78px] flex items-center justify-center" style={{
                      background: "linear-gradient(150deg, #FF6B6F 0%, #FF5A5F 60%, #E0454B 100%)",
                      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                      boxShadow: "0 10px 28px rgba(255,90,95,.4)",
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Logo cards positioned around the web */}
                  {/* OpenAI — top center (horizontal card) */}
                  <div className="gp-orbit-logo absolute top-[6px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 16px rgba(255,90,95,.08)" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=openai.com" alt="OpenAI" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">OpenAI</span>
                  </div>

                  {/* Anthropic — upper left */}
                  <div className="gp-orbit-logo absolute top-[110px] left-[0px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 16px rgba(255,90,95,.08)" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=anthropic.com" alt="Anthropic" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Anthropic</span>
                  </div>

                  {/* Cursor — upper right (highlighted) */}
                  <div className="gp-orbit-logo absolute top-[110px] right-[0px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 18px rgba(255,90,95,.18)", border: "1.5px solid #FFCFCF" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=cursor.sh" alt="Cursor" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Cursor</span>
                  </div>

                  {/* Midjourney — lower left */}
                  <div className="gp-orbit-logo absolute bottom-[6px] left-[45px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 16px rgba(255,90,95,.08)" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=midjourney.com" alt="Midjourney" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Midjourney</span>
                  </div>

                  {/* Perplexity — lower right */}
                  <div className="gp-orbit-logo absolute bottom-[6px] right-[45px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 16px rgba(255,90,95,.08)" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=perplexity.ai" alt="Perplexity" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Perplexity</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Collection of the Week Banner — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-6 lg:px-10 mb-8">
              <div className="gp-card rounded-xl border border-[#EBEBEB] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6"
                style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FFF8F8 50%, #FFF0ED 100%)" }}>
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase mb-3"
                    style={{ background: "#FF5A5F", color: "white" }}>
                    COLLECTION OF THE WEEK
                  </span>
                  <h3 className="text-[22px] font-bold text-[#1F2430] mb-1.5">Vibe Coding Tools</h3>
                  <p className="text-[14px] text-[#6B7280] mb-4">
                    The best AI tools for vibe coding, building and shipping faster.
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-[#3B82F6] flex items-center justify-center text-[9px] font-bold text-white">JK</div>
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-[#10B981] flex items-center justify-center text-[9px] font-bold text-white">AP</div>
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-[#8B5CF6] flex items-center justify-center text-[9px] font-bold text-white">MR</div>
                      <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#FF5A5F" }}>+</div>
                    </div>
                    <span className="text-[13px] text-[#6B7280]">2,341 products</span>
                  </div>
                  <button onClick={() => setActiveCategory("Code")} className="gp-btn px-5 py-2.5 rounded-full text-[13px] font-semibold text-white hover:opacity-90"
                    style={{ background: "#FF5A5F" }}>
                    Explore Collection →
                  </button>
                </div>
                <div className="hidden lg:flex gap-3 flex-shrink-0">
                  {["cursor.sh", "v0.dev", "replit.com"].map((d, i) => (
                    <div key={d} className="gp-thumb w-[110px] h-[76px] rounded-lg overflow-hidden border border-[#EBEBEB] shadow-sm"
                      style={{ background: i === 1 ? "#1F2430" : i === 2 ? "#F5F5F5" : "#fff" }}>
                      <div className="w-full h-full flex flex-col">
                        <div className="flex items-center gap-1 px-2 pt-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img src={`https://www.google.com/s2/favicons?sz=64&domain=${d}`} alt={d} className="w-6 h-6 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            )}

            {/* Category Tabs */}
            <section className="px-6 lg:px-10 mb-6">
              <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`gp-tab flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap ${
                      activeCategory === cat.label
                        ? "text-[#FF5A5F] bg-[#FFF0F0] border border-[#FF5A5F]/20"
                        : "text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-transparent"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Right Now — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-6 lg:px-10 mb-8 hidden md:block">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-[#1F2430]">Popular Right Now</h3>
                <button className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors">
                  <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {popularNow.map((item) => (
                  <div key={item.name} className="gp-pop flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
                    <div className="gp-pop-logo w-12 h-12 rounded-xl border border-[#EBEBEB] bg-white flex items-center justify-center shadow-sm">
                      <img src={`https://www.google.com/s2/favicons?sz=128&domain=${item.domain}`} alt={item.name} className="w-7 h-7 rounded-lg" />
                    </div>
                    <span className="text-[11px] font-medium text-[#1F2430] text-center">{item.name}</span>
                    <span className="text-[10px] text-[#9CA3AF] text-center">{item.category}</span>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Sort Bar */}
            <section className="px-6 lg:px-10 mb-4">
              {/* Search results indicator */}
              {searchQuery.trim() && (
                <div className="flex items-center justify-between py-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#1F2430]">
                      {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                    </span>
                    <button onClick={() => setSearchQuery("")} className="text-[12px] text-[#FF5A5F] font-medium hover:underline">
                      Clear search
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between py-3 border-b border-[#EBEBEB]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveSort("popular")}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                      activeSort === "popular" ? "text-[#FF5A5F] bg-[#FFF0F0]" : "text-[#6B7280] hover:text-[#1F2430]"
                    }`}
                  >
                    Most Popular
                  </button>
                  <button
                    onClick={() => setActiveSort("newest")}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                      activeSort === "newest" ? "text-[#FF5A5F] bg-[#FFF0F0]" : "text-[#6B7280] hover:text-[#1F2430]"
                    }`}
                  >
                    Newest
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-[#9CA3AF] hidden sm:inline">{filteredProducts.length.toLocaleString()} products</span>
                  <button className="flex items-center gap-1 text-[12px] text-[#6B7280] hover:text-[#1F2430] transition-colors">
                    Sort by: Popular
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            {/* Product List */}
            <section className="px-6 lg:px-10 pb-10">
              {filteredProducts.map((product, index) => (
                <div key={product.id}>
                  {/* Product Row */}
                  <Link href={`/products/${product.slug}`} className="gp-row gp-fade flex items-center gap-4 py-4 border-b border-[#EBEBEB] px-2 -mx-2 rounded-lg cursor-pointer group no-underline">
                    {/* Logo */}
                    <div className="gp-logo w-10 h-10 rounded-xl border border-[#EBEBEB] bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${product.domain}`}
                        alt={product.name}
                        className="w-6 h-6 rounded-md"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="gp-name text-[14px] font-semibold text-[#1F2430]">{product.name}</span>
                        <div className="hidden sm:flex items-center gap-1.5">
                          {product.categories.map((cat) => (
                            <span key={cat} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F3F4F6] text-[#6B7280]">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[13px] text-[#6B7280] truncate">{product.tagline}</p>
                      {product.badge && (
                        <span className="inline-block mt-1 text-[11px] font-medium text-[#1F2430]">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="gp-action gp-action-heart flex items-center gap-1 text-[12px] text-[#6B7280]">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{product.likes}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-[12px] text-[#6B7280]">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{product.comments}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Sponsored Card after item 5 */}
                  {index === 4 && (
                    <div className="my-4 p-6 rounded-xl border border-[#E0E4F0] flex flex-col lg:flex-row items-start lg:items-center gap-5"
                      style={{ background: "linear-gradient(135deg, #F0F0FF 0%, #E8ECFF 50%, #F5F0FF 100%)" }}>
                      <div className="flex-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase text-[#6B7280] bg-white/70 mb-2">
                          SPONSORED
                        </span>
                        <h4 className="text-[18px] font-bold text-[#1F2430] mb-1">Build AI agents in minutes</h4>
                        <p className="text-[13px] text-[#6B7280] mb-4">
                          The all-in-one platform to design, deploy and scale AI workflows.
                        </p>
                        <button className="px-5 py-2 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ background: "#FF5A5F" }}>
                          Try GraphOne Studio →
                        </button>
                      </div>
                      <div className="hidden lg:flex gap-2 flex-shrink-0">
                        {["vercel.com", "github.com"].map((d) => (
                          <div key={d} className="w-[80px] h-[56px] rounded-lg border border-[#E0E4F0] bg-white/80 flex items-center justify-center">
                            <img src={`https://www.google.com/s2/favicons?sz=128&domain=${d}`} alt={d} className="w-6 h-6 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Load More */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="px-6 py-2.5 rounded-full text-[13px] font-medium text-[#6B7280] border border-[#EBEBEB] hover:bg-[#F3F4F6] transition-colors"
                >
                  Load more products ˅
                </button>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-[280px] flex-shrink-0 border-l border-[#EBEBEB] p-6 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
            {/* Product of the Day */}
            <div className="mb-6 p-4 rounded-xl border border-[#EBEBEB]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#9CA3AF] mb-3 block">Product of the Day</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl border border-[#EBEBEB] bg-white flex items-center justify-center">
                  <img src="https://www.google.com/s2/favicons?sz=128&domain=cursor.sh" alt="Cursor" className="w-6 h-6 rounded-md" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1F2430]">Cursor</p>
                  <p className="text-[11px] text-[#9CA3AF]">AI-first code editor</p>
                </div>
              </div>
              <Link href="/products/cursor" className="block w-full py-2 rounded-full text-[12px] font-semibold text-white text-center transition-opacity hover:opacity-90"
                style={{ background: "#FF5A5F" }}>
                View Product
              </Link>
            </div>

            {/* Trending Searches */}
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#9CA3AF] mb-3 block">Trending Searches</span>
              <div className="flex flex-wrap gap-1.5">
                {trendingSearches.map((term) => (
                  <span key={term} onClick={() => setSearchQuery(term)} className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1F2430] bg-[#F3F4F6] hover:bg-[#E5E7EB] cursor-pointer transition-colors">
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Email Signup */}
            <div className="mb-6 p-4 rounded-xl border border-[#EBEBEB]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
              <div className="flex items-center gap-2 mb-2">
                <svg width="18" height="18" fill="none" stroke="#FF5A5F" strokeWidth="1.7" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-[13px] font-semibold text-[#1F2430]">Stay ahead in AI</span>
              </div>
              <p className="text-[12px] text-[#6B7280] mb-3">Get weekly updates on new tools and trends.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 h-8 px-3 rounded-full border border-[#EBEBEB] text-[12px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF5A5F] transition-colors"
                />
                <button onClick={() => { if (email.includes("@")) setSubscribed(true); }} className="px-4 h-8 rounded-full text-[11px] font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                  style={{ background: subscribed ? "#16A34A" : "#FF5A5F" }}>
                  {subscribed ? "✓ Done" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className="pt-4 border-t border-[#EBEBEB]">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-3">
                {["About", "Advertise", "API", "Newsletter", "Blog", "Privacy", "Terms", "Contact"].map((link) => (
                  <Link key={link} href="#" className="text-[11px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
              <p className="text-[10px] text-[#9CA3AF]">© 2024 GraphOne. All rights reserved.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
