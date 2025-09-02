"use server";

import { createSupabaseServiceClient } from "@/lib/supabase/service-client";
import { verifyWebhook, WebhookEvent } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  let evt: WebhookEvent | null = null;

  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const {
      id,
      primary_email_address_id,
      email_addresses,
      username,
      last_name,
    } = evt.data;

    const email = email_addresses.find((email) =>
      email.id === primary_email_address_id
    );
    const displayName = `Ensign ${last_name}` || username ||
      email?.email_address.split("@")[0] || "New Pilot";

    const supabase = await createSupabaseServiceClient();
    const { error } = await supabase
      .from("profiles")
      .upsert({
        clerk_id: id,
        display_name: displayName,
      }, {
        onConflict: "clerk_id",
        ignoreDuplicates: true,
      });

    if (error) {
      console.error("Error creating user:", error);
      return new Response("Error: Could not create user", {
        status: 500,
      });
    }

    // Set to default role
    const client = await clerkClient();
    try {
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "user",
        },
      });
    } catch (error) {
      console.error("Error updating user metadata:", error);
      return new Response("Error: Could not update user metadata", {
        status: 500,
      });
    }
  }

  if (evt.type === "user.deleted") {
    const { id, deleted } = evt.data;

    if (deleted && id) {
      const supabase = await createSupabaseServiceClient();
      const { error } = await supabase.from("profiles")
        .delete()
        .eq("clerk_id", id);

      if (error) {
        console.error("Error deleting user:", error);
        return new Response("Error: Could not delete user", {
          status: 500,
        });
      }
    }
  }

  if (evt.type === "user.updated") {
  }

  return new Response("Webhook received", { status: 200 });
}
