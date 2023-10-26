const express = require("express");
//const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const GrupoController = require("../controllers/grupo");

const controller = new GrupoController();

router.get("/", controller.getAllGrupos);
router.get("/:id", controller.getGrupo);
router.get("/:id/usuarios", controller.getUsuariosGrupo);
router.get("/usuario/:id", controller.getGruposUsuario);
router.post("/", controller.addGrupo);
router.post("/usuario", controller.addUsuarioToGrupo);
router.delete("/:id", controller.deleteGrupo);
module.exports = router;
