"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  function handleAddToCart() {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-brand-200 bg-white transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-brand-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-brand-950 hover:underline sm:text-base">
            {product.title}
          </h3>
        </Link>

        <p className="text-base font-bold text-brand-950">
          {formatPrice(product.price)}
        </p>

        {/* Rating stars */}
        <div
          className="flex items-center gap-0.5"
          aria-label={`${product.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5"
              fill={i < product.rating ? "currentColor" : "none"}
              strokeWidth={1.5}
              color="var(--color-brand-900)"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-auto w-full rounded-lg  py-2 text-sm font-medium text-white transition ${
               justAdded
               ? "bg-brand-700"
              : "bg-brand-900 hover:bg-brand-800 active:bg-brand-950"
            }` }
        >
         {justAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}