const express = require("express");
const router = express.Router();

const MedicoTratanteController = require("../controllers/medicoTratante");
const controller = new MedicoTratanteController ();

// Ruteo de la parte de Alergia
router.get("/", controller.getAllMedicoTratante);
router.get("/:id", controller.getMedicoTratanteUsuario);
router.post("/", controller.addMedicoTratante);
router.put("/:id", controller.updateMedicoTratante);

module.exports = router;