const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const ContactosController = require("../controllers/contacto");

const controller = new ContactosController();

router.get("/", controller.getAllContactos);
router.get("/:id", controller.getContacto);
router.get("/usuario/:id", controller.getAllContactosUsuario);
router.delete("/:id", controller.deleteContacto);
router.post("/usuario/:id", controller.addContacto);

module.exports = router;
