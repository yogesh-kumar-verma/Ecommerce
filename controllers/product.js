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
  deleteCartByItem,
  updateCart,
  cartGetByUsernameWithCartitems,
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
  let cart = await cartGetByUsernameWithCartitems(username);
  let quantity;
  if (cart !== null) {
    let not_in_cart = true;

    cart.forEach(async (value) => {
      if (value.item._id == id) {
        value.quantity = value.quantity + 1;
        quantity = value.quantity;
        not_in_cart = false;
        await updateCart(value._id, quantity);
      }
    });
    if (not_in_cart) {
      await createCart(req.session.user.username, id, 1);
      quantity = 1;
    }
  } else {
    await createCart(username, id, 1);

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

  let cart = await cartGetByUsernameWithCartitems(username);
  let product = await getProductBy_Id(id);
  let quantity;
  console.log(cart);
  if (cart !== null) {
    let not_in_cart = true;
    cart.forEach(async (value) => {
      if (value.item._id == id) {
        value.quantity = value.quantity + 1;
        quantity = value.quantity;
        not_in_cart = false;
        await updateCart(value._id, quantity);
      }
    });
    if (not_in_cart) {
      // cart.cartitems.push(cartItem);
      await createCart(req.session.user.username, id, 1);

      quantity = 1;
    }

    res.redirect("/cart");
  } else {
    await createCart(username, id, 1);

    quantity = 1;
    res.redirect("/cart");
  }
  // res.send(JSON.stringify(quantity));
};

const minusGet = async (req, res) => {
  const { id } = req.params;

  let { username } = req.session.user;
  let quantity;
  let cart = await cartGetByUsernameWithCartitems(username);

  if (cart !== null) {
    cart.forEach(async (value) => {
      if (value.item._id == id) {
        value.quantity = value.quantity - 1;
        quantity = value.quantity;
        await updateCart(value._id, quantity);
      }
    });
  }
  res.send(JSON.stringify(quantity));
};
const deletecartGet = async (req, res) => {
  const { id } = req.params;
  let { username } = req.session.user;
  let deltecart = await deleteCartByItem(id, username);

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
