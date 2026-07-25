"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const router = useRouter();
   const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

  const { cartCount, isHydrated } = useCart();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-accent-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight sm:text-2xl"
        >
          Cacyroy
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mx-auto hidden w-full max-w-xs flex-1 sm:block "
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-full border border-transparent bg-white py-2 pl-10 pr-4 text-sm text-brand-900 placeholder-brand-400 outline-none transition focus:border-accent-300"
            />
          </div>
        </form>

        {/* Cart + profile */}
        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-lg bg-accent-900 px-4 py-2 text-sm font-medium transition hover:bg-accent-800"
            aria-label="View cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {isHydrated && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-accent-800">
                {cartCount}
              </span>
            )}
            <h2> Cart</h2>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-700 transition hover:bg-accent-800"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile search bar (full width, below main row) */}
      <form onSubmit={handleSearchSubmit} className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-full border border-brand-700 bg-brand-900 py-2 pl-10 pr-4 text-sm text-white placeholder-brand-400 outline-none transition focus:border-brand-400"
          />
        </div>
      </form>
    </header>
  );
}