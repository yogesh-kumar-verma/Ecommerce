const fs = require("fs");
const cartdir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/cart.txt";

const productdir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/product.txt";
const uploadsdir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/";

const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const ProductModal = require("../database/product");
const CartModal = require("../database/cart");
const {
  cartGetByUsername,
  cartUpdateByUsername,
  createCart,
  cartGetByKeyUserWith_Id,
  cartUpdateBy_Id,
} = require("../services/cartMongoServices");
const {
  getProductBy_Id,
  addNewProduct,
  deleteProductBy_Id,
  updateProductDetailsBy_Id,
} = require("../services/productMongoServices");
const productGet = async (req, res) => {
  const { id } = req.params;
  let product = await getProductBy_Id(id);

  res.render("item.ejs", {
    product: product,
    name: req.session.name,
    isSeller: req.session.user.isSeller,
  });
  return;
};
const addcartmoreGet = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  let { username } = req.session.user;
  let cart = await cartGetByUsername(username);
  let quantity;
  if (cart !== null) {
    let not_in_cart = true;

    cart.cartitems.forEach((value) => {
      if (value.item == id) {
        value.quantity = value.quantity + 1;
        quantity = value.quantity;
        not_in_cart = false;
      }
    });
    if (not_in_cart) {
      let cartItem = new Object({
        item: id,
        quantity: 1,
      });
      cart.cartitems.push(cartItem);
      await cartUpdateByUsername(username, cart.cartitems);
      quantity = 1;
    }

    await cartUpdateByUsername(username, cart.cartitems);
  } else {
    await createCart(username, id);

    quantity = 1;
  }
  res.send(JSON.stringify(quantity));
};
const addcartGet = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // res.send("added to cart");
  // return;

  let { username } = req.session.user;

  let cart = await cartGetByUsername(username);
  let product = await getProductBy_Id(id);
  let quantity;
  if (cart !== null) {
    let not_in_cart = true;
    cart.cartitems.forEach((value) => {
      if (value.item == id) {
        value.quantity = value.quantity + 1;
        quantity = value.quantity;
        not_in_cart = false;
      }
    });
    if (not_in_cart) {
      let cartItem = new Object({
        item: id,
        quantity: 1,
      });
      cart.cartitems.push(cartItem);
      await cartUpdateByUsername(req.session.user.username, cart.cartitems);

      quantity = 1;
    }

    let updated = await cartUpdateByUsername(
      req.session.user.username,
      cart.cartitems
    );
    console.log(updated);
    res.redirect("/cart");
  } else {
    await createCart(username, id);

    quantity = 1;
    res.redirect("/cart");
  }
  // res.send(JSON.stringify(quantity));
};

const minusGet = async (req, res) => {
  const { id } = req.params;

  let { username } = req.session.user;
  let quantity;
  let cart = await cartGetByKeyUserWith_Id(req.session.user._id);

  if (cart !== null) {
    cart.cartitems.forEach((value) => {
      if (value.item == id) {
        value.quantity = value.quantity - 1;
        quantity = value.quantity;
      }
    });

    let cartup = await cartUpdateBy_Id(req.session.user._id, cart.cartitems);
  }
  res.send(JSON.stringify(quantity));
};
const deletecartGet = async (req, res) => {
  const { id } = req.params;
  let { username } = req.session.user;
  let cart = await cartGetByKeyUserWith_Id(req.session.user._id);

  let newcart = cart.cartitems.filter((element) => {
    return element.item !== id;
  });
  let cartup = await cartUpdateBy_Id(req.session.user._id, cart.cartitems);
  res.redirect("/cart");
};
const productUpdatePost = async (req, res) => {
  // console.log("ss", req.body);
  let { id } = req.params;

  let product = await updateProductDetailsBy_Id(
    id,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity
  );
  res.send(JSON.stringify("success"));
};
const productDeletePost = async (req, res) => {
  // console.log("ss", req.body);
  let { id } = req.params;

  let product = await deleteProductBy_Id(id);
  res.redirect("/seller");
};
const addProductPost = async (req, res) => {
  // console.log(req.body);

  // console.log(uuidv1());
  if (!req.file) {
    res.end("please enter the valid files");
    res.redirect(req.baseUrl);
  }
  let product = await addNewProduct(
    req.session.user._id,
    req.body.name,
    req.body.desc,
    req.body.quantity,
    req.body.price,
    req.file.path
  );

  res.redirect("/seller");
  // res.send("added sucessfully");
};
module.exports = {
  productGet,
  addcartmoreGet,
  minusGet,
  addcartGet,
  deletecartGet,
  productUpdatePost,
  addProductPost,
  productDeletePost,
};
