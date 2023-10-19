const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const ContactosController = require("../controllers/contacto");

const controller = new ContactosController();

router.get("/", controller.getAllContactos);
router.get("/:id", controller.getContacto);
router.delete("/:id", controller.deleteContacto);

module.exports = router;
