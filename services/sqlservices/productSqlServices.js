const { sqlc } = require("../../database/pool");
let sql = require("mssql");
const getProductBy_Id = async (id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)
    .query(`select * from products where _id=@_id`);
  // console.log(result);
  let product = result.recordset[0];

  return product;
};
// getProductBy_Id(1);

const productWithLimitsAndSkips = async (skip, limit) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("offset", sql.Int, skip)
    .input("limit", sql.Int, limit)
    .query(
      `select * from products where seller is not null  order by _id   offset @offset rows fetch next  @limit rows only  `
    );
  // console.log(result);
  let products = result.recordset;

  // let products = await ProductModal.find({}).skip(skip).limit(limit);
  return products;
};
const sellerProductWithLimitsAndSkips = async (_id, skip, limit) => {
  let pool = await sqlc;
  let result = await pool
    .request() 
    .input("seller", sql.Int, _id)
    .input("offset", sql.Int, skip)
    .input("limit", sql.Int, limit)
    .query(
      `select * from products where seller=@seller order by _id offset @offset rows fetch next  @limit rows only  `
    );
  let products = result.recordset;
  console.log(products);
  return products;
};
sellerProductWithLimitsAndSkips(2, 3, 3);
const addNewProduct = async (_id, name, desc, quantity, price, path) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("seller", sql.Int, _id)
    .input("name", sql.VarChar, name)
    .input("description", sql.VarChar, desc)
    .input("quantity", sql.Int, quantity)
    .input("price", sql.Money, price)
    .input("images", sql.VarChar, path)
    .query(
      `INSERT into products (seller,description,[images],quantity,price,name) VALUES (@seller,@description,@images,@quantity,@price,@name) `
    );
};

const updateProductWith_Id = async (id, quantity) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)

    .input("quantity", sql.Int, quantity)
    .query(` update products set quantity=@quantity where _id=@_id `);
};

const updateProductDetailsBy_Id = async (
  id,
  name,
  description,
  price,
  quantity
) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)
    .input("name", sql.VarChar, name)
    .input("description", sql.VarChar, description)
    .input("price", sql.Money, price)

    .input("quantity", sql.Int, quantity)
    .query(
      ` update products set name=@name,description=@description,quantity=@quantity ,price=@price where _id=@_id `
    );
};

const deleteProductBy_Id = async (id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)
    .query(` update products set seller=null  where _id=@_id `);
};
// deleteProductBy_Id(1002)
const deleteAllSelllerProduct = async (id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, id)
    .query(` update products set seller=null  where seller=@_id `);
};

module.exports = {
  deleteAllSelllerProduct,

  productWithLimitsAndSkips,
  getProductBy_Id,

  updateProductWith_Id,
  updateProductDetailsBy_Id,
  deleteProductBy_Id,
  addNewProduct,
  sellerProductWithLimitsAndSkips,
};
