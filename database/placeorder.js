const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlaceorderSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  address: {
    type: String,
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
  },

  total: {
    type: Number,
  },
});
const PlacorderModal = mongoose.model("placeorder", PlaceorderSchema);
module.exports = PlacorderModal;
