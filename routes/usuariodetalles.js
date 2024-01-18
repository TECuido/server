const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
// const { isAuthenticated } = require("../middlewares/auth.js");
const UsuarioDetallesController = require("../controllers/usuariodetalles.js");
const { createUsuarioDetallesSchema, getUsuarioDetallesSchema, putUsuarioDetallesSchema } = require("../schemas/usuarioDetalles.schema.js");




const controller = new UsuarioDetallesController();

// Ruteo de la parte de usuario
router.get("/", controller.getAllUsuarioDetalles);
router.get("/:id",  controller.getUsuarioDetalles);
router.put("/:id",isAuthenticated,  validatorHandler(putUsuarioDetallesSchema, "body"), validatorHandler(getUsuarioDetallesSchema, "params"),controller.updateUsuarioDetalles);

module.exports = router;
