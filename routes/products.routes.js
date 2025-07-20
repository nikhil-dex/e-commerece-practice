const productModel = require("../models/product.model");
const upload = require("../config/multer.config");
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller);

router.get("/get-products", async (req, res, next) => {
  try {
    const products = await productModel.find({ seller: req.user._id });
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
});


router.post("/create-product",upload.any("image"),authMiddleware.isAuthenticated,authMiddleware.isSeller,productController.createProduct);

module.exports = router;