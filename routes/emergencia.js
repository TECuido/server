const express = require("express");

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");
const { isAuthenticated } = require("../middlewares/auth");

const controller = new EmergenciasController();

// Ruteo de la parte de emergencia
router.get("/", isAuthenticated, controller.getAllEmergencias);
router.get("/:id", isAuthenticated, controller.getEmergencia);
router.post("/grupo", isAuthenticated, controller.addEmergenciaGrupo);
router.post("/allgrupo", isAuthenticated, controller.addEmergenciaContactos);
router.get("/emisor/:idEmisor", isAuthenticated, controller.getEmergenciaPorEmisor);
router.get("/receptor/:id", isAuthenticated, controller.getEmergenciaUltimas24Horas);

module.exports = router;
