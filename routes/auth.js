const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");

const controller = new AuthController();

// Ruteo de la parte de auth
router.post("/login", controller.Login);
router.post("/registro", controller.Register);
router.post("/refreshToken", controller.RefreshToken);

module.exports = router;
