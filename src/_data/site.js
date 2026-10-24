/**
 * Site-wide settings. Empty IndieWeb endpoints are omitted from the HTML
 * until they are real https URLs. See the README for what to put here.
 */
module.exports = {
  name: "Jack Sudyka",
  domain: "sudyka.net",
  url: "https://sudyka.net",
  locale: "en",
  description: "A personal home base for writing, and a launchpad for projects that are just getting started.",
  note: "A personal home base for writing, and a launchpad for projects that are just getting started.",
  feedTitle: "sudyka.net",
  // The previous site's footer used this name. Change it here if you want
  // something else on the h-card. Leave email blank until you want it public.
  email: "",
  photo: "/assets/tequilaiccarus.png",
  photoAlt: "Illustration of a winged figure, with the words Tequila Icarus. Carried over from the previous version of this site.",
  profiles: [
    {
      name: "GitHub",
      url: "https://github.com/sudyka",
    },
  ],
  nav: [
    { href: "/", label: "home" },
    { href: "/posts/", label: "posts" },
    { href: "/notes/", label: "notes" },
    { href: "/projects/", label: "projects" },
    { href: "/about/", label: "about" },
  ],
  indieauth: {
    // Example: "https://indieauth.com/auth"
    authorizationEndpoint: "",
    // Example: "https://tokens.indieauth.com/token"
    tokenEndpoint: "",
  },
  // Example: "https://example.com/micropub"
  micropub: "",
  webmention: {
    // Example: "https://webmention.io/sudyka.net/webmention"
    endpoint: "",
  },
  // Example: "https://webmention.io/sudyka.net/xmlrpc"
  pingback: "",
};
