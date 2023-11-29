const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const validatorHandler = require("../middlewares/validator.js");
const { loginSchema, registroSchema, refreshTokenSchema } = require("../schemas/auth.schema.js");


const controller = new AuthController();

// Ruteo de la parte de auth
router.post("/login", validatorHandler(loginSchema, "body"), controller.Login);
router.post("/registro", validatorHandler(registroSchema, "body"), controller.Register);
router.post("/refreshToken", validatorHandler(refreshTokenSchema, "body"), controller.RefreshToken);

module.exports = router;
