const ProductModal = require("../database/product");

const getProductById = async (id) => {
  let product = await ProductModal.findOne({ id: id });
  return product;
};
const updateProductWithId = async (id, quantity) => {
  let product = await ProductModal.updateOne(
    { id: id },
    { $set: { quantity: quantity } }
  );
};
const deleteAllSelllerProduct = async (id) => {
  await ProductModal.deleteOne({ seller: id });
};
const getAllProducts = async () => {
  let products = await ProductModal.find({});
  return products;
};
const productWithLimitsAndSkips = async (skip, limit) => {
  let products = await ProductModal.find({}).skip(skip).limit(limit);
  return products;
};
module.exports = {
  deleteAllSelllerProduct,
  getAllProducts,
  productWithLimitsAndSkips,
  getProductById,
  updateProductWithId,
};
