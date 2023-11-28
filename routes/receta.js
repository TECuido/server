const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const RecetasController = require("../controllers/receta");

const controller = new RecetasController();

// Ruteo de la parte de usuario
router.get("/", isAuthenticated, controller.getAllRecetas);
router.get("/:id", isAuthenticated, controller.getReceta);
router.get("/usuario/:id", isAuthenticated, controller.getRecetasPaciente)
router.post("/usuario/:id", isAuthenticated, controller.createReceta);

module.exports = router;
