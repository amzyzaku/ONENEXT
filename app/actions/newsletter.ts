"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function subscribeNewsletter(email: string): Promise<{ error?: string; success?: string }> {
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      console.error("[newsletter] Supabase error:", error);

      // Unique constraint violation — already subscribed
      if (error.code === "23505") {
        return { error: "This email is already subscribed." };
      }
      // Table doesn't exist
      if (error.code === "42P01") {
        return { error: "Newsletter setup is incomplete. Please contact support." };
      }
      return { error: `Database error: ${error.message}` };
    }

    return { success: "You're in! Check your inbox for deals." };
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);

    if (err instanceof TypeError && err.message.includes("fetch")) {
      return { error: "Cannot reach the server. Check your internet connection and try again." };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
