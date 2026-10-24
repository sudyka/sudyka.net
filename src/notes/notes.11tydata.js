module.exports = {
  layout: "post.njk",
  kind: "note",
  tags: ["note"],
  eleventyComputed: {
    permalink: (data) => `/notes/${data.page.fileSlug}/`,
  },
};
