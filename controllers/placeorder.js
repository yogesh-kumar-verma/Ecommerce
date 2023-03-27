const CartModal = require("../database/cart");
const ProductModal = require("../database/product");
const PlaceorderModal = require("../database/placeorder");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
if (process.env.ISSQL) {
  var {
    cartGetByIdWithCartitems,
    deleteCartBy_Id,
  } = require("../services/sqlservices/cartSqlServices");
  var {
    getProductBy_Id,
    updateProductWith_Id,
  } = require("../services/sqlservices/productSqlServices");
  var {
    newOrderPlace,

    deletePlaceOrderBy_Id,

    getMyordersWithItemsBy_Id,
  } = require("../services/sqlservices/placeorderSqlServices");
} else {
  var {
    cartGetByIdWithCartitems,
    deleteCartBy_Id,
  } = require("../services/cartMongoServices");
  var {
    getProductBy_Id,
    updateProductWith_Id,
  } = require("../services/productMongoServices");
  var {
    newOrderPlace,

    deletePlaceOrderBy_Id,

    getMyordersWithItemsBy_Id,
  } = require("../services/placeorderMongoServices");
}
const placeOrderGet = async (req, res) => {
  let cart = await cartGetByIdWithCartitems(req.session.user._id);

  res.render("placeorder.ejs", {
    name: req.session.user.name,
    isSeller: req.session.user.role,
    cart: cart,
  });
};
const placedOrderPost = async (req, res) => {
  let cart = await cartGetByIdWithCartitems(req.session.user._id);

  // let product = await ProductModal.find({});
  // console.log(cart);
  let { total } = req.params;
  // console.log("req boyd", req.body);
  // placeorder.username = cart.username;
  console.log(cart, "CART hai place wla");
  cart.forEach(async (value) => {
    let prod = await getProductBy_Id(value.product_id);
    let quantity = value.stock - value.quantity;
    let product = await updateProductWith_Id(value.product_id, quantity);
    await deleteCartBy_Id(value._id);
  });
  console.log("yha tk pahuch rha hai");
  let placeorder = await newOrderPlace(
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.pincode,
    req.session.user._id,
    cart,
    total
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
    isSeller: req.session.user.role,
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
