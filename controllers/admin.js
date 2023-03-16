const ProductModal = require("../database/product");
const UserModal = require("../database/users");
const { deleteAllSelllerProduct } = require("../services/productMongoServices");
const { createSeller, allSeller, deleteUser } = require("../services/userMongoServices");

const adminGet = async (req, res) => {
  res.render("logadmin.ejs", { error: null });
};
const adminHome = async (req, res) => {
  res.render("admin.ejs");
};
const adminLoginPost = async (req, res) => {
  let { username, password } = req.body;

  if (username != "admin" || password != "admin") {
    res.render("logadmin.ejs", {
      error: "Wrong Credentials Admin Contact head office for Credentials",
    });
  } else {
    req.session.isAdmin = true;
    res.redirect("/admin");
  }
};
const createSellerGet = async (req, res) => {
  res.render("createseller.ejs");
};
const createSellerPost = async (req, res) => {
  let { name, email, username, password, mobile } = req.body;
  createSeller(name, email, username, password, mobile);

  res.redirect("/admin");
};
const adminDeleteSellerGet = async (req, res) => {
  //   res.send("user to delte krna hai");
  let sellers = await allSeller();

  res.render("sellerscontrol.ejs", { sellers: sellers });
};
const adminSeeAllProductGet = async (req, res) => {
  res.send("your all product is loading");
};
const adminDeleteSellerDeleteGet = async (req, res) => {
  let { id } = req.params;
  await deleteUser(id);

  // const deltesellerProduct = ;
  await deleteAllSelllerProduct(id);
  res.redirect("/admin");
};
const adminLogoutGet = (req, res) => {
  req.session.destroy();

  res.redirect("/admin");
};
module.exports = {
  adminGet,
  adminHome,
  adminLoginPost,
  createSellerGet,
  createSellerPost,
  adminDeleteSellerGet,
  adminSeeAllProductGet,
  adminLogoutGet,
  adminDeleteSellerDeleteGet,
};
