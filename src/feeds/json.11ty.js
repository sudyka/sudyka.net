const { feedEntries, jsonFeed } = require("../../lib/feed");

module.exports = class JsonFeed {
  data() {
    return {
      permalink: "/feed.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const limit = data.site.feedLimit || 40;
    return JSON.stringify(jsonFeed(data.site, feedEntries(data.collections.feed, data.site, limit)), null, 2);
  }
};
