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


module.exports = {
  cartGetByUsernameWithCartitems,

  createCart,

  updateCart,
  deleteCartByItem,
};
