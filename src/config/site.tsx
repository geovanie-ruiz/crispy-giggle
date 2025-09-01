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
      href: "/matches",
    },
    {
      label: "Upload",
      href: "/matches/upload",
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
          href: "/matches",
        },
        {
          label: "New Match Log",
          href: "/matches/upload",
        },
      ],
    },
    {
      title: "For Everyone",
      links: [
        {
          label: "FAQ",
          href: "/#",
        },
        {
          label: "Privacy Policy",
          href: "#",
        },
      ],
    },
  ],
};
