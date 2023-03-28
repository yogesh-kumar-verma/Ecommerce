const dotenv = require("dotenv");
dotenv.config();
const UserModal = require("../database/users");
if (process.env.ISSQL) {
  var {
    getUserByMailToken,
  } = require("../services/sqlservices/userSqlServices");
} else {
  var { getUserByMailToken } = require("../services/userMongoServices");
}
const resetGet = async (req, res) => {
  const { token } = req.params;

  let user = await getUserByMailToken(token);
  if (user.mailToken == token) {
    flag = true;
    console.log("yha par hai email rest");
    req.session.name = user.name;
    req.session.user = user;
    req.session.is_logged_in = true;
    req.session.isVerified = true;
    res.redirect("/changepass");

    return;
  }
};

module.exports = resetGet;
