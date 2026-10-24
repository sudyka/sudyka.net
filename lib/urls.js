function isHttpUrl(value) {
  try {
    const url = new URL(String(value));
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function absoluteUrl(urlPath, origin) {
  if (!urlPath) return `${String(origin).replace(/\/$/, "")}/`;
  if (isHttpUrl(urlPath)) return String(urlPath);
  const base = String(origin).replace(/\/$/, "");
  const path = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return `${base}${path}`;
}

function absolutizeHtml(html, origin) {
  return String(html || "").replace(
    /(\s(?:href|src)=["'])\/(?!\/)/g,
    (_, prefix) => `${prefix}${String(origin).replace(/\/$/, "")}/`
  );
}

function canonicalKey(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    url.protocol = "https:";
    url.hostname = url.hostname.replace(/^www\./, "");
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
    return `${url.hostname}${url.pathname}`;
  } catch {
    return String(value || "");
  }
}

module.exports = {
  isHttpUrl,
  absoluteUrl,
  absolutizeHtml,
  canonicalKey,
};
