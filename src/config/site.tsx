export type SiteConfig = typeof siteConfig;

enum LinkType {
  DISCORD = "Discord",
}

export const siteConfig = {
  navItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Matches",
      href: "/matches",
    },
    {
      label: "Upload",
      href: "/matches/upload",
    },
    {
      label: "Sign in",
      href: "/auth",
    },
  ],
  links: [
    {
      type: LinkType.DISCORD,
      href: "",
    },
  ],
};
