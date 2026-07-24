"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  const cartCount = 0;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("search submitted:", searchValue);
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-950 text-white">
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
          className="mx-auto hidden w-full max-w-md flex-1 sm:block"
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
              className="w-full rounded-full border border-brand-700 bg-brand-900 py-2 pl-10 pr-4 text-sm text-white placeholder-brand-400 outline-none transition focus:border-brand-400"
            />
          </div>
        </form>

        {/* Cart + profile */}
        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-brand-800"
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-brand-950">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-700 transition hover:bg-brand-800"
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