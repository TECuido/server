const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");

const controller = new AuthController();

router.post("/login", controller.Login);
router.post("/registro", controller.Register);

module.exports = router;