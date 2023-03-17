const CartModal = require("../database/cart");

const createCart = async (username, id) => {
  let usercart = new CartModal();
  usercart.username = username;
  let cartItem = new Object({
    item: id,
    quantity: 1,
  });
  usercart.cartitems.push(cartItem);
  await usercart.save();
};
const cartGetByUsername = async (username) => {
  let cart = await CartModal.findOne({ username: username });
  return cart;
};
const cartGetByUsernameWithCartitems = async (username) => {
  let cart = await CartModal.findOne({ username: username }).populate(
    "cartitems.item"
  );
  return cart;
};
const cartGetByKeyUserWith_Id = async (_id) => {
  let cart = await CartModal.findOne({ user: _id });
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
  cartGetByUsername,
  deleteCartByUsername,
  cartGetByUsernameWithCartitems,
  cartUpdateByUsername,
  createCart,
  cartGetByKeyUserWith_Id,
  cartUpdateBy_Id,
};
