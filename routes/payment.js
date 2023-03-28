const express = require("express");
const router = express.Router();
const { paymentPost } = require("../controllers/payment");

// router.route("/").get(loginUserGet);
router.route("/").post(paymentPost);
module.exports = router;
