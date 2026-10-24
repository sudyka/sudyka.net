const { absolutizeHtml, absoluteUrl } = require("./urls");
const { escapeXml, noteTitle, plainText, publicTags } = require("./text");

function feedEntries(collection, site, limit = 40) {
  return (collection || []).slice(0, limit).map((item) => {
    const url = absoluteUrl(item.url, site.url);
    const html = absolutizeHtml(item.templateContent || "", site.url);
    const text = plainText(html);
    const isNote = item.data.kind === "note";
    const title = isNote ? noteTitle(text) || "Note" : item.data.title || "Untitled";
    const published = item.date instanceof Date ? item.date : new Date(item.date);
    const updated = item.data.updated ? new Date(item.data.updated) : published;
    return {
      url,
      html,
      text,
      title,
      summary: item.data.summary || text,
      published,
      updated,
      tags: publicTags(item.data.tags),
      kind: item.data.kind || "article",
    };
  });
}

function atom(site, entries) {
  const self = absoluteUrl("/feed.xml", site.url);
  const home = absoluteUrl("/", site.url);
  const updated = entries.length ? entries[0].updated : new Date();
  const items = entries
    .map((entry) => {
      const categories = entry.tags
        .map((tag) => `    <category term="${escapeXml(tag)}"/>`)
        .join("\n");
      return `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link rel="alternate" type="text/html" href="${escapeXml(entry.url)}"/>
    <id>${escapeXml(entry.url)}</id>
    <published>${entry.published.toISOString()}</published>
    <updated>${entry.updated.toISOString()}</updated>
    <author>
      <name>${escapeXml(site.name)}</name>
      <uri>${escapeXml(home)}</uri>
    </author>
    <summary type="html">${escapeXml(entry.summary)}</summary>
    <content type="html">${escapeXml(entry.html)}</content>
${categories}
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(site.feedTitle || site.domain)}</title>
  <subtitle>${escapeXml(site.description)}</subtitle>
  <link rel="alternate" type="text/html" href="${escapeXml(home)}"/>
  <link rel="self" type="application/atom+xml" href="${escapeXml(self)}"/>
  <id>${escapeXml(home)}</id>
  <updated>${updated.toISOString()}</updated>
  <author>
    <name>${escapeXml(site.name)}</name>
    <uri>${escapeXml(home)}</uri>
  </author>
  <generator>Eleventy</generator>
${items}
</feed>
`;
}

function rss(site, entries) {
  const self = absoluteUrl("/feed.rss", site.url);
  const home = absoluteUrl("/", site.url);
  const items = entries
    .map((entry) => {
      const categories = entry.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.url)}</link>
      <guid isPermaLink="true">${escapeXml(entry.url)}</guid>
      <pubDate>${entry.published.toUTCString()}</pubDate>
      <description>${escapeXml(entry.html || entry.summary)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.feedTitle || site.domain)}</title>
    <link>${escapeXml(home)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${escapeXml(site.locale || "en")}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function jsonFeed(site, entries) {
  const home = absoluteUrl("/", site.url);
  const photo = absoluteUrl(site.photo, site.url);
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: site.feedTitle || site.domain,
    home_page_url: home,
    feed_url: absoluteUrl("/feed.json", site.url),
    description: site.description,
    language: site.locale || "en",
    authors: [
      {
        name: site.name,
        url: home,
        avatar: photo,
      },
    ],
    items: entries.map((entry) => ({
      id: entry.url,
      url: entry.url,
      title: entry.title,
      summary: entry.summary,
      content_html: entry.html,
      content_text: entry.text,
      date_published: entry.published.toISOString(),
      date_modified: entry.updated.toISOString(),
      authors: [{ name: site.name, url: home }],
      tags: entry.tags,
    })),
  };
}

module.exports = {
  feedEntries,
  atom,
  rss,
  jsonFeed,
};
