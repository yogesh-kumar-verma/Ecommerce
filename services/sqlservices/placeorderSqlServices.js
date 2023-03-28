const { sqlc } = require("../../database/pool");
let sql = require("mssql");
const newOrderPlace = async (address, city, state, pincode, id, cartitem) => {
  console.log("ye cart hai", cartitem);
  let total = cartitem.quantity * cartitem.price;
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, cartitem._id)
    .input("user_id", sql.Int, id)
    .input("prod_id", sql.Int, cartitem.product_id)
    .input("seller", sql.Int, cartitem.seller)
    .input("address", sql.VarChar, address)
    .input("city", sql.VarChar, city)
    .input("state", sql.VarChar, state)
    .input("pincode", sql.Int, pincode)
    .input("quantity_ordered", sql.Int, cartitem.quantity)
    .input("order_total", sql.Int, total)
    .input("quantity", sql.Int, cartitem.quantity)
    .input("stock", sql.Int, cartitem.stock)
    .query(
      `   BEGIN TRANSACTION  
     
 
        update products set quantity=(@stock -@quantity) where _id=@prod_id and quantity>=@quantity 
        IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
   INSERT INTO orders (user_id,prod_id,address,city,state,pincode,seller,order_total,quantity_ordered)VALUES(@user_id,@prod_id,@address,@city,@state,@pincode,@seller,@order_total,@quantity_ordered)
   IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
delete from carts where _id=@_id;
   
IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
      COMMIT TRANSACTION  `
    );
  console.log(result, "res");
};

const deletePlaceOrderBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `update orders set user_id =null,status='cancelled'  where order_id=@_id`
    );
  // .query(`update orders set status='cancelled'  where order_id=@_id`);
};
const confirmPlaceOrderBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `update orders set user_id =null,status='delivered'  where order_id=@_id`
    );
  // .query(`update orders set status='cancelled'  where order_id=@_id`);
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
    .query(`select orders.order_id ,orders.user_id,products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered
    from orders inner join products on orders.prod_id=products._id where orders.seller=@_id;`);
  console.log(result);
  return result.recordset;
};

module.exports = {
  newOrderPlace,

  deletePlaceOrderBy_Id,
  confirmPlaceOrderBy_Id,
  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
};
