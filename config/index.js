const dbConfig = {
  URI: process.env.MONGODB_URL_DEVELOPEMENT || process.env.MONGODB_URL_PRODUCTION,
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const GITHUB_CONFIG = {
  ID: process.env.GITHUB_CLIENT_ID,
  SECRET: process.env.GITHUB_CLIENT_SECRET,
};

const APP = {
  SECRET: process.env.SECRET,
};

module.exports = {
  dbConfig,
  GITHUB_CONFIG,
  APP,
};
