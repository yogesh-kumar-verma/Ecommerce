const PlaceorderModal = require("../database/placeorder");

const newOrderPlace = async (
  address,
  cartitems,
  id,
  seller,
  username,
  name
) => {
  let placeorder = new PlaceorderModal();
  placeorder.address = address;
  placeorder.items = cartitems;
  placeorder.id = id;
  placeorder.seller = seller;
  placeorder.username = username;
  placeorder.name = name;
  await placeorder.save();
};

module.exports = { newOrderPlace };
