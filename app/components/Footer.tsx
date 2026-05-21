export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <p className="text-2xl font-extrabold text-white mb-3">
              ONE<span className="text-indigo-400">NEXT</span>
            </p>
            <p className="text-sm leading-relaxed">Your one-stop destination for premium products. Shop smarter, live better.</p>
          </div>
          {[
            { title: "Shop", links: [{ label: "New Arrivals", href: "/products?sort=newest" }, { label: "Best Sellers", href: "/products?sort=popular" }, { label: "Sale", href: "/products?badge=sale" }, { label: "All Products", href: "/products" }] },
            { title: "Support", links: [{ label: "Help Center", href: "#" }, { label: "Track Order", href: "/account" }, { label: "Returns", href: "#" }, { label: "Contact Us", href: "#" }] },
            { title: "Company", links: [{ label: "About Us", href: "#" }, { label: "Careers", href: "#" }, { label: "Press", href: "#" }, { label: "Privacy Policy", href: "#" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-indigo-400 transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 ONENEXT. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((pay) => (
              <span key={pay} className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded">{pay}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
