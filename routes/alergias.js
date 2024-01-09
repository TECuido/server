const express = require("express");
const router = express.Router();

const AlergiaController = require("../controllers/alergias.js");
const controller = new AlergiaController();

// Ruteo de la parte de Alergia
router.get("/", controller.getAllAlergias);
router.get("/:id", controller.getAlergiasUsuario);
router.post("/", controller.addAlergias);

module.exports = router;