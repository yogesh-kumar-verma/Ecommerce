const express = require("express");
const router = express.Router();
const {
  placeOrderGet,
  placedOrderPost,
  placedOrderGet,
  placedOrderDelete,
  placedOrderConfirm,
} = require("../controllers/placeorder");
const isAuth = require("../middleware/isAuth");
router.route("/").get(isAuth, placeOrderGet);
router.route("/:total").post(isAuth, placedOrderPost);
router.route("/myorders").get(isAuth, placedOrderGet);
router.route("/cancel/:_id").get(isAuth, placedOrderDelete);
router.route("/confirm/:_id").get(isAuth, placedOrderConfirm);

module.exports = router;
