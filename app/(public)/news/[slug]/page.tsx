import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getPostBySlug, getPublishedPosts } from "@/lib/data/blog";
import { getSiteSettings } from "@/lib/data/settings";
import { buildMetadataFromSeo } from "@/lib/seo/metadata";
import { buildArticleJsonLd } from "@/lib/seo/jsonld";
import {
  formatDate,
  resolveImageAlt,
  resolveImagePath,
} from "@/lib/images";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return buildMetadataFromSeo(post.seo, settings, {
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverSrc = resolveImagePath(post.coverImage, "/images/Blog-1.png");
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    image: coverSrc,
    datePublished: post.publishedAt?.toISOString(),
    authorName: post.authorName,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src={coverSrc}
              alt={resolveImageAlt(post.coverImage, post.title)}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/20" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 py-28 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                { label: post.title },
              ]}
              className="mb-8"
            />
            <p className="text-xs uppercase tracking-[0.18em] text-ice-blue">
              {formatDate(post.publishedAt)}
            </p>
            <h1 className="mt-4 break-words font-display text-4xl uppercase tracking-[0.08em] sm:text-5xl">
              {post.title}
            </h1>
            {post.authorName ? (
              <p className="mt-4 text-sm text-mountie-silver">
                By {post.authorName}
              </p>
            ) : null}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            {post.excerpt ? (
              <p className="mb-8 text-xl leading-9 text-mountie-silver">
                {post.excerpt}
              </p>
            ) : null}
            <RichTextRenderer html={post.content} />
          </div>
        </section>
      </article>
    </>
  );
}
