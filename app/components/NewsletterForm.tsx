"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await subscribeNewsletter(email);
        if (result.error) {
          setMessage({ type: "error", text: result.error });
        } else if (result.success) {
          setMessage({ type: "success", text: result.success });
          setEmail("");
        } else {
          setMessage({ type: "error", text: "No response from server. Please try again." });
        }
      } catch (err) {
        console.error("[NewsletterForm] client error:", err);
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    });
  };

  if (message?.type === "success") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-white font-semibold">{message.text}</p>
        <button
          onClick={() => setMessage(null)}
          className="text-indigo-200 text-xs underline hover:text-white transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <>
      {message?.type === "error" && (
        <p className="text-red-300 text-sm mb-3 font-medium">{message.text}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-5 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4z" />
              </svg>
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      <p className="text-indigo-300 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
    </>
  );
}
