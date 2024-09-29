const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/User");

router.post("/create", createUser);
router.post("/login", login);

module.exports = router;
