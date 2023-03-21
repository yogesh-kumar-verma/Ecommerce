const CartModal = require("../database/cart");

const createCart = async (username, id, quantity) => {
  let usercart = new CartModal();
  usercart.username = username;

  usercart.item = id;
  usercart.quantity = quantity;
  await usercart.save();
};
const updateCart = async (_id, quantity) => {
  await CartModal.updateOne({ _id: _id }, { $set: { quantity: quantity } });
};
const deleteCartByItem = async (id, username) => {
  await CartModal.deleteOne({ item: id, username: username });
};

const cartGetByUsernameWithCartitems = async (username) => {
  let cart = await CartModal.find({ username: username }).populate("item");
  return cart;
};

const cartGetByUsername = async (username) => {
  let cart = await CartModal.findOne({ username: username });
  return cart;
};

const cartGetByKeyUserWith_Id = async (_id) => {
  let cart = await CartModal.find({ user: _id });
  return cart;
};
const deleteCartByUsername = async (username) => {
  await CartModal.deleteOne({ username: username });
};
const cartUpdateByUsername = async (username, cartitems) => {
  let cartup = await CartModal.updateOne(
    { username: username },
    { $set: { cartitems: cartitems } }
  );
  return cartup;
};
const cartUpdateBy_Id = async (username, cartitems) => {
  let cartup = await CartModal.updateOne(
    { user: req.session.user._id },
    { $set: { cartitems: cart.cartitems } }
  );
};
module.exports = {
  cartGetByUsernameWithCartitems,

  createCart,

  updateCart,
  deleteCartByItem,
};
