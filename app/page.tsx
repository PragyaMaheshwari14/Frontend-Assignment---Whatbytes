"use client";

import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Sidebar";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { filterProducts } from "@/lib/filterProducts";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const products = productsData as Product[];
const PRICE_LIMIT = 1000;

const categories = Array.from(new Set(products.map((p) => p.category)));
const brands = Array.from(new Set(products.map((p) => p.brand)));

function parsePriceParam(value: string | null): [number, number] {
  if (!value) return [0, PRICE_LIMIT];
  const [minStr, maxStr] = value.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);
  if (Number.isNaN(min) || Number.isNaN(max)) return [0, PRICE_LIMIT];
  return [min, max];
}

function ProductListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const selectedCategory = searchParams.get("category") ?? "all";
  const [minPrice, maxPrice] = parsePriceParam(searchParams.get("price"));
  const selectedBrands = useMemo(() => {
    const raw = searchParams.get("brand");
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [searchParams]);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  function handleCategoryChange(category: string) {
    updateParams({ category: category === "all" ? null : category });
  }

  function handlePriceChange(min: number, max: number) {
    const isDefaultRange = min === 0 && max === PRICE_LIMIT;
    updateParams({ price: isDefaultRange ? null : `${min}-${max}` });
  }
  function handleBrandToggle(brand: string) {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateParams({ brand: next.length > 0 ? next.join(",") : null });
  }

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        category: selectedCategory,
        minPrice,
        maxPrice,
        search,
        brand: selectedBrands,
      }),
    [selectedCategory, minPrice, maxPrice, search, selectedBrands],
  );
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <Sidebar
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceLimit={PRICE_LIMIT}
          onPriceChange={handlePriceChange}
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
        />

        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-bold text-brand-950">
            Product Listing
          </h1>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ProductListing />
    </Suspense>
  );
}
