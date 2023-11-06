const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const UsuariosController = require("../controllers/usuario");

const controller = new UsuariosController();

// Ruteo de la parte de usuario
router.get("/", controller.getAllUsuarios);
router.get("/:id", controller.getUsuario);
router.post("/", controller.addUsuario);
router.put("/:id", controller.updateUsuario);
router.put("/:id/notification/token", controller.addNotificationToken);
router.delete("/:id", controller.deleteUsuario);


module.exports = router;
