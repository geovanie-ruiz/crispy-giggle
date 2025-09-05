"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  // Accordion state and helpers per group
  const aboutItems = useMemo(() => ["about-1", "about-2", "about-3"], []);
  const [aboutOpen, setAboutOpen] = useState<string[]>([]);

  const nivenItems = useMemo(() => ["niven-1", "niven-2", "niven-3"], []);
  const [nivenOpen, setNivenOpen] = useState<string[]>([]);

  const uploadsItems = useMemo(() => ["ua-1", "ua-2", "ua-3"], []);
  const [uploadsOpen, setUploadsOpen] = useState<string[]>([]);

  const accountsItems = useMemo(() => ["aa-1", "aa-2"], []);
  const [accountsOpen, setAccountsOpen] = useState<string[]>([]);

  const historyItems = useMemo(() => ["mh-1"], []);
  const [historyOpen, setHistoryOpen] = useState<string[]>([]);

  const privacyItems = useMemo(() => ["dp-1"], []);
  const [privacyOpen, setPrivacyOpen] = useState<string[]>([]);

  const roadmapItems = useMemo(() => ["rm-1"], []);
  const [roadmapOpen, setRoadmapOpen] = useState<string[]>([]);

  const legalItems = useMemo(() => ["legal-1", "legal-2"], []);
  const [legalOpen, setLegalOpen] = useState<string[]>([]);

  const contactItems = useMemo(() => ["contact-1"], []);
  const [contactOpen, setContactOpen] = useState<string[]>([]);

  const isAllOpen = (open: string[], items: string[]) =>
    open.length === items.length;

  const toggleAll = (
    open: string[],
    items: string[],
    setOpen: (v: string[]) => void
  ) => {
    setOpen(isAllOpen(open, items) ? [] : items);
  };

  return (
    <main className="container mx-auto px-6 py-12 sm:px-8 md:px-10">
      <section className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-2">
            The Mech Mentor app helps Gundam Card Game players improve through
            AI-powered analysis of match logs—focused on actionable insights,
            progress tracking, and learning.
          </p>
        </header>

        {/* About the Mech Mentor app */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              About the Mech Mentor app
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleAll(aboutOpen, aboutItems, setAboutOpen)}
            >
              {isAllOpen(aboutOpen, aboutItems) ? "Collapse all" : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={aboutOpen}
            onValueChange={setAboutOpen}
            className="w-full"
          >
            <AccordionItem value="about-1">
              <AccordionTrigger>What is the Mech Mentor app?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The Mech Mentor app is a Next.js web app that transforms match
                transcripts into clear, structured coaching insights from Niven.
                It’s designed for competitive and casual players who want to
                understand decisions, patterns, and improvement areas over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="about-2">
              <AccordionTrigger>Does it play the game for me?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. The Mech Mentor app does not provide live in-game move
                suggestions or automation. The model, MCP server, and app are
                built to prevent gameplay assistance. It’s a post-game analysis
                and learning tool.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="about-3">
              <AccordionTrigger>Who is it for?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Players who want practical, scannable advice—tactical
                adjustments, strategic patterns, and progress tracking.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Contact & Support */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Contact & Support
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(contactOpen, contactItems, setContactOpen)
              }
            >
              {isAllOpen(contactOpen, contactItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={contactOpen}
            onValueChange={setContactOpen}
            className="w-full"
          >
            <AccordionItem value="contact-1">
              <AccordionTrigger>How can I contact support?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Have a question, bug report, or feedback? Reach out via our
                  community channels below:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <a
                      href="https://discord.gg/pxSbdEw3zc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Use the Discord Help channel
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="https://bsky.app/profile/simplygeo.bsky.social"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Direct Message via Bluesky
                    </a>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Niven (AI Coach) Analysis */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Niven (AI Coach) Analysis
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleAll(nivenOpen, nivenItems, setNivenOpen)}
            >
              {isAllOpen(nivenOpen, nivenItems) ? "Collapse all" : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={nivenOpen}
            onValueChange={setNivenOpen}
            className="w-full"
          >
            <AccordionItem value="niven-1">
              <AccordionTrigger>What does Niven provide?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Niven highlights decision points, resource efficiency, combat
                choices, and recurring patterns. Insights include tactical
                suggestions, strategic observations, and focus areas—prioritized
                with confidence indicators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="niven-2">
              <AccordionTrigger>How is feedback structured?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Feedback follows a consistent schema (e.g., decision points,
                resource usage, combat analysis, card advantage, performance
                metrics, patterns, and recommendations) so you can compare games
                over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="niven-3">
              <AccordionTrigger>
                Does Niven offer live or turn-by-turn in-match advice?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. The Mech Mentor app is not a gameplay assistant and won’t
                provide real-time moves or automation during matches.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Uploads & Transcripts */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Uploads & Transcripts
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(uploadsOpen, uploadsItems, setUploadsOpen)
              }
            >
              {isAllOpen(uploadsOpen, uploadsItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={uploadsOpen}
            onValueChange={setUploadsOpen}
            className="w-full"
          >
            <AccordionItem value="ua-1">
              <AccordionTrigger>
                What transcript sources are supported?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Wing Table and Zumbo Sim logs are fully supported and produce
                the expected analysis outcomes today. Free-form match notes are
                planned for future ingestion once Niven’s senses have grown to
                reliably interpret them. Analog reporting is also planned.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ua-2">
              <AccordionTrigger>How do I upload a match?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                From the Dashboard, select “Upload New Match,” provide basic
                metadata (opponent archetype, result, date), and paste or upload
                your transcript.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ua-3">
              <AccordionTrigger>How long does analysis take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Typical processing completes in under ~30 seconds for standard
                games. You’ll see status and results as soon as they’re ready.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Accounts & Auth */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Accounts & Auth
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(accountsOpen, accountsItems, setAccountsOpen)
              }
            >
              {isAllOpen(accountsOpen, accountsItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={accountsOpen}
            onValueChange={setAccountsOpen}
            className="w-full"
          >
            <AccordionItem value="aa-1">
              <AccordionTrigger>How do I sign in?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sign in with Discord, Google, or email via Clerk. For the best
                upcoming experience, consider Discord—there’s more planned for
                that connection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="aa-2">
              <AccordionTrigger>Is MFA supported?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. Authentication is managed by Clerk and supports modern
                security practices, including MFA.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Match History & Progress */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Match History & Progress
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(historyOpen, historyItems, setHistoryOpen)
              }
            >
              {isAllOpen(historyOpen, historyItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={historyOpen}
            onValueChange={setHistoryOpen}
            className="w-full"
          >
            <AccordionItem value="mh-1">
              <AccordionTrigger>What can I track?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Chronological match history, matchup performance, win-rate
                trends, recurring decision patterns, and improvement areas.
                Detailed pages provide drill-downs into critical moments and
                recommendations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Data & Privacy */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Data & Privacy
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(privacyOpen, privacyItems, setPrivacyOpen)
              }
            >
              {isAllOpen(privacyOpen, privacyItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={privacyOpen}
            onValueChange={setPrivacyOpen}
            className="w-full"
          >
            <AccordionItem value="dp-1">
              <AccordionTrigger>How is my data handled?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use secure storage with encryption in transit and at rest,
                support GDPR-aligned practices, and offer anonymization for
                sharing. You can request deletion of your data.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Roadmap */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">Roadmap</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleAll(roadmapOpen, roadmapItems, setRoadmapOpen)
              }
            >
              {isAllOpen(roadmapOpen, roadmapItems)
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={roadmapOpen}
            onValueChange={setRoadmapOpen}
            className="w-full"
          >
            <AccordionItem value="rm-1">
              <AccordionTrigger>What’s coming next?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Planned features include an ELO-like rating system, community
                tools, richer analytics, and additional transcript sources
                (including analog reporting).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Legal & Affiliation */}
        <div className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              Legal & Affiliation
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleAll(legalOpen, legalItems, setLegalOpen)}
            >
              {isAllOpen(legalOpen, legalItems) ? "Collapse all" : "Expand all"}
            </Button>
          </div>
          <Accordion
            type="multiple"
            value={legalOpen}
            onValueChange={setLegalOpen}
            className="w-full"
          >
            <AccordionItem value="legal-1">
              <AccordionTrigger>
                Are you affiliated with Bandai or the Gundam franchise?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. Gundam is the property of Bandai. The Mech Mentor app is an
                independent, fan-made project and is not affiliated with,
                endorsed by, or sponsored by Bandai or the Gundam franchise.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="legal-2">
              <AccordionTrigger>
                How do you handle trademarks and content?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                References are used solely to help players analyze matches. All
                trademarks and IP belong to their respective owners. Contact us
                if any content needs review.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
