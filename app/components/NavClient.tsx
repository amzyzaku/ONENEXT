"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

interface NavClientProps {
  user: { email: string } | null;
}

export default function NavClient({ user }: NavClientProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { totalItems } = useCart();

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="flex items-center gap-2 flex-1 justify-end">
      {/* Search bar */}
      {searchOpen ? (
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="p-2 text-indigo-600 hover:text-indigo-800">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
          <button type="button" onClick={() => setSearchOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      ) : (
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          aria-label="Search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      )}

      {/* Cart */}
      <a href="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Cart">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </a>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden p-2 text-gray-600 hover:text-indigo-600"
        aria-label="Menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {menuOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg lg:hidden z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
            <a href="/products" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Products</a>
            <a href="/categories" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Categories</a>
            <a href="/products?sort=popular" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Best Sellers</a>
            <a href="/products?badge=sale" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Deals</a>
            <hr className="border-gray-100" />
            {user ? (
              <>
                <a href="/account" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Account ({user.email})</a>
              </>
            ) : (
              <a href="/auth" onClick={() => setMenuOpen(false)} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-center">Sign In</a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
