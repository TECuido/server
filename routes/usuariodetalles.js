const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
// const { isAuthenticated } = require("../middlewares/auth.js");
const UsuarioDetallesController = require("../controllers/usuariodetalles.js");
const { createUsuarioDetallesSchema, getUsuarioDetallesSchema, putUsuarioDetallesSchema } = require("../schemas/usuarioDetalles.schema.js");

const controller = new UsuarioDetallesController();

// Ruteo de la parte de usuario
router.get("/:id", isAuthenticated, controller.getUsuarioDetalles);
router.put("/:id", isAuthenticated, validatorHandler(getUsuarioDetallesSchema, "params"),controller.updateUsuarioDetalles);
router.post("/usuarios/:id/correo", isAuthenticated, validatorHandler(getUsuarioDetallesSchema), controller.enviarCorreoDetalles)

module.exports = router;
