const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const ContactosController = require("../controllers/contacto");
const { createContactoSchema, getContactoSchema, deleteContactoSchema } = require("../schemas/contacto.schema.js");

const controller = new ContactosController();

// Ruteo de la parte de Contacto

router.get("/:id",  validatorHandler(getContactoSchema, "params"), controller.getContacto);
router.get("/usuario/:id", controller.getAllContactosUsuario);
router.delete("/:id",  validatorHandler(deleteContactoSchema, "params"), controller.deleteContacto);
router.post("/usuario/:id",  validatorHandler(createContactoSchema, "body"), controller.addContacto);


module.exports = router;
