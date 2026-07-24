"use client";

import ProductGrid from "@/components/ProductGrid";
import Slidebar from "@/components/Slidebar";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { useState } from "react";

const products = productsData as Product[];
const PRICE_LIMIT = 1000;

const categories = Array.from(new Set(products.map((p) => p.category)));
const brands = Array.from(new Set(products.map((p) => p.brand)));

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    PRICE_LIMIT,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  function handleBrandToggle(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-500">
        Product Listing
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Slidebar
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minPrice={priceRange[0]}
          maxPrice={priceRange[1]}
          priceLimit={PRICE_LIMIT}
          onPriceChange={(min, max) => setPriceRange([min, max])}
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
        />

        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}
