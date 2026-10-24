const fs = require("fs");
const path = require("path");
const { mf2 } = require("microformats-parser");
const { forPage, fetchWebmentions } = require("../lib/webmentions");
const site = require("../src/_data/site");

const root = path.join(__dirname, "..", "_site");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(urlPath) {
  const file = urlPath.endsWith("/")
    ? path.join(root, urlPath, "index.html")
    : path.join(root, urlPath);
  return fs.readFileSync(file, "utf8");
}

function parse(urlPath) {
  const html = read(urlPath);
  const base = new URL(urlPath, "https://sudyka.net/").href;
  return { html, parsed: mf2(html, { baseUrl: base }) };
}

function strings(values) {
  return (values || []).filter((value) => typeof value === "string");
}

function contentValue(entry) {
  const content = entry.properties.content && entry.properties.content[0];
  if (!content) return "";
  if (typeof content === "string") return content;
  return content.value || "";
}

function photoUrl(card) {
  const photo = card.properties.photo && card.properties.photo[0];
  if (!photo) return "";
  if (typeof photo === "string") return photo;
  return photo.value || "";
}

async function main() {
  const home = parse("/");
  const card = home.parsed.items.find((item) => item.type.includes("h-card"));
  const feed = home.parsed.items.find((item) => item.type.includes("h-feed"));
  assert(card, "home page is missing an h-card");
  assert(feed && feed.children && feed.children.length >= 2, "home page h-feed is missing entries");
  if (card) {
    assert(strings(card.properties.name).includes("Jack Sudyka"), "h-card name");
    assert(photoUrl(card).endsWith("/assets/tequilaiccarus.png"), "h-card u-photo");
    assert(strings(card.properties.url)[0] === "https://sudyka.net/", "h-card u-url should be the site first");
    assert(strings(card.properties.url).includes("https://github.com/sudyka"), "h-card is missing the GitHub url");
    assert((card.properties.note || []).length === 1, "h-card p-note");
  }
  assert((home.parsed.rels.me || []).includes("https://github.com/sudyka"), "rel=me");
  assert(!(home.parsed.rels.authorization_endpoint || []).length, "authorization endpoint should be omitted until configured");
  assert(!(home.parsed.rels.webmention || []).length, "webmention endpoint should be omitted until configured");
  assert(!home.html.includes("<script"), "home page should not include a script");
  assert(home.html.includes('rel="me"'), "rel=me link");

  const post = parse("/posts/sample-post/");
  const article = post.parsed.items.find((item) => item.type.includes("h-entry"));
  assert(article, "post is missing an h-entry");
  if (article) {
    assert(strings(article.properties.name).includes("Sample post"), "post p-name");
    assert(strings(article.properties.url).join(" ") === "https://sudyka.net/posts/sample-post/", "post should have one u-url");
    assert((article.properties.published || []).length === 1, "post dt-published");
    assert(contentValue(article).includes("sample article"), "post e-content");
    const author = article.properties.author && article.properties.author[0];
    assert(author && author.type.includes("h-card"), "post p-author h-card");
    assert(author && strings(author.properties.name).includes("Jack Sudyka"), "author name");
    assert(author && strings(author.properties.url).includes("https://sudyka.net/"), "author url");
    assert(!post.html.includes('rel="webmention"'), "unconfigured post should not advertise webmention");
  }

  const note = parse("/notes/sample-note/");
  const noteEntry = note.parsed.items.find((item) => item.type.includes("h-entry"));
  assert(noteEntry, "note is missing an h-entry");
  if (noteEntry) {
    const name = strings(noteEntry.properties.name)[0] || "";
    const body = contentValue(noteEntry).replace(/\s+/g, " ").trim();
    assert(name.replace(/\s+/g, " ").trim() === body, "note p-name should match e-content");
    assert(strings(noteEntry.properties.url)[0] === "https://sudyka.net/notes/sample-note/", "note u-url");
    assert((noteEntry.properties.published || []).length === 1, "note dt-published");
    assert(note.html.includes("<h1"), "note should have a heading");
  }

  for (const urlPath of ["/posts/", "/notes/", "/projects/"]) {
    const page = parse(urlPath);
    const listing = page.parsed.items.find((item) => item.type.includes("h-feed"));
    assert(listing && listing.children && listing.children.length > 0, `${urlPath} is missing an h-feed with entries`);
  }

  const about = parse("/about/");
  assert(!about.parsed.items.some((item) => item.type.includes("h-entry")), "about page should not be an h-entry");

  const project = parse("/projects/example/");
  assert(project.html.includes("Overview"), "project subnav should list Overview first");
  assert(project.html.indexOf("Overview") < project.html.indexOf("Adding a subpage"), "Overview should come before subpages");

  const atom = fs.readFileSync(path.join(root, "feed.xml"), "utf8");
  const rss = fs.readFileSync(path.join(root, "feed.rss"), "utf8");
  const json = JSON.parse(fs.readFileSync(path.join(root, "feed.json"), "utf8"));
  assert(atom.includes("<feed") && atom.includes("https://sudyka.net/posts/sample-post/"), "Atom feed");
  assert(rss.includes("<rss") && rss.includes("<item>"), "RSS feed");
  assert(json.version === "https://jsonfeed.org/version/1.1", "JSON Feed version");
  assert(json.items.length >= 2 && json.items[0].content_html.includes("sample article"), "JSON Feed items");
  assert(json.items.every((item) => item.id && item.url && item.date_published), "JSON Feed item fields");

  assert(fs.readFileSync(path.join(root, "CNAME"), "utf8").trim() === "sudyka.net", "CNAME");
  assert(!fs.existsSync(path.join(root, "posts/draft-example/index.html")), "draft leaked into the build");
  assert(fs.existsSync(path.join(root, "assets/fonts/vt323-regular1-webfont.woff2")), "VT323 woff2");
  assert(fs.existsSync(path.join(root, "assets/fonts/OFL.txt")), "font license");
  assert(fs.existsSync(path.join(root, "assets/tequilaiccarus.png")), "illustration");
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  assert(sitemap.includes("https://sudyka.net/tags/tabletop/"), "sitemap is missing the tabletop tag");
  assert(sitemap.includes("https://sudyka.net/projects/5e-homebrew/subclasses/"), "sitemap is missing a project subpage");
  assert(!sitemap.includes("404"), "sitemap should not include the 404");
  assert(read("404.html").includes('name="robots" content="noindex"'), "404 noindex");

  const mentions = forPage(
    {
      entries: [
        { id: 1, target: "https://sudyka.net/posts/sample-post", type: "reply" },
        { id: 2, target: "https://www.example.com/other/", type: "like" },
      ],
    },
    "https://sudyka.net/posts/sample-post/"
  );
  assert(mentions.length === 1 && mentions[0].id === 1, "webmention target matching");
  const fetched = await fetchWebmentions(site);
  assert(fetched.configured === false && fetched.entries.length === 0, "webmentions stay empty when unconfigured");

  if (failures.length) {
    console.error("IndieWeb check failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log("IndieWeb check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
