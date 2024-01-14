const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const AlergiaController = require("../controllers/alergias.js");
const { createAlergiaSchema, getAlergiaSchema, deleteAlergiaSchema } = require("../schemas/alergia.schema.js");


const controller = new AlergiaController();

// Ruteo de la parte de Alergia
router.get("/", isAuthenticated, controller.getAllAlergias);
router.get("/:id", isAuthenticated, validatorHandler(getAlergiaSchema, "params"), controller.getAlergiasUsuario);
router.post("/", isAuthenticated, validatorHandler(createAlergiaSchema, "body"), controller.addAlergias);
router.delete("/:id", isAuthenticated, validatorHandler(deleteAlergiaSchema,"params"), controller.deleteAlergia);


module.exports = router;