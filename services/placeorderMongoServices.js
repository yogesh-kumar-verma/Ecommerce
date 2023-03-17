const CartModal = require("../database/cart");
const PlaceorderModal = require("../database/placeorder");

const newOrderPlace = async (
  address,
  id,
  cartitems,

  username,
  name
) => {
  let placeorder = new PlaceorderModal();
  placeorder.address = address;
  placeorder.id = id;
  placeorder.cartitems = cartitems;

  placeorder.username = username;
  placeorder.name = name;
  await placeorder.save();
};
const findPlaceOrderBy_Id = async (_id) => {
  let placeorder = await PlaceorderModal.findOne({ _id: _id });
  return placeorder;
};
const deletePlaceOrderBy_Id = async (_id) => {
  let deleteorder = await PlaceorderModal.deleteOne({ _id: _id });
};
const updatePlaceOrderBy_Id = async (_id, cartitems) => {
  let updateorder = await PlaceorderModal.updateOne(
    { _id: _id },
    { $set: { cartitems: cartitems } }
  );
};
const getMyordersWithItemsBy_Id = async (_id) => {
  let placeorder = await PlaceorderModal.find({
    id: _id,
  }).populate("cartitems.item");
  return placeorder;
};
const getMyDeleviriesWithKeySellerBy_Id = async (_id) => {
  let resultfinal = [];
  const results = await PlaceorderModal.aggregate([
    { $unwind: "$cartitems" },
    {
      $lookup: {
        from: "products",
        localField: "cartitems.item",
        foreignField: "_id",
        as: "resultingArray",
      },
    },

    { $unwind: "$resultingArray" },
  ]);
  // console.log(results);
  results.forEach((result) => {
    if (result.resultingArray.seller == _id) {
      result.resultingArray.orderedquantity = result.cartitems.quantity;
      result.resultingArray.address = result.address;
      result.resultingArray.name = result.name;

      resultfinal.push(result.resultingArray);
    }
  });
  // console.log(_id);

  return resultfinal;
  // console.log("all placed oreders", placeorders);
};
module.exports = {
  newOrderPlace,
  findPlaceOrderBy_Id,
  deletePlaceOrderBy_Id,
  updatePlaceOrderBy_Id,
  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
};
