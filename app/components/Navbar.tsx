import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./SignOutButton";
import NavClient from "./NavClient";

export default async function Navbar() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold tracking-tight text-indigo-600 shrink-0">
          ONE<span className="text-gray-900">NEXT</span>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
          <a href="/categories" className="hover:text-indigo-600 transition-colors">Categories</a>
          <a href="/products?sort=popular" className="hover:text-indigo-600 transition-colors">Best Sellers</a>
          <a href="/products?badge=sale" className="hover:text-indigo-600 transition-colors">Deals</a>
        </nav>

        {/* Search + Cart + Auth — client component for interactivity */}
        <NavClient user={user ? { email: user.email ?? "" } : null} />

        {/* Auth buttons (server-rendered fallback for non-JS) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 max-w-[140px] truncate">{user.email}</span>
              <a href="/account" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Account</a>
              <SignOutButton />
            </div>
          ) : (
            <a href="/auth" className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
