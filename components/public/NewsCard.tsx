import Image from "next/image";
import Link from "next/link";
import { formatDate, PLACEHOLDERS, resolveImageAlt, resolveImagePath } from "@/lib/images";
import type { BlogPostDocument } from "@/types";

interface NewsCardProps {
  post: BlogPostDocument;
  featured?: boolean;
}

export function NewsCard({ post, featured }: NewsCardProps) {
  const src = resolveImagePath(post.coverImage, PLACEHOLDERS.news);

  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group min-w-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-mountie-blue/10 transition-colors hover:border-ice-blue/40 ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "min-h-72" : "aspect-[16/10]"}`}>
        <Image
          src={src}
          alt={resolveImageAlt(post.coverImage, post.title)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ice-blue">
          {formatDate(post.publishedAt)}
        </p>
        <h3
          className={`break-words font-display uppercase tracking-[0.08em] text-mountie-white ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="text-sm leading-7 text-mountie-silver">{post.excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}
