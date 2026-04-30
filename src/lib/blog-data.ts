import { cache } from "react";

import { getBlogDetail, listBlogs } from "@/lib/server/paperbase";
import { PaperbaseApiError } from "@/lib/api/paperbase-errors";

export type BlogArticleBlock = { type: "html"; html: string };

export type BlogPost = {
  publicId: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  imageUrl: string | null;
  featured?: boolean;
  authorName?: string;
  tags?: string[];
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
};

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

function sortByDateAsc(a: BlogPost, b: BlogPost): number {
  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
}

function resolveCategory(post: { tags: Array<{ name: string }> }): string {
  return post.tags[0]?.name || "Blog";
}

function mapListPost(post: Awaited<ReturnType<typeof listBlogs>>[number]): BlogPost {
  return {
    publicId: post.public_id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: resolveCategory(post),
    publishedAt: post.published_at,
    imageUrl: post.featured_image_url,
    featured: post.is_featured,
    tags: post.tags.map((tag) => tag.name),
    metaTitle: post.meta_title,
    metaDescription: post.meta_description,
  };
}

export const getAllPostsRaw = cache(async (): Promise<BlogPost[]> => {
  try {
    const posts = await listBlogs();
    return posts.map(mapListPost);
  } catch (error) {
    if (error instanceof PaperbaseApiError && error.status === 403) {
      return [];
    }
    throw error;
  }
});

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getAllPostsRaw();
  return [...posts].sort(sortByDateDesc);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  const match = posts.find((post) => post.slug === slug);
  if (!match) return undefined;
  const detail = await getBlogDetail(match.publicId);
  return {
    ...match,
    content: detail.content,
    authorName: detail.author_name || undefined,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured === true).slice(0, 4);
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const featuredSlugs = new Set((await getFeaturedPosts()).map((p) => p.slug));
  const latest = posts.filter((p) => !featuredSlugs.has(p.slug)).slice(0, 4);
  if (latest.length >= 4) return latest;
  return [...latest, ...posts.filter((p) => !latest.some((l) => l.slug === p.slug))].slice(0, 4);
}

export type BlogPostSerializable = BlogPost;

export function getArticleBlocks(post: BlogPost): BlogArticleBlock[] {
  return [{ type: "html", html: post.content || "" }];
}

export async function getPrevNextPosts(
  slug: string,
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const chronological = (await getAllPosts()).sort(sortByDateAsc);
  const idx = chronological.findIndex((post) => post.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? chronological[idx - 1]! : null,
    next: idx < chronological.length - 1 ? chronological[idx + 1]! : null,
  };
}

export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const same = posts.filter((post) => post.category === category && post.slug !== excludeSlug);
  if (same.length >= limit) return same.slice(0, limit);
  const rest = posts.filter((post) => post.slug !== excludeSlug && !same.some((s) => s.slug === post.slug));
  return [...same, ...rest].slice(0, limit);
}

export function resolvePostTags(post: BlogPost): string[] {
  if (post.tags && post.tags.length > 0) return post.tags;
  return [post.category];
}
