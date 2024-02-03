const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const ContactosController = require("../controllers/contacto");
const { createContactoSchema, getContactoSchema, deleteContactoSchema, updateContactoSchema } = require("../schemas/contacto.schema.js");

const controller = new ContactosController();

// Ruteo de la parte de Contacto
router.get("/", controller.getAllContactos)
router.get("/:id", isAuthenticated,  validatorHandler(getContactoSchema, "params"), controller.getContacto);
router.delete("/:id", isAuthenticated, validatorHandler(deleteContactoSchema, "params"), controller.deleteContacto);
router.post("/usuario/:id", isAuthenticated,  validatorHandler(createContactoSchema, "body"), controller.addContacto);
router.put("/:id",controller.updateContacto);



module.exports = router;
