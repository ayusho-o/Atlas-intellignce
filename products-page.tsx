"use client";
// @ts-nocheck
import React, { useState, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

/* =====================================================================
   GraphOne — /products page (AI Products Directory), v3
   -----------------------------------------------------------------
   v2 → v3 changes, sourced from a direct teardown of Toolify,
   Product Hunt, and BetaList (see notes inline):

   FROM TOOLIFY
   - A live result counter ("city + N tools" / "showing X of Y") so the
     catalog reads as a real database, not a static grid.
   - A "Free" pill on free tools, since price is the #1 filter people
     actually use on a tool directory.
   - A persistent left-rail category list (counts included) instead of
     only top pills, matching Toolify's nav density.

   FROM PRODUCT HUNT
   - Daily leaderboard ranking with a rank number, a launch-day
     grouping ("Today" / "This Week"), and TWO metrics per card
     (upvotes + comments) instead of one.
   - A small "Promoted" slot pattern: one sponsored card pinned at the
     top of the feed, visually distinct (outlined, labeled), same as
     PH's promoted-row treatment.
   - Topic chips per-card (multiple per product) rather than one
     category tag, since real tools span categories.

   FROM BETALIST
   - A chronological "Today / Yesterday / Earlier this week" feed mode
     as an alternate view, with a "Boosted" badge for paid placements.
   - A compact one-line list row style for that feed (logo + name +
     one-line tagline), distinct from the card grid.

   Design pass notes (per frontend-design skill):
   - Kept GraphOne's existing brand red (#FF5A5F) / dark ink palette,
     since that's the established identity — the job here is
     structural (information density, ranking, filtering), not a
     restyle. Token system below documents what was already implied
     by COLORS/GRADIENTS in v2 plus a few additions for rank/boost UI.
   - Display face stays system sans (unchanged), but rank numerals use
     a tabular-number treatment so the leaderboard column aligns.
   - Signature element: the "Pulse" rail — a thin vertical timeline
     down the left of the feed view connecting day-group dots, doing
     for this directory what BetaList's strict reverse-chron list does,
     but visualized rather than just typeset.

   Wire-up notes for atlas-frontend (unchanged from v2): swap
   PlaceholderSidebar/PlaceholderTopBar for the real ones, move
   PRODUCTS into data/products.ts. Logos remain generic monogram tiles;
   real product/company names stay as plain text only.
===================================================================== */

const COLORS = {
  red: "#FF5A5F",
  redDeep: "#E0454B",
  dark: "#1F2430",
  gray: "#9CA3AF",
  bg: "#F7F7F7",
  border: "#EBEBEB",
  hover: "#FAFAFA",
  gold: "#CA8A04",
  boost: "#7C3AED",
};

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

/* ---------------------------- icons ---------------------------- */
const I = {
  fire: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M10 2c1 2.5-1 3.5-1 5.5 0 1 .8 1.5 1.5 1.5 1 0 1.5-1 1.5-2 2 1.5 3 3.5 3 5.5a5 5 0 11-10 0c0-3 1.5-4.5 2.5-6.5C8.3 4.5 9.2 3 10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
  grid: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><rect x="3" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5"/></svg>),
  chat: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M3 9.5a6 6 0 016-6h2a6 6 0 010 12H7l-3 2.5v-3.2A6 6 0 013 9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>),
  code: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M7 5L3 10l4 5M13 5l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  image: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="8.5" r="1.3" stroke="currentColor" strokeWidth="1.3"/><path d="M4 14l4-4 3 3 2.5-2.5L16 14" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>),
  play: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 7.5l4.5 2.5-4.5 2.5v-5z" fill="currentColor"/></svg>),
  wave: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M2 10h2M5 6v8M8 4v12M11 7v6M14 5v10M17 9v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>),
  target: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="0.8" fill="currentColor"/></svg>),
  search: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6"/><path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  pencil: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M4 16l1-4 9-9 3 3-9 9-4 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
  doc: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><rect x="4" y="3" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>),
  note: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><circle cx="6" cy="15" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="14" cy="13" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M8 15V5l8-1.5v9.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
  bolt: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M11 2L4 12h5l-1 6 8-10h-5l1-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
  bars: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M4 16V11M9 16V6M14 16V9M17 16V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  sparkle: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M10 2l1.4 4.6L16 8l-4.6 1.4L10 14l-1.4-4.6L4 8l4.6-1.4L10 2z" fill="currentColor"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  upvote: ({ filled, ...p }) => (<svg viewBox="0 0 20 20" {...p}><path d="M10 4L17 14H3L10 4Z" fill={filled ? COLORS.red : "none"} stroke={filled ? COLORS.red : COLORS.gray} strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  comment: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M3 8.5a5.5 5.5 0 015.5-5.5h3A5.5 5.5 0 0117 8.5v0a5.5 5.5 0 01-5.5 5.5H8l-3.5 2.5v-2.8A5.5 5.5 0 013 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>),
  rocket: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M10 2c2 1 4 4 4 7.5 0 2-.7 3.5-1.3 4.5L10 16l-2.7-2c-.6-1-1.3-2.5-1.3-4.5C6 6 8 3 10 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="10" cy="8.5" r="1.3" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 14l-1.8 3M12.5 14l1.8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  calendar: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><rect x="3" y="4.5" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 8h14M6.5 3v3M13.5 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>),
  chevDown: (p) => (<svg viewBox="0 0 20 20" fill="none" {...p}><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

/* ---------------------------- categories ---------------------------- */
const CATEGORIES = [
  { id: "all", label: "All", icon: I.grid },
  { id: "chat", label: "Chat", icon: I.chat },
  { id: "code", label: "Code", icon: I.code },
  { id: "image", label: "Image", icon: I.image },
  { id: "video", label: "Video", icon: I.play },
  { id: "voice", label: "Voice", icon: I.wave },
  { id: "productivity", label: "Productivity", icon: I.target },
  { id: "search", label: "Search", icon: I.search },
  { id: "design", label: "Design", icon: I.pencil },
  { id: "writing", label: "Writing", icon: I.doc },
  { id: "music", label: "Music", icon: I.note },
  { id: "agents", label: "Agents", icon: I.bolt },
  { id: "data", label: "Data", icon: I.bars },
];

const TAG_STYLE = {
  chat: { bg: "#DBEAFE", color: "#2563EB" },
  code: { bg: "#DCFCE7", color: "#16A34A" },
  image: { bg: "#EDE9FE", color: "#7C3AED" },
  video: { bg: "#FFE4E6", color: "#E11D48" },
  voice: { bg: "#FFEDD5", color: "#EA580C" },
  productivity: { bg: "#FEF9C3", color: "#CA8A04" },
  search: { bg: "#CFFAFE", color: "#0891B2" },
  design: { bg: "#FCE7F3", color: "#DB2777" },
  writing: { bg: "#E0E7FF", color: "#4F46E5" },
  music: { bg: "#FAE8FF", color: "#A21CAF" },
  agents: { bg: "#FEE2E2", color: "#DC2626" },
  data: { bg: "#E0F2FE", color: "#0369A1" },
};

// Secondary topic chips per product (PH-style multi-topic), independent
// of the primary category so cards can show real cross-cutting tags.
const TOPIC_CHIPS = {
  chat: ["Assistant", "Multimodal"],
  code: ["Dev Tools", "Pair Programming"],
  image: ["Generative", "Creative Tools"],
  video: ["Generative", "Creator Tools"],
  voice: ["Speech", "Audio"],
  productivity: ["Workflow", "Calendar"],
  search: ["Answer Engine", "Research"],
  design: ["UI/UX", "No-Code"],
  writing: ["Copywriting", "Content"],
  music: ["Audio", "Generative"],
  agents: ["Autonomous", "Automation"],
  data: ["Analytics", "BI"],
};

const GRADIENTS = [
  "linear-gradient(135deg,#D1FAE5,#A7F3D0)",
  "linear-gradient(135deg,#FFE8D6,#FFD1A9)",
  "linear-gradient(135deg,#FDE68A,#FCA5A5)",
  "linear-gradient(135deg,#DBEAFE,#E0E7FF)",
  "linear-gradient(135deg,#FFE4E6,#FECACA)",
  "linear-gradient(135deg,#EDE9FE,#DDD6FE)",
  "linear-gradient(135deg,#FEF9C3,#D9F99D)",
  "linear-gradient(135deg,#CFFAFE,#BAE6FD)",
];

/* ---------------------------- catalog (50 real, well-known AI products) ---------------------------- */
const RAW = [
  ["ChatGPT", "OpenAI", "chat", "A conversational assistant for writing, brainstorming, and answering questions on any topic.", "https://chat.openai.com", 4200, 312, 400, false],
  ["Claude", "Anthropic", "chat", "An assistant built for long documents, careful reasoning, and natural conversation.", "https://claude.ai", 3800, 287, 380, false],
  ["Gemini", "Google", "chat", "A multimodal model that reasons across text, code, images, and video.", "https://gemini.google.com", 3100, 201, 300, false],
  ["Pi", "Inflection AI", "chat", "A personal AI designed to be supportive, curious, and easy to talk to.", "https://pi.ai", 540, 64, 250, true],
  ["Character.AI", "Character Technologies", "chat", "Chat with millions of user-created AI characters and personas.", "https://character.ai", 1200, 145, 320, false],
  ["Mistral Le Chat", "Mistral AI", "chat", "A fast, open-weight chat assistant from the Mistral research team.", "https://chat.mistral.ai", 410, 38, 120, true],
  ["GitHub Copilot", "GitHub", "code", "An AI pair programmer that suggests code and entire functions in real time.", "https://github.com/features/copilot", 2900, 264, 360, false],
  ["Cursor", "Anysphere", "code", "An AI-first code editor built around chat, edits, and codebase-wide context.", "https://cursor.sh", 1600, 198, 90, false],
  ["Replit AI", "Replit", "code", "Generates, explains, and debugs code directly inside the Replit workspace.", "https://replit.com/ai", 720, 91, 200, true],
  ["Cody", "Sourcegraph", "code", "A coding assistant that understands your whole codebase, not just the open file.", "https://sourcegraph.com/cody", 480, 52, 150, true],
  ["Tabnine", "Tabnine", "code", "Privacy-focused code completion that can run fully on your own infrastructure.", "https://tabnine.com", 360, 40, 280, true],
  ["v0", "Vercel", "code", "Generates production-ready React UI from a text prompt or screenshot.", "https://v0.dev", 980, 132, 8, false],
  ["Midjourney", "Midjourney", "image", "Creates highly stylized, artistic images from short text prompts.", "https://midjourney.com", 3300, 276, 420, false],
  ["DALL·E 3", "OpenAI", "image", "Generates detailed images from natural language descriptions.", "https://openai.com/dall-e-3", 2700, 211, 260, false],
  ["Stable Diffusion", "Stability AI", "image", "An open-weight image model that powers countless creative tools.", "https://stability.ai", 2100, 189, 400, true],
  ["Ideogram", "Ideogram AI", "image", "An image generator known for rendering legible text inside images.", "https://ideogram.ai", 690, 84, 6, true],
  ["Leonardo AI", "Leonardo Interactive", "image", "Fine-tunable image generation for game art, concept art, and design.", "https://leonardo.ai", 540, 61, 180, true],
  ["Adobe Firefly", "Adobe", "image", "Generative image and design tools built into the Adobe ecosystem.", "https://firefly.adobe.com", 610, 58, 220, true],
  ["Sora", "OpenAI", "video", "Generates realistic video clips from text, with consistent motion and scenes.", "https://openai.com/sora", 2500, 233, 4, false],
  ["Runway Gen-3", "Runway", "video", "A video generation and editing suite built for filmmakers and creators.", "https://runwayml.com", 1300, 124, 60, false],
  ["Pika", "Pika Labs", "video", "Turns text or images into short, stylized video clips.", "https://pika.art", 760, 79, 45, true],
  ["Synthesia", "Synthesia", "video", "Creates talking-head videos with AI avatars in dozens of languages.", "https://synthesia.io", 540, 49, 240, false],
  ["HeyGen", "HeyGen", "video", "Generates avatar videos for marketing, training, and localization.", "https://heygen.com", 470, 53, 70, false],
  ["Luma Dream Machine", "Luma AI", "video", "Generates short cinematic video clips from text or images.", "https://lumalabs.ai/dream-machine", 590, 67, 9, true],
  ["ElevenLabs", "ElevenLabs", "voice", "Realistic AI voice generation and cloning for narration and dubbing.", "https://elevenlabs.io", 1900, 162, 280, false],
  ["Murf AI", "Murf", "voice", "A studio for turning scripts into polished AI voiceovers.", "https://murf.ai", 410, 36, 200, true],
  ["Play.ht", "PlayHT", "voice", "Text-to-speech voices for podcasts, apps, and audio content.", "https://play.ht", 320, 29, 260, true],
  ["WellSaid Labs", "WellSaid Labs", "voice", "Enterprise-grade synthetic voices for branded audio content.", "https://wellsaidlabs.com", 210, 18, 300, false],
  ["Notion AI", "Notion", "productivity", "Writes, summarizes, and organizes notes directly inside Notion.", "https://notion.so/product/ai", 1500, 138, 320, false],
  ["Motion", "Motion", "productivity", "Automatically builds and re-plans your daily schedule around deadlines.", "https://usemotion.com", 380, 44, 140, true],
  ["Reclaim AI", "Reclaim", "productivity", "Defends focus time on your calendar and schedules tasks automatically.", "https://reclaim.ai", 290, 31, 180, true],
  ["Superhuman", "Superhuman", "productivity", "An AI-accelerated email client built for speed and inbox zero.", "https://superhuman.com", 640, 71, 360, false],
  ["Perplexity", "Perplexity AI", "search", "An answer engine that searches the web and cites its sources.", "https://perplexity.ai", 2200, 197, 200, false],
  ["Phind", "Phind", "search", "A search engine built specifically for developers and technical questions.", "https://phind.com", 380, 42, 220, true],
  ["You.com", "You.com", "search", "A search assistant that blends web results with AI-generated answers.", "https://you.com", 310, 27, 260, true],
  ["Figma AI", "Figma", "design", "AI tools built into Figma for layout, content, and design exploration.", "https://figma.com", 720, 88, 70, false],
  ["Framer AI", "Framer", "design", "Generates an editable website from a short text description.", "https://framer.com/ai", 610, 73, 110, true],
  ["Canva Magic Studio", "Canva", "design", "A suite of AI design tools built into the Canva editor.", "https://canva.com/magic-studio", 980, 102, 150, false],
  ["Galileo AI", "Galileo", "design", "Turns a text prompt into an editable, high-fidelity UI design.", "https://usegalileo.ai", 340, 39, 10, true],
  ["Jasper", "Jasper AI", "writing", "An AI writing platform built for marketing and brand content.", "https://jasper.ai", 560, 47, 300, false],
  ["Copy.ai", "Copy.ai", "writing", "Generates marketing copy, emails, and content at scale.", "https://copy.ai", 480, 41, 280, true],
  ["Grammarly", "Grammarly", "writing", "Checks tone, clarity, and grammar as you write anywhere online.", "https://grammarly.com", 1900, 154, 420, false],
  ["Writesonic", "Writesonic", "writing", "Generates articles, ads, and product copy from a short brief.", "https://writesonic.com", 300, 26, 240, true],
  ["Suno", "Suno AI", "music", "Generates full songs — vocals and instrumentals — from a text prompt.", "https://suno.com", 1400, 176, 12, false],
  ["Udio", "Udio", "music", "Creates original music tracks in a wide range of styles and genres.", "https://udio.com", 980, 119, 7, true],
  ["Devin", "Cognition AI", "agents", "An autonomous software engineer that plans, codes, and tests changes.", "https://cognition.ai", 1100, 158, 5, false],
  ["Lindy", "Lindy AI", "agents", "Builds AI agents that handle email, scheduling, and repetitive workflows.", "https://lindy.ai", 420, 56, 9, true],
  ["Glean", "Glean", "data", "An AI search layer that connects and indexes your company's apps.", "https://glean.com", 350, 33, 160, true],
  ["Julius AI", "Julius", "data", "Analyzes spreadsheets and data with plain-English chat.", "https://julius.ai", 290, 35, 30, true],
  ["Akkio", "Akkio", "data", "Builds and deploys predictive models without writing any code.", "https://akkio.com", 180, 19, 200, false],
];

const PRODUCTS = RAW.map((row, i) => {
  const [name, maker, categoryId, tagline, url, upvotes, comments, ago, isFree] = row;
  return {
    id: `prod-${i + 1}`,
    name,
    maker,
    categoryId,
    tagline,
    url,
    upvotes,
    comments,
    launchedAt: daysAgo(ago),
    isFree,
    gradient: GRADIENTS[i % GRADIENTS.length],
    monogram: name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase(),
    topics: TOPIC_CHIPS[categoryId] || [],
  };
});

// One sponsored slot pinned to the top of the feed (Product Hunt pattern).
// Visually distinct from organic results via the PROMOTED label + outline.
const PROMOTED = {
  id: "promoted-1",
  name: "Orbital API",
  maker: "Orbital",
  categoryId: "data",
  tagline: "One key, every model. Route GPT, Claude, and Gemini traffic through a single low-latency gateway.",
  url: "#",
  gradient: "linear-gradient(135deg,#1F2430,#3A4356)",
  monogram: "OA",
  topics: ["AI API", "Developer Tools"],
};

/* ---------------------------- date-bucket helpers (BetaList-style feed) ---------------------------- */
function bucketLabel(daysSince) {
  if (daysSince <= 0) return "Today";
  if (daysSince === 1) return "Yesterday";
  if (daysSince <= 7) return "Earlier This Week";
  if (daysSince <= 30) return "Earlier This Month";
  return "Older";
}

/* ---------------------------- small shared bits (rank badge, cards) ---------------------------- */

function ProductLogo({ url, monogram, size = 56 }) {
  const [failed, setFailed] = React.useState(false);
  let domain = "";
  try {
    domain = new URL(url).hostname;
  } catch { domain = ""; }

  if (failed || !domain) {
    return (
      <span style={{ fontSize: size * 0.32, fontWeight: 700, color: COLORS.dark }}>
        {monogram}
      </span>
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`}
      alt=""
      width={size * 0.62}
      height={size * 0.62}
      style={{ objectFit: "contain", display: "block" }}
      onError={() => setFailed(true)}
    />
  );
}

function RankBadge({ rank }) {
  const top3 = rank <= 3;
  return (
    <div
      className={`flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold tabular-nums flex-shrink-0 ${top3 ? "rank-top3" : ""}`}
      style={top3 ? { background: COLORS.red, color: "#fff" } : { background: "#fff", color: "#4B5563", boxShadow: "0 1px 4px rgba(0,0,0,.1)" }}
    >
      {rank}
    </div>
  );
}

function ProductCard({ product, rank, isUpvoted, onUpvote, isNew }) {
  const tag = TAG_STYLE[product.categoryId];
  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  const displayUpvotes = product.upvotes + (isUpvoted ? 1 : 0);

  return (
    <div
      className="product-card group relative flex flex-col rounded-[18px] overflow-hidden"
      style={{ border: `1px solid ${COLORS.border}`, background: "#fff" }}
    >
      {/* Gradient header with centered logo */}
      <div className="relative h-[92px] overflow-hidden flex items-center justify-center">
        <div className="card-header-bg absolute inset-0" style={{ background: product.gradient }} />
        {/* soft dark veil for contrast */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 120%, rgba(255,255,255,.35), transparent 60%)" }} />

        {/* Rank badge */}
        <div className="absolute top-3 left-3 z-10">
          <RankBadge rank={rank} />
        </div>
        {/* NEW / Free badges */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {isNew && (
            <span className="new-badge text-[9.5px] font-bold px-2 py-[3px] rounded-full" style={{ background: "rgba(255,255,255,.92)", color: COLORS.red }}>
              NEW
            </span>
          )}
          {product.isFree && (
            <span className="new-badge text-[9.5px] font-bold px-2 py-[3px] rounded-full" style={{ background: "rgba(255,255,255,.92)", color: "#16A34A" }}>
              FREE
            </span>
          )}
        </div>

        {/* Logo tile */}
        <div
          className="monogram-tile relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ background: "rgba(255,255,255,.95)", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,.8)", backdropFilter: "blur(4px)" }}
        >
          <ProductLogo url={product.url} monogram={product.monogram} size={64} />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col px-4 pt-3.5 pb-4">
        <div className="flex items-center gap-2">
          <a href={product.url} target="_blank" rel="noreferrer" className="text-[15.5px] font-bold hover:underline truncate" style={{ color: COLORS.dark }}>
            {product.name}
          </a>
        </div>
        <span className="text-[12.5px] mt-0.5" style={{ color: COLORS.gray }}>{product.maker}</span>
        <p className="text-[13px] mt-2 leading-relaxed flex-1 line-clamp-3" style={{ color: "#4B5563" }}>{product.tagline}</p>

        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: tag.bg, color: tag.color }}>
            {category?.label}
          </span>
          {product.topics.map((t) => (
            <span key={t} className="topic-chip text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: COLORS.bg, color: "#6B7280" }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <button
            onClick={() => onUpvote(product.id)}
            className="upvote-btn flex items-center gap-1.5 text-[12.5px] font-semibold px-2.5 py-1 rounded-lg"
            style={{ color: isUpvoted ? COLORS.red : COLORS.gray, background: isUpvoted ? "#FFF0F1" : "transparent" }}
          >
            <I.upvote filled={isUpvoted} className="w-3.5 h-3.5" />
            {displayUpvotes >= 1000 ? `${(displayUpvotes / 1000).toFixed(1)}k` : displayUpvotes}
          </button>
          <span className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: COLORS.gray }}>
            <I.comment className="w-3.5 h-3.5" />
            {product.comments}
          </span>
        </div>
      </div>
    </div>
  );
}

function PromotedCard({ product }) {
  return (
    <div
      className="promoted-card relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-[20px] overflow-hidden p-5 sm:p-6"
      style={{ background: "linear-gradient(120deg,#1A1E29 0%,#2A2F40 55%,#3A2030 100%)", boxShadow: "0 10px 30px rgba(31,36,48,.25)" }}
    >
      {/* glow accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 85% 30%, rgba(255,90,95,.18), transparent 55%)" }} />

      {/* Logo */}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ background: "rgba(255,255,255,.95)", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
      >
        <span className="text-[20px] font-black" style={{ color: "#1F2430" }}>{product.monogram}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full flex items-center gap-1" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.18)" }}>
            <I.sparkle className="w-2.5 h-2.5" /> Promoted
          </span>
          <span className="text-[12.5px]" style={{ color: "rgba(255,255,255,.55)" }}>{product.maker}</span>
        </div>
        <a href={product.url} className="text-[18px] sm:text-[20px] font-bold hover:underline block" style={{ color: "#fff" }}>
          {product.name}
        </a>
        <p className="text-[13px] mt-1.5 leading-relaxed max-w-[520px]" style={{ color: "rgba(255,255,255,.7)" }}>{product.tagline}</p>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {product.topics.map((t) => (
            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.8)", border: "1px solid rgba(255,255,255,.12)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href={product.url}
        className="btn-press relative z-10 flex items-center justify-center gap-1.5 text-[13px] font-semibold px-5 py-2.5 rounded-full flex-shrink-0 self-start sm:self-center"
        style={{ background: "#fff", color: "#1F2430" }}
      >
        Try it free <I.arrow className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

/* ---------------------------- BetaList-style chronological feed row ---------------------------- */
function FeedRow({ product, isUpvoted, onUpvote }) {
  const tag = TAG_STYLE[product.categoryId];
  return (
    <div className="feed-row flex items-center gap-3 py-3 group">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[12px] flex-shrink-0 overflow-hidden"
        style={{ background: "#fff", border: "1px solid #F0F0F0" }}
      >
        <ProductLogo url={product.url} monogram={product.monogram} size={36} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a href={product.url} className="text-[14px] font-bold hover:underline truncate" style={{ color: COLORS.dark }}>
            {product.name}
          </a>
          {product.isFree && (
            <span className="text-[10px] font-bold px-1.5 py-[2px] rounded-full" style={{ background: "#DCFCE7", color: "#16A34A" }}>
              Free
            </span>
          )}
          <span className="text-[10.5px] font-semibold px-2 py-[2px] rounded-full flex-shrink-0" style={{ background: tag.bg, color: tag.color }}>
            {CATEGORIES.find((c) => c.id === product.categoryId)?.label}
          </span>
        </div>
        <p className="text-[12.5px] mt-0.5 truncate" style={{ color: "#6B7280" }}>{product.tagline}</p>
      </div>
      <button
        onClick={() => onUpvote(product.id)}
        className="flex items-center gap-1 text-[12px] font-semibold flex-shrink-0 transition-transform active:scale-90"
        style={{ color: isUpvoted ? COLORS.red : COLORS.gray }}
      >
        <I.upvote filled={isUpvoted} className="w-3.5 h-3.5" />
        {product.upvotes + (isUpvoted ? 1 : 0) >= 1000 ? `${((product.upvotes + (isUpvoted ? 1 : 0)) / 1000).toFixed(1)}k` : product.upvotes + (isUpvoted ? 1 : 0)}
      </button>
    </div>
  );
}

/* ---------------------------- main page ---------------------------- */
export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // 'popular' | 'newest'
  const [freeOnly, setFreeOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'feed'
  const [upvoted, setUpvoted] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(20);

  const today = useMemo(() => daysAgo(0), []);
  const daysSince = (dateStr) => Math.round((new Date(today) - new Date(dateStr)) / 86400000);

  const toggleUpvote = (id) =>
    setUpvoted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    for (const p of PRODUCTS) counts[p.categoryId] = (counts[p.categoryId] || 0) + 1;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "all") list = list.filter((p) => p.categoryId === activeCategory);
    if (freeOnly) list = list.filter((p) => p.isFree);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.maker.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
    }
    if (sortBy === "popular") {
      list.sort((a, b) => (b.upvotes + (upvoted.has(b.id) ? 1 : 0)) - (a.upvotes + (upvoted.has(a.id) ? 1 : 0)));
    } else {
      list.sort((a, b) => new Date(b.launchedAt) - new Date(a.launchedAt));
    }
    return list;
  }, [activeCategory, query, sortBy, freeOnly, upvoted]);

  const visible = filtered.slice(0, visibleCount);

  // Group the (newest-first) feed-mode list into BetaList-style day buckets.
  const feedGroups = useMemo(() => {
    const byDate = [...filtered].sort((a, b) => new Date(b.launchedAt) - new Date(a.launchedAt));
    const groups = [];
    let currentLabel = null;
    for (const p of byDate) {
      const label = bucketLabel(daysSince(p.launchedAt));
      if (label !== currentLabel) {
        groups.push({ label, items: [] });
        currentLabel = label;
      }
      groups[groups.length - 1].items.push(p);
    }
    return groups;
  }, [filtered, today]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{scrollbar-width:none}

        /* Product card hover lift */
        .product-card {
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04) !important;
          border-color: #D0D5DD !important;
        }

        /* Upvote button pulse */
        .upvote-btn {
          transition: transform .15s ease, color .15s ease;
        }
        .upvote-btn:active {
          transform: scale(.88);
        }

        /* Feed row hover */
        .feed-row {
          transition: background .15s ease;
          border-radius: 10px;
          margin: 0 -8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        .feed-row:hover {
          background: #F8F9FB;
        }

        /* Category pill hover */
        .cat-pill {
          transition: all .15s ease;
        }
        .cat-pill:hover {
          transform: scale(1.03);
          box-shadow: 0 2px 8px rgba(0,0,0,.06);
        }

        /* Search bar focus */
        .search-bar {
          transition: box-shadow .2s ease, border-color .2s ease;
          border: 1.5px solid transparent;
        }
        .search-bar:focus-within {
          box-shadow: 0 0 0 3px rgba(255,90,95,.1);
          border-color: #FF5A5F !important;
          background: #fff !important;
        }

        /* Promoted card shimmer */
        .promoted-card {
          position: relative;
          overflow: hidden;
        }
        .promoted-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          .products-hero h1 {
            font-size: 28px !important;
          }
          .products-controls {
            flex-direction: column;
            align-items: stretch !important;
          }
          .products-controls .search-bar {
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* CTA banner hover */
        .cta-banner {
          transition: box-shadow .2s ease, transform .2s ease;
        }
        .cta-banner:hover {
          box-shadow: 0 8px 24px rgba(255,90,95,.1);
          transform: translateY(-1px);
        }

        /* ── Entrance animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .products-hero { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
        .products-controls { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) .08s both; }

        /* Staggered card entrance */
        .product-card {
          animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both;
        }
        .products-grid > *:nth-child(1)  .product-card,
        .products-grid > .product-card:nth-child(1)  { animation-delay: .02s; }
        .products-grid > .product-card:nth-child(2)  { animation-delay: .06s; }
        .products-grid > .product-card:nth-child(3)  { animation-delay: .10s; }
        .products-grid > .product-card:nth-child(4)  { animation-delay: .14s; }
        .products-grid > .product-card:nth-child(5)  { animation-delay: .18s; }
        .products-grid > .product-card:nth-child(6)  { animation-delay: .22s; }
        .products-grid > .product-card:nth-child(7)  { animation-delay: .26s; }
        .products-grid > .product-card:nth-child(8)  { animation-delay: .30s; }

        /* Gradient hero title */
        .hero-title {
          background: linear-gradient(120deg, #1F2430 0%, #FF5A5F 55%, #E0454B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* HOT badge gentle pulse */
        .hot-badge {
          animation: hotPulse 2.4s ease-in-out infinite;
        }
        @keyframes hotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,90,95,.0); }
          50%      { box-shadow: 0 0 0 4px rgba(255,90,95,.12); }
        }

        /* Rank badge for top 3 — subtle glow */
        .rank-top3 {
          box-shadow: 0 2px 8px rgba(255,90,95,.35);
        }

        /* NEW badge */
        .new-badge {
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 6px rgba(0,0,0,.08);
        }

        /* Buttons — generic press + lift */
        .btn-press { transition: transform .15s ease, box-shadow .2s ease, background .2s ease, color .2s ease; }
        .btn-press:hover { transform: translateY(-1px); }
        .btn-press:active { transform: translateY(0) scale(.97); }

        /* Outline accent button hover fill */
        .btn-outline-red { transition: all .2s ease; }
        .btn-outline-red:hover { background: #FF5A5F !important; color: #fff !important; box-shadow: 0 6px 16px rgba(255,90,95,.25); }

        /* Card image header subtle zoom */
        .card-header-bg { transition: transform .5s ease; }
        .product-card:hover .card-header-bg { transform: scale(1.1); }

        /* Logo tile pop on hover */
        .monogram-tile { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
        .product-card:hover .monogram-tile { transform: scale(1.08) translateY(-2px); }

        /* Line clamp helper */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Promoted CTA hover */
        .promoted-card .btn-press:hover { box-shadow: 0 6px 18px rgba(255,255,255,.2); }

        /* Topic chip hover */
        .topic-chip { transition: all .15s ease; }
        .topic-chip:hover { background: #F0F0F0 !important; }
      `}</style>

      <Sidebar />
      <TopBar />

      <div className="lg:pl-[250px] pt-[52px]">
        {/* Category filter rail */}
        <div className="flex items-center gap-2 px-5 sm:px-8 py-3 border-b border-[#F0F0F0] overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => {
            const active = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className="cat-pill flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[12.5px] font-medium flex-shrink-0"
                style={active ? { background: "#FEF0F0", color: "#FF5A5F", border: "1px solid #FECACA" } : { color: "#484848", border: "1px solid #EBEBEB", background: "#fff" }}
              >
                <c.icon className="w-3.5 h-3.5 flex-shrink-0" />
                {c.label}
                <span className="text-[10.5px] font-semibold tabular-nums" style={{ color: active ? "#FF5A5F" : "#9CA3AF" }}>
                  {categoryCounts[c.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <main className="flex-1 px-5 sm:px-8 py-8">
          {/* hero */}
          <div className="products-hero flex items-start justify-between gap-4 flex-wrap mb-6">
            <div>
              <span
                className="hot-badge inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full mb-3"
                style={{ background: "#FFF0F1", color: COLORS.red }}
              >
                <I.fire className="w-3 h-3" /> HOT
              </span>
              <h1 className="hero-title text-[34px] sm:text-[42px] font-bold leading-tight" style={{ color: COLORS.dark }}>
                Hottest AI Products
              </h1>
              <p className="text-[15px] mt-2 max-w-[480px]" style={{ color: COLORS.gray }}>
                Explore {PRODUCTS.length}+ of the most popular and game-changing AI products across every category.
              </p>
            </div>
            <a
              href="#"
              className="btn-outline-red btn-press flex items-center gap-1.5 text-[13.5px] font-semibold px-4 py-2.5 rounded-full flex-shrink-0"
              style={{ border: `1.5px solid ${COLORS.red}`, color: COLORS.red, background: "#fff" }}
            >
              View all products <I.arrow className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* search + sort + view toggle */}
          <div className="products-controls flex items-center gap-3 mb-3 flex-wrap">
            <div className="search-bar flex items-center gap-2 rounded-full px-4 py-2.5 flex-1 min-w-[220px] max-w-[420px]" style={{ background: COLORS.bg }}>
              <I.search className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.gray }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 50+ AI tools…"
                className="bg-transparent outline-none text-[13.5px] flex-1"
                style={{ color: COLORS.dark }}
              />
            </div>

            <button
              onClick={() => setFreeOnly((v) => !v)}
              className="btn-press flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-2 rounded-full flex-shrink-0"
              style={freeOnly ? { background: "#16A34A", color: "#fff", boxShadow: "0 4px 12px rgba(22,163,74,.25)" } : { border: `1.5px solid ${COLORS.border}`, color: "#4B5563", background: "#fff" }}
            >
              Free only
            </button>

            <div className="flex items-center rounded-full p-1 flex-shrink-0" style={{ background: COLORS.bg }}>
              {[["popular", "Most Popular"], ["newest", "Newest"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setSortBy(id)}
                  className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                  style={sortBy === id ? { background: "#fff", color: COLORS.dark, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" } : { color: COLORS.gray }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center rounded-full p-1 flex-shrink-0" style={{ background: COLORS.bg }}>
              {[["grid", "Grid"], ["feed", "Feed"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                  style={viewMode === id ? { background: "#fff", color: COLORS.dark, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" } : { color: COLORS.gray }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* live result counter */}
          <p className="text-[12.5px] mb-5" style={{ color: COLORS.gray }}>
            Showing <span className="font-semibold" style={{ color: COLORS.dark }}>{Math.min(visibleCount, filtered.length)}</span> of{" "}
            <span className="font-semibold" style={{ color: COLORS.dark }}>{filtered.length}</span> tools
            {activeCategory !== "all" && <> in <span className="font-semibold" style={{ color: COLORS.dark }}>{CATEGORIES.find((c) => c.id === activeCategory)?.label}</span></>}
          </p>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] font-semibold" style={{ color: COLORS.dark }}>No products match that search</p>
              <p className="text-[13px] mt-1" style={{ color: COLORS.gray }}>Try a different category or keyword.</p>
            </div>
          ) : viewMode === "grid" ? (
            <>
              {/* promoted slot, always pinned first, only on page 1 / no active search noise */}
              {!query.trim() && (
                <div className="mb-5">
                  <PromotedCard product={PROMOTED} />
                </div>
              )}

              <div className="products-grid grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
                {visible.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    rank={i + 1}
                    isUpvoted={upvoted.has(p.id)}
                    onUpvote={toggleUpvote}
                    isNew={daysSince(p.launchedAt) <= 14}
                  />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="flex justify-center mt-7">
                  <button
                    onClick={() => setVisibleCount((v) => v + 20)}
                    className="btn-press text-[13.5px] font-semibold px-5 py-2.5 rounded-full"
                    style={{ border: `1px solid ${COLORS.border}`, color: COLORS.dark, background: "#fff" }}
                  >
                    Show more ({filtered.length - visibleCount} more)
                  </button>
                </div>
              )}
            </>
          ) : (
            /* feed view — BetaList-style reverse-chronological list with a
               connecting "pulse" rail down the left marking each day group */
            <div className="relative max-w-2xl">
              {feedGroups.map((group, gi) => (
                <div key={group.label + gi} className="relative pl-7 mb-2">
                  <div
                    className="absolute left-[7px] top-1.5 bottom-0 w-px"
                    style={{ background: COLORS.border, display: gi === feedGroups.length - 1 ? "none" : "block" }}
                  />
                  <div className="absolute left-0 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: gi === 0 ? COLORS.red : COLORS.border }}>
                    {gi === 0 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <I.calendar className="w-3.5 h-3.5" style={{ color: COLORS.gray }} />
                    <span className="text-[12.5px] font-bold uppercase tracking-wide" style={{ color: gi === 0 ? COLORS.red : COLORS.gray }}>
                      {group.label}
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: COLORS.border }}>
                    {group.items.map((p) => (
                      <FeedRow key={p.id} product={p} isUpvoted={upvoted.has(p.id)} onUpvote={toggleUpvote} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA banner */}
          <div
            className="cta-banner flex items-center justify-between gap-4 flex-wrap rounded-2xl px-6 py-5 mt-9"
            style={{ background: "linear-gradient(90deg,#FFF5F5,#FFFBFB)", border: `1px solid #FFE1E2` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLORS.red, color: "#fff" }}>
                <I.sparkle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14.5px] font-bold" style={{ color: COLORS.dark }}>Stay ahead of the curve</p>
                <p className="text-[13px]" style={{ color: COLORS.gray }}>Discover new AI products daily and never miss what's next.</p>
              </div>
            </div>
            <a
              href="#"
              className="btn-press flex items-center gap-1.5 text-[13.5px] font-semibold px-4 py-2.5 rounded-full flex-shrink-0"
              style={{ background: "#fff", color: COLORS.red, border: `1px solid ${COLORS.red}` }}
            >
              Explore new products <I.arrow className="w-3.5 h-3.5" />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}