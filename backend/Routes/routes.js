const express = require("express");
const router = express.Router();
const upload = require("express-fileupload");
router.use(upload());
const UserController = require("../Controllers/UserController");
const ProductController = require("../Controllers/ProductController");
const { auth } = require("../Middleware/auth");

router.post("/login", [UserController.validate("login")], UserController.login);

router.post(
  "/signup",
  [UserController.validate("createUser")],
  UserController.createUser
);

router.get("/products", ProductController.products);

router.get("/products/:id", ProductController.product);

router.post("/add-review", [auth], ProductController.addReview);

router.put("/edit-review/:id", [auth], ProductController.editReview);

router.post("/add-to-cart", [auth], ProductController.addToCart);

router.put("/edit-cart", [auth], ProductController.editToCart);

router.delete("/remove-cart/:id", [auth], ProductController.removeToCart);

router.get(
  "/get-cart-order/:userId/:status",
  [auth],
  ProductController.getCartOrderProduct
);

router.get("/get-seller/:id", [auth], ProductController.getSeller);

module.exports = router;
