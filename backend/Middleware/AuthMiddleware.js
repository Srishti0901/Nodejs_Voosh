const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const AuthMiddleware = async (req, res, next) => {
  const fetchedtoken = req.header("Authorization");
  // console.log(fetchedtoken);
  const token = fetchedtoken.match(/"([^"]+)"/)[1];
  // console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    console.log(userId);
    req.user = await User.findOne({ _id: userId }).select("_id");
    req.token = token;
    next();
  } catch (error) {
    console.log("Invalid token");
    return res.status(404).json({ error: "Token invalid" });
  }
};

module.exports = { AuthMiddleware };
