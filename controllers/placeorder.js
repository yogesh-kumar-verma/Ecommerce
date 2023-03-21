const CartModal = require("../database/cart");
const ProductModal = require("../database/product");
const PlaceorderModal = require("../database/placeorder");
const { v4: uuidv4 } = require("uuid");
const {
  deleteCartByUsername,
  cartGetByUsername,
  cartGetByUsernameWithCartitems,
  deleteCartByItem,
} = require("../services/cartMongoServices");
const {
  getProductBy_Id,
  updateProductWith_Id,
} = require("../services/productMongoServices");
const {
  newOrderPlace,
  updatePlaceOrderBy_Id,
  deletePlaceOrderBy_Id,
  findPlaceOrderBy_Id,
  getMyordersWithItemsBy_Id,
} = require("../services/placeorderMongoServices");

const placeOrderGet = async (req, res) => {
  let cart = await cartGetByUsernameWithCartitems(req.session.user.username);

  res.render("placeorder.ejs", {
    name: req.session.user.name,
    isSeller: req.session.user.isSeller,
    cart: cart,
  });
};
const placedOrderPost = async (req, res) => {
  let cart = await cartGetByUsernameWithCartitems(req.session.user.username);

  // let product = await ProductModal.find({});
  // console.log(cart);
  let { total } = req.params;
  // console.log("req boyd", req.body);
  // placeorder.username = cart.username;
  cart.forEach(async (value) => {
    let prod = await getProductBy_Id(value.item._id);
    let quantity = prod.quantity - value.quantity;
    let product = await updateProductWith_Id(value.item._id, quantity);
    await deleteCartByItem(value.item._id, req.session.user.username);
  });
  // console.log(cart._id);
  
  let placeorder = await newOrderPlace(
    req.body.address,
    req.session.user._id,
    cart,

    req.session.user.username,
    req.session.user.name
  );

  res.json("Your Order Placed SucessFully");
  // res.redirect("/placeorder/myorders");
};

const placedOrderGet = async (req, res) => {
  let placeorder = await getMyordersWithItemsBy_Id(req.session.user._id);

  // res.send("your orders");
  // return;
  // console.log(placeorder);
  // console.log(req.session);

  console.log("placed order", placeorder);
  res.render("myorders.ejs", {
    name: req.session.user.name,
    placeorder: placeorder,
    isSeller: req.session.user.isSeller,
  });
};
const placedOrderDelete = async (req, res) => {
  let { _id } = req.params;

  let deleteorder = await deletePlaceOrderBy_Id(_id);
  res.redirect("/placeorder/myorders");
  return;
};
module.exports = {
  placeOrderGet,
  placedOrderPost,
  placedOrderGet,
  placedOrderDelete,
};
