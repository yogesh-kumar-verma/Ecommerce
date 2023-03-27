const dotenv = require("dotenv");
dotenv.config();
if (process.env.ISSQL) {
  var {
    cartGetByIdWithCartitems,
  } = require("../services/sqlservices/cartSqlServices");
} else {
  var { cartGetByIdWithCartitems } = require("../services/cartMongoServices");
}

const cartGet = async (req, res) => {
  let { _id } = req.session.user;

  let cart = await cartGetByIdWithCartitems(_id);

  if (cart != undefined) {
    res.render("mycart.ejs", {
      // products: products,
      cart: cart,
      name: req.session.name,
      isSeller: req.session.user.role,
    });
  } else {
    res.render("mycart.ejs", {
      // products: products,
      cart: [],
      name: req.session.name,
      isSeller: req.session.user.role,
    });
  }
};

module.exports = { cartGet };
