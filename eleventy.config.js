const fs = require("fs");
const path = require("path");
const { escapeXml, excerpt, plainText, publicTags } = require("./lib/text");
const { absoluteUrl, isHttpUrl } = require("./lib/urls");
const { forPage } = require("./lib/webmentions");
const site = require("./src/_data/site");

const cssPath = path.join(__dirname, "src/assets/css/site.css");
const cssHash = fs.existsSync(cssPath)
  ? Math.round(fs.statSync(cssPath).mtimeMs).toString(36)
  : "1";

function slugifyHeading(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatUtcDate(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.valueOf())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(value);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });

  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ typographer: true, linkify: true });
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
      const counts = env.headingCounts || (env.headingCounts = Object.create(null));
      const text = tokens[idx + 1] && tokens[idx + 1].type === "inline" ? tokens[idx + 1].content : "";
      let slug = slugifyHeading(text) || "section";
      const count = counts[slug] || 0;
      counts[slug] = count + 1;
      if (count > 0) slug = `${slug}-${count + 1}`;
      tokens[idx].attrSet("id", slug);
      return self.renderToken(tokens, idx, options);
    };
  });

  eleventyConfig.addFilter("absolute", (urlPath, origin) => absoluteUrl(urlPath, origin));
  eleventyConfig.addFilter("httpUrl", (value) => isHttpUrl(value));
  eleventyConfig.addFilter("isoDate", (date) => {
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.valueOf())) return "";
    return value.toISOString();
  });
  eleventyConfig.addFilter("readableDate", (date) => formatUtcDate(date));
  eleventyConfig.addFilter("promptPath", (url) => {
    if (!url || url === "/") return "\\home";
    const parts = String(url).split("/").filter(Boolean);
    return `\\${parts.join("\\")}`;
  });
  eleventyConfig.addFilter("isCurrent", (pageUrl, href) => {
    if (href === "/") return pageUrl === "/";
    return pageUrl === href || String(pageUrl).startsWith(href);
  });
  eleventyConfig.addFilter("plainText", plainText);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("publicTags", publicTags);
  eleventyConfig.addFilter("limit", (array, count) => (array || []).slice(0, count));
  eleventyConfig.addFilter("newestFirst", (array) => Array.from(array || []).reverse());
  eleventyConfig.addFilter("projectSlug", (inputPath) => {
    const normalized = String(inputPath || "").replace(/\\/g, "/");
    const match = normalized.match(/\/projects\/([^/]+)\//);
    return match ? match[1] : "";
  });
  eleventyConfig.addFilter("projectFamily", (collection, slug) => {
    if (!slug) return [];
    const root = `/projects/${slug}/`;
    return (collection || [])
      .filter((item) => String(item.inputPath || "").replace(/\\/g, "/").includes(`/projects/${slug}/`))
      .sort((a, b) => {
        const aIndex = a.url === root ? 0 : 1;
        const bIndex = b.url === root ? 0 : 1;
        if (aIndex !== bIndex) return aIndex - bIndex;
        return String(a.data.title || "").localeCompare(String(b.data.title || ""));
      });
  });
  eleventyConfig.addFilter("mentionsFor", (webmentions, pageUrl) => forPage(webmentions, pageUrl));

  eleventyConfig.addCollection("posts", (api) => {
    return api.getFilteredByTag("post").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("notes", (api) => {
    return api.getFilteredByTag("note").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("feed", (api) => {
    const posts = api.getFilteredByTag("post");
    const notes = api.getFilteredByTag("note");
    const seen = new Set();
    return [...posts, ...notes]
      .filter((item) => {
        if (seen.has(item.inputPath)) return false;
        seen.add(item.inputPath);
        return true;
      })
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("projects", (api) => {
    const rank = { archived: 2, sample: 1 };
    return api.getFilteredByTag("project").sort((a, b) => {
      const byStatus = (rank[a.data.status] || 0) - (rank[b.data.status] || 0);
      if (byStatus !== 0) return byStatus;
      const byOrder = (a.data.order || 0) - (b.data.order || 0);
      if (byOrder !== 0) return byOrder;
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("categories", (api) => {
    const tags = new Set();
    for (const item of api.getAll()) {
      for (const tag of publicTags(item.data.tags)) tags.add(tag);
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addGlobalData("cssHash", cssHash);
  eleventyConfig.addGlobalData("buildYear", new Date().getUTCFullYear());

  eleventyConfig.on("eleventy.after", ({ dir, results }) => {
    const urls = [...new Set((results || []).map((result) => result.url))]
      .filter((url) => url && url.endsWith("/"))
      .sort((a, b) => a.localeCompare(b));
    const body = urls
      .map((url) => `  <url><loc>${escapeXml(absoluteUrl(url, site.url))}</loc></url>`)
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
    fs.writeFileSync(path.join(dir.output, "sitemap.xml"), xml);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/",
  };
};
