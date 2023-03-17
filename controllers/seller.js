const ProductModal = require("../database/product");
const UserModal = require("../database/users");
const PlaceorderModal = require("../database/placeorder");
const {
  getMyDeleviriesWithKeySellerBy_Id,
} = require("../services/placeorderMongoServices");
const {
  sellerProductWithLimitsAndSkips,
} = require("../services/productMongoServices");
const addProductGet = async (req, res) => {
  // let user = await UserModal.findOne({ username: req.session.user.username });
  let page = 0;
  let limit = 8;
  if (req.params.page) {
    page = req.params.page;
  }
  let skip = page * 8;
  let products = await sellerProductWithLimitsAndSkips(
    req.session.user._id,
    skip,
    limit
  );

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
  let placeorders = await getMyDeleviriesWithKeySellerBy_Id(
    req.session.user._id
  );
  // console.log(" my orders", placeorders);
  res.render("mydeliveries.ejs", {
    deliveries: placeorders,
    name: req.session.user.name,
    isSeller: req.session.user.isSeller,
  });
};
module.exports = { addProductGet, deliverProductGet };
