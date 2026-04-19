import Image from "next/image";

import { Link } from "@/i18n/routing";
import { storefrontImageUnoptimized } from "@/lib/storefront-image";
import { cn } from "@/lib/utils";
import type { BlogPostSerializable } from "@/lib/blog-data";

type BlogFeatureCardProps = {
  post: BlogPostSerializable;
  priority?: boolean;
  className?: string;
};

export function BlogFeatureCard({ post, priority = false, className }: BlogFeatureCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex min-h-[280px] flex-col overflow-hidden rounded-lg border border-neutral-200/90 bg-neutral-900 shadow-sm ring-1 ring-neutral-950/5 md:min-h-[320px]",
        className,
      )}
    >
      <Image
        src={post.imageUrl}
        alt={post.title}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        priority={priority}
        unoptimized={storefrontImageUnoptimized(post.imageUrl)}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
        aria-hidden
      />
      <div className="relative mt-auto flex flex-col justify-end p-4 sm:p-5">
        <span className="mb-2 w-fit rounded-sm bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-800">
          {post.category}
        </span>
        <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/90">{post.excerpt}</p>
      </div>
    </Link>
  );
}
