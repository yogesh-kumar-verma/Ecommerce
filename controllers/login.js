const dotenv = require("dotenv");
dotenv.config();
 

if (process.env.ISSQL) {
  console.log("sql ke login mode on");
  var {
    getUserByUsername,
  } = require("../services/sqlservices/userSqlServices");
} else {
  console.log("mongoose ke login mode on");
  var { getUserByUsername } = require("../services/userMongoServices");
}
const loginUserGet = (req, res) => {
  let name = null;
  let error = null;

  res.render("login.ejs", { name, error, isSeller: false });
  return;
};
const loginUserPost = async (req, res) => {
  let user = await getUserByUsername(req.body.username);

  if (user == null || user.password !== req.body.password) {
    let name = null;
    let error = "Wrong Password Or Username";
    res.render("login.ejs", { name, error, isSeller: false });
    return;
  } else {
    if (
      user.username == req.body.username &&
      user.password == req.body.password
    ) {
      req.session.user = user;
      req.session.isVerified = user.isVerified;

      req.session.is_logged_in = true;
      req.session.name = user.name;
      

      res.redirect("/");
      return;
    }
  }
};

module.exports = { loginUserGet, loginUserPost };
