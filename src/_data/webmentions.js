const site = require("./site");
const { fetchWebmentions } = require("../../lib/webmentions");

module.exports = async function webmentions() {
  return fetchWebmentions(site);
};
