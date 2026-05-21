import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProductsClient from "./ProductsClient";

const CATEGORIES = ["Fashion", "Electronics", "Home & Living", "Beauty", "Sports", "Books", "Accessories", "Audio"];
const PAGE_SIZE = 12;

interface SearchParams {
  category?: string;
  sort?: string;
  badge?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1"));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from("products")
    .select("*", { count: "exact" });

  if (params.category) query = query.eq("category", params.category);
  if (params.badge) query = query.eq("badge", params.badge);
  if (params.minPrice) query = query.gte("price", parseFloat(params.minPrice));
  if (params.maxPrice) query = query.lte("price", parseFloat(params.maxPrice));

  switch (params.sort) {
    case "price_asc":  query = query.order("price", { ascending: true }); break;
    case "price_desc": query = query.order("price", { ascending: false }); break;
    case "newest":     query = query.order("created_at", { ascending: false }); break;
    case "popular":    query = query.order("rating", { ascending: false }); break;
    default:           query = query.order("created_at", { ascending: false });
  }

  const { data: products, count, error } = await query.range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
            <p className="text-gray-500 mt-1">{count ?? 0} products found</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <ProductsClient
            initialProducts={products ?? []}
            totalCount={count ?? 0}
            totalPages={totalPages}
            currentPage={page}
            categories={CATEGORIES}
            currentFilters={{
              category: params.category ?? "",
              sort: params.sort ?? "",
              badge: params.badge ?? "",
              minPrice: params.minPrice ?? "",
              maxPrice: params.maxPrice ?? "",
            }}
            error={error?.message}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
