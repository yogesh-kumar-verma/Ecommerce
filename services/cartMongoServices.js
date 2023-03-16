const CartModal = require("../database/cart");

const cartGetByUsername = async (username) => {
  let cart = await CartModal.findOne({ username: username });
  return cart;
};
const deleteCartByUsername = async (username) => {
  await CartModal.deleteOne({ username: username });
};
module.exports = { cartGetByUsername, deleteCartByUsername };
