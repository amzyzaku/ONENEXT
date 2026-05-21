import NewsletterForm from "./components/NewsletterForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              New Season Arrivals
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
              Shop Smarter.<br />
              <span className="text-indigo-600">Live Better.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md mb-8 mx-auto md:mx-0">
              Discover thousands of premium products across every category — delivered to your door in record time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#products" className="bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-colors text-center">
                Shop Now
              </a>
              <a href="/categories" className="border border-gray-300 text-gray-700 font-semibold px-8 py-3.5 rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-colors text-center">
                Browse Categories
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 justify-center md:justify-start text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" /></svg>
                Free shipping over $50
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" /></svg>
                30-day returns
              </span>
            </div>
          </div>
          {/* Hero visual */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-indigo-200 rounded-full opacity-30 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4 p-4">
                {[
                  { bg: "bg-orange-100", emoji: "👟", label: "Sneakers", price: "$89" },
                  { bg: "bg-pink-100", emoji: "👜", label: "Bags", price: "$129" },
                  { bg: "bg-blue-100", emoji: "⌚", label: "Watches", price: "$199" },
                  { bg: "bg-green-100", emoji: "🎧", label: "Audio", price: "$149" },
                ].map((item) => (
                  <div key={item.label} className={`${item.bg} rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-indigo-600">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="border-t border-gray-100 bg-white/70 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50K+", label: "Products" },
              { value: "200K+", label: "Happy Customers" },
              { value: "4.9★", label: "Average Rating" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-indigo-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Find exactly what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: "👗", label: "Fashion" },
              { emoji: "💻", label: "Electronics" },
              { emoji: "🏠", label: "Home & Living" },
              { emoji: "💄", label: "Beauty" },
              { emoji: "⚽", label: "Sports" },
              { emoji: "📚", label: "Books" },
            ].map((cat) => (
              <a
                key={cat.label}
                href={`/products?category=${encodeURIComponent(cat.label)}`}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked just for you</p>
            </div>
            <a href="/products" className="text-sm font-semibold text-indigo-600 hover:underline hidden sm:block">View all →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🎧", name: "Pro Wireless Headphones", category: "Audio", price: "$149", originalPrice: "$199", badge: "Sale", bg: "bg-blue-50" },
              { emoji: "👟", name: "Urban Runner Sneakers", category: "Fashion", price: "$89", originalPrice: null, badge: "New", bg: "bg-orange-50" },
              { emoji: "⌚", name: "Smart Watch Series X", category: "Electronics", price: "$299", originalPrice: "$349", badge: "Hot", bg: "bg-purple-50" },
              { emoji: "💼", name: "Leather Laptop Bag", category: "Accessories", price: "$119", originalPrice: null, badge: null, bg: "bg-green-50" },
            ].map((product) => (
              <div key={product.name} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${product.bg} h-48 flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${product.badge === "Sale" ? "bg-red-500 text-white" : product.badge === "New" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}>
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 0 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 mt-1 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-2">Limited Time Offer</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Up to 40% Off<br />Summer Collection</h2>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4 text-white">
              {[
                { value: "02", label: "Days" },
                { value: "14", label: "Hours" },
                { value: "37", label: "Mins" },
                { value: "09", label: "Secs" },
              ].map((t) => (
                <div key={t.label} className="bg-white/20 rounded-xl px-4 py-3 text-center min-w-[60px]">
                  <p className="text-2xl font-extrabold">{t.value}</p>
                  <p className="text-xs text-indigo-200">{t.label}</p>
                </div>
              ))}
            </div>
            <a href="#" className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
              Grab the Deal
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose ONENEXT?</h2>
            <p className="text-gray-500 mt-2">We&apos;re built around your shopping experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4" />
                  </svg>
                ),
                title: "Fast Delivery",
                desc: "Same-day and next-day delivery options available in most cities.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Secure Payments",
                desc: "256-bit SSL encryption keeps every transaction safe and private.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "Easy Returns",
                desc: "Not happy? Return anything within 30 days, no questions asked.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                  </svg>
                ),
                title: "24/7 Support",
                desc: "Our team is always on standby to help you with anything you need.",
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
            <p className="text-gray-500 mt-2">Trusted by over 200,000 shoppers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", role: "Fashion Enthusiast", review: "ONENEXT has completely changed how I shop online. The quality is unmatched and delivery is always on time.", avatar: "SM", rating: 5 },
              { name: "James K.", role: "Tech Lover", review: "Found the best deals on electronics here. The checkout process is smooth and returns are hassle-free.", avatar: "JK", rating: 5 },
              { name: "Priya L.", role: "Home Decorator", review: "Amazing selection for home decor. I love how easy it is to browse and the customer support is fantastic.", avatar: "PL", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex text-yellow-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Get Exclusive Deals</h2>
          <p className="text-indigo-200 mb-8">Subscribe to our newsletter and be the first to know about sales, new arrivals, and special offers.</p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
