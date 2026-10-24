const { canonicalKey, isHttpUrl } = require("./urls");
const { excerpt, plainText } = require("./text");

function mentionType(entry) {
  if (entry["like-of"]) return "like";
  if (entry["repost-of"]) return "repost";
  if (entry["in-reply-to"]) return "reply";
  if (entry["bookmark-of"]) return "bookmark";
  if (entry.rsvp) return "rsvp";
  return "mention";
}

function contentText(entry) {
  if (entry.content && entry.content.text) return plainText(entry.content.text);
  if (entry.content && entry.content.html) return plainText(entry.content.html);
  return "";
}

function normalize(entry) {
  const author = entry.author || {};
  const published = entry.published || entry["wm-received"] || "";
  return {
    id: entry["wm-id"] || entry.url || entry["wm-source"],
    type: mentionType(entry),
    target: entry["wm-target"] || "",
    url: isHttpUrl(entry.url) ? entry.url : isHttpUrl(entry["wm-source"]) ? entry["wm-source"] : "",
    published,
    content: excerpt(contentText(entry), 600),
    authorName: plainText(author.name || "") || "Someone",
    authorUrl: isHttpUrl(author.url) ? author.url : "",
    authorPhoto: isHttpUrl(author.photo) ? author.photo : "",
  };
}

function forPage(webmentions, pageUrl) {
  const entries = (webmentions && webmentions.entries) || [];
  const key = canonicalKey(pageUrl);
  return entries.filter((entry) => canonicalKey(entry.target) === key);
}

async function fetchWebmentions(site) {
  const endpoint = site.webmention && site.webmention.endpoint;
  const token = process.env.WEBMENTION_IO_TOKEN || "";
  if (!isHttpUrl(endpoint) || !token) {
    return { configured: false, entries: [] };
  }

  const url = new URL("https://webmention.io/api/mentions.jf2");
  url.searchParams.set("domain", site.domain);
  url.searchParams.set("per-page", "1000");
  url.searchParams.set("sort-dir", "down");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.warn(`[webmentions] Request failed (${response.status}). Building with none.`);
      return { configured: true, entries: [] };
    }
    const data = await response.json();
    const children = Array.isArray(data.children) ? data.children : [];
    const seen = new Set();
    const entries = [];
    for (const child of children) {
      const normalized = normalize(child);
      if (!normalized.target || seen.has(normalized.id)) continue;
      seen.add(normalized.id);
      entries.push(normalized);
    }
    console.log(`[webmentions] Fetched ${entries.length}.`);
    return { configured: true, entries };
  } catch (error) {
    console.warn(`[webmentions] ${error.message}. Building with none.`);
    return { configured: true, entries: [] };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {
  forPage,
  fetchWebmentions,
};
