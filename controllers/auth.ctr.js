const UserDB = require("../db/user");
// eslint-disable-next-line no-unused-vars
const { hashPassword, comparePassword } = require("../utils");

const addNewUser = async (req, res) => {
  let newUser = req.body;
  let encryptedPassword = await hashPassword(newUser.password);
  newUser.password = encryptedPassword;
  const result = await UserDB.createUser(newUser).catch((err) => {
    res.status(400).json({
      error: err.message,
    });
  });
  if (result)
    return res.status(200).json({
      message: "Signup Successfully",
      data: result,
    });
  else
    return res.status(400).json({
      error: "Some error occured",
    });
};

module.exports = {
  addNewUser,
};
