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
    <aside className="w-full shrink-0 space-y-4 lg:w-64">
      {/* Single dark navy filter card, matching the reference design */}
      <div className="rounded-xl bg-accent-900 p-5 text-white">
        <h2 className="mb-4 text-lg font-bold">Filters</h2>

        {/* Category */}
        <h3 className="mb-2 text-sm font-semibold text-accent-100">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-accent-100">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "all"}
              onChange={() => onCategoryChange("all")}
              className="h-4 w-4 accent-white"
            />
            All
          </label>
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-accent-100"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 accent-white"
              />
              {toTitleCase(category)}
            </label>
          ))}
        </div>

        {/* Price */}
        <h3 className="mb-2 mt-5 text-sm font-semibold text-accent-100">
          Price
        </h3>
        <input
          type="range"
          min={0}
          max={priceLimit}
          step={10}
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
          className="w-full cursor-pointer accent-white"
          aria-label="Maximum price"
        />
        <div className="mt-2 flex items-center justify-between text-sm text-accent-100">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
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
                  className="h-4 w-4 rounded accent-accent-600"
                />
                {brand}
              </label>
            ))}
          </div>
          
          <h2 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-brand-950">
            Price
          </h2>
          <input
            type="number"
            min={0}
            max={priceLimit}
            step={10}
            value={maxPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!Number.isNaN(value)) {
                onPriceChange(minPrice, value);
              }
            }}
            className="w-full rounded-lg border border-brand-300 px-3 py-2 text-sm text-brand-900 outline-none transition focus:border-accent-500"
            aria-label="Maximum price"
          />
          
        </div>
      )}
    </aside>
  );
}