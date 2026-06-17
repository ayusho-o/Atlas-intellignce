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
          <button className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EF3050" }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors">
          <svg width="18" height="18" fill="none" stroke="#4B5563" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#EF3050] text-white text-[9px] font-bold flex items-center justify-center">9</span>
        </button>
        <button className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EF3050] to-[#F59E0B] flex items-center justify-center text-white text-[12px] font-bold">A</div>
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
  { label: "More", icon: "📦", hasArrow: true },
];

const popularNow = [
  { name: "Cursor", category: "AI code editor", domain: "cursor.sh" },
  { name: "Claude", category: "AI assistant", domain: "claude.ai" },
  { name: "Lovable", category: "AI app builder", domain: "lovable.dev" },
  { name: "Midjourney", category: "Image generator", domain: "midjourney.com" },
  { name: "Perplexity", category: "AI search", domain: "perplexity.ai" },
  { name: "Runway", category: "Video gen", domain: "runwayml.com" },
];

const trendingSearches = ["Cursor", "Claude", "Vibe Coding", "Lovable", "Perplexity", "Midjourney", "Runway", "MCP", "AI Agents", "AI Notetaker"];
const mostSearched = [
  { name: "Databricks", domain: "databricks.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Pinecone", domain: "pinecone.io" },
  { name: "Weaviate", domain: "weaviate.io" },
  { name: "LangChain", domain: "langchain.com" },
];

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
        .gp-row:hover .gp-name { color: #EF3050; }
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
        .gp-search:focus-within { border-color: #EF3050; box-shadow: 0 0 0 4px rgba(255,90,95,.1); }

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
        .gp-row:hover .gp-action-heart { color: #EF3050; }

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
            <section className="px-6 pt-10 pb-8 lg:px-10" style={{ background: "linear-gradient(160deg, #FFFCFB 0%, #FFF6F4 50%, #FFFCFB 100%)" }}>
              <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
                {/* Hero Text */}
                <div className="flex-1 max-w-[600px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4"
                    style={{ background: "#FFF0F0", color: "#EF3050" }}>
                    <span className="w-2 h-2 rounded-full bg-[#EF3050] animate-pulse" />
                    LIVE AI INTELLIGENCE
                  </div>
                  <h1 className="text-[32px] lg:text-[38px] font-bold leading-tight text-[#1F2430] mb-3">
                    The Global Intelligence<br />Layer <span style={{ color: "#EF3050" }}>for AI.</span>
                  </h1>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6">
                    One graph connecting companies, founders, investors, products, funding and talent.
                  </p>

                  {/* Search Bar */}
                  <div className="gp-search relative mb-4 rounded-full">
                    {/* Search icon on the LEFT */}
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search companies, founders, investors, products or funding rounds..."
                      className="w-full h-12 pl-10 pr-14 rounded-full border border-[#EBEBEB] text-[13px] text-[#1F2430] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                    />
                    {/* Right arrow button on the RIGHT */}
                    <button
                      className="gp-btn absolute right-1.5 top-1.5 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "#EF3050" }}
                      aria-label="Search"
                    >
                      <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>

                  {/* Most Searched */}
                  <div className="mb-1">
                    <span className="text-[12.5px] text-[#9498A6] font-medium block mb-2.5">Most searched</span>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {mostSearched.map((term) => (
                        <span key={term.name} onClick={() => setSearchQuery(term.name)}
                          className="gp-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-[#4B4E58] bg-white border border-[#E8E9EE] hover:bg-[#F9F9FB] cursor-pointer whitespace-nowrap">
                          <img src={`https://www.google.com/s2/favicons?sz=64&domain=${term.domain}`} alt={term.name} className="w-4 h-4 rounded-[4px]" />
                          {term.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Logo Cluster — spider-web orbital matching instructor design */}
                <div className="hidden lg:block relative w-[420px] h-[360px] flex-shrink-0 ml-auto mr-[-240px]">
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
                    {/* dots at key positions — mix of bright and dull red */}
                    {[[280,180],[340,180],[360,180],[245,145],[275,110],[210,110],[210,70],[210,30],[175,145],[145,110],[135,30],[80,93],[80,267],[135,330],[285,330],[340,267],[175,215],[145,250],[245,215],[275,250]].map(([x,y], i) => (
                      <circle key={`d${i}`} cx={x} cy={y} r={i % 3 === 0 ? "3" : "2.2"} fill={i % 3 === 0 ? "#EF3050" : "#F2A1AE"} opacity={i % 3 === 0 ? "0.9" : "0.6"} />
                    ))}
                  </svg>

                  {/* Center pink glow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,90,95,.12) 0%, transparent 70%)", zIndex: 1 }} />

                  {/* Center red hexagon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ zIndex: 3 }}>
                    <div className="w-[78px] h-[78px] flex items-center justify-center" style={{
                      background: "linear-gradient(150deg, #FF6B6F 0%, #EF3050 60%, #E0454B 100%)",
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
                  <div className="gp-orbit-logo absolute top-[6px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 6px 16px rgba(40,20,30,0.07)", border: "1px solid #FFE0E0" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=openai.com" alt="OpenAI" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">OpenAI</span>
                  </div>

                  {/* Anthropic — upper left */}
                  <div className="gp-orbit-logo absolute top-[110px] left-[0px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 6px 16px rgba(40,20,30,0.07)", border: "1px solid #FFE0E0" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=anthropic.com" alt="Anthropic" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Anthropic</span>
                  </div>

                  {/* Cursor — upper right (highlighted) */}
                  <div className="gp-orbit-logo absolute top-[110px] right-[0px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 4px 18px rgba(255,90,95,.18)", border: "1.5px solid #FFCFCF" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=cursor.sh" alt="Cursor" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Cursor</span>
                  </div>

                  {/* Midjourney — lower left */}
                  <div className="gp-orbit-logo absolute bottom-[6px] left-[45px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 6px 16px rgba(40,20,30,0.07)", border: "1px solid #FFE0E0" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=midjourney.com" alt="Midjourney" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Midjourney</span>
                  </div>

                  {/* Perplexity — lower right */}
                  <div className="gp-orbit-logo absolute bottom-[6px] right-[45px] flex flex-col items-center gap-1 px-4 py-3 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 6px 16px rgba(40,20,30,0.07)", border: "1px solid #FFE0E0" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=perplexity.ai" alt="Perplexity" className="w-9 h-9" />
                    <span className="text-[12px] font-medium text-[#6B7280]">Perplexity</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Collection of the Week Banner — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-6 lg:px-10 mb-8">
              <div className="rounded-[20px] border border-[#FBE4E2] p-6 lg:p-7 flex flex-col lg:flex-row items-start lg:items-center gap-6 relative overflow-hidden"
                style={{ background: "linear-gradient(120deg,#FFF3F2,#FFF8F2 60%,#FFF3F4)" }}>
                <div className="flex-1 min-w-0">
                  {/* Label with fire emoji */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span>🔥</span>
                    <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "#EF3050" }}>COLLECTION OF THE WEEK</span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[24px] font-bold text-[#15161A] mb-2 flex items-center gap-2">
                    <span>🔥</span> Vibe Coding Tools
                  </h3>
                  <p className="text-[13.5px] mb-4" style={{ color: "#74778A" }}>
                    The best AI tools for vibe coding, building and shipping faster.
                  </p>
                  {/* Avatar stack + count */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg,#FFB199,#FF7A93)" }}></div>
                      <div className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg,#9BD3FF,#5C9CFF)" }}></div>
                      <div className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg,#C9A4FF,#8B5CF6)" }}></div>
                      <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9.5px] font-bold text-white flex-shrink-0" style={{ background: "#262730" }}>+2K</div>
                    </div>
                    <span className="text-[13px]" style={{ color: "#74778A" }}>2,341 products</span>
                  </div>
                  <button onClick={() => setActiveCategory("Code")} className="gp-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold text-white"
                    style={{ background: "#EF3050", boxShadow: "0 8px 18px rgba(239,48,80,0.28)" }}>
                    Explore Collection
                    <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                </div>

                {/* Mock code editor screenshot — matching instructor's design */}
                <div className="hidden lg:block flex-shrink-0 relative w-[260px] h-[130px]">
                  {/* Light editor card */}
                  <div className="absolute left-0 top-0 w-[105px] h-[110px] bg-white rounded-xl shadow-md overflow-hidden border border-[#EFEDF0]">
                    <div className="flex gap-1 p-2.5 pb-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"/>
                      <div className="w-2 h-2 rounded-full bg-[#FFC857]"/>
                      <div className="w-2 h-2 rounded-full bg-[#3FBF7F]"/>
                    </div>
                    <div className="px-2.5">
                      <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-4/5"/>
                      <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-3/5"/>
                      <div className="h-1.5 rounded bg-[#EFEFF3] mb-2 w-4/5"/>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[7px] font-bold text-white" style={{ background: "#8B4DF6" }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                        Generate
                      </div>
                    </div>
                  </div>
                  {/* Dark editor card (center, overlapping) */}
                  <div className="absolute left-[75px] top-[10px] w-[105px] h-[110px] rounded-xl shadow-lg overflow-hidden border border-[#2A2A3A]" style={{ background: "#1A1B2E" }}>
                    <div className="flex gap-1 p-2.5 pb-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"/>
                      <div className="w-2 h-2 rounded-full bg-[#FFC857]"/>
                      <div className="w-2 h-2 rounded-full bg-[#3FBF7F]"/>
                    </div>
                    <div className="px-2.5 flex flex-col gap-1.5">
                      <div className="h-1.5 rounded w-4/5" style={{ background: "#2D2F45" }}/>
                      <div className="h-1.5 rounded w-3/5" style={{ background: "#2D2F45" }}/>
                      <div className="h-1.5 rounded w-4/5" style={{ background: "#2D2F45" }}/>
                      <div className="flex justify-center mt-1">
                        <div className="text-[#8B4DF6] font-mono text-[16px] font-bold">&lt;/&gt;</div>
                      </div>
                    </div>
                  </div>
                  {/* Third card peeking right */}
                  <div className="absolute left-[155px] top-[5px] w-[100px] h-[110px] bg-white rounded-xl shadow-md overflow-hidden border border-[#EFEDF0]">
                    <div className="flex gap-1 p-2.5 pb-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"/>
                      <div className="w-2 h-2 rounded-full bg-[#FFC857]"/>
                      <div className="w-2 h-2 rounded-full bg-[#3FBF7F]"/>
                    </div>
                    <div className="px-2.5">
                      <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-4/5"/>
                      <div className="h-1.5 rounded bg-[#EFEFF3] mb-2 w-3/5"/>
                      <div className="flex justify-center mt-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF3050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                      </div>
                    </div>
                  </div>
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
                        ? "text-[#EF3050] bg-[#FFF0F0] border border-[#EF3050]/20"
                        : "text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-transparent"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                    {(cat as any).hasArrow && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Right Now — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-6 lg:px-10 mb-6 hidden md:block relative">
              <div className="flex items-center gap-2 mb-3.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF3050"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>
                <span className="text-[13px] font-bold uppercase tracking-wide text-[#15161A]">POPULAR RIGHT NOW</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {popularNow.map((item) => (
                  <div key={item.name} className="gp-pop flex items-center gap-2.5 flex-shrink-0 px-3.5 py-2.5 bg-white border border-[#EFEDF0] rounded-xl cursor-pointer hover:border-[#D0D0D0] transition-colors" style={{ minWidth: "150px" }}>
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E8E9EE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={`https://www.google.com/s2/favicons?sz=128&domain=${item.domain}`} alt={item.name} className="w-6 h-6 rounded-lg" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#15161A]">{item.name}</div>
                      <div className="text-[11.5px] text-[#9498A6]">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll arrow */}
              <button className="absolute right-4 top-[52px] w-7 h-7 rounded-full bg-white border border-[#E8E9EE] flex items-center justify-center shadow-sm hover:bg-[#F9F9FB]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74778A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
              </button>
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
                    <button onClick={() => setSearchQuery("")} className="text-[12px] text-[#EF3050] font-medium hover:underline">
                      Clear search
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between py-3 border-b border-[#EBEBEB]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveSort("popular")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                      activeSort === "popular" ? "text-[#EF3050] bg-[#FFF1F3]" : "text-[#74778A] hover:text-[#15161A]"
                    }`}
                  >
                    🔥 Most Popular
                  </button>
                  <button
                    onClick={() => setActiveSort("newest")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                      activeSort === "newest" ? "text-[#EF3050] bg-[#FFF1F3]" : "text-[#74778A] hover:text-[#15161A]"
                    }`}
                  >
                    ✨ Newest
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
                  <Link href={`/products/${product.slug}`} className="gp-row gp-fade flex items-center gap-4 py-5 border-b border-[#EFEDF0] px-1 rounded-lg cursor-pointer group" style={{ textDecoration: "none", color: "inherit" }}>
                    {/* Logo */}
                    <div className="gp-logo w-[46px] h-[46px] rounded-[13px] border border-[#E8E9EE] bg-white flex items-center justify-center flex-shrink-0">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${product.domain}`}
                        alt={product.name}
                        className="w-7 h-7 rounded-md"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="gp-name text-[15px] font-bold text-[#15161A]">{product.name}</span>
                      </div>
                      <p className="text-[13px] text-[#74778A] mb-2">{product.tagline}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {product.categories.map((cat: string) => (
                          <span key={cat} className="px-2.5 py-0.5 rounded-[7px] text-[11.5px] font-semibold" style={{ background: "#EEF1F8", color: "#5C6B8A" }}>
                            {cat}
                          </span>
                        ))}
                        {product.badge && (
                          <span className="flex items-center gap-1 text-[11.5px] font-semibold" style={{ color: product.badge.includes("Top rated") ? "#7C3AED" : "#13A555" }}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats — horizontal */}
                    <div className="flex items-center gap-5 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5B5E68]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF3050" stroke="#EF3050" strokeWidth="1.5">
                          <path d="M12 20s-7-4.4-9.5-9A5.4 5.4 0 0 1 12 5.7 5.4 5.4 0 0 1 21.5 11c-2.5 4.6-9.5 9-9.5 9Z" />
                        </svg>
                        {product.likes}
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5B5E68]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9498A6" strokeWidth="1.8">
                          <path d="M21 11.5a8.4 8.4 0 1 1-3.4-6.8L21 3.5v5h-5" />
                        </svg>
                        {product.comments}
                      </div>
                    </div>
                  </Link>

                  {/* Sponsored Card after item 5 */}
                  {index === 4 && (
                    <div className="my-4 flex items-center gap-4 rounded-2xl border border-[#ECE2FB] px-5 py-4"
                      style={{ background: "linear-gradient(120deg,#F4EEFE,#FBF1FE)" }}>
                      {/* Purple hexagon icon */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#8B4DF6" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2 21 7 12 12 3 7l9-5Z"/></svg>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10.5px] font-bold text-[#9498A6] tracking-wide">SPONSORED</span>
                        <h4 className="text-[14.5px] font-bold text-[#15161A] mt-1">Build AI agents in minutes</h4>
                        <p className="text-[12.5px] text-[#74778A] mt-1">The all-in-one platform to design, deploy and scale AI workflows.</p>
                      </div>
                      {/* Icon stack */}
                      <div className="hidden sm:flex items-center flex-shrink-0">
                        <div className="w-[26px] h-[26px] rounded-lg bg-[#FFEDE3] flex items-center justify-center border border-white shadow-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="#FF7A45"><circle cx="12" cy="12" r="9"/></svg></div>
                        <div className="w-[26px] h-[26px] rounded-lg bg-[#FCE7F3] flex items-center justify-center border border-white shadow-sm -ml-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="#E0529C"><rect x="4" y="4" width="16" height="16" rx="4"/></svg></div>
                        <div className="w-1 h-1 rounded-full bg-[#C7CAD3] mx-1.5" />
                        <div className="w-[26px] h-[26px] rounded-lg bg-[#EAF2FF] flex items-center justify-center border border-white shadow-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="#2F6FED"><polygon points="12,3 21,18 3,18"/></svg></div>
                        <div className="w-1 h-1 rounded-full bg-[#C7CAD3] mx-1.5" />
                        <div className="w-[26px] h-[26px] rounded-lg bg-[#F1ECFF] flex items-center justify-center border border-white shadow-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="#8B5CF6"><circle cx="12" cy="12" r="9"/></svg></div>
                      </div>
                      {/* CTA */}
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white flex-shrink-0 whitespace-nowrap"
                        style={{ background: "#8B4DF6", boxShadow: "0 8px 18px rgba(139,77,246,0.28)" }}>
                        Try GraphOne Studio
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                      </button>
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

          {/* Right Sidebar — aligned with Vibe Coding Tools section */}
          <aside className="hidden xl:block w-[310px] flex-shrink-0 border-l border-[#EFEDF0] pl-5 pr-2 pt-0">
            {/* Spacer to align with collection banner level */}
            <div className="h-[420px]"></div>
            {/* Product of the Day */}
            <div className="mb-6 p-5 rounded-[18px] border border-[#EFEDF0]" style={{ background: "var(--white, #fff)" }}>
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-3.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F0A23A"><path d="M7 3h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3Z"/><path d="M7 4H4a3 3 0 0 0 3 4M17 4h3a3 3 0 0 1-3 4"/><path d="M12 11v3M9 19h6l-1-3H10l-1 3Z"/></svg>
                Product of the Day
              </div>
              <div className="flex items-center gap-3 p-3 rounded-[13px] border border-[#EFEDF0] mb-3" style={{ background: "linear-gradient(135deg,#FFF9F5,#FFF4F1)" }}>
                <div className="w-11 h-11 rounded-xl bg-[#15161A] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M4 3 20 12 13 13.5 11.5 20 4 3Z"/></svg>
                </div>
                <div>
                  <p className="text-[14.5px] font-bold text-[#15161A]">Cursor</p>
                  <p className="text-[12px] text-[#74778A] mt-0.5">AI-first code editor</p>
                </div>
              </div>
              <Link href="/products/cursor" className="flex items-center justify-center w-full py-3 rounded-full text-[13.5px] font-semibold text-white"
                style={{ background: "#EF3050", boxShadow: "0 8px 18px rgba(239,48,80,0.28)" }}>
                View Product
              </Link>
            </div>

            {/* Trending Searches */}
            <div className="mb-6 p-5 rounded-[18px] border border-[#EFEDF0]">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-3.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF3050" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17 9 11 13 15 21 7"/><path d="M15 7h6v6"/></svg>
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <span key={term} onClick={() => setSearchQuery(term)} className="px-3 py-1.5 rounded-full text-[12.5px] font-medium text-[#4B4E58] bg-[#F9F9FB] border border-[#EFEFF3] hover:bg-[#E8E9EE] cursor-pointer transition-colors">
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Stay ahead in AI */}
            <div className="mb-6 p-5 rounded-[18px] border border-[#EFEDF0]">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF3050" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 6.5 8 6 8-6"/></svg>
                Stay ahead in AI
              </div>
              <p className="text-[13px] text-[#74778A] leading-relaxed mb-3.5">Get weekly updates on new tools and trends.</p>
              <input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-10 px-3.5 rounded-xl border border-[#E8E9EE] text-[13px] text-[#15161A] placeholder:text-[#9498A6] focus:outline-none focus:border-[#EF3050] mb-2.5"
              />
              <button onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                className="w-full flex items-center justify-center py-3 rounded-full text-[13.5px] font-semibold text-white"
                style={{ background: subscribed ? "#13A555" : "#EF3050", boxShadow: subscribed ? "none" : "0 8px 18px rgba(239,48,80,0.28)" }}>
                {subscribed ? "✓ Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Footer Links */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-x-5 gap-y-3 mb-3.5">
                {["About", "Advertise", "API", "Newsletter"].map((link) => (
                  <span key={link} className="text-[12.5px] font-medium text-[#74778A]">{link}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-3 mb-4">
                {["Blog", "Privacy", "Terms", "Contact"].map((link) => (
                  <span key={link} className="text-[12.5px] font-medium text-[#74778A]">{link}</span>
                ))}
              </div>
              <p className="text-[12px] text-[#9498A6] leading-relaxed">© 2024 GraphOne.<br />All rights reserved.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
