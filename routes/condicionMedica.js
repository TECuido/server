const express = require("express");
//Authenticator
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

//Router y Schemas
const router = express.Router();
const CondicionMedicaController = require("../controllers/condicionMedica.js");
const { createCondicionMedicaSchema, getCondicionMedicaSchema } = require("../schemas/condicionMedica.schema.js");


const controller = new CondicionMedicaController();

// Ruteo de la parte de Condicion medica
router.get("/", controller.getAllCondicionMedica);
router.get("/:id", isAuthenticated(), validatorHandler(getCondicionMedicaSchema, "params"), controller.getCondicionMedicaUsuario);
router.post("/", isAuthenticated(), validatorHandler(createCondicionMedicaSchema,"body"),controller.addCondicionMedica);
router.delete("/:id", isAuthenticated(), validatorHandler(getCondicionMedicaSchema, "params"), controller.deleteCondicionMedica);

module.exports = router;