import { isProduction } from "../utils";

export default {
  "web-data": {
    name: "Lazy People",
    port: 3000,
    hcaptcha: {
      sitekey: isProduction ? "28d600f6-17e7-4f82-9340-c63a22d775c9" : "28d600f6-17e7-4f82-9340-c63a22d775c9"
    },
    api: {
      base: "https://api.lazypeople.tk",
    },
    category: [
      {
        name: 'Moderation',
        icon: ''
      },
      {
        name: 'Leveling',
        icon: ''
      },
      {
        name: 'Music',
        icon: '',
      },
      {
        name: 'Anime',
        icon: ''
      },
      {
        name: 'Economy',
        icon: ''
      }
    ]
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
      notAffiliated: "LazyPeople is not affiliated with Discord Inc.",
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
              href: "https://api.lazypeople.tk",
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
    redirect_uri: {
      production: "https://bot-list.lazypeople.tk/api/discord/callback",
      dev: {
        "localhost": "http://localhost:3000/api/discord/callback",
        "ipv4": "http://127.0.0.1:3000/api/discord/callback"
      }
    },
    // redirect_uri: `${isProduction ? "https://bot-list.lazypeople.tk/api/discord/callback" : "http://localhost:3000/api/discord/callback"}`,
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
    "cookie-name": {
      "auth_token": "auth",
      "redirect_url": "_ru"
    }
  },
};
