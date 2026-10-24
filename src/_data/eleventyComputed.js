const { excerpt, plainText } = require("../../lib/text");

module.exports = {
  metaDescription(data) {
    if (data.summary) return data.summary;
    const raw = data.page && data.page.rawInput ? data.page.rawInput : "";
    if (data.kind === "note" && raw.trim()) return excerpt(plainText(raw).replace(/`/g, ""), 180);
    return data.site ? data.site.description : "";
  },
  documentTitle(data) {
    const name = data.site ? data.site.name : "";
    if (data.title) return `${data.title} · ${name}`;
    if (data.kind === "note" && data.page && data.page.date) {
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(data.page.date);
      return `Note from ${formatted} · ${name}`;
    }
    return name || "sudyka.net";
  },
};
