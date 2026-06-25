"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { fetchApiProductBySlug, mapApiToDetail } from "@/data/fetchProducts";

export const runtime = "edge";

const ALL_PRODUCTS: Record<string, any> = {
  cursor: {
    name: "Cursor", tagline: "The AI-first code editor built for speed and productivity.", maker: "Anysphere",
    domain: "cursor.sh", logoBg: "#1F2430",
    categories: ["Code", "Developer Tools", "IDE"], saves: "8.3K", trending: "#1", collections: 34, launched: "Mar 2023",
    about: "Cursor is an AI-first code editor built on VS Code that integrates AI deeply into the editing experience. It offers chat-based editing, codebase-wide context, and intelligent code completion to make developers significantly more productive.",
    features: ["AI-powered code completion", "Chat-based code editing", "Codebase-wide context", "Multi-file editing"],
    useCases: ["Software development", "Code refactoring", "Debugging", "Learning new codebases"],
    website: "cursor.sh", company: "Anysphere", founded: "2022", country: "United States", status: "Active", twitter: "@cursor_ai", linkedin: "Anysphere",
    alternatives: [{ name: "GitHub Copilot", maker: "GitHub", domain: "github.com" }, { name: "Replit", maker: "Replit", domain: "replit.com" }, { name: "Cody", maker: "Sourcegraph", domain: "sourcegraph.com" }, { name: "Tabnine", maker: "Tabnine", domain: "tabnine.com" }, { name: "v0", maker: "Vercel", domain: "v0.dev" }],
    allCategories: ["Code Editors", "Developer Tools", "AI Coding", "Productivity"],
  },
  claude: {
    name: "Claude", tagline: "AI assistant for thoughtful work and collaboration.", maker: "Anthropic",
    domain: "claude.ai", logoBg: "#D97706",
    categories: ["Chat", "Productivity", "AI Assistant"], saves: "6.7K", trending: "#2", collections: 41, launched: "Mar 2023",
    about: "Claude is an AI assistant built by Anthropic that excels at long documents, careful reasoning, and natural conversation. It's designed to be helpful, harmless, and honest.",
    features: ["Long context understanding", "Careful reasoning", "Document analysis", "Code generation"],
    useCases: ["Research and analysis", "Writing assistance", "Code explanation", "Document summarization"],
    website: "claude.ai", company: "Anthropic", founded: "2021", country: "United States", status: "Active", twitter: "@AnthropicAI", linkedin: "Anthropic",
    alternatives: [{ name: "ChatGPT", maker: "OpenAI", domain: "chat.openai.com" }, { name: "Gemini", maker: "Google", domain: "gemini.google.com" }, { name: "Perplexity", maker: "Perplexity", domain: "perplexity.ai" }, { name: "Pi", maker: "Inflection", domain: "pi.ai" }, { name: "Copilot", maker: "Microsoft", domain: "copilot.microsoft.com" }],
    allCategories: ["AI Chatbots", "Productivity", "Research", "Writing"],
  },
  midjourney: {
    name: "Midjourney", tagline: "AI image generator for creators and designers.", maker: "Midjourney",
    domain: "midjourney.com", logoBg: "#1F2430",
    categories: ["Image", "Design", "Generative AI"], saves: "5.5K", trending: "#3", collections: 52, launched: "Jul 2022",
    about: "Midjourney is an AI image generation tool that creates highly stylized, artistic images from text prompts. It's known for its distinctive aesthetic quality and creative outputs.",
    features: ["Text-to-image generation", "Style control", "High-resolution output", "Variation generation"],
    useCases: ["Concept art", "Marketing visuals", "Creative exploration", "Design inspiration"],
    website: "midjourney.com", company: "Midjourney", founded: "2021", country: "United States", status: "Active", twitter: "@midaborney", linkedin: "Midjourney",
    alternatives: [{ name: "DALL·E 3", maker: "OpenAI", domain: "openai.com" }, { name: "Stable Diffusion", maker: "Stability AI", domain: "stability.ai" }, { name: "Adobe Firefly", maker: "Adobe", domain: "firefly.adobe.com" }, { name: "Leonardo AI", maker: "Leonardo", domain: "leonardo.ai" }, { name: "Ideogram", maker: "Ideogram", domain: "ideogram.ai" }],
    allCategories: ["Image Generation", "Design", "Creative Tools", "Generative AI"],
  },
  chatgpt: {
    name: "ChatGPT", tagline: "Conversational AI for any question or task.", maker: "OpenAI",
    domain: "chat.openai.com", logoBg: "#10A37F",
    categories: ["AI Chatbot", "Productivity", "Artificial Intelligence"], saves: "10.5K", trending: "#1", collections: 48, launched: "Nov 30, 2022",
    about: "ChatGPT is an AI chatbot developed by OpenAI that helps users with writing, coding, brainstorming, learning, and more. It understands natural language and generates human-like responses in real time.",
    features: ["Human-like conversations", "Writing and content generation", "Code explanation and generation", "Problem solving and brainstorming"],
    useCases: ["Writing assistance", "Coding help", "Learning and tutoring", "Research and summarization"],
    website: "openai.com", company: "OpenAI", founded: "2015", country: "United States", status: "Active", twitter: "@OpenAI", linkedin: "OpenAI",
    alternatives: [{ name: "Claude", maker: "Anthropic", domain: "claude.ai" }, { name: "Google Gemini", maker: "Google", domain: "gemini.google.com" }, { name: "Microsoft Copilot", maker: "Microsoft", domain: "copilot.microsoft.com" }, { name: "Perplexity AI", maker: "Perplexity", domain: "perplexity.ai" }, { name: "DeepSeek", maker: "DeepSeek", domain: "deepseek.com" }],
    allCategories: ["AI Chatbots", "Productivity", "Artificial Intelligence", "Education"],
  },
  runway: {
    name: "Runway", tagline: "AI video creation platform for everyone.", maker: "Runway",
    domain: "runwayml.com", logoBg: "#4F46E5",
    categories: ["Video", "Audio", "Creative Tools"], saves: "3.9K", trending: "#5", collections: 29, launched: "2022",
    about: "Runway is an AI video generation and editing suite built for filmmakers and creators. It enables text-to-video generation, motion tracking, and advanced video editing with AI assistance.",
    features: ["Text-to-video generation", "Motion tracking", "AI video editing", "Green screen removal"],
    useCases: ["Film production", "Content creation", "Music videos", "Marketing videos"],
    website: "runwayml.com", company: "Runway", founded: "2018", country: "United States", status: "Active", twitter: "@runwayml", linkedin: "RunwayML",
    alternatives: [{ name: "Sora", maker: "OpenAI", domain: "openai.com" }, { name: "Pika", maker: "Pika Labs", domain: "pika.art" }, { name: "Synthesia", maker: "Synthesia", domain: "synthesia.io" }, { name: "HeyGen", maker: "HeyGen", domain: "heygen.com" }, { name: "Luma", maker: "Luma AI", domain: "lumalabs.ai" }],
    allCategories: ["Video Generation", "Creative Tools", "AI Editing", "Content Creation"],
  },
  elevenlabs: {
    name: "ElevenLabs", tagline: "AI voice synthesis and audio tools.", maker: "ElevenLabs",
    domain: "elevenlabs.io", logoBg: "#1F2430",
    categories: ["Voice", "Audio", "Speech"], saves: "3.2K", trending: "#6", collections: 22, launched: "2022",
    about: "ElevenLabs provides realistic AI voice generation and cloning for narration, dubbing, and audio content. Their technology produces some of the most natural-sounding AI speech available.",
    features: ["Voice cloning", "Text-to-speech", "Multi-language support", "Voice design"],
    useCases: ["Podcast production", "Audiobook narration", "Video dubbing", "Accessibility"],
    website: "elevenlabs.io", company: "ElevenLabs", founded: "2022", country: "United States", status: "Active", twitter: "@elevaboratory", linkedin: "ElevenLabs",
    alternatives: [{ name: "Murf AI", maker: "Murf", domain: "murf.ai" }, { name: "Play.ht", maker: "PlayHT", domain: "play.ht" }, { name: "WellSaid", maker: "WellSaid Labs", domain: "wellsaidlabs.com" }, { name: "Resemble AI", maker: "Resemble", domain: "resemble.ai" }, { name: "Speechify", maker: "Speechify", domain: "speechify.com" }],
    allCategories: ["Voice AI", "Audio", "Speech Synthesis", "Content Creation"],
  },
  perplexity: {
    name: "Perplexity", tagline: "AI search engine for real-time answers.", maker: "Perplexity AI",
    domain: "perplexity.ai", logoBg: "#2563EB",
    categories: ["Search", "Productivity", "Research"], saves: "2.9K", trending: "#7", collections: 35, launched: "2022",
    about: "Perplexity is an AI-powered answer engine that searches the web and provides cited, accurate answers to questions. It combines search with AI to deliver researched responses.",
    features: ["Web-sourced answers", "Citation support", "Follow-up questions", "Focus modes"],
    useCases: ["Research", "Fact-checking", "Learning", "Quick answers"],
    website: "perplexity.ai", company: "Perplexity AI", founded: "2022", country: "United States", status: "Active", twitter: "@peraborityai", linkedin: "Perplexity AI",
    alternatives: [{ name: "ChatGPT", maker: "OpenAI", domain: "chat.openai.com" }, { name: "You.com", maker: "You.com", domain: "you.com" }, { name: "Phind", maker: "Phind", domain: "phind.com" }, { name: "Google Gemini", maker: "Google", domain: "gemini.google.com" }, { name: "Bing AI", maker: "Microsoft", domain: "bing.com" }],
    allCategories: ["Search Engines", "AI Research", "Productivity", "Knowledge"],
  },
  "notion-ai": {
    name: "Notion AI", tagline: "AI notes, docs and knowledge workspace.", maker: "Notion",
    domain: "notion.so", logoBg: "#1F2430",
    categories: ["Productivity", "Writing", "Knowledge"], saves: "2.6K", trending: "#8", collections: 28, launched: "2023",
    about: "Notion AI integrates artificial intelligence directly into the Notion workspace, helping users write, summarize, brainstorm, and organize notes and documents more efficiently.",
    features: ["AI writing assistance", "Summarization", "Translation", "Action item extraction"],
    useCases: ["Note-taking", "Project management", "Documentation", "Team collaboration"],
    website: "notion.so", company: "Notion", founded: "2013", country: "United States", status: "Active", twitter: "@NotionHQ", linkedin: "Notion",
    alternatives: [{ name: "Coda AI", maker: "Coda", domain: "coda.io" }, { name: "Craft", maker: "Craft", domain: "craft.do" }, { name: "Mem", maker: "Mem", domain: "mem.ai" }, { name: "Obsidian", maker: "Obsidian", domain: "obsidian.md" }, { name: "Roam", maker: "Roam Research", domain: "roamresearch.com" }],
    allCategories: ["Productivity", "Note-taking", "AI Writing", "Collaboration"],
  },
  descript: {
    name: "DescriptAI", tagline: "Edit audio & video like a doc.", maker: "Descript",
    domain: "descript.com", logoBg: "#7C3AED",
    categories: ["Video", "Audio", "Editing"], saves: "2.3K", trending: "#9", collections: 19, launched: "2019",
    about: "Descript lets you edit audio and video as easily as editing a text document. It uses AI for transcription, filler word removal, and voice cloning.",
    features: ["Text-based video editing", "AI transcription", "Filler word removal", "Screen recording"],
    useCases: ["Podcast editing", "Video production", "Meeting recordings", "Content repurposing"],
    website: "descript.com", company: "Descript", founded: "2017", country: "United States", status: "Active", twitter: "@DescriptApp", linkedin: "Descript",
    alternatives: [{ name: "Riverside", maker: "Riverside", domain: "riverside.fm" }, { name: "Kapwing", maker: "Kapwing", domain: "kapwing.com" }, { name: "Opus Clip", maker: "Opus", domain: "opus.pro" }, { name: "Otter.ai", maker: "Otter", domain: "otter.ai" }, { name: "Runway", maker: "Runway", domain: "runwayml.com" }],
    allCategories: ["Video Editing", "Audio Editing", "Podcasting", "Content Creation"],
  },
  "canva-ai": {
    name: "Canva AI", tagline: "Design anything with AI, together.", maker: "Canva",
    domain: "canva.com", logoBg: "#00C4CC",
    categories: ["Design", "Productivity", "Creative Tools"], saves: "2.1K", trending: "#10", collections: 31, launched: "2023",
    about: "Canva AI (Magic Studio) brings generative AI tools into the Canva design editor, including text-to-image, background removal, magic resize, and AI-powered design suggestions.",
    features: ["Magic Design", "Text-to-image", "Background remover", "Magic Resize"],
    useCases: ["Social media graphics", "Presentations", "Marketing materials", "Brand design"],
    website: "canva.com", company: "Canva", founded: "2012", country: "Australia", status: "Active", twitter: "@canva", linkedin: "Canva",
    alternatives: [{ name: "Figma AI", maker: "Figma", domain: "figma.com" }, { name: "Adobe Firefly", maker: "Adobe", domain: "firefly.adobe.com" }, { name: "Framer AI", maker: "Framer", domain: "framer.com" }, { name: "Galileo AI", maker: "Galileo", domain: "usegalileo.ai" }, { name: "Looka", maker: "Looka", domain: "looka.com" }],
    allCategories: ["Design", "Creative Tools", "AI Graphics", "Marketing"],
  },
};

// Domains that are placeholders in the source data — skip favicon, use letter avatar.
const PLACEHOLDER_DOMAINS = new Set(["theresanaiforthat.com"]);

// Logo with graceful fallback: API logoUrl → favicon → letter avatar.
function DetailLogo({
  domain,
  name,
  logoUrl,
  imgClass,
  fallbackClass,
}: {
  domain: string;
  name: string;
  logoUrl?: string;
  imgClass: string;
  fallbackClass: string;
}) {
  const [errored, setErrored] = useState(false);
  const source =
    logoUrl ||
    (domain && !PLACEHOLDER_DOMAINS.has(domain)
      ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}`
      : "");

  if (errored || !source) {
    return <span className={fallbackClass}>{name?.charAt(0)?.toUpperCase() ?? "?"}</span>;
  }

  return <img src={source} alt={name} className={imgClass} onError={() => setErrored(true)} />;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const fallback = ALL_PRODUCTS[slug];
  const [product, setProduct] = useState<any>(fallback);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Fetch the live product by slug; fall back to dummy data on failure.
  useEffect(() => {
    let active = true;
    (async () => {
      const api = await fetchApiProductBySlug(slug);
      if (!active) return;
      if (api) {
        setProduct(mapApiToDetail(api, fallback));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug, fallback]);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <TopBar />
        <main className="lg:pl-[250px] pt-[52px] flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-[#6B7280]">Loading product…</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <TopBar />
        <main className="lg:pl-[250px] pt-[52px] flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1F2430] mb-2">Product not found</h1>
            <p className="text-[#6B7280] mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="text-[#FF5A5F] font-medium hover:underline">← Back to Products</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <TopBar />

      <main className="lg:pl-[250px] pt-[52px]">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 max-w-full xl:max-w-[calc(100%-280px)] p-6 md:p-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-sm text-[#9CA3AF] mb-6">
              <Link href="/" className="hover:text-[#6B7280]">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/products" className="hover:text-[#6B7280]">
                AI Products
              </Link>
              <span>&gt;</span>
              <span className="text-[#6B7280]">{product.name}</span>
            </nav>

            {/* Product Header */}
            <div className="flex flex-col sm:flex-row gap-5 mb-6">
              <div
                className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: product.logoBg }}
              >
                <DetailLogo
                  domain={product.domain}
                  name={product.name}
                  logoUrl={product.logoUrl}
                  imgClass="w-12 h-12 rounded-lg"
                  fallbackClass="text-white text-3xl font-bold"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-[#1F2430]">
                    {product.name}
                  </h1>
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-[#6B7280] text-sm mb-3">
                  {product.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((cat: string) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mb-5">
                  <a
                    href={`https://${product.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-[#FF5A5F] text-white text-sm font-medium rounded-full hover:bg-[#e54e53] transition-colors flex items-center gap-1"
                  >
                    Visit Website
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`px-5 py-2 text-sm font-medium rounded-full border transition-colors flex items-center gap-1 ${
                      saved
                        ? "bg-[#FF5A5F] text-white border-[#FF5A5F]"
                        : "border-[#EBEBEB] text-[#6B7280] hover:border-[#FF5A5F] hover:text-[#FF5A5F]"
                    }`}
                  >
                    ❤️ Save
                  </button>
                </div>
                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-4 h-4 text-[#9CA3AF] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-[#1F2430]">{product.saves}</span>
                    <span className="text-xs text-[#9CA3AF]">Saves</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-4 h-4 text-[#9CA3AF] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm font-semibold text-[#1F2430]">{product.trending}</span>
                    <span className="text-xs text-[#9CA3AF]">Trending</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-4 h-4 text-[#9CA3AF] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-sm font-semibold text-[#1F2430]">{product.collections}</span>
                    <span className="text-xs text-[#9CA3AF]">Collections</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-4 h-4 text-[#9CA3AF] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-[#1F2430]">{product.launched}</span>
                    <span className="text-xs text-[#9CA3AF]">Launched</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="border-t border-[#EBEBEB] pt-6 mb-8">
              <h2 className="text-base font-bold text-[#1F2430] mb-3">
                About {product.name}
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {product.about}
              </p>
            </div>

            {/* Key Features + Use Cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Key Features */}
              <div className="border border-[#EBEBEB] rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#1F2430] mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#6B7280]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="border border-[#EBEBEB] rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#1F2430] mb-3">
                  Use Cases
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.useCases.map((useCase: string) => (
                    <span
                      key={useCase}
                      className="px-3 py-1.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full text-center"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Screenshots */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#1F2430] mb-4">
                Product Screenshots
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-[260px] h-[160px] bg-gray-800 rounded-xl flex-shrink-0 flex items-center justify-center"
                  >
                    <span className="text-gray-500 text-sm">Screenshot {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-[#1F2430]">
                  Alternatives
                </h2>
                <Link
                  href="/products"
                  className="text-sm text-[#FF5A5F] hover:underline flex items-center gap-1"
                >
                  View all →
                </Link>
              </div>
              <p className="text-xs text-[#9CA3AF] mb-4">
                Similar products in the same category.
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.alternatives.map((alt: { name: string; maker: string; domain: string }) => (
                  <div
                    key={alt.name}
                    className="flex flex-col items-center gap-2 min-w-[120px] p-3 border border-[#EBEBEB] rounded-xl shadow-sm"
                  >
                    <DetailLogo
                      domain={alt.domain}
                      name={alt.name}
                      imgClass="w-10 h-10 rounded-lg"
                      fallbackClass="w-10 h-10 rounded-lg bg-[#1F2430] text-white font-bold flex items-center justify-center"
                    />
                    <span className="text-sm font-medium text-[#1F2430] text-center">
                      {alt.name}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">{alt.maker}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#1F2430] mb-4">
                Product Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Launched</p>
                    <p className="text-sm font-medium text-[#1F2430]">{product.launched}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Website</p>
                    <p className="text-sm font-medium text-[#1F2430]">{product.website}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Company</p>
                    <p className="text-sm font-medium text-[#1F2430]">{product.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Status</p>
                    <p className="text-sm font-medium text-green-600">{product.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Founded</p>
                    <p className="text-sm font-medium text-[#1F2430]">{product.founded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Country</p>
                    <p className="text-sm font-medium text-[#1F2430]">{product.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#1F2430] mb-2">
                Categories
              </h2>
              <p className="text-xs text-[#9CA3AF] mb-3">
                This product is listed under the following categories.
              </p>
              <div className="flex flex-wrap gap-2">
                {product.allCategories.map((cat: string) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-[280px] flex-shrink-0 p-6 border-l border-[#EBEBEB]">
            {/* Added to Collections */}
            <div className="border border-[#EBEBEB] rounded-xl p-4 shadow-sm mb-4">
              <h3 className="text-sm font-bold text-[#1F2430] mb-2">
                Added to Collections
              </h3>
              <p className="text-xs text-[#9CA3AF] mb-3">
                This product is part of the following collections.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1F2430]">Top AI Tools</p>
                    <p className="text-xs text-[#9CA3AF]">32 products</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1F2430]">AI Writing Tools</p>
                    <p className="text-xs text-[#9CA3AF]">18 products</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1F2430]">Most Popular</p>
                    <p className="text-xs text-[#9CA3AF]">59 products</p>
                  </div>
                </li>
              </ul>
              <Link
                href="/products"
                className="text-xs text-[#FF5A5F] hover:underline mt-3 inline-block"
              >
                View all collections →
              </Link>
            </div>

            {/* Links */}
            <div className="border border-[#EBEBEB] rounded-xl p-4 shadow-sm mb-4">
              <h3 className="text-sm font-bold text-[#1F2430] mb-3">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://${product.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2430]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {product.website}
                    <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://twitter.com/${product.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2430]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    {product.twitter}
                    <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://linkedin.com/company/${product.linkedin.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2430]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {product.linkedin}
                    <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Submit Info */}
            <div className="border border-[#EBEBEB] rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-bold text-[#1F2430] mb-2">
                Submit Info
              </h3>
              <p className="text-xs text-[#9CA3AF] mb-3">
                Help us keep information accurate. Submit missing or incorrect
                details.
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-[#FF5A5F] border border-[#FF5A5F] rounded-full hover:bg-[#FF5A5F] hover:text-white transition-colors flex items-center justify-center gap-1">
                Submit Update
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
