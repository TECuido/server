const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const MedicamentosController = require("../controllers/medicamento.js");
const validatorHandler = require("../middlewares/validator.js");
const { getMedicamentoSchema, createMedicamentoSchema } = require("../schemas/medicamento.schema.js");
const { getRecetaSchema } = require("../schemas/receta.schema.js");

const controller = new MedicamentosController();

// Ruteo de la parte de usuario
//router.get("/", isAuthenticated, controller.getAllMedicamentos);
router.get("/:id", isAuthenticated, validatorHandler(getMedicamentoSchema, "params"), controller.getMedicamento);
router.get("/receta/:id", isAuthenticated, validatorHandler(getRecetaSchema, "params"), controller.getMedicamentosReceta);
router.post("/receta/:id", isAuthenticated, validatorHandler(getRecetaSchema, "params"), validatorHandler(createMedicamentoSchema, "body"), controller.addMedicamentoReceta);


module.exports = router;
