import Image from "next/image";
import Link from "next/link";
import { formatPrice, resolveImageAlt, resolveProductImage } from "@/lib/images";
import type { ProductDocument } from "@/types";

interface ProductCardProps {
  product: ProductDocument;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];
  const src = resolveProductImage(product);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group min-w-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-mountie-blue/10 transition-colors hover:border-ice-blue/40"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={src}
          alt={resolveImageAlt(image, product.name)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="break-words font-display text-lg uppercase tracking-[0.08em] text-mountie-white sm:text-xl">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-ice-blue">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="text-sm text-mountie-silver line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
