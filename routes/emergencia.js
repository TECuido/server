const express = require("express");

const router = express.Router();
const EmergenciasController = require("../controllers/emergencia");
const { isAuthenticated } = require("../middlewares/auth");
const validatorHandler = require("../middlewares/validator.js");
const { getEmergenciaSchema, createEmergenciaGrupoSchema, createEmergenciaContactosSchema, getEmergenciasEmisorSchema } = require("../schemas/emergencias.schema.js");

const controller = new EmergenciasController();

// Ruteo de la parte de emergencia
router.get("/:id", isAuthenticated, validatorHandler(getEmergenciaSchema, "params"), controller.getEmergencia);
router.post("/grupo", isAuthenticated, validatorHandler(createEmergenciaGrupoSchema, "body"), controller.addEmergenciaGrupo);
router.post("/allgrupo", isAuthenticated, validatorHandler(createEmergenciaContactosSchema, "body"), controller.addEmergenciaContactos);
router.get("/emisor/:idEmisor", isAuthenticated, validatorHandler(getEmergenciasEmisorSchema, "params"), controller.getEmergenciaPorEmisor);
router.get("/receptor/:id", isAuthenticated, validatorHandler(getEmergenciaSchema, "params"), controller.getEmergenciaUltimas24Horas);
router.put("/:id/grupo", isAuthenticated, validatorHandler(getEmergenciaSchema, "params"), validatorHandler(createEmergenciaGrupoSchema, "body"), controller.updateEmergenciaGrupo);
router.put("/:id/allgrupo", isAuthenticated, validatorHandler(getEmergenciaSchema, "params"), validatorHandler(createEmergenciaContactosSchema, "body"), controller.updateEmergenciaContactos);

module.exports = router;
