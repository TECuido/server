const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const ContactosController = require("../controllers/contacto");

const controller = new ContactosController();

// Ruteo de la parte de Contacto
router.get("/", isAuthenticated, controller.getAllContactos);
router.get("/:id", isAuthenticated, controller.getContacto);
router.get("/usuario/:id", isAuthenticated, controller.getAllContactosUsuario);
router.delete("/:idAgrega/:idAgregado", isAuthenticated, controller.deleteContacto);
router.post("/usuario/:id", isAuthenticated, controller.addContacto);

module.exports = router;
