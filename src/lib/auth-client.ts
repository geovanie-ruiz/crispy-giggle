"use client";

import { adminClient, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import { stripeClient } from "@better-auth/stripe/client";

// When hosted on the same domain as the Next.js app, baseURL can be omitted
export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }),
    adminClient(),
    stripeClient({
      subscription: false,
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export type AuthClient = typeof authClient;

export const {
  signUp,
  signIn,
  signOut,
  useSession,
} = authClient;
