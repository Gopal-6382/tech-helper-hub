export const siteConfig = {
  name: "Tech Helper Hub",
  description: "Connect with certified technical professionals and services.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://techhelperhub.com",
  ogImage: "https://techhelperhub.com/og.jpg",
  links: {
    twitter: "https://twitter.com/techhelperhub",
    github: "https://github.com/techhelperhub",
  },
};

export type SiteConfig = typeof siteConfig;
