const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user","seller"],
        default: "user"
    }
},{timestamps: true});

const User = mongoose.model("user",userSchema);

module.exports = User;