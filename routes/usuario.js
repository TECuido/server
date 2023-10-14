const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuario");

const controller = new UsuariosController();

router.get("/", controller.getAllUsuarios);
router.get("/:id", controller.getUsuario);
router.post("/", controller.addUsuario);
router.put("/:id", controller.updateUsuario);
router.delete("/:id", controller.deleteUsuario);

module.exports = router;