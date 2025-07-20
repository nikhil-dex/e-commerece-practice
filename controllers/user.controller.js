const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../models/blacklist.model")
const productModel = require("../models/product.model")
const Razorpay = require('razorpay');
const paymentModel = require("../models/payment.model");
const orderModel = require("../models/order.model")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.signup = async (req,res,next) => {
   try{
     const {email,password,username,role} = req.body;

    if(!email ||!password || !username) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const isUserAlreadyExists = await userModel.findOne({email});
    
    if(isUserAlreadyExists){
        return res.status(4000).json({
            message: "User already exists"
        })
    }

    let salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const user = await userModel.create({
        email,
        password: hashPassword,
        username,
        role
        
    })

    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: "1h"})

    res.setHeader('authorization', `bearer ${token}`);
    res.status(201).json({
        message: "User created successfully",
        user,
        token
    })    
    


   }catch(err){
    next(err)

   }


}
module.exports.signin = async (req,res,next) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if(!isPasswordMatched){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: "1h"})

        res.setHeader('authorization', `bearer ${token}`);
        res.status(200).json({
            message: "Logged in successfully",
            user,
            token
        })

    }catch(err){
        next(err)
    }
}
module.exports.logout = async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('bearer ')) {
            return res.status(401).json({
                message: "Authorization header is missing or malformed"
            });
        }
        const token = authHeader.split(" ")[1];

        const isTokenBlacklisted = await blacklistModel.findOne({token});

        if(isTokenBlacklisted){
            return res.status(400).json({
                message: "Token is already blacklisted"
            })
        }
        await blacklistModel.create({token});
        res.status(200).json({
            message: "Logged out successfully"
        })
        


    }catch(err){
        next(err)
    }
}
module.exports.getProfile = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        res.status(200).json({
            message: "Profile fetched successfully",
            user
        })
    }catch(err){
        next(err)
    }

}
module.exports.getProducts = async (req,res,next) => {
    try{
        const products = await productModel.find({});

        res.status(200).json({
            products
        });
    }catch(err){
        next(err)

    }
}
module.exports.getProductById = async (req,res,next) => {
    try{
        const products = await productModel.findById(req.params.id);

        res.status(200).json({
            products
        })

    }catch(err){
        next(err);

    }
}
module.exports.createOrder = async (req,res,next) => {
    try{
        const product = await productModel.findById(req.params.id);
        const option = {
            amount: product.amount * 100,
            currency: "INR",
            receipt: product._id
        }
        const order = instance.orders.create(option);
        res.status(200).json({
            message: "Order created successfully",
            order
        })

        const payment = await paymentModel.create({
            orderId: order.id,
            amount: product.amount,
            currency: "INR",
            status: "pending"
        
        });

    }catch(err){

    }
}

module.exports.verifyPayment = async(req,res,next) => {
    try{
        const {paymentId,orderId,signature} = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const { validatePaymentVerification } = require("../node_modules/razorpay/dist/utils/razorpay-utils.js")

        const isValid = validatePaymentVerification({
            orderId: orderId,
            paymentId: paymentId,
        },signature,secret);

        if(isValid){
            const payment = await paymentModel.findOne({
                orderId: orderId
            });
            payment.paymentId = paymentId;
            payment.signature = signature;
            payment.status = "success";

            await payment.save();

            res.status(200).json({
                message: "Payment verified successfully"
            })
        }else{
            const payment = await paymentModel.findOne({
                orderId: orderId
            });
            payment.status = "failed";
            await payment.save();
            res.status(400).json({
                message: "Payment verification failed"
            })
        }


    }catch(err){
        next(err)
    }
}