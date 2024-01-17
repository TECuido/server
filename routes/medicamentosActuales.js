const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const MedicamentosActualesController = require("../controllers/medicamentosActuales");
const { createMedicamentosActualesSchema, getMedicamentosActualesSchema } = require("../schemas/medicamentosActuales.schema.js");

const controller = new MedicamentosActualesController ();

// Ruteo de la parte de Medicamentos Actuales 
router.get("/:id", isAuthenticated, validatorHandler(getMedicamentosActualesSchema, "params"),controller.getMedicamentosActualesUsuario);
router.post("/", isAuthenticated, validatorHandler(createMedicamentosActualesSchema, "body"), controller.addMedicamentosActuales);
router.delete("/:id", isAuthenticated, validatorHandler(getMedicamentosActualesSchema, "params"), controller.deleteMedicamentosActuales);

module.exports = router;