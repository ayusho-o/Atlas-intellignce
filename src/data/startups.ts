export type BadgeColor = "coral"|"blue"|"green"|"purple"|"amber"|"teal"|"pink"|"orange"|"gray"|"indigo";

export type Startup = {
  id: string; name: string; slug: string; website: string;
  founded: number; hqCity: string; hqCountry: string;
  category: string; badgeColor: BadgeColor;
  employees: string; totalFunding: string; latestRound: string;
  leadInvestor: string; founders: string[];
  description: string; shortDesc: string;
  logoInitial: string; logoBg: string; logoColor: string;
  tags: string[];
  growth?: number; isNew?: boolean; isFeatured?: boolean;
  isTrending?: boolean; trendingRank?: number;
  sparkline?: number[];
};

export const ALL_STARTUPS: Startup[] = [

  // ── GENERATIVE AI ────────────────────────────────────────────
  { id:"openai", name:"OpenAI", slug:"openai", website:"openai.com", founded:2015,
    hqCity:"San Francisco", hqCountry:"USA", category:"Generative AI", badgeColor:"blue",
    employees:"1,000+", totalFunding:"$63B+", latestRound:"Private", leadInvestor:"Microsoft",
    founders:["Sam Altman","Greg Brockman"], description:"Research and deployment company building safe AGI that benefits all of humanity.",
    shortDesc:"AI research and deployment company building safe AGI.",
    logoInitial:"O", logoBg:"#000000", logoColor:"#FFFFFF",
    tags:["LLM","AGI","ChatGPT","API"], isTrending:true, trendingRank:1, isFeatured:true },

  { id:"mistral", name:"Mistral AI", slug:"mistral", website:"mistral.ai", founded:2023,
    hqCity:"Paris", hqCountry:"France", category:"Generative AI", badgeColor:"blue",
    employees:"200+", totalFunding:"$1.2B+", latestRound:"Series C", leadInvestor:"a16z",
    founders:["Arthur Mensch"], description:"French AI lab building open and efficient frontier language models for developers worldwide.",
    shortDesc:"Open efficient frontier LLMs for developers.",
    logoInitial:"M", logoBg:"#FF6B35", logoColor:"#FFFFFF",
    tags:["LLM","Open Source","European AI"] },

  { id:"midjourney", name:"Midjourney", slug:"midjourney", website:"midjourney.com", founded:2021,
    hqCity:"San Francisco", hqCountry:"USA", category:"Generative AI", badgeColor:"purple",
    employees:"100+", totalFunding:"$200M", latestRound:"Bootstrapped", leadInvestor:"Self-funded",
    founders:["David Holz"], description:"Independent AI research lab producing image generation tools for creative professionals and artists.",
    shortDesc:"AI image generation for creative professionals.",
    logoInitial:"M", logoBg:"#0B0B17", logoColor:"#FFFFFF",
    tags:["Image Gen","Art","Creative AI"], isFeatured:true },

  { id:"stability-ai", name:"Stability AI", slug:"stability-ai", website:"stability.ai", founded:2020,
    hqCity:"London", hqCountry:"UK", category:"Generative AI", badgeColor:"purple",
    employees:"200+", totalFunding:"$200M+", latestRound:"Series A", leadInvestor:"Coatue",
    founders:["Emad Mostaque"], description:"Activating humanity's potential through open AI development — creators of Stable Diffusion.",
    shortDesc:"Open AI models including Stable Diffusion.",
    logoInitial:"S", logoBg:"#6C3483", logoColor:"#FFFFFF",
    tags:["Image Gen","Open Source","Stable Diffusion"] },

  { id:"xai", name:"xAI", slug:"xai", website:"x.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"Generative AI", badgeColor:"gray",
    employees:"1,000+", totalFunding:"$12B+", latestRound:"Series C", leadInvestor:"Andreessen Horowitz",
    founders:["Elon Musk"], description:"AI company building Grok, a truthseeking AI assistant integrated with real-time data from X.",
    shortDesc:"Grok AI — truthseeking AI with real-time data.",
    logoInitial:"X", logoBg:"#000000", logoColor:"#FFFFFF",
    tags:["LLM","Grok","Real-time AI"], isTrending:true, trendingRank:6, isFeatured:true },

  { id:"cohere", name:"Cohere", slug:"cohere", website:"cohere.com", founded:2019,
    hqCity:"Toronto", hqCountry:"Canada", category:"AI Infrastructure", badgeColor:"teal",
    employees:"500+", totalFunding:"$900M+", latestRound:"Growth", leadInvestor:"Radical Ventures",
    founders:["Aidan Gomez"], description:"Enterprise AI platform with LLMs for search, summarization, and generation at scale.",
    shortDesc:"Enterprise AI platform with LLMs.",
    logoInitial:"C", logoBg:"#3B5BDB", logoColor:"#FFFFFF",
    tags:["LLM","Enterprise","NLP","API"] },

  // ── AI SAFETY ────────────────────────────────────────────────
  { id:"anthropic", name:"Anthropic", slug:"anthropic", website:"anthropic.com", founded:2021,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Safety", badgeColor:"blue",
    employees:"1,000+", totalFunding:"$18B+", latestRound:"Series E", leadInvestor:"Google",
    founders:["Dario Amodei","Daniela Amodei"], description:"AI safety and research company building reliable, interpretable, and steerable AI systems.",
    shortDesc:"AI safety and research company.",
    logoInitial:"A", logoBg:"#CC785C", logoColor:"#FFFFFF",
    tags:["LLM","Safety","Claude","API"], isTrending:true, trendingRank:2 },

  { id:"deepmind", name:"Google DeepMind", slug:"deepmind", website:"deepmind.com", founded:2010,
    hqCity:"London", hqCountry:"UK", category:"AI Safety", badgeColor:"blue",
    employees:"5,000+", totalFunding:"$500M+", latestRound:"Strategic", leadInvestor:"Google",
    founders:["Demis Hassabis","Shane Legg"], description:"Leading AI research lab responsible for AlphaFold, Gemini, and breakthroughs in protein structure prediction.",
    shortDesc:"AI research lab behind AlphaFold and Gemini.",
    logoInitial:"D", logoBg:"#4285F4", logoColor:"#FFFFFF",
    tags:["Research","AlphaFold","Gemini","Safety"] },

  { id:"redwood-research", name:"Redwood Research", slug:"redwood-research", website:"redwoodresearch.org", founded:2019,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Safety", badgeColor:"green",
    employees:"50+", totalFunding:"$20M+", latestRound:"Seed", leadInvestor:"Open Philanthropy",
    founders:["Buck Shlegeris","Paul Colognese"], description:"Nonprofit AI safety research organization focused on making AI systems that reliably do what humans want.",
    shortDesc:"Nonprofit focused on AI alignment research.",
    logoInitial:"R", logoBg:"#27AE60", logoColor:"#FFFFFF",
    tags:["AI Alignment","Research","Safety"] },

  { id:"apollo-research", name:"Apollo Research", slug:"apollo-research", website:"apolloresearch.ai", founded:2023,
    hqCity:"London", hqCountry:"UK", category:"AI Safety", badgeColor:"indigo",
    employees:"50+", totalFunding:"$10M+", latestRound:"Seed", leadInvestor:"Open Philanthropy",
    founders:["Marius Hobbhahn"], description:"AI safety evaluations company that stress-tests frontier AI models for dangerous capabilities and deceptive behaviors.",
    shortDesc:"Evaluations and safety testing for frontier AI.",
    logoInitial:"A", logoBg:"#2C3E50", logoColor:"#FFFFFF",
    tags:["AI Evals","Safety","Red Teaming"] },

  { id:"conjecture", name:"Conjecture", slug:"conjecture", website:"conjecture.dev", founded:2022,
    hqCity:"London", hqCountry:"UK", category:"AI Safety", badgeColor:"purple",
    employees:"50+", totalFunding:"$10M+", latestRound:"Seed", leadInvestor:"Balderton Capital",
    founders:["Connor Leahy"], description:"European AI safety company building interpretable, steerable AI systems and conducting alignment research.",
    shortDesc:"European AI safety and alignment research.",
    logoInitial:"C", logoBg:"#8E44AD", logoColor:"#FFFFFF",
    tags:["Alignment","Interpretability","Safety"] },

  { id:"ought", name:"Ought", slug:"ought", website:"ought.org", founded:2017,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Safety", badgeColor:"teal",
    employees:"50+", totalFunding:"$12M+", latestRound:"Seed", leadInvestor:"Open Philanthropy",
    founders:["Andreas Stuhlmüller"], description:"Machine learning research lab developing Elicit, a tool for automated reasoning in scientific research.",
    shortDesc:"AI safety research with automated reasoning tools.",
    logoInitial:"O", logoBg:"#16A085", logoColor:"#FFFFFF",
    tags:["Research","AI Safety","Automated Reasoning"] },

  // ── AI AGENTS ────────────────────────────────────────────────
  { id:"cognition-ai", name:"Cognition AI", slug:"cognition-ai", website:"cognition.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"purple",
    employees:"50+", totalFunding:"$200M+", latestRound:"Series B", leadInvestor:"Founders Fund",
    founders:["Scott Wu"], description:"Building Devin, the world's first fully autonomous AI software engineer that codes independently.",
    shortDesc:"Building Devin, the autonomous AI software engineer.",
    logoInitial:"C", logoBg:"#5F27CD", logoColor:"#FFFFFF",
    tags:["Coding Agents","Devin","Software Engineering"] },

  { id:"adept-ai", name:"Adept AI", slug:"adept-ai", website:"adept.ai", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"purple",
    employees:"200+", totalFunding:"$415M+", latestRound:"Series B", leadInvestor:"General Catalyst",
    founders:["David Luan"], description:"Building general intelligence that takes actions in software to automate complex workflows.",
    shortDesc:"AI agents that automate complex software workflows.",
    logoInitial:"A", logoBg:"#6C5CE7", logoColor:"#FFFFFF",
    tags:["Agents","Automation","Enterprise"] },

  { id:"lindy", name:"Lindy", slug:"lindy", website:"lindy.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"amber",
    employees:"50+", totalFunding:"$50M+", latestRound:"Series A", leadInvestor:"Sequoia",
    founders:["Flo Crivello"], description:"Build AI employees that automate workflows — from email to calendar to CRM and beyond.",
    shortDesc:"Build AI employees to automate workflows.",
    logoInitial:"L", logoBg:"#FDCB6E", logoColor:"#222222",
    tags:["AI Agents","Automation","Productivity"], isNew:true },

  { id:"h-company", name:"H Company", slug:"h-company", website:"hcompany.ai", founded:2023,
    hqCity:"Paris", hqCountry:"France", category:"AI Agents", badgeColor:"gray",
    employees:"50+", totalFunding:"$220M+", latestRound:"Seed", leadInvestor:"Accel",
    founders:["Laurent Sifre","Karl Tuyls"], description:"Building autonomous AI agents trained on human interaction data to complete complex digital tasks.",
    shortDesc:"Autonomous AI agents for complex digital tasks.",
    logoInitial:"H", logoBg:"#2C3E50", logoColor:"#FFFFFF",
    tags:["Agents","Autonomy","LLM"], isNew:true },

  { id:"induced-ai", name:"Induced AI", slug:"induced-ai", website:"induced.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"teal",
    employees:"50+", totalFunding:"$15M+", latestRound:"Seed", leadInvestor:"Combinator",
    founders:["Aryan Vichare"], description:"Autonomous browser agents that can perform any web-based task reliably without human oversight.",
    shortDesc:"Autonomous browser agents for any web task.",
    logoInitial:"I", logoBg:"#00CEC9", logoColor:"#FFFFFF",
    tags:["Browser Agents","Web Automation","RPA"] },

  { id:"ema", name:"Ema", slug:"ema", website:"ema.co", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"pink",
    employees:"50+", totalFunding:"$61M+", latestRound:"Series A", leadInvestor:"Accel",
    founders:["Surojit Chatterjee"], description:"Universal AI employee platform that creates custom AI agents for every enterprise team and function.",
    shortDesc:"Universal AI employee for every enterprise team.",
    logoInitial:"E", logoBg:"#E84393", logoColor:"#FFFFFF",
    tags:["Enterprise Agents","Automation","No-Code"] },

  { id:"letta", name:"Letta", slug:"letta", website:"letta.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"orange",
    employees:"50+", totalFunding:"$30M+", latestRound:"Series A", leadInvestor:"a16z",
    founders:["Charles Packer","Sarah Wooders"], description:"Open-source framework for building stateful, memory-enabled LLM agents previously known as MemGPT.",
    shortDesc:"Stateful memory-enabled LLM agents framework.",
    logoInitial:"L", logoBg:"#F57C00", logoColor:"#FFFFFF",
    tags:["Memory","Open Source","Agents"], isNew:true },

  { id:"crewai", name:"CrewAI", slug:"crewai", website:"crewai.com", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"coral",
    employees:"50+", totalFunding:"$18M+", latestRound:"Seed", leadInvestor:"Felicis",
    founders:["Joao Moura"], description:"Framework for orchestrating role-playing autonomous AI agents working together as a crew.",
    shortDesc:"Multi-agent AI orchestration framework.",
    logoInitial:"C", logoBg:"#E17055", logoColor:"#FFFFFF",
    tags:["Multi-Agent","Open Source","Orchestration"], isNew:true },

  { id:"word-agents", name:"Wordware", slug:"wordware", website:"wordware.ai", founded:2024,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Agents", badgeColor:"indigo",
    employees:"50+", totalFunding:"$30M+", latestRound:"Seed", leadInvestor:"Benchmark",
    founders:["Robert Chandler","Filip Kozera"], description:"AI development platform letting anyone build powerful AI agents and apps without deep engineering knowledge.",
    shortDesc:"No-code platform for building AI agents.",
    logoInitial:"W", logoBg:"#4F46E5", logoColor:"#FFFFFF",
    tags:["No-Code","Agents","Developer Tools"], isNew:true },

  // ── AI CODING ────────────────────────────────────────────────
  { id:"cursor", name:"Cursor", slug:"cursor", website:"cursor.com", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Coding", badgeColor:"orange",
    employees:"200+", totalFunding:"$900M+", latestRound:"Series C", leadInvestor:"Thrive Capital",
    founders:["Michael Truell"], description:"AI-first code editor with deep codebase understanding, pair programming and autonomous coding.",
    shortDesc:"AI-first code editor for developers.",
    logoInitial:"C", logoBg:"#181818", logoColor:"#FFFFFF",
    tags:["Coding","IDE","Developer Tools"], isTrending:true, trendingRank:4,
    growth:312, sparkline:[22,28,35,38,50,54,62,70,84,100] },

  { id:"windsurf", name:"Windsurf", slug:"windsurf", website:"windsurf.com", founded:2021,
    hqCity:"Mountain View", hqCountry:"USA", category:"AI Coding", badgeColor:"blue",
    employees:"200+", totalFunding:"$240M+", latestRound:"Series C", leadInvestor:"General Catalyst",
    founders:["Varun Mohan"], description:"AI coding assistant and IDE offering free autocomplete, chat, and code generation for 70+ languages.",
    shortDesc:"Free AI coding assistant and IDE.",
    logoInitial:"W", logoBg:"#0984E3", logoColor:"#FFFFFF",
    tags:["Coding","IDE","Free AI Tools"],
    growth:245, sparkline:[18,24,30,36,46,50,60,70,82,100] },

  { id:"replit", name:"Replit", slug:"replit", website:"replit.com", founded:2016,
    hqCity:"Foster City", hqCountry:"USA", category:"AI Coding", badgeColor:"orange",
    employees:"200+", totalFunding:"$220M+", latestRound:"Series B", leadInvestor:"a16z",
    founders:["Amjad Masad"], description:"AI-powered collaborative browser IDE enabling anyone to code, build, and deploy instantly.",
    shortDesc:"AI-powered cloud IDE for everyone.",
    logoInitial:"R", logoBg:"#F26207", logoColor:"#FFFFFF",
    tags:["Coding","IDE","Cloud Dev"] },

  { id:"cognition-ai-2", name:"Cognition / Devin", slug:"cognition-ai", website:"cognition.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Coding", badgeColor:"purple",
    employees:"50+", totalFunding:"$200M+", latestRound:"Series B", leadInvestor:"Founders Fund",
    founders:["Scott Wu"], description:"Devin is the world's first fully autonomous AI software engineer — plans, codes, debugs, and deploys independently.",
    shortDesc:"Devin — autonomous AI software engineer.",
    logoInitial:"D", logoBg:"#5F27CD", logoColor:"#FFFFFF",
    tags:["Coding Agents","Autonomous","DevOps"] },

  { id:"poolside", name:"Poolside", slug:"poolside", website:"poolside.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Coding", badgeColor:"teal",
    employees:"50+", totalFunding:"$626M+", latestRound:"Series B", leadInvestor:"Bain Capital",
    founders:["Jason Warner"], description:"Building the most capable AI for software engineering through reinforcement learning on code.",
    shortDesc:"RL-based AI for software engineering.",
    logoInitial:"P", logoBg:"#00B4D8", logoColor:"#FFFFFF",
    tags:["Coding AI","RL","Software Engineering"] },

  { id:"magic", name:"Magic", slug:"magic", website:"magic.dev", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Coding", badgeColor:"gray",
    employees:"50+", totalFunding:"$515M+", latestRound:"Series C", leadInvestor:"CapitalG",
    founders:["Eric Steinberger"], description:"Building fully autonomous software engineers that understand and modify million-line codebases.",
    shortDesc:"Autonomous AI software engineers.",
    logoInitial:"M", logoBg:"#2D3436", logoColor:"#FFFFFF",
    tags:["Coding Agents","LLM","Developer AI"] },

  { id:"codeium", name:"Codeium", slug:"codeium", website:"codeium.com", founded:2021,
    hqCity:"Mountain View", hqCountry:"USA", category:"AI Coding", badgeColor:"green",
    employees:"200+", totalFunding:"$243M+", latestRound:"Series C", leadInvestor:"General Atlantic",
    founders:["Varun Mohan","Douglas Chen"], description:"Free AI coding assistant with autocomplete, chat, and search for 70+ languages and 40+ IDEs.",
    shortDesc:"Free AI coding assistant for 70+ languages.",
    logoInitial:"C", logoBg:"#22C55E", logoColor:"#FFFFFF",
    tags:["Coding","Free","IDE Plugin"] },

  { id:"github-copilot", name:"GitHub Copilot", slug:"github-copilot", website:"github.com/features/copilot", founded:2021,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Coding", badgeColor:"gray",
    employees:"5,000+", totalFunding:"$7.5B+", latestRound:"Strategic", leadInvestor:"Microsoft",
    founders:["Nat Friedman","Thomas Dohmke"], description:"AI pair programmer that suggests code and entire functions directly in your editor, powered by OpenAI Codex.",
    shortDesc:"AI pair programmer for every developer.",
    logoInitial:"G", logoBg:"#24292E", logoColor:"#FFFFFF",
    tags:["Coding","VSCode","GitHub","Copilot"] },

  { id:"tabnine", name:"Tabnine", slug:"tabnine", website:"tabnine.com", founded:2018,
    hqCity:"New York", hqCountry:"USA", category:"AI Coding", badgeColor:"indigo",
    employees:"200+", totalFunding:"$50M+", latestRound:"Series B", leadInvestor:"Qualcomm Ventures",
    founders:["Dror Weiss"], description:"AI code completion tool that runs locally or in the cloud, keeping enterprise code private and secure.",
    shortDesc:"Private AI code completion for enterprises.",
    logoInitial:"T", logoBg:"#4F46E5", logoColor:"#FFFFFF",
    tags:["Coding","Privacy","Enterprise","IDE"] },

  { id:"lovable", name:"Lovable", slug:"lovable", website:"lovable.dev", founded:2023,
    hqCity:"London", hqCountry:"UK", category:"AI Coding", badgeColor:"pink",
    employees:"50+", totalFunding:"$30M+", latestRound:"Series A", leadInvestor:"Creandum",
    founders:["Anton Osika"], description:"AI full-stack engineer that builds complete web apps from a single text prompt — no coding required.",
    shortDesc:"Build full web apps from a text prompt.",
    logoInitial:"L", logoBg:"#EC4899", logoColor:"#FFFFFF",
    tags:["App Builder","No-Code","Full Stack"], isNew:true },

  // ── AI SEARCH ────────────────────────────────────────────────
  { id:"perplexity", name:"Perplexity", slug:"perplexity", website:"perplexity.ai", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Search", badgeColor:"teal",
    employees:"200+", totalFunding:"$1B+", latestRound:"Growth", leadInvestor:"IVP",
    founders:["Aravind Srinivas"], description:"AI-powered search engine delivering real answers to complex questions in real-time.",
    shortDesc:"AI-powered search engine for real answers.",
    logoInitial:"P", logoBg:"#1DB8A8", logoColor:"#FFFFFF",
    tags:["Search","LLM","Answer Engine"], isTrending:true, trendingRank:3,
    growth:420, sparkline:[18,25,22,38,44,40,55,65,72,100] },

  { id:"you-com", name:"You.com", slug:"you-com", website:"you.com", founded:2020,
    hqCity:"Palo Alto", hqCountry:"USA", category:"AI Search", badgeColor:"indigo",
    employees:"50+", totalFunding:"$99M+", latestRound:"Series B", leadInvestor:"Salesforce Ventures",
    founders:["Richard Socher"], description:"AI-powered search engine giving users full control over their search experience with AI apps.",
    shortDesc:"AI search engine with user-controlled AI apps.",
    logoInitial:"Y", logoBg:"#6C5CE7", logoColor:"#FFFFFF",
    tags:["Search","AI Apps","Privacy"] },

  { id:"glean", name:"Glean", slug:"glean", website:"glean.com", founded:2019,
    hqCity:"Palo Alto", hqCountry:"USA", category:"AI Search", badgeColor:"green",
    employees:"500+", totalFunding:"$600M+", latestRound:"Series F", leadInvestor:"Wellington",
    founders:["Arvind Jain"], description:"AI-powered work assistant and enterprise search connecting all company knowledge sources.",
    shortDesc:"AI work assistant and enterprise search.",
    logoInitial:"G", logoBg:"#0F9D58", logoColor:"#FFFFFF",
    tags:["Enterprise Search","RAG","Productivity"] },

  { id:"phind", name:"Phind", slug:"phind", website:"phind.com", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Search", badgeColor:"teal",
    employees:"50+", totalFunding:"$10M+", latestRound:"Seed", leadInvestor:"Combinator",
    founders:["Michael Royzen"], description:"AI search engine specifically designed for developers to find technical answers and code examples fast.",
    shortDesc:"AI search engine built for developers.",
    logoInitial:"P", logoBg:"#0984E3", logoColor:"#FFFFFF",
    tags:["Developer Search","Code Search","AI Search"], isNew:true },

  { id:"exa-ai", name:"Exa AI", slug:"exa-ai", website:"exa.ai", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Search", badgeColor:"purple",
    employees:"50+", totalFunding:"$17M+", latestRound:"Series A", leadInvestor:"Sequoia",
    founders:["Jeff Wang"], description:"AI-native search engine that finds semantically similar web content using neural embeddings rather than keywords.",
    shortDesc:"Neural semantic search API for AI apps.",
    logoInitial:"E", logoBg:"#7C3AED", logoColor:"#FFFFFF",
    tags:["Semantic Search","API","Neural Search"] },

  { id:"kagi", name:"Kagi", slug:"kagi", website:"kagi.com", founded:2018,
    hqCity:"Palo Alto", hqCountry:"USA", category:"AI Search", badgeColor:"amber",
    employees:"50+", totalFunding:"$10M+", latestRound:"Seed", leadInvestor:"Self-funded",
    founders:["Vladimir Prelovac"], description:"Premium ad-free search engine with AI-powered answers, web summarization, and privacy-first design.",
    shortDesc:"Ad-free premium AI search engine.",
    logoInitial:"K", logoBg:"#F59E0B", logoColor:"#FFFFFF",
    tags:["Privacy","AI Search","Premium"] },

  { id:"andi", name:"Andi Search", slug:"andi", website:"andisearch.com", founded:2021,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Search", badgeColor:"coral",
    employees:"50+", totalFunding:"$5M+", latestRound:"Seed", leadInvestor:"Kindred Ventures",
    founders:["Angela Hoover"], description:"Generative AI search using conversational answers instead of blue links — like chatting with a smart friend.",
    shortDesc:"Conversational AI search without blue links.",
    logoInitial:"A", logoBg:"#FF5A5F", logoColor:"#FFFFFF",
    tags:["Search","Conversational AI","Privacy"] },

  // ── AI INFRASTRUCTURE ────────────────────────────────────────
  { id:"scale-ai", name:"Scale AI", slug:"scale-ai", website:"scale.com", founded:2016,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"orange",
    employees:"1,000+", totalFunding:"$1.6B+", latestRound:"Growth", leadInvestor:"Accel",
    founders:["Alexandr Wang"], description:"Data labeling and AI infrastructure powering the world's leading AI models and applications.",
    shortDesc:"AI data labeling and infrastructure platform.",
    logoInitial:"S", logoBg:"#FF6B35", logoColor:"#FFFFFF",
    tags:["Data Labeling","RLHF","Government AI"], isFeatured:true },

  { id:"databricks", name:"Databricks", slug:"databricks", website:"databricks.com", founded:2013,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"amber",
    employees:"5,000+", totalFunding:"$19B+", latestRound:"Growth", leadInvestor:"a16z",
    founders:["Ali Ghodsi"], description:"Unified data analytics and AI platform built on Apache Spark and Delta Lake for enterprises.",
    shortDesc:"Unified data and AI platform for enterprises.",
    logoInitial:"D", logoBg:"#E8360C", logoColor:"#FFFFFF",
    tags:["Data","Lakehouse","ML Platform"], isFeatured:true },

  { id:"together-ai", name:"Together AI", slug:"together-ai", website:"together.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"indigo",
    employees:"200+", totalFunding:"$500M+", latestRound:"Growth", leadInvestor:"General Catalyst",
    founders:["Vipul Ved Prakash"], description:"Fast inference cloud and fine-tuning platform for open-source AI models at any scale.",
    shortDesc:"Fast inference cloud for open-source AI.",
    logoInitial:"T", logoBg:"#6C5CE7", logoColor:"#FFFFFF",
    tags:["Cloud AI","Inference","Fine-tuning"] },

  { id:"langchain", name:"LangChain", slug:"langchain", website:"langchain.com", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"green",
    employees:"50+", totalFunding:"$125M+", latestRound:"Series B", leadInvestor:"IVP",
    founders:["Harrison Chase"], description:"Framework for building LLM-powered applications with chains, agents, memory and RAG.",
    shortDesc:"Framework for building LLM applications.",
    logoInitial:"L", logoBg:"#1ABC9C", logoColor:"#FFFFFF",
    tags:["LLM Framework","Open Source","Agents"] },

  { id:"llamaindex", name:"LlamaIndex", slug:"llamaindex", website:"llamaindex.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"amber",
    employees:"50+", totalFunding:"$27M+", latestRound:"Series A", leadInvestor:"Greylock",
    founders:["Jerry Liu"], description:"Data framework for building LLM applications with retrieval-augmented generation pipelines.",
    shortDesc:"RAG framework for LLM applications.",
    logoInitial:"L", logoBg:"#E67E22", logoColor:"#FFFFFF",
    tags:["RAG","LLM Framework","Open Source"] },

  { id:"baseten", name:"Baseten", slug:"baseten", website:"baseten.co", founded:2019,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"teal",
    employees:"50+", totalFunding:"$135M+", latestRound:"Series C", leadInvestor:"IVP",
    founders:["Tuhin Srivastava"], description:"ML model deployment platform that helps AI teams ship production-ready model APIs fast.",
    shortDesc:"Fast ML model deployment for production.",
    logoInitial:"B", logoBg:"#00897B", logoColor:"#FFFFFF",
    tags:["ML Infra","Model Serving","MLOps"] },

  { id:"fireworks-ai", name:"Fireworks AI", slug:"fireworks-ai", website:"fireworks.ai", founded:2022,
    hqCity:"Redwood City", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"orange",
    employees:"50+", totalFunding:"$77M+", latestRound:"Series B", leadInvestor:"Sequoia",
    founders:["Lin Qiao"], description:"Fastest inference platform for generative AI, running open-source models at blazing speed.",
    shortDesc:"Fastest inference platform for open-source AI.",
    logoInitial:"F", logoBg:"#F57C00", logoColor:"#FFFFFF",
    tags:["Inference","LLM Platform","Speed"] },

  { id:"modal", name:"Modal", slug:"modal", website:"modal.com", founded:2021,
    hqCity:"New York", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"indigo",
    employees:"50+", totalFunding:"$23M+", latestRound:"Series A", leadInvestor:"Redpoint",
    founders:["Erik Bernhardsson"], description:"Cloud platform for running AI and ML workloads with simple Python, no infrastructure needed.",
    shortDesc:"Serverless cloud for AI and ML workloads.",
    logoInitial:"M", logoBg:"#4F46E5", logoColor:"#FFFFFF",
    tags:["Serverless","MLOps","Cloud"] },

  { id:"replicate", name:"Replicate", slug:"replicate", website:"replicate.com", founded:2019,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"gray",
    employees:"50+", totalFunding:"$60M+", latestRound:"Series B", leadInvestor:"a16z",
    founders:["Ben Firshman","Andreas Jansson"], description:"Run open-source AI models in the cloud with a simple API — images, video, audio, language and more.",
    shortDesc:"Run any open-source AI model via API.",
    logoInitial:"R", logoBg:"#374151", logoColor:"#FFFFFF",
    tags:["Model API","Open Source","Cloud AI"] },

  { id:"hugging-face", name:"Hugging Face", slug:"hugging-face", website:"huggingface.co", founded:2016,
    hqCity:"New York", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"amber",
    employees:"200+", totalFunding:"$395M+", latestRound:"Series D", leadInvestor:"Salesforce Ventures",
    founders:["Clément Delangue","Julien Chaumond"], description:"The AI community's open platform for sharing models, datasets, and Spaces — the GitHub of AI.",
    shortDesc:"Open platform for AI models and datasets.",
    logoInitial:"H", logoBg:"#FFD21E", logoColor:"#111111",
    tags:["Open Source","Model Hub","Community"] },

  { id:"anyscale", name:"Anyscale", slug:"anyscale", website:"anyscale.com", founded:2019,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"blue",
    employees:"200+", totalFunding:"$260M+", latestRound:"Series C", leadInvestor:"a16z",
    founders:["Ion Stoica","Robert Nishihara"], description:"Managed Ray platform for scaling AI and Python workloads from laptop to cloud seamlessly.",
    shortDesc:"Managed Ray platform for scaling AI workloads.",
    logoInitial:"A", logoBg:"#0369A1", logoColor:"#FFFFFF",
    tags:["Ray","ML Infra","Distributed AI"] },

  { id:"cerebras", name:"Cerebras Systems", slug:"cerebras", website:"cerebras.net", founded:2016,
    hqCity:"Sunnyvale", hqCountry:"USA", category:"AI Infrastructure", badgeColor:"orange",
    employees:"500+", totalFunding:"$720M+", latestRound:"Series F", leadInvestor:"Abu Dhabi Growth Fund",
    founders:["Andrew Feldman"], description:"AI chip company building the world's fastest AI training hardware with the wafer-scale engine.",
    shortDesc:"World's fastest AI training hardware.",
    logoInitial:"C", logoBg:"#E55B13", logoColor:"#FFFFFF",
    tags:["AI Chips","Hardware","Training"] },

  // ── AI HEALTHCARE ────────────────────────────────────────────
  { id:"abridge", name:"Abridge", slug:"abridge", website:"abridge.com", founded:2018,
    hqCity:"Pittsburgh", hqCountry:"USA", category:"AI Healthcare", badgeColor:"green",
    employees:"200+", totalFunding:"$460M+", latestRound:"Series D", leadInvestor:"Lightspeed",
    founders:["Shiv Rao"], description:"AI medical documentation platform converting patient-physician conversations to structured clinical notes.",
    shortDesc:"AI clinical documentation from conversations.",
    logoInitial:"A", logoBg:"#0984E3", logoColor:"#FFFFFF",
    tags:["Healthcare","Clinical NLP","Documentation"] },

  { id:"hippocratic-ai", name:"Hippocratic AI", slug:"hippocratic-ai", website:"hippocraticai.com", founded:2023,
    hqCity:"Palo Alto", hqCountry:"USA", category:"AI Healthcare", badgeColor:"green",
    employees:"50+", totalFunding:"$278M+", latestRound:"Series B", leadInvestor:"General Catalyst",
    founders:["Munjal Shah"], description:"Safety-focused LLM for healthcare enabling AI nurses and patient care agents at scale.",
    shortDesc:"Safety-focused AI for healthcare and nursing.",
    logoInitial:"H", logoBg:"#00B894", logoColor:"#FFFFFF",
    tags:["Healthcare AI","LLM","Patient Care"] },

  { id:"tempus", name:"Tempus AI", slug:"tempus", website:"tempus.com", founded:2015,
    hqCity:"Chicago", hqCountry:"USA", category:"AI Healthcare", badgeColor:"blue",
    employees:"1,000+", totalFunding:"$1.3B+", latestRound:"Growth", leadInvestor:"Google",
    founders:["Eric Lefkofsky"], description:"AI-driven precision medicine company using clinical and molecular data to advance cancer diagnostics and treatment.",
    shortDesc:"AI precision medicine for cancer diagnostics.",
    logoInitial:"T", logoBg:"#1565C0", logoColor:"#FFFFFF",
    tags:["Precision Medicine","Cancer","Clinical AI"] },

  { id:"nabla", name:"Nabla", slug:"nabla", website:"nabla.com", founded:2018,
    hqCity:"Paris", hqCountry:"France", category:"AI Healthcare", badgeColor:"teal",
    employees:"200+", totalFunding:"$52M+", latestRound:"Series B", leadInvestor:"Cathay Innovation",
    founders:["Alexandre Lebrun","Delphine Groll"], description:"AI copilot for physicians automating clinical notes from doctor-patient conversations in real time.",
    shortDesc:"AI copilot for physician documentation.",
    logoInitial:"N", logoBg:"#00BCD4", logoColor:"#FFFFFF",
    tags:["Clinical Notes","Healthcare AI","Physician AI"] },

  { id:"corti", name:"Corti", slug:"corti", website:"corti.ai", founded:2016,
    hqCity:"London", hqCountry:"UK", category:"AI Healthcare", badgeColor:"amber",
    employees:"200+", totalFunding:"$130M+", latestRound:"Series B", leadInvestor:"Prosus",
    founders:["Andreas Cleve"], description:"AI that listens to clinical conversations and provides real-time decision support to emergency responders.",
    shortDesc:"Real-time AI decision support for emergency care.",
    logoInitial:"C", logoBg:"#F59E0B", logoColor:"#FFFFFF",
    tags:["Emergency AI","Clinical Decision","Healthcare"] },

  { id:"insitro", name:"Insitro", slug:"insitro", website:"insitro.com", founded:2018,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Healthcare", badgeColor:"purple",
    employees:"200+", totalFunding:"$400M+", latestRound:"Series C", leadInvestor:"a16z Bio",
    founders:["Daphne Koller"], description:"Machine learning drug discovery company combining ML with high-throughput biology to find new medicines.",
    shortDesc:"ML-driven drug discovery and development.",
    logoInitial:"I", logoBg:"#7C3AED", logoColor:"#FFFFFF",
    tags:["Drug Discovery","ML","Biotech"] },

  { id:"recursion", name:"Recursion Pharmaceuticals", slug:"recursion", website:"recursion.com", founded:2013,
    hqCity:"Salt Lake City", hqCountry:"USA", category:"AI Healthcare", badgeColor:"green",
    employees:"500+", totalFunding:"$1B+", latestRound:"Growth", leadInvestor:"NVIDIA",
    founders:["Chris Gibson"], description:"Decoding biology using AI and massive cellular imaging data to discover drugs faster and cheaper.",
    shortDesc:"AI drug discovery using cellular imaging.",
    logoInitial:"R", logoBg:"#059669", logoColor:"#FFFFFF",
    tags:["Drug Discovery","Biology AI","Imaging"] },

  { id:"suki-ai", name:"Suki AI", slug:"suki-ai", website:"suki.ai", founded:2017,
    hqCity:"Redwood City", hqCountry:"USA", category:"AI Healthcare", badgeColor:"indigo",
    employees:"200+", totalFunding:"$165M+", latestRound:"Series D", leadInvestor:"March Capital",
    founders:["Punit Soni"], description:"AI-powered voice assistant for physicians reducing documentation time and administrative burden.",
    shortDesc:"AI voice assistant for physician documentation.",
    logoInitial:"S", logoBg:"#4F46E5", logoColor:"#FFFFFF",
    tags:["Voice AI","EHR","Clinical Documentation"] },

  // ── OTHER CATEGORIES (for all-startups page) ─────────────────
  { id:"elevenlabs", name:"ElevenLabs", slug:"elevenlabs", website:"elevenlabs.io", founded:2022,
    hqCity:"New York", hqCountry:"USA", category:"AI Voice", badgeColor:"purple",
    employees:"200+", totalFunding:"$280M+", latestRound:"Series D", leadInvestor:"Sequoia",
    founders:["Mati Staniszewski"], description:"AI voice platform generating ultra-realistic synthetic speech in 29 languages with voice cloning.",
    shortDesc:"AI voice platform for voice generation.",
    logoInitial:"E", logoBg:"#000000", logoColor:"#FFFFFF",
    tags:["Voice","TTS","Audio","API"], isTrending:true, trendingRank:5 },

  { id:"runway", name:"Runway", slug:"runway", website:"runwayml.com", founded:2018,
    hqCity:"New York", hqCountry:"USA", category:"AI Video", badgeColor:"purple",
    employees:"200+", totalFunding:"$500M+", latestRound:"Series E", leadInvestor:"General Atlantic",
    founders:["Cristobal Valenzuela"], description:"Multi-modal AI tools for video generation, editing, and creative storytelling workflows.",
    shortDesc:"AI video generation and editing tools.",
    logoInitial:"R", logoBg:"#1A1A2E", logoColor:"#FFFFFF",
    tags:["Video Gen","Creative AI","Gen-2"] },

  { id:"harvey", name:"Harvey", slug:"harvey", website:"harvey.ai", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Legal", badgeColor:"gray",
    employees:"200+", totalFunding:"$800M+", latestRound:"Series D", leadInvestor:"Sequoia",
    founders:["Winston Weinberg"], description:"Generative AI platform purpose-built for law firms, legal ops, and in-house legal teams.",
    shortDesc:"Generative AI for law firms and legal teams.",
    logoInitial:"H", logoBg:"#1C1C1E", logoColor:"#FFFFFF",
    tags:["Legal","LLM","Enterprise AI"] },

  { id:"figure-ai", name:"Figure AI", slug:"figure-ai", website:"figure.ai", founded:2022,
    hqCity:"Sunnyvale", hqCountry:"USA", category:"AI Robotics", badgeColor:"gray",
    employees:"200+", totalFunding:"$850M+", latestRound:"Series C", leadInvestor:"Microsoft",
    founders:["Brett Adcock"], description:"Building general-purpose humanoid robots capable of autonomous complex real-world tasks.",
    shortDesc:"General-purpose humanoid robot company.",
    logoInitial:"F", logoBg:"#2D3436", logoColor:"#FFFFFF",
    tags:["Robotics","Humanoid","AI Hardware"] },

  { id:"synthesia", name:"Synthesia", slug:"synthesia", website:"synthesia.io", founded:2017,
    hqCity:"London", hqCountry:"UK", category:"AI Video", badgeColor:"purple",
    employees:"500+", totalFunding:"$330M+", latestRound:"Series E", leadInvestor:"Accel",
    founders:["Victor Riparbelli"], description:"AI video generation platform creating professional videos with AI avatars from text scripts.",
    shortDesc:"AI video platform with AI avatars.",
    logoInitial:"S", logoBg:"#7C3AED", logoColor:"#FFFFFF",
    tags:["Video AI","Avatars","Enterprise"],
    growth:289, sparkline:[26,30,38,42,50,54,62,68,80,100] },

  { id:"pika", name:"Pika", slug:"pika", website:"pika.art", founded:2023,
    hqCity:"Palo Alto", hqCountry:"USA", category:"AI Video", badgeColor:"pink",
    employees:"50+", totalFunding:"$135M+", latestRound:"Series B", leadInvestor:"Lightspeed",
    founders:["Demi Guo"], description:"AI-powered video creation tool letting anyone create and edit professional videos from text.",
    shortDesc:"AI video creation from text prompts.",
    logoInitial:"P", logoBg:"#E040FB", logoColor:"#FFFFFF",
    tags:["Video Gen","Creative","Text-to-Video"],
    growth:198, sparkline:[28,32,38,44,50,58,64,72,82,100] },

  { id:"heygen", name:"HeyGen", slug:"heygen", website:"heygen.com", founded:2020,
    hqCity:"Los Angeles", hqCountry:"USA", category:"AI Video", badgeColor:"pink",
    employees:"50+", totalFunding:"$60M+", latestRound:"Growth", leadInvestor:"Benchmark",
    founders:["Joshua Xu"], description:"AI video generation with avatars, voice cloning, and instant video translation to 40+ languages.",
    shortDesc:"AI avatars, video and voice translation.",
    logoInitial:"H", logoBg:"#FF6B9D", logoColor:"#FFFFFF",
    tags:["Video AI","Avatars","Translation"] },

  { id:"character-ai", name:"Character.AI", slug:"character-ai", website:"character.ai", founded:2021,
    hqCity:"Menlo Park", hqCountry:"USA", category:"AI Companions", badgeColor:"coral",
    employees:"200+", totalFunding:"$300M+", latestRound:"Strategic", leadInvestor:"a16z",
    founders:["Noam Shazeer"], description:"Platform to create and interact with AI personalities with distinct characters and backstories.",
    shortDesc:"Create and interact with AI characters.",
    logoInitial:"C", logoBg:"#FF4757", logoColor:"#FFFFFF",
    tags:["Chatbot","Characters","Consumer AI"] },

  { id:"suno", name:"Suno", slug:"suno", website:"suno.com", founded:2022,
    hqCity:"Cambridge", hqCountry:"USA", category:"AI Music", badgeColor:"amber",
    employees:"50+", totalFunding:"$125M+", latestRound:"Series B", leadInvestor:"Lightspeed",
    founders:["Mikey Shulman"], description:"AI music generation platform creating original full songs from text prompts in seconds.",
    shortDesc:"AI music generation from text prompts.",
    logoInitial:"S", logoBg:"#FF9F43", logoColor:"#FFFFFF",
    tags:["Music AI","Audio Gen","Creative"] },

  { id:"writer", name:"Writer", slug:"writer", website:"writer.com", founded:2020,
    hqCity:"San Francisco", hqCountry:"USA", category:"Enterprise AI", badgeColor:"gray",
    employees:"200+", totalFunding:"$320M+", latestRound:"Series C", leadInvestor:"ICONIQ",
    founders:["May Habib"], description:"Full-stack generative AI platform for enterprises with fine-tuned models and governance features.",
    shortDesc:"Full-stack enterprise generative AI platform.",
    logoInitial:"W", logoBg:"#2C3E50", logoColor:"#FFFFFF",
    tags:["Enterprise AI","Content","LLM"] },

  { id:"jasper", name:"Jasper", slug:"jasper", website:"jasper.ai", founded:2021,
    hqCity:"Austin", hqCountry:"USA", category:"AI Writing", badgeColor:"indigo",
    employees:"200+", totalFunding:"$130M+", latestRound:"Series A", leadInvestor:"Insight",
    founders:["Dave Rogenmoser"], description:"AI content platform for marketing teams to create brand-consistent content at scale.",
    shortDesc:"AI content platform for marketing teams.",
    logoInitial:"J", logoBg:"#6C5CE7", logoColor:"#FFFFFF",
    tags:["Marketing AI","Content","Copywriting"] },

  { id:"gamma", name:"Gamma", slug:"gamma", website:"gamma.app", founded:2020,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Presentations", badgeColor:"purple",
    employees:"50+", totalFunding:"$20M+", latestRound:"Series A", leadInvestor:"Accel",
    founders:["Grant Lee"], description:"AI-powered tool for creating beautiful presentations, documents, and webpages instantly.",
    shortDesc:"AI-powered presentations and documents.",
    logoInitial:"G", logoBg:"#A29BFE", logoColor:"#FFFFFF",
    tags:["Presentations","Design","Productivity"] },

  { id:"sierra", name:"Sierra", slug:"sierra", website:"sierra.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"Conversational AI", badgeColor:"green",
    employees:"200+", totalFunding:"$285M+", latestRound:"Series B", leadInvestor:"Sequoia",
    founders:["Bret Taylor"], description:"Conversational AI platform for brands to deploy personalized customer service AI agents.",
    shortDesc:"AI agents for customer service and support.",
    logoInitial:"S", logoBg:"#00B894", logoColor:"#FFFFFF",
    tags:["Customer Service","Agents","Enterprise"] },

  { id:"pinecone", name:"Pinecone", slug:"pinecone", website:"pinecone.io", founded:2019,
    hqCity:"New York", hqCountry:"USA", category:"Vector Database", badgeColor:"blue",
    employees:"200+", totalFunding:"$140M+", latestRound:"Series B", leadInvestor:"a16z",
    founders:["Edo Liberty"], description:"Vector database built for AI applications requiring semantic search and long-term memory.",
    shortDesc:"Vector database for semantic search.",
    logoInitial:"P", logoBg:"#1E90FF", logoColor:"#FFFFFF",
    tags:["Vector DB","RAG","Semantic Search"] },

  { id:"weaviate", name:"Weaviate", slug:"weaviate", website:"weaviate.io", founded:2019,
    hqCity:"Amsterdam", hqCountry:"Netherlands", category:"Vector Database", badgeColor:"teal",
    employees:"50+", totalFunding:"$70M+", latestRound:"Series B", leadInvestor:"Battery",
    founders:["Bob van Luijt"], description:"Open-source vector database with semantic search, Q&A, and classification built in.",
    shortDesc:"Open-source vector database for AI.",
    logoInitial:"W", logoBg:"#00C6A2", logoColor:"#FFFFFF",
    tags:["Vector DB","Open Source","Semantic Search"] },

  { id:"decagon", name:"Decagon", slug:"decagon", website:"decagon.ai", founded:2023,
    hqCity:"San Francisco", hqCountry:"USA", category:"AI Customer Support", badgeColor:"teal",
    employees:"50+", totalFunding:"$165M+", latestRound:"Series B", leadInvestor:"Accel",
    founders:["Jesse Zhang"], description:"AI customer support platform that autonomously resolves customer issues end-to-end without human escalation.",
    shortDesc:"AI that autonomously resolves customer issues.",
    logoInitial:"D", logoBg:"#00CEC9", logoColor:"#FFFFFF",
    tags:["Customer Support","Agents","Enterprise"] },

  { id:"clay", name:"Clay", slug:"clay", website:"clay.com", founded:2017,
    hqCity:"New York", hqCountry:"USA", category:"AI Sales", badgeColor:"pink",
    employees:"200+", totalFunding:"$100M+", latestRound:"Series B", leadInvestor:"Sequoia",
    founders:["Kareem Amin"], description:"AI-powered data enrichment and outreach platform for modern go-to-market and sales teams.",
    shortDesc:"AI data enrichment for GTM teams.",
    logoInitial:"C", logoBg:"#FD79A8", logoColor:"#FFFFFF",
    tags:["Sales AI","GTM","Outreach"] },

  { id:"hebbia", name:"Hebbia", slug:"hebbia", website:"hebbia.ai", founded:2020,
    hqCity:"New York", hqCountry:"USA", category:"Enterprise AI", badgeColor:"gray",
    employees:"50+", totalFunding:"$160M+", latestRound:"Series B", leadInvestor:"a16z",
    founders:["George Sivulka"], description:"AI platform for complex document analysis powering Wall Street firms and top legal teams.",
    shortDesc:"AI document analysis for finance and legal.",
    logoInitial:"H", logoBg:"#636E72", logoColor:"#FFFFFF",
    tags:["Document AI","Finance","Legal AI"] },

  { id:"elicit", name:"Elicit", slug:"elicit", website:"elicit.com", founded:2021,
    hqCity:"Oakland", hqCountry:"USA", category:"AI Research", badgeColor:"blue",
    employees:"50+", totalFunding:"$10M+", latestRound:"Seed", leadInvestor:"OSV",
    founders:["Andres Bravo"], description:"AI research assistant that helps researchers search, analyze, and synthesize scientific literature.",
    shortDesc:"AI research assistant for scientists.",
    logoInitial:"E", logoBg:"#2980B9", logoColor:"#FFFFFF",
    tags:["Research AI","Scientific","Literature"] },

  { id:"typeface", name:"Typeface", slug:"typeface", website:"typeface.ai", founded:2022,
    hqCity:"San Francisco", hqCountry:"USA", category:"Enterprise AI", badgeColor:"blue",
    employees:"200+", totalFunding:"$165M+", latestRound:"Series B", leadInvestor:"Lightspeed",
    founders:["Abhay Parasnis"], description:"Brand-personalized generative AI for enterprise content creation at scale.",
    shortDesc:"Brand-personalized generative AI for enterprises.",
    logoInitial:"T", logoBg:"#0652DD", logoColor:"#FFFFFF",
    tags:["Brand AI","Enterprise","Content"] },
];

// ── Derived lists ──────────────────────────────────────────────
export const TRENDING = ALL_STARTUPS
  .filter(s => s.isTrending)
  .sort((a,b) => (a.trendingRank||99)-(b.trendingRank||99));

export const FEATURED = ALL_STARTUPS.filter(s => s.isFeatured);

export const TRENDING_EXTENDED = [
  ...TRENDING,
  ...ALL_STARTUPS.filter(s => !s.isTrending),
];

// ── Recently Funded ───────────────────────────────────────────
export type FundingEntry = {
  id:string; name:string; slug:string;
  logoInitial:string; logoBg:string; logoColor:string;
  round:string; amount:string; date:string;
  investors:string; category:string; badgeColor:BadgeColor;
};

export const RECENTLY_FUNDED: FundingEntry[] = [
  { id:"xai", name:"xAI", slug:"xai", logoInitial:"X", logoBg:"#000000", logoColor:"#FFFFFF", round:"Series C", amount:"$12B", date:"May 2025", investors:"Andreessen Horowitz, Sequoia", category:"Generative AI", badgeColor:"blue" },
  { id:"deepseek", name:"DeepSeek", slug:"deepseek", logoInitial:"D", logoBg:"#0A6EBD", logoColor:"#FFFFFF", round:"Strategic", amount:"$7.4B", date:"Jun 2025", investors:"High-Flyer Capital", category:"Foundation Models", badgeColor:"blue" },
  { id:"mercor", name:"Mercor", slug:"mercor", logoInitial:"M", logoBg:"#5F27CD", logoColor:"#FFFFFF", round:"Growth", amount:"$100M", date:"May 2026", investors:"Peter Thiel, Jack Dorsey", category:"AI Recruiting", badgeColor:"purple" },
  { id:"h-company", name:"H Company", slug:"h-company", logoInitial:"H", logoBg:"#2C3E50", logoColor:"#FFFFFF", round:"Seed", amount:"$220M", date:"Apr 2024", investors:"Accel, Eric Schmidt", category:"AI Agents", badgeColor:"gray" },
  { id:"inflection", name:"Inflection AI", slug:"inflection", logoInitial:"I", logoBg:"#6C5CE7", logoColor:"#FFFFFF", round:"Series B", amount:"$1.3B", date:"May 2024", investors:"Microsoft, NVIDIA, Reid Hoffman", category:"Foundation Models", badgeColor:"indigo" },
  { id:"harvey-f", name:"Harvey", slug:"harvey", logoInitial:"H", logoBg:"#1C1C1E", logoColor:"#FFFFFF", round:"Series D", amount:"$800M", date:"Apr 2025", investors:"Sequoia, Google", category:"AI Legal", badgeColor:"gray" },
  { id:"runway-f", name:"Runway", slug:"runway", logoInitial:"R", logoBg:"#1A1A2E", logoColor:"#FFFFFF", round:"Series E", amount:"$500M", date:"Mar 2024", investors:"General Atlantic, Google", category:"AI Video", badgeColor:"purple" },
];

// ── Fast Growing ──────────────────────────────────────────────
export type GrowthEntry = {
  id:string; name:string; growth:number;
  logoBg:string; logoColor:string; logoInitial:string;
  sparkline:number[];
};
export const FAST_GROWING: GrowthEntry[] = [
  { id:"perplexity", name:"Perplexity", growth:420, logoBg:"#1DB8A8", logoColor:"#FFFFFF", logoInitial:"P", sparkline:[18,25,22,38,44,40,55,65,72,100] },
  { id:"cursor",     name:"Cursor",     growth:312, logoBg:"#181818", logoColor:"#FFFFFF", logoInitial:"C", sparkline:[22,28,35,38,50,54,62,70,84,100] },
  { id:"synthesia",  name:"Synthesia",  growth:289, logoBg:"#7C3AED", logoColor:"#FFFFFF", logoInitial:"S", sparkline:[26,30,38,42,50,54,62,68,80,100] },
  { id:"windsurf",   name:"Windsurf",   growth:245, logoBg:"#0984E3", logoColor:"#FFFFFF", logoInitial:"W", sparkline:[18,24,30,36,46,50,60,70,82,100] },
  { id:"pika",       name:"Pika",       growth:198, logoBg:"#E040FB", logoColor:"#FFFFFF", logoInitial:"P", sparkline:[28,32,38,44,50,58,64,72,82,100] },
  { id:"heygen",     name:"HeyGen",     growth:175, logoBg:"#FF6B9D", logoColor:"#FFFFFF", logoInitial:"H", sparkline:[22,28,34,40,46,54,60,70,82,100] },
  { id:"decagon",    name:"Decagon",    growth:156, logoBg:"#00CEC9", logoColor:"#FFFFFF", logoInitial:"D", sparkline:[20,26,32,38,48,52,58,68,80,100] },
];

// ── Newly Added ───────────────────────────────────────────────
export type NewEntry = {
  id:string; name:string; slug:string; website:string;
  logoInitial:string; logoBg:string; logoColor:string;
  category:string; badgeColor:BadgeColor; addedDaysAgo:number;
};

export const NEWLY_ADDED: NewEntry[] = [
  { id:"letta",          name:"Letta",          slug:"letta",          website:"letta.ai",              logoInitial:"L", logoBg:"#F57C00", logoColor:"#FFFFFF", category:"AI Agents",       badgeColor:"orange", addedDaysAgo:1 },
  { id:"wordware",       name:"Wordware",       slug:"wordware",       website:"wordware.ai",           logoInitial:"W", logoBg:"#4F46E5", logoColor:"#FFFFFF", category:"AI Agents",       badgeColor:"indigo", addedDaysAgo:2 },
  { id:"lovable",        name:"Lovable",        slug:"lovable",        website:"lovable.dev",           logoInitial:"L", logoBg:"#EC4899", logoColor:"#FFFFFF", category:"AI Coding",       badgeColor:"pink",   addedDaysAgo:2 },
  { id:"phind",          name:"Phind",          slug:"phind",          website:"phind.com",             logoInitial:"P", logoBg:"#0984E3", logoColor:"#FFFFFF", category:"AI Search",       badgeColor:"teal",   addedDaysAgo:3 },
  { id:"exa-ai",         name:"Exa AI",         slug:"exa-ai",         website:"exa.ai",                logoInitial:"E", logoBg:"#7C3AED", logoColor:"#FFFFFF", category:"AI Search",       badgeColor:"purple", addedDaysAgo:4 },
  { id:"h-company",      name:"H Company",      slug:"h-company",      website:"hcompany.ai",           logoInitial:"H", logoBg:"#2C3E50", logoColor:"#FFFFFF", category:"AI Agents",       badgeColor:"gray",   addedDaysAgo:4 },
  { id:"apollo-research",name:"Apollo Research",slug:"apollo-research",website:"apolloresearch.ai",    logoInitial:"A", logoBg:"#2C3E50", logoColor:"#FFFFFF", category:"AI Safety",       badgeColor:"indigo", addedDaysAgo:5 },
];

// ── Categories ────────────────────────────────────────────────
export const CATEGORIES = [
  { id:"ai-agents",         name:"AI Agents",         description:"Autonomous systems and agent platforms", icon:"agents",   color:"#FF5A5F", bgColor:"rgba(255,90,95,0.10)"  },
  { id:"ai-coding",         name:"AI Coding",         description:"Developer tools and copilots",           icon:"coding",   color:"#3B82F6", bgColor:"rgba(59,130,246,0.10)" },
  { id:"ai-search",         name:"AI Search",         description:"Search, discovery and retrieval",         icon:"search",   color:"#8B5CF6", bgColor:"rgba(139,92,246,0.10)" },
  { id:"ai-infrastructure", name:"AI Infrastructure", description:"Models, cloud, chips and compute",        icon:"infra",    color:"#0EA5E9", bgColor:"rgba(14,165,233,0.10)" },
  { id:"ai-security",       name:"AI Security",       description:"Security, safety, threat detection",      icon:"security", color:"#10B981", bgColor:"rgba(16,185,129,0.10)" },
  { id:"ai-healthcare",     name:"AI Healthcare",     description:"Healthcare, biotech and life sciences",   icon:"health",   color:"#F59E0B", bgColor:"rgba(245,158,11,0.10)" },
];

// ── Extended Funding ──────────────────────────────────────────
export const RECENTLY_FUNDED_EXTRA: FundingEntry[] = [
  ...RECENTLY_FUNDED,
  { id:"cohere-f",     name:"Cohere",     slug:"cohere",     logoInitial:"C", logoBg:"#3B5BDB", logoColor:"#FFFFFF", round:"Series C",  amount:"$270M",  date:"Apr 2024",  investors:"Inovia Capital, PSP",         category:"AI Infrastructure", badgeColor:"teal" },
  { id:"mistral-f",   name:"Mistral AI", slug:"mistral",    logoInitial:"M", logoBg:"#FF6B35", logoColor:"#FFFFFF", round:"Series B",  amount:"$640M",  date:"Jun 2024",  investors:"Andreessen Horowitz, NVIDIA", category:"Generative AI",    badgeColor:"blue" },
  { id:"glean-f",     name:"Glean",      slug:"glean",      logoInitial:"G", logoBg:"#0F9D58", logoColor:"#FFFFFF", round:"Series F",  amount:"$260M",  date:"Feb 2024",  investors:"Wellington, Kleiner",         category:"AI Search",        badgeColor:"green"},
  { id:"elevenf",     name:"ElevenLabs", slug:"elevenlabs", logoInitial:"E", logoBg:"#000000", logoColor:"#FFFFFF", round:"Series C",  amount:"$180M",  date:"Jan 2025",  investors:"Andreessen Horowitz, Sequoia",category:"AI Voice",         badgeColor:"purple"},
];

// ── Extended Growth ───────────────────────────────────────────
export const FAST_GROWING_EXTRA: GrowthEntry[] = [
  ...FAST_GROWING,
  { id:"elevenlabs-g", name:"ElevenLabs", growth:142, logoBg:"#000000", logoColor:"#FFFFFF", logoInitial:"E", sparkline:[18,22,28,34,42,48,56,65,78,100] },
  { id:"runway-g",     name:"Runway",     growth:128, logoBg:"#1A1A2E", logoColor:"#FFFFFF", logoInitial:"R", sparkline:[20,24,30,36,44,50,58,66,80,100] },
  { id:"lovable-g",    name:"Lovable",    growth:310, logoBg:"#EC4899", logoColor:"#FFFFFF", logoInitial:"L", sparkline:[10,18,28,40,54,65,74,82,90,100] },
];

// ── Extended Newly Added ──────────────────────────────────────
export const NEWLY_ADDED_EXTRA: NewEntry[] = [
  ...NEWLY_ADDED,
  { id:"codeium",   name:"Codeium",   slug:"codeium",   website:"codeium.com",    logoInitial:"C", logoBg:"#22C55E", logoColor:"#FFFFFF", category:"AI Coding",     badgeColor:"green",  addedDaysAgo:7 },
  { id:"nabla",     name:"Nabla",     slug:"nabla",     website:"nabla.com",      logoInitial:"N", logoBg:"#00BCD4", logoColor:"#FFFFFF", category:"AI Healthcare", badgeColor:"teal",   addedDaysAgo:8 },
  { id:"conjecture",name:"Conjecture",slug:"conjecture",website:"conjecture.dev", logoInitial:"C", logoBg:"#8E44AD", logoColor:"#FFFFFF", category:"AI Safety",     badgeColor:"purple", addedDaysAgo:9 },
];