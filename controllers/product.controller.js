const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require("../models/product.model");


module.exports.createProduct = async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { name, description, price } = req.body;
        if (!name || !description || !price) return res.status(400).json({ message: "all fields are required" });

        const images = req.files.map(file => file.publicUrl);
        console.log("IMAGES:", images);

        const product = await productModel.create({
            name,
            description,
            price: Number(price), // Ensure price is a number
            images,
            seller: req.user._id
        });

        res.status(201).json({
            message: "product created",
            product
        });
    } catch (err) {
        console.error("CREATE PRODUCT ERROR:", err);
        res.status(500).json({ error: err.message || err });
    }
}
