"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

function friendlyError(err: unknown): string {
  if (err instanceof TypeError && (err.message === "fetch failed" || err.message.includes("ENOTFOUND"))) {
    return "Cannot reach Supabase — check your internet connection or VPN and try again.";
  }
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred. Please try again.";
}

export async function signUp(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    revalidatePath("/", "layout");
    return { success: "Account created! Check your email to confirm before signing in." };
  } catch (err) {
    return { error: friendlyError(err) };
  }
}

export async function signIn(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Make Supabase's terse messages more readable
      if (error.message === "Invalid login credentials") {
        return { error: "Incorrect email or password. Please try again." };
      }
      if (error.message.toLowerCase().includes("email not confirmed")) {
        return { error: "Please confirm your email address before signing in." };
      }
      return { error: error.message };
    }
    revalidatePath("/", "layout");
  } catch (err) {
    return { error: friendlyError(err) };
  }

  redirect("/");
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  try {
    await supabase.auth.signOut();
  } catch {
    // silently ignore sign-out network errors
  }
  revalidatePath("/", "layout");
  redirect("/");
}
