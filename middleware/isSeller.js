function isSeller(req, res, next) {
  if (req.session.user.role) {
    next();
    return;
  }

  res.redirect("/");
}
module.exports = isSeller;
