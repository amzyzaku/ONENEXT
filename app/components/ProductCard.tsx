"use client";

import { useCart } from "@/app/context/CartContext";

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
  Fashion: "bg-orange-50",
  Electronics: "bg-blue-50",
  "Home & Living": "bg-green-50",
  Beauty: "bg-pink-50",
  Sports: "bg-yellow-50",
  Books: "bg-amber-50",
  Accessories: "bg-purple-50",
  Audio: "bg-cyan-50",
};

const BADGE_STYLE: Record<string, string> = {
  sale: "bg-red-500 text-white",
  new: "bg-green-500 text-white",
  hot: "bg-orange-500 text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const bg = BG_MAP[product.category] ?? "bg-gray-50";

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <a href={`/products/${product.id}`} className="block">
        <div className={`${bg} h-48 flex items-center justify-center relative`}>
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
            {product.emoji}
          </span>
          {product.badge && (
            <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full capitalize ${BADGE_STYLE[product.badge] ?? "bg-gray-500 text-white"}`}>
              {product.badge}
            </span>
          )}
        </div>
      </a>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.category}</p>
        <a href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mt-1 mb-1 hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </a>
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-3 w-3 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">{product.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
            {product.original_price && (
              <span className="text-sm text-gray-400 line-through">${product.original_price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              emoji: product.emoji,
              category: product.category,
            })}
            className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
