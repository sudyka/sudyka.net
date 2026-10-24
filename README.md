# sudyka.net

Personal site and project launchpad for [sudyka.net](https://sudyka.net). Static HTML built with [Eleventy](https://www.11ty.dev/) 3.1, deployed to GitHub Pages.

The 2021 Create React App is gone. Pages are server-rendered Markdown, styled with the VT323 terminal font that was already in the repo (SIL Open Font License, see `src/assets/fonts/OFL.txt`) and the illustration `src/assets/tequilaiccarus.png`.

## Run locally

Node 18 or newer (22 is what the deploy workflow uses).

```bash
npm install
npm start
```

`npm start` serves the site at `http://localhost:8080` and rebuilds when files change. Drafts are included.

```bash
npm run build
```

Writes the site to `_site/` and checks that the IndieWeb markup and feeds are present. Drafts are omitted. This is the same command GitHub Actions runs.

## Add a post

Create `src/posts/YYYY-MM-DD-your-slug.md`:

```yaml
---
title: Your title
summary: One sentence, used on indexes and in the feeds.
date: 2026-10-24
tags:
  - some-tag
---

The body is Markdown.
```

The date prefix sets the URL slug (`/posts/your-slug/`) and the date. `summary` is the listing text. Tags other than `post` and `note` get a page at `/tags/<tag>/`.

Set `draft: true` to see the file locally and keep it out of `npm run build`.

## Add a note

Create `src/notes/YYYY-MM-DD-your-slug.md`:

```yaml
---
date: 2026-10-24
tags:
  - some-tag
---

A short update. Notes have no title.
```

Notes are `h-entry` posts whose name and content are the same text, which is how a note is told apart from an article.

## Add a project

Create a folder `src/projects/<slug>/` with an `index.md`:

```yaml
---
title: Project name
summary: What this is, in one sentence.
date: 2026-10-24
status: exploring
tags:
  - project
---

The project page. More pages can live beside this file.
```

`status` is a label (`exploring`, `sample`, `archived`, or whatever you want). Projects without a status, then samples, then anything marked `archived`, is the order on the home page and the project index.

Any other Markdown file in that folder is a subpage. Give it a `title`, a `date`, and a `summary`. It shows up in that project’s navigation. Do not tag subpages `project`, or they will also appear as their own project.

```yaml
---
title: A subpage
summary: One sentence.
date: 2026-10-24
---
```

The home page, posts, notes, and projects indexes are `h-feed`s. Posts, notes, and project pages are `h-entry`s.

## IndieWeb settings

All of this lives in `src/_data/site.js`. Empty values are left out of the HTML, so the site does not advertise endpoints you have not set up.

| Key | What to put |
| --- | --- |
| `name`, `note`, `photo`, `photoAlt` | The home page `h-card`. The name is the one from the 2021 footer. |
| `email` | Public email. Leave `""` to hide it. Rendered as `u-email`. |
| `profiles` | `{ name, url }` pairs. Each becomes a `rel="me"` link in the document head, the footer, and the `h-card`. |
| `indieauth.authorizationEndpoint` | IndieAuth authorization endpoint, for example `https://indieauth.com/auth`. Emitted as `<link rel="authorization_endpoint">`. |
| `indieauth.tokenEndpoint` | Token endpoint, for example `https://tokens.indieauth.com/token`. Emitted as `<link rel="token_endpoint">`. |
| `micropub` | Micropub endpoint. Emitted as `<link rel="micropub">`. |
| `webmention.endpoint` | Webmention endpoint, for example `https://webmention.io/sudyka.net/webmention`. Emitted as `<link rel="webmention">`. |
| `pingback` | Optional pingback endpoint. |

Only `http` and `https` URLs are emitted. The home page `h-card` has the name, the illustration as `u-photo`, the site URL, and the `rel="me"` profiles.

Feeds, on every page via `<link rel="alternate">` and in the footer:

- `/feed.xml` — Atom
- `/feed.rss` — RSS 2.0
- `/feed.json` — JSON Feed 1.1

They include posts and notes. Project pages are `h-entry`s but are not in the feed.

### Webmentions

When `webmention.endpoint` is unset, received mentions are not fetched and the mentions section is not rendered.

To show mentions received by [webmention.io](https://webmention.io/):

1. Set `webmention.endpoint` to your endpoint.
2. Create an API token on webmention.io.
3. Expose it to the build as `WEBMENTION_IO_TOKEN`. Locally that is a shell export. On GitHub, add a repository secret with that name. The workflow already passes the secret through. The token is not written into the site.

Mentions are fetched once at build time. If the request fails or times out, the build continues and the pages render with no mentions. Mention text is escaped. Author images have to be `http` or `https` URLs.

## Deploy

Pushes to `master` run `.github/workflows/pages.yml`, which builds the site and publishes `_site/` with GitHub Pages actions. Pull requests build but do not deploy.

The custom domain is `sudyka.net`. `CNAME` is copied into the published site. DNS already points the apex at GitHub Pages and `www` at `sudyka.github.io`.

### Repository settings you need to change

GitHub does not let the default token switch the Pages source, so this is manual:

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions**.
3. Confirm the custom domain is `sudyka.net` and HTTPS is on. The `CNAME` file in the artifact requests that domain.

Until the source is GitHub Actions, this repo keeps publishing the old `gh-pages` branch (the Create React App build). After a successful Actions deploy, that branch is unused and can be deleted:

```bash
git push origin --delete gh-pages
```

Do that only after the new site is the one being served.

`pathPrefix` in `eleventy.config.js` is `/` because the custom domain is served from the root. The old `homepage` field pointed at `https://sudyka.github.io/sudyka.net/`, which was the project-site URL. With the custom domain in place, root-absolute links are correct.

## What happened to the old pages

| Old route | Now |
| --- | --- |
| `/`, `/about` | Home (with an `h-card`) and a placeholder about page. The about page used to say “Hello World!” and still does not invent a biography. |
| `/tech` | Removed. It was only “Hello World!”. |
| `/5e/subclasses` | Archived as [5e homebrew notes](/projects/5e-homebrew/), with the subclass names that were actually in the old browser. No ability text existed in the repo, so none was written. |
| `/5e/spells`, `/5e/monsters` | Removed. Both pages were a placeholder sentence. |

The sample post, sample note, and example project are marked **sample** and can be deleted.

## Layout

```
eleventy.config.js      Eleventy config, collections, draft handling
src/_data/site.js       Name, profiles, IndieWeb endpoints
src/_includes/          Base layout, post and project layouts, feed cards
src/posts/              Articles
src/notes/              Short notes
src/projects/<slug>/    One folder per project; index.md is the project
src/assets/             CSS, VT323, illustration, favicon
CNAME                   sudyka.net
```
