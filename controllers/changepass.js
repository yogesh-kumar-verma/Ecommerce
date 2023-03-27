const dotenv = require("dotenv");
dotenv.config();
if (process.env.ISSQL) {
  var {
    getUserByEmailAndUpdatePassword,
  } = require("../services/sqlservices/userSqlServices");
} else {
  var { getUserByEmail } = require("../services/userMongoServices");
}
const changePassGet = (req, res) => {
  let name = req.session.name;
  res.render("changepass.ejs", { name, err: null, isSeller: false });
};
const changePassPost = async (req, res) => {
  let name = req.session.name;
  let pass = req.body.password1;
  let pass1 = req.body.password1;
  let pass2 = req.body.password2;

  if (pass1 != pass2) {
    let err = "Both are not same";
    res.render("changepass.ejs", { name, err, isSeller: false });
    return;
  }

  let user = await getUserByEmailAndUpdatePassword(
    req.session.user.email,
    pass
  );

  res.redirect("/login");
  // res.send("password changed sucessfully");
  return;
};

module.exports = { changePassGet, changePassPost };
