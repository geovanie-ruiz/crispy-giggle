"use client";
import Link from "next/link";
import { UserPlus } from "lucide-react";
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

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await authClient.signUp.email({ email, password, name });
    setLoading(false);
    if (error) {
      setError(error.message || "Failed to create account");
      return;
    }
    router.push("/dashboard");
  };

  const handleDiscord = async () => {
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.social({ provider: "discord" });
    setLoading(false);
    if (error) setError(error.message || "Failed to continue with Discord");
  };

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="size-5" /> Create account
          </CardTitle>
          <CardDescription>Join Gundam Coach in seconds.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <form onSubmit={handleEmailSignUp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Amuro Ray"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              {loading ? "Creating..." : "Create account"}
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
              <Link href="/auth">Already have an account? Sign in</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
