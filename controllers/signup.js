const fs = require("fs");
const dir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/user.txt";
const UserModal = require("../database/users");
const sendEmail = require("../methods/sendEmail");
const {
  getUserByUsername,
  getUserByEmail,
  createUser,
} = require("../services/userMongoServices");
const signupUserGet = (req, res) => {
  let name = null;
  let error = null;
  res.render("signup.ejs", { name, error, isSeller: false });
  return;
};
const signupUserPost = async (req, res) => {
  let user = await getUserByUsername(req.body.username);
  let email = await getUserByEmail(req.body.email);
  let flag = false;
  let { name, username, email1, password, mobile } = req.params;
  if (!name || !username || !email1 || !password || !mobile) {
    let name = null;
    let error = "please fill all the details correctly";

    res.render("signup.ejs", { name, error, isSeller: false });
    return;
  }
  if (user !== null) {
    let name = null;
    let error = "User name is already taken";

    res.render("signup.ejs", { name, error, isSeller: false });
    return;
  } else if (email != null) {
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
      userCurrent.mailToken,
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
