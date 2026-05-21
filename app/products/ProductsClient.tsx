"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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

interface Filters {
  category: string;
  sort: string;
  badge: string;
  minPrice: string;
  maxPrice: string;
}

interface Props {
  initialProducts: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  categories: string[];
  currentFilters: Filters;
  error?: string;
}

export default function ProductsClient({
  initialProducts,
  totalCount,
  totalPages,
  currentPage,
  categories,
  currentFilters,
  error,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => router.push(pathname);

  const hasFilters = currentFilters.category || currentFilters.badge || currentFilters.minPrice || currentFilters.maxPrice;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ── Sidebar Filters ── */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Filters</h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline">
                Clear all
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!currentFilters.category}
                  onChange={() => updateFilter("category", "")}
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-600">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={currentFilters.category === cat}
                    onChange={() => updateFilter("category", cat)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-gray-600">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                value={currentFilters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span className="text-gray-400 text-sm">–</span>
              <input
                type="number"
                placeholder="Max"
                value={currentFilters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Offers</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "All", value: "" },
                { label: "On Sale", value: "sale" },
                { label: "New Arrivals", value: "new" },
                { label: "Hot", value: "hot" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="badge"
                    checked={currentFilters.badge === opt.value}
                    onChange={() => updateFilter("badge", opt.value)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-gray-600">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Product Grid ── */}
      <div className="flex-1">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-500">{totalCount} products</p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium">Sort by:</label>
            <select
              value={currentFilters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            >
              <option value="">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            Error loading products: {error}
          </div>
        )}

        {initialProducts.length === 0 && !error ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-500 font-medium">No products found</p>
            <button onClick={clearFilters} className="mt-4 text-indigo-600 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) {
                p = i + 1;
              } else if (currentPage <= 4) {
                p = i + 1;
              } else if (currentPage >= totalPages - 3) {
                p = totalPages - 6 + i;
              } else {
                p = currentPage - 3 + i;
              }
              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                    p === currentPage
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
