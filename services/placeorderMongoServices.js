const CartModal = require("../database/cart");
const PlaceorderModal = require("../database/placeorder");
const ProductModal = require("../database/product");

const newOrderPlace = async (
  address,
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
  // const results = await PlaceorderModal.aggregate([
  //   { $unwind: "$cartitems" },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "cartitems.item",
  //       foreignField: "_id",
  //       as: "resultingArray",
  //     },
  //   },

  //   { $unwind: "$resultingArray" },
  // ]);
  // // console.log(results);
  // results.forEach((result) => {
  //   if (result.resultingArray.seller == _id) {
  //     result.resultingArray.orderedquantity = result.cartitems.quantity;
  //     result.resultingArray.address = result.address;
  //     result.resultingArray.name = result.name;

  //     resultfinal.push(result.resultingArray);
  //   }
  // });
  // console.log(_id);

  return result;
  // console.log("all placed oreders", placeorders);
};
const findPlaceOrderBy_Id = async (_id) => {
  let placeorder = await PlaceorderModal.findOne({ _id: _id });
  return placeorder;
};
const updatePlaceOrderBy_Id = async (_id, cartitems) => {
  let updateorder = await PlaceorderModal.updateOne(
    { _id: _id },
    { $set: { cartitems: cartitems } }
  );
};
module.exports = {
  newOrderPlace,

  deletePlaceOrderBy_Id,

  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
};
