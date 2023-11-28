const express = require("express");

const router = express.Router();
const LlamadaController = require("../controllers/llamada");
const { isAuthenticated } = require("../middlewares/auth");

const controller = new LlamadaController();

// Ruteo de la parte de Llamada
router.get("/", isAuthenticated, controller.getAllLlamadas);
router.get("/:id", isAuthenticated, controller.getLlamada);
router.get("/usuario/:id", isAuthenticated, controller.getAllLlamadasUsuario);
router.post("/usuario/:id", isAuthenticated, controller.addLlamada);
router.get("/usuario/:id/token", isAuthenticated, controller.generateToken);

module.exports = router;
