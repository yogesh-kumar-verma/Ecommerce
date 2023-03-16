const express = require("express");
const {
  veriyTokenGet,
  homeGet,
  mainHomeGet,
  fetchAllGet,
} = require("../controllers/home");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const isSeller = require("../middleware/isSeller");
router.route("/verifyEmail/:token").get(veriyTokenGet);
router.route("/home").get(homeGet);
router.route("/").get(isAuth, mainHomeGet);
router.route("/fetchAll/:page").get(fetchAllGet);

module.exports = router;
