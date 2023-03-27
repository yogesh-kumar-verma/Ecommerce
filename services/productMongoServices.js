const ProductModal = require("../database/product");
const sql = require("mssql");
let { sqlc } = require("../database/pool");

const getProductBy_Id = async (id) => {
  let product = await ProductModal.findOne({ _id: id });
  return product;
};
const getAllProducts = async () => {
  let products = await ProductModal.find({});
  return products;
};
const productWithLimitsAndSkips = async (skip, limit) => {
  let products = await ProductModal.find({}).skip(skip).limit(limit);
  return products;
};
const sellerProductWithLimitsAndSkips = async (_id, skip, limit) => {
  let products = await ProductModal.find({ seller: _id })
    .skip(skip)
    .limit(limit);
  return products;
};
const addNewProduct = async (_id, name, desc, quantity, price, path) => {
  let product = new ProductModal();
  // product;
  product.seller = _id;
  product.name = name;
  product.description = desc;
  // product.id = Math.floor(Math.random() * 1000000 + 30);
  product.quantity = quantity;
  product.price = price;
  product.images[0] = path;
  await product.save();
};

const updateProductWith_Id = async (id, quantity) => {
  let product = await ProductModal.updateOne(
    { _id: id },
    { $set: { quantity: quantity } }
  );
};
const updateProductDetailsBy_Id = async (
  id,
  name,
  description,
  price,
  quantity
) => {
  let product = await ProductModal.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      },
    }
  );
};
const deleteProductBy_Id = async (id) => {
  let product = await ProductModal.deleteOne({ _id: id });
};
const deleteAllSelllerProduct = async (id) => {
  await ProductModal.delete({ seller: id });
};

module.exports = {
  deleteAllSelllerProduct,
  getAllProducts,
  productWithLimitsAndSkips,
  getProductBy_Id,

  updateProductWith_Id,
  updateProductDetailsBy_Id,
  deleteProductBy_Id,
  addNewProduct,
  sellerProductWithLimitsAndSkips,
};
