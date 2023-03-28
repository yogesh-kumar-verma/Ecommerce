const { sqlc } = require("../../database/pool");
let sql = require("mssql");
const createCart = async (user_id, id, quantity) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("user_id", sql.Int, user_id)
    .input("product_id", sql.Int, id)
    .input("quantity", sql.Int, quantity)
    .query(
      `insert into carts (user_id,product_id,quantity) values(@user_id,@product_id,@quantity)`
    );
};
// createCart(1, 1024, 2);

const updateCart = async (_id, quantity) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)

    .input("quantity", sql.Int, quantity)
    .query(`update carts set quantity=@quantity where _id=@_id`);
};

const deleteCartBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(`delete from carts where _id=@_id`);
};

const cartGetByIdWithCartitems = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `select carts._id ,
      carts.user_id,
      carts.product_id,
      products.quantity as 'stock',
      carts.quantity ,
      products.seller,
      products.discount,
      products.images,
      products.description,
      products.price,
      products.currency,
      products.brand,
      products.category,
      products.colors,
      products.name  from carts inner join products on products._id = carts.product_id where carts.user_id=@_id `
    );

  return result.recordset;
};
const cartGetByIdWithCartitemsWithQuantityLimit = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `select carts._id ,
      carts.user_id,
      carts.product_id,
      products.quantity as 'stock',
      carts.quantity ,
      products.seller,
      products.discount,
      products.images,
      products.description,
      products.price,
      products.currency,
      products.brand,
      products.category,
      products.colors,
      products.name  from carts inner join products on products._id = carts.product_id where carts.user_id=@_id and carts.quantity<=products.quantity `
    );

  return result.recordset;
};

module.exports = {
  cartGetByIdWithCartitems,
  cartGetByIdWithCartitemsWithQuantityLimit,
  createCart,

  updateCart,
  deleteCartBy_Id,
};
