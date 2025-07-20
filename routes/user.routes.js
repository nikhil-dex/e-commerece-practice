const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");



router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.post("/logout",userController.logout);
router.get("/getProfile",authMiddleware.isAuthenticated,userController.getProfile);

router.get("/products",authMiddleware.isAuthenticated,userController.getProducts);
router.get("/products/:id",authMiddleware.isAuthenticated,userController.getProducts);
router.get("/order/:id",authMiddleware.isAuthenticated,userController.createOrder);
router.get("/verify/:id",authMiddleware.isAuthenticated,userController.verifyPayment);




module.exports = router;