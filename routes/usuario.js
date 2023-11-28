const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const UsuariosController = require("../controllers/usuario");

const controller = new UsuariosController();

// Ruteo de la parte de usuario
router.get("/", isAuthenticated, controller.getAllUsuarios);
router.get("/:id", isAuthenticated, controller.getUsuario);
router.post("/", isAuthenticated, controller.addUsuario);
router.put("/:id", isAuthenticated, controller.updateUsuario);
router.put("/:id/notification/token", isAuthenticated, controller.addNotificationToken);
router.delete("/:id", isAuthenticated, controller.deleteUsuario);


module.exports = router;
