// const UserModal = require("../database/users");
let initDB = require("../../database/pool");
const sql = require("mssql");
let { sqlc } = require("../../database/pool");

const getUserByEmail = async (email) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .query(`select * from users where email = @email`);
  let user = result.recordset[0];
  return user;
};

const getUserByEmailAndUpdatePassword = async (email, password) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("email", sql.VarChar, email)
    .input("password", sql.VarChar, password)
    .query(`update users set password=@password where email = @email`);
};
const getUserByMailToken = async (token) => {
  console.log("yaha par hai ");
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("mailToken", sql.VarChar, token)
    .query(`select * from users where mailToken = @mailToken`);
  let user = result.recordset[0];
  console.log(result);
  return user;
};
const getUserByUsername = async (username) => {
  // let user = await UserModal.findOne({ username: username });
  // return user;
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("username", sql.VarChar, username)
    .query(`select * from users where username = @username`);
  let user = result.recordset[0];
  return user;
};
// getUserByUsername("1");

const createUser = async (name, email, username, password, mobile) => {
  const mailToken = Date.now().toString();

  // return userCurrent;
  let pool = await sqlc;
  let result1 = await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("email", sql.VarChar, email)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("mailToken", sql.VarChar, mailToken)
    .input("mobile", sql.Int, mobile)
    .query(
      `insert into users (name ,email,username,password,mailToken,mobile) VALUES (@name,@email,@username,@password,@mailToken,@mobile)`
    );
  return mailToken;
};
// createUser("yogesh", "vyogesh6215@gmail.com", "244", "vyogesh", 123123123);
const createSeller = async (name, email, username, password, mobile) => {
  const mailToken = Date.now().toString();

  // return userCurrent;
  let pool = await sqlc;
  let result1 = await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("email", sql.VarChar, email)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .input("mailToken", sql.VarChar, mailToken)
    .input("mobile", sql.Int, mobile)
    .query(
      `insert into users (name ,email,username,password,mailToken,mobile,role,isVerified) VALUES (@name,@email,@username,@password,@mailToken,@mobile,1,1)`
    );
};
// createSeller("yogesh", "vyogesh6216@gmail.com", "241", "vyogesh", 123123123);
const allSeller = async () => {
  let pool = await sqlc;
  let result = await pool.request().query(`select * from users where role = 1`);
  let seller = result.recordset;
  return seller;
};
const deleteUser = async (id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)
    .query(`DELETE FROM [dbo].[users] where _id = @_id`);
};
const updateUserWithToken = async (token) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("mailToken", sql.VarChar, token)
    .query(
      ` UPDATE [dbo].[users] SET isVerified = 1 WHERE mailToken =@mailToken `
    );
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
  getUserByEmailAndUpdatePassword,
};
