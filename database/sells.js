const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SellsSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  solditemname: {
    type: String,
  },
  solditemquantity: {
    type: String,
  },
  solditemprice: {
    type: Number,
  },
  soldto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
const SellsModal = mongoose.model("sell", SellsSchema);
module.exports = SellsModal;
