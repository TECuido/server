const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const MedicamentosController = require("../controllers/medicamento.js");

const controller = new MedicamentosController();

// Ruteo de la parte de usuario
router.get("/", controller.getAllMedicamentos);
router.get("/:id", controller.getMedicamento);
router.get("/receta/:id", controller.getMedicamentosReceta);
router.post("/receta/:id", controller.addMedicamentoReceta);


module.exports = router;
