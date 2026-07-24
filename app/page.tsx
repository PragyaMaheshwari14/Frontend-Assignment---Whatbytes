import ProductGrid from "@/components/ProductGrid";
import productsData from "@/data/products.json"
import {Product} from "@/types";

const products = productsData as Product[];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-500">
          Product Listing
      </h1>

      <ProductGrid products={products} />
    </main>
  );
}
