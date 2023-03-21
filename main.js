const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const port = 3000;
const dotenv = require("dotenv");
//  MIddlewares importing
const isAuth = require("./middleware/isAuth");
const sendEmail = require("./methods/sendEmail");
const forgotPass = require("./methods/forgotEmail");
const products = require("./methods/products");

// Routes to Apis
const login_routes = require("./routes/login");
const changepass_routes = require("./routes/changepass");
const forget_routes = require("./routes/forget");
const signup_routes = require("./routes/signup");
const product_routes = require("./routes/product");
const cart_routes = require("./routes/cart");
const resetPass_routes = require("./routes/resetpass");
const seller_routes = require("./routes/seller");
const placeorder_routes = require("./routes/placeorder");
const admin_routes = require("./routes/admin");
const home_routes = require("./routes/home");
// data base connectivity and calling
const initDB = require("./database/init");

initDB().catch((err) => console.log(err));

// default middle wares to use
dotenv.config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/product/uploads", express.static(__dirname + "/uploads"));
app.use("/seller/uploads", express.static(__dirname + "/uploads"));
app.use("/fetchAll/uploads", express.static(__dirname + "/uploads"));
app.use("/placeorder/uploads", express.static(__dirname + "/uploads"));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Session expires after 10 min of inactivity.
      expires: 600000,
    },
  })
);
app.use("/", home_routes);
app.use("/login", login_routes);
app.use("/changepass", changepass_routes);
app.use("/forgot", forget_routes);
app.use("/signup", signup_routes);
app.use("/product", product_routes);
app.use("/cart", cart_routes);
app.use("/resetPass", resetPass_routes);
app.use("/seller", seller_routes);
app.use("/placeorder", placeorder_routes);
app.use("/admin", admin_routes);

// Password changing and Email Verification

app.route("/logout").get((req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app
  .route("*")
  .get(async (req, res) => {
   


    res.send(`wrong point friend$`);
  })
  .post((req, res) => {
    res.send("wrong point friend");
  });
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
