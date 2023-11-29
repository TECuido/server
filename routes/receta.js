const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const RecetasController = require("../controllers/receta");
const validatorHandler = require("../middlewares/validator.js");
const { getRecetaSchema, createRecetaSchema } = require("../schemas/receta.schema.js");
const { getUsuarioSchema } = require("../schemas/usuario.schema.js");

const controller = new RecetasController();

// Ruteo de la parte de usuario
//router.get("/", isAuthenticated, controller.getAllRecetas);
router.get("/:id", isAuthenticated, validatorHandler(getRecetaSchema, "params"), controller.getReceta);
router.get("/usuario/:id", isAuthenticated, validatorHandler(getUsuarioSchema, "params"), controller.getRecetasPaciente)
router.get("/medico/:id", isAuthenticated, validatorHandler(getUsuarioSchema, "params"), controller.getRecetasMedico)
router.post("/usuario/:id", isAuthenticated, validatorHandler(getUsuarioSchema, "params"), validatorHandler(createRecetaSchema, "body"), controller.createReceta);

module.exports = router;
