import { PrivacyContent } from "@/components/legal/PrivacyContent";

export default function PrivacyPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-2">
          Last updated: September 1, 2025
        </p>
      </header>
      <PrivacyContent />
    </section>
  );
}
