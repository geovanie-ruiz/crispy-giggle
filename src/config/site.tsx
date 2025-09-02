import { SiDiscord as DiscordIcon } from "@icons-pack/react-simple-icons";
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
      href: "/dashboard/matches",
    },
    {
      label: "Upload",
      href: "/dashboard/matches/upload",
    },
  ],
  links: [
    {
      type: LinkType.DISCORD,
      href: "#",
      icon: <DiscordIcon size={24} />,
    },
  ],
  footerNavItems: [
    {
      title: "For Pilots",
      links: [
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Matches",
          href: "/dashboard/matches",
        },
        {
          label: "New Match Log",
          href: "/dashboard/matches/upload",
        },
      ],
    },
    {
      title: "For Everyone",
      links: [
        {
          label: "FAQ",
          href: "/faq",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
      ],
    },
  ],
};
