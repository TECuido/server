const express = require("express");
const router = express.Router();

const CondicionMedicaController = require("../controllers/condicionMedica.js");
const controller = new CondicionMedicaController();

// Ruteo de la parte de Alergia
router.get("/", controller.getAllCondicionMedica);
router.get("/:id", controller.getCondicionMedicaUsuario);
router.post("/", controller.addCondicionMedica);

module.exports = router;