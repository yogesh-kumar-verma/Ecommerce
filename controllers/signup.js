const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const dir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/user.txt";
const UserModal = require("../database/users");
const sendEmail = require("../methods/sendEmail");
if (process.env.ISSQL) {
  var {
    getUserByUsername,
    getUserByEmail,
    createUser,
  } = require("../services/sqlservices/userSqlServices");
} else {
  console.log("mongod in use");
  var {
    getUserByUsername,
    getUserByEmail,
    createUser,
  } = require("../services/userMongoServices");
}
const signupUserGet = (req, res) => {
  let name = null;
  let error = null;
  res.render("signup.ejs", { name, error, isSeller: false });
  return;
};
const signupUserPost = async (req, res) => {
  let user = await getUserByUsername(req.body.username);
  let email1 = await getUserByEmail(req.body.email);
  let flag = false;
  let { name, username, email, password, mobile } = req.body;
  console.log(req.body);
  if (!name || !username || !email || !password || !mobile) {
    let name = null;
    console.log(!name);
    console.log(!username);
    console.log(!email);
    console.log(!password);
    console.log(!mobile);
    let error = "please fill all the details correctly";

    res.render("signup.ejs", { name, error, isSeller: false });
    return;
  }
  console.log(user);
  if (user !== undefined) {
    let name = null;
    let error = "User name is already taken";

    res.render("signup.ejs", { name, error, isSeller: false });
    return;
  } else if (email1 != undefined) {
    let name = null;
    let error = "Email is already taken";

    res.render("signup.ejs", { name, error, isSeller: false });
    return;
  } else {
    let userCurrent = await createUser(
      req.body.name,
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.mobile
    );

    sendEmail(
      req.body.email,
      req.body.name,
      userCurrent,
      (err, data) => {
        if (err) {
          let name = null;
          let error = "Wrong gmail";
          console.log(error);
          res.render("signup.ejs", { name, error, isSeller: false });
          return;
        } else {
          res.redirect("/login");
        }
      }
    );
  }
};

module.exports = { signupUserGet, signupUserPost };
