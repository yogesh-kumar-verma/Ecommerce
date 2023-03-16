const ProductModal = require("../database/product");
const UserModal = require("../database/users");
const {
  productWithLimitsAndSkips,
} = require("../services/productMongoServices");
const {
  getUserByMailToken,
  updateUserWithToken,
} = require("../services/userMongoServices");

const veriyTokenGet = async (req, res) => {
  const { token } = req.params;

  let user = await getUserByMailToken(token);

  if (user !== null) {
    let newuser = await updateUserWithToken(token);

    req.session.user = newuser;
    req.session.is_logged_in = true;
    req.session.user.isVerified = true;
  }

  res.redirect("/home");
};

// making a get request for home if no sesssion is present redirect to login page
const homeGet = async (req, res) => {
  let name = null;
  let isSeller = false;
  let page = 1;
  let limit = 8;
  let skip = (page - 1) * limit;
  let products = await productWithLimitsAndSkips(skip, limit);

  if (req.session.is_logged_in) {
    name = req.session.name;
    isSeller = req.session.user.isSeller;
  }
  res.render("home.ejs", { name, products, page, isSeller });
};
const mainHomeGet = async (req, res) => {
  let name = req.session.name;
  let isSeller = req.session.user.isSeller;
  let page = 1;
  let limit = 8;
  let skip = (page - 1) * limit;
  let products = await productWithLimitsAndSkips(skip, limit);
  // console.log(products);
  res.render("home.ejs", { name, products, page, isSeller });
};

const fetchAllGet = async (req, res) => {
  let name = req.session.name;

  const page = req.params.page;
  let limit = 8;
  let skip = (page - 1) * limit;
  let products = await productWithLimitsAndSkips(skip, limit);
  let isSeller = false;
  if (req.session.is_logged_in) {
    name = req.session.name;
    isSeller = req.session.user.isSeller;
  }

  res.render("home.ejs", { name, products, page, isSeller });
};

module.exports = { veriyTokenGet, fetchAllGet, mainHomeGet, homeGet };
