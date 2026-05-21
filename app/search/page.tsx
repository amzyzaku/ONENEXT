import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: products, count } = query
    ? await supabase
        .from("products")
        .select("*", { count: "exact" })
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order("rating", { ascending: false })
        .limit(48)
    : { data: [], count: 0 };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-extrabold text-gray-900">
              {query ? `Search results for "${query}"` : "Search Products"}
            </h1>
            {query && (
              <p className="text-gray-500 mt-1">{count ?? 0} results found</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {!query && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">Enter a search term to find products</p>
              <a href="/products" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
                Browse all products →
              </a>
            </div>
          )}

          {query && products?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">😕</p>
              <p className="text-gray-900 font-semibold text-lg">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-gray-500 mt-2">Try a different search term or browse our categories.</p>
              <a href="/products" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Browse All Products
              </a>
            </div>
          )}

          {products && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
