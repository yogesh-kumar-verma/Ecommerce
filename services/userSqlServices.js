// const UserModal = require("../database/users");
let initDB = require("../database/pool");
const sql = require("mssql");
let { sqlc } = require("../database/pool");
const usertable = "users";
async function createTableIfNotExit() {
  let pool = await sqlc;
  const result = await pool.request()
    .query(`create table if not exits ${usertable}(
      user_id identity(1,1) integer primary key, 
      name varchar(50),
    email varchar(50) ,
    username varchar(50) ,
    password varchar(50) ,
    mailToken varchar(50) ,
    isVerified Number(1) default=0,
    isSeller  Number(1) default=0,
    CONSTRAINT ck_testbool_ischk CHECK (isVerified IN (1,0)),
    CONSTRAINT ck_testbool_ischk1 CHECK (isSeller IN (1,0))
    
    `);
}

createTableIfNotExit();
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
