import {
  SiDiscord as DiscordIcon,
  SiBluesky as BskyIcon,
  SiPatreon as PatreonIcon,
} from "@icons-pack/react-simple-icons";
export type SiteConfig = typeof siteConfig;

enum LinkType {
  DISCORD = "Discord",
  BLUESKY = "Bluesky",
  PATREON = "Patreon",
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
  ],
  links: [
    {
      type: LinkType.PATREON,
      href: "https://patreon.com/SimplyDevWork?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
      icon: <PatreonIcon size={24} />,
    },
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
          target: "_self",
        },
        {
          label: "Matches",
          href: "/dashboard/matches",
          target: "_self",
        },
        {
          label: "Zumbo Sim",
          href: "https://play.zumbosim.com/",
          target: "_blank",
        },
        {
          label: "Wing Table",
          href: "https://www.wingtable.net/gcg/",
          target: "_blank",
        },
      ],
    },
    {
      title: "For Everyone",
      links: [
        {
          label: "FAQ",
          href: "/faq",
          target: "_self",
        },
        {
          label: "Privacy Policy",
          href: "/legalese/privacy",
          target: "_self",
        },
        {
          label: "Terms",
          href: "/legalese/terms",
          target: "_self",
        },
      ],
    },
  ],
};
