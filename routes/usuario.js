const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const UsuariosController = require("../controllers/usuario");
const validatorHandler = require("../middlewares/validator.js");
const { getUsuarioSchema, createUsuarioSchema, updateTokenSchema } = require("../schemas/usuario.schema.js");

const controller = new UsuariosController();

// Ruteo de la parte de usuario
//router.get("/", controller.getAllUsuarios)
router.get("/:id", isAuthenticated, validatorHandler(getUsuarioSchema, "params"), controller.getUsuario);
router.post("/", isAuthenticated, validatorHandler(createUsuarioSchema, "body"), controller.addUsuario);
router.put("/:id", isAuthenticated, validatorHandler(getUsuarioSchema, "params"), validatorHandler(createUsuarioSchema, "body"), controller.updateUsuario);
router.put("/:id/notification/token", isAuthenticated, validatorHandler(updateTokenSchema, "body"), controller.addNotificationToken);
//router.delete("/:id", isAuthenticated, controller.deleteUsuario);


module.exports = router;
