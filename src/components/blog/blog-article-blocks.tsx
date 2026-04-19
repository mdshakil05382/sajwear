import Image from "next/image";

import { storefrontImageUnoptimized } from "@/lib/storefront-image";
import { cn } from "@/lib/utils";
import type { BlogArticleBlock } from "@/lib/blog-data";

type BlogArticleBlocksProps = {
  blocks: BlogArticleBlock[];
};

export function BlogArticleBlocks({ blocks }: BlogArticleBlocksProps) {
  return (
    <div className="min-w-0 space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-base leading-relaxed text-text/90 md:text-[17px]">
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          return (
            <h2 key={i} className="pt-2 text-xl font-semibold tracking-tight text-text md:text-2xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <figure key={i} className="border-y border-neutral-200 py-8">
              <blockquote className="text-center text-lg font-medium italic leading-relaxed text-text md:text-xl">
                “{block.text}”
              </blockquote>
              <figcaption className="mt-4 text-center text-sm font-medium text-neutral-600">
                — {block.attribution}
              </figcaption>
            </figure>
          );
        }
        if (block.type === "image") {
          return (
            <div
              key={i}
              className={cn(
                "relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100",
              )}
            >
              <Image
                src={block.url}
                alt={block.alt}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                unoptimized={storefrontImageUnoptimized(block.url)}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
