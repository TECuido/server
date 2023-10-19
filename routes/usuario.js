const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const UsuariosController = require("../controllers/usuario");

const controller = new UsuariosController();

router.get("/", isAuthenticated, controller.getAllUsuarios);
router.get("/:id", isAuthenticated, controller.getUsuario);
router.post("/", isAuthenticated, controller.addUsuario);
router.put("/:id", isAuthenticated, controller.updateUsuario);
router.delete("/:id", isAuthenticated, controller.deleteUsuario);
router.post("/contacto", controller.addContacto);

module.exports = router;
