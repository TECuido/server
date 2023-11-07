const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");

const controller = new EmergenciasController();

// Ruteo de la parte de emergencia
router.get("/", controller.getAllEmergencias);
router.get("/:id", controller.getEmergencia);
router.post("/grupo", controller.addEmergenciaGrupo);
// PONGA EL NOMBRE COMPLETO
router.get("/emisor/:idEmisor", controller.getEmergenciaPorEmisor);

module.exports = router;
