export type BlogArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution: string }
  | { type: "image"; url: string; alt: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraphs for listing cards and fallback when `articleBlocks` is absent */
  body: string[];
  category: string;
  /** ISO 8601 date string */
  publishedAt: string;
  imageUrl: string;
  /** Prefer in “Featured” sidebar when true */
  featured?: boolean;
  /** Defaults in the UI if omitted */
  authorName?: string;
  /** Topic pills under hero; defaults to `[category]` */
  tags?: string[];
  /** Rich article body; when set, detail page uses this instead of flat `body` */
  articleBlocks?: BlogArticleBlock[];
  /** Footer author card on detail page */
  authorBio?: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
};

const POSTS: BlogPost[] = [
  {
    slug: "sustainable-packaging-our-commitment",
    title: "Sustainable packaging: our commitment",
    excerpt:
      "How we reduce waste in shipping without compromising the unboxing experience you expect from Sarar Global.",
    body: [
      "We believe premium products deserve packaging that respects the planet. Over the last year we have phased out single-use plastics in our outbound cartons and switched to recycled paper where structurally possible.",
      "Every shipment is still protected for the journey to your door—our team tests drops, humidity, and stacking so your order arrives in perfect condition. When you see the new minimal inserts, that is intentional: fewer layers, same protection.",
      "We will keep publishing updates as we hit new milestones. Thank you for supporting a more sustainable storefront.",
    ],
    category: "Sustainability",
    publishedAt: "2026-03-12T09:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80&auto=format&fit=crop",
    featured: true,
    authorName: "Nadia Rahman",
    tags: ["Sustainability", "Operations", "News"],
    authorBio: {
      name: "Nadia Rahman",
      role: "Head of Operations, Sarar Global",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80&auto=format&fit=crop",
    },
    articleBlocks: [
      {
        type: "paragraph",
        text: "We believe premium products deserve packaging that respects the planet. Over the last year we have phased out single-use plastics in our outbound cartons and switched to recycled paper where structurally possible.",
      },
      {
        type: "paragraph",
        text: "Every shipment is still protected for the journey to your door—our team tests drops, humidity, and stacking so your order arrives in perfect condition. When you see the new minimal inserts, that is intentional: fewer layers, same protection.",
      },
      {
        type: "heading",
        text: "How we validate every change",
      },
      {
        type: "paragraph",
        text: "Before a new material rolls out nationwide, we run pilot lanes in Dhaka and track damage rates, return reasons, and customer feedback. Data—not assumptions—decides what stays.",
      },
      {
        type: "quote",
        text: "Customers notice quality first and packaging second—but both have to earn their place in the box.",
        attribution: "Sarar Global Merchandising",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
        alt: "Recycled cartons stacked in the fulfillment area",
      },
      {
        type: "paragraph",
        text: "We will keep publishing updates as we hit new milestones. Thank you for supporting a more sustainable storefront.",
      },
    ],
  },
  {
    slug: "health-nutrition-smart-snacking",
    title: "Health & nutrition: smart snacking at home",
    excerpt:
      "Simple ideas for stocking your pantry with better-for-you options that still feel indulgent.",
    body: [
      "Balanced eating does not have to mean boring. We look for products with clear ingredient lists and portion sizes that work for busy households in Dhaka and beyond.",
      "Start with one swap: replace a highly processed snack with a whole-food alternative once a day. Small habits compound.",
      "Our buyers continue to add nutrition-forward lines—watch this space for new arrivals tagged for protein, fiber, and low sugar.",
    ],
    category: "Health & Nutrition",
    publishedAt: "2026-03-05T10:30:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80&auto=format&fit=crop",
    featured: true,
    authorName: "Farhan Ahmed",
    tags: ["Health", "Nutrition", "Lifestyle"],
  },
  {
    slug: "whiteboards-are-remarkable",
    title: "Whiteboards are remarkable.",
    excerpt:
      "A short note on clarity: the best plans start visible. Here is how we use simple tools to ship faster.",
    body: [
      "Ideas stuck in chat threads rarely ship. We still love a physical whiteboard for mapping launches, sale windows, and inventory cutovers.",
      "The title is a gentle reminder: tools that feel obvious are often the ones that unblock teams. You do not need fancy software on day one—clarity beats complexity.",
      "If you run a small brand, try one weekly planning block with your team in front of a board or shared doc with the same discipline. You will see fewer surprises.",
    ],
    category: "Behind the scenes",
    publishedAt: "2026-02-28T08:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-cb43f665c901?w=1200&q=80&auto=format&fit=crop",
    featured: true,
    authorName: "Sarar Global Editorial",
    tags: ["Behind the scenes", "Team", "News"],
  },
  {
    slug: "home-organization-small-spaces",
    title: "Home organization for small spaces",
    excerpt:
      "Vertical storage, multipurpose pieces, and the one-in-one-out rule we actually follow.",
    body: [
      "City apartments reward vertical thinking. Wall shelves, over-door hooks, and slim carts turn dead corners into usable storage.",
      "We favor multipurpose furniture—ottomans with storage, nesting tables, beds with drawers—so every piece earns its footprint.",
      "Try the one-in-one-out rule for thirty days: for every new non-consumable item, something leaves. It keeps clutter from creeping back.",
    ],
    category: "Lifestyle",
    publishedAt: "2026-02-20T11:15:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop",
    authorName: "Ayesha Khan",
    tags: ["Lifestyle", "Home"],
  },
  {
    slug: "flash-sale-how-we-pick-dates",
    title: "Flash sale: how we pick the dates",
    excerpt:
      "A peek at how we schedule promotions so stock, logistics, and customer experience stay aligned.",
    body: [
      "Flash sales are fun for shoppers but intense for operations. We align with suppliers, warehouse capacity, and carrier pickup windows before we publish a start time.",
      "Our merchandising team sets guardrails on depth of discount so we can still stand behind product quality and service.",
      "Follow the newsletter and on-site banners—when you see a countdown, the backend work is already done.",
    ],
    category: "Behind the scenes",
    publishedAt: "2026-02-10T14:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=80&auto=format&fit=crop",
    authorName: "Sarar Global Editorial",
    tags: ["Behind the scenes", "Promotions"],
  },
  {
    slug: "customer-story-family-in-chattogram",
    title: "Customer story: a family in Chattogram",
    excerpt:
      "Why repeat orders matter to us—and how feedback from Chattogram shaped our delivery options.",
    body: [
      "We read every piece of feedback that mentions delivery timing and packaging. A recurring theme from Chattogram customers helped us refine cutoff times for coastal routes.",
      "Repeat orders tell us we are earning trust. Thank you to everyone who shops again and recommends Sarar Global to friends.",
      "If you have a story to share, reach out via our contact page. We feature real voices when we can.",
    ],
    category: "Community",
    publishedAt: "2026-01-30T09:45:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
    authorName: "Rafiq Hassan",
    tags: ["Community", "Shipping"],
  },
  {
    slug: "care-guide-textiles-and-leather",
    title: "Care guide: textiles and leather goods",
    excerpt:
      "Extend the life of bags and home textiles with storage, cleaning, and humidity tips suited to our climate.",
    body: [
      "Leather benefits from breathable dust bags and rotation—do not leave the same bag in direct sun day after day.",
      "For cotton and linen, wash cold where the label allows and avoid harsh detergents that strip fibers.",
      "In humid seasons, air out closets weekly and use moisture absorbers in enclosed spaces to prevent musty odors.",
    ],
    category: "Guides",
    publishedAt: "2026-01-18T10:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format&fit=crop",
    authorName: "Sarar Global Editorial",
    tags: ["Guides", "Care"],
  },
  {
    slug: "spring-arrivals-editors-picks",
    title: "Spring arrivals: editors’ picks",
    excerpt:
      "Fresh color, lighter layers, and the products our team is adding to cart this season.",
    body: [
      "Spring in Bangladesh still means planning for heat and rain—we picked pieces that layer well and dry quickly.",
      "Editors rotate favorites every few weeks; if something sells through, we restock where the brand allows.",
      "Browse the new-in collection on the homepage and filter by category to match your list.",
    ],
    category: "New in",
    publishedAt: "2026-01-08T08:30:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
    authorName: "Editors",
    tags: ["New in", "Seasonal"],
  },
  {
    slug: "shipping-updates-nationwide",
    title: "Shipping updates: nationwide coverage",
    excerpt:
      "Carrier partnerships and zone improvements that affect when your order leaves Dhaka.",
    body: [
      "We continuously benchmark delivery times across divisions. Recent carrier upgrades improved consistency to several secondary cities.",
      "Cutoff times for same-week dispatch are shown at checkout and may vary by zone.",
      "If you experience a delay, our support team can trace the shipment and set expectations—we do not leave you guessing.",
    ],
    category: "Service",
    publishedAt: "2025-12-15T12:00:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&q=80&auto=format&fit=crop",
    authorName: "Sarar Global Editorial",
    tags: ["Service", "Shipping", "News"],
  },
];

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort(sortByDateDesc);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

/** Sidebar: marked featured first, then by recency */
export function getFeaturedPosts(): BlogPost[] {
  const featured = POSTS.filter((p) => p.featured).sort(sortByDateDesc);
  if (featured.length >= 3) {
    return featured.slice(0, 4);
  }
  const rest = getAllPosts().filter((p) => !p.featured);
  const merged = [...featured];
  for (const p of rest) {
    if (merged.length >= 4) break;
    if (!merged.some((m) => m.slug === p.slug)) merged.push(p);
  }
  return merged.slice(0, 4);
}

/** Sidebar: most recent, excluding overlap with featured sidebar list when possible */
export function getLatestPosts(): BlogPost[] {
  const featuredSlugs = new Set(getFeaturedPosts().map((p) => p.slug));
  const ordered = getAllPosts();
  const latest: BlogPost[] = [];
  for (const p of ordered) {
    if (latest.length >= 4) break;
    if (!featuredSlugs.has(p.slug)) latest.push(p);
  }
  if (latest.length < 4) {
    for (const p of ordered) {
      if (latest.length >= 4) break;
      if (!latest.some((l) => l.slug === p.slug)) latest.push(p);
    }
  }
  return latest.slice(0, 4);
}

/** Alias for props passed to client components (plain serializable objects) */
export type BlogPostSerializable = BlogPost;

/** Chronological order (oldest → newest) for prev/next navigation */
function sortByDateAsc(a: BlogPost, b: BlogPost): number {
  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
}

export function getArticleBlocks(post: BlogPost): BlogArticleBlock[] {
  if (post.articleBlocks && post.articleBlocks.length > 0) {
    return post.articleBlocks;
  }
  return post.body.map((text) => ({ type: "paragraph" as const, text }));
}

export function getPrevNextPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const chronological = [...POSTS].sort(sortByDateAsc);
  const idx = chronological.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: idx > 0 ? chronological[idx - 1]! : null,
    next: idx < chronological.length - 1 ? chronological[idx + 1]! : null,
  };
}

export function getRelatedPosts(category: string, excludeSlug: string, limit = 3): BlogPost[] {
  const same = getAllPosts().filter((p) => p.category === category && p.slug !== excludeSlug);
  if (same.length >= limit) {
    return same.slice(0, limit);
  }
  const rest = getAllPosts().filter((p) => p.slug !== excludeSlug && !same.some((s) => s.slug === p.slug));
  return [...same, ...rest].slice(0, limit);
}

export function resolvePostTags(post: BlogPost): string[] {
  if (post.tags && post.tags.length > 0) {
    return post.tags;
  }
  return [post.category];
}
