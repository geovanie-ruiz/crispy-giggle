import { siteConfig } from "@/config/site";
import { Bot } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-switch";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground font-sans tracking-tight">
                  Mech Mentor
                </span>
                <span className="text-sm text-muted-foreground font-serif tracking-wide leading-tight">
                  The Gundam Card Game Coach
                </span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Upload your Gundam Card Game match logs and get AI-powered
              coaching—turn-by-turn insights, critical decision points, and
              matchup guidance—then track your improvement over time.
            </p>
            <div className="flex flex-row gap-4 mt-6 items-center">
              {siteConfig.links.map((link) => (
                <Link
                  key={link.type}
                  href={link.href}
                  target="_blank"
                  className="size-6 inline-block cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  {link.icon}
                </Link>
              ))}
              <div className="flex flex-row items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          {siteConfig.footerNavItems.map((navGroup, idx) => (
            <div key={`col${idx}-${navGroup.title}`}>
              <h3 className="font-semibold text-foreground mb-4 font-serif">
                {navGroup.title}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {navGroup.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.target}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p className="max-w-2/3 mx-auto">
            Gundam is the property of Bandai. This app is an independent,
            fan-made project and is not affiliated with, endorsed by, or
            sponsored by Bandai or the Gundam franchise. Built with ❤️ & 🤖 by
            Simply Dev. Made for Newtypes, by Newtypes.
          </p>
        </div>
      </div>
    </footer>
  );
}
