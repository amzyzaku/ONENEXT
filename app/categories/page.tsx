import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const CATEGORIES = [
  { name: "Fashion", emoji: "👗", desc: "Clothing, shoes, and accessories for every style", color: "bg-orange-50 border-orange-100" },
  { name: "Electronics", emoji: "💻", desc: "Laptops, phones, gadgets and more", color: "bg-blue-50 border-blue-100" },
  { name: "Home & Living", emoji: "🏠", desc: "Furniture, decor, and everything for your home", color: "bg-green-50 border-green-100" },
  { name: "Beauty", emoji: "💄", desc: "Skincare, makeup, and wellness products", color: "bg-pink-50 border-pink-100" },
  { name: "Sports", emoji: "⚽", desc: "Equipment and gear for every sport", color: "bg-yellow-50 border-yellow-100" },
  { name: "Books", emoji: "📚", desc: "Fiction, non-fiction, and educational titles", color: "bg-amber-50 border-amber-100" },
  { name: "Accessories", emoji: "👜", desc: "Bags, watches, jewellery and more", color: "bg-purple-50 border-purple-100" },
  { name: "Audio", emoji: "🎧", desc: "Headphones, speakers, and audio gear", color: "bg-cyan-50 border-cyan-100" },
];

export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Get product count per category
  const counts: Record<string, number> = {};
  await Promise.all(
    CATEGORIES.map(async (cat) => {
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("category", cat.name);
      counts[cat.name] = count ?? 0;
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">Shop by Category</h1>
            <p className="text-gray-500 mt-2 text-lg">Find exactly what you&apos;re looking for</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`${cat.color} border rounded-2xl p-8 flex flex-col items-center text-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all group`}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{cat.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-100">
                  {counts[cat.name]} products
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
