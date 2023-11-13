const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const LlamadaController = require("../controllers/llamada");

const controller = new LlamadaController();

// Ruteo de la parte de Llamada
router.get("/", controller.getAllLlamadas);
router.get("/:id", controller.getLlamada);
router.get("/usuario/:id", controller.getAllLlamadasUsuario);
router.post("/usuario/:id", controller.addLlamada);

router.get("/usuario/:id/token", controller.generateToken);

module.exports = router;
