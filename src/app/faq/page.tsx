"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-6 py-12 sm:px-8 md:px-10">
      <section className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-2">
            Learn how GCG Coach helps TCG pilots analyze matches
            quickly—optimized for mobile, high contrast, and fast loading.
          </p>
        </header>

        {/* Getting Started */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Getting Started
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="gs-1">
              <AccordionTrigger>What is GCG Coach?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                GCG Coach is a mobile-first assistant for Gundam TCG players. It
                helps you upload match logs, analyze performance, and track
                stats like win rates and matchup data between rounds and on the
                go.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gs-2">
              <AccordionTrigger>
                Why mobile-first and high contrast?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Tournament venues often have poor lighting and unreliable WiFi.
                We prioritize fast loading, high contrast, and touch-friendly
                targets so you can quickly find insights when it matters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gs-3">
              <AccordionTrigger>Who is this for?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                TCG pilots who want scannable, actionable insights between
                rounds. The UI is designed for quick reads, with larger tap
                targets and data-forward typography.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Uploads & Analysis */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Uploads & Analysis
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ua-1">
              <AccordionTrigger>How do I upload a match log?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                From the Dashboard, tap “Upload New Match.” Enter basic details
                (opponent deck, result, date/time) and paste your transcript. We
                guide you with formatting tips and a character counter.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ua-2">
              <AccordionTrigger>What insights do I get?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You’ll see win rates, matchup notes, turn-by-turn highlights,
                and actionable recommendations. We use monospace typography for
                transcripts and tabular numbers for clean stats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ua-3">
              <AccordionTrigger>
                Can I read results on mobile easily?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. The analysis is optimized for mobile reading with clear
                headings, collapsible sections, and large numbers—so you can
                digest key insights at a glance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Accounts & Auth */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Accounts & Auth
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="aa-1">
              <AccordionTrigger>Do you support social login?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes—Discord and Google are supported, with proper loading states
                for redirects and graceful handling of poor network conditions
                common at tournaments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="aa-2">
              <AccordionTrigger>Can I use biometrics?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Where available on your device, we support biometric
                authentication for a faster, more secure sign-in experience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Data & Performance */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Data & Performance
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="dp-1">
              <AccordionTrigger>
                Is the app fast on unstable WiFi?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. We optimize for fast loading, image compression, and
                minimal payloads. Core views are designed to be resilient on
                shaky connections.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dp-2">
              <AccordionTrigger>
                How are stats presented for quick scanning?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use large, tabular numbers, clear labels, and consistent
                layouts. Wins use warm accents, losses use a destructive color,
                while neutral data sticks to grays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dp-3">
              <AccordionTrigger>
                Do you support accessibility best practices?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We target high contrast, large touch targets, visible focus
                indicators, and screen reader-friendly markup. Text scales
                gracefully up to 200%.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Legal & Affiliation */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Legal & Affiliation
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="legal-1"
          >
            <AccordionItem value="legal-1">
              <AccordionTrigger>
                Are you affiliated with Bandai or the Gundam franchise?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. Gundam is the property of Bandai. GCG Coach is an
                independent, fan-made project. We are not affiliated with,
                endorsed by, or sponsored by Bandai or the Gundam franchise.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="legal-2">
              <AccordionTrigger>
                How do you handle trademarks and content?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use Gundam references only as necessary to help players
                analyze their matches. All trademarks and IP belong to their
                respective owners. If any content needs review, contact us.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
