const fs = require("fs");
const dir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/user.txt";
  const UserModal = require("../database/users");
  const forgotPass = require("../methods/forgotEmail");
const { getUserByEmail } = require("../services/userMongoServices");
const forgetUserGet = (req, res) => {
  res.render("forgot.ejs");
};

const forgetUserPost = async (req, res) => {
  let email = req.body.email;
  let user = await getUserByEmail(email);

  if (user !== null) {
    let mailToken = user.mailToken;
    forgotPass(email, "User", mailToken, (err, data) => {
      res.send("Check your Email");
    });
  } else {
    res.send("please enter a valid email id");
  }
};
module.exports = { forgetUserGet, forgetUserPost };
