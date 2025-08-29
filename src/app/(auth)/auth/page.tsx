"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message || "Failed to sign in");
      return;
    }
    router.push("/dashboard");
  };

  const handleDiscord = async () => {
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.social({ provider: "discord" });
    setLoading(false);
    if (error) setError(error.message || "Failed to sign in with Discord");
  };

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="size-5" /> Sign in
          </CardTitle>
          <CardDescription>
            Welcome back. Enter your credentials to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleEmailSignIn} className="grid gap-4">
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-2">
          <Button
            variant="secondary"
            onClick={handleDiscord}
            disabled={loading}
          >
            Continue with Discord
          </Button>
          <div className="flex items-center justify-between text-sm">
            <Button asChild variant="link" className="px-0">
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
            <Button asChild variant="link" className="px-0">
              <Link href="/auth/register">Create account</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
