const dbConfig = {
  URI: process.env.MONGODB_URL_DEVELOPEMENT || process.env.MONGODB_URL_PRODUCTION,
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = {
  dbConfig,
};
