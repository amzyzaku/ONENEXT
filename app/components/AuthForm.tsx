"use client";

import { useState, useTransition } from "react";
import { signIn, signUp } from "@/app/auth/actions";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = mode === "signin"
          ? await signIn(formData)
          : await signUp(formData);

        // signIn redirects on success so result may be undefined
        if (!result) return;

        if (result.error) setMessage({ type: "error", text: result.error });
        if ("success" in result && result.success) {
          setMessage({ type: "success", text: result.success as string });
        }
      } catch (err) {
        // Catch any unhandled client-side errors
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setMessage({ type: "error", text: msg });
      }
    });
  };

  const switchMode = (next: "signin" | "signup") => {
    setMode(next);
    setMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Tab toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
        <button
          onClick={() => switchMode("signin")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mode === "signin"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => switchMode("signup")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mode === "signup"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Create Account
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-1">
        {mode === "signin" ? "Welcome back" : "Join ONENEXT"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {mode === "signin"
          ? "Sign in to access your account and orders."
          : "Create an account to start shopping."}
      </p>

      {/* Feedback message */}
      {message && (
        <div
          className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2 ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {message.type === "error" ? (
            <svg className="h-4 w-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.75-9.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
            minLength={6}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
          {mode === "signup" && (
            <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4z" />
              </svg>
              {mode === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
          className="text-indigo-600 font-semibold hover:underline"
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
