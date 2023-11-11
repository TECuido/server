const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");

const controller = new EmergenciasController();

// Ruteo de la parte de emergencia
router.get("/", controller.getAllEmergencias);
router.get("/:id", controller.getEmergencia);
router.post("/grupo", controller.addEmergenciaGrupo);
router.post("/allgrupo", controller.addEmergenciaContactos);
router.get("/emisor/:idEmisor", controller.getEmergenciaPorEmisor);
router.get("/receptor/:id", controller.getEmergenciaUltimas24Horas);

module.exports = router;
