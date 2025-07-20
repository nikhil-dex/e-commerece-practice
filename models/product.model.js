const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const productSchema = new Schema({
   name: String,
    description: String,
    price: Number,
    images: [String],
    seller: String
        
},{timestamps: true});

const Product = mongoose.model("product",productSchema);

module.exports = Product;