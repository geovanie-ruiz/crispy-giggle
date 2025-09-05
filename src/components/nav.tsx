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
import { useState } from "react";
import { UploadMatchModal } from "@/components/upload/UploadMatchModal";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const Nav = () => {
  const { theme } = useTheme();
  const [uploadOpen, setUploadOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 bg-background/75 drop-shadow-lg border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex flex-row items-center font-semibold gap-2"
        >
          <Bot className="size-8 text-primary" />
          <span className="text-xl font-semibold text-foreground font-sans tracking-tight">
            Mech Mentor
          </span>
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
                <NavigationMenuLink asChild className="ml-4">
                  <SignUpButton>
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedOut>

            <SignedIn>
              <NavigationMenuItem className="ml-4">
                <UserButton
                  appearance={{
                    theme: isDark ? dark : "clerk",
                    variables: {
                      colorPrimary: isDark ? "#e78a53" : "#d87943",
                      colorBackground: isDark ? "#181616" : "#e9e7e7",
                      colorForeground: isDark ? "#d4d4d4" : "#2b2b2b",
                    },
                  }}
                  userProfileMode="modal"
                  userProfileProps={{
                    appearance: {
                      theme: isDark ? dark : "clerk",
                      variables: {
                        colorPrimary: isDark ? "#e78a53" : "#d87943",
                        colorBackground: isDark ? "#181616" : "#e9e7e7",
                        colorForeground: isDark ? "#d4d4d4" : "#2b2b2b",
                      },
                    },
                  }}
                />
              </NavigationMenuItem>
            </SignedIn>
          </NavigationMenuList>
        </NavigationMenu>
        <UploadMatchModal open={uploadOpen} onOpenChange={setUploadOpen} />
      </div>
    </header>
  );
};
