import { isProduction } from "../utils";

export default {
  "web-data": {
    name: "Discord Bot List",
    api: {
      base: "https://api.lazypeople.tk",
    },
  },
  navbar: {
    navbar_data: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Partners",
        href: "/partners",
      },
    ],
    profile_nav: [
      {
        name: "Profile",
      },
      {
        name: "Add Bot",
        href: '/add'
      },
      {
        name: "divider",
      },
      {
        name: "Logout",
        href: "/api/discord/logout",
        style: "red",
      },
    ],
    footer_nav: {
      anotherText: "",
      notAffiliated: "DiscordBotList is not affiliated with Discord Inc.",
      links: [
        {
          name: "Links",
          child: [
            {
              name: "Privacy Policy",
              href: "/privacy-policy",
            },
            {
              name: "FAQ",
              href: "/",
            },
            {
              name: "Rest API",
              href: "/",
            },
          ],
        },
        {
          name: "Tags",
          child: [
            {
              name: "Leveling",
              href: "#",
            },
            {
              name: "Economy",
              href: "#",
            },
            {
              name: "Music",
              href: "#",
            },
          ],
        },
        {
          name: "Partners",
          child: [
            {
              name: "Slots 1",
            },
            {
              name: "Slots 2",
            },
            {
              name: "Slots 3",
            },
          ],
        },
      ],
    },
  },
  "login-data": {
    bg: "#5865F2",
    href: {
      bg: "#7289da",
    },
    color: "white",
  },
  "oauth-discord": {
    client_secret: "byXbKnnKXuT68pR3bnZDFjRSdf6lMSDk",
    client_id: "702874025189179533",
    redirect_uri: `${isProduction ? "https://bot-list.lazypeople.tk/api/discord/callback" : "http://localhost:3000/api/discord/callback"}`,
    scopes: ["identify"],
  },
  discord: {
    api: {
      base: "https://discord.com/api",
      cdn: "https://cdn.discordapp.com",
      authorization:
        "NzAyODc0MDI1MTg5MTc5NTMz.GpoaZs.IvbS6onHnTem-jSoKzGw797u4kz6pUklOOYKNY",
    },
  },
  jsonwebtoken: {
    "secret-key": "botlistdiscordbotbylazypeople",
    "cookie-name": "auth",
  },
};
