import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-300 py-24 text-center">
        <p className="text-lg font-semibold text-brand-800">
          No products found
        </p>
        <p className="text-sm text-brand-500">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}