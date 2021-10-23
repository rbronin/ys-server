const { GITHUB_CONFIG } = require("./index");

//git config
const GITHUB_AUTH_CONFIG = {
  clientID: GITHUB_CONFIG.ID,
  clientSecret: GITHUB_CONFIG.SECRET,
  callbackURL: "/api/auth/github/callback",
  // tokenURL: "https://github.com/login/oauth/access_token",
  // authorizationURL: "https://github.com/login/oauth/authorize",
};

module.exports = {
  GITHUB_AUTH_CONFIG,
};
