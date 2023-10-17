const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");

const controller = new EmergenciasController();

router.get("/", controller.getAllEmergencias);
router.get("/:id", controller.getEmergencia);
router.post("/", controller.addEmergencia);
// PONGA EL NOMBRE COMPELTO
router.get("/emisor/:idEmisor", controller.getEmergenciaPorEmisor);

module.exports = router;
