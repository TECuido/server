const express = require("express");
// const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const UsuarioDetllesController = require("../controllers/usuariodetalles.js");

// const validatorHandler = require("../middlewares/validator.js");
// const {
//   getUsuarioSchema,
//   createUsuarioSchema,
//   updateTokenSchema,
// } = require("../schemas/usuario.schema.js");

const controller = new UsuarioDetllesController();

// Ruteo de la parte de usuario
router.get("/", controller.getAllUsuarioDetalles);
router.get("/:id", controller.getUsuarioDetalles);
router.post("/:id", controller.addUsuarioDetalles);
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
