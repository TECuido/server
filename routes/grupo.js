const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const GrupoController = require("../controllers/grupo");

const controller = new GrupoController();

router.post("/", controller.addGrupo);
router.get("/", controller.getAllGrupos);
router.get("/:id", controller.getGrupo);
router.delete("/:id", controller.deleteGrupo);
router.post("/contacto/", controller.addUsuarioGrupo);
router.get("/contacto/:id", controller.getUsuarioPorGrupo);
module.exports = router;
