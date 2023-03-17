const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlaceorderSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  cartitems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: Number,
    },
  ],
  total: {
    type: Number,
  },
});
const PlacorderModal = mongoose.model("placeorder", PlaceorderSchema);
module.exports = PlacorderModal;
