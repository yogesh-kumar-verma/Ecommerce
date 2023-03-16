const ProductModal = require("../database/product");
const UserModal = require("../database/users");
const PlaceorderModal = require("../database/placeorder");
const addProductGet = async (req, res) => {
  // let user = await UserModal.findOne({ username: req.session.user.username });
  let page = 0;
  if (req.params.page) {
    page = req.params.page;
  }
  let products = await ProductModal.find({
    seller: req.session.user._id,
  })
    .skip(page * 8)
    .limit(8);

  res.render("seller.ejs", {
    products: products,
    name: req.session.user.name,
    isSeller: req.session.user.isSeller,
    page: page,
  });
};
const deliverProductGet = async (req, res) => {
  // let products = await ProductModal.find({
  //   seller: req.session.user._id,
  // });
  let placeorders = await PlaceorderModal.find({
    seller: req.session.user._id,
  });

  res.render("mydeliveries.ejs", {
    deliveries: placeorders,
    name: req.session.user.name,
    isSeller: req.session.user.isSeller,
  });
};
module.exports = { addProductGet, deliverProductGet };
