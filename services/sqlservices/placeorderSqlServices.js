const { sqlc } = require("../../database/pool");
let sql = require("mssql");
const newOrderPlace = async (
  address,
  city,
  state,
  pincode,
  id,
  cartitems,
  total
) => {
  cartitems.forEach(async (cartitem) => {
    let pool = await sqlc;
    let result = await pool
      .request()
      .input("user_id", sql.Int, id)
      .input("prod_id", sql.Int, cartitem.product_id)
      .input("seller", sql.Int, cartitem.seller)
      .input("address", sql.VarChar, address)
      .input("city", sql.VarChar, city)
      .input("state", sql.VarChar, state)
      .input("pincode", sql.Int, pincode)
      .input("quantity_ordered", sql.Int, cartitem.quantity)
      .input("order_total", sql.Int, total)
      .query(
        `INSERT INTO orders (user_id,prod_id,address,city,state,pincode,seller,order_total,quantity_ordered)VALUES(@user_id,@prod_id,@address,@city,@state,@pincode,@seller,@order_total,@quantity_ordered)`
      );
    console.log(result, "res");
  });
};

const deletePlaceOrderBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(`update orders set user_id =null  where order_id=@_id`);
};

const getMyordersWithItemsBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool.request().input("_id", sql.Int, _id)
    .query(`select orders.order_id,products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered ,products.images
    from orders inner join products on orders.prod_id=products._id where orders.user_id=@_id;`);

  return result.recordset;
};
const getMyDeleviriesWithKeySellerBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool.request().input("_id", sql.Int, _id)
    .query(`select products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered
    from orders inner join products on orders.prod_id=products._id where orders.seller=@_id;`);

  return result.recordset;
};

module.exports = {
  newOrderPlace,

  deletePlaceOrderBy_Id,

  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
};
