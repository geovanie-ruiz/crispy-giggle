import type { Metadata, Viewport } from "next";
import { fontSerif, fontSans, fontMono } from "@/config/fonts";
import "./globals.css";
import { Toaster } from "sonner";
import { WrapperWithQuery } from "@/providers/query";
import { ThemeProvider } from "@/providers/theme";
import clsx from "clsx";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "GCG Coach",
  description: "Level up your piloting skills... maybe",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={clsx(
            "min-h-screen text-foreground bg-background",
            fontSerif.variable,
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider
            themeProps={{
              attribute: "class",
              defaultTheme: "dark",
              enableSystem: true,
            }}
          >
            <WrapperWithQuery>
              <div className="flex flex-col min-h-screen">
                <Nav />
                <div className="flex flex-grow font-sans transition-colors duration-300">
                  {children}
                </div>
                <Footer />
              </div>
            </WrapperWithQuery>
            <Toaster richColors closeButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
