"use client";

interface SidebarProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  priceLimit: number;
  onPriceChange: (min: number, max: number) => void;
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Sidebar({
  categories,
  brands,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  priceLimit,
  onPriceChange,
  selectedBrands,
  onBrandToggle,
}: SidebarProps) {
  return (
    <aside className="w-full shrink-0 space-y-6 lg:w-64">
      {/* Category filter */}
      <div className="rounded-xl border border-brand-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-950">
          Category
        </h2>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-700">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "all"}
              onChange={() => onCategoryChange("all")}
              className="h-4 w-4 accent-brand-900"
            />
            All
          </label>
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-brand-700"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 accent-brand-900"
              />
              {toTitleCase(category)}
            </label>
          ))}
        </div>
      </div>

      {/* Price range filter */}
      <div className="rounded-xl border border-brand-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-950">
          Price
        </h2>
        <input
          type="range"
          min={0}
          max={priceLimit}
          step={10}
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
          className="w-full cursor-pointer"
          aria-label="Maximum price"
        />
        <div className="mt-2 flex items-center justify-between text-sm text-brand-500">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Brand filter (optional) */}
      {brands.length > 0 && (
        <div className="rounded-xl border border-brand-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-950">
            Brand
          </h2>
          <div className="flex flex-col gap-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-brand-700"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="h-4 w-4 rounded accent-brand-900"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}