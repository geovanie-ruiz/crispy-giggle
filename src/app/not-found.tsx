import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <section className="container px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="font-mono">404</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>Page not found</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            This page has gone missing
          </h1>
          <p className="mt-3 text-muted-foreground">
            The page you’re looking for doesn’t exist or was moved. Check the
            URL or return to the homepage.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
