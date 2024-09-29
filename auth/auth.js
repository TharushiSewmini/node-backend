const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utills/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const uid = req.headers.uid;
  if (!token) return res.status(401).json({ error: "No Token Provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (uid && uid !== decoded.id) {
      return res.status(403).json({ error: "UID does not match user ID" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
