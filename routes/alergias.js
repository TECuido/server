const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");
const AlergiaController = require("../controllers/alergias.js");
const controller = new AlergiaController();
const { getAlergiasSchema, createAlergiasSchema } = require("../schemas/alergias.schema.js");

// Ruteo de la parte de Alergia
router.get("/", controller.getAllAlergias);// Luego se elimina
router.get("/:id", isAuthenticated, validatorHandler(getAlergiasSchema, "params"), controller.getAlergiasUsuario);
router.post("/", controller.addAlergias);
router.delete("/:id", controller.deleteAlergia);

module.exports = router;

