"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import ProductCard from "@/app/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  emoji: string;
  badge: string | null;
  rating: number;
  description: string;
}

const BG_MAP: Record<string, string> = {
  Fashion: "bg-orange-50", Electronics: "bg-blue-50", "Home & Living": "bg-green-50",
  Beauty: "bg-pink-50", Sports: "bg-yellow-50", Books: "bg-amber-50",
  Accessories: "bg-purple-50", Audio: "bg-cyan-50",
};

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const bg = BG_MAP[product.category] ?? "bg-gray-50";
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, category: product.category });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-indigo-600">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-indigo-600">Products</a>
        <span>/</span>
        <a href={`/products?category=${product.category}`} className="hover:text-indigo-600">{product.category}</a>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className={`${bg} flex items-center justify-center p-16 min-h-[360px]`}>
            <span className="text-[120px] select-none">{product.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              {product.badge && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                  product.badge === "sale" ? "bg-red-500 text-white" :
                  product.badge === "new" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
                }`}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating.toFixed(1)} out of 5</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.original_price.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-bold text-lg">−</button>
                <span className="px-4 py-2.5 font-semibold text-gray-900 min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-bold text-lg">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1">✓ Free shipping over $50</span>
              <span className="flex items-center gap-1">✓ 30-day returns</span>
              <span className="flex items-center gap-1">✓ Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">More from {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
