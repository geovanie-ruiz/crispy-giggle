"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { Database } from "@/lib/supabase/types";

export async function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      async accessToken() {
        // Ask Better Auth to issue a JWT via the token endpoint (requires jwt() plugin)
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL ||
          "http://localhost:3000";
        const res = await fetch(`${baseURL}/api/auth/token`, {
          method: "GET",
          // Forward cookies so Better Auth can read the session
          headers: {
            cookie: cookies().toString(),
          },
          cache: "no-store",
        });
        if (!res.ok) return null;
        const { token } = (await res.json()) as { token?: string };
        return token ?? null;
      },
    },
  );
}
