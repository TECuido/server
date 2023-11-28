const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const MedicamentosController = require("../controllers/medicamento.js");

const controller = new MedicamentosController();

// Ruteo de la parte de usuario
router.get("/", isAuthenticated, controller.getAllMedicamentos);
router.get("/:id", isAuthenticated, controller.getMedicamento);
router.get("/receta/:id", isAuthenticated, controller.getMedicamentosReceta);
router.post("/receta/:id", isAuthenticated, controller.addMedicamentoReceta);


module.exports = router;
