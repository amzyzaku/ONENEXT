"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple header for cart page */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold tracking-tight text-indigo-600">
            ONE<span className="text-gray-900">NEXT</span>
          </a>
          <a href="/products" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            ← Continue Shopping
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Your Cart {totalItems > 0 && <span className="text-gray-400 font-normal text-xl">({totalItems} items)</span>}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-6">Add some products to get started</p>
            <a href="/products" className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors">
              Shop Now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-5">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href={`/products/${item.id}`} className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.name}
                    </a>
                    <p className="text-sm text-gray-400 mt-0.5">{item.category}</p>
                    <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shrink-0">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-50 font-bold">−</button>
                    <span className="px-3 py-2 font-semibold text-gray-900 min-w-[32px] text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-50 font-bold">+</button>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors self-start mt-2">
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>
                <div className="flex flex-col gap-3 text-sm mb-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={totalPrice >= 50 ? "text-green-600 font-medium" : ""}>
                      {totalPrice >= 50 ? "FREE" : "$9.99"}
                    </span>
                  </div>
                  {totalPrice < 50 && (
                    <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice >= 50 ? 0 : 9.99)).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/auth")}
                  className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <a href="/products" className="block text-center text-sm text-gray-500 hover:text-indigo-600 mt-3 transition-colors">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
