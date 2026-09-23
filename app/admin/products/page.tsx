import { getProducts } from "@/lib/actions/admin/products";
import { ProductsManager } from "@/components/admin/forms/ProductsManager";

export default async function AdminProductsPage() {
  const products = await getProducts();

  const serialized = products.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    sku: p.sku,
    inventory: p.inventory,
    images: p.images,
    order: p.order,
    status: p.status as "draft" | "published",
    seoTitle: p.seo?.title,
    seoDescription: p.seo?.description,
  }));

  return (
    <div className="space-y-6">
      <ProductsManager
        products={serialized.map((p) => ({
          _id: p._id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          status: p.status,
        }))}
        fullProducts={serialized}
      />
    </div>
  );
}
