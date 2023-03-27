const CartModal = require("../database/cart");
const PlaceorderModal = require("../database/placeorder");
const ProductModal = require("../database/product");

const newOrderPlace = async (
  address,
  city,
  state,
  pincode,
  id,
  cartitems,

  username,
  item
) => {
  cartitems.forEach(async (cartitem) => {
    console.log(cartitem, "cart item hai");
    let placeorder = new PlaceorderModal();
    placeorder.address = address;
    placeorder.id = id;
    placeorder.item = cartitem.item;

    placeorder.username = username;
    placeorder.seller = cartitem.item.seller;
    await placeorder.save();
  });
};

const deletePlaceOrderBy_Id = async (_id) => {
  let deleteorder = await PlaceorderModal.deleteOne({ _id: _id });
};

const getMyordersWithItemsBy_Id = async (_id) => {
  let placeorder = await PlaceorderModal.find({
    id: _id,
  }).populate("item");

  return placeorder;
};
const getMyDeleviriesWithKeySellerBy_Id = async (_id) => {
  let resultfinal = [];
  const result = await PlaceorderModal.find({ seller: _id }).populate("item");

  return result;
};

module.exports = {
  newOrderPlace,

  deletePlaceOrderBy_Id,

  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
};
