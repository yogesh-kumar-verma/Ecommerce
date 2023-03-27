const dotenv = require("dotenv");
dotenv.config();
const forgotPass = require("../methods/forgotEmail");

if (process.env.ISSQL) {
  var { getUserByEmail } = require("../services/sqlservices/userSqlServices");
} else {
  var { getUserByEmail } = require("../services/userMongoServices");
}

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
