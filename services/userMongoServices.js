const UserModal = require("../database/users");

const getUserByEmail = async (email) => {
  let user = await UserModal.findOne({ email: email });
  return user;
};
const getUserByMailToken = async (token) => {
  let user = await UserModal.find({ mailToken: token });
  return user;
};
const getUserByUsername = async (username) => {
  let user = await UserModal.findOne({ username: username });
  return user;
};
const createUser = async (name, email, username, password, mobile) => {
  let userCurrent = new UserModal();
  userCurrent.name = name;
  userCurrent.email = email;
  userCurrent.username = username;
  userCurrent.password = password;
  userCurrent.mobile = mobile;
  userCurrent.isSeller = false;
  userCurrent.isVerified = false;
  userCurrent.mailToken = Date.now();

  await userCurrent.save();
  return userCurrent;
};
const createSeller = async (name, email, username, password, mobile) => {
  let userCurrent = new UserModal();
  userCurrent.name = name;
  userCurrent.email = email;
  userCurrent.username = username;
  userCurrent.password = password;
  userCurrent.mobile = mobile;
  userCurrent.isSeller = true;
  userCurrent.isVerified = true;
  userCurrent.mailToken = Date.now();

  await userCurrent.save();
};
const allSeller = async () => {
  let seller = await UserModal.find({ isSeller: true });
  return seller;
};
const deleteUser = async (id) => {
  const delteuser = await UserModal.deleteOne({ _id: id });
};
const updateUserWithToken = async (token) => {
  let newuser = await UserModal.updateOne(
    { mailToken: token },
    { $set: { isVerified: true } }
  );
  return newuser;
};
module.exports = {
  createSeller,
  allSeller,
  deleteUser,
  getUserByEmail,
  getUserByMailToken,
  updateUserWithToken,
  getUserByUsername,
  createUser,
};
