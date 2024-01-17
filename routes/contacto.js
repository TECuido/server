const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const ContactosController = require("../controllers/contacto");
const { createContactoSchema, getContactoSchema, deleteContactoSchema } = require("../schemas/contacto.schema.js");

const controller = new ContactosController();

// Ruteo de la parte de Contacto
router.get("/:id", isAuthenticated, validatorHandler(getContactoSchema, "params"), controller.getContacto);
router.get("/usuario/:id", isAuthenticated, validatorHandler(getContactoSchema, "params"), controller.getAllContactosUsuario);
router.delete("/:id", isAuthenticated, validatorHandler(deleteContactoSchema, "params"), controller.deleteContacto);
router.post("/usuario/:id", controller.addContacto);


module.exports = router;
