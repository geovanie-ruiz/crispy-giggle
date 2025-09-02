"use server";

import { createClient } from "@supabase/supabase-js";

import { Database } from "@/lib/supabase/types/database";

export async function createSupabaseServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
