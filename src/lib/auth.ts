import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
import resend from "@/lib/resend";
import { reactResetPasswordEmail } from "./resend/reset-password";
import { stripe } from "@better-auth/stripe";
import { Stripe } from "stripe";

const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
const to = process.env.TEST_EMAIL || "geovanie.ruiz+gundamcoach@gmail.com";

const SUPPORTER_PRICE_ID = {
  default: "stripe_price_id_1",
  annual: "stripe_price_id_2",
};

export const auth = betterAuth({
  appName: "GCG Coach",
  database: new Pool({
    connectionString: process.env.DB_URL,
  }),
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from,
        to: to || user.email,
        subject: "[GCGC] Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
      });
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_KEY || "sk_test_"),
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      subscription: {
        enabled: false,
        plans: [
          {
            name: "Supporter",
            priceId: SUPPORTER_PRICE_ID.default,
            annualDiscountPriceId: SUPPORTER_PRICE_ID.annual,
          },
        ],
      },
    }),
  ],
});
