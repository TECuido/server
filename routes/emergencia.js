const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");

const controller = new EmergenciasController();

router.get("/", controller.getAllEmergencias);
router.get("/:id", controller.getEmergencia);
router.post("/", controller.addEmergencia);
router.post("/emisor/:id", controller.getEmergenciaPorEmisor);

module.exports = router;
