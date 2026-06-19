"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

// Brand icon backgrounds
const ICON_BG: Record<string, string> = {
  black: "background:#15161A;color:#fff",
  whiteb: "background:#fff;color:#15161A;border:1px solid #E8E9EE",
  orange: "background:#D97757;color:#fff",
  purple: "background:#8B4DF6;color:#fff",
  pink: "background:linear-gradient(135deg,#FF7A93,#FF4D6D);color:#fff",
  blue: "background:#2F6FED;color:#fff",
  teal: "background:linear-gradient(135deg,#19C6C6,#2BA9D9);color:#fff",
  skyblue: "background:#EAF2FF;color:#2F6FED",
};

function bgStyle(key: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    black: { background: "#15161A" },
    whiteb: { background: "#fff", border: "1px solid #E8E9EE" },
    orange: { background: "#D97757" },
    purple: { background: "#8B4DF6" },
    pink: { background: "linear-gradient(135deg,#FF7A93,#FF4D6D)" },
    blue: { background: "#2F6FED" },
    teal: { background: "linear-gradient(135deg,#19C6C6,#2BA9D9)" },
    skyblue: { background: "#EAF2FF" },
  };
  return map[key] || map.whiteb;
}

function BrandIcon({ name, size = 46, radius = 13 }: { name: string; size?: number; radius?: number }) {
  const s = Math.round(size * 0.42);
  const wrap = (bg: string, inner: React.ReactNode, extra: React.CSSProperties = {}) => (
    <div style={{ width: size, height: size, borderRadius: radius, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...bgStyle(bg), ...extra }}>{inner}</div>
  );
  switch (name) {
    case "Cursor":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 2 21 12 12 13l-2 7L5 2Z" fill="#fff"/></svg>);
    case "Claude":
      return wrap("orange", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4.2 4.2M14.8 14.8 19 19M19 5l-4.2 4.2M9.2 14.8 5 19"/></svg>);
    case "Midjourney":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v10"/><path d="M12 4 6 14h6V4Z"/><path d="M12 6 17 14h-5V6Z"/><path d="M3.5 17c1.1-1 2.2-1 3.3 0s2.2 1 3.3 0 2.2-1 3.3 0 2.2 1 3.3 0 2.2-1 3.3 0"/><path d="M5 20h14"/></svg>);
    case "ChatGPT": case "OpenAI":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07Zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5Zm-9.66-4.13a4.47 4.47 0 0 1-.53-3.01l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06l-4.84 2.79a4.5 4.5 0 0 1-6.14-1.65ZM2.34 7.9a4.49 4.49 0 0 1 2.37-1.97v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L4 14.03A4.5 4.5 0 0 1 2.34 7.87Zm16.6 3.86-5.84-3.37 2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1V12.44a.79.79 0 0 0-.4-.67Zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66ZM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.39.68l-.01 6.72Zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5v-3Z"/></svg>);
    case "Runway":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 12h16M12 4v16"/><circle cx="12" cy="12" r="3" fill="#fff" stroke="none"/></svg>);
    case "ElevenLabs":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><rect x="8" y="4" width="3" height="16" rx="1.5"/><rect x="13" y="4" width="3" height="16" rx="1.5"/></svg>);
    case "Perplexity":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="7" cy="7" r="1.8"/><circle cx="12" cy="7" r="1.8"/><circle cx="17" cy="7" r="1.8"/><circle cx="7" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="17" cy="12" r="1.8"/><circle cx="7" cy="17" r="1.8"/><circle cx="12" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/></svg>);
    case "Notion AI":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M4 4.5h2.5L14 16V5h2.5v14H14L6.5 7.5V19H4V4.5Z"/></svg>);
    case "Descript": case "DescriptAI":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12h2l2-6 3 14 3-11 2 5h6"/></svg>);
    case "Canva AI":
      return wrap("teal", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="9"/><path d="M9 10h6M9 14h4" stroke="#19C6C6" strokeWidth="2" strokeLinecap="round"/></svg>);
    case "Anthropic":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M13.83 4h3.34L22 20h-3.34l-4.83-16ZM6.83 4H2l4.83 16h3.34L6.83 4Z"/></svg>);
    case "Lovable":
      return wrap("pink", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 21s-7-4.6-9.7-9A5.6 5.6 0 0 1 12 6a5.6 5.6 0 0 1 9.7 6c-2.7 4.4-9.7 9-9.7 9Z"/></svg>);
    case "Databricks":
      return wrap("orange", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 2 3 7v4l9 5 9-5V7l-9-5ZM3 13v4l9 5 9-5v-4l-9 5-9-5Z"/></svg>);
    case "Pinecone":
      return wrap("teal", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 2c-1 3-3 5-6 6 3 1 5 3 6 6 1-3 3-5 6-6-3-1-5-3-6-6Z"/></svg>);
    case "Weaviate":
      return wrap("teal", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z"/></svg>);
    case "LangChain":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M10 7h7v7M14 17H7v-7"/></svg>);
    case "GitHub Copilot":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.35 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>);
    case "Stable Diffusion":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" strokeWidth="1.8"/><path d="M7 14c1-2 3-3 5-3s4 1 5 3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>);
    case "Sora":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>);
    case "Google Gemini":
      return wrap("blue", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M12 2c-1.5 4-4.5 7-8.5 8.5C7.5 12 10.5 15 12 19c1.5-4 4.5-7 8.5-8.5-4-1.5-7-4.5-8.5-8.5Z"/></svg>);
    case "DALL\u00B7E 3":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="9" cy="10" r="2" fill="#fff"/><path d="m4 18 5-5 3 3 4-4 4 4"/></svg>);
    case "Suno":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 3v18M8 6v12M4 9v6M16 6v12M20 9v6"/></svg>);
    case "Devin":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9l3 3-3 3M13 15h3"/></svg>);
    case "v0 by Vercel":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M1 4l11 16L23 4H1Z"/></svg>);
    case "Figma AI":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Zm0-20a4 4 0 0 0 0 8h4V4H8Zm0 8a4 4 0 0 0 0 8h4v-8H8Zm8-8h-4v8h4a4 4 0 0 0 0-8Zm0 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>);
    case "Grammarly":
      return wrap("teal", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>);
    case "Jasper":
      return wrap("orange", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 10h6M9 14h4" stroke="#D97757" strokeWidth="2" strokeLinecap="round"/></svg>);
    case "Synthesia":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>);
    case "HeyGen":
      return wrap("blue", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><polygon points="18,4 22,7 18,10"/></svg>);
    case "Lindy AI":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="20" cy="12" r="2"/></svg>);
    case "Replit AI":
      return wrap("orange", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><rect x="6" y="3" width="12" height="5.5" rx="1.5"/><rect x="6" y="9.5" width="12" height="5.5" rx="1.5" opacity="0.7"/><rect x="6" y="16" width="12" height="5" rx="1.5" opacity="0.4"/></svg>);
    case "Pika":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><polygon points="6,3 18,12 6,21"/></svg>);
    case "Copy.ai":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>);
    case "Superhuman":
      return wrap("blue", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M22 6L12 13 2 6"/></svg>);
    case "Leonardo AI":
      return wrap("purple", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>);
    case "Udio":
      return wrap("black", <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 3v18M8 6v12M4 9v6M16 6v12M20 9v6"/></svg>);
    default:
      return wrap("black", <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.36 }}>{name.charAt(0)}</span>);
  }
}

// ── Custom TopBar matching reference design ──
function GPTopBar() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[250px] h-[60px] bg-white border-b border-[#EBEBEB] z-30 flex items-center gap-2 sm:gap-4 px-2 sm:px-5">
      <button className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] flex-shrink-0" aria-label="Menu">
        <svg width="20" height="20" fill="none" stroke="#4B5563" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {/* Center search */}
      <div className="flex-1 max-w-[200px] sm:max-w-[560px] mx-auto relative min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2.5 h-11 px-3 sm:px-4 rounded-full border border-[#EBEBEB] bg-[#FAFAFA] overflow-hidden">
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="flex-1 bg-transparent outline-none text-[13px] text-[#1F2430] placeholder:text-[#9CA3AF] truncate min-w-0" placeholder="Search startups, products, investors, jobs and news" />
          <kbd className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded border border-[#E5E7EB] bg-white text-[11px] text-[#9CA3AF]">/</kbd>
          <button className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EF3050" }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors">
          <svg width="18" height="18" fill="none" stroke="#4B5563" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#EF3050] text-white text-[9px] font-bold flex items-center justify-center">12</span>
        </button>
        <button className="flex items-center gap-1.5">
          <img src="https://i.pravatar.cc/64?img=12" alt="Profile" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
          <svg className="hidden sm:block" width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
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
  { label: "All", svg: (<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>) },
  { label: "Chat", svg: (<path d="M21 11.5a8.4 8.4 0 0 1-9.8 8.3 8.6 8.6 0 0 1-3.2-1.2L3 20l1.4-4.9A8.4 8.4 0 1 1 21 11.5Z"/>) },
  { label: "Code", svg: (<path d="m9 18-6-6 6-6M15 6l6 6-6 6"/>) },
  { label: "Agents", svg: (<><circle cx="12" cy="7.5" r="3.3"/><path d="M5 20c0-3.6 3-6.2 7-6.2s7 2.6 7 6.2"/></>) },
  { label: "Image", svg: (<><rect x="3" y="4.5" width="18" height="15" rx="2.2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5.5-5.5 3 3L18 10l3 4"/></>) },
  { label: "Video", svg: (<><rect x="2.5" y="6.5" width="13" height="11" rx="2"/><path d="m15.5 10.5 5-3v9l-5-3"/></>) },
  { label: "Voice", svg: (<><rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/></>) },
  { label: "Productivity", svg: (<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7M3 12h18"/></>) },
  { label: "More", svg: null, hasArrow: true },
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
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        /* Airbnb-feel typography */
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        h1, h2, h3, h4 { letter-spacing: -0.4px; color: #111827; }
        p, span, div { letter-spacing: -0.1px; }
        button { letter-spacing: -0.1px; font-weight: 600; }

        html, body { overflow-x: hidden; }

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
            <section className="px-4 pt-8 pb-6 sm:px-6 sm:pt-10 sm:pb-8 lg:px-10" style={{ background: "linear-gradient(160deg, #FFFCFB 0%, #FFF6F4 50%, #FFFCFB 100%)" }}>
              <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
                {/* Mobile-only orbit web */}
                <div className="lg:hidden relative w-[300px] h-[300px] mx-auto mb-2 flex-shrink-0">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 360" style={{ zIndex: 0 }}>
                    <circle cx="210" cy="180" r="70" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.8" />
                    <circle cx="210" cy="180" r="110" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.65" />
                    <circle cx="210" cy="180" r="150" fill="none" stroke="#FBD4D4" strokeWidth="1" opacity="0.5" />
                    {/* Spokes — pre-calculated */}
                    <line x1="210" y1="180" x2="360" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="339.9" y2="105" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="50.1" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="30" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="50.1" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80.1" y2="105" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="60" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80.1" y2="255" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="309.9" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="330" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="309.9" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="339.9" y2="255" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    {/* Inner ring (r=70) — light red */}
                    {[[280,180],[270.6,145],[245,119.4],[210,110],[175,119.4],[149.4,145],[140,180],[149.4,215],[175,240.6],[210,250],[245,240.6],[270.6,215]].map(([x,y], i) => (
                      <circle key={`min${i}`} cx={x} cy={y} r="2.1" fill="#F4A9B5" opacity="0.65" />
                    ))}
                    {/* Middle ring (r=110) — bright red */}
                    {[[320,180],[305.3,125],[265,84.7],[210,70],[155,84.7],[114.7,125],[100,180],[114.7,235],[155,275.3],[210,290],[265,275.3],[305.3,235]].map(([x,y], i) => (
                      <circle key={`mmid${i}`} cx={x} cy={y} r="2.7" fill="#EF3050" opacity="0.85" />
                    ))}
                    {/* Outer ring (r=150) — bright red */}
                    {[[360,180],[339.9,105],[285,50.1],[210,30],[135,50.1],[80.1,105],[60,180],[80.1,255],[135,309.9],[210,330],[285,309.9],[339.9,255]].map(([x,y], i) => (
                      <circle key={`mout${i}`} cx={x} cy={y} r="3" fill="#EF3050" opacity="0.95" />
                    ))}
                  </svg>
                  {/* Red glow */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full" style={{ background: "radial-gradient(circle, rgba(239,48,80,.2) 0%, rgba(239,48,80,.06) 50%, transparent 72%)", zIndex: 1 }} />
                  {/* White hexagon frame + red hexagon inside */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ zIndex: 3 }}>
                    <div className="w-[76px] h-[76px] flex items-center justify-center bg-white" style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)", boxShadow: "0 10px 24px rgba(255,90,95,.15)" }}>
                      <div className="w-[58px] h-[58px] flex items-center justify-center" style={{ background: "linear-gradient(150deg, #FF6B6F 0%, #EF3050 58%, #E0454B 100%)", clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)", boxShadow: "0 8px 20px rgba(239,48,80,.45)" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2"/></svg>
                      </div>
                    </div>
                  </div>
                  {/* Mobile logo cards */}
                  <div className="absolute top-[2px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-xl shadow-sm border border-[#F4E3E3]" style={{ zIndex: 4 }}>
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=openai.com" alt="OpenAI" className="w-5 h-5 rounded" />
                    <span className="text-[10px] font-medium text-[#6B7280]">OpenAI</span>
                  </div>
                  <div className="absolute top-[75px] left-[6px] flex flex-col items-center gap-1 px-2 py-1.5 bg-white rounded-xl shadow-sm border border-[#F4E3E3]" style={{ zIndex: 4 }}>
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=anthropic.com" alt="Anthropic" className="w-5 h-5 rounded" />
                    <span className="text-[9px] font-medium text-[#6B7280]">Anthropic</span>
                  </div>
                  <div className="absolute top-[75px] right-[6px] flex flex-col items-center gap-1 px-2 py-1.5 bg-white rounded-xl shadow-sm border border-[#FBD0D0]" style={{ zIndex: 4 }}>
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=cursor.sh" alt="Cursor" className="w-5 h-5 rounded" />
                    <span className="text-[9px] font-medium text-[#6B7280]">Cursor</span>
                  </div>
                  <div className="absolute bottom-[6px] left-[30px] flex flex-col items-center gap-1 px-2 py-1.5 bg-white rounded-xl shadow-sm border border-[#F4E3E3]" style={{ zIndex: 4 }}>
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=midjourney.com" alt="Midjourney" className="w-5 h-5 rounded" />
                    <span className="text-[9px] font-medium text-[#6B7280]">Midjourney</span>
                  </div>
                  <div className="absolute bottom-[6px] right-[30px] flex flex-col items-center gap-1 px-2 py-1.5 bg-white rounded-xl shadow-sm border border-[#F4E3E3]" style={{ zIndex: 4 }}>
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=perplexity.ai" alt="Perplexity" className="w-5 h-5 rounded" />
                    <span className="text-[9px] font-medium text-[#6B7280]">Perplexity</span>
                  </div>
                </div>

                {/* Hero Text */}
                <div className="flex-1 max-w-[600px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4"
                    style={{ background: "#FFF0F0", color: "#EF3050" }}>
                    <span className="w-2 h-2 rounded-full bg-[#EF3050] animate-pulse" />
                    LIVE AI INTELLIGENCE
                  </div>
                  <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-[1.1] text-[#111827] mb-3" style={{ letterSpacing: "-1.5px" }}>
                    The Global Intelligence<br />Layer <span style={{ color: "#EF3050" }}>for AI.</span>
                  </h1>
                  <p className="text-[16px] sm:text-[17px] text-[#6B7280] leading-relaxed mb-6">
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
                          <img src={`https://www.google.com/s2/favicons?sz=32&domain=${term.domain}`} alt={term.name} className="w-[18px] h-[18px] rounded-[4px]" />
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
                    {/* radial spokes — exact 30° increments, endpoints on outer ring */}
                    <line x1="210" y1="180" x2="360" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="339.9" y2="105" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="50.1" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="30" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="50.1" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80.1" y2="105" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="60" y2="180" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="80.1" y2="255" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="135" y2="309.9" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="210" y2="330" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="285" y2="309.9" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    <line x1="210" y1="180" x2="339.9" y2="255" stroke="#FBD4D4" strokeWidth="0.8" opacity="0.6" />
                    {/* web intersection dots — polar grid, 12 spokes × 3 rings */}
                    {/* inner ring (r=70) — light red */}
                    {[[280,180],[270.6,145],[245,119.4],[210,110],[175,119.4],[149.4,145],[140,180],[149.4,215],[175,240.6],[210,250],[245,240.6],[270.6,215]].map(([x,y], i) => (
                      <circle key={`in${i}`} cx={x} cy={y} r="2.1" fill="#F4A9B5" opacity="0.65" />
                    ))}
                    {/* middle ring (r=110) — bright red */}
                    {[[320,180],[305.3,125],[265,84.7],[210,70],[155,84.7],[114.7,125],[100,180],[114.7,235],[155,275.3],[210,290],[265,275.3],[305.3,235]].map(([x,y], i) => (
                      <circle key={`mid${i}`} cx={x} cy={y} r="2.7" fill="#EF3050" opacity="0.85" />
                    ))}
                    {/* outer ring (r=150) — bright red */}
                    {[[360,180],[339.9,105],[285,50.1],[210,30],[135,50.1],[80.1,105],[60,180],[80.1,255],[135,309.9],[210,330],[285,309.9],[339.9,255]].map(([x,y], i) => (
                      <circle key={`out${i}`} cx={x} cy={y} r="3" fill="#EF3050" opacity="0.95" />
                    ))}
                  </svg>

                  {/* Center red glow — soft even spread behind white hex */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full" style={{ background: "radial-gradient(circle, rgba(239,48,80,.25) 0%, rgba(255,100,120,.14) 35%, rgba(255,150,160,.06) 60%, transparent 80%)", zIndex: 2 }} />

                  {/* Center hexagon — white frame holding the glowing red hexagon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ zIndex: 3, filter: "drop-shadow(0 0 20px rgba(239,48,80,.35)) drop-shadow(0 0 40px rgba(239,48,80,.15))" }}>
                    <div className="w-[120px] h-[120px] flex items-center justify-center bg-white" style={{
                      clipPath: "polygon(50% 3%, 90% 25%, 90% 75%, 50% 97%, 10% 75%, 10% 25%)",
                      borderRadius: "8px",
                      boxShadow: "0 16px 40px rgba(239,48,80,.15)",
                    }}>
                      <div className="w-[82px] h-[82px] flex items-center justify-center" style={{
                        background: "linear-gradient(155deg, #FF6B6F 0%, #EF3050 45%, #E8354A 100%)",
                        clipPath: "polygon(50% 3%, 90% 25%, 90% 75%, 50% 97%, 10% 75%, 10% 25%)",
                        borderRadius: "6px",
                      }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Logo cards positioned around the web */}
                  {/* OpenAI — top center (horizontal pill) */}
                  <div className="gp-orbit-logo absolute top-[6px] left-1/2 -translate-x-1/2 flex flex-row items-center gap-3 px-5 py-3.5 bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 8px 22px rgba(40,20,30,0.08)", border: "1px solid #F4E3E3" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#15161A"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                    <span className="text-[15px] font-semibold text-[#374151]">OpenAI</span>
                  </div>

                  {/* Anthropic — upper left */}
                  <div className="gp-orbit-logo absolute top-[104px] left-[0px] flex flex-col items-center justify-center gap-2 w-[112px] h-[104px] bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 8px 22px rgba(40,20,30,0.08)", border: "1px solid #F4E3E3" }}>
                    <svg width="46" height="34" viewBox="0 0 56 40" fill="none"><text x="0" y="33" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="40" fill="#15161A">A\</text></svg>
                    <span className="text-[13px] font-medium text-[#6B7280]">Anthropic</span>
                  </div>

                  {/* Cursor — upper right (highlighted) */}
                  <div className="gp-orbit-logo absolute top-[104px] right-[0px] flex flex-col items-center justify-center gap-2 w-[112px] h-[104px] bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 8px 24px rgba(255,90,95,.16)", border: "1.5px solid #FBD0D0" }}>
                    <svg width="40" height="44" viewBox="0 0 48 52" fill="none">
                      <path d="M24 2 44 13.5v25L24 50 4 38.5v-25L24 2Z" fill="#0E0E11" />
                      <path d="M24 9 38 17 24 25 10 17 24 9Z" fill="#F4F4F5" />
                      <path d="M10 17v18l14 8V25L10 17Z" fill="#B9BBC2" />
                      <path d="M38 17v18l-14 8V25l14-8Z" fill="#E3E4E8" />
                    </svg>
                    <span className="text-[13px] font-medium text-[#6B7280]">Cursor</span>
                  </div>

                  {/* Midjourney — lower left */}
                  <div className="gp-orbit-logo absolute bottom-[0px] left-[42px] flex flex-col items-center justify-center gap-2 w-[112px] h-[104px] bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 8px 22px rgba(40,20,30,0.08)", border: "1px solid #F4E3E3" }}>
                    <svg width="46" height="40" viewBox="0 0 24 22" fill="none" stroke="#15161A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v11" />
                      <path d="M12 3 6 14h6V3Z" />
                      <path d="M12 5.5 16.5 14H12V5.5Z" />
                      <path d="M3 17c1.1-1 2.2-1 3.3 0 1.1 1 2.2 1 3.3 0 1.1-1 2.2-1 3.3 0 1.1 1 2.2 1 3.3 0 1.1-1 2.2-1 3.3 0" />
                      <path d="M4.5 20h15" />
                    </svg>
                    <span className="text-[13px] font-medium text-[#6B7280]">Midjourney</span>
                  </div>

                  {/* Perplexity — lower right */}
                  <div className="gp-orbit-logo absolute bottom-[0px] right-[42px] flex flex-col items-center justify-center gap-2 w-[112px] h-[104px] bg-white rounded-2xl shadow-sm" style={{ zIndex: 2, boxShadow: "0 8px 22px rgba(40,20,30,0.08)", border: "1px solid #F4E3E3" }}>
                    <svg width="42" height="42" viewBox="0 0 48 48">
                      <rect x="2" y="2" width="44" height="44" rx="13" fill="#0E0E11" />
                      <circle cx="16" cy="16" r="2.2" fill="white" /><circle cx="24" cy="16" r="2.2" fill="white" /><circle cx="32" cy="16" r="2.2" fill="white" />
                      <circle cx="16" cy="24" r="2.2" fill="white" /><circle cx="24" cy="24" r="2.2" fill="white" /><circle cx="32" cy="24" r="2.2" fill="white" />
                      <circle cx="16" cy="32" r="2.2" fill="white" /><circle cx="24" cy="32" r="2.2" fill="white" /><circle cx="32" cy="32" r="2.2" fill="white" />
                    </svg>
                    <span className="text-[13px] font-medium text-[#6B7280]">Perplexity</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Collection of the Week Banner — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
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
                      <img src="https://i.pravatar.cc/56?img=1" alt="" className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 object-cover" />
                      <img src="https://i.pravatar.cc/56?img=5" alt="" className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 object-cover" />
                      <img src="https://i.pravatar.cc/56?img=8" alt="" className="w-7 h-7 rounded-full border-2 border-white flex-shrink-0 object-cover" />
                      <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9.5px] font-bold text-white flex-shrink-0" style={{ background: "#262730" }}>+2K</div>
                    </div>
                    <span className="text-[13px]" style={{ color: "#74778A" }}>2,341 products</span>
                  </div>
                </div>

                <button onClick={() => setActiveCategory("Code")} className="gp-btn lg:hidden inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold text-white" style={{ background: "#EF3050", boxShadow: "0 8px 18px rgba(239,48,80,0.28)" }}>
                  Explore Collection
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>

                {/* Mock code editor screenshot + Explore button (right column) */}
                <div className="hidden lg:flex flex-col items-end flex-shrink-0 gap-4">
                  <div className="relative w-[260px] h-[130px]">
                    {/* Light card 1 — hexagon + lines + Generate pill */}
                    <div className="absolute left-0 top-0 w-[120px] h-[120px] bg-white rounded-xl shadow-md overflow-hidden border border-[#EFEDF0]">
                      <div className="flex gap-1 p-2.5 pb-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"/>
                        <div className="w-2 h-2 rounded-full bg-[#FFC857]"/>
                        <div className="w-2 h-2 rounded-full bg-[#3FBF7F]"/>
                      </div>
                      <div className="px-2.5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#8B4DF6"><path d="M12 2 21 7 12 12 3 7l9-5Z"/></svg>
                          <div className="h-1.5 rounded bg-[#EFEFF3] flex-1"/>
                        </div>
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-4/5"/>
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-2 w-3/5"/>
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[7px] font-bold text-white" style={{ background: "#8B4DF6" }}>
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                          Generate
                        </div>
                      </div>
                    </div>
                    {/* Light card 2 — code/file preview */}
                    <div className="absolute left-[130px] top-[8px] w-[120px] h-[120px] bg-white rounded-xl shadow-md overflow-hidden border border-[#EFEDF0]">
                      <div className="flex gap-1 p-2.5 pb-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"/>
                        <div className="w-2 h-2 rounded-full bg-[#FFC857]"/>
                        <div className="w-2 h-2 rounded-full bg-[#3FBF7F]"/>
                      </div>
                      <div className="px-2.5">
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-4/5"/>
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-3/5"/>
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-1.5 w-4/5"/>
                        <div className="h-1.5 rounded bg-[#EFEFF3] mb-2 w-2/5"/>
                        <div className="flex justify-center mt-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF3050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                        </div>
                      </div>
                    </div>
                    {/* Floating white circular badge with purple </> at the seam */}
                    <div className="absolute left-[112px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center z-10 border border-[#EFEDF0]">
                      <span className="text-[#8B4DF6] font-mono text-[12px] font-bold">&lt;/&gt;</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveCategory("Code")} className="gp-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold text-white"
                    style={{ background: "#EF3050", boxShadow: "0 8px 18px rgba(239,48,80,0.28)" }}>
                    Explore Collection
                    <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                </div>
              </div>
            </section>
            )}

            {/* Category Tabs */}
            <section className="px-4 sm:px-6 lg:px-10 mb-5 sm:mb-6">
              <div className="relative">
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
                    <span style={{ color: activeCategory === cat.label ? "#EF3050" : "#9498A6" }}>
                      {cat.svg && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{cat.svg}</svg>
                      )}
                    </span>
                    {cat.label}
                    {(cat as any).hasArrow && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    )}
                  </button>
                ))}
              </div>
                <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
              </div>
            </section>

            {/* Popular Right Now — hide when searching */}
            {!searchQuery.trim() && (
            <section className="px-6 lg:px-10 mb-6 relative">
              <div className="flex items-center gap-2 mb-3.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF3050"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>
                <span className="text-[13px] font-bold uppercase tracking-wide text-[#15161A]">POPULAR RIGHT NOW</span>
              </div>
              <div id="popular-scroll" className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {popularNow.map((item) => (
                  <div key={item.name} className="gp-pop flex items-center gap-2.5 flex-shrink-0 px-3.5 py-2.5 bg-white border border-[#EFEDF0] rounded-xl cursor-pointer hover:border-[#D0D0D0] transition-colors" style={{ minWidth: "150px" }}>
                    <img src={`https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`} alt={item.name} className="w-9 h-9 rounded-[10px]" />
                    <div>
                      <div className="text-[13px] font-bold text-[#15161A]">{item.name}</div>
                      <div className="text-[11.5px] text-[#9498A6]">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll arrow */}
              <button onClick={() => { const el = document.getElementById("popular-scroll"); if (el) el.scrollBy({ left: 200, behavior: "smooth" }); }} className="absolute right-4 top-[52px] w-7 h-7 rounded-full bg-white border border-[#E8E9EE] flex items-center justify-center shadow-sm hover:bg-[#F9F9FB]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74778A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
              </button>
            </section>
            )}

            {/* Sort Bar */}
            <section className="px-4 sm:px-6 lg:px-10 mb-4">
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
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors min-h-[44px] ${
                      activeSort === "popular" ? "text-[#EF3050] bg-[#FFF1F3]" : "text-[#74778A] hover:text-[#15161A]"
                    }`}
                  >
                    🔥 Most Popular
                  </button>
                  <button
                    onClick={() => setActiveSort("newest")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors min-h-[44px] ${
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
            <section className="px-4 sm:px-6 lg:px-10 pb-10">
              {filteredProducts.map((product, index) => (
                <div key={product.id}>
                  {/* Product Row */}
                  <Link href={`/products/${product.slug}`} className="gp-row gp-fade flex items-start sm:items-center gap-3 sm:gap-4 py-3.5 border-b border-[#EFEDF0] px-1 rounded-lg cursor-pointer group" style={{ textDecoration: "none", color: "inherit" }}>
                    {/* Logo */}
                    <div className="gp-logo flex-shrink-0">
                      <img src={`https://www.google.com/s2/favicons?sz=128&domain=${product.domain}`} alt={product.name} className="w-[36px] h-[36px] sm:w-[46px] sm:h-[46px] rounded-[10px] sm:rounded-[13px]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                        <span className="gp-name text-[14px] sm:text-[15px] font-bold text-[#15161A]">{product.name}</span>
                      </div>
                      <p className="text-[12px] sm:text-[13px] text-[#74778A] mb-1.5 sm:mb-2 line-clamp-1 sm:line-clamp-none">{product.tagline}</p>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {product.categories.map((cat: string) => (
                          <span key={cat} className="px-2.5 py-0.5 rounded-[7px] text-[11.5px] font-semibold" style={{ background: "#EEF1F8", color: "#5C6B8A" }}>
                            {cat}
                          </span>
                        ))}
                        {product.badge && (() => {
                          const isPurple = product.badge.includes("Top rated") || product.badge.includes("Fastest growing");
                          return (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold"
                              style={isPurple ? { background: "#F1ECFE", color: "#7C3AED" } : { background: "#E7F8EF", color: "#13A555" }}>
                              {product.badge}
                            </span>
                          );
                        })()}
                      </div>
                      {/* Mobile stats */}
                      <div className="sm:hidden flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[12px] font-semibold text-[#5B5E68]">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#EF3050" stroke="#EF3050" strokeWidth="1.5"><path d="M12 20s-7-4.4-9.5-9A5.4 5.4 0 0 1 12 5.7 5.4 5.4 0 0 1 21.5 11c-2.5 4.6-9.5 9-9.5 9Z"/></svg>
                          {product.likes}
                        </span>
                        <span className="flex items-center gap-1 text-[12px] font-semibold text-[#5B5E68]">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9498A6" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 1 1-3.4-6.8L21 3.5v5h-5"/></svg>
                          {product.comments}
                        </span>
                      </div>
                    </div>

                    {/* Stats — horizontal, hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
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
                    <div className="my-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[#ECE2FB] px-5 py-4"
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
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white flex-shrink-0 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap justify-center sm:justify-start"
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

              {/* Mobile sidebar widgets */}
              <div className="xl:hidden mt-10 space-y-6">
                {/* Product of the Day */}
                <div className="p-5 rounded-[18px] border border-[#EFEDF0]" style={{ background: "var(--white, #fff)" }}>
                  <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-3.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#F0A23A"><path d="M7 3h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3Z"/><path d="M7 4H4a3 3 0 0 0 3 4M17 4h3a3 3 0 0 1-3 4"/><path d="M12 11v3M9 19h6l-1-3H10l-1 3Z"/></svg>
                    Product of the Day
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-[13px] border border-[#EFEDF0] mb-3" style={{ background: "linear-gradient(135deg,#FFF9F5,#FFF4F1)" }}>
                    <img src="https://www.google.com/s2/favicons?sz=128&domain=cursor.sh" alt="Cursor" className="w-[44px] h-[44px] rounded-[12px]" />
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
                <div className="p-5 rounded-[18px] border border-[#EFEDF0]">
                  <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-3.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF3050" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17 9 11 13 15 21 7"/><path d="M15 7h6v6"/></svg>
                    Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <span key={term} onClick={() => setSearchQuery(term)} className="px-3 py-1.5 rounded-full text-[12.5px] font-medium cursor-pointer transition-colors" style={{ background: "#F4EFFE", color: "#5B5E68" }}>
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stay ahead in AI */}
                <div className="p-5 rounded-[18px] border border-[#EFEDF0]">
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
              </div>
            </section>
          </div>

          {/* Right Sidebar — aligned with Vibe Coding Tools section */}
          <aside className="hidden xl:block w-[310px] flex-shrink-0 border-l border-[#EFEDF0] pl-5 pr-2 pt-0">
            {/* Spacer to align with collection banner level */}
            <div className="h-[460px]"></div>
            {/* Product of the Day */}
            <div className="mb-6 p-5 rounded-[18px] border border-[#EFEDF0]" style={{ background: "var(--white, #fff)" }}>
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#15161A] mb-3.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F0A23A"><path d="M7 3h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3Z"/><path d="M7 4H4a3 3 0 0 0 3 4M17 4h3a3 3 0 0 1-3 4"/><path d="M12 11v3M9 19h6l-1-3H10l-1 3Z"/></svg>
                Product of the Day
              </div>
              <div className="flex items-center gap-3 p-3 rounded-[13px] border border-[#EFEDF0] mb-3" style={{ background: "linear-gradient(135deg,#FFF9F5,#FFF4F1)" }}>
                <img src="https://www.google.com/s2/favicons?sz=128&domain=cursor.sh" alt="Cursor" className="w-[44px] h-[44px] rounded-[12px]" />
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
                  <span key={term} onClick={() => setSearchQuery(term)} className="px-3 py-1.5 rounded-full text-[12.5px] font-medium cursor-pointer transition-colors" style={{ background: "#F4EFFE", color: "#5B5E68" }}>
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
              <p className="text-[12px] text-[#9498A6] leading-relaxed">© 2026 GraphOne.<br />All rights reserved.</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
