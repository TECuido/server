const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
// const { isAuthenticated } = require("../middlewares/auth.js");
const UsuarioDetallesController = require("../controllers/usuariodetalles.js");
const { createUsuarioDetallesSchema, getUsuarioDetallesSchema, putUsuarioDetallesSchema } = require("../schemas/usuarioDetalles.schema.js");


// const validatorHandler = require("../middlewares/validator.js");
// const {
//   getUsuarioSchema,
//   createUsuarioSchema,
//   updateTokenSchema,
// } = require("../schemas/usuario.schema.js");

const controller = new UsuarioDetallesController();

// Ruteo de la parte de usuario
router.get("/", isAuthenticated, controller.getAllUsuarioDetalles);
router.get("/:id",  isAuthenticated, validatorHandler(getUsuarioDetallesSchema, "params"), controller.getUsuarioDetallesSchema);
router.post("/:id", isAuthenticated, validatorHandler(createUsuarioDetallesSchema, "body"), validatorHandler(getUsuarioDetallesSchema,"params", controller.createUsuarioDetallesSchema)); 
router.put("/:id",isAuthenticated,  validatorHandler(putUsuarioDetallesSchema, "body"), validatorHandler(getUsuarioDetallesSchema, "params"),controller.updateUsuarioDetalles);

// router.get(
//   "/:id",
//   isAuthenticated,
//   validatorHandler(getUsuarioSchema, "params"),
//   controller.getUsuario
// );
// router.post(
//   "/",
//   isAuthenticated,
//   validatorHandler(createUsuarioSchema, "body"),
//   controller.addUsuario
// );
// router.put(
//   "/:id",
//   isAuthenticated,
//   validatorHandler(getUsuarioSchema, "params"),
//   validatorHandler(createUsuarioSchema, "body"),
//   controller.updateUsuario
// );
// router.put(
//   "/:id/notification/token",
//   isAuthenticated,
//   validatorHandler(updateTokenSchema, "body"),
//   controller.addNotificationToken
// );
module.exports = router;
