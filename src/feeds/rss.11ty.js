const { feedEntries, rss } = require("../../lib/feed");

module.exports = class RssFeed {
  data() {
    return {
      permalink: "/feed.rss",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const limit = data.site.feedLimit || 40;
    return rss(data.site, feedEntries(data.collections.feed, data.site, limit));
  }
};
