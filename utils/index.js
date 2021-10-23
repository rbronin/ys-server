const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (data, password) => {
  return await bcrypt.compare(data, password);
};

module.exports = {
  hashPassword,
  comparePassword,
};
