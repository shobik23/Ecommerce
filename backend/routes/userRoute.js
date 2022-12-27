const express = require("express");
const { registerUser, login, logout } = require("../controller/userController");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
