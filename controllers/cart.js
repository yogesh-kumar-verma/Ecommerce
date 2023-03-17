const fs = require("fs");
const cartdir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/cart.txt";

const productdir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/product.txt";

const ProductModal = require("../database/product");
const CartModal = require("../database/cart");
const {
  cartGetByUsernameWithCartitems,
} = require("../services/cartMongoServices");

const cartGet = async (req, res) => {
  let { username } = req.session.user;

  let cart = await cartGetByUsernameWithCartitems(username);
 
  // console.log(cart.cartitems[0].item);
  if (cart != null) {
    res.render("mycart.ejs", {
      // products: products,
      cart: cart,
      name: req.session.name,
      isSeller: req.session.user.isSeller,
    });
  } else {
    res.render("mycart.ejs", {
      // products: products,
      cart: [],
      name: req.session.name,
      isSeller: req.session.user.isSeller,
    });
  }
};

module.exports = { cartGet };
