"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const products = productsData as Product[];

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = useMemo(
    () => products.find((p) => p.id === Number(params.id)),
    [params.id]
  );

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <p className="text-lg font-semibold text-brand-800">
          Product not found
        </p>
        <Link
          href="/"
          className="rounded-lg bg-accent-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-600"
        >
          Back to shop
        </Link>
      </main>
    );
  }

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1 text-sm text-brand-500 transition hover:text-brand-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image section */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-brand-200 bg-brand-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Details section */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
              {toTitleCase(product.category)}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-brand-950 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <div
            className="flex items-center gap-0.5"
            aria-label={`${product.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < product.rating ? "currentColor" : "none"}
                strokeWidth={1.5}
                color="var(--color-accent-600)"
              />
            ))}
          </div>

          <p className="text-3xl font-bold text-brand-950">
            {formatPrice(product.price)}
          </p>

          <p className="leading-relaxed text-brand-600">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-brand-500">Category</dt>
            <dd className="text-brand-900">{toTitleCase(product.category)}</dd>
            <dt className="text-brand-500">Brand</dt>
            <dd className="text-brand-900">{product.brand}</dd>
          </dl>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm font-medium text-brand-900">
              Quantity
            </span>
            <div className="flex items-center rounded-lg border border-brand-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="flex h-9 w-9 items-center justify-center text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-brand-950">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-brand-700 transition hover:bg-brand-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`mt-2 w-full rounded-lg py-3 text-sm font-semibold text-white transition sm:w-auto sm:px-10 ${
              justAdded
                ? "bg-accent-800"
                : "bg-accent-700 hover:bg-accent-600 active:bg-accent-800"
            }`}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>

          {/* Reviews section (optional) */}
          <div className="mt-6 border-t border-brand-200 pt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-950">
              Reviews
            </h2>
            <p className="text-sm text-brand-500">
              No reviews yet. Be the first to review this product.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}