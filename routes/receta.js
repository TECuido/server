const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const RecetasController = require("../controllers/receta");

const controller = new RecetasController();

// Ruteo de la parte de usuario
router.get("/", controller.getAllRecetas);
router.get("/:id", controller.getReceta);
router.get("/usuario/:id", controller.getRecetasPaciente)
router.post("/usuario/:id", controller.createReceta);

module.exports = router;
