// src/data/fetchProducts.ts
// Connects the Products section to the live backend API.
// Follows the same pattern as fetchStartups.ts:
//   - real API fields win
//   - curated/display-only fields fall back to dummy data
//   - on any API failure, the page keeps working with dummy data

const API_BASE = "https://graph-one-api.vcscorecard.workers.dev/api/v1";

// ── API response shapes (what the backend products endpoints return) ──
export type ApiProductStartup = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
};

export type ApiProductAlternative = {
  productTo?: ApiProduct;
  productFrom?: ApiProduct;
};

export type ApiProduct = {
  id: string;
  startupId: string;
  name: string;
  slug: string;
  description?: string | null;
  about?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  category?: string | null;
  pricingModel?: "FREE" | "FREEMIUM" | "PAID" | "ENTERPRISE" | null;
  launchDate?: string | null;
  screenshotUrls?: string[];
  features?: string[];
  isVerified?: boolean;
  isFeatured?: boolean;
  startup?: ApiProductStartup;
  alternativesFrom?: ApiProductAlternative[];
  alternativesTo?: ApiProductAlternative[];
};

// ── UI shapes used by the existing design (do NOT change these) ──
export type ProductCard = {
  id: string | number;
  slug: string;
  name: string;
  tagline: string;
  categories: string[];
  badge: string;
  likes: string;
  comments: string;
  domain: string;
  logoUrl?: string;
};

export type ProductDetail = {
  name: string;
  tagline: string;
  maker: string;
  domain: string;
  logoBg: string;
  logoUrl?: string;
  categories: string[];
  saves: string;
  trending: string;
  collections: number;
  launched: string;
  about: string;
  features: string[];
  useCases: string[];
  website: string;
  company: string;
  founded: string;
  country: string;
  status: string;
  twitter: string;
  linkedin: string;
  alternatives: { name: string; maker: string; domain: string }[];
  allCategories: string[];
};

// ── Helpers ──────────────────────────────────────────────────
function toDomain(website?: string | null): string {
  if (!website) return "";
  return website.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function formatLaunch(date?: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

// Stable hash so the same product always produces the same numbers.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// The backend doesn't provide engagement metrics yet, so we derive
// stable display values from the slug to keep the card design complete.
function synthLikes(slug: string): string {
  const k = 1 + (hashString(slug) % 90) / 10; // 1.0K – 9.9K
  return `${k.toFixed(1)}K`;
}

function synthComments(slug: string): string {
  return String(50 + (hashString(`${slug}-c`) % 600)); // 50 – 649
}

const SYNTH_BADGES = [
  "🔥 Trending",
  "❤️ Most used this week",
  "⭐ Top rated",
  "⬆️ Fastest growing",
  "",
  "",
];

function synthBadge(slug: string, isFeatured?: boolean): string {
  if (isFeatured) return "⭐ Featured";
  return SYNTH_BADGES[hashString(`${slug}-b`) % SYNTH_BADGES.length];
}

// ── Map one API product → listing card shape ──────────────────
export function mapApiToCard(api: ApiProduct, dummy?: Partial<ProductCard>): ProductCard {
  return {
    id: api.id,
    slug: api.slug,
    name: api.name ?? dummy?.name ?? "",
    tagline: api.description ?? dummy?.tagline ?? "",
    categories: api.category ? [api.category] : dummy?.categories ?? [],
    badge: dummy?.badge ?? synthBadge(api.slug, api.isFeatured),
    // likes / comments are not provided by the API yet — keep dummy if present,
    // otherwise derive a stable value so the design stays consistent.
    likes: dummy?.likes ?? synthLikes(api.slug),
    comments: dummy?.comments ?? synthComments(api.slug),
    domain: toDomain(api.website) || dummy?.domain || "",
    logoUrl: api.logoUrl ?? undefined,
  };
}

// ── Map one API product → detail page shape ───────────────────
export function mapApiToDetail(api: ApiProduct, dummy?: Partial<ProductDetail>): ProductDetail {
  // Build alternatives from both relation directions
  const altRecords = [...(api.alternativesFrom ?? []), ...(api.alternativesTo ?? [])];
  const alternatives = altRecords
    .map((rel) => rel.productTo ?? rel.productFrom)
    .filter((p): p is ApiProduct => Boolean(p))
    .map((p) => ({
      name: p.name,
      maker: p.startup?.name ?? "",
      domain: toDomain(p.website),
    }));

  return {
    name: api.name ?? dummy?.name ?? "",
    tagline: api.description ?? dummy?.tagline ?? "",
    maker: api.startup?.name ?? dummy?.maker ?? "",
    domain: toDomain(api.website) || dummy?.domain || "",
    logoBg: dummy?.logoBg ?? "#1F2430",
    logoUrl: api.logoUrl ?? undefined,
    categories: api.category ? [api.category] : dummy?.categories ?? [],
    about: api.about ?? api.description ?? dummy?.about ?? "",
    features: api.features && api.features.length ? api.features : dummy?.features ?? [],
    launched: formatLaunch(api.launchDate) || dummy?.launched || "",
    website: toDomain(api.website) || dummy?.website || "",
    company: api.startup?.name ?? dummy?.company ?? "",
    alternatives: alternatives.length ? alternatives : dummy?.alternatives ?? [],
    allCategories: api.category ? [api.category] : dummy?.allCategories ?? [],
    // ── Fields the API does not provide yet — fall back to dummy/synthetic ──
    saves: dummy?.saves ?? synthLikes(api.slug),
    trending: dummy?.trending ?? `#${1 + (hashString(api.slug) % 20)}`,
    collections: dummy?.collections ?? 10 + (hashString(`${api.slug}-col`) % 50),
    useCases: dummy?.useCases ?? [],
    founded: dummy?.founded ?? "",
    country: dummy?.country ?? "",
    status: dummy?.status ?? "Active",
    twitter: dummy?.twitter ?? "",
    linkedin: dummy?.linkedin ?? "",
  };
}

// ── Fetch the product list from the API (null on failure) ─────
export async function fetchApiProducts(): Promise<ApiProduct[] | null> {
  try {
    const res = await fetch(`${API_BASE}/products?limit=100`);
    if (!res.ok) {
      console.warn(`[fetchProducts] API returned ${res.status} — using dummy data`);
      return null;
    }
    const json = await res.json();
    const records = json.data ?? [];
    if (!Array.isArray(records) || records.length === 0) {
      console.warn("[fetchProducts] API returned empty — using dummy data");
      return null;
    }
    return records as ApiProduct[];
  } catch (err) {
    console.warn("[fetchProducts] Fetch failed — using dummy data", err);
    return null;
  }
}

// ── Fetch a single product by slug from the API (null on failure) ──
export async function fetchApiProductBySlug(slug: string): Promise<ApiProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    if (!res.ok) {
      console.warn(`[fetchProducts] API returned ${res.status} for ${slug} — using dummy data`);
      return null;
    }
    const json = await res.json();
    return (json.data ?? null) as ApiProduct | null;
  } catch (err) {
    console.warn(`[fetchProducts] Fetch failed for ${slug} — using dummy data`, err);
    return null;
  }
}
