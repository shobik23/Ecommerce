const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  removeProduct,
} = require("../controller/productController");
const { isAuthenticated, authorizedRole } = require("../middleWare/auth");

router.route("/").post(isAuthenticated, authorizedRole("admin"), addProduct);
router.route("/").get(isAuthenticated, getProducts);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(removeProduct);

module.exports = router;
