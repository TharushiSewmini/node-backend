const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../utills/jwt");
require("dotenv").config();

const createUser = async (req, res) => {
  const { name, password, email, address } = req.body;

  try {
    const user = await User.create({ name, password, email, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    res.json({ token, user_id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, login };
