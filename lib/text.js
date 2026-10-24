const INTERNAL_TAGS = new Set(["post", "note", "project", "projectPage"]);

function plainText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value, max = 160) {
  const text = plainText(value);
  if (text.length <= max) return text;
  const sliced = text.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trim()}…`;
}

function noteTitle(value) {
  return excerpt(value, 80);
}

function publicTags(tags) {
  const list = Array.isArray(tags) ? tags : tags ? [tags] : [];
  return list.filter((tag) => tag && !INTERNAL_TAGS.has(tag));
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = {
  INTERNAL_TAGS,
  plainText,
  excerpt,
  noteTitle,
  publicTags,
  escapeXml,
};
