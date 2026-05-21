"use client";

import { useTransition } from "react";
import { signOut } from "@/app/auth/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => signOut())}
      disabled={isPending}
      className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-60"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
