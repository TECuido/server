const express = require("express");
const router = express.Router();

const MedicamentosActualesController = require("../controllers/medicamentosActuales");
const controller = new MedicamentosActualesController ();

// Ruteo de la parte de Alergia
router.get("/", controller.getAllMedicamentosActuales);
router.get("/:id", controller.getMedicamentosActualesUsuario);
router.post("/", controller.addMedicamentosActuales);
router.put("/:id", controller.updateMedicamentosActuales);
router.delete("/:id", controller.deleteMedicamentosActuales);
module.exports = router;