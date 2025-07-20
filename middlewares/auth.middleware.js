const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("bearer ")) {
  return res.status(401).json({ message: "Unauthorized - No or malformed token" });
}

const token = authHeader.split(" ")[1];

    // Check if the token is blacklisted
    const blacklistedToken = await blacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Unauthorized - Blacklisted" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Unauthorized - Token invalid" });
  }
};

module.exports.isSeller = (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== "seller") {
      return res.status(401).json({ message: "Unauthorized - Seller only" });
    }
    next();
  } catch (err) {
    console.error("isSeller Middleware Error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
