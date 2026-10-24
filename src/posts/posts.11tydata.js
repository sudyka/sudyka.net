module.exports = {
  layout: "post.njk",
  kind: "article",
  tags: ["post"],
  eleventyComputed: {
    permalink: (data) => `/posts/${data.page.fileSlug}/`,
  },
};
