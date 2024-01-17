const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");
const AlergiaController = require("../controllers/alergias.js");
const controller = new AlergiaController();
const { getAlergiaSchema, createAlergiaSchema } = require("../schemas/alergia.schema.js");

// Ruteo de la parte de Alergia
router.get("/:id", isAuthenticated, validatorHandler(getAlergiaSchema, "params"), controller.getAlergiasUsuario);
router.post("/", controller.addAlergias, validatorHandler(createAlergiaSchema, "body"));
router.delete("/:id", isAuthenticated, validatorHandler(getAlergiaSchema,"params"), controller.deleteAlergia);

module.exports = router;

