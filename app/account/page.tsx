import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SignOutButton from "@/app/components/SignOutButton";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-extrabold">
                {initials}
              </div>
              <div>
                <p className="font-bold text-gray-900">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Member since {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
              <SignOutButton />
            </div>
          </div>

          {/* Account details */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Account info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Account Details</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">User ID</span>
                  <span className="font-mono text-xs text-gray-400">{user.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Email confirmed</span>
                  <span className={`font-medium ${user.email_confirmed_at ? "text-green-600" : "text-orange-500"}`}>
                    {user.email_confirmed_at ? "Yes" : "Pending confirmation"}
                  </span>
                </div>
              </div>
            </div>

            {/* Orders placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
              <div className="text-center py-10">
                <p className="text-4xl mb-3">📦</p>
                <p className="text-gray-500 text-sm">No orders yet</p>
                <a href="/products" className="mt-4 inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-colors">
                  Start Shopping
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Browse Products", href: "/products", emoji: "🛍️" },
                  { label: "Categories", href: "/categories", emoji: "📂" },
                  { label: "Best Sellers", href: "/products?sort=popular", emoji: "🔥" },
                  { label: "Sale Items", href: "/products?badge=sale", emoji: "🏷️" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-medium text-gray-700"
                  >
                    <span className="text-xl">{link.emoji}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
