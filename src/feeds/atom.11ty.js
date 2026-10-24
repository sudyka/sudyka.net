const { atom, feedEntries } = require("../../lib/feed");

module.exports = class AtomFeed {
  data() {
    return {
      permalink: "/feed.xml",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const limit = data.site.feedLimit || 40;
    return atom(data.site, feedEntries(data.collections.feed, data.site, limit));
  }
};
