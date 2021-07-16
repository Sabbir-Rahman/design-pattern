const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const {
  encodePage,
  decodePage,
  encodeMessage,
  decodeMessage,
} = require("../controllers/messageController");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.use("/dashboard", isLoggedIn);

router.route("/").get(encodePage).post(encodeMessage);
router.route("/decode").get(decodePage).post(decodeMessage);

// router.get("/logout", logout);

// router.route("/register").get(getRegister).post(postRegister);

// router.get("/dashboard", getDashboard);

// router.get(pageNotFound);

module.exports = router;
