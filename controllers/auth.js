const githubCallback = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

module.exports = {
  githubCallback,
};
