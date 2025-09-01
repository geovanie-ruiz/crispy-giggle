"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/75 drop-shadow-lg border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex flex-row items-center font-semibold gap-2"
        >
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <Bot className="size-6" />
          </div>
          <span>GCG Coach</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {siteConfig.navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <SignedOut>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <SignInButton />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <SignUpButton>
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedOut>

            <SignedIn>
              <NavigationMenuItem>
                <div className="ml-4">
                  <UserButton />
                </div>
              </NavigationMenuItem>
            </SignedIn>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
