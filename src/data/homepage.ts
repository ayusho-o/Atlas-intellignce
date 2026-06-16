// ── Founders ──────────────────────────────────────────────────
export type Founder = {
  id: string; name: string; role: string;
  company: string; companySlug: string;
  location: string; photo: string;
  initial: string; initBg: string;
  verified: boolean;
};

export const FOUNDERS_SPOTLIGHT: Founder[] = [
  {
    id: "sam-altman", name: "Sam Altman", role: "Co-founder & CEO",
    company: "OpenAI", companySlug: "openai", location: "San Francisco, USA",
    photo: "https://www.silicon.co.uk/wp-content/uploads/2023/05/Sam-Altman-OpenAI.jpg",
    initial: "SA", initBg: "#111111", verified: true,
  },
  {
    id: "dario-amodei", name: "Dario Amodei", role: "CEO & Co-founder",
    company: "Anthropic", companySlug: "anthropic", location: "San Francisco, USA",
    photo: "https://unavatar.io/twitter/DarioAmodei",
    initial: "DA", initBg: "#CC785C", verified: true,
  },
  {
    id: "jensen-huang", name: "Jensen Huang", role: "CEO & Co-founder",
    company: "NVIDIA", companySlug: "nvidia", location: "Santa Clara, USA",
    photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=500&fit=crop&crop=face",
    initial: "JH", initBg: "#76B900", verified: true,
  },
  {
    id: "demis-hassabis", name: "Demis Hassabis", role: "CEO & Co-founder",
    company: "Google DeepMind", companySlug: "deepmind", location: "London, UK",
    photo: "https://lh3.googleusercontent.com/-bFf6KPCwpiPVvXDX5Zx_Z2PgJYIqm52hWyDvCl3cTEj-lQ_aY2vRg7kalqsQ1uP9KaGZgkv9ECnT9B1uJMqZNwT2piWKS2ySCRuoQdF4VrRfu82ig=w1440",
    initial: "DH", initBg: "#4285F4", verified: true,
  },
  {
    id: "aravind-srinivas", name: "Aravind Srinivas", role: "CEO & Co-founder",
    company: "Perplexity", companySlug: "perplexity", location: "San Francisco, USA",
    photo: "https://images.news18.com/ibnlive/uploads/2025/10/Aravind-Srinivas-1-2025-10-2c32336c3ce2d28e46d79366da4548d3.jpg",
    initial: "AS", initBg: "#1DB8A8", verified: true,
  },
  {
    id: "alex-wang", name: "Alexandr Wang", role: "Founder & CEO",
    company: "Scale AI", companySlug: "scale-ai", location: "San Francisco, USA",
    photo: "https://unavatar.io/twitter/alexandr_wang",
    initial: "AW", initBg: "#FF6B35", verified: true,
  },
  {
    id: "arthur-mensch", name: "Arthur Mensch", role: "CEO & Co-founder",
    company: "Mistral AI", companySlug: "mistral", location: "Paris, France",
    photo: "https://unavatar.io/twitter/arthurmensch",
    initial: "AM", initBg: "#FF6B35", verified: true,
  },
  {
    id: "ali-ghodsi", name: "Ali Ghodsi", role: "CEO & Co-founder",
    company: "Databricks", companySlug: "databricks", location: "San Francisco, USA",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    initial: "AG", initBg: "#E8360C", verified: true,
  },
  {
    id: "fei-fei-li", name: "Fei-Fei Li", role: "Co-founder & CEO",
    company: "World Labs", companySlug: "world-labs", location: "Palo Alto, USA",
    photo: "https://unavatar.io/twitter/drfeifei",
    initial: "FL", initBg: "#7C3AED", verified: true,
  },
  {
    id: "elon-musk", name: "Elon Musk", role: "Founder & CEO",
    company: "xAI", companySlug: "xai", location: "Austin, USA",
    photo: "https://images.wallpapersden.com/image/download/elon-musk-4k_bWhnZmWUmZqaraWkpJRnZWVlrWdlZWU.jpg",
    initial: "EM", initBg: "#111111", verified: true,
  },
];

// https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80
// ── Products ──────────────────────────────────────────────────
export type Product = {
  id: string; name: string; company: string;
  companySlug: string; website: string;
  description: string; category: string;
  categoryColor: string; logoBg: string;
  logoColor: string; logoInitial: string;
};

export const TOP_PRODUCTS: Product[] = [
  { id: "chatgpt",     name: "ChatGPT",        company: "OpenAI",      companySlug: "openai",      website: "chat.openai.com",  description: "Conversational AI assistant",        category: "Generative AI",   categoryColor: "blue",   logoBg: "#000000", logoColor: "#fff", logoInitial: "C" },
  { id: "claude",      name: "Claude",          company: "Anthropic",   companySlug: "anthropic",   website: "claude.ai",        description: "AI assistant for complex tasks",     category: "AI Safety",       categoryColor: "coral",  logoBg: "#CC785C", logoColor: "#fff", logoInitial: "C" },
  { id: "copilot",     name: "GitHub Copilot",  company: "Microsoft",   companySlug: "github",      website: "github.com",       description: "AI pair programmer for devs",        category: "Developer Tools", categoryColor: "gray",   logoBg: "#24292E", logoColor: "#fff", logoInitial: "G" },
  { id: "gemini",      name: "Gemini 3.1 Pro",  company: "Google",      companySlug: "deepmind",    website: "gemini.google.com",description: "Google's frontier multimodal AI",    category: "Generative AI",   categoryColor: "blue",   logoBg: "#4285F4", logoColor: "#fff", logoInitial: "G" },
  { id: "cursor-p",    name: "Cursor",          company: "Anysphere",   companySlug: "cursor",      website: "cursor.com",       description: "AI-first code editor",               category: "AI Coding",       categoryColor: "orange", logoBg: "#181818", logoColor: "#fff", logoInitial: "C" },
  { id: "perplexity-p",name: "Perplexity",      company: "Perplexity",  companySlug: "perplexity",  website: "perplexity.ai",    description: "AI-powered answer engine",           category: "AI Search",       categoryColor: "teal",   logoBg: "#1DB8A8", logoColor: "#fff", logoInitial: "P" },
  { id: "midjourney",  name: "Midjourney",      company: "Midjourney",  companySlug: "midjourney",  website: "midjourney.com",   description: "AI image generation for creatives",  category: "Image Gen",       categoryColor: "purple", logoBg: "#0B0B17", logoColor: "#fff", logoInitial: "M" },
  { id: "runway-gen3", name: "Runway Gen-3",    company: "Runway",      companySlug: "runway",      website: "runwayml.com",     description: "AI next-gen video generation",        category: "Video Gen",       categoryColor: "purple", logoBg: "#1A1A2E", logoColor: "#fff", logoInitial: "R" },
  { id: "grok",        name: "Grok 4.3",        company: "xAI",         companySlug: "xai",         website: "x.ai",             description: "Real-time AI with X integration",    category: "Generative AI",   categoryColor: "gray",   logoBg: "#000000", logoColor: "#fff", logoInitial: "G" },
  { id: "devin",       name: "Devin",           company: "Cognition AI", companySlug: "cognition-ai",website: "cognition.ai",    description: "Autonomous AI software engineer",    category: "AI Agents",       categoryColor: "purple", logoBg: "#5F27CD", logoColor: "#fff", logoInitial: "D" },
];

// ── Investors ─────────────────────────────────────────────────
export type Investor = {
  id: string; name: string; type: string;
  aum: string; aiInvestments: number;
  portfolioCompanies: number; totalRaised: string;
  logoBg: string; logoColor: string;
  logoInitial: string; website: string;
  notable: string;
};

export const TOP_INVESTORS: Investor[] = [
  { id: "a16z",       name: "Andreessen Horowitz",         type: "Venture Capital", aum: "$90B+", aiInvestments: 200, portfolioCompanies: 200, totalRaised: "$21.8B+", logoBg: "#000000", logoColor: "#fff", logoInitial: "A", website: "a16z.com",            notable: "OpenAI, Anthropic, Mistral" },
  { id: "sequoia",    name: "Sequoia Capital",             type: "Venture Capital", aum: "$85B+", aiInvestments: 156, portfolioCompanies: 156, totalRaised: "$18B+",   logoBg: "#111111", logoColor: "#fff", logoInitial: "S", website: "sequoiacap.com",      notable: "OpenAI, Harvey, Hugging Face" },
  { id: "lightspeed", name: "Lightspeed Venture Partners", type: "Venture Capital", aum: "$25B+", aiInvestments: 112, portfolioCompanies: 112, totalRaised: "$9B+",    logoBg: "#FF4B00", logoColor: "#fff", logoInitial: "L", website: "lsvp.com",            notable: "Hippocratic AI, Abridge" },
  { id: "accel",      name: "Accel",                       type: "Venture Capital", aum: "$20B+", aiInvestments: 89,  portfolioCompanies: 89,  totalRaised: "$900M+",  logoBg: "#0052CC", logoColor: "#fff", logoInitial: "A", website: "accel.com",           notable: "Scale AI, Decagon, H Company" },
  { id: "gc",         name: "General Catalyst",            type: "Venture Capital", aum: "$30B+", aiInvestments: 98,  portfolioCompanies: 98,  totalRaised: "$1.4B+",  logoBg: "#6C3483", logoColor: "#fff", logoInitial: "G", website: "generalcatalyst.com", notable: "Adept AI, Ema, Lindy" },
  { id: "khosla",     name: "Khosla Ventures",             type: "Venture Capital", aum: "$15B+", aiInvestments: 74,  portfolioCompanies: 74,  totalRaised: "$800M+",  logoBg: "#E74C3C", logoColor: "#fff", logoInitial: "K", website: "khoslaventures.com", notable: "OpenAI, Aikon, Nabla" },
  { id: "greylock",   name: "Greylock Partners",           type: "Venture Capital", aum: "$10B+", aiInvestments: 62,  portfolioCompanies: 62,  totalRaised: "$650M+",  logoBg: "#2C3E50", logoColor: "#fff", logoInitial: "G", website: "greylock.com",        notable: "Inflection, LlamaIndex, Coreweave" },
  { id: "tiger",      name: "Tiger Global",                type: "Hedge Fund/VC",   aum: "$58B+", aiInvestments: 145, portfolioCompanies: 145, totalRaised: "$4.2B+",  logoBg: "#F39C12", logoColor: "#fff", logoInitial: "T", website: "tigerglobal.com",     notable: "Databricks, Scale AI, Stripe" },
  { id: "founders-fund", name: "Founders Fund",            type: "Venture Capital", aum: "$12B+", aiInvestments: 55,  portfolioCompanies: 55,  totalRaised: "$700M+",  logoBg: "#1ABC9C", logoColor: "#fff", logoInitial: "F", website: "foundersfund.com",    notable: "Cognition AI, Anduril, Palantir" },
  { id: "nvidia-nv",  name: "NVIDIA Ventures",             type: "Corporate VC",    aum: "$1B+",  aiInvestments: 50,  portfolioCompanies: 50,  totalRaised: "$500M+",  logoBg: "#76B900", logoColor: "#fff", logoInitial: "N", website: "nvidia.com",          notable: "Cohere, CoreWeave, Recursion" },
];

// ── News ──────────────────────────────────────────────────────
export type NewsItem = {
  id: string; tag: string; tagColor: string;
  title: string; date: string; source: string;
  sourceInitial: string; sourceBg: string;
  sourceLogo: string; featured?: boolean;
  featuredImage?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "anthropic-h",  tag: "FUNDING",   tagColor: "green",
    title: "Anthropic Raises $65B Series H at $965B Valuation — Most Valuable Private AI Company",
    date: "May 28, 2026", source: "Anthropic", sourceInitial: "A", sourceBg: "#CC785C",
    sourceLogo: "anthropic.com", featured: true,
    featuredImage: "https://img.magnific.com/premium-photo/brain-with-word-all-written-it_1281602-20959.jpg?w=996",
  },
  {
    id: "openai-122b",  tag: "FUNDING",   tagColor: "green",
    title: "OpenAI Closes $122B Round at $852B Valuation Led by SoftBank",
    date: "Apr 2, 2026",  source: "OpenAI",    sourceInitial: "O", sourceBg: "#000000", sourceLogo: "openai.com",
  },
  {
    id: "xai-20b",      tag: "FUNDING",   tagColor: "green",
    title: "xAI Raises $20B Series E — Total Funding Now $42.7B",
    date: "Jan 6, 2026",  source: "xAI",       sourceInitial: "X", sourceBg: "#111111", sourceLogo: "x.ai",
  },
  {
    id: "claude-opus48",tag: "PRODUCT",   tagColor: "coral",
    title: "Anthropic Launches Claude Opus 4.8 — Now #1 AI Model on Intelligence Index",
    date: "May 14, 2026", source: "Anthropic", sourceInitial: "A", sourceBg: "#CC785C", sourceLogo: "anthropic.com",
  },
  {
    id: "gpt55",        tag: "PRODUCT",   tagColor: "coral",
    title: "OpenAI Releases GPT-5.5 with Enhanced Reasoning and Creative Writing",
    date: "Apr 10, 2026", source: "OpenAI",    sourceInitial: "O", sourceBg: "#000000", sourceLogo: "openai.com",
  },
  {
    id: "gemini31",     tag: "PRODUCT",   tagColor: "blue",
    title: "Google DeepMind Ships Gemini 3.1 Pro — Leads GPQA Diamond at 94.3%",
    date: "Feb 18, 2026", source: "DeepMind",  sourceInitial: "D", sourceBg: "#4285F4", sourceLogo: "deepmind.com",
  },
  {
    id: "deepseek-r1",  tag: "RESEARCH",  tagColor: "purple",
    title: "DeepSeek-R1 Open Model Breakthrough — RL-Based Reasoning Rivals Proprietary Models",
    date: "Jan 22, 2025", source: "DeepSeek",  sourceInitial: "D", sourceBg: "#0A6EBD", sourceLogo: "deepseek.com",
  },
  {
    id: "harvey-d",     tag: "FUNDING",   tagColor: "green",
    title: "Harvey Raises $300M Series D at $3B Valuation Led by Sequoia",
    date: "Feb 12, 2025", source: "Harvey",    sourceInitial: "H", sourceBg: "#1C1C1E", sourceLogo: "harvey.ai",
  },
  {
    id: "cognition-1b", tag: "FUNDING",   tagColor: "green",
    title: "Cognition AI Raises $1B+ Series D for Devin AI Software Engineer",
    date: "Mar 5, 2026",  source: "Cognition", sourceInitial: "C", sourceBg: "#5F27CD", sourceLogo: "cognition.ai",
  },
  {
    id: "cursor-s",     tag: "PRODUCT",   tagColor: "coral",
    title: "Cursor Surpasses 1M Paying Developers After Series C at $9B Valuation",
    date: "Jan 15, 2026", source: "Cursor",    sourceInitial: "C", sourceBg: "#181818", sourceLogo: "cursor.com",
  },
];

// ── Research Papers ───────────────────────────────────────────
export type Paper = {
  id: string; tag: string; title: string;
  date: string; org: string; orgLogo: string;
  orgInitial: string; orgBg: string;
  likes: number; bookmarks: number;
};

export const RESEARCH_PAPERS: Paper[] = [
  { id: "deepseek-r1", tag: "REASONING",       title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",            date: "Jan 22, 2025", org: "DeepSeek",        orgLogo: "deepseek.com",   orgInitial: "D", orgBg: "#0A6EBD", likes: 4820, bookmarks: 312 },
  { id: "gemini25",    tag: "FOUNDATION MODEL", title: "Gemini 2.5: Our Most Capable and General Frontier Model with Extended Context",                  date: "Mar 25, 2025", org: "Google DeepMind", orgLogo: "deepmind.com",   orgInitial: "D", orgBg: "#4285F4", likes: 3210, bookmarks: 241 },
  { id: "llama4",      tag: "OPEN SOURCE",      title: "Llama 4: Open Foundation Models with Mixture-of-Experts Architecture",                           date: "Apr 5, 2025",  org: "Meta AI",         orgLogo: "meta.com",       orgInitial: "M", orgBg: "#0668E1", likes: 2980, bookmarks: 198 },
  { id: "sora2",       tag: "VIDEO",            title: "Sora 2: Video Generation as World Simulators with Physics Understanding",                         date: "Feb 14, 2025", org: "OpenAI",          orgLogo: "openai.com",     orgInitial: "O", orgBg: "#000000", likes: 5100, bookmarks: 445 },
  { id: "claude-35s",  tag: "AGENTS",           title: "Claude 3.5: Extended Thinking, Computer Use and Multi-Step Agentic Task Completion",             date: "Oct 22, 2024", org: "Anthropic",       orgLogo: "anthropic.com",  orgInitial: "A", orgBg: "#CC785C", likes: 2650, bookmarks: 187 },
  { id: "alphafold3",  tag: "BIOLOGY",          title: "AlphaFold 3: Predicting the Structure of All Biomolecule Interactions",                          date: "May 8, 2024",  org: "Google DeepMind", orgLogo: "deepmind.com",   orgInitial: "D", orgBg: "#4285F4", likes: 6200, bookmarks: 521 },
  { id: "imagen3",     tag: "DIFFUSION",        title: "Imagen 3: High Resolution Text-to-Image Synthesis with Photorealistic Quality",                  date: "May 21, 2024", org: "Google Research", orgLogo: "google.com",     orgInitial: "G", orgBg: "#34A853", likes: 1882, bookmarks: 142 },
  { id: "sam2",        tag: "VISION",           title: "Segment Anything Model 2 (SAM 2) — Unified Segmentation for Images and Videos",                  date: "Jul 29, 2024", org: "Meta AI",         orgLogo: "meta.com",       orgInitial: "M", orgBg: "#0668E1", likes: 2100, bookmarks: 163 },
  { id: "qwen25",      tag: "MULTILINGUAL",     title: "Qwen2.5: Multilingual Reasoning, MoE Architecture and Long-Context Understanding",               date: "Sep 18, 2024", org: "Alibaba",         orgLogo: "alibaba.com",    orgInitial: "A", orgBg: "#FF6A00", likes: 1540, bookmarks: 98  },
  { id: "phi4",        tag: "EFFICIENT AI",     title: "Phi-4: Small Language Models with Large Capabilities via Synthetic Data Training",               date: "Dec 12, 2024", org: "Microsoft",       orgLogo: "microsoft.com",  orgInitial: "M", orgBg: "#0078D4", likes: 1760, bookmarks: 134 },
];

// ── Jobs ──────────────────────────────────────────────────────
export type Job = {
  id: string; title: string; company: string;
  companySlug: string; website: string;
  logoBg: string; logoColor: string; logoInitial: string;
  location: string; type: string; salary: string; isNew: boolean;
};

export const LATEST_JOBS: Job[] = [
  { id: "j1",  title: "ML Research Engineer",      company: "OpenAI",       companySlug: "openai",       website: "openai.com",      logoBg: "#000000", logoColor: "#fff", logoInitial: "O", location: "San Francisco, USA", type: "Full-time", salary: "$300K–$500K", isNew: true  },
  { id: "j2",  title: "AI Safety Researcher",       company: "Anthropic",    companySlug: "anthropic",    website: "anthropic.com",   logoBg: "#CC785C", logoColor: "#fff", logoInitial: "A", location: "San Francisco, USA", type: "Full-time", salary: "$280K–$420K", isNew: true  },
  { id: "j3",  title: "Software Engineer, AI",      company: "Cursor",       companySlug: "cursor",       website: "cursor.com",      logoBg: "#181818", logoColor: "#fff", logoInitial: "C", location: "Remote",             type: "Full-time", salary: "$180K–$260K", isNew: true  },
  { id: "j4",  title: "Data Scientist",             company: "Scale AI",     companySlug: "scale-ai",     website: "scale.com",       logoBg: "#FF6B35", logoColor: "#fff", logoInitial: "S", location: "San Francisco, USA", type: "Full-time", salary: "$160K–$220K", isNew: false },
  { id: "j5",  title: "AI Product Manager",         company: "Perplexity",   companySlug: "perplexity",   website: "perplexity.ai",   logoBg: "#1DB8A8", logoColor: "#fff", logoInitial: "P", location: "San Francisco, USA", type: "Full-time", salary: "$180K–$260K", isNew: true  },
  { id: "j6",  title: "Research Scientist — LLM",   company: "Mistral AI",   companySlug: "mistral",      website: "mistral.ai",      logoBg: "#FF6B35", logoColor: "#fff", logoInitial: "M", location: "Paris, France",      type: "Full-time", salary: "€150K–€220K", isNew: true  },
  { id: "j7",  title: "Backend Engineer, Infra",    company: "Databricks",   companySlug: "databricks",   website: "databricks.com",  logoBg: "#E8360C", logoColor: "#fff", logoInitial: "D", location: "Remote",             type: "Full-time", salary: "$170K–$240K", isNew: false },
  { id: "j8",  title: "AI Engineer",                company: "Hugging Face", companySlug: "hugging-face", website: "huggingface.co",  logoBg: "#FFD21E", logoColor: "#111", logoInitial: "H", location: "New York, USA",      type: "Full-time", salary: "$160K–$230K", isNew: true  },
  { id: "j9",  title: "ML Platform Engineer",       company: "Together AI",  companySlug: "together-ai",  website: "together.ai",     logoBg: "#6C5CE7", logoColor: "#fff", logoInitial: "T", location: "Remote",             type: "Full-time", salary: "$150K–$210K", isNew: true  },
  { id: "j10", title: "Computer Vision Researcher", company: "Runway",       companySlug: "runway",       website: "runwayml.com",    logoBg: "#1A1A2E", logoColor: "#fff", logoInitial: "R", location: "New York, USA",      type: "Full-time", salary: "$200K–$300K", isNew: false },
];

// ── Funding rounds (homepage dark cards) ─────────────────────
export type FundingRound = {
  id: string; company: string; slug: string;
  round: string; amount: string; leadInvestor: string;
  timeAgo: string; logoBg: string; logoColor: string;
  logoInitial: string; website: string; accentColor: string;
};

export const FUNDING_ROUNDS: FundingRound[] = [
  { id: "anth-h",  company: "Anthropic",    slug: "anthropic",    round: "Series H",  amount: "$65B",   leadInvestor: "Altimeter Capital",  timeAgo: "2w ago",  logoBg: "#CC785C", logoColor: "#fff", logoInitial: "A", website: "anthropic.com",   accentColor: "#5c3020" },
  { id: "openai-r",company: "OpenAI",       slug: "openai",       round: "Private",   amount: "$122B",  leadInvestor: "SoftBank",           timeAgo: "2m ago",  logoBg: "#111111", logoColor: "#fff", logoInitial: "O", website: "openai.com",      accentColor: "#1a1a1a" },
  { id: "xai-20",  company: "xAI",          slug: "xai",          round: "Series E",  amount: "$20B",   leadInvestor: "Valor Equity",       timeAgo: "5m ago",  logoBg: "#222222", logoColor: "#fff", logoInitial: "X", website: "x.ai",            accentColor: "#2a2a2a" },
  { id: "cog-1b",  company: "Cognition AI", slug: "cognition-ai", round: "Series D",  amount: "$1B+",   leadInvestor: "Lux Capital",        timeAgo: "3m ago",  logoBg: "#5F27CD", logoColor: "#fff", logoInitial: "C", website: "cognition.ai",    accentColor: "#2e1566" },
  { id: "harvey-d",company: "Harvey",       slug: "harvey",       round: "Series D",  amount: "$300M",  leadInvestor: "Sequoia",            timeAgo: "4m ago",  logoBg: "#1C1C1E", logoColor: "#fff", logoInitial: "H", website: "harvey.ai",       accentColor: "#2a2a2e" },
  { id: "cursor-c",company: "Cursor",       slug: "cursor",       round: "Series C",  amount: "$900M",  leadInvestor: "Thrive Capital",     timeAgo: "5m ago",  logoBg: "#181818", logoColor: "#fff", logoInitial: "C", website: "cursor.com",      accentColor: "#1a1a1a" },
  { id: "eleven-c",company: "ElevenLabs",   slug: "elevenlabs",   round: "Series C",  amount: "$180M",  leadInvestor: "ICONIQ & a16z",      timeAgo: "5m ago",  logoBg: "#000000", logoColor: "#fff", logoInitial: "E", website: "elevenlabs.io",   accentColor: "#111111" },
  { id: "waymo-d", company: "Waymo",        slug: "waymo",        round: "Series D",  amount: "$16B",   leadInvestor: "Alphabet",           timeAgo: "4m ago",  logoBg: "#00A8E0", logoColor: "#fff", logoInitial: "W", website: "waymo.com",       accentColor: "#003a4d" },
  { id: "hipp-b",  company: "Hippocratic AI",slug:"hippocratic-ai",round: "Series B", amount: "$141M",  leadInvestor: "Kleiner Perkins",    timeAgo: "5m ago",  logoBg: "#00B894", logoColor: "#fff", logoInitial: "H", website: "hippocraticai.com",accentColor:"#004d3d" },
  { id: "scale-g", company: "Scale AI",     slug: "scale-ai",     round: "Growth",    amount: "$1.6B",  leadInvestor: "Accel",              timeAgo: "6m ago",  logoBg: "#FF6B35", logoColor: "#fff", logoInitial: "S", website: "scale.com",       accentColor: "#6b2e10" },
];

// ── Market sparkline ──────────────────────────────────────────
export const MARKET_SPARKLINE = [38, 42, 35, 48, 44, 56, 52, 65, 60, 72, 68, 80, 76, 88, 84, 92, 90, 100];