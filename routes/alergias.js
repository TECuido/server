const express = require("express");
const router = express.Router();

const AlergiaDetallesController = require("../controllers/alergias.js");
const controller = new AlergiaDetallesController();

// Ruteo de la parte de Alergia
router.get("/", controller.getAllAlergias);
router.get("/:id", controller.getAlergiasUsuario);
router.post("/", controller.addAlergias);
// router.put("/:id",controller.updateAlergiaDetalles);

module.exports = router;