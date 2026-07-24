"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, isHydrated } =
    useCart();

  // Avoid a flash of "empty cart" before localStorage has loaded.
  if (!isHydrated) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8" />
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-brand-300" />
        <p className="text-lg font-semibold text-brand-800">
          Your cart is empty
        </p>
        <p className="text-sm text-brand-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-950">Your Cart</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Item list */}
        <div className="flex-1 divide-y divide-brand-200 rounded-xl border border-brand-200 bg-white">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 sm:p-5"
            >
              <Link
                href={`/product/${product.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-100 sm:h-24 sm:w-24"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${product.id}`}
                  className="line-clamp-1 text-sm font-semibold text-brand-950 hover:underline sm:text-base"
                >
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-brand-500">
                  {formatPrice(product.price)} each
                </p>

                {/* Quantity controls */}
                <div className="mt-3 flex items-center rounded-lg border border-brand-300 w-fit">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Decrease quantity of ${product.title}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-brand-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center text-brand-700 transition hover:bg-brand-100"
                    aria-label={`Increase quantity of ${product.title}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <p className="text-sm font-bold text-brand-950 sm:text-base">
                  {formatPrice(product.price * quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="flex items-center gap-1 text-xs text-brand-400 transition hover:text-red-600"
                  aria-label={`Remove ${product.title} from cart`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price summary */}
        <div className="h-fit w-full shrink-0 rounded-xl border border-brand-200 bg-white p-5 lg:w-72">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-950">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm text-brand-600">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-brand-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-brand-200 pt-4 text-base font-bold text-brand-950">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-brand-900 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Checkout
          </button>
          <Link
            href="/"
            className="mt-3 block text-center text-sm text-brand-500 transition hover:text-brand-900"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}