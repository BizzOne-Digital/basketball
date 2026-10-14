import { cache } from "react";
import { withDatabase } from "@/lib/db/with-database";
import Product from "@/models/Product";
import type { ProductDocument } from "@/types";

function serializeProduct(doc: ProductDocument): ProductDocument {
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    images: doc.images ?? [],
    sku: doc.sku,
    inventory: doc.inventory,
    order: doc.order,
    status: doc.status,
    seo: doc.seo,
  };
}

export const getPublishedProducts = cache(
  async (limit?: number): Promise<ProductDocument[]> => {
    return withDatabase(async () => {
      let query = Product.find({ status: "published" }).sort({
        order: 1,
        name: 1,
      });

      if (limit) {
        query = query.limit(limit);
      }

      const products = await query.lean<ProductDocument[]>();
      return products.map(serializeProduct);
    }, []);
  },
);

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDocument | null> => {
    return withDatabase(async () => {
      const product = await Product.findOne({
        slug: slug.trim().toLowerCase(),
        status: "published",
      }).lean<ProductDocument>();

      if (!product) {
        return null;
      }

      return serializeProduct(product);
    }, null);
  },
);
