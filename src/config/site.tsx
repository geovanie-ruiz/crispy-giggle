import {
  SiDiscord as DiscordIcon,
  SiBluesky as BskyIcon,
} from "@icons-pack/react-simple-icons";
export type SiteConfig = typeof siteConfig;

enum LinkType {
  DISCORD = "Discord",
  BLUESKY = "Bluesky",
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
      href: "https://discord.gg/pxSbdEw3zc",
      icon: <DiscordIcon size={24} />,
    },
    {
      type: LinkType.BLUESKY,
      href: "https://bsky.app/profile/simplygeo.bsky.social",
      icon: <BskyIcon size={24} />,
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
